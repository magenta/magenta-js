/**
 * Core implementation for Arbitrary Image Stylization in browser
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

/**
 * Main ArbitraryStyleTransferNetwork class
 */
export class ArbitraryStyleTransferNetwork {
  private styleCheckpointURL: string;
  private transformCheckpointURL: string;

  private initialized: boolean;

  private styleNet: tf.FrozenModel;
  private transformNet: tf.FrozenModel;

  /**
   * `ArbitraryStyleTransferNetwork` constructor.
   *
   * @param styleCheckpointURL Path to style model checkpoint directory.
   * @param transformCheckpointURL Path to transformation model checkpoint
   * directory.
   */
  constructor(styleCheckpointURL: string, transformCheckpointURL: string) {
    this.styleCheckpointURL = styleCheckpointURL;
    this.transformCheckpointURL = transformCheckpointURL;
  }

  /**
   * Returns true if model is initialized.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Loads models from the checkpoints.
   */
  async initialize() {
    this.dispose();

    [this.styleNet, this.transformNet] = await Promise.all([
      tf.loadFrozenModel(
        this.styleCheckpointURL + '/tensorflowjs_model.pb',
        this.styleCheckpointURL + '/weights_manifest.json'
      ),
      tf.loadFrozenModel(
        this.transformCheckpointURL + '/tensorflowjs_model.pb',
        this.styleCheckpointURL + '/weights_manifest.json'
      ),
    ]);

    this.initialized = true;
    console.log('Initialized Arbitrary Style Transfer network');
  }

  dispose() {
    if (this.styleNet) {
      this.styleNet.dispose();
    }
    if (this.transformNet) {
      this.transformNet.dispose();
    }

    this.initialized = false;
  }

  /**
   * This function returns style bottleneck features for
   * the given image.
   *
   * @param style Style image to get 100D bottleneck features for
   */
  predictStyleParameters(style: ImageData | HTMLImageElement |
    HTMLCanvasElement | HTMLVideoElement): tf.Tensor4D {
    return tf.tidy(() => {
      return this.styleNet.predict(
        tf.fromPixels(style)
          .toFloat()
          .div(tf.scalar(255))
          .expandDims()
      );
    }) as tf.Tensor4D;
  }

  /**
   * This function stylizes the content image given the bottleneck
   * features. It returns a tf.Tensor3D containing the stylized image.
   * This can be used directly with tf.toPixels.
   *
   * @param content Content image to stylize
   * @param bottleneck Bottleneck features for the style to use
   */
  stylize(content: ImageData | HTMLImageElement |
    HTMLCanvasElement | HTMLVideoElement,
    bottleneck: tf.Tensor4D): tf.Tensor3D {
    return tf.tidy(() => {
      const image: tf.Tensor4D =
        this.transformNet.predict(
          [
            tf.fromPixels(content)
              .toFloat()
              .div(tf.scalar(255))
              .expandDims(),
            bottleneck
          ]
        ) as tf.Tensor4D;
      return image.squeeze();
    });
  }
}
