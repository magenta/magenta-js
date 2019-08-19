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

import {loadAudioFromFile, loadAudioFromUrl} from '../core/audio_utils.js';
import * as logging from '../core/logging.js';
import {INoteSequence} from '../protobuf/index.js';

import {preprocessAudio} from './audio_utils.js';
import {MEL_SPEC_BINS, MIDI_PITCHES} from './constants.js';
// tslint:disable-next-line:max-line-length
import {batchInput, pianorollToNoteSequence, unbatchOutput} from './transcription_utils.js';

/**
 * Main "Onsets And Frames" piano transcription model class.
 */
class OnsetsAndFrames {
  private checkpointURL: string;
  public chunkLength: number;
  private initialized: boolean;

  private onsetsCnn: AcousticCnn;
  private onsetsRnn: Lstm;
  private activationCnn: AcousticCnn;
  private frameRnn: Lstm;
  private velocityCnn: AcousticCnn;

  /**
   * `OnsetsAndFrames` constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   * @param chunkLength The length of chunks (excluding receptive field
   * padding). Sequences longer than this amount will be split into batches of
   * this size for processing.
   */
  constructor(checkpointURL: string, chunkLength = 250) {
    this.checkpointURL = checkpointURL;
    this.chunkLength = chunkLength;
  }

  /**
   * Loads variables from the checkpoint and builds the model graph.
   */
  async initialize() {
    this.dispose();
    const startTime = performance.now();

    const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                     .then((response) => response.json())
                     .then(
                         (manifest: tf.io.WeightsManifestConfig) =>
                             tf.io.loadWeights(manifest, this.checkpointURL));
    this.build(vars);
    Object.keys(vars).map(name => vars[name].dispose());
    this.initialized = true;
    logging.logWithDuration('Initialized model', startTime, 'O&F');
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
  async transcribeFromMelSpec(melSpec: number[][], parallelBatches = 4):
      Promise<INoteSequence> {
    if (!this.isInitialized()) {
      this.initialize();
    }
    const startTime = performance.now();
    logging.log(
        'Computing onsets, frames, and velocities...', 'O&F',
        logging.Level.DEBUG);

    const [frameProbs, onsetProbs, velocities] = tf.tidy(() => {
      const batches = batchInput(melSpec, this.chunkLength);
      return this.processBatches(
          batches, this.chunkLength, melSpec.length, parallelBatches);
    });

    logging.log('Converting to NoteSequence...', 'O&F', logging.Level.DEBUG);
    const ns = pianorollToNoteSequence(
        frameProbs as tf.Tensor2D, onsetProbs as tf.Tensor2D,
        velocities as tf.Tensor2D);
    ns.then(() => {
      frameProbs.dispose();
      onsetProbs.dispose();
      velocities.dispose();
      logging.logWithDuration('Transcribed from mel spec', startTime, 'O&F');
    });
    return ns;
  }

  /**
   * Transcribes a piano performance from audio buffer.
   *
   * @param audioBuffer An audio buffer to transcribe.
   * @param batchSize The number of chunks to compute in parallel. May
   * need to be reduced if hitting a timeout in the browser.
   * @returns A `NoteSequence` containing the transcribed piano performance.
   */
  async transcribeFromAudioBuffer(audioBuffer: AudioBuffer, batchSize = 4) {
    const startTime = performance.now();
    const melSpec = preprocessAudio(audioBuffer);
    melSpec.then(
        () => logging.logWithDuration(
            'Converted audio to mel spec', startTime, 'O&F',
            logging.Level.DEBUG));
    return melSpec.then(
        (spec) => this.transcribeFromMelSpec(
            spec.map(a => Array.from(a), batchSize)));
  }

  /**
   * Transcribes a piano performance from an audio file.
   *
   * @param blob An audio file blob to transcribe.
   * @returns A `NoteSequence` containing the transcribed piano performance.
   */
  async transcribeFromAudioFile(blob: Blob) {
    const audio = await loadAudioFromFile(blob);
    return this.transcribeFromAudioBuffer(audio);
  }

  /**
   * Transcribes a piano performance from an audio file ULR.
   *
   * @param url The url of the file to transcribe.
   * @returns A `NoteSequence` containing the transcribed piano performance.
   */
  async transcribeFromAudioURL(url: string) {
    const audio = await loadAudioFromUrl(url);
    return this.transcribeFromAudioBuffer(audio);
  }

  private processBatches(
      batches: tf.Tensor3D, chunkLength: number, fullLength: number,
      batchSize: number) {
    const runCnns =
        ((batch: tf.Tensor3D) =>
             [this.onsetsCnn.predict(batch, batchSize) as tf.Tensor3D,
              this.activationCnn.predict(batch, batchSize) as tf.Tensor3D,
              this.velocityCnn.predict(batch, batchSize) as tf.Tensor3D]);

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
            chunkLength,
            fullLength,
            ));
      }
      [onsetsCnnOut, activationProbs, scaledVelocities] = allOutputs;
    }

    const onsetProbs = this.onsetsRnn.predict(onsetsCnnOut, this.chunkLength);
    onsetsCnnOut.dispose();

    const frameProbInputs = tf.concat3d([onsetProbs, activationProbs], -1);
    activationProbs.dispose();
    const frameProbs = this.frameRnn.predict(frameProbInputs, this.chunkLength);

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
    tf.tidy(() => {
      // Onsets model has a conv net, followed by an LSTM. We separate the two
      // parts so that we can process the convolution in batch and then
      // flatten before passing through the LSTM.
      this.onsetsCnn = new AcousticCnn();
      this.onsetsCnn.setWeights(vars, 'onsets');
      this.onsetsRnn = new Lstm([null, this.onsetsCnn.outputShape[2]]);
      this.onsetsRnn.setWeights(vars, 'onsets', 'onset_probs');

      this.activationCnn = new AcousticCnn('sigmoid');
      this.activationCnn.setWeights(vars, 'frame', 'activation_probs');

      // Frame RNN takes concatenated ouputs of onsetsRnn and activationCnn
      // as its inputs.
      this.frameRnn = new Lstm([null, MIDI_PITCHES * 2]);
      this.frameRnn.setWeights(vars, 'frame', 'frame_probs');

      this.velocityCnn = new AcousticCnn('linear');
      this.velocityCnn.setWeights(vars, 'velocity', 'onset_velocities');
    });
  }
}

/**
 * Helper class for the acoustic CNN model.
 */
class AcousticCnn {
  readonly outputShape: number[];
  private readonly nn = tf.sequential();

  // Activation types come from here, which isn't exported:
  // tfjs-layers/blob/master/src/keras_format/activation_config.ts#L16
  constructor(finalDenseActivation?: 'elu'|'hardSigmoid'|'linear'|'relu'|
              'relu6'|'selu'|'sigmoid'|'softmax'|'softplus'|'softsign'|'tanh') {
    // tslint:disable-next-line:no-any
    const convConfig: any = {
      filters: 48,
      kernelSize: [3, 3],
      activation: 'linear',  // no-op
      useBias: false,
      padding: 'same',
      dilationRate: [1, 1],
      inputShape: [null, MEL_SPEC_BINS, 1],
      trainable: false
    };
    const batchNormConfig = {scale: false, trainable: false};

    this.nn.add(tf.layers.conv2d(convConfig));
    this.nn.add(tf.layers.batchNormalization(batchNormConfig));
    this.nn.add(tf.layers.activation({activation: 'relu'}));

    convConfig.inputShape = null;
    this.nn.add(tf.layers.conv2d(convConfig));
    this.nn.add(tf.layers.batchNormalization(batchNormConfig));
    this.nn.add(tf.layers.activation({activation: 'relu'}));
    this.nn.add(tf.layers.maxPooling2d({poolSize: [1, 2], strides: [1, 2]}));

    convConfig.filters = 96;
    this.nn.add(tf.layers.conv2d(convConfig));
    this.nn.add(tf.layers.batchNormalization(batchNormConfig));
    this.nn.add(tf.layers.activation({activation: 'relu'}));
    this.nn.add(tf.layers.maxPooling2d({poolSize: [1, 2], strides: [1, 2]}));

    const dims = this.nn.outputShape as number[];
    this.nn.add(tf.layers.reshape({targetShape: [dims[1], dims[2] * dims[3]]}));

    this.nn.add(
        tf.layers.dense({units: 768, activation: 'relu', trainable: false}));
    if (finalDenseActivation) {
      this.nn.add(tf.layers.dense({
        units: MIDI_PITCHES,
        activation: finalDenseActivation,
        trainable: false
      }));
    }
    this.outputShape = this.nn.outputShape as number[];
  }

  dispose() {
    this.nn.dispose();
  }

  predict(inputs: tf.Tensor3D, batchSize: number) {
    return this.nn.predict(inputs, {batchSize});
  }

  setWeights(vars: tf.NamedTensorMap, scope: string, denseName?: string) {
    function getVar(name: string) {
      const v = vars[name];
      if (v === undefined) {
        throw Error(`Variable not found: ${name}`);
      }
      return v;
    }

    let weights = [
      getVar(`${scope}/conv0/weights`),
      getVar(`${scope}/conv0/BatchNorm/beta`),
      getVar(`${scope}/conv0/BatchNorm/moving_mean`),
      getVar(`${scope}/conv0/BatchNorm/moving_variance`),
      getVar(`${scope}/conv1/weights`),
      getVar(`${scope}/conv1/BatchNorm/beta`),
      getVar(`${scope}/conv1/BatchNorm/moving_mean`),
      getVar(`${scope}/conv1/BatchNorm/moving_variance`),
      getVar(`${scope}/conv2/weights`),
      getVar(`${scope}/conv2/BatchNorm/beta`),
      getVar(`${scope}/conv2/BatchNorm/moving_mean`),
      getVar(`${scope}/conv2/BatchNorm/moving_variance`),
      getVar(`${scope}/fc_end/weights`),
      getVar(`${scope}/fc_end/biases`),
    ];
    if (denseName) {
      weights = weights.concat([
        getVar(`${scope}/${denseName}/weights`),
        getVar(`${scope}/${denseName}/biases`)
      ]);
    }
    this.nn.setWeights(weights);
  }
}

/**
 * Helper for a Bidirectional LSTM layer.
 *
 * Implements processing the input in chunks, which is significantly more
 * efficient in tfjs due to memory management and shader caching.
 */
class Lstm {
  private readonly lstm: tf.LayersModel;
  private readonly dense = tf.sequential();
  private readonly units: number;

  constructor(inputShape: number[], units = 384) {
    this.units = units;

    function getLstm() {
      const lstm = tf.layers.lstm({
        inputShape,
        units,
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

    this.lstm = getLstm();
    this.dense.add(tf.layers.dense({
      inputShape: [null, units],
      units: MIDI_PITCHES,
      activation: 'sigmoid',
      trainable: false
    }));
  }

  dispose() {
    this.lstm.dispose();
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

    const LSTM_PREFIX =
        'cudnn_lstm/rnn/multi_rnn_cell/cell_0/cudnn_compatible_lstm_cell';
    const setLstmWeights = (lstm: tf.LayersModel) => lstm.setWeights(
        splitAndReorderKernel(
            getVar(`${scope}/${LSTM_PREFIX}/kernel`) as tf.Tensor2D)
            .concat(
                reorderGates(getVar(`${scope}/${LSTM_PREFIX}/bias`), 1.0) as
                tf.Tensor2D));

    setLstmWeights(this.lstm);
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
    const numChunks = Math.ceil(fullLength / chunkSize);

    let state: [tf.Tensor2D, tf.Tensor2D] =
        [tf.zeros([1, this.units]), tf.zeros([1, this.units])];
    const outputChunks: tf.Tensor3D[] = [];
    for (let i = 0; i < numChunks; ++i) {
      const chunk = inputs.slice(
          [0, i * chunkSize], [-1, (i < numChunks - 1) ? chunkSize : -1]);
      const result = this.lstm.predict([
        chunk, state[0], state[1]
      ]) as [tf.Tensor3D, tf.Tensor2D, tf.Tensor2D];
      outputChunks.push(this.dense.predict(result[0]) as tf.Tensor3D);
      state = result.slice(1) as [tf.Tensor2D, tf.Tensor2D];
    }

    return outputChunks.length === 1 ? outputChunks[0] :
                                       tf.concat3d(outputChunks, 1);
  }
}

export {OnsetsAndFrames};
