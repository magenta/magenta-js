/**
 * ISTFT exactly matching python tensorflow.
 *
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as tf from '@tensorflow/tfjs';
//@ts-ignore
import * as FFT from 'fft.js';

import {applyWindow, hannWindow, padCenterToLength} from '../core/audio_utils.js';

// tslint:disable-next-line:max-line-length
import {MAG_DESCALE_A, MAG_DESCALE_B, N_FFT, N_HOP, PHASE_DESCALE_A, PHASE_DESCALE_B, SAMPLE_LENGTH, SAMPLE_RATE} from './constants.js';
import {MEL_SPARSE_COEFFS} from './mel_sparse_coeffs.js';

export function melToLinearMatrix() {
  const m2l = tf.buffer([1024, 1024]);
  for (let i = 0; i < MEL_SPARSE_COEFFS.length; i++) {
    const x = MEL_SPARSE_COEFFS[i] as number[];
    m2l.set(x[2], x[0], x[1]);
  }
  return m2l.toTensor();
}

function descale(data: tf.Tensor, a: number, b: number) {
  return tf.div(tf.sub(data, b), a);
}

export function melToLinear(melLogPower: tf.Tensor3D) {
  return tf.tidy(() => {
    const m2l = melToLinearMatrix().expandDims(0);
    const melLogPowerDb = descale(melLogPower, MAG_DESCALE_A, MAG_DESCALE_B);
    // Linear scale the magnitude.
    const melPower = tf.exp(melLogPowerDb);
    // Mel to linear frequency scale.
    const powerLin = tf.matMul(melPower, m2l);
    // Power to magnitude.
    const magLin = tf.sqrt(powerLin);
    return magLin;
  });
}

export function ifreqToPhase(ifreq: tf.Tensor) {
  return tf.tidy(() => {
    const m2l = melToLinearMatrix().expandDims(0);
    const ifreqDescale = descale(ifreq, PHASE_DESCALE_A, PHASE_DESCALE_B);
    // Need to multiply phase by -1.0 to account for conjugacy difference
    // between tensorflow and librosa/javascript istft.
    const phase = tf.cumsum(tf.mul(ifreqDescale, Math.PI), 1);
    const phaseLin = tf.matMul(phase, m2l);
    return phaseLin;
  });
}

function interleaveReIm(real: tf.Tensor, imag: tf.Tensor) {
  const reImInterleave = tf.tidy(() => {
    // Combine and add back in the zero DC component
    let reImBatch = tf.concat([real, imag], 0).expandDims(3);
    reImBatch = tf.pad(reImBatch, [[0, 0], [0, 0], [1, 0], [0, 0]]);

    // Interleave real and imaginary for javascript ISTFT.
    // Hack to interleave [re0, im0, re1, im1, ...] with batchToSpace.
    const crops = [[0, 0], [0, 0]];
    const reImInterleave =
        tf.batchToSpaceND(reImBatch, [1, 2], crops).reshape([128, 4096]);
    // Convert Tensor to a Float32Array[]
    return reImInterleave;
  });
  const reImArray = reImInterleave.dataSync();
  const reIm = [] as Float32Array[];
  for (let i = 0; i < 128; i++) {
    reIm[i] = reImArray.slice(i * 4096, (i + 1) * 4096) as Float32Array;
  }
  reImInterleave.dispose();
  return reIm;
}

/**
 * Parameters for computing a inverse spectrogram from audio.
 */
export interface InverseSpecParams {
  sampleRate: number;
  hopLength?: number;
  winLength?: number;
  nFft?: number;
  center?: boolean;
}

async function reImToAudio(reIm: Float32Array[]) {
  const ispecParams = {
    nFFt: N_FFT,
    winLength: N_FFT,
    hopLength: N_HOP,
    sampleRate: SAMPLE_RATE,
    center: false,
  };
  return istft(reIm, ispecParams);
}

// TODO(jesseengel): Make it work for batch of spectrograms.
export async function specgramsToAudio(specgrams: tf.Tensor4D) {
  const reImArray = tf.tidy(() => {
    // Synthesize audio
    const magSlice = tf.slice(specgrams, [0, 0, 0, 0], [1, -1, -1, 1]).reshape([
      1, 128, 1024
    ]);
    const magMel = magSlice as tf.Tensor3D;
    const mag = melToLinear(magMel);

    const ifreqSlice = tf.slice(specgrams, [0, 0, 0, 1], [
                           1, -1, -1, 1
                         ]).reshape([1, 128, 1024]);
    const ifreq = ifreqSlice as tf.Tensor3D;
    const phase = ifreqToPhase(ifreq);

    // Reflect all frequencies except for the Nyquist, which is shared between
    // positive and negative frequencies for even nFft.
    let real = mag.mul(tf.cos(phase));
    const mirrorReal = tf.reverse(real.slice([0, 0, 0], [1, 128, 1023]), 2);
    real = tf.concat([real, mirrorReal], 2);

    // Reflect all frequencies except for the Nyquist, take complex conjugate of
    // the negative frequencies.
    let imag = mag.mul(tf.sin(phase));
    const mirrorImag = tf.reverse(imag.slice([0, 0, 0], [1, 128, 1023]), 2);
    imag = tf.concat([imag, tf.mul(mirrorImag, -1.0)], 2);
    return [real, imag];
  });

  const reIm = await interleaveReIm(reImArray[0], reImArray[1]);
  const audio = await reImToAudio(reIm);
  reImArray.forEach(t => t.dispose());
  return audio;
}

//------------------------------------------------------------------------------
// FFT Code
//------------------------------------------------------------------------------
// Perform ifft on a single frame.
export function ifft(reIm: Float32Array): Float32Array {
  // Interleave.
  const nFFT = reIm.length / 2;
  const fft = new FFT(nFFT);
  const recon = fft.createComplexArray();
  fft.inverseTransform(recon, reIm);
  // Just take the real part.
  const result = fft.fromComplexArray(recon);
  return result;
}

export function istft(
    reIm: Float32Array[], params: InverseSpecParams): Float32Array {
  const nFrames = reIm.length;
  const nReIm = reIm[0].length;
  const nFft = (nReIm / 2);
  const winLength = params.winLength || nFft;
  const hopLength = params.hopLength || Math.floor(winLength / 4);
  const center = params.center || false;

  let ifftWindow = hannWindow(winLength);
  // Adjust normalization for 75% Hann cola (factor of 1.5 with stft/istft).
  for (let i = 0; i < ifftWindow.length; i++) {
    ifftWindow[i] = ifftWindow[i] / 1.5;
  }

  // Pad the window to be the size of nFft. Only if nFft != winLength.
  ifftWindow = padCenterToLength(ifftWindow, nFft);

  // Pre-allocate the audio output.
  const expectedSignalLen = nFft + hopLength * (nFrames - 1);
  const y = new Float32Array(expectedSignalLen);

  // Perform inverse ffts.
  for (let i = 0; i < nFrames; i++) {
    const sample = i * hopLength;
    let yTmp = ifft(reIm[i]);
    yTmp = applyWindow(yTmp, ifftWindow);
    yTmp = add(yTmp, y.slice(sample, sample + nFft));
    y.set(yTmp, sample);
  }

  let sliceStart = 0;
  let sliceLength = expectedSignalLen;
  if (center) {
    // Normally you would center the outputs,
    sliceStart = nFft / 2;
    sliceLength = y.length - (nFft / 2);
  } else {
    // For gansynth, we did all the padding at the front instead of centering,
    // so remove the padding at the front.
    sliceStart = expectedSignalLen - SAMPLE_LENGTH;  // 3072
    sliceLength = y.length - sliceStart;
  }
  const yTrimmed = y.slice(sliceStart, sliceLength);
  return yTrimmed;
}

function add(arr0: Float32Array, arr1: Float32Array) {
  if (arr0.length !== arr1.length) {
    console.error(
        `Array lengths must be equal to add: ${arr0.length}, ${arr0.length}`);
    return null;
  }

  const out = new Float32Array(arr0.length);
  for (let i = 0; i < arr0.length; i++) {
    out[i] = arr0[i] + arr1[i];
  }
  return out;
}
