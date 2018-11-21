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
const NUM_BUTTONS = 8;
const NUM_PIANOKEYS = 88;

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
 * @param logits The unnormalized logits to sample from.
 * @param temperature Temperature. From 0 to 1, goes from argmax to random.
 * @param seed Random seed.
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
  private deltaTimeOverride: number;

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
   * Given a button number with optional sampling temperature and seed, 
   * evaluates Piano Genie to produce a piano key note {0, 1, ... 87}. This is
   * the simplest access point for Piano Genie, designed to be called by your
   * application in real time (it keeps track of time internally).
   * 
   * @param button Button number (one of {0, 1, 2, 3, 4, 5, 6, 7}).
   * @param temperature Temperature. From 0 to 1, goes from argmax to random.
   * @param seed Random seed. Use a fixed number to get reproducible output.
   */
  next(button: number, temperature?: number, seed?: number) {
    const sampleFunc = (logits: tf.Tensor1D) => {
      return sampleLogits(logits, temperature, seed);
    };
    return this.nextWithCustomSamplingFunction(button, sampleFunc);
  }

  /**
   * Given a button number and whitelist of piano keys, evaluates Piano Genie
   * to produce a piano key note {0, 1, ..., 87}. Use this if you would like to
   * restrict Piano Genie's outputs to a subset of the keys (e.g. a particular
   * scale or range of the piano). For example, if you wanted to restrict Piano
   * Genie's outputs to be C major from middle C to one octave above, you would
   * pass [39, 41, 43, 44, 46, 48, 50, 51] as the whitelist.
   * 
   * @param button Button number (one of {0, 1, 2, 3, 4, 5, 6, 7}).
   * @param keyWhitelist Subset of keys restricting possible note outputs.
   * @param temperature Temperature. From 0 to 1, goes from argmax to random.
   * @param seed Random seed. Use a fixed number to get reproducible output.
   */
  nextFromKeyWhitelist(
    button: number,
    keyWhitelist: number[],
    temperature?: number,
    seed?: number) {
    const sampleFunc = (logits: tf.Tensor1D) => {
      const keySubsetTensor = tf.tensor1d(keyWhitelist, 'int32');
      // Discard logits outside of the whitelist.
      logits = tf.gather(logits, keySubsetTensor);
      // Sample from whitelisted logits.
      let result = sampleLogits(logits, temperature, seed);
      // Map the subsampled logit ID back to the appropriate piano key.
      const result1d = tf.gather(keySubsetTensor, tf.reshape(result, [1]));
      result = tf.reshape(result1d, []) as tf.Scalar;
      return result;
    };
    return this.nextWithCustomSamplingFunction(button, sampleFunc);
  }

  /**
   * Given a button number, evaluates Piano Genie to produce unnormalized logits
   * then samples from these logits with a custom function. Use this if you
   * want to define custom sampling behavior (e.g. a neural cache).
   * 
   * @param button Button number (one of {0, 1, 2, 3, 4, 5, 6, 7}).
   * @param sampleFunc Sampling function mapping unweighted model logits 
   * (tf.Tensor1D of size 88) to an integer (tf.Scalar) representing one of
   * them (e.g. 60).
   */
  nextWithCustomSamplingFunction(
    button: number,
    sampleFunc: (logits: tf.Tensor1D) => tf.Scalar) {
      const lastState = this.lastState;
      const lastOutput = this.lastOutput;
      const lastTime = this.lastTime;
      const time = new Date();

      let deltaTime: number;
      if (this.deltaTimeOverride === undefined) {
        deltaTime = (time.getTime() - lastTime.getTime()) / 1000;
      } else {
        deltaTime = this.deltaTimeOverride;
        this.deltaTimeOverride = undefined;
      }

      const [state, output] = this.evaluateModelAndSample(
        button, lastState, lastOutput, deltaTime, sampleFunc);

      disposeState(this.lastState);
      this.lastState = state;
      this.lastOutput = output;
      this.lastTime = time;

      return output;
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
   * Disposes model from (GPU) memory.
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

  /**
   * Overrides the model's state for its last output. Mainly used to test the
   * model, but can also be used in combination with custom sampling behavior.
   * 
   * @param lastOutput Previous piano key sampled from the model logits.
   */
  overrideLastOutput(lastOutput: number) {
    this.lastOutput = lastOutput;
  }

  /**
   * Overrides the model's internal clock with a designated time. Mainly used
   * to test the model, but can also be used to remove user control over note
   * timing or to run preprogrammed sequences through the model.
   * 
   * @param deltaTime Amount of elapsed time in seconds since previous note.
   */
  overrideDeltaTime(deltaTime: number) {
    this.deltaTimeOverride = deltaTime;
  }

  /**
   * Given a button number, evaluates Piano Genie producing a piano key number.
   * As opposed to the next* methods, this method does *not* update internal
   * state variables such as the clock and previous outputs.
   *
   * @param button Button number (one of {0, 1, 2, 3, 4, 5, 6, 7}).
   * @param lastState The LSTM state at the previous timestep.
   * @param lastOutput The note sampled at the previous timestep.
   * @param deltaTime Elapsed time since last button press.
   * @param sampleFunc Sampling function mapping unweighted model logits 
   * (tf.Tensor1D of size 88) to an integer (tf.Scalar) representing one of
   * them (e.g. 60).
   */
  private evaluateModelAndSample(
    button: number,
    lastState: LSTMState,
    lastOutput: number,
    deltaTime: number,
    sampleFunc: (logits: tf.Tensor1D) => tf.Scalar) {
    // TODO(chrisdonahue): Make this function asynchronous.
    // This function is (currently) synchronous, blocking other execution
    // to provide mutual exclusion. This is a workaround for race conditions
    // where the LSTM state is not updated from the current call before it is
    // needed in subsequent calls. More research is required to figure out an
    // adequate asynchronous solution.

    // Validate arguments.
    if (button < 0 || button >= NUM_BUTTONS) {
      throw new Error('Invalid button specified.');
    }

    // Ensure that the model is initialized.
    if (!this.initialized) {
      // This should be an error in real-time context because the model isn't 
      // ready to be evaluated.
      throw new Error('Model is not initialized.');
    }

    // Compute logits and sample.
    const [state, output]: [LSTMState, number] = tf.tidy(() => {
      // Initialize decoder feats array.
      const decFeatsArr: tf.Tensor2D[] = [];

      // Add button input to decoder feats and translate to [-1, 1].
      const buttonTensor = tf.tensor2d([button], [1, 1], 'float32');
      const buttonScaled = 
        tf.sub(tf.mul(2., tf.div(buttonTensor, NUM_BUTTONS - 1)), 1);
      decFeatsArr.push(buttonScaled as tf.Tensor2D);

      // Add autoregression (history) to decoder feats.
      const lastOutputTensor = tf.tensor1d([lastOutput], 'int32');
      const lastOutputInc = 
        tf.add(lastOutputTensor, tf.scalar(1, 'int32')) as tf.Tensor1D;
      const lastOutputOh = 
        tf.cast(tf.oneHot(lastOutputInc, NUM_PIANOKEYS + 1), 'float32');
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
      const logits1D = tf.reshape(logits, [NUM_PIANOKEYS]) as tf.Tensor1D;

      // Sample from logits.
      const sample = sampleFunc(logits1D);
      const output = sample.dataSync()[0];

      return [state, output] as [LSTMState, number];
    });

    return [state, output] as [LSTMState, number];
  }
}

export {PianoGenie};
