/**
 * Core implementation for [GANSynth]{@link
 * https://g.co/magenta/gansynth} models.
 *
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
 * Imports.
 */
import * as tf from '@tensorflow/tfjs';

import * as logging from '../core/logging';
import {specgramsToAudio} from './audio_utils';
import {boxUpscale, initialPad, pixelNorm} from './custom_layers';

class GANSynth {
  private checkpointURL: string;
  private initialized: boolean;
  // private outputShape: number[];
  private readonly nn = tf.sequential();
  public readonly nLatents = 256;
  public readonly nPitches = 61;
  public readonly minMidiPitch = 24;
  public readonly maxMidiPitch = 84;
  public readonly midiPitches = this.maxMidiPitch - this.minMidiPitch + 1;

  /**
   * `GANSynth` constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   * @param chunkLength The length of chunks (excluding receptive field
   * padding). Sequences longer than this amount will be split into batches of
   * this size for processing.
   */
  constructor(checkpointURL: string) {
    this.checkpointURL = checkpointURL;
  }

  /**
   * Loads variables from the checkpoint and builds the model graph.
   */
  async initialize() {
    const startTime = performance.now();
    const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                     .then((response) => response.json())
                     .then(
                         (manifest: tf.io.WeightsManifestConfig) =>
                             tf.io.loadWeights(manifest, this.checkpointURL));

    // Rescale for He initialization
    // Training initialized to N(0,1) and then rescaled output, so here we get
    // the same result by rescaling the saved weights.
    tf.tidy(() => {
      for (const v in vars) {
        if (v.includes('kernel')) {
          const fanIn = vars[v].shape[0] * vars[v].shape[1] * vars[v].shape[2];
          const tmp = vars[v];
          vars[v] = tf.mul(tmp, tf.sqrt(2 / fanIn));
          tmp.dispose();
        }
      }

      this.build(vars);
      this.initialized = true;
      logging.logWithDuration('Initialized model', startTime, 'GANSynth');
    });

    Object.keys(vars).map(name => vars[name].dispose());
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    if (!this.initialized) {
      return;
    }
    this.nn.dispose();
    this.initialized = false;
  }

  /**
   * Returns true iff model is intialized.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Builds the model with the given variables.
   */
  private build(vars: tf.NamedTensorMap) {
    tf.tidy(() => {
      // Generates spectrograms and phase from random noise.

      // A single config of args for all convolutional layers.
      // `any` because ConvLayerArgs is not exported from tf.js.
      // tslint:disable-next-line:no-any
      const convConfig: any = {
        filters: 256,
        kernelSize: [2, 16],
        strides: [1, 1],
        activation: 'linear',  // no-op
        useBias: true,
        padding: 'valid',
        dilationRate: [1, 1],
        trainable: false
      };

      // Stage 1.
      // The first layer is basically a 'same' conv2dTranspose
      // but we have to implement with padding because python did it this way
      // otherwise the weight matrix is transposed wrong.
      const inputShape = {inputShape: [1, 1, this.nLatents + this.nPitches]};
      this.nn.add(pixelNorm(1e-8, inputShape));
      this.nn.add(initialPad(2, 16));
      this.nn.add(tf.layers.conv2d(convConfig));
      this.nn.add(tf.layers.leakyReLU({alpha: 0.2}));
      this.nn.add(pixelNorm());

      convConfig.padding = 'same';
      convConfig.kernelSize = [3, 3];
      this.nn.add(tf.layers.conv2d(convConfig));
      this.nn.add(tf.layers.leakyReLU({alpha: 0.2}));
      this.nn.add(pixelNorm());

      const layerFilters = [256, 256, 256, 128, 64, 32];
      for (let i = 0; i < layerFilters.length; i++) {
        // Upsample.
        this.nn.add(boxUpscale(2));
        // Convolution stage.
        convConfig.filters = layerFilters[i];
        this.nn.add(tf.layers.conv2d(convConfig));
        this.nn.add(tf.layers.leakyReLU({alpha: 0.2}));
        this.nn.add(pixelNorm());
        this.nn.add(tf.layers.conv2d(convConfig));
        this.nn.add(tf.layers.leakyReLU({alpha: 0.2}));
        this.nn.add(pixelNorm());
      }

      // Output.
      convConfig.filters = 2;
      convConfig.kernelSize = [1, 1];
      convConfig.activation = 'tanh';
      this.nn.add(tf.layers.conv2d(convConfig));

      this.setWeights(vars);
    });
  }

  private setWeights(vars: tf.NamedTensorMap) {
    function getVar(name: string) {
      const v = vars[name];
      if (v === undefined) {
        throw Error(`Variable not found: ${name}`);
      }
      return v;
    }

    // tslint:disable-next-line
    const prefix = 'Generator/progressive_gan_generator/progressive_gan_block_';
    const weights = [
      getVar(`${prefix}1/conv0/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}1/conv0/bias/ExponentialMovingAverage`),
      getVar(`${prefix}1/conv1/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}1/conv1/bias/ExponentialMovingAverage`),
      getVar(`${prefix}2/conv0/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}2/conv0/bias/ExponentialMovingAverage`),
      getVar(`${prefix}2/conv1/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}2/conv1/bias/ExponentialMovingAverage`),
      getVar(`${prefix}3/conv0/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}3/conv0/bias/ExponentialMovingAverage`),
      getVar(`${prefix}3/conv1/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}3/conv1/bias/ExponentialMovingAverage`),
      getVar(`${prefix}4/conv0/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}4/conv0/bias/ExponentialMovingAverage`),
      getVar(`${prefix}4/conv1/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}4/conv1/bias/ExponentialMovingAverage`),
      getVar(`${prefix}5/conv0/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}5/conv0/bias/ExponentialMovingAverage`),
      getVar(`${prefix}5/conv1/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}5/conv1/bias/ExponentialMovingAverage`),
      getVar(`${prefix}6/conv0/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}6/conv0/bias/ExponentialMovingAverage`),
      getVar(`${prefix}6/conv1/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}6/conv1/bias/ExponentialMovingAverage`),
      getVar(`${prefix}7/conv0/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}7/conv0/bias/ExponentialMovingAverage`),
      getVar(`${prefix}7/conv1/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}7/conv1/bias/ExponentialMovingAverage`),
      getVar(`${prefix}7/to_rgb/conv2d/kernel/ExponentialMovingAverage`),
      getVar(`${prefix}7/to_rgb/bias/ExponentialMovingAverage`),
    ];
    this.nn.setWeights(weights);
  }

  /**
   * Predicts LogMelMagnitudes and IFreq from latent (z) and pitch conditioning.
   *
   * @param inputs A 4-D Tensor of latent (z) concatenated with one-hot pitch
   * conditioning. Size [batch, 1, 1, nLatents].
   * @param batchSize Size of input batch.
   * @returns a 4-D Tensor size [batch, time, freq, ch]. First channel is
   *     LogMelSpectrogram and second channel is InstantaneousFrequency.
   */
  predict(inputs: tf.Tensor4D, batchSize: number) {
    return this.nn.predict(inputs, {batchSize}) as tf.Tensor4D;
  }

  /**
   * Creates one random sample of LogMelSpecgram and IFreq from integer pitch.
   *
   * @param pitch Integer MIDI pitch number of sound to generate.
   * @returns specgrams a 4-D Tensor size [batch, time, freq, ch].
   *    First channel is LogMelSpectrogram and
   *    second channel is InstantaneousFrequency.
   */
  randomSample(pitch: number) {
    return tf.tidy(() => {
      const z = tf.randomNormal([1, this.nLatents], 0, 1, 'float32');
      // Get one hot for pitch encoding
      const pitchIdx = tf.tensor1d([pitch - this.minMidiPitch], 'int32');
      const pitchOneHot = tf.oneHot(pitchIdx, this.midiPitches);
      // Concat and add width and height dimensions.
      const cond = tf.concat([z, pitchOneHot], 1).expandDims(1).expandDims(1) as
          tf.Tensor4D;
      const specgrams = this.predict(cond, 1);
      return specgrams;
    });
  }

  /**
   * Include specgramsToAudio as a member method for API/export.
   *
   * @param specgrams a 4-D Tensor size [batch, time, freq, ch].
   *    First channel is LogMelSpectrogram and
   *    second channel is InstantaneousFrequency.
   * @returns Float32Array of audio samples for first specgram in the batch.
   */
  specgramsToAudio(specgrams: tf.Tensor4D) {
    return specgramsToAudio(specgrams);
  }
}

export {GANSynth};
