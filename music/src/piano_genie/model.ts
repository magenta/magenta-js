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

import * as tf from '@tensorflow/tfjs';

import {fetch} from '../core/fetch';

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
 * Piano Genie base class without autoregression.
 */
class PianoGenieBase {
  private checkpointURL: string;
  private initialized: boolean;

  // Model state.
  private modelVars: { [varName: string]: tf.Tensor };
  private decLSTMCells: tf.LSTMCellFunc[];
  private decForgetBias: tf.Scalar;

  // Execution state.
  private lastState: LSTMState;
  private button: number;

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

    // This runs the model once to force Tensorflow JS to allocate necessary
    // memory. Otherwise the prediction will take a long time when the user
    // presses a button for the first time.
    this.next(0);
    this.resetState();
  }

  /**
   * Gets RNN input features based on current model state.
   */
  protected getRnnInputFeats() {
    // Initialize decoder feats array.
    const feats: tf.Tensor1D = tf.tidy(() => {
      // Add button input to decoder feats and translate to [-1, 1].
      const buttonTensor = tf.tensor1d([this.button], 'float32');
      const buttonScaled =
        tf.sub(tf.mul(2., tf.div(buttonTensor, NUM_BUTTONS - 1)), 1);

      return buttonScaled.as1D();
    });

    return feats;
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
    this.button = button;

    const rnnInput = this.getRnnInputFeats();
    const [state, output] = this.evaluateModelAndSample(
      rnnInput, lastState, sampleFunc);
    rnnInput.dispose();

    disposeState(this.lastState);
    this.lastState = state;

    return output;
  }

  /**
   * Given an LSTM input, evaluates Piano Genie producing a piano key number.
   * Does not update state.
   *
   * @param rnnInput1d The LSTM input feature vector.
   * @param initialState The LSTM state at the previous timestep.
   * @param sampleFunc Sampling function mapping unweighted model logits
   * (tf.Tensor1D of size 88) to an integer (tf.Scalar) representing one of
   * them (e.g. 60).
   */
  private evaluateModelAndSample(
    rnnInput1d: tf.Tensor1D,
    initialState: LSTMState,
    sampleFunc: (logits: tf.Tensor1D) => tf.Scalar) {
    // TODO(chrisdonahue): Make this function asynchronous.
    // This function is (currently) synchronous, blocking other execution
    // to provide mutual exclusion. This is a workaround for race conditions
    // where the LSTM state is not updated from the current call before it is
    // needed in subsequent calls. More research is required to figure out an
    // adequate asynchronous solution.

    // Ensure that the model is initialized.
    if (!this.initialized) {
      // This should be an error in real-time context because the model isn't
      // ready to be evaluated.
      throw new Error('Model is not initialized.');
    }

    // Compute logits and sample.
    const [finalState, output]: [LSTMState, number] = tf.tidy(() => {
      // Project feats array through RNN input matrix.
      let rnnInput = tf.matMul(
        tf.expandDims(rnnInput1d, 0) as tf.Tensor2D,
        this.modelVars[
        'phero_model/decoder/rnn_input/dense/kernel'] as tf.Tensor2D);
      rnnInput = tf.add(
        rnnInput,
        this.modelVars[
        'phero_model/decoder/rnn_input/dense/bias'] as tf.Tensor1D);

      // Evaluate RNN.
      const [c, h] = tf.multiRNNCell(
        this.decLSTMCells, rnnInput, initialState.c, initialState.h);
      const finalState: LSTMState = { c, h };

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

      return [finalState, output] as [LSTMState, number];
    });

    return [finalState, output] as [LSTMState, number];
  }

  /**
   * Resets Piano Genie LSTM state.
   */
  resetState() {
    if (this.lastState !== undefined) {
      disposeState(this.lastState);
    }
    this.lastState = createZeroState();
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
}

/**
 * Original Piano Genie config with autoregression and delta time features.
 */
class PianoGenieAutoregressiveDeltaTime extends PianoGenieBase {
  // Execution state.
  private lastOutput: number;
  private lastTime: Date;
  private time: Date;
  private deltaTimeOverride: number;

  protected getRnnInputFeats() {
    // Initialize decoder feats array.
    const feats: tf.Tensor1D = tf.tidy(() => {
      // Initialize decoder feats array.
      const featsArr: tf.Tensor1D[] = [super.getRnnInputFeats()];

      const lastOutput = this.lastOutput;
      const lastTime = this.lastTime;
      const time = this.time;

      let deltaTime: number;
      if (this.deltaTimeOverride === undefined) {
        deltaTime = (time.getTime() - lastTime.getTime()) / 1000;
      } else {
        deltaTime = this.deltaTimeOverride;
        this.deltaTimeOverride = undefined;
      }

      // Add autoregression (history) to decoder feats.
      const lastOutputTensor = tf.scalar(lastOutput, 'int32');
      const lastOutputInc =
        tf.addStrict(lastOutputTensor, tf.scalar(1, 'int32'));
      const lastOutputOh =
        tf.cast(tf.oneHot(lastOutputInc, NUM_PIANOKEYS + 1),
          'float32') as tf.Tensor1D;
      featsArr.push(lastOutputOh);

      // Add delta times to decoder feats.
      const deltaTimeTensor = tf.scalar(deltaTime, 'float32');
      const deltaTimeBin =
        tf.round(tf.mul(deltaTimeTensor, DATA_TIME_QUANTIZE_RATE));
      const deltaTimeTrunc = tf.minimum(deltaTimeBin, DATA_MAX_DISCRETE_TIMES);
      const deltaTimeInt =
        tf.cast(tf.add(deltaTimeTrunc, 1e-4), 'int32') as tf.Tensor1D;
      const deltaTimeOh = tf.oneHot(deltaTimeInt, DATA_MAX_DISCRETE_TIMES + 1);
      const deltaTimeOhFloat = tf.cast(deltaTimeOh, 'float32') as tf.Tensor1D;
      featsArr.push(deltaTimeOhFloat);

      this.lastTime = time;

      return tf.concat1d(featsArr);
    });

    return feats;
  }

  nextWithCustomSamplingFunction(
    button: number,
    sampleFunc: (logits: tf.Tensor1D) => tf.Scalar) {
    this.time = new Date();
    const output = super.nextWithCustomSamplingFunction(button, sampleFunc);
    this.lastOutput = output;
    this.lastTime = this.time;
    return output;
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

  resetState() {
    super.resetState();
    this.lastOutput = -1;
    this.lastTime = new Date();
    this.lastTime.setSeconds(this.lastTime.getSeconds() - 100000);
    this.time = new Date();
  }
}

/**
 * Root note of chord for chord-conditioned models.
 */
enum PitchClass {
  None = 0,
  C,
  Cs,
  D,
  Eb,
  E,
  F,
  Fs,
  G,
  Ab,
  A,
  Bb,
  B
}

/**
 * Chord family for chord-conditioned models.
 */
enum ChordFamily {
  None = 0,
  Maj,
  Min,
  Aug,
  Dim,
  Seven,
  Maj7,
  Min7,
  Min7b5
}

/**
 * Piano Genie conditioned on chords.
 */
class PianoGenieAutoregressiveDeltaTimeChord
  extends PianoGenieAutoregressiveDeltaTime {
  private chordRoot: PitchClass;
  private chordFamily: ChordFamily;

  protected getRnnInputFeats() {
    // Initialize decoder feats array.
    const feats: tf.Tensor1D = tf.tidy(() => {
      // Initialize decoder feats array.
      const feats1d = super.getRnnInputFeats();
      const featsArr: tf.Tensor1D[] = [feats1d];

      // Add chord root to decoder feats.
      const chordRootTensor = tf.scalar(this.chordRoot, 'int32');
      const chordRootTensorSubOne =
        tf.subStrict(chordRootTensor, tf.scalar(1, 'int32'));
      const chordRootTensorOh = tf.cast(
        tf.oneHot(chordRootTensorSubOne, 12), 'float32') as tf.Tensor1D;
      featsArr.push(chordRootTensorOh);

      // Add chord family to decoder feats.
      const chordFamilyTensor = tf.scalar(this.chordFamily, 'int32');
      const chordFamilyTensorSubOne =
        tf.subStrict(chordFamilyTensor, tf.scalar(1, 'int32'));
      const chordFamilyTensorOh = tf.cast(
        tf.oneHot(chordFamilyTensorSubOne, 8), 'float32') as tf.Tensor1D;
      featsArr.push(chordFamilyTensorOh);

      return tf.concat1d(featsArr);
    });

    return feats;
  }

  /**
   * Sets the root pitch of the chord for subsequent predictions (e.g. D=3).
   *
   * @param chordRoot Root pitch.
   */
  setChordRoot(chordRoot: PitchClass) {
    this.chordRoot = chordRoot;
  }

  /**
   * Sets the family of the chord for subsequent predictions (e.g. Aug=3).
   *
   * @param chordFamily Chord family.
   */
  setChordFamily(chordFamily: ChordFamily) {
    this.chordFamily = chordFamily;
  }

  resetState() {
    super.resetState();
    this.chordRoot = PitchClass.None;
    this.chordFamily = ChordFamily.None;
  }
}

/**
 * Piano Genie conditioned on key signature.
 */
class PianoGenieAutoregressiveDeltaTimeKeysig
  extends PianoGenieAutoregressiveDeltaTime {
  private keySignature: PitchClass;

  protected getRnnInputFeats() {
    // Initialize decoder feats array.
    const feats: tf.Tensor1D = tf.tidy(() => {
      // Initialize decoder feats array.
      const feats1d = super.getRnnInputFeats();
      const featsArr: tf.Tensor1D[] = [feats1d];

      // Add key signature to decoder feats.
      const keySigTensor = tf.scalar(this.keySignature, 'int32');
      const keySigTensorSubOne =
        tf.subStrict(keySigTensor, tf.scalar(1, 'int32'));
      const keySigTensorOh = tf.cast(
        tf.oneHot(keySigTensorSubOne, 12), 'float32') as tf.Tensor1D;
      featsArr.push(keySigTensorOh);

      return tf.concat1d(featsArr);
    });

    return feats;
  }

  /**
   * Sets the key signature for subsequent predictions (e.g. D=3).
   *
   * @param keySignature Key signature.
   */
  setKeySignature(keySignature: PitchClass) {
    this.keySignature = keySignature;
  }

  resetState() {
    super.resetState();
    this.keySignature = PitchClass.None;
  }
}

// TypeScript does not support multiple inheritance.
/**
 * Piano Genie conditioned on key signature and chord.
 */
class PianoGenieAutoregressiveDeltaTimeKeysigChord
  extends PianoGenieAutoregressiveDeltaTimeKeysig {
  private chordRoot: PitchClass;
  private chordFamily: ChordFamily;

  protected getRnnInputFeats() {
    // Initialize decoder feats array.
    const feats: tf.Tensor1D = tf.tidy(() => {
      // Initialize decoder feats array.
      const feats1d = super.getRnnInputFeats();
      const featsArr: tf.Tensor1D[] = [feats1d];

      // Add chord root to decoder feats.
      const chordRootTensor = tf.scalar(this.chordRoot, 'int32');
      const chordRootTensorSubOne =
        tf.subStrict(chordRootTensor, tf.scalar(1, 'int32'));
      const chordRootTensorOh = tf.cast(
        tf.oneHot(chordRootTensorSubOne, 12), 'float32') as tf.Tensor1D;
      featsArr.push(chordRootTensorOh);

      // Add chord family to decoder feats.
      const chordFamilyTensor = tf.scalar(this.chordFamily, 'int32');
      const chordFamilyTensorSubOne =
        tf.subStrict(chordFamilyTensor, tf.scalar(1, 'int32'));
      const chordFamilyTensorOh = tf.cast(
        tf.oneHot(chordFamilyTensorSubOne, 8), 'float32') as tf.Tensor1D;
      featsArr.push(chordFamilyTensorOh);

      return tf.concat1d(featsArr);
    });

    return feats;
  }

  /**
   * Sets the root pitch of the chord for subsequent predictions (e.g. D=3).
   *
   * @param chordRoot Root pitch.
   */
  setChordRoot(chordRoot: PitchClass) {
    this.chordRoot = chordRoot;
  }

  /**
   * Sets the family of the chord for subsequent predictions (e.g. Aug=3).
   *
   * @param chordFamily Chord family.
   */
  setChordFamily(chordFamily: ChordFamily) {
    this.chordFamily = chordFamily;
  }

  resetState() {
    super.resetState();
    this.chordRoot = PitchClass.None;
    this.chordFamily = ChordFamily.None;
  }
}

/**
 * Piano Genie conditioned on key signature and chord family.
 */
class PianoGenieAutoregressiveDeltaTimeKeysigChordFamily
  extends PianoGenieAutoregressiveDeltaTimeKeysig {
  private chordFamily: ChordFamily;

  protected getRnnInputFeats() {
    // Initialize decoder feats array.
    const feats: tf.Tensor1D = tf.tidy(() => {
      // Initialize decoder feats array.
      const feats1d = super.getRnnInputFeats();
      const featsArr: tf.Tensor1D[] = [feats1d];

      // Add chord family to decoder feats.
      const chordFamilyTensor = tf.scalar(this.chordFamily, 'int32');
      const chordFamilyTensorSubOne =
        tf.subStrict(chordFamilyTensor, tf.scalar(1, 'int32'));
      const chordFamilyTensorOh = tf.cast(
        tf.oneHot(chordFamilyTensorSubOne, 8), 'float32') as tf.Tensor1D;
      featsArr.push(chordFamilyTensorOh);

      return tf.concat1d(featsArr);
    });

    return feats;
  }

  /**
   * Sets the family of the chord for subsequent predictions (e.g. Aug=3).
   *
   * @param chordFamily Chord family.
   */
  setChordFamily(chordFamily: ChordFamily) {
    this.chordFamily = chordFamily;
  }

  resetState() {
    super.resetState();
    this.chordFamily = ChordFamily.None;
  }
}

/**
 * Simplify public API names and preserve original API.
 */
class PianoGenie extends PianoGenieAutoregressiveDeltaTime { }
class PianoGenieChord extends PianoGenieAutoregressiveDeltaTimeChord { }
class PianoGenieKeysig extends PianoGenieAutoregressiveDeltaTimeKeysig { }
class PianoGenieKeysigChord extends
  PianoGenieAutoregressiveDeltaTimeKeysigChord { }
class PianoGenieKeysigChordFamily extends
  PianoGenieAutoregressiveDeltaTimeKeysigChordFamily { }

export {
  PianoGenie,
  PianoGenieChord,
  PianoGenieKeysig,
  PianoGenieKeysigChord,
  PianoGenieKeysigChordFamily,
  PitchClass,
  ChordFamily
};
