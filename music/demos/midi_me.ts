/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
import * as mm from '../src';

import {blobToNoteSequence, NoteSequence} from '../src';
import {quantizeNoteSequence} from '../src/core/sequences';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, visualizeNoteSeqs, writeMemory, writeTimer} from './common';
import {updateGraph} from './common_graph';

const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const BARS = 2;

const fileInput = document.getElementById('fileInput') as HTMLInputElement;
fileInput.addEventListener('change', loadFile);

// Initialize models.
const mvae = new mm.MusicVAE(MEL_CKPT);
mvae.initialize().then(() => {
  document.getElementById('fileBtn').removeAttribute('disabled');
});

const model = new mm.MidiMe({epochs: 100});
model.initialize();

function loadFile(e: Event) {
  document.getElementById('fileBtn').setAttribute('disabled', '');
  const promises = [];
  for (let i = 0; i < fileInput.files.length; i++) {
    promises.push(blobToNoteSequence(fileInput.files[i]));
  }
  Promise.all(promises).then(doTheThing);
}

async function doTheThing(mel: NoteSequence[]) {
  visualizeNoteSeqs('input', mel);
  const start = performance.now();

  // 1. Encode the input into MusicVAE, get back a z.
  const quantizedMels: NoteSequence[] = [];
  mel.forEach((m) => quantizedMels.push(quantizeNoteSequence(m, 4)));

  // 1b. Split this sequence into 32 bar chunks.
  let chunks: NoteSequence[] = [];
  quantizedMels.forEach((m) => {
    const melChunks = mm.sequences.split(mm.sequences.clone(m), 16 * BARS);
    chunks = chunks.concat(melChunks);
  });
  const z = await mvae.encode(chunks);  // shape of z is [chunks, 256]

  // 2. Use that z as input to train MidiMe.
  // Reconstruction before training.
  const z1 = model.predict(z) as tf.Tensor2D;
  const ns1 = await mvae.decode(z1);
  visualizeNoteSeqs('pre-training', [mm.sequences.concatenate(ns1)]);
  z1.dispose();

  // 3. Train!
  const losses: number[] = [];

  // tslint:disable-next-line:no-any
  await model.train(z, async (epoch: number, logs: any) => {
    losses.push(logs.total);
    updateGraph(losses, 'graph');
  });

  // 4. Check reconstruction after training.
  const z2 = model.predict(z) as tf.Tensor2D;
  const ns2 = await mvae.decode(z2);
  visualizeNoteSeqs('post-training', [mm.sequences.concatenate(ns2)]);
  z2.dispose();

  writeTimer('training-time', start);

  // 5. Sample from MidiMe
  const sample11 = await model.sample(4) as tf.Tensor2D;
  const sample12 = await model.sample(4) as tf.Tensor2D;
  const sample13 = await model.sample(4) as tf.Tensor2D;
  const sample14 = await model.sample(4) as tf.Tensor2D;
  const sample15 = await model.sample(4) as tf.Tensor2D;

  const ns31 = await mvae.decode(sample11);
  const ns32 = await mvae.decode(sample12);
  const ns33 = await mvae.decode(sample13);
  const ns34 = await mvae.decode(sample14);
  const ns35 = await mvae.decode(sample15);

  visualizeNoteSeqs('sample-midime', [
    mm.sequences.concatenate(ns31), mm.sequences.concatenate(ns32),
    mm.sequences.concatenate(ns33), mm.sequences.concatenate(ns34),
    mm.sequences.concatenate(ns35)
  ]);
  sample11.dispose();
  sample12.dispose();
  sample13.dispose();
  sample14.dispose();
  sample15.dispose();

  // 5. Sample from MusicVAE.
  const sample2 = await mvae.sample(4);
  visualizeNoteSeqs('sample-musicvae', [mm.sequences.concatenate(sample2)]);

  z.dispose();
  dispose();
}

function dispose() {
  mvae.dispose();
  model.dispose();
  writeMemory(tf.memory().numBytes);
}
