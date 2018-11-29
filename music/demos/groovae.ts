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

import {CHECKPOINTS_DIR, DRUM_SEQS, writeMemory} from './common';
import {writeNoteSeqs, writeTimer} from './common';

const HUMANIZE_CKPT = `${CHECKPOINTS_DIR}/music_vae/groovae_unquantize_4bar`;

async function runHumanize() {
  const inputs = DRUM_SEQS.map(ns => mm.sequences.clone(ns));
  console.log(inputs);
  writeNoteSeqs('humanize-inputs', inputs, true);

  const mvae = new mm.MusicVAE(HUMANIZE_CKPT);
  await mvae.initialize();

  let start = performance.now();
  const z = await mvae.encode(inputs);
  const recon = await mvae.decode(z);
  z.dispose();
  writeTimer('humanize-recon-time', start);
  writeNoteSeqs('humanize-recon', recon, true, true);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('humanize-sample-time', start);
  writeNoteSeqs('humanize-samples', sample, true, true);

  mvae.dispose();
}

try {
  Promise.all([runHumanize()]).then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
