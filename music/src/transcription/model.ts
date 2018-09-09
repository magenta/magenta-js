/**
 * Core implementation for [Onsets and Frames]{@link
 * https://g.co/magenta/onsets-frames} models.
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
import * as tf from '@tensorflow/tfjs';

import {preprocessAudio} from './audio_utils';
import {MEL_SPEC_BINS, MIDI_PITCHES} from './constants';
// tslint:disable-next-line:max-line-length
import {batchInput, pianorollToNoteSequence, unbatchOutput} from './transcription_utils';

/**
 * Main "Onsets And Frames" piano transcription model class.
 */
export class OnsetsAndFrames {
  private checkpointURL: string;
  public batchLength: number;
  private initialized: boolean;

  private onsetsCnn: tf.Sequential;
  private onsetsRnn: BidiLstm;
  private activationCnn: tf.Sequential;
  private frameRnn: BidiLstm;
  private velocityCnn: tf.Sequential;

  /**
   * `OnsetsAndFrames` constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   * @param batchLength The length of batches (excluding receptive field
   * padding). Sequences longer than this amount will be split into batches of
   * this size for processing.
   */
  constructor(checkpointURL: string, batchLength = 250) {
    this.checkpointURL = checkpointURL;
    this.batchLength = batchLength;
  }

  /**
   * Loads variables from the checkpoint and builds the model graph.
   */
  async initialize() {
    this.dispose();
    this.logMessage('Initializing model...');

    const start = performance.now();
    const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                     .then((response) => response.json())
                     .then(
                         (manifest: tf.io.WeightsManifestConfig) =>
                             tf.io.loadWeights(manifest, this.checkpointURL));
    this.build(vars);
    Object.keys(vars).map(name => vars[name].dispose());
    this.initialized = true;

    this.logMessage(`Initialized in ${totalSeconds(start)}s.`);
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    if (!this.initialized) {
      return;
    }
    this.onsetsCnn.dispose();
    this.onsetsRnn.dispose();
    this.activationCnn.dispose();
    this.frameRnn.dispose();
    this.velocityCnn.dispose();
    this.initialized = false;
  }

  /**
   * Returns true iff model is intialized.
   */
  isInitialized() {
    return this.initialized;
  }

  // tslint:disable:max-line-length
  /**
   * Transcribes a piano performance from a mel spectrogram.
   *
   * @param melSpec A [mel spectrogram]{@link
   * https://librosa.github.io/librosa/generated/librosa.feature.melspectrogram.html}
   * shaped `[frame, bin]`.
   * @param parallelBatches The number of convolutional batches to compute in
   * parallel. May need to be reduced if hitting a timeout in the browser.
   * @returns A `NoteSequence` containing the transcribed piano performance.
   */
  // tslint:enable:max-line-length
  async transcribeFromMelSpec(melSpec: number[][], parallelBatches = 4) {
    if (!this.isInitialized()) {
      this.initialize();
    }
    const start = performance.now();

    this.logMessage('Computing onsets, frames, and velocities...');
    const [frameProbs, onsetProbs, velocities] = tf.tidy(() => {
      const batches = batchInput(melSpec, this.batchLength);
      return this.processBatches(
          batches, this.batchLength, melSpec.length, parallelBatches);
    });

    this.logMessage('Converting to NoteSequence...');
    const ns = pianorollToNoteSequence(
        frameProbs as tf.Tensor2D, onsetProbs as tf.Tensor2D,
        velocities as tf.Tensor2D);
    ns.then(() => {
      frameProbs.dispose();
      onsetProbs.dispose();
      velocities.dispose();
      this.logMessage(`Transcribed in ${totalSeconds(start)}.`);
    });
    return ns;
  }

  /**
   * Transcribes a piano performance from audio.
   *
   * @param audioBuffer An audio buffer to transcribe.
   * @param parallelBatches The number of convolutional batches to compute in
   * parallel. May need to be reduced if hitting a timeout in the browser.
   * @returns A `NoteSequence` containing the transcribed piano performance.
   */
  async transcribeFromAudio(audioBuffer: AudioBuffer, parallelBatches = 4) {
    this.logMessage('Converting audio to mel spectrogram...');
    const melSpec =
        (await preprocessAudio(audioBuffer)).map(a => Array.from(a));
    return this.transcribeFromMelSpec(melSpec, parallelBatches);
  }

  private processBatches(
      batches: tf.Tensor3D, batchLength: number, fullLength: number,
      parallelBatches: number) {
    const predictConfig = {batchSize: parallelBatches};
    const runCnns =
        ((batch: tf.Tensor3D) =>
             [this.onsetsCnn.predict(batch, predictConfig) as tf.Tensor3D,
              this.activationCnn.predict(batch, predictConfig) as tf.Tensor3D,
              this.velocityCnn.predict(batch, predictConfig) as tf.Tensor3D]);

    let onsetsCnnOut, activationProbs, scaledVelocities: tf.Tensor3D;
    if (batches.shape[0] === 1) {
      [onsetsCnnOut, activationProbs, scaledVelocities] =
          runCnns(batches.expandDims(-1));
    } else {
      const batchesOutput = runCnns(batches.expandDims(-1));
      const allOutputs: tf.Tensor3D[] = [];
      for (let i = 0; i < 3; ++i) {
        allOutputs.push(unbatchOutput(
            batchesOutput[i],
            batchLength,
            fullLength,
            ));
      }
      [onsetsCnnOut, activationProbs, scaledVelocities] = allOutputs;
    }

    const onsetProbs = this.onsetsRnn.predict(onsetsCnnOut, this.batchLength);
    onsetsCnnOut.dispose();

    const frameProbInputs = tf.concat3d([onsetProbs, activationProbs], -1);
    activationProbs.dispose();
    const frameProbs = this.frameRnn.predict(frameProbInputs, this.batchLength);

    // Translates a velocity estimate to a MIDI velocity value.
    const velocities = tf.clipByValue(scaledVelocities, 0., 1.)
                           .mul(tf.scalar(80.))
                           .add(tf.scalar(10.))
                           .toInt();
    scaledVelocities.dispose();
    // Squeeze batch dims.
    return [frameProbs.squeeze(), onsetProbs.squeeze(), velocities.squeeze()];
  }

  /**
   * Builds the model with the given variables.
   */
  private build(vars: tf.NamedTensorMap) {
    function getVar(name: string) {
      const v = vars[name];
      if (v === undefined) {
        throw Error(`Variable not found: ${name}`);
      }
      return v;
    }

    function convWeights(scope: string) {
      return [
        getVar(`${scope}/conv1/weights`),
        getVar(`${scope}/conv1/BatchNorm/beta`),
        getVar(`${scope}/conv1/BatchNorm/moving_mean`),
        getVar(`${scope}/conv1/BatchNorm/moving_variance`),
        getVar(`${scope}/conv2/weights`),
        getVar(`${scope}/conv2/BatchNorm/beta`),
        getVar(`${scope}/conv2/BatchNorm/moving_mean`),
        getVar(`${scope}/conv2/BatchNorm/moving_variance`),
        getVar(`${scope}/conv3/weights`),
        getVar(`${scope}/conv3/BatchNorm/beta`),
        getVar(`${scope}/conv3/BatchNorm/moving_mean`),
        getVar(`${scope}/conv3/BatchNorm/moving_variance`),
        getVar(`${scope}/fc5/weights`),
        getVar(`${scope}/fc5/biases`),
      ];
    }

    function denseWeights(scope: string) {
      return [getVar(`${scope}/weights`), getVar(`${scope}/biases`)];
    }

    tf.tidy(() => {
      // Onsets model has a conv net, followed by an LSTM. We separate the two
      // parts so that we can process the convolution in batch and then
      // flatten before passing through the LSTM.
      const onsetsCnn = this.getAcousticCnn();
      onsetsCnn.setWeights(convWeights('onsets'));
      this.onsetsCnn = onsetsCnn;

      this.onsetsRnn = new BidiLstm([null, onsetsCnn.outputShape[2] as number]);
      this.onsetsRnn.setWeights(vars, 'onsets', 'onset_probs');

      const activationCnn = this.getAcousticCnn();
      activationCnn.add(tf.layers.dense(
          {units: MIDI_PITCHES, activation: 'sigmoid', trainable: false}));
      activationCnn.setWeights(
          convWeights('frame').concat(denseWeights('frame/activation_probs')));
      this.activationCnn = activationCnn;

      // Frame RNN takes concatenated ouputs of onsetsRnn and activationCnn
      // as its inputs.
      this.frameRnn = new BidiLstm([null, MIDI_PITCHES * 2]);
      this.frameRnn.setWeights(vars, 'frame', 'frame_probs');

      const velocityCnn = this.getAcousticCnn();
      velocityCnn.add(tf.layers.dense(
          {units: MIDI_PITCHES, activation: 'linear', trainable: false}));
      velocityCnn.setWeights(
          convWeights('velocity')
              .concat(denseWeights('velocity/onset_velocities')));
      this.velocityCnn = velocityCnn;
    });
  }

  /**
   * Returns an acoustic stack without setting variables.
   */
  private getAcousticCnn() {
    const acousticCnn = tf.sequential();
    // tslint:disable-next-line:no-any
    const convConfig: any = {
      filters: 32,
      kernelSize: [3, 3],
      activation: 'linear',  // no-op
      useBias: false,
      padding: 'same',
      dilationRate: [1, 1],
      inputShape: [null, MEL_SPEC_BINS, 1],
      trainable: false
    };
    const batchNormConfig = {scale: false, trainable: false};

    acousticCnn.add(tf.layers.conv2d(convConfig));
    acousticCnn.add(tf.layers.batchNormalization(batchNormConfig));
    acousticCnn.add(tf.layers.activation({activation: 'relu'}));

    convConfig.inputShape = null;
    acousticCnn.add(tf.layers.conv2d(convConfig));
    acousticCnn.add(tf.layers.batchNormalization(batchNormConfig));
    acousticCnn.add(tf.layers.activation({activation: 'relu'}));
    acousticCnn.add(
        tf.layers.maxPooling2d({poolSize: [1, 2], strides: [1, 2]}));

    convConfig.filters = 64;
    acousticCnn.add(tf.layers.conv2d(convConfig));
    acousticCnn.add(tf.layers.batchNormalization(batchNormConfig));
    acousticCnn.add(tf.layers.activation({activation: 'relu'}));
    acousticCnn.add(
        tf.layers.maxPooling2d({poolSize: [1, 2], strides: [1, 2]}));

    const dims = acousticCnn.outputShape as number[];
    acousticCnn.add(
        tf.layers.reshape({targetShape: [dims[1], dims[2] * dims[3]]}));

    acousticCnn.add(
        tf.layers.dense({units: 512, activation: 'relu', trainable: false}));

    return acousticCnn;
  }

  private logMessage(msg: string) {
    console.info('%cO&F', 'background:magenta; color:white', msg);
  }
}

/**
 * Helper class to create a Bidirecitonal LSTM layer.
 */
class BidiLstm {
  private readonly fwLstm: tf.Model;
  private readonly bwLstm: tf.Model;
  private readonly dense = tf.sequential();
  private readonly units: number;

  constructor(inputShape: number[], units = 128) {
    this.units = units;

    function getLstm(goBackwards: boolean) {
      const lstm = tf.layers.lstm({
        inputShape,
        units,
        goBackwards,
        returnSequences: true,
        recurrentActivation: 'sigmoid',
        returnState: true,
        kernelInitializer: 'zeros',
        recurrentInitializer: 'zeros',
        biasInitializer: 'zeros',
        trainable: false
      });
      const inputs = [
        tf.input({shape: inputShape}), tf.input({shape: [units]}),
        tf.input({shape: [units]})
      ];
      const outputs = lstm.apply(inputs) as tf.SymbolicTensor[];
      return tf.model({inputs, outputs});
    }

    this.fwLstm = getLstm(false);
    this.bwLstm = getLstm(true);
    this.dense.add(tf.layers.dense({
      inputShape: [null, units * 2],
      units: MIDI_PITCHES,
      activation: 'sigmoid',
      trainable: false
    }));
  }

  dispose() {
    this.fwLstm.dispose();
    this.bwLstm.dispose();
    this.dense.dispose();
  }

  setWeights(vars: tf.NamedTensorMap, scope: string, denseName: string) {
    function getVar(name: string) {
      const v = vars[name];
      if (v === undefined) {
        throw Error(`Variable not found: ${name}`);
      }
      return v;
    }

    // The gate ordering differs in Keras.
    const reorderGates = ((weights: tf.Tensor, forgetBias = 0) => {
      const [i, c, f, o] = tf.split(weights, 4, -1);
      return tf.concat([i, f.add(tf.scalar(forgetBias)), c, o], -1);
    });
    // The kernel is split into the input and recurrent kernels in Keras.
    const splitAndReorderKernel =
        ((kernel: tf.Tensor2D) => tf.split(
             reorderGates(kernel) as tf.Tensor2D,
             [kernel.shape[0] - this.units, this.units]));

    const setLstmWeights = (lstm: tf.Model, dir: string) => lstm.setWeights(
        splitAndReorderKernel(
            getVar(`${scope}/bidirectional_rnn/${dir}/lstm_cell/kernel`) as
            tf.Tensor2D)
            .concat(
                reorderGates(
                    getVar(`${scope}/bidirectional_rnn/${dir}/lstm_cell/bias`),
                    1.0) as tf.Tensor2D));

    setLstmWeights(this.fwLstm, 'fw');
    setLstmWeights(this.bwLstm, 'bw');
    this.dense.setWeights([
      getVar(`${scope}/${denseName}/weights`),
      getVar(`${scope}/${denseName}/biases`)
    ]);
  }

  predict(inputs: tf.Tensor3D, chunkSize: number) {
    return tf.tidy(() => this.predictImpl(inputs, chunkSize));
  }

  private predictImpl(inputs: tf.Tensor3D, chunkSize: number) {
    const fullLength = inputs.shape[1];
    const inputChunks: tf.Tensor3D[] = [];
    const numChunks = Math.ceil(fullLength / chunkSize);
    const bwI = (i: number) => numChunks - i - 1;

    for (let i = 0; i < numChunks; ++i) {
      inputChunks.push(inputs.slice(
          [0, i * chunkSize], [-1, (i < numChunks - 1) ? chunkSize : -1]));
    }

    const outputFwChunks: tf.Tensor3D[] = [];
    const outputBwChunks: tf.Tensor3D[] = [];
    let fwState: [tf.Tensor2D, tf.Tensor2D] =
        [tf.zeros([1, this.units]), tf.zeros([1, this.units])];
    let bwState: [tf.Tensor2D, tf.Tensor2D] =
        [tf.zeros([1, this.units]), tf.zeros([1, this.units])];
    for (let i = 0; i < inputChunks.length; ++i) {
      let input = [inputChunks[i], fwState[0], fwState[1]];
      let res =
          this.fwLstm.predict(input) as [tf.Tensor3D, tf.Tensor2D, tf.Tensor2D];
      outputFwChunks.push(res[0]);
      fwState = res.slice(1) as [tf.Tensor2D, tf.Tensor2D];

      input = [inputChunks[bwI(i)], bwState[0], bwState[1]];
      res =
          this.bwLstm.predict(input) as [tf.Tensor3D, tf.Tensor2D, tf.Tensor2D];
      outputBwChunks.push(tf.reverse(res[0], 1));
      bwState = res.slice(1) as [tf.Tensor2D, tf.Tensor2D];
    }
    inputChunks.forEach(t => t.dispose());

    const outputProbs: tf.Tensor3D[] = [];
    for (let i = 0; i < numChunks; ++i) {
      outputProbs.push(
          this.dense.predict(tf.concat3d(
              [outputFwChunks[i], outputBwChunks[bwI(i)]], -1)) as tf.Tensor3D);
    }
    return outputProbs.length === 1 ? outputProbs[0] :
                                      tf.concat3d(outputProbs, 1);
  }
}

function totalSeconds(start: number) {
  return ((performance.now() - start) / 1000).toPrecision(3);
}
