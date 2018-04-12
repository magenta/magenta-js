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

import {tensorflow} from '@magenta/protobuf';
import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';

import * as data from './data';
import {Sequences} from './sequences';

import NoteSequence = tensorflow.magenta.NoteSequence;

const MEL_NS = NoteSequence.create({
  notes: [
    {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4},
    {pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6},
    {pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8},
    {pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16},
    {pitch: 77, quantizedStartStep: 16, quantizedEndStep: 20},
    {pitch: 80, quantizedStartStep: 20, quantizedEndStep: 24},
    {pitch: 75, quantizedStartStep: 24, quantizedEndStep: 28}
  ]
});

const DRUM_NS = NoteSequence.create({
  notes: [
    {pitch: 36, quantizedStartStep: 0}, {pitch: 42, quantizedStartStep: 0},
    {pitch: 36, quantizedStartStep: 4}, {pitch: 42, quantizedStartStep: 6},
    {pitch: 36, quantizedStartStep: 8}, {pitch: 42, quantizedStartStep: 10},
    {pitch: 36, quantizedStartStep: 12}, {pitch: 42, quantizedStartStep: 14},
    {pitch: 36, quantizedStartStep: 16}, {pitch: 36, quantizedStartStep: 24},
    {pitch: 36, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 30}
  ]
});
DRUM_NS.notes.map(n => {
  n.isDrum = true;
  n.quantizedEndStep = n.quantizedStartStep + 1;
});

const TRIO_NS = NoteSequence.create();
Sequences.clone(MEL_NS).notes.map(n => {
  n.program = 0;
  n.instrument = 0;
  TRIO_NS.notes.push((n));
});
Sequences.clone(MEL_NS).notes.map(n => {
  n.pitch -= 36;
  n.program = 32;
  n.instrument = 1;
  TRIO_NS.notes.push(n);
});
Sequences.clone(DRUM_NS).notes.map(n => {
  n.instrument = 2;
  TRIO_NS.notes.push(n);
});

test('Test MelodyConverter', (t: test.Test) => {
  const melConverter = new data.MelodyConverter(
      {'numSteps': 32, 'minPitch': 21, 'maxPitch': 108});

  const melTensor = melConverter.toTensor(MEL_NS);
  t.deepEqual(melTensor.shape, [32, 90]);

  melConverter.toNoteSequence(melTensor).then(ns => t.deepEqual(ns, MEL_NS));

  melTensor.dispose();
  t.end();
});

test('Test DrumConverters', (t: test.Test) => {
  const drumsConverter = new data.DrumsConverter({'numSteps': 32});
  const drumsOneHotConverter = new data.DrumsOneHotConverter({'numSteps': 32});
  const drumRollConverter = new data.DrumRollConverter({'numSteps': 32});

  const drumRollTensor = drumsConverter.toTensor(DRUM_NS);
  t.deepEqual(drumRollTensor.get(), drumRollConverter.toTensor(DRUM_NS).get());
  t.deepEqual(drumRollTensor.shape, [32, 10]);

  const drumOneHotTensor = drumsOneHotConverter.toTensor(DRUM_NS);
  t.deepEqual(drumOneHotTensor.shape, [32, 512]);
  t.equal(
      tf.tidy(() => drumOneHotTensor.sum(1).equal(tf.scalar(1)).sum().get()),
      32);

  const drumRollTensorOutput = drumRollTensor.slice([0, 0], [32, 9]);
  drumRollConverter.toNoteSequence(drumRollTensorOutput)
      .then(ns => t.deepEqual(ns, DRUM_NS));
  drumsConverter.toNoteSequence(drumOneHotTensor)
      .then(ns => t.deepEqual(ns, DRUM_NS));
  drumsOneHotConverter.toNoteSequence(drumOneHotTensor)
      .then(ns => t.deepEqual(ns, DRUM_NS));

  drumRollTensor.dispose();
  drumRollTensorOutput.dispose();
  drumOneHotTensor.dispose();
  t.end();
});

test('Test TrioConverter', (t: test.Test) => {
  const trioConverter = new data.TrioConverter({
    'numSteps': 32,
    'melArgs': {'minPitch': 21, 'maxPitch': 108},
    'bassArgs': {'minPitch': 21, 'maxPitch': 108},
    'drumsArgs': {}
  });

  const trioTensor = trioConverter.toTensor(TRIO_NS);
  t.deepEqual(trioTensor.shape, [32, 90 + 90 + 512]);

  trioConverter.toNoteSequence(trioTensor)
      .then(ns => t.deepEqual(ns.toJSON(), TRIO_NS.toJSON()));

  trioTensor.dispose();
  t.end();
});
