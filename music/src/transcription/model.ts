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

import {NoteSequence} from '../protobuf';

export const MIN_MIDI_PITCH = 21;
export const MAX_MIDI_PITCH = 108;
export const MIDI_PITCHES = MAX_MIDI_PITCH - MIN_MIDI_PITCH + 1;

const SAMPLE_RATE = 16000;
const SPEC_HOP_LENGTH = 512;
export const FRAME_LENGTH_SECONDS = SPEC_HOP_LENGTH / SAMPLE_RATE;

const LSTM_UNITS = 128;
const BATCH_LENGTH = 125

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
  return tf.layers.bidirectional({
    layer: lstm,
    mergeMode: 'concat',
    inputShape: inputShape,
    trainable: false
  });
}

/**
 * Main "Onsets And Frames" piano transcription model class.
 */
export class OnsetsAndFrames {
  private checkpointURL: string;
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
   */
  constructor(checkpointURL: string) {
    this.checkpointURL = checkpointURL;
  }

  /**
   * Loads variables from the checkpoint and builds the model graph.
   */
  async initialize() {
    this.dispose();

    const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                     .then((response) => response.json())
                     .then(
                         (manifest: tf.io.WeightsManifestConfig) =>
                             tf.io.loadWeights(manifest, this.checkpointURL));
    this.build(vars);
    Object.keys(vars).map(name => vars[name].dispose());
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
   * @returns A `NoteSequence` containing the transcribed piano performance.
   */
  // tslint:enable:max-line-length
  async transcribeFromMelSpec(melSpec: number[][], batchSize: number) {
    if (!this.isInitialized()) {
      this.initialize();
    }

    const [frameProbs, onsetProbs, velocities] = tf.tidy(() => {
      // Add batch dim.
      const melSpecBatch =
          tf.tensor2d(melSpec.slice(0, BATCH_LENGTH * batchSize))
              .as3D(batchSize, BATCH_LENGTH, -1);

      const RF_PAD = 3
      // Pad batches.
      const leftPad = tf.slice(melSpecBatch, [0, BATCH_LENGTH - RF_PAD], [
                          batchSize - 1, -1
                        ]).pad([[1, 0], [0, 0], [0, 0]]);
      const rightPad = tf.slice(melSpecBatch, [1, 0], [-1, RF_PAD]).pad([
        [0, 1], [0, 0], [0, 0]
      ]);
      const melSpecPaddedBatch =
          tf.concat([leftPad, melSpecBatch, rightPad], 1).expandDims(-1);

      debugger;

      const flattenAndCropBatch = ((t: tf.Tensor3D) => {
        const c = tf.slice(t, [0, RF_PAD], [-1, BATCH_LENGTH]);
        return tf.reshape(c, [1, batchSize * BATCH_LENGTH, -1]) as tf.Tensor3D;
      })

      // Flatten the output of the onsets CNN before passing to the RNN.
      const onsetProbs =
          this.onsetsRnn.predict(flattenAndCropBatch(
              this.onsetsCnn.predict(melSpecPaddedBatch) as tf.Tensor3D)) as
          tf.Tensor3D;

      const activationProbs = flattenAndCropBatch(
          this.activationCnn.predict(melSpecPaddedBatch) as tf.Tensor3D);
      const frameProbs =
          this.frameRnn.predict(tf.concat([onsetProbs, activationProbs], -1)) as
          tf.Tensor3D;

      const scaledVelocities = flattenAndCropBatch(
          this.velocityCnn.predict(melSpecPaddedBatch) as tf.Tensor3D);
      // Translates a velocity estimate to a MIDI velocity value.
      const velocities = tf.clipByValue(scaledVelocities, 0., 1.)
                             .mul(tf.scalar(80.))
                             .add(tf.scalar(10.))
                             .toInt();

      // Squeeze batch dims.
      return [
        tf.unstack(frameProbs)[0], tf.unstack(onsetProbs)[0],
        tf.unstack(velocities)[0]
      ];
    });

    const ns = pianorollToNoteSequence(
        frameProbs as tf.Tensor2D, onsetProbs as tf.Tensor2D,
        velocities as tf.Tensor2D);
    frameProbs.dispose();
    onsetProbs.dispose();
    velocities.dispose();
    return ns;
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
      // parts so that we can process the convolution in batch and then flatten
      // before passing through the LSTM.
      const onsetsCnn = this.getacousticCnn();
      onsetsCnn.setWeights(convWeights('onsets'));
      this.onsetsCnn = onsetsCnn;

      const onsetsRnn = tf.sequential();
      onsetsRnn.add(getBidiLstm([null, onsetsCnn.outputShape[2] as number]));
      onsetsRnn.add(tf.layers.dense(
          {units: MIDI_PITCHES, activation: 'sigmoid', trainable: false}));
      onsetsRnn.setWeights(
          lstmWeights('onsets').concat(denseWeights('onsets/onset_probs')));
      this.onsetsRnn = onsetsRnn;

      const activationCnn = this.getacousticCnn();
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

      const velocityCnn = this.getacousticCnn();
      velocityCnn.add(tf.layers.dense(
          {units: MIDI_PITCHES, activation: 'linear', trainable: false}));
      velocityCnn.setWeights(
          convWeights('velocity')
              .concat(denseWeights('velocity/onset_velocities')));
      this.velocityCnn = velocityCnn
    });
  }

  /**
   * Returns an acoustic stack without setting variables.
   */
  private getacousticCnn() {
    const acousticCnn = tf.sequential();
    // tslint:disable-next-line:no-any
    const convConfig: any = {
      filters: 32,
      kernelSize: [3, 3],
      activation: 'linear',  // no-op
      useBias: false,
      padding: 'same',  // Assume the input is pre-padded
      dilationRate: [1, 1],
      inputShape: [null, 229, 1],
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

/**
 * Converts the model predictions to a NoteSequence.
 *
 * @param frameProbs Probabilities of an active frame, shaped `[frame,
 * pitch]`.
 * @param onsetProbs Probabilities of an onset, shaped `[frame, pitch]`.
 * @param velocityValues Predicted velocities in the range [0, 127], shaped
 * `[frame, pitch]`.
 * @returns A `NoteSequence` containing the transcribed piano performance.
 */
export async function pianorollToNoteSequence(
    frameProbs: tf.Tensor2D, onsetProbs: tf.Tensor2D,
    velocityValues: tf.Tensor2D, onsetThreshold = 0.5, frameThreshold = 0.5) {
  const [splitFrames, splitOnsets, splitVelocities] = tf.tidy(() => {
    let onsetPredictions =
        tf.greater(onsetProbs, onsetThreshold) as tf.Tensor2D;
    let framePredictions =
        tf.greater(frameProbs, frameThreshold) as tf.Tensor2D;

    // Add silent frame at the end so we can do a final loop and terminate any
    // notes that are still active.
    onsetPredictions = onsetPredictions.pad([[0, 1], [0, 0]]);
    framePredictions = framePredictions.pad([[0, 1], [0, 0]]);
    velocityValues = velocityValues.pad([[0, 1], [0, 0]]);

    // Ensure that any frame with an onset prediction is considered active.
    framePredictions = tf.logicalOr(framePredictions, onsetPredictions);

    return [
      tf.unstack(framePredictions), tf.unstack(onsetPredictions),
      tf.unstack(velocityValues)
    ];
  });

  const ns = NoteSequence.create();

  // Store (step + 1) with 0 signifying no active note.
  const pitchStartStepPlusOne = new Uint32Array(MIDI_PITCHES);
  const onsetVelocities = new Uint8Array(MIDI_PITCHES);
  let frame: Uint8Array;
  let onsets: Uint8Array;
  let previousOnsets = new Uint8Array(MIDI_PITCHES);

  function endPitch(pitch: number, endFrame: number) {
    // End an active pitch.
    ns.notes.push(NoteSequence.Note.create({
      pitch: pitch + MIN_MIDI_PITCH,
      startTime: (pitchStartStepPlusOne[pitch] - 1) * FRAME_LENGTH_SECONDS,
      endTime: endFrame * FRAME_LENGTH_SECONDS,
      velocity: onsetVelocities[pitch]
    }));
    pitchStartStepPlusOne[pitch] = 0;
  }

  function processOnset(p: number, f: number, velocity: number) {
    if (pitchStartStepPlusOne[p]) {
      // Pitch is already active, but if this is a new onset, we should end
      // the note and start a new one.
      if (!previousOnsets[p]) {
        endPitch(p, f);
        pitchStartStepPlusOne[p] = f + 1;
        onsetVelocities[p] = velocity;
      }
    } else {
      pitchStartStepPlusOne[p] = f + 1;
      onsetVelocities[p] = velocity;
    }
  }

  for (let f = 0; f < splitFrames.length; ++f) {
    frame = await splitFrames[f].data() as Uint8Array;
    onsets = await splitOnsets[f].data() as Uint8Array;
    const velocities = await splitVelocities[f].data() as Uint8Array;
    splitFrames[f].dispose();
    splitOnsets[f].dispose();
    splitVelocities[f].dispose();
    for (let p = 0; p < frame.length; ++p) {
      if (onsets[p]) {
        processOnset(p, f, velocities[p]);
      } else if (!frame[p] && pitchStartStepPlusOne[p]) {
        endPitch(p, f);
      }
    }
    previousOnsets = onsets;
  }
  ns.totalTime = splitFrames.length * FRAME_LENGTH_SECONDS;
  return ns;
}
