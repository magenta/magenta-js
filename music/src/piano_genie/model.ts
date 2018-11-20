/**
 * Core implementation for Piano Genie model.
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

import * as tf from '@tensorflow/tfjs-core';

/**
 * Constants.
 */
const DATA_TIME_QUANTIZE_RATE = 31.25;
const DATA_MAX_DISCRETE_TIMES = 32;
const RNN_NLAYERS = 2;
const RNN_NUNITS = 128;
const NBUTTONS = 8;
const NPIANOKEYS = 88;

/**
 * A type for keeping track of LSTM state activations.
 *
 * @param c The memory parameters of the LSTM.
 * @param h The hidden state parameters of the LSTM.
 */
type LSTMState = { c: tf.Tensor2D[], h: tf.Tensor2D[] };

/**
 * Creates empty LSTM state.
 */
function createZeroState() {
  const state: LSTMState = { c: [], h: [] };
  for (let i = 0; i < RNN_NLAYERS; ++i) {
    state.c.push(tf.zeros([1, RNN_NUNITS], 'float32'));
    state.h.push(tf.zeros([1, RNN_NUNITS], 'float32'));
  }
  return state;
}

/**
 * Frees LSTM state from GPU memory.
 *
 * @param state: The LSTM state to free.
 */
function disposeState(state: LSTMState) {
  for (let i = 0; i < RNN_NLAYERS; ++i) {
    state.c[i].dispose();
    state.h[i].dispose();
  }
}

/**
 * Samples logits with temperature.
 *
 * @param logits: The unnormalized logits to sample from.
 * @param temperature: Temperature. From 0 to 1, goes from argmax to random.
 * @param seed: Random seed.
 */
function sampleLogits(
  logits: tf.Tensor1D,
  temperature?: number,
  seed?: number) {
  temperature = temperature !== undefined ? temperature : 1.;
  if (temperature < 0. || temperature > 1.) {
    throw new Error('Invalid temperature specified');
  }

  let result: tf.Scalar;

  if (temperature === 0) {
    result = tf.argMax(logits, 0) as tf.Scalar;
  } else {
    if (temperature < 1) {
      logits = tf.div(logits, tf.scalar(temperature, 'float32'));
    }
    const scores = tf.reshape(tf.softmax(logits, 0), [1, -1]) as tf.Tensor2D;
    const sample = tf.multinomial(scores, 1, seed, true) as tf.Tensor1D;
    result = tf.reshape(sample, []) as tf.Scalar;
  }

  return result;
}

/**
 * Piano Genie model class.
 */
class PianoGenie {
  private checkpointURL: string;
  private initialized: boolean;

  // Model state.
  private modelVars: { [varName: string]: tf.Tensor };
  private decLSTMCells: tf.LSTMCellFunc[];
  private decForgetBias: tf.Scalar;

  // Execution state.
  private lastState: LSTMState;
  private lastOutput: number;
  private lastTime: Date;

  /**
   * Piano Genie constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   */
  constructor(checkpointURL: string) {
    this.checkpointURL = checkpointURL;
    this.initialized = false;
  }

  /**
   * Resets Piano Genie LSTM state.
   */
  resetState() {
    if (this.lastState !== undefined) {
      disposeState(this.lastState);
    }
    this.lastState = createZeroState();
    this.lastOutput = -1;
    this.lastTime = new Date();
    this.lastTime.setSeconds(this.lastTime.getSeconds() - 100000);
  }

  /**
   * Returns whether or not the model has been initialized.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Load model weights.
   *
   * @param staticVars Optional pre-loaded weights for testing.
   */
  async initialize(staticVars?: tf.NamedTensorMap) {
    if (this.initialized) {
      this.dispose();
    }

    if (this.checkpointURL === undefined && staticVars === undefined) {
      throw new Error('Need to specify either URI or static variables');
    }

    if (staticVars === undefined) {
      const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
        .then((response) => response.json())
        .then(
          (manifest: tf.io.WeightsManifestConfig) =>
            tf.io.loadWeights(manifest, this.checkpointURL));
      this.modelVars = vars;
    } else {
      this.modelVars = staticVars;
    }

    this.decLSTMCells = [];
    this.decForgetBias = tf.scalar(1, 'float32');
    for (let i = 0; i < RNN_NLAYERS; ++i) {
      const cellPrefix =
        `phero_model/decoder/rnn/rnn/multi_rnn_cell/cell_${i}/lstm_cell/`;

      this.decLSTMCells.push(
        (data: tf.Tensor2D, c: tf.Tensor2D, h: tf.Tensor2D) =>
          tf.basicLSTMCell(
            this.decForgetBias,
            this.modelVars[cellPrefix + 'kernel'] as tf.Tensor2D,
            this.modelVars[cellPrefix + 'bias'] as tf.Tensor1D,
            data, c, h
          ));
    }

    this.resetState();

    this.initialized = true;
  }

  /**
   * Given a button number, evaluates Piano Genie producing a piano key number.
   *
   * @param button Button number (one of {0, 1, 2, 3, 4, 5, 6, 7}).
   * @param temperature Sampling temperature [0, 1].
   * @param seed Random seed for sampling.
   * @param lastOutput Override for last note output. If unspecified, uses 
   * output from the last call to this method.
   * @param deltaTime Override for elapsed time since last button press. If 
   * unspecified, uses amount of time since last call to this method.
   * @param sampleFunc Override for sampling function. Unweighted model logits 
   * (tf.Tensor1D of size 88) are passed to this function, and the expected 
   * result is an integer (tf.Scalar) representing one of them (e.g. 60).
   */
  next(
    button: number,
    temperature?: number,
    seed?: number,
    lastOutput?: number,
    deltaTime?: number,
    sampleFunc?: (logits: tf.Tensor1D) => tf.Scalar) {
    // Validate arguments.
    if (button < 0 || button >= NBUTTONS) {
      throw new Error('Invalid button specified.');
    }

    // Ensure that the model is initialized.
    if (!this.initialized) {
      // This should be an error in real-time context because the model isn't 
      // ready to be evaluated.
      throw new Error('Model is not initialized.');
    }

    // Process prior state.
    const lastState = this.lastState;
    lastOutput = lastOutput !== undefined ? lastOutput : this.lastOutput;
    const lastTime = this.lastTime;
    const time = new Date();
    deltaTime = deltaTime !== undefined ? deltaTime : 
      (time.getTime() - lastTime.getTime()) / 1000;

    // Create default sample function.
    if (sampleFunc === undefined) {
      sampleFunc = (logits: tf.Tensor1D) => {
        return sampleLogits(logits, temperature, seed);
      };
    }

    // Compute logits.
    const [state, sample]: [LSTMState, tf.Scalar] = tf.tidy(() => {
      // Initialize decoder feats array.
      const decFeatsArr: tf.Tensor2D[] = [];

      // Add button input to decoder feats and translate to [-1, 1].
      const buttonTensor = tf.tensor2d([button], [1, 1], 'float32');
      const buttonScaled = 
        tf.sub(tf.mul(2., tf.div(buttonTensor, NBUTTONS - 1)), 1);
      decFeatsArr.push(buttonScaled as tf.Tensor2D);

      // Add autoregression (history) to decoder feats.
      const lastOutputTensor = tf.tensor1d([lastOutput], 'int32');
      const lastOutputInc = 
        tf.add(lastOutputTensor, tf.scalar(1, 'int32')) as tf.Tensor1D;
      const lastOutputOh = 
        tf.cast(tf.oneHot(lastOutputInc, NPIANOKEYS + 1), 'float32');
      decFeatsArr.push(lastOutputOh);

      // Add delta times to decoder feats.
      const deltaTimeTensor = tf.tensor1d([deltaTime], 'float32');
      const deltaTimeBin = 
        tf.round(tf.mul(deltaTimeTensor, DATA_TIME_QUANTIZE_RATE));
      const deltaTimeTrunc = tf.minimum(deltaTimeBin, DATA_MAX_DISCRETE_TIMES);
      const deltaTimeInt = 
        tf.cast(tf.add(deltaTimeTrunc, 1e-4), 'int32') as tf.Tensor1D;
      const deltaTimeOh = tf.oneHot(deltaTimeInt, DATA_MAX_DISCRETE_TIMES + 1);
      const deltaTimeOhFloat = tf.cast(deltaTimeOh, 'float32');
      decFeatsArr.push(deltaTimeOhFloat);

      // Project feats array through RNN input matrix.
      let rnnInput: tf.Tensor2D = tf.concat(decFeatsArr, 1);
      rnnInput = tf.matMul(
        rnnInput,
        this.modelVars[
          'phero_model/decoder/rnn_input/dense/kernel'] as tf.Tensor2D);
      rnnInput = tf.add(
        rnnInput,
        this.modelVars[
          'phero_model/decoder/rnn_input/dense/bias'] as tf.Tensor1D);

      // Evaluate RNN.
      const [c, h] = tf.multiRNNCell(
        this.decLSTMCells, rnnInput, lastState.c, lastState.h);
      const state: LSTMState = { c, h };

      // Project to logits.
      let logits: tf.Tensor2D = tf.matMul(
        h[RNN_NLAYERS - 1],
        this.modelVars[
          'phero_model/decoder/pitches/dense/kernel'] as tf.Tensor2D);
      logits = tf.add(
        logits,
        this.modelVars[
          'phero_model/decoder/pitches/dense/bias'] as tf.Tensor1D);

      // Remove batch axis to produce piano key (n=88) logits.
      const logits1D = tf.reshape(logits, [NPIANOKEYS]) as tf.Tensor1D;

      // Sample from logits.
      const sample = sampleFunc(logits1D);

      return [state, sample] as [LSTMState, tf.Scalar];
    });

    // Retrieve sample.
    const output = sample.dataSync()[0];
    sample.dispose();

    // Update state.
    disposeState(lastState);
    this.lastState = state;
    this.lastOutput = output;
    this.lastTime = time;

    return output;
  }

  /**
   * Disposes model from GPU memory.
   */
  dispose() {
    if (!this.initialized) {
      return;
    }
    Object.keys(this.modelVars).forEach(
      name => this.modelVars[name].dispose());
    this.decForgetBias.dispose();
    disposeState(this.lastState);
    this.initialized = false;
  }
}

export {PianoGenie};
