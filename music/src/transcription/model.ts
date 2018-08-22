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
import {MIDI_PITCHES} from '../core/constants';


export class OnsetsAndFrames {
  private onsetsModel: tf.Sequential;
  private velocitiesModel: tf.Sequential;
  private activationModel: tf.Sequential;
  private frameModel: tf.Sequential;

  public initialize() {
    this.onsetsModel = this.getAcousticModel();
    this.onsetsModel.add(
        tf.layers.dense({units: MIDI_PITCHES, activation: 'sigmoid'}));

    this.velocitiesModel = this.getAcousticModel();
    this.velocitiesModel.add(
        tf.layers.dense({units: MIDI_PITCHES, activation: undefined}));

    this.activationModel = this.getAcousticModel();
    this.activationModel.add(
        tf.layers.dense({units: MIDI_PITCHES, activation: 'sigmoid'}));

    this.frameModel = tf.sequential();
    this.frameModel.add(tf.layers.concatenate());
    const rnn = tf.layers.lstm({units: 128}) as tf.RNN;
    this.frameModel.add(
        tf.layers.bidirectional({layer: rnn, mergeMode: 'concat'}));
    this.frameModel.add(
        tf.layers.dense({units: MIDI_PITCHES, activation: 'sigmoid'}));
  }

  public transcribe(audio: tf.Tensor2D) {
    const audioBatch = audio.expandDims(0);
    const onsetsProbs = this.onsetsModel.apply(audioBatch) as tf.Tensor3D;
    const velocities = this.velocitiesModel.apply(audioBatch) as tf.Tensor3D;
    const activationProbs =
        this.activationModel.apply(audioBatch) as tf.Tensor3D;
    const frameProbs =
        this.frameModel.apply([onsetsProbs, activationProbs]) as tf.Tensor3D;
  }

  private getAcousticModel() {
    const acousticModel = tf.sequential();
    const convConfig: any = {
      filters: 32,
      kernelSize: [3, 3],
      activation: 'none',
      useBias: false,
      padding: 'same',
      dilationRate: [1, 1]
    };

    acousticModel.add(tf.layers.conv2d(convConfig));
    acousticModel.add(tf.layers.batchNormalization({scale: false}));
    acousticModel.add(tf.layers.activation({activation: 'relu'}));

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

    return acousticModel;
  }
}
