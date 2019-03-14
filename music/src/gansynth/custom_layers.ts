/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 *
 * Implementing a custom `Layer` in general invovles specifying a `call`
 * function, and possibly also a `computeOutputShape` and `build` function.
 * These layers do not need a custom `build` function because they do not
 * store any variables.
 *
 * Custom layers currently can not be saved / loaded.  Tracking issue at
 * https://github.com/tensorflow/tfjs/issues/254
 */
import * as tf from '@tensorflow/tfjs';

/**
 * Pixel normalization.
 * @param epsilon A small positive number to avoid division by zero.
 */
class PixelNorm extends tf.layers.Layer {
  constructor(public epsilon = 1e-8) {
    super({});
    this.supportsMasking = true;
  }

  /**
   * Computes output shape.
   * @param inputShape Shape of input.
   */
  computeOutputShape(inputShape: number[]) {
    return [inputShape[0], inputShape[1], inputShape[2], inputShape[3]];
  }

  /**
   * For each pixel a[i,j,k] of image in HWC format, normalize its value to
   * b[i,j,k] = a[i,j,k] / SQRT(SUM_k(a[i,j,k]^2) / C + eps).
   * @param inputs A 4D `Tensor` of NHWC format.
   * @param kwargs Only used as a pass through to call hooks.
   * @returns A 4D `Tensor` with pixel-wise normalized channels.
   */
  call(inputs: tf.Tensor4D): tf.Tensor4D {
    return tf.tidy(() => {
      let input = inputs;
      if (Array.isArray(input)) {
        input = input[0];
      }
      const mean = tf.mean(tf.square(input), [3], true);
      return tf.mul(input, tf.rsqrt(tf.add(mean, this.epsilon)));
    });
  }

  /**
   * Layers must implement "getClassName".
   */
  getClassName() {
    return 'PixelNorm';
  }
}

export function pixelNorm(epsilon = 1e-8) {
  return new PixelNorm(epsilon);
}

/**
 * InitialPad.
 *
 * Padding op to allow for valid upsampling convolution,
 * of the initial convolution in the stack.
 * @param kernelH Integer, size of convolution kernel height.
 * @param kernelW Integer, size of convolution kernel height.
 */
class InitialPad extends tf.layers.Layer {
  constructor(
      public kernelH = 2, public kernelW = 16, public layerConfig = {}) {
    super(layerConfig);
    this.supportsMasking = true;
  }

  /**
   * @param inputShapes A number[] of the input `Tensor` shape.
   */
  computeOutputShape(inputShape: number[]) {
    return [
      inputShape[0], 2 * (this.kernelH - 1) + inputShape[1],
      2 * (this.kernelW - 1) + inputShape[2], inputShape[3]
    ];
  }

  /**
   * @param inputs A 4D `Tensor` of NHWC format, H=1, W=1.
   * @param kwargs Only used as a pass through to call hooks.
   * @returns A 4D `Tensor` with with padding in width and height.
   */
  call(inputs: tf.Tensor4D): tf.Tensor4D {
    let input = inputs;
    if (Array.isArray(input)) {
      input = input[0];
    }
    const padH = this.kernelH - 1;
    const padW = this.kernelW - 1;
    return tf.pad(input, [[0, 0], [padH, padH], [padW, padW], [0, 0]]);
  }

  /**
   * Layers must implement "getClassName".
   */
  getClassName() {
    return 'InitialPad';
  }
}

export function initialPad(kernelH = 2, kernelW = 16, layerConfig = {}) {
  return new InitialPad(kernelH, kernelW, layerConfig);
}

/**
 * Box (Nearest Neighbor upscaling).
 * @param scale Integer amount to upscale width and height.
 */
class BoxUpscale extends tf.layers.Layer {
  constructor(public scale = 2) {
    super({});
    this.supportsMasking = true;
  }

  /**
   * @param inputShapes Shape of the input.
   */
  computeOutputShape(inputShape: number[]) {
    return [
      inputShape[0], this.scale * inputShape[1], this.scale * inputShape[2],
      inputShape[3]
    ];
  }

  /**
   * @param inputs A 4D `Tensor` of NHWC format.
   * @param kwargs Only used as a pass through to call hooks.
   * @returns A 4D `Tensor` of `images` up scaled by a factor `scale`.
   */
  call(inputs: tf.Tensor4D): tf.Tensor4D {
    return tf.tidy(() => {
      let input = inputs;
      if (Array.isArray(input)) {
        input = input[0];
      }
      const tiledInput = tf.tile(input, [this.scale ** 2, 1, 1, 1]);
      return tf.batchToSpaceND(
          tiledInput, [this.scale, this.scale], [[0, 0], [0, 0]]);
    });
  }

  /**
   * Layers must implement "getClassName".
   */
  getClassName() {
    return 'BoxUpscale';
  }
}

export function boxUpscale(scale = 2) {
  return new BoxUpscale(scale);
}
