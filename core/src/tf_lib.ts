/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as tf from '@tensorflow/tfjs';

export function split(
    t: tf.Tensor, numOrSizeSplits: number[] | number, axis: number) {
  if (axis < 0) {
    axis += t.rank;
  }
  let splitSizes: number[];
  if (typeof(numOrSizeSplits) === 'number') {
    splitSizes = Array(numOrSizeSplits).fill(t.shape[axis] / numOrSizeSplits);
  } else {
    splitSizes = numOrSizeSplits;
  }
  const begin = Array(t.rank).fill(0);
  return splitSizes.map(s => {
    const size = t.shape.slice();
    size[axis] = s;
    const slice = t.slice(begin, size);
    begin[axis] += s;
    return slice;
  });
}
