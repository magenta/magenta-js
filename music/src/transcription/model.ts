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

const MIN_MIDI_PITCH = 21;
const MAX_MIDI_PITCH = 108;
const MIDI_PITCHES = MAX_MIDI_PITCH - MIN_MIDI_PITCH + 1;

const SAMPLE_RATE = 16000;
const SPEC_HOP_LENGTH = 512;
const FRAME_LENGTH_SECONDS = SPEC_HOP_LENGTH / SAMPLE_RATE;

const LSTM_UNITS = 128;

function getBidiLstm() {
  const lstm = tf.layers.lstm({
    units: LSTM_UNITS,
    returnSequences: true,
    unitForgetBias: true,
    trainable: false
  }) as tf.RNN;
  return tf.layers.bidirectional(
      {layer: lstm, mergeMode: 'concat', trainable: false});
}

export class OnsetsAndFrames {
  private checkpointURL: string;
  private initialized: boolean;

  private onsetsModel: tf.Sequential;
  private velocityModel: tf.Sequential;
  private activationModel: tf.Sequential;
  private frameModel: tf.Model;

  constructor(checkpointURL: string) {
    this.checkpointURL = checkpointURL;
  }

  async initialize() {
    // this.dispose();

    const rawVars =
        await fetch(`${this.checkpointURL}/weights_manifest.json`)
            .then((response) => response.json())
            .then(
                (manifest: tf.io.WeightsManifestConfig) =>
                    tf.io.loadWeights(manifest, this.checkpointURL));
    const vars = new Map<string, tf.Tensor>();
    Object.keys(rawVars).map(name => vars.set(name, rawVars[name]));

    this.build(vars);
    this.initialized = true;
    console.log('Initialized OnsetsAndFrames.');
  }

  /**
   * Returns true iff model is intialized.
   */
  isInitialized() {
    return this.initialized;
  }

  async transcribeFromMelSpec(melSpec: number[][]) {
    if (!this.isInitialized) {
      this.initialize();
    }
    // Add batch dim.
    const melSpecBatch = tf.tensor2d(melSpec)
                             .slice([0, 0], [375, -1])
                             .expandDims(0)
                             .expandDims(-1);

    const onsetProbs = this.onsetsModel.predict(melSpecBatch) as tf.Tensor3D;
    const velocities = this.velocityModel.predict(melSpecBatch) as tf.Tensor3D;
    const activationProbs =
        this.activationModel.predict(melSpecBatch) as tf.Tensor3D;
    const frameProbs =
        this.frameModel.predict([onsetProbs, activationProbs]) as tf.Tensor3D;

    // Squeeze batch dims.
    return this.pianorollToNoteSequence(
        frameProbs.squeeze(), onsetProbs.squeeze(), velocities.squeeze());
  }

  private build(vars: Map<string, tf.Tensor>) {
    function getVar(name: string) {
      if (!vars.has(name)) {
        throw Error(`Variable not found: ${name}`);
      }
      return vars.get(name);
    }
    function convWeights(prefix: string) {
      return [
        getVar(`${prefix}/conv1/weights`),
        getVar(`${prefix}/conv1/BatchNorm/beta`),
        getVar(`${prefix}/conv1/BatchNorm/moving_mean`),
        getVar(`${prefix}/conv1/BatchNorm/moving_variance`),
        getVar(`${prefix}/conv2/weights`),
        getVar(`${prefix}/conv2/BatchNorm/beta`),
        getVar(`${prefix}/conv2/BatchNorm/moving_mean`),
        getVar(`${prefix}/conv2/BatchNorm/moving_variance`),
        getVar(`${prefix}/conv3/weights`),
        getVar(`${prefix}/conv3/BatchNorm/beta`),
        getVar(`${prefix}/conv3/BatchNorm/moving_mean`),
        getVar(`${prefix}/conv3/BatchNorm/moving_variance`),
        getVar(`${prefix}/fc5/weights`),
        getVar(`${prefix}/fc5/biases`),
      ];
    }

    function lstmWeights(prefix: string) {
      // The gate ordering differs in Keras.
      const reorderGates = ((weights: tf.Tensor) => {
        const [i, c, f, o] = tf.split(weights, 4, -1);
        return tf.concat([i, f, c, o], -1);
      });
      // The kernel is split into the input and recurrent kernels in Keras.
      const splitAndReorderKernel =
          ((kernel: tf.Tensor2D) => tf.split(
               reorderGates(kernel) as tf.Tensor2D,
               [kernel.shape[0] - LSTM_UNITS, LSTM_UNITS]));

      const [fwKernel, fwRecurrentKernel] = splitAndReorderKernel(
          getVar(`${prefix}/bidirectional_rnn/fw/lstm_cell/kernel`) as
          tf.Tensor2D);

      const [bwKernel, bwRecurrentKernel] = splitAndReorderKernel(
          getVar(`${prefix}/bidirectional_rnn/bw/lstm_cell/kernel`) as
          tf.Tensor2D);
      return [
        fwKernel, fwRecurrentKernel,
        reorderGates(getVar(`${prefix}/bidirectional_rnn/fw/lstm_cell/bias`)),
        bwKernel, bwRecurrentKernel,
        reorderGates(getVar(`${prefix}/bidirectional_rnn/bw/lstm_cell/bias`))
      ];
    }

    function denseWeights(prefix: string) {
      return [getVar(`${prefix}/weights`), getVar(`${prefix}/biases`)];
    }

    const onsetsModel = this.getAcousticModel('sigmoid', true);
    onsetsModel.setWeights(convWeights('onsets').concat(
        lstmWeights('onsets'), denseWeights('onsets/onset_probs')));

    const velocityModel = this.getAcousticModel('linear', false);
    velocityModel.setWeights(
        convWeights('velocity')
            .concat(denseWeights('velocity/onset_velocities')));

    const activationModel = this.getAcousticModel('sigmoid', false);
    activationModel.setWeights(
        convWeights('frame').concat(denseWeights('frame/activation_probs')));

    const onsetsInput =
        tf.input({batchShape: onsetsModel.outputShape as number[]});
    const activationInput =
        tf.input({batchShape: activationModel.outputShape as number[]});
    let net = tf.layers.concatenate().apply([onsetsInput, activationInput]);

    net = getBidiLstm().apply(net);
    net =
        tf.layers
            .dense(
                {units: MIDI_PITCHES, activation: 'sigmoid', trainable: false})
            .apply(net) as tf.SymbolicTensor;
    const frameModel =
        tf.model({inputs: [onsetsInput, activationInput], outputs: net});
    frameModel.trainable = false;
    frameModel.setWeights(
        lstmWeights('frame').concat(denseWeights('frame/frame_probs')));

    this.frameModel = frameModel;
    this.onsetsModel = onsetsModel;
    this.velocityModel = velocityModel;
    this.activationModel = activationModel;
  }

  private getAcousticModel(finalActivation: string, hasLstm: boolean) {
    const acousticModel = tf.sequential();
    // tslint:disable-next-line:no-any
    const convConfig: any = {
      filters: 32,
      kernelSize: [3, 3],
      activation: 'linear',
      useBias: false,
      padding: 'same',
      dilationRate: [1, 1],
      inputShape: [null, 229, 1],
      trainable: false
    };
    const batchNormConfig = {scale: false, trainable: false};

    acousticModel.add(tf.layers.conv2d(convConfig));
    acousticModel.add(tf.layers.batchNormalization(batchNormConfig));
    acousticModel.add(tf.layers.activation({activation: 'relu'}));

    convConfig.inputShape = null;
    acousticModel.add(tf.layers.conv2d(convConfig));
    acousticModel.add(tf.layers.batchNormalization(batchNormConfig));
    acousticModel.add(tf.layers.activation({activation: 'relu'}));
    acousticModel.add(
        tf.layers.maxPooling2d({poolSize: [1, 2], strides: [1, 2]}));

    convConfig.filters = 64;
    acousticModel.add(tf.layers.conv2d(convConfig));
    acousticModel.add(tf.layers.batchNormalization(batchNormConfig));
    acousticModel.add(tf.layers.activation({activation: 'relu'}));
    acousticModel.add(
        tf.layers.maxPooling2d({poolSize: [1, 2], strides: [1, 2]}));

    const dims = acousticModel.outputShape as number[];
    acousticModel.add(
        tf.layers.reshape({targetShape: [dims[1], dims[2] * dims[3]]}));

    acousticModel.add(
        tf.layers.dense({units: 512, activation: 'relu', trainable: false}));

    if (hasLstm) {
      acousticModel.add(getBidiLstm());
    }

    acousticModel.add(tf.layers.dense(
        {units: MIDI_PITCHES, activation: finalActivation, trainable: false}));

    return acousticModel;
  }

  private async pianorollToNoteSequence(
      frameProbs: tf.Tensor2D, onsetProbs: tf.Tensor2D,
      velocityValues: tf.Tensor2D, onsetThreshold = 0.5, frameThreshold = 0.5) {
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

    const ns = NoteSequence.create();

    // Store (step + 1) with 0 signifying no active note.
    const pitchStartStepPlusOne = new Uint8Array(MIDI_PITCHES);
    const onsetVelocities = new Uint8Array(MIDI_PITCHES);
    let frame: Uint8Array;
    let onsets: Uint8Array;
    let previousOnsets = new Uint8Array(MIDI_PITCHES);

    function unscaleVelocity(velocity: number) {
      // Translates a velocity estimate to a MIDI velocity value
      return Math.floor(Math.max(Math.min(velocity, 1.), 0) * 80. + 10.);
    }

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

    function processActivePitch(p: number, f: number, velocity: number) {
      if (pitchStartStepPlusOne[p]) {
        // Pitch is already active, but if this is a new onset, we should end
        // the note and start a new one.
        if (onsets[p] && !previousOnsets[p]) {
          pitchStartStepPlusOne[p] = f + 1;
          endPitch(p, f);
          onsetVelocities[p] = velocity;
        }
      } else {
        // Only allow a new note to start if we've predicted an onset.
        if (onsets[p]) {
          pitchStartStepPlusOne[p] = f + 1;
          onsetVelocities[p] = velocity;
        }
      }
    }
    const splitFrames = tf.unstack(framePredictions);
    const splitOnsets = tf.unstack(onsetPredictions);
    const splitVelocities = tf.unstack(velocityValues);
    for (let f = 0; f < splitFrames.length; ++f) {
      frame = await splitFrames[f].data() as Uint8Array;
      onsets = await splitOnsets[f].data() as Uint8Array;
      const velocities = await splitVelocities[f].data() as Uint8Array;
      for (let p = 0; p < frame.length; ++p) {
        if (frame[p]) {
          processActivePitch(p, f, unscaleVelocity(velocities[p]));
        } else if (pitchStartStepPlusOne[p]) {
          endPitch(p, f);
        }
      }
      previousOnsets = onsets;
    }
    ns.totalTime = splitFrames.length * FRAME_LENGTH_SECONDS;
    return ns;
  }
}
