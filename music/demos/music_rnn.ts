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

import * as mm from '../src/index';

import {CHECKPOINTS_DIR} from './common';
import {writeMemory, writeNoteSeqs, writeTimer} from './common';

mm.logging.verbosity = mm.logging.Level.DEBUG;

const MEL_CHECKPOINT = `${CHECKPOINTS_DIR}/music_rnn/basic_rnn`;
const DRUMS_CHECKPOINT = `${CHECKPOINTS_DIR}/music_rnn/drum_kit_rnn`;
const IMPROV_CHECKPOINT = `${CHECKPOINTS_DIR}/music_rnn/chord_pitches_improv`;

const MELODY_NS: mm.INoteSequence = {
  ticksPerQuarter: 220,
  totalTime: 1.5,
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  notes: [
    {
      instrument: 0,
      program: 0,
      startTime: 0,
      endTime: 0.5,
      pitch: 60,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.5,
      endTime: 1.0,
      pitch: 60,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 1.0,
      endTime: 1.5,
      pitch: 67,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 1.5,
      endTime: 2.0,
      pitch: 67,
      velocity: 100,
      isDrum: false
    }
  ]
};

const DRUMS_NS: mm.INoteSequence = {
  ticksPerQuarter: 220,
  totalTime: 1.5,
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  notes: [
    {startTime: 0, endTime: 0.5, pitch: 35, velocity: 100, isDrum: true}, {
      instrument: 0,
      startTime: 0.5,
      endTime: 1.0,
      pitch: 39,
      velocity: 100,
      isDrum: true
    },
    {
      instrument: 0,
      startTime: 0.5,
      endTime: 1.0,
      pitch: 43,
      velocity: 100,
      isDrum: true
    },
    {startTime: 1.0, endTime: 1.5, pitch: 35, velocity: 100, isDrum: true}, {
      instrument: 0,
      startTime: 1.5,
      endTime: 2.0,
      pitch: 39,
      velocity: 100,
      isDrum: true
    },
    {
      instrument: 0,
      startTime: 1.5,
      endTime: 2.0,
      pitch: 43,
      velocity: 100,
      isDrum: true
    }
  ]
};

async function runMelodyRnn() {
  // Display the input.
  const qns = mm.sequences.quantizeNoteSequence(MELODY_NS, 4);
  writeNoteSeqs('melody-cont-inputs', [qns]);

  const melodyRnn = new mm.MusicRNN(MEL_CHECKPOINT);
  await melodyRnn.initialize();

  const start = performance.now();
  const continuation = await melodyRnn.continueSequence(qns, 20);
  writeTimer('melody-cont-time', start);
  writeNoteSeqs('melody-cont-results', [continuation]);
  melodyRnn.dispose();
}

async function runDrumsRnn() {
  // Display the input.
  const qns = mm.sequences.quantizeNoteSequence(DRUMS_NS, 4);
  writeNoteSeqs('drums-cont-inputs', [qns]);

  const drumsRnn = new mm.MusicRNN(DRUMS_CHECKPOINT);
  await drumsRnn.initialize();

  const start = performance.now();
  const continuation = await drumsRnn.continueSequence(qns, 20);
  writeTimer('drums-cont-time', start);
  writeNoteSeqs('drums-cont-results', [continuation]);
  drumsRnn.dispose();
}

async function runImprovRnn() {
  // Display the input.
  const qns = mm.sequences.quantizeNoteSequence(MELODY_NS, 4);
  writeNoteSeqs('improv-cont-inputs', [qns]);

  const improvRnn = new mm.MusicRNN(IMPROV_CHECKPOINT);
  await improvRnn.initialize();

  const start = performance.now();
  const continuation = await improvRnn.continueSequence(qns, 20, 1.0, ['Cm']);
  writeTimer('improv-cont-time', start);
  writeNoteSeqs('improv-cont-results', [continuation]);
  improvRnn.dispose();
}

try {
  Promise
      .all([
        runMelodyRnn(),
        runDrumsRnn(),
        runImprovRnn(),
      ])
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
