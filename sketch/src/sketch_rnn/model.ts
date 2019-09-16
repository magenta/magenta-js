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

/**
 * Interface for JSON specification of a `MusicVAE` model.
 *
 * @property max_seq_len: Model trained on dataset w/ this max sequence length.
 * @property mode: Pre-trained models have this parameter for legacy reasons.
 * 0 for VAE, 1 for Decoder only. This model is Decoder only (not used).
 * @property name: QuickDraw name, like cat, dog, elephant, etc
 * @property scale_factor: the factor to convert from neural-network space to
 * pixel space. Most pre-trained models have this number between 80-120
 * @property version: Pre-trained models have a version between 1-6, for
 * the purpose of experimental research log.
 */
export interface SketchRNNInfo {
  max_seq_len: number;
  mode: number;
  name: string;
  scale_factor: number;
  version: number;
}

/**
 * Interface for specification of the Probability Distribution Function
 * of a pen stroke.
 * 
 * Please refer to "A Neural Representation of Sketch Drawings"
 * https://arxiv.org/abs/1704.03477
 * 
 * In Eq.3 is an explanation of all of these parameters.
 * 
 * Below is a brief description:
 * 
 * @property pi: categorial distribution for mixture of Gaussian
 * @property muX: mean for x-axis
 * @property muY: mean for y-axis
 * @property sigmaX: standard deviation of x-axis
 * @property sigmaY: standard deviation of y-axis
 * @property corr: correlation parameter between x and y
 * @property pen: categorical distribution for the 3 pen states
 */
export interface StrokePDF {
  pi: Float32Array;
  muX: Float32Array;
  muY: Float32Array;
  sigmaX: Float32Array;
  sigmaY: Float32Array;
  corr: Float32Array;
  pen: Float32Array;
}

/**
 * States of the LSTM Cell
 * 
 * Long-Short Term Memory: ftp://ftp.idsia.ch/pub/juergen/lstm.pdf
 * 
 * @property c: memory "cell" of the LSTM.
 * @property h: hidden state (also the output) of the LSTM.
 */
export interface LSTMState {
  c: Float32Array;
  h: Float32Array;
}

/**
 * Main SketchRNN model class.
 *
 * Implementation of decoder model in https://arxiv.org/abs/1704.03477
 * 
 * TODO(hardmaru): make a "batch" continueSequence-like method
 * that runs fully on GPU.
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
   * TODO(hardmaru): to add support for new tfjs checkpoints.
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
   * @param stroke [dx, dy, penDown, penUp, penEnd].
   * @param state previous LSTMState.
   *
   * @returns next LSTMState.
   */
  update(stroke: number[], state: LSTMState) {
    const out = tf.tidy(() => {
      const numUnits = this.numUnits;
      const s = this.scaleFactor;
      const normStroke =
        [stroke[0]/s, stroke[1]/s, stroke[2], stroke[3], stroke[4]];
      const x = tf.tensor2d(normStroke, [1, 5]);
      const c = tf.tensor2d(state.c, [1, numUnits]);
      const h = tf.tensor2d(state.h, [1, numUnits]);
      const newState = tf.basicLSTMCell(
        this.forgetBias,
        this.lstmKernel,
        this.lstmBias,
        x,
        c,
        h);
      return tf.concat(newState, 1);
    });
    const newCH = out.dataSync();
    out.dispose();
    const newC = newCH.slice(0, this.numUnits);
    const newH = newCH.slice(this.numUnits, this.numUnits * 2);
    const finalState:LSTMState = {
      c: new Float32Array(newC),
      h: new Float32Array(newH)
    };
    return finalState;
  }

  /**
   * Updates the RNN on a series of Strokes, returns the next state.
   *
   * @param strokes list of [dx, dy, penDown, penUp, penEnd].
   * @param state previous LSTMState.
   * @param steps (Optional) number of steps of the stroke to update
   * (default is length of strokes list)
   * 
   *
   * @returns the final LSTMState.
   */
  updateStrokes(strokes: number[][], state: LSTMState, steps?: number) {
    const out = tf.tidy(() => {
      const numUnits = this.numUnits;
      const s = this.scaleFactor;
      let normStroke:number[];
      let x: tf.Tensor2D;
      let c: tf.Tensor2D;
      let h: tf.Tensor2D;
      let newState: tf.Tensor2D[];
      let numSteps = strokes.length;
      if (steps) {
        numSteps = steps;
      }
      c = tf.tensor2d(state.c, [1, numUnits]);
      h = tf.tensor2d(state.h, [1, numUnits]);
      for (let i=0;i<numSteps;i++) {
        normStroke = [strokes[i][0]/s,
                      strokes[i][1]/s,
                      strokes[i][2],
                      strokes[i][3],
                      strokes[i][4]];
        x = tf.tensor2d(normStroke, [1, 5]);
        newState = tf.basicLSTMCell(
          this.forgetBias,
          this.lstmKernel,
          this.lstmBias,
          x,
          c,
          h);
        c = newState[0];
        h = newState[1];
      }
      return tf.concat(newState, 1);
    });
    const newCH = out.dataSync();
    out.dispose();
    const newC = newCH.slice(0, this.numUnits);
    const newH = newCH.slice(this.numUnits, this.numUnits * 2);
    const finalState:LSTMState = {
      c: new Float32Array(newC),
      h: new Float32Array(newH)
    };
    return finalState;
  }

  /**
   * Given the RNN state, returns the probability distribution function (pdf)
   * of the next stroke. Optionally adjust the temperature of the pdf here.
   *
   * @param state previous LSTMState.
   * @param temperature (Optional) for dx and dy (default 0.65)
   * @param softmaxTemperature (Optional) for Pi and Pen discrete states
   * (default is temperature * 0.5 + 0.5, which is a nice heuristic.)
   *
   * @returns StrokePDF (pi, muX, muY, sigmaX, sigmaY, corr, pen)
   */
  getPDF(state: LSTMState,
    temperature=0.65,
    softmaxTemperature?: number) {
    const temp = temperature;
    let discreteTemp: number = 0.5 + temp * 0.5; // good heuristic.
    if (softmaxTemperature) {
      discreteTemp = softmaxTemperature;
    }
    const NOUT = this.NMIXTURE;
    const out = tf.tidy(() => {
      const numUnits = this.numUnits;
      const h = tf.tensor2d(state.h, [1, numUnits]);

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
      const result = [pi, mu1, mu2, sigma1, sigma2, corr, pen];
      // concat, and then unpack after dataSync
      return tf.concat(result);
    });
    const result = out.dataSync();
    out.dispose();
    const pdf:StrokePDF = { // note: JS doesn't have a nice "split" method.
      pi: new Float32Array(result.slice(0, NOUT)),
      muX: new Float32Array(result.slice(1*NOUT, 2*NOUT)),
      muY: new Float32Array(result.slice(2*NOUT, 3*NOUT)),
      sigmaX: new Float32Array(result.slice(3*NOUT, 4*NOUT)),
      sigmaY: new Float32Array(result.slice(4*NOUT, 15*NOUT)),
      corr: new Float32Array(result.slice(5*NOUT, 6*NOUT)),
      pen: new Float32Array(result.slice(6*NOUT, 6*NOUT+3))
    };
    return pdf;
  }

  /**
   * Returns the zero/initial state of the model
   *
   * @returns zero state of the lstm: [c, h], where c and h are zero vectors.
   */
  zeroState() {
    const result:LSTMState = {
      c: new Float32Array(this.numUnits),
      h: new Float32Array(this.numUnits)
    };
    return result;
  }

  /**
   * Returns a new copy of the rnn state
   *
   * @param rnnState original LSTMState
   *
   * @returns copy of LSTMState
   */
  copyState(rnnState: LSTMState) {
    const result:LSTMState = {
      c: new Float32Array(rnnState.c),
      h: new Float32Array(rnnState.h)
    };
    return result;
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
  sample(pdf: StrokePDF) {
    // pdf is a StrokePDF Interface
    // returns [x, y, eos]
    const idx = support.sampleSoftmax(pdf.pi);
    const mu1 = pdf.muX[idx];
    const mu2 = pdf.muY[idx];
    const sigma1 = pdf.sigmaX[idx];
    const sigma2 = pdf.sigmaY[idx];
    const corr = pdf.corr[idx];
    const penIdx = support.sampleSoftmax(pdf.pen);
    const penstate = [0, 0, 0];
    penstate[penIdx] = 1;
    const delta = support.birandn(mu1, mu2, sigma1, sigma2, corr);
    const stroke = [
      delta[0] * this.scaleFactor,
      delta[1] * this.scaleFactor,
      penstate[0],
      penstate[1],
      penstate[2]
    ];
    return stroke;
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
