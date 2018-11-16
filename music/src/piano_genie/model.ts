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

/**
 * Imports
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
 * @param c The c parameters of the LSTM.
 * @param h The h parameters of the LSTM
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
  for (let i = 0; i < state.c.length; ++i) {
    state.c[i].dispose();
    state.h[i].dispose();
  }
}

/**
 * Piano Genie model class.
 */
class PianoGenie {
  private checkpointURL: string;
  private initialized: boolean;

  // Model state
  private modelVars: { [varName: string]: tf.Tensor };
  private decLSTMCells: tf.LSTMCellFunc[];
  private decForgetBias: tf.Scalar;
  private state: LSTMState;

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
    if (this.state !== undefined) {
      disposeState(this.state);
    }
    this.state = createZeroState();
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
   * Evaluates Piano Genie to produce piano key logits and update state.
   *
   * @param button Button number [0, 8)
   * @param lastOutput Last sampled piano key [0, 88). Pass -1 on first call.
   * @param deltaTime Amount of time elapsed in seconds since last button press.
   */
  evaluate(button: number, lastOutput: number, deltaTime: number) {
    // Validate arguments
    if (button < 0 || button >= NBUTTONS) {
      throw new Error('Invalid button specified.');
    }
    if (lastOutput < -1 || lastOutput >= NPIANOKEYS) {
      throw new Error('Invalid previous output specified.');
    }
    if (deltaTime < 0) {
      throw new Error('Negative delta time specified.');
    }

    // Ensure that the model is initialized.
    if (!this.initialized) {
      throw new Error('Model is not initialized.');
    }

    // Compute logits.
    const [finalState, decLogits]: [LSTMState, tf.Tensor1D] = tf.tidy(() => {
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
        this.decLSTMCells, rnnInput, this.state.c, this.state.h);
      const finalState: LSTMState = { c, h };

      // Project to logits.
      let decLogits: tf.Tensor2D = tf.matMul(
        h[RNN_NLAYERS - 1],
        this.modelVars[
          'phero_model/decoder/pitches/dense/kernel'] as tf.Tensor2D);
      decLogits = tf.add(
        decLogits,
        this.modelVars[
          'phero_model/decoder/pitches/dense/bias'] as tf.Tensor1D);

      // Remove batch axis to produce piano key (n=88) logits.
      const decLogits1D = tf.reshape(decLogits, [NPIANOKEYS]) as tf.Tensor1D;

      return [finalState, decLogits1D] as [LSTMState, tf.Tensor1D];
    });

    disposeState(this.state);
    this.state = finalState;

    return decLogits;
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
    disposeState(this.state);
    this.initialized = false;
  }
}

/**
 * Samples logits with temperature.
 *
 * @param logits: The 1D tensor to sample from
 * @param temperature: Temperature. From 0 to 1, goes from argmax to random.
 * @param seed: Random seed.
 */
function sampleLogits(logits: tf.Tensor1D, temp?: number, seed?: number) {
  temp = temp === undefined ? 1. : temp;
  if (temp < 0. || temp > 1.) {
    throw new Error('Invalid temperature specified');
  }

  const result: tf.Scalar = tf.tidy(() => {
    let result: tf.Scalar;

    if (temp === 0) {
      result = tf.argMax(logits, 0) as tf.Scalar;
    } else {
      if (temp < 1) {
        logits = tf.div(logits, tf.scalar(temp, 'float32'));
      }
      const scores = tf.reshape(tf.softmax(logits, 0), [1, -1]) as tf.Tensor2D;
      const sample = tf.multinomial(scores, 1, seed, true) as tf.Tensor1D;
      result = tf.reshape(sample, []) as tf.Scalar;
    }

    return result;
  });

  return result;
}

export {
  PianoGenie,
  sampleLogits
};
