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
import * as test from 'tape';
import * as aux_inputs from './aux_inputs';

test('Test Binary Counter', (t: test.Test) => {
  const spec: aux_inputs.BinaryCounterSpec = {
    type: 'BinaryCounter',
    args: {numBits: 2}
  };
  const bc = aux_inputs.auxiliaryInputFromSpec(spec);
  const tensors = bc.getTensors(5);
  const splitTensors = tf.split(tensors, 5);
  t.equal(bc.depth, 2);
  t.deepEqual(tensors.shape, [5, 2]);
  t.deepEqual(splitTensors[0].dataSync(), [1.0, -1.0]);
  t.deepEqual(splitTensors[1].dataSync(), [-1.0, 1.0]);
  t.deepEqual(splitTensors[2].dataSync(), [1.0, 1.0]);
  t.deepEqual(splitTensors[3].dataSync(), [-1.0, -1.0]);
  t.deepEqual(splitTensors[4].dataSync(), [1.0, -1.0]);
  t.end();
});
