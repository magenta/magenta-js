/**
 * Core implementation for RNN-based Magenta sketch models such as SketchRNN.
 *
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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

/**
 * Imports
 */
import * as tf from '@tensorflow/tfjs-core';

import * as support from '../core/sketch_support';

export interface SketchRNNInfo {
  max_seq_len: number;
  mode: number;
  name: string;
  scale_factor: number;
  version: number;
}

/**
 * Main SketchRNN model class.
 *
 * Implementation of decoder model in https://arxiv.org/abs/1704.03477
 */
export class SketchRNN {
  private checkpointURL: string;

  private forgetBias: tf.Scalar;

  private initialized: boolean;

  public info: SketchRNNInfo;
  public numUnits: number;

  public pixelFactor: number;
  public scaleFactor: number;

  // raw weights and dimensions directly from JSON
  private weights: Float32Array[];
  private weightDims: number[][];

  // TensorFlow.js weight matrices
  private outputKernel: tf.Tensor2D;
  private outputBias: tf.Tensor1D;
  private lstmKernel: tf.Tensor2D;
  private lstmBias: tf.Tensor1D;

  private rawVars: tf.Tensor[];

  private NMIXTURE = 20;

  /**
   * `SketchRNN` constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   */
  constructor(checkpointURL: string) {
    this.checkpointURL = checkpointURL;
    this.initialized = false;
  }

  /**
   * Returns true if model is intialized.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Instantiates class information inputs from the JSON model.
   */
  private instantiateFromJSON(info: SketchRNNInfo,
    weightDims: number[][],
    weightStrings: string[]) {

    this.forgetBias = tf.scalar(1.0);
    this.info = info;
    this.setPixelFactor(2.0);
    this.weightDims = weightDims;
    this.numUnits = this.weightDims[0][0]; // size of LSTM
    let rawWeights: Float32Array;
    const maxWeight = 10.0;
    this.weights = [];
    for (let i = 0; i < weightStrings.length; i++) {
      rawWeights = new Float32Array(support.stringToArray(weightStrings[i]));
      const N: number = rawWeights.length;
      for (let j = 0; j < N; j++) {
        rawWeights[j] = maxWeight * rawWeights[j] / 32767;
      }
      this.weights.push(rawWeights);
    }
    this.outputKernel = tf.tensor2d(this.weights[0],
      [this.weightDims[0][0], this.weightDims[0][1]]);
    this.outputBias = tf.tensor1d(this.weights[1]);
    const lstmKernelXH = tf.tensor2d(this.weights[2],
      [this.weightDims[2][0], this.weightDims[2][1]]);
    const lstmKernelHH = tf.tensor2d(this.weights[3],
      [this.weightDims[3][0], this.weightDims[3][1]]);
    const axis = 0;
    this.lstmKernel = tf.concat2d([lstmKernelXH, lstmKernelHH], axis);
    this.lstmBias = tf.tensor1d(this.weights[4]);

    this.rawVars = [
      this.outputKernel,
      this.outputBias,
      this.lstmKernel,
      this.lstmBias
    ];

  }

  /**
   * Loads variables from the JSON model
   */
  async initialize() {
    this.dispose();

    const vars = await fetch(this.checkpointURL)
      .then((response) => response.json());

    this.instantiateFromJSON(vars[0], vars[1], vars[2]);

    this.initialized = true;
    console.log('Initialized SketchRNN.');
  }

  dispose() {
    if (this.rawVars) {
      for (let i = 0; i < this.rawVars.length; i++) {
        this.rawVars[i].dispose();
      }
      this.rawVars = undefined;
    }
    if (this.forgetBias) {
      this.forgetBias.dispose();
      this.forgetBias = undefined;
    }
    this.initialized = false;
  }

  /**
   * Sets the internal EXTRA factor of this model (pixel to model space)
   *
   * @param scale (the extra scale factor for pixel to model space)
   *
   * @returns nothing
   */
  setPixelFactor(scale: number) {
    // for best effect, set to 1.0 for d3 or paper.js, 2.0 for p5.js
    this.pixelFactor = scale;
    this.scaleFactor = this.info.scale_factor / this.pixelFactor;
  }

  /**
   * Updates the RNN, returns the next state.
   *
   * @param pen [dx, dy, penDown, penUp, penEnd].
   * @param state previous [c, h] state of the LSTM.
   *
   * @returns the next [c, h] state of the LSTM`.
   */
  update(pen: number[], state: Float32Array[]) {
    const out = tf.tidy(() => {
      const numUnits = this.numUnits;
      const s = this.scaleFactor;
      const normalizedPen = [pen[0] / s, pen[1] / s, pen[2], pen[3], pen[4]];
      const x = tf.tensor2d(normalizedPen, [1, 5]);
      const c = tf.tensor2d(state[0], [1, numUnits]);
      const h = tf.tensor2d(state[1], [1, numUnits]);
      const newState = tf.basicLSTMCell(
        this.forgetBias,
        this.lstmKernel,
        this.lstmBias,
        x,
        c,
        h);
      return newState;
    });
    const newC = out[0].dataSync();
    const newH = out[1].dataSync();
    for (let i = 0; i < out.length; i++) {
      out[i].dispose();
    }
    return [newC, newH];
  }

  /**
   * Given the RNN state, returns the probabilty distribution function (pdf)
   * of the next stroke. Optionally adjust the temperature of the pdf here.
   *
   * @param state previous [c, h] state of the LSTM.
   * @param temperature (Optional) for dx and dy (default 0.65)
   * @param softmaxTemperature (Optional) for Pi and Pen discrete states
   * (default is temperature * 0.5 + 0.5, which is a nice heuristic.)
   *
   * @returns [pi, mu1, mu2, sigma1, sigma2, corr, pen]
   */
  getPDF(state: Float32Array[],
    temperature=0.65,
    softmaxTemperature?: number) {
    const temp = temperature;
    let discreteTemp: number = 0.5 + temp * 0.5; // good heuristic.
    if (softmaxTemperature) {
      discreteTemp = softmaxTemperature;
    }
    const out = tf.tidy(() => {
      const numUnits = this.numUnits;
      const h = tf.tensor2d(state[1], [1, numUnits]);
      const NOUT = this.NMIXTURE;

      const sqrttemp = tf.scalar(Math.sqrt(temp));
      const softtemp = tf.scalar(discreteTemp);

      const z = tf.add(tf.matMul(h, this.outputKernel), this.outputBias)
        .squeeze();

      const [rawPen, rst] = tf.split(z, [3, NOUT*6]);
      const [rawPi, mu1, mu2, rawSigma1, rawSigma2, rawCorr] = tf.split(rst, 6);
      const pen = tf.softmax(rawPen.div(softtemp));
      const pi = tf.softmax(rawPi.div(softtemp));
      const sigma1 = tf.exp(rawSigma1).mul(sqrttemp);
      const sigma2 = tf.exp(rawSigma2).mul(sqrttemp);
      const corr = tf.tanh(rawCorr);
      return [pi, mu1, mu2, sigma1, sigma2, corr, pen];
    });
    const result = [];
    for (let i = 0; i < out.length; i++) {
      result.push(out[i].dataSync());
      out[i].dispose();
    }
    return result;
  }

  /**
   * Returns the zero/initial state of the model
   *
   * @returns zero state of the lstm: [c, h], where c and h are zero vectors.
   */
  zeroState() {
    const result: Float32Array[] = [
      new Float32Array(this.numUnits),
      new Float32Array(this.numUnits),
    ];
    return result;
  }

  /**
   * Returns a new copy of the rnn state
   *
   * @param rnnState original [c, h] states of the lstm
   *
   * @returns copy of state of the lstm: [c, h]
   */
  copyState(rnnState: Float32Array[]) {
    const c = new Float32Array(rnnState[0]);
    const h = new Float32Array(rnnState[1]);
    return [c, h];
  }

  /**
   * Returns the zero input state of the model
   *
   * @returns [0, 0, 1, 0, 0].
   */
  zeroInput() {
    return [0, 0, 1, 0, 0];
  }

  /**
   * Samples the next point of the sketch given pdf parameters
   *
   * @param pdf result from getPDF() call
   *
   * @returns [dx, dy, penDown, penUp, penEnd]
   */
  sample(pdf: number[][]) {
    // pdf is [pi, mu1, mu2, sigma1, sigma2, corr, pen]
    // returns [x, y, eos]
    const idx = support.sampleSoftmax(pdf[0]);
    const mu1 = pdf[1][idx];
    const mu2 = pdf[2][idx];
    const sigma1 = pdf[3][idx];
    const sigma2 = pdf[4][idx];
    const corr = pdf[5][idx];
    const penIdx = support.sampleSoftmax(pdf[6]);
    const penstate = [0, 0, 0];
    penstate[penIdx] = 1;
    const delta = support.birandn(mu1, mu2, sigma1, sigma2, corr);
    return [
      delta[0] * this.scaleFactor,
      delta[1] * this.scaleFactor,
      penstate[0],
      penstate[1],
      penstate[2]
    ];
  }

  /**
   * Simplifies line using RDP algorithm
   *
   * @param line list of points [[x0, y0], [x1, y1], ...]
   * @param tolerance (Optional) default 2.0
   *
   * @returns simpified line [[x0', y0'], [x1', y1'], ...]
   */
  simplifyLine(line: number[][], tolerance?: number) {
    return support.simplifyLine(line, tolerance);
  }

  /**
   * Simplifies lines using RDP algorithm
   *
   * @param line list of lines (each element is [[x0, y0], [x1, y1], ...])
   * @param tolerance (Optional) default 2.0
   *
   * @returns simpified lines (each elem is [[x0', y0'], [x1', y1'], ...])
   */
  simplifyLines(lines: number[][][], tolerance?: number) {
    return support.simplifyLines(lines, tolerance);
  }

  /**
   * Convert from polylines to stroke-5 format that sketch-rnn uses
   *
   * @param lines list of points each elem is ([[x0, y0], [x1, y1], ...])
   *
   * @returns stroke-5 format of the line, list of [dx, dy, p0, p1, p2]
   */
  linesToStroke(lines: number[][][]) {
    return support.linesToStrokes(lines);
  }

  /**
   * Convert from a line format to stroke-5
   *
   * @param line list of points [[x0, y0], [x1, y1], ...]
   * @param lastPoint the absolute position of the last point
   *
   * @returns stroke-5 format of the line, list of [dx, dy, p0, p1, p2]
   */
  lineToStroke(line: number[][], lastPoint: number[]) {
    return support.lineToStroke(line, lastPoint);
  }

}
