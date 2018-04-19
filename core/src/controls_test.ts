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

import * as tf from '@tensorflow/tfjs-core';
import * as test from 'tape';
import * as chords from './chords';
import * as controls from './controls';

test('Test Binary Counter', (t: test.Test) => {
  const spec:
      controls.BinaryCounterSpec = {type: 'BinaryCounter', args: {numBits: 2}};
  const bc = controls.controlSignalFromSpec(spec);
  const tensors = bc.getTensors(5);
  t.equal(bc.depth, 2);
  t.deepEqual(tensors.shape, [5, 2]);
  const splitTensors = tf.split(tensors, 5);
  t.deepEqual(splitTensors[0].dataSync(), [-1.0, -1.0]);
  t.deepEqual(splitTensors[1].dataSync(), [1.0, -1.0]);
  t.deepEqual(splitTensors[2].dataSync(), [-1.0, 1.0]);
  t.deepEqual(splitTensors[3].dataSync(), [1.0, 1.0]);
  t.deepEqual(splitTensors[4].dataSync(), [-1.0, -1.0]);
  t.end();
});

test('Test Chord Progression', (t: test.Test) => {
  const spec: controls.ChordProgressionSpec = {
    type: 'ChordProgression',
    args: {encoderType: 'MajorMinorChordEncoder'}
  };
  const cp = controls.controlSignalFromSpec(spec);
  const tensors = cp.getTensors(4, {chords: ['C', 'Dm']});
  const e = new chords.MajorMinorChordEncoder();
  t.equal(cp.depth, e.depth);
  t.deepEqual(tensors.shape, [4, e.depth]);
  const splitTensors = tf.split(tensors, 4);
  t.deepEqual(splitTensors[0].dataSync(), e.encode('C').dataSync());
  t.deepEqual(splitTensors[1].dataSync(), e.encode('C').dataSync());
  t.deepEqual(splitTensors[2].dataSync(), e.encode('Dm').dataSync());
  t.deepEqual(splitTensors[3].dataSync(), e.encode('Dm').dataSync());
  t.end();
});
