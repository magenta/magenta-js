/**
 * Core implementation for [DDSP]{@link
 * https://g.co/magenta/ddsp} models.
 *
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
import '@tensorflow/tfjs-backend-webgl';

import { getAudioFeatures, synthesize, memCheck } from './ddsp';
import { AudioFeatures, ModelValues } from './interfaces';
import { startSpice } from './spice';

class DDSP {
  private initialized: boolean;
  private spiceModel: tf.GraphModel;
  private checkpointUrl: string;

  /**
   * `DDSP` constructor.
   */
  constructor() {}

  /**
   * Loads variables from the checkpoint and builds the model graph.
   */
  async initialize() {
    tf.registerOp('Roll', (node) => {
      const tensors = tf.split(node.inputs[0], 2, 2);
      const result = tf.concat([tensors[1], tensors[0]], 2);
      tensors.forEach((tensor) => tensor.dispose());
      return result;
    });
    tf.env().set('WEBGL_PACK', false);
    tf.env().set('WEBGL_CONV_IM2COL', false);
    tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 100 * 1024 * 1024);

    this.spiceModel = await startSpice();
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    if (!this.initialized) {
      return;
    }
    this.initialized = false;
    this.spiceModel.dispose();
  }

  /**
   * Returns true if model is intialized.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Include memCheck as a member method for API/export.
   *
   * @param memCheck An AudioBuffer
   * @returns Audio Features of provided audio buffer
   */
  async memCheck(): Promise<boolean> {
    return await memCheck();
  }

  /**
   * Include getAudioFeatures as a member method for API/export.
   *
   * @param inputAudioBuffer An AudioBuffer
   * @returns Audio Features of provided audio buffer
   */
  async getAudioFeatures(
    inputAudioBuffer: AudioBuffer
  ): Promise<AudioFeatures> {
    return await getAudioFeatures(inputAudioBuffer, this.spiceModel);
  }

  /**
   * Synthesizes audio features based on model.
   *
   * @param inputAudioBuffer An AudioBuffer
   * @returns Audio Features of provided audio buffer
   */
  async synthesize(
    checkpointUrl: string,
    audioFeatures: AudioFeatures,
    options?: ModelValues
  ): Promise<Float32Array> {
    return await synthesize(checkpointUrl, audioFeatures, options);
  }
}

export { DDSP };
