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

import * as test from 'tape';
import * as chords from './chords';
import * as controls from './controls';

test('Test Binary Counter', (t: test.Test) => {
  const spec : controls.BinaryCounterSpec = {
    type: 'BinaryCounter',
    args: {numSteps: 5, numBits: 2}
  };
  const bc = controls.controlSignalFromSpec(spec);
  t.equal(bc.numSteps, 5);
  t.equal(bc.depth, 2);
  t.deepEqual(bc.getTensor(0).dataSync(), [-1.0, -1.0]);
  t.deepEqual(bc.getTensor(1).dataSync(), [1.0, -1.0]);
  t.deepEqual(bc.getTensor(2).dataSync(), [-1.0, 1.0]);
  t.deepEqual(bc.getTensor(3).dataSync(), [1.0, 1.0]);
  t.deepEqual(bc.getTensor(4).dataSync(), [-1.0, -1.0]);
  t.throws(() => bc.getTensor(5), RangeError);
  t.end();
});

test('Test Chord Progression', (t: test.Test) => {
  const spec : controls.ChordProgressionSpec = {
    type: 'ChordProgression',
    args: {numSteps: 4, encoderType: 'MajorMinorChordEncoder'}
  };
  const cp = controls.controlSignalFromSpec(spec, ['C', 'Dm']);
  const e = new chords.MajorMinorChordEncoder();
  t.equal(cp.numSteps, 4);
  t.equal(cp.depth, e.depth);
  t.deepEqual(cp.getTensor(0).dataSync(), e.encode('C').dataSync());
  t.deepEqual(cp.getTensor(1).dataSync(), e.encode('C').dataSync());
  t.deepEqual(cp.getTensor(2).dataSync(), e.encode('Dm').dataSync());
  t.deepEqual(cp.getTensor(3).dataSync(), e.encode('Dm').dataSync());
  t.throws(() => cp.getTensor(4), RangeError);
  t.end();
});
