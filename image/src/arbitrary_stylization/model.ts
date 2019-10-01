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

// tslint:disable:max-line-length
const DEFAULT_STYLE_CHECKPOINT =
    'https://storage.googleapis.com/magentadata/js/checkpoints/style/arbitrary/predictor';
const DEFAULT_TRANSFORM_CHECKPOINT =
    'https://storage.googleapis.com/magentadata/js/checkpoints/style/arbitrary/transformer';
// tslint:enable:max-line-length

/**
 * Main ArbitraryStyleTransferNetwork class
 */
export class ArbitraryStyleTransferNetwork {
  private styleCheckpointURL: string;
  private transformCheckpointURL: string;

  private initialized = false;

  private styleNet: tf.FrozenModel;
  private transformNet: tf.FrozenModel;

  /**
   * `ArbitraryStyleTransferNetwork` constructor.
   *
   * @param styleCheckpointURL Path to style model checkpoint directory.
   * @param transformCheckpointURL Path to transformation model checkpoint
   * directory.
   */
  constructor(
      styleCheckpointURL = DEFAULT_STYLE_CHECKPOINT,
      transformCheckpointURL = DEFAULT_TRANSFORM_CHECKPOINT) {
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
          this.styleCheckpointURL + '/weights_manifest.json'),
      tf.loadFrozenModel(
          this.transformCheckpointURL + '/tensorflowjs_model.pb',
          this.transformCheckpointURL + '/weights_manifest.json'),
    ]);

    this.initialized = true;
    core.log('Initialized Arbitrary Style Transfer network');
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
  private predictStyleParameters(style: ImageData|HTMLImageElement|
                                 HTMLCanvasElement|
                                 HTMLVideoElement): tf.Tensor4D {
    return tf.tidy(() => {
      return this.styleNet.predict(
          tf.fromPixels(style).toFloat().div(tf.scalar(255)).expandDims());
    }) as tf.Tensor4D;
  }

  /**
   * This function stylizes the content image given the bottleneck
   * features. It returns a tf.Tensor3D containing the stylized image.
   *
   * @param content Content image to stylize
   * @param bottleneck Bottleneck features for the style to use
   */
  private produceStylized(
      content: ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement,
      bottleneck: tf.Tensor4D): tf.Tensor3D {
    return tf.tidy(() => {
      const image: tf.Tensor4D = this.transformNet.predict([
        tf.fromPixels(content).toFloat().div(tf.scalar(255)).expandDims(),
        bottleneck
      ]) as tf.Tensor4D;
      return image.squeeze();
    });
  }

  /**
   * This function stylizes the content image given the style image.
   * It returns an ImageData instance containing the stylized image.
   *
   * TODO(vdumoulin): Add option to resize style and content images.
   * TODO(adarob): Add option to use model with depthwise separable convs.
   *
   * @param content Content image to stylize
   * @param style Style image to use
   * @param strength If provided, controls the stylization strength.
   * Should be between 0.0 and 1.0.
   */
  stylize(
      content: ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement,
      style: ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement,
      strength?: number): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      let styleRepresentation = this.predictStyleParameters(style);
      if (strength !== undefined) {
        styleRepresentation = styleRepresentation.mul(tf.scalar(strength))
                                  .add(this.predictStyleParameters(content).mul(
                                      tf.scalar(1.0 - strength)));
      }
      const stylized = this.produceStylized(content, styleRepresentation);
      return tf.toPixels(stylized).then((bytes) => {
        const imageData =
            new ImageData(bytes, stylized.shape[1], stylized.shape[0]);
        styleRepresentation.dispose();
        stylized.dispose();
        resolve(imageData);
      });
    });
  }
}
