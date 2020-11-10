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

import { synthesize, memCheck, getModelValues, getModel } from './ddsp';
import { AudioFeatures, ModelValues } from './interfaces';

class DDSP {
  private initialized: boolean;
  private checkpointUrl: string;
  private model: tf.GraphModel;

  /**
   * `DDSP` constructor.
   */
  constructor(checkpointUrl: string) {
    this.checkpointUrl = checkpointUrl;
  }

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

    this.model = await getModel(this.checkpointUrl);
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    if (!this.initialized) {
      return;
    }
    this.model.dispose();
    this.checkpointUrl = null;
    this.initialized = false;
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
   * Synthesizes audio features based on model.
   *
   * @param inputAudioBuffer An AudioBuffer
   * @returns Audio Features of provided audio buffer
   */
  async synthesize(
    audioFeatures: AudioFeatures,
    options?: ModelValues
  ): Promise<Float32Array> {
    let modelValues = getModelValues(this.checkpointUrl);

    if (options !== null) {
      modelValues = { ...modelValues, ...options };
    }
    return await synthesize(this.model, audioFeatures, modelValues);
  }
}

export { DDSP };
