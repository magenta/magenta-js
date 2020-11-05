/**
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
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';
import { MODEL_SAMPLE_RATE } from './constants';
import { Tensor3D } from '@tensorflow/tfjs';

async function computePower(audioChannelData: number[]): Promise<number[]> {
  const frameRate = 250;
  const frameSize = 1024;
  const refDb = 20.7;
  const ldRange = 120.0;
  const hopSize = Math.floor(MODEL_SAMPLE_RATE / frameRate);

  const audioTensor = tf.tensor1d(audioChannelData, 'float32');
  const newSamplesCount = audioChannelData.length;

  if (audioTensor === null) {
    return [];
  }

  // Compute RMS energy
  const sq = audioTensor.mul(audioTensor).reshape([newSamplesCount, 1]);
  const rmsEnergy = tf
    .conv1d(
      sq as tf.Tensor2D,
      tf.ones([frameSize, 1, 1]).div(frameSize) as Tensor3D,
      hopSize,
      'same'
    )
    .sqrt()
    .squeeze();

  // Amplitude to Db
  const amin = 1e-20;
  const powerDb = tf.mul(
    tf.log(tf.maximum(amin, rmsEnergy)).div(tf.log(10)),
    20
  );

  // Set dynamic range
  const powerDbShifted = powerDb.sub(refDb);
  const powerDbClipped = tf.maximum(powerDbShifted, -ldRange);

  // @ts-ignore
  const output: number[] = await powerDbClipped.array();

  audioTensor.dispose();
  sq.dispose();
  rmsEnergy.dispose();
  powerDb.dispose();
  powerDbShifted.dispose();
  powerDbClipped.dispose();

  return output;
}

export { computePower };
