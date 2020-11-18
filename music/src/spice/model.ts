/**
 * Core implementation for [SPICE]{@link
 * https://tfhub.dev/google/spice/2} model.
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
import { startSpice, getAudioFeatures } from './spice';
import { AudioFeatures } from '../ddsp/interfaces';

const TFHUB_SPICE_MODEL_URL =
  'https://tfhub.dev/google/tfjs-model/spice/2/default/1';

class SPICE {
  private initialized: boolean;
  private modelUrl: string;
  private spiceModel: tf.GraphModel;

  /**
   * `SPICE` constructor.
   */
  constructor(modelUrl?: string) {
    if (modelUrl) {
      this.modelUrl = modelUrl;
    } else {
      this.modelUrl = TFHUB_SPICE_MODEL_URL;
    }
  }

  /**
   * Loads variables from the checkpoint and builds the model graph.
   */
  async initialize() {
    this.spiceModel = await startSpice(this.modelUrl);
  }

  /**
   * Include getAudioFeatures as a member method for API/export.
   *
   * @param inputAudioBuffer An AudioBuffer
   * @returns Audio Features of provided audio buffer
   */
  async getAudioFeatures(
    inputAudioBuffer: AudioBuffer,
    confidenceThreshold?: number
  ): Promise<AudioFeatures> {
    return await getAudioFeatures(
      inputAudioBuffer,
      this.spiceModel,
      confidenceThreshold
    );
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    if (!this.initialized) {
      return;
    }
    this.spiceModel.dispose();
    this.initialized = false;
  }

  /**
   * Returns true if model is intialized.
   */
  isInitialized() {
    return this.initialized;
  }
}

export { SPICE };
