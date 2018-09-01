/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
//@ts-ignore
import * as FFT from 'fft.js';

// tslint:disable-next-line:no-default-export
export default class DummyClass {}
let context: AudioContext = null;

export interface SpecParams {
  sampleRate: number;
  hopLength?: number;
  winLength?: number;
  nFft?: number;
  nMels?: number;
  power?: number;
  fMin?: number;
  fMax?: number;
}

interface MelParams {
  sampleRate: number;
  nFft?: number;
  nMels?: number;
  fMin?: number;
  fMax?: number;
}

export function magSpectrogram(
    stft: Float32Array[], power: number): [Float32Array[], number] {
  // console.log(`magSpectrogram on ${stft.length} x ${stft[0].length}
  // power=${power}`);
  const spec = stft.map(fft => pow(mag(fft), power));
  const nFft = stft[0].length - 1;
  return [spec, nFft];
}

export function stft(y: Float32Array, params: SpecParams): Float32Array[] {
  const nFft = params.nFft || 2048;
  const winLength = params.winLength || nFft;
  const hopLength = params.hopLength || Math.floor(winLength / 4);

  let fftWindow = hannWindow(winLength);

  // Pad the window to be the size of nFft.
  fftWindow = padCenterToLength(fftWindow, nFft);

  // Pad the time series so that the frames are centered.
  y = padReflect(y, Math.floor(nFft / 2));

  // Window the time series.
  const yFrames = frame(y, nFft, hopLength);
  // console.log(`Split audio into ${yFrames.length} frames of
  // ${yFrames[0].length} each.`);
  // Pre-allocate the STFT matrix.
  const stftMatrix = [];

  const width = yFrames.length;
  const height = nFft + 2;
  // console.log(`Creating STFT matrix of size ${width} x ${height}.`);
  for (let i = 0; i < width; i++) {
    // Each column is a Float32Array of size height.
    const col = new Float32Array(height);
    stftMatrix[i] = col;
  }

  for (let i = 0; i < width; i++) {
    // Populate the STFT matrix.
    const winBuffer = applyWindow(yFrames[i], fftWindow);
    const col = fft(winBuffer);
    stftMatrix[i].set(col.slice(0, height));
  }

  return stftMatrix;
}

export function spectrogram(
    y: Float32Array, params: SpecParams): Float32Array[] {
  if (!params.power) {
    params.power = 1;
  }
  const stftMatrix = stft(y, params);
  const spec = magSpectrogram(stftMatrix, params.power)[0];
  return spec;
}

export function melSpectrogram(
    y: Float32Array, params: SpecParams): Float32Array[] {
  if (!params.power) {
    params.power = 2.0;
  }
  const stftMatrix = stft(y, params);
  const [spec, nFft] = magSpectrogram(stftMatrix, params.power);

  params.nFft = nFft;
  const melBasis = createMelFilterbank(params);
  return applyWholeFilterbank(spec, melBasis);
}

export function applyWholeFilterbank(
    spec: Float32Array[], filterbank: Float32Array[]): Float32Array[] {
  // Apply a point-wise dot product between the array of arrays.
  const out: Float32Array[] = [];
  for (let i = 0; i < spec.length; i++) {
    out[i] = applyFilterbank(spec[i], filterbank);
  }
  return out;
}

export function applyFilterbank(
    mags: Float32Array, filterbank: Float32Array[]): Float32Array {
  if (mags.length != filterbank[0].length) {
    throw new Error(
        `Each entry in filterbank should have dimensions ` +
        `matching FFT. |mags| = ${mags.length}, ` +
        `|filterbank[0]| = ${filterbank[0].length}.`);
  }

  // Apply each filter to the whole FFT signal to get one value.
  let out = new Float32Array(filterbank.length);
  for (let i = 0; i < filterbank.length; i++) {
    // To calculate filterbank energies we multiply each filterbank with the
    // power spectrum.
    const win = applyWindow(mags, filterbank[i]);
    // Then add up the coefficents.
    out[i] = sum(win);
  }
  return out;
}

//@ts-ignore
export function applyWindow(buffer, win) {
  if (buffer.length !== win.length) {
    console.error(
        `Buffer length ${buffer.length} != window length ${win.length}.`);
    return null;
  }

  let out = new Float32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = win[i] * buffer[i];
  }
  return out;
}

export function padCenterToLength(data: Float32Array, length: number) {
  // If data is longer than length, error!
  if (data.length > length) {
    throw new Error('Data is longer than length.');
  }

  const paddingLeft = Math.floor((length - data.length) / 2);
  const paddingRight = length - data.length - paddingLeft;
  return padConstant(data, [paddingLeft, paddingRight]);
}

export function padConstant(data: Float32Array, padding: number|number[]) {
  let padLeft, padRight;
  if (typeof (padding) === 'object') {
    [padLeft, padRight] = padding;
  } else {
    padLeft = padRight = padding;
  }
  const out = new Float32Array(data.length + padLeft + padRight);
  out.set(data, padLeft);
  return out;
}

export function padReflect(data: Float32Array, padding: number) {
  const out = padConstant(data, padding);
  for (let i = 0; i < padding; i++) {
    // Pad the beginning with reflected values.
    out[i] = out[2 * padding - i];
    // Pad the end with reflected values.
    out[out.length - i - 1] = out[out.length - 2 * padding + i - 1];
  }
  return out;
}

/**
 * Given a timeseries, returns an array of timeseries that are windowed
 * according to the params specified.
 */
export function frame(
    data: Float32Array, frameLength: number,
    hopLength: number): Float32Array[] {
  const bufferCount = Math.floor((data.length - frameLength) / hopLength) + 1;
  let buffers = range(bufferCount).map(x => new Float32Array(frameLength));
  for (let i = 0; i < bufferCount; i++) {
    const ind = i * hopLength;
    const buffer = data.slice(ind, ind + frameLength);
    buffers[i].set(buffer);
    // In the end, we will likely have an incomplete buffer, which we should
    // just ignore.
    if (buffer.length !== frameLength) {
      continue;
    }
  }
  return buffers;
}

export function createMelFilterbank(params: MelParams): Float32Array[] {
  const fMin = params.fMin || 0;
  const fMax = params.fMax || params.sampleRate / 2;
  const nMels = params.nMels || 128;
  const nFft = params.nFft || 2048;

  // Center freqs of each FFT band.
  const fftFreqs = calculateFftFreqs(params.sampleRate, nFft);
  // (Pseudo) center freqs of each Mel band.
  const melFreqs = calculateMelFreqs(nMels + 2, fMin, fMax);

  const melDiff = internalDiff(melFreqs);
  const ramps = outerSubtract(melFreqs, fftFreqs);
  const filterSize = ramps[0].length;

  const weights = [];
  for (let i = 0; i < nMels; i++) {
    weights[i] = new Float32Array(filterSize);
    for (let j = 0; j < ramps[i].length; j++) {
      const lower = -ramps[i][j] / melDiff[i];
      const upper = ramps[i + 2][j] / melDiff[i + 1];
      const weight = Math.max(0, Math.min(lower, upper));
      weights[i][j] = weight;
    }
  }

  // Slaney-style mel is scaled to be approx constant energy per channel.
  for (let i = 0; i < weights.length; i++) {
    // How much energy per channel.
    const enorm = 2.0 / (melFreqs[2 + i] - melFreqs[i]);
    // Normalize by that amount.
    weights[i] = weights[i].map(val => val * enorm);
  }

  return weights;
}

export function fft(y: Float32Array) {
  const fft = new FFT(y.length);
  const out = fft.createComplexArray();
  const data = fft.toComplexArray(y);
  fft.transform(out, data);
  return out;
}

export function hannWindow(length: number) {
  let win = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    win[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
  }
  return win;
}

export function array(arr: number[]) {
  const out = new Float32Array(arr.length);
  out.set(arr);
  return out;
}

const MIN_VAL = -10;
//@ts-ignore
export function logGtZero(val) {
  // Ensure that the log argument is nonnegative.
  const offset = Math.exp(MIN_VAL);
  return Math.log(val + offset);
}

//@ts-ignore
export function sum(array) {
  //@ts-ignore
  return array.reduce(function(a, b) {
    return a + b;
  });
}

//@ts-ignore
export function range(count): number[] {
  let out = [];
  for (let i = 0; i < count; i++) {
    out.push(i);
  }
  return out;
}

export function linearSpace(start: number, end: number, count: number) {
  // Include start and endpoints.
  const delta = (end - start) / (count - 1);
  const out = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    out[i] = start + delta * i;
  }
  return out;
}

/**
 * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
 * calculates the energies. Output is half the size.
 */
export function mag(y: Float32Array) {
  let out = new Float32Array(y.length / 2);
  for (let i = 0; i < y.length / 2; i++) {
    out[i] = Math.sqrt(y[i * 2] * y[i * 2] + y[i * 2 + 1] * y[i * 2 + 1]);
  }
  return out;
}

export function powerToDb(
    spec: Float32Array[], amin = 1e-10, refValue = 1.0, topDb = 80.0) {
  const width = spec.length;
  const height = spec[0].length;
  const logSpec = [];
  for (let i = 0; i < width; i++) {
    logSpec[i] = new Float32Array(height);
  }
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const val = spec[i][j];
      let logVal = 10.0 * Math.log10(Math.max(amin, val));
      logVal -= 10.0 * Math.log10(Math.max(amin, refValue));
      logSpec[i][j] = logVal;
    }
  }
  if (topDb) {
    if (topDb < 0) {
      throw new Error(`topDb must be non-negative.`);
    }
    for (let i = 0; i < width; i++) {
      const maxVal = max(logSpec[i]);
      for (let j = 0; j < height; j++) {
        logSpec[i][j] = Math.max(logSpec[i][j], maxVal - topDb);
      }
    }
  }
  return logSpec;
}

export function hzToMel(hz: number): number {
  return 1125.0 * Math.log(1 + hz / 700.0);
}

export function melToHz(mel: number): number {
  return 700.0 * (Math.exp(mel / 1125.0) - 1);
}

export function flatten2D(spec: Float32Array[]) {
  const length = spec[0].length * spec.length;
  const out = new Float32Array(length);
  const height = spec[0].length;
  const width = spec.length;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      out[j * width + i] = spec[i][j];
    }
  }
  return out;
}

export function calculateFftFreqs(sampleRate: number, nFft: number) {
  return linearSpace(0, sampleRate / 2, Math.floor(1 + nFft / 2));
}

export function calculateMelFreqs(
    nMels: number, fMin: number, fMax: number): Float32Array {
  const melMin = hzToMel(fMin);
  const melMax = hzToMel(fMax);

  // Construct linearly spaced array of nMel intervals, between melMin and
  // melMax.
  const mels = linearSpace(melMin, melMax, nMels);
  const hzs = mels.map(mel => melToHz(mel));
  return hzs;
}

export function internalDiff(arr: Float32Array): Float32Array {
  const out = new Float32Array(arr.length - 1);
  for (let i = 0; i < arr.length; i++) {
    out[i] = arr[i + 1] - arr[i];
  }
  return out;
}

export function outerSubtract(
    arr: Float32Array, arr2: Float32Array): Float32Array[] {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out[i] = new Float32Array(arr2.length);
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      out[i][j] = arr[i] - arr2[j];
    }
  }
  return out;
}

export function pow(arr: Float32Array, power: number) {
  return arr.map(v => Math.pow(v, power));
}

export function max(arr: Float32Array) {
  return arr.reduce((a, b) => Math.max(a, b));
}

export function loadBuffer(url: string) {
  if (!context) {
    context = new AudioContext();
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // Load an example of speech being spoken.
    xhr.open('GET', url);
    xhr.onload = () => {
      context.decodeAudioData(xhr.response, buffer => {
        resolve(buffer);
      });
    };
    xhr.responseType = 'arraybuffer';
    xhr.onerror = (err) => reject(err);
    xhr.send();
  });
}

export async function loadBufferOffline(url: string) {
  const offlineCtx = new OfflineAudioContext(1, 16000, 16000);
  return fetch(url)
      .then(body => body.arrayBuffer())
      .then(buffer => offlineCtx.decodeAudioData(buffer));
}