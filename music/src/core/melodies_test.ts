/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
import {NoteSequence} from '../protobuf/index';
import {Melody} from './melodies';

const TEST_NS = NoteSequence.create({
  notes: [
    {pitch: 60, quantizedStartStep: 1, quantizedEndStep: 3},
    {pitch: 62, quantizedStartStep: 4, quantizedEndStep: 5},
    {pitch: 64, quantizedStartStep: 5, quantizedEndStep: 6},
    {pitch: 65, quantizedStartStep: 6, quantizedEndStep: 7},
    {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 7},
  ],
  tempos: [{qpm: 120}],
  quantizationInfo: {stepsPerQuarter: 2},
  totalQuantizedSteps: 8,
});

test('Test Melody From NoteSequence (Ignore Polyphony)', (t: test.Test) => {
  const melody = Melody.fromNoteSequence(TEST_NS, 60, 72, true);
  t.deepEqual(melody.events, [0, 2, 0, 1, 4, 6, 9, 1]);
  t.end();
});

test('Test Melody From NoteSequence (Check Polyphony)', (t: test.Test) => {
  t.throws(() => Melody.fromNoteSequence(TEST_NS, 60, 72, false));
  t.end();
});

test('Test Melody From NoteSequence (Extra Steps)', (t: test.Test) => {
  const melody = Melody.fromNoteSequence(TEST_NS, 60, 72, true, 12);
  t.deepEqual(melody.events, [0, 2, 0, 1, 4, 6, 9, 1, 0, 0, 0, 0]);
  t.end();
});

test('Test Melody To NoteSequence', (t: test.Test) => {
  const events = new Int32Array([0, 2, 0, 1, 4, 6, 9, 1]);
  const melody = new Melody(events, 60, 72);
  const ns = melody.toNoteSequence(2, 120);
  const expected = TEST_NS;
  expected.notes.pop();
  t.deepEqual(ns, expected);
  t.end();
});
