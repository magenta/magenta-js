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
import * as clone from 'clone';

import * as mm from '../src/index';

import {CHECKPOINTS_DIR, DRUM_SEQS, MEL_TWINKLE, writeMemory} from './common';
import {writeNoteSeqs, writeTimer} from './common';

const MULTITRACK_CKPT = `${CHECKPOINTS_DIR}/music_vae/multitrack`;
const MULTITRACK_CHORDS_CKPT = `${CHECKPOINTS_DIR}/music_vae/multitrack_chords`;

const MULTITRACK_EXAMPLE: mm.INoteSequence = {
  notes: [],
  quantizationInfo: {stepsPerQuarter: 24}
};
MEL_TWINKLE.notes.forEach(n => {
  const m = clone(n);
  m.program = 0;
  m.instrument = 0;
  m.quantizedStartStep *= 3;
  m.quantizedEndStep *= 3;
  MULTITRACK_EXAMPLE.notes.push(m);
});
MEL_TWINKLE.notes.forEach(n => {
  const m = clone(n);
  m.pitch -= 36;
  m.program = 32;
  m.instrument = 1;
  m.quantizedStartStep *= 3;
  m.quantizedEndStep *= 3;
  MULTITRACK_EXAMPLE.notes.push(m);
});
DRUM_SEQS[0].notes.forEach(n => {
  const m = clone(n);
  m.instrument = 2;
  m.quantizedStartStep *= 3;
  m.quantizedEndStep = m.quantizedStartStep + 1;
  MULTITRACK_EXAMPLE.notes.push(m);
});

async function runMultitrack() {
  const inputs = [MULTITRACK_EXAMPLE];
  writeNoteSeqs('multitrack-inputs', inputs, true);

  const mvae = new mm.MusicVAE(MULTITRACK_CKPT);
  await mvae.initialize();

  let start = performance.now();
  const z = await mvae.encode(inputs);
  const recon = await mvae.decode(z, null, null, 24);
  z.dispose();
  writeTimer('multitrack-recon-time', start);
  writeNoteSeqs('multitrack-recon', recon, true);

  start = performance.now();
  const sample = await mvae.sample(4, null, null, 24);
  writeTimer('multitrack-sample-time', start);
  writeNoteSeqs('multitrack-samples', sample, true);

  mvae.dispose();
}

async function runMultitrackChords() {
  const inputs = [MULTITRACK_EXAMPLE];
  writeNoteSeqs('multitrack-chords-inputs', inputs, true);

  const mvae = new mm.MusicVAE(MULTITRACK_CHORDS_CKPT);
  await mvae.initialize();

  let start = performance.now();
  const z = await mvae.encode(inputs, ['C']);
  const recon = await mvae.decode(z, null, ['G'], 24);
  z.dispose();
  writeTimer('multitrack-chords-recon-time', start);
  writeNoteSeqs('multitrack-chords-recon', recon, true);

  start = performance.now();
  const sample = await mvae.sample(4, null, ['D'], 24);
  writeTimer('multitrack-chords-sample-time', start);
  writeNoteSeqs('multitrack-chords-samples', sample, true);

  mvae.dispose();
}

try {
  Promise.all([runMultitrack(), runMultitrackChords()])
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
