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

import {NoteSequence} from '../protobuf/index';

import * as data from './data';
import * as sequences from './sequences';

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
  ],
  quantizationInfo: {stepsPerQuarter: 2},
  totalQuantizedSteps: 32,
});

const DRUM_NS = NoteSequence.create({
  notes: [
    {pitch: 36, quantizedStartStep: 0}, {pitch: 42, quantizedStartStep: 0},
    {pitch: 36, quantizedStartStep: 4}, {pitch: 42, quantizedStartStep: 6},
    {pitch: 36, quantizedStartStep: 8}, {pitch: 42, quantizedStartStep: 10},
    {pitch: 36, quantizedStartStep: 12}, {pitch: 42, quantizedStartStep: 14},
    {pitch: 36, quantizedStartStep: 16}, {pitch: 36, quantizedStartStep: 24},
    {pitch: 36, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 30}
  ],
  quantizationInfo: {stepsPerQuarter: 2}
});
DRUM_NS.notes.forEach(n => {
  n.isDrum = true;
  n.quantizedEndStep = (n.quantizedStartStep as number) + 1;
});
DRUM_NS.totalQuantizedSteps = 32;

const TRIO_NS = NoteSequence.create();
TRIO_NS.quantizationInfo =
    NoteSequence.QuantizationInfo.create({stepsPerQuarter: 2});
sequences.clone(MEL_NS).notes.forEach(n => {
  n.program = 0;
  n.instrument = 0;
  TRIO_NS.notes.push((n));
});
sequences.clone(MEL_NS).notes.forEach(n => {
  n.pitch -= 36;
  n.program = 32;
  n.instrument = 1;
  TRIO_NS.notes.push(n);
});
sequences.clone(DRUM_NS).notes.forEach(n => {
  n.instrument = 2;
  TRIO_NS.notes.push(n);
});
TRIO_NS.totalQuantizedSteps = 32;

const MULTITRACK_NS = NoteSequence.create({
  notes: [
    {
      pitch: 60,
      quantizedStartStep: 0,
      quantizedEndStep: 4,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      quantizedStartStep: 2,
      quantizedEndStep: 4,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      quantizedStartStep: 4,
      quantizedEndStep: 8,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      quantizedStartStep: 6,
      quantizedEndStep: 8,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 40,
      quantizedStartStep: 0,
      quantizedEndStep: 1,
      instrument: 1,
      program: 0,
      isDrum: true
    },
    {
      pitch: 50,
      quantizedStartStep: 2,
      quantizedEndStep: 3,
      instrument: 1,
      program: 0,
      isDrum: true
    },
    {
      pitch: 40,
      quantizedStartStep: 4,
      quantizedEndStep: 5,
      instrument: 1,
      program: 0,
      isDrum: true
    },
    {
      pitch: 50,
      quantizedStartStep: 6,
      quantizedEndStep: 7,
      instrument: 1,
      program: 0,
      isDrum: true
    },
  ],
  quantizationInfo: {stepsPerQuarter: 1},
  totalQuantizedSteps: 8
});

test('Test MelodyConverter', (t: test.Test) => {
  const melConverter = new data.MelodyConverter(
      {'numSteps': 32, 'minPitch': 21, 'maxPitch': 108});

  const melTensor = melConverter.toTensor(MEL_NS);
  t.deepEqual(melTensor.shape, [32, 90]);

  melConverter.toNoteSequence(melTensor, 2).then(ns => t.deepEqual(ns, MEL_NS));

  melTensor.dispose();
  t.end();
});

test('Test MelodyConverterWithPolyphonicInput', (t: test.Test) => {
  const melConverter = new data.MelodyConverter({
    'numSteps': 32,
    'minPitch': 21,
    'maxPitch': 108,
  });

  const polyMelNs = sequences.clone(MEL_NS);
  polyMelNs.notes[0].quantizedEndStep = 6;
  polyMelNs.notes.push(NoteSequence.Note.create(
      {pitch: 70, quantizedStartStep: 2, quantizedEndStep: 5}));
  const melTensor = melConverter.toTensor(polyMelNs);
  t.deepEqual(melTensor.shape, [32, 90]);
  melConverter.toNoteSequence(melTensor, 2).then(ns => t.deepEqual(ns, MEL_NS));
  melTensor.dispose();

  const melConverterDisallowsPolyphony = new data.MelodyConverter({
    'numSteps': 32,
    'minPitch': 21,
    'maxPitch': 108,
    'disallowPolyphony': true
  });
  t.throws(() => melConverterDisallowsPolyphony.toTensor(polyMelNs));
  t.end();
});

test('Test DrumConverters', (t: test.Test) => {
  const drumsConverter = new data.DrumsConverter({'numSteps': 32});
  const drumsOneHotConverter = new data.DrumsOneHotConverter({'numSteps': 32});
  const drumRollConverter = new data.DrumRollConverter({'numSteps': 32});

  const drumRollTensor = drumsConverter.toTensor(DRUM_NS);
  t.deepEqual(
      drumRollTensor.dataSync(),
      drumRollConverter.toTensor(DRUM_NS).dataSync());
  t.deepEqual(drumRollTensor.shape, [32, 10]);

  const drumOneHotTensor = drumsOneHotConverter.toTensor(DRUM_NS);
  t.deepEqual(drumOneHotTensor.shape, [32, 512]);
  t.equal(
      tf.tidy(
          () =>
              drumOneHotTensor.sum(1).equal(tf.scalar(1, 'int32')).sum().get()),
      32);

  const drumRollTensorOutput = drumRollTensor.slice([0, 0], [32, 9]);
  drumRollConverter.toNoteSequence(drumRollTensorOutput, 2)
      .then(ns => t.deepEqual(ns, DRUM_NS));
  drumsConverter.toNoteSequence(drumOneHotTensor, 2)
      .then(ns => t.deepEqual(ns, DRUM_NS));
  drumsOneHotConverter.toNoteSequence(drumOneHotTensor, 2)
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
  t.equal(
      tf.tidy(() => trioTensor.sum(1).equal(tf.scalar(3, 'int32')).sum().get()),
      32);

  trioConverter.toNoteSequence(trioTensor, 2)
      .then(ns => t.deepEqual(ns.toJSON(), TRIO_NS.toJSON()));

  trioTensor.dispose();
  t.end();
});

test('Test MultitrackConverter', (t: test.Test) => {
  const multitrackConverter = new data.MultitrackConverter({
    'numSteps': 512,
    'numSegments': 8,
    'stepsPerQuarter': 1,
    'totalSteps': 8,
    'numVelocityBins': 0,
    'minPitch': 21,
    'maxPitch': 108
  });

  const multitrackTensor = multitrackConverter.toTensor(MULTITRACK_NS);
  t.deepEqual(multitrackTensor.shape, [512, multitrackConverter.depth]);

  multitrackConverter.toNoteSequence(multitrackTensor, 1)
      .then(ns => t.deepEqual(ns, MULTITRACK_NS));

  multitrackTensor.dispose();
  t.end();
});
