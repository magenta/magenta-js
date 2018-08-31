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

import AudioUtils from './audio_utils';
// tslint:disable-next-line:max-line-length
import {batchInput, MIDI_PITCHES, pianorollToNoteSequence, unbatchOutput} from './transcription_utils';

const MEL_SPEC_BINS = 229;
const LSTM_UNITS = 128;

/**
 * Helper function to create a Bidirecitonal LSTM layer.
 */
function getBidiLstm(inputShape?: number[]) {
  const lstm = tf.layers.lstm({
    units: LSTM_UNITS,
    returnSequences: true,
    recurrentActivation: 'sigmoid',
    trainable: false
  }) as tf.RNN;
  return tf.layers.bidirectional(
      {layer: lstm, mergeMode: 'concat', inputShape, trainable: false});
}

/**
 * Main "Onsets And Frames" piano transcription model class.
 */
export class OnsetsAndFrames {
  private checkpointURL: string;
  public batchLength: number;
  private initialized: boolean;

  private onsetsCnn: tf.Sequential;
  private onsetsRnn: tf.Sequential;
  private activationCnn: tf.Sequential;
  private frameRnn: tf.Sequential;
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
   *
   * @param warmup Whether to warm up the model by passing through a zero input.
   * Will make subsequent calls faster.
   */
  async initialize(warmup = true) {
    this.dispose();

    const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                     .then((response) => response.json())
                     .then(
                         (manifest: tf.io.WeightsManifestConfig) =>
                             tf.io.loadWeights(manifest, this.checkpointURL));
    this.build(vars);
    Object.keys(vars).map(name => vars[name].dispose());
    if (warmup) {
      this.processBatches(tf.zeros([1, 16, MEL_SPEC_BINS]), 8, 8, 1);
    }
    this.initialized = true;
    console.log('Initialized OnsetsAndFrames.');
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
  async transcribeFromMelSpec(melSpec: number[][], parallelBatches = 32) {
    if (!this.isInitialized()) {
      this.initialize();
    }

    const [frameProbs, onsetProbs, velocities] = tf.tidy(() => {
      const batches = batchInput(melSpec, this.batchLength);
      return this.processBatches(
          batches, this.batchLength, melSpec.length, parallelBatches);
    });

    const ns = pianorollToNoteSequence(
        frameProbs as tf.Tensor2D, onsetProbs as tf.Tensor2D,
        velocities as tf.Tensor2D);
    frameProbs.dispose();
    onsetProbs.dispose();
    velocities.dispose();
    return ns;
  }

  async getMelSpec(audioBuffer: AudioBuffer) {
    audioBuffer = await AudioUtils.resampleWebAudio(audioBuffer, 16000);
    const arrayBuffer: Float32Array = audioBuffer.getChannelData(0);
    // ???
    const fftSize = 2048;
    const hopLength = 512;
    const melCount = 229;

    // Calculate STFT from the ArrayBuffer.
    const stft = AudioUtils.stft(arrayBuffer, fftSize, hopLength);

    // Each STFT column is an FFT array which is interleaved complex. For STFT
    // rendering, we want to show only the magnitudes.
    const stftEnergies = stft.map(fft => AudioUtils.fftEnergies(fft));

    // Calculate mel energy spectrogram from STFT.
    return AudioUtils.melSpectrogram(stftEnergies, melCount);
  }

  async transcribeFromAudio(audioBuffer: AudioBuffer) {
    const melSpec = await this.getMelSpec(audioBuffer);
    return this.transcribeFromMelSpec(melSpec);
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
    const onsetProbs = this.onsetsRnn.predict(onsetsCnnOut) as tf.Tensor3D;
    const frameProbs =
        this.frameRnn.predict(tf.concat([onsetProbs, activationProbs], -1)) as
        tf.Tensor3D;
    // Translates a velocity estimate to a MIDI velocity value.
    const velocities = tf.clipByValue(scaledVelocities, 0., 1.)
                           .mul(tf.scalar(80.))
                           .add(tf.scalar(10.))
                           .toInt();
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

    function lstmWeights(scope: string) {
      // The gate ordering differs in Keras.
      const reorderGates = ((weights: tf.Tensor, forgetBias = 0) => {
        const [i, c, f, o] = tf.split(weights, 4, -1);
        return tf.concat([i, f.add(tf.scalar(forgetBias)), c, o], -1);
      });
      // The kernel is split into the input and recurrent kernels in Keras.
      const splitAndReorderKernel =
          ((kernel: tf.Tensor2D) => tf.split(
               reorderGates(kernel) as tf.Tensor2D,
               [kernel.shape[0] - LSTM_UNITS, LSTM_UNITS]));

      const [fwKernel, fwRecurrentKernel] = splitAndReorderKernel(
          getVar(`${scope}/bidirectional_rnn/fw/lstm_cell/kernel`) as
          tf.Tensor2D);

      const [bwKernel, bwRecurrentKernel] = splitAndReorderKernel(
          getVar(`${scope}/bidirectional_rnn/bw/lstm_cell/kernel`) as
          tf.Tensor2D);
      return [
        fwKernel, fwRecurrentKernel,
        reorderGates(
            getVar(`${scope}/bidirectional_rnn/fw/lstm_cell/bias`), 1.0),
        bwKernel, bwRecurrentKernel,
        reorderGates(
            getVar(`${scope}/bidirectional_rnn/bw/lstm_cell/bias`), 1.0)
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

      const onsetsRnn = tf.sequential();
      onsetsRnn.add(getBidiLstm([null, onsetsCnn.outputShape[2] as number]));
      onsetsRnn.add(tf.layers.dense(
          {units: MIDI_PITCHES, activation: 'sigmoid', trainable: false}));
      onsetsRnn.setWeights(
          lstmWeights('onsets').concat(denseWeights('onsets/onset_probs')));
      this.onsetsRnn = onsetsRnn;

      const activationCnn = this.getAcousticCnn();
      activationCnn.add(tf.layers.dense(
          {units: MIDI_PITCHES, activation: 'sigmoid', trainable: false}));
      activationCnn.setWeights(
          convWeights('frame').concat(denseWeights('frame/activation_probs')));
      this.activationCnn = activationCnn;

      // Frame RNN takes concatenated ouputs of onsetsRnn and activationCnn
      // as its inputs.
      const frameRnn = tf.sequential();
      frameRnn.add(getBidiLstm([null, MIDI_PITCHES * 2]));
      frameRnn.add(tf.layers.dense(
          {units: MIDI_PITCHES, activation: 'sigmoid', trainable: false}));
      frameRnn.setWeights(
          lstmWeights('frame').concat(denseWeights('frame/frame_probs')));
      this.frameRnn = frameRnn;

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
}
