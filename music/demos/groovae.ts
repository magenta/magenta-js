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

import * as mm from '../src/index';
import * as timer from '../src/core/compat/timer';

import {CHECKPOINTS_DIR, DRUM_SEQS, writeMemory} from './common';
import {writeNoteSeqs, writeTimer} from './common';

const HUMANIZE_CKPT = `${CHECKPOINTS_DIR}/music_vae/groovae_unquantize_4bar`;
const TAP2DRUM_CKPT = `${CHECKPOINTS_DIR}/music_vae/groovae_tap2drum_2bar`;

async function runHumanize() {
  const inputs = DRUM_SEQS.map(ns => mm.sequences.clone(ns));
  writeNoteSeqs('humanize-inputs', inputs, true);

  const mvae = new mm.MusicVAE(HUMANIZE_CKPT);
  await mvae.initialize();

  let start = timer.now();
  const z = await mvae.encode(inputs);
  const recon = await mvae.decode(z);
  z.dispose();
  writeTimer('humanize-recon-time', start);
  writeNoteSeqs('humanize-recon', recon, true, true);

  start = timer.now();
  const sample = await mvae.sample(4);
  writeTimer('humanize-sample-time', start);
  writeNoteSeqs('humanize-samples', sample, true, true);

  mvae.dispose();
}

async function runTap2Drum() {
  const mvae = new mm.MusicVAE(TAP2DRUM_CKPT);
  await mvae.initialize();

  // "Tapify" the inputs, collapsing them to hi-hat.
  const inputs = await Promise.all(DRUM_SEQS.map(
      ns =>
          mvae.dataConverter.toNoteSequence(mvae.dataConverter.toTensor(ns))));
  writeNoteSeqs('tap2drum-inputs', inputs, true);

  let start = timer.now();
  const z = await mvae.encode(inputs);
  const recon = await mvae.decode(z);
  z.dispose();
  writeTimer('tap2drum-recon-time', start);
  writeNoteSeqs('tap2drum-recon', recon, true, true);

  start = timer.now();
  const sample = await mvae.sample(4);
  writeTimer('tap2drum-sample-time', start);
  writeNoteSeqs('tap2drum-samples', sample, true, true);

  mvae.dispose();
}

try {
  Promise.all([runHumanize(), runTap2Drum()])
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
