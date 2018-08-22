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

import {INoteSequence, NoteSequence} from '../protobuf';

const MIN_MIDI_PITCH = 21;
const MAX_MIDI_PITCH = 108;
const MIDI_PITCHES = MAX_MIDI_PITCH - MIN_MIDI_PITCH + 1;

const SAMPLE_RATE = 16000;
const SPEC_HOP_LENGTH = 512;
const FRAME_LENGTH_SECONDS = SPEC_HOP_LENGTH / SAMPLE_RATE;

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
    this.initialized = true
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
    const melSpecBatch = tf.tensor3d([melSpec]);

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
    function convWeights(prefix: string) {
      return [
        vars.get(`{prefix}/conv1/weights`),
        vars.get(`{prefix}/conv1/BatchNorm/beta`),
        vars.get(`{prefix}/conv1/BatchNorm/moving_mean`),
        vars.get(`{prefix}/conv1/BatchNorm/moving_variance`),
        vars.get(`{prefix}/conv2/weights`),
        vars.get(`{prefix}/conv2/BatchNorm/beta`),
        vars.get(`{prefix}/conv2/BatchNorm/moving_mean`),
        vars.get(`{prefix}/conv2/BatchNorm/moving_variance`),
        vars.get(`{prefix}/conv3/weights`),
        vars.get(`{prefix}/conv3/BatchNorm/beta`),
        vars.get(`{prefix}/conv3/BatchNorm/moving_mean`),
        vars.get(`{prefix}/conv3/BatchNorm/moving_variance`),
        vars.get(`{prefix}/fc5/weights`),
        vars.get(`{prefix}/fc5/biases`),
        vars.get(`{prefix}/bidirectional_rnn/bw/lstm_cell/kernel`),
        vars.get(`{prefix}/bidirectional_rnn/bw/lstm_cell/bias`),
      ];
    }
    function lstmWeights(prefix: string) {
      return [
        vars.get(`{prefix}/bidirectional_rnn/bw/lstm_cell/kernel`),
        vars.get(`{prefix}/bidirectional_rnn/bw/lstm_cell/bias`)
      ];
    }
    function denseWeights(prefix: string) {
      return [vars.get(`{prefix}/weights`), vars.get(`{prefix}/biases`)];
    }

    const onsetsModel = this.getAcousticModel('sigmoid');
    onsetsModel.setWeights(convWeights('onsets').concat(
        lstmWeights('onsets'), denseWeights('onsets/onset_probs')));

    const velocityModel = this.getAcousticModel(undefined);
    velocityModel.setWeights(
        convWeights('velocity')
            .concat(denseWeights('velocity/onset_velocities')));

    const activationModel = this.getAcousticModel('sigmoid');
    activationModel.setWeights(
        convWeights('frame').concat(denseWeights('frame/activation_probs')));

    const onsetsInput = tf.input({shape: onsetsModel.outputShape as number[]})
    const activationInput =
        tf.input({shape: activationModel.outputShape as number[]})
    let net = tf.layers.concatenate().apply([onsetsInput, activationInput]);
    const rnn = tf.layers.lstm({units: 128}) as tf.RNN;
    net = tf.layers.bidirectional({layer: rnn, mergeMode: 'concat'}).apply(net);
    net = tf.layers.dense({units: MIDI_PITCHES, activation: 'sigmoid'})
              .apply(net) as tf.SymbolicTensor;
    const frameModel =
        tf.model({inputs: [onsetsInput, activationInput], outputs: net});
    frameModel.setWeights(
        lstmWeights('frame').concat(denseWeights('frame/frame_probs')));

    this.frameModel = frameModel;
    this.onsetsModel = onsetsModel;
    this.velocityModel = velocityModel;
    this.activationModel = activationModel;
  }

  private getAcousticModel(finalActivation?: string) {
    const acousticModel = tf.sequential();
    const convConfig: any = {
      filters: 32,
      kernelSize: [3, 3],
      activation: 'none',
      useBias: false,
      padding: 'same',
      dilationRate: [1, 1],
      inputShape: [null, 229, 1]
    };

    acousticModel.add(tf.layers.conv2d(convConfig));
    acousticModel.add(tf.layers.batchNormalization({scale: false}));
    acousticModel.add(tf.layers.activation({activation: 'relu'}));

    convConfig.inputShape = null;
    acousticModel.add(tf.layers.conv2d(convConfig));
    acousticModel.add(tf.layers.batchNormalization({scale: false}));
    acousticModel.add(tf.layers.activation({activation: 'relu'}));
    acousticModel.add(
        tf.layers.maxPooling2d({poolSize: [1, 2], strides: [1, 2]}))

    convConfig.filters = 64
    acousticModel.add(tf.layers.conv2d(convConfig));
    acousticModel.add(tf.layers.batchNormalization({scale: false}));
    acousticModel.add(tf.layers.activation({activation: 'relu'}));
    acousticModel.add(
        tf.layers.maxPooling2d({poolSize: [1, 2], strides: [1, 2]}))

    const dims = acousticModel.outputShape as number[];
    acousticModel.add(
        tf.layers.reshape({targetShape: [-1, dims[1], dims[2] * dims[3]]}));

    acousticModel.add(tf.layers.dense({units: 512, activation: 'relu'}));

    const rnn = tf.layers.lstm({units: 128}) as tf.RNN;
    acousticModel.add(
        tf.layers.bidirectional({layer: rnn, mergeMode: 'concat'}));

    acousticModel.add(
        tf.layers.dense({units: MIDI_PITCHES, activation: finalActivation}));

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
    onsetPredictions = onsetPredictions.pad([[0, 0], [0, 1]]);
    framePredictions = framePredictions.pad([[0, 0], [0, 1]]);

    // Ensure that any frame with an onset prediction is considered active.
    framePredictions = tf.logicalOr(framePredictions, onsetPredictions);

    const ns = NoteSequence.create();

    // Store (step + 1) with 0 signifying no active note.
    let pitchStartStepPlusOne = new Uint8Array(MIDI_PITCHES);
    let onsetVelocities = new Uint8Array(MIDI_PITCHES);
    let frame: Uint8Array;
    let onsets: Uint8Array;
    let previousOnsets = new Uint8Array(MIDI_PITCHES);

    function unscaleVelocity(velocity: number) {
      // Translates a velocity estimate to a MIDI velocity value
      return Math.floor(Math.max(Math.min(velocity, 1.), 0) * 80. + 10.);
    }

    function endPitch(pitch: number, endFrame: number) {
      // End an active pitch.
      const startTime =
          (pitchStartStepPlusOne[pitch] - 1) * FRAME_LENGTH_SECONDS;
      const endTime = endFrame * FRAME_LENGTH_SECONDS;

      ns.notes.push(NoteSequence.Note.create({
        pitch: pitch + MIN_MIDI_PITCH,
        startTime: startTime,
        endTime: endTime,
        velocity: onsetVelocities[pitch]
      }));

      pitchStartStepPlusOne[pitch] = 0;
    }

    function processActivePitch(p: number, f: number, velocity: number) {
      if (pitchStartStepPlusOne[p]) {
        // Pitch is already active, but if this is a new onset, we should end
        // the note and start a new one.
        if (onsets[p] && previousOnsets[p]) {
          pitchStartStepPlusOne[p] = f + 1;
          endPitch(p, f);
          onsetVelocities[p] = velocity;
        }
      } else {
        // Only allow a new note to star if we've predicted an onset.
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
