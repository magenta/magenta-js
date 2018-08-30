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
import * as KissFFT from 'kissfft-js';

const SR = 44100;

let melFilterbank: Float32Array[];
let context: AudioContext = null;

export default class AudioUtils {
  static loadBuffer(url: string): Promise<AudioBuffer> {
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
        })
      };
      xhr.responseType = 'arraybuffer';
      xhr.onerror = (err) => reject(err);
      xhr.send();
    });
  }

  /**
   * Calculates the FFT for an array buffer. Output is an array.
   */
  static fft(y: Float32Array) {
    const fftr = new KissFFT.FFTR(y.length);
    const transform = fftr.forward(y);
    fftr.dispose();
    return transform;
  }


  /**
   * Calculates the STFT, given a fft size, and a hop size. For example, if fft
   * size is 2048 and hop size is 1024, there will be 50% overlap. Given those
   * params, if the input sample has 4096 values, there would be 3 analysis
   * frames: [0, 2048], [1024, 3072], [2048, 4096].
   */
  static stft(y: Float32Array, fftSize = 2048, hopSize = fftSize) {
    function range(count: number): number[] {
      let out = [];
      for (let i = 0; i < count; i++) {
        out.push(i);
      }
      return out;
    }

    // Split the input buffer into sub-buffers of size fftSize.
    const bufferCount = Math.floor((y.length - fftSize) / hopSize) + 1;
    let matrix = range(bufferCount).map(x => new Float32Array(fftSize));
    for (let i = 0; i < bufferCount; i++) {
      const ind = i * hopSize;
      const buffer = y.slice(ind, ind + fftSize);
      // In the end, we will likely have an incomplete buffer, which we should
      // just ignore.
      if (buffer.length != fftSize) {
        continue;
      }

      const win = AudioUtils.hannWindow(buffer.length);
      const winBuffer = AudioUtils.applyWindow(buffer, win);
      const fft = AudioUtils.fft(winBuffer);
      // TODO: Understand why fft output is 2 larger than expected (eg. 1026
      // rather than 1024).
      matrix[i].set(fft.slice(0, fftSize));
    }
    return matrix;
  }

  /**
   * Given STFT energies, calculates the mel spectrogram.
   */
  static melSpectrogram(
      stftEnergies: Float32Array[], melCount = 20, lowHz = 300, highHz = 8000,
      sr = SR): number[][] {
    this.lazyCreateMelFilterbank(
        stftEnergies[0].length, melCount, lowHz, highHz, sr);

    // For each fft slice, calculate the corresponding mel values.
    const out = [];
    for (let i = 0; i < stftEnergies.length; i++) {
      out[i] = AudioUtils.applyFilterbank(stftEnergies[i], melFilterbank);
    }
    return out;
  }

  static lazyCreateMelFilterbank(
      length: number, melCount = 20, lowHz = 300, highHz = 8000, sr = SR) {
    // Lazy-create a Mel filterbank.
    if (!melFilterbank || melFilterbank.length != length) {
      melFilterbank =
          this.createMelFilterbank(length, melCount, lowHz, highHz, sr);
    }
  }

  /**
   * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
   * calculates the energies. Output is half the size.
   */
  static fftEnergies(y: Float32Array) {
    let out = new Float32Array(y.length / 2);
    for (let i = 0; i < y.length / 2; i++) {
      out[i] = y[i * 2] * y[i * 2] + y[i * 2 + 1] * y[i * 2 + 1];
    }
    return out;
  }

  /**
   * Generates a Hann window of a given length.
   */
  static hannWindow(length: number) {
    let win = new Float32Array(length);
    for (let i = 0; i < length; i++) {
      win[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
    }
    return win;
  }

  /**
   * Applies a window to a buffer (point-wise multiplication).
   */
  static applyWindow(buffer: Float32Array, win: Float32Array) {
    if (buffer.length != win.length) {
      console.error(`Buffer length ${buffer.length} != window length
        ${win.length}.`);
      return null;
    }

    let out = new Float32Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      out[i] = win[i] * buffer[i];
    }
    return out;
  }

  static pointWiseMultiply(
      out: Float32Array, array1: Float32Array, array2: Float32Array) {
    if (out.length != array1.length || array1.length != array2.length) {
      console.error(`Output length ${out.length} != array1 length
        ${array1.length} != array2 length ${array2.length}.`);
      return null;
    }
    for (let i = 0; i < out.length; i++) {
      out[i] = array1[i] * array2[i];
    }
    return out;
  }

  static createMelFilterbank(
      fftSize: number, melCount = 20, lowHz = 300, highHz = 8000, sr = SR) {
    function linearSpace(start: number, end: number, count: number) {
      const delta = (end - start) / (count + 1);
      let out = [];
      for (let i = 0; i < count; i++) {
        out[i] = start + delta * i;
      }
      return out;
    }

    const lowMel = this.hzToMel(lowHz);
    const highMel = this.hzToMel(highHz);

    // Construct linearly spaced array of melCount intervals, between lowMel and
    // highMel.
    const mels = linearSpace(lowMel, highMel, melCount + 2);
    // Convert from mels to hz.
    const hzs = mels.map(mel => this.melToHz(mel));
    // Go from hz to the corresponding bin in the FFT.
    const bins = hzs.map(hz => this.freqToBin(hz, fftSize));

    // Now that we have the start and end frequencies, create each triangular
    // window (each value in [0, 1]) that we will apply to an FFT later. These
    // are mostly sparse, except for the values of the triangle
    const length = bins.length - 2;
    const filters = [];
    for (let i = 0; i < length; i++) {
      // Now generate the triangles themselves.
      filters[i] =
          this.triangleWindow(fftSize, bins[i], bins[i + 1], bins[i + 2]);
    }

    return filters;
  }

  /**
   * Given an array of FFT magnitudes, apply a filterbank. Output should be an
   * array with size |filterbank|.
   */
  static applyFilterbank(fftEnergies: Float32Array, filterbank: Float32Array[]):
      number[] {
    function logGtZero(array: Float32Array) {
      const val = array.reduce(function(a, b) {
        return a + b;
      });

      const MIN_VAL = -10;
      // Ensure that the log argument is nonnegative.
      const offset = Math.exp(MIN_VAL);
      return Math.log(val + offset);
    }

    if (fftEnergies.length != filterbank[0].length) {
      console.error(`Each entry in filterbank should have dimensions matching
        FFT. |FFT| = ${fftEnergies.length}, |filterbank[0]| = ${
          filterbank[0].length}.`);
      return null;
    }

    // Apply each filter to the whole FFT signal to get one value.
    let out = [];  // new Float32Array(filterbank.length);
    for (let i = 0; i < filterbank.length; i++) {
      // To calculate filterbank energies we multiply each filterbank with the
      // power spectrum.
      const win = AudioUtils.applyWindow(fftEnergies, filterbank[i]);
      // Then add up the coefficents, and take the log.
      out[i] = logGtZero(win);
    }
    return out;
  }

  static hzToMel(hz: number) {
    return 1125 * Math.log(1 + hz / 700);
  }

  static melToHz(mel: number) {
    return 700 * (Math.exp(mel / 1125) - 1);
  }

  static freqToBin(freq: number, fftSize: number, sr = SR) {
    return Math.floor((fftSize + 1) * freq / (sr / 2));
  }

  /**
   * Creates a triangular window.
   */
  static triangleWindow(
      length: number, startIndex: number, peakIndex: number, endIndex: number) {
    const win = new Float32Array(length);
    const deltaUp = 1.0 / (peakIndex - startIndex);
    for (let i = startIndex; i < peakIndex; i++) {
      // Linear ramp up between start and peak index (values from 0 to 1).
      win[i] = (i - startIndex) * deltaUp;
    }
    const deltaDown = 1.0 / (endIndex - peakIndex);
    for (let i = peakIndex; i < endIndex; i++) {
      // Linear ramp down between peak and end index (values from 1 to 0).
      win[i] = 1 - (i - peakIndex) * deltaDown;
    }
    return win;
  }
}
