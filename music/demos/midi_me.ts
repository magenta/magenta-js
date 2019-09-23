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

import * as mm from '../src/index';
import {blobToNoteSequence, MidiMe, MusicVAE, NoteSequence} from '../src/index';
import {quantizeNoteSequence} from '../src/core/sequences';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, visualizeNoteSeqs, writeTimer} from './common';
import {updateGraph} from './common_graph';

const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const TRIO_CKPT = `${CHECKPOINTS_DIR}/music_vae/trio_4bar`;
const MEL_BARS = 2;
const TRIO_BARS = 4;

// Event listeners.
const melFileInput =
    document.getElementById('mel_fileInput') as HTMLInputElement;
melFileInput.addEventListener('change', () => loadFile(melFileInput, 'mel'));
const trioFileInput =
    document.getElementById('trio_fileInput') as HTMLInputElement;
trioFileInput.addEventListener('change', () => loadFile(trioFileInput, 'trio'));

document.getElementById('mel_train').addEventListener('click', trainMelody);
document.getElementById('trio_train').addEventListener('click', trainTrio);

// Initialize models.
const mvae = new mm.MusicVAE(MEL_CKPT);
mvae.initialize().then(() => {
  document.getElementById('mel_fileBtn').removeAttribute('disabled');
});
const triovae = new mm.MusicVAE(TRIO_CKPT);
mvae.initialize().then(() => {
  document.getElementById('trio_fileBtn').removeAttribute('disabled');
});

const melModel = new mm.MidiMe({epochs: 100});
melModel.initialize();
const trioModel = new mm.MidiMe({epochs: 300});
trioModel.initialize();

// Where we will store the loaded input so that we can train on it.
let inputMelodies: NoteSequence[] = [];
let inputTrios: NoteSequence[] = [];

function loadFile(inputElement: HTMLInputElement, prefix: string) {
  document.getElementById(`${prefix}_fileBtn`).setAttribute('disabled', '');
  const promises = [];
  for (let i = 0; i < inputElement.files.length; i++) {
    promises.push(blobToNoteSequence(inputElement.files[i]));
  }
  Promise.all(promises).then((mels) => {
    if (prefix === 'mel') {
      inputMelodies = mels;
    } else {
      inputTrios = mels;
    }
    visualizeNoteSeqs(`${prefix}_input`, mels, true);
    document.getElementById(`${prefix}_train`).removeAttribute('disabled');
  });
}

function trainMelody() {
  train(inputMelodies, mvae, melModel, 'mel');
}
function trainTrio() {
  train(inputTrios, triovae, trioModel, 'trio');
}

async function train(
    mel: NoteSequence[], vae: MusicVAE, midime: MidiMe, prefix: string) {
  const start = performance.now();

  // 1. Encode the input into MusicVAE, get back a z.
  const quantizedMels: NoteSequence[] = [];
  mel.forEach((m) => quantizedMels.push(quantizeNoteSequence(m, 4)));

  // 1b. Split this sequence into 32 bar chunks.
  let chunks: NoteSequence[] = [];
  quantizedMels.forEach((m) => {
    const length = prefix === 'mel' ? 16 * MEL_BARS : 16 * TRIO_BARS;
    const melChunks = mm.sequences.split(mm.sequences.clone(m), length);
    chunks = chunks.concat(melChunks);
  });
  const z = await vae.encode(chunks);  // shape of z is [chunks, 256]

  // 2. Use that z as input to train MidiMe.
  // Reconstruction before training.
  const z1 = midime.predict(z) as tf.Tensor2D;
  const ns1 = await vae.decode(z1);
  visualizeNoteSeqs(
      `${prefix}_pre-training`, [mm.sequences.concatenate(ns1)], true);
  z1.dispose();

  // 3. Train!
  const losses: number[] = [];

  // tslint:disable-next-line:no-any
  await midime.train(z, async (epoch: number, logs: any) => {
    losses.push(logs.total);
    updateGraph(losses, `${prefix}_graph`);
  });

  // 4. Check reconstruction after training.
  const z2 = midime.predict(z) as tf.Tensor2D;
  const ns2 = await vae.decode(z2);
  visualizeNoteSeqs(
      `${prefix}_post-training`, [mm.sequences.concatenate(ns2)], true);
  z2.dispose();

  writeTimer(`${prefix}_training-time`, start);

  // 5. Sample from MidiMe
  const sample11 = await midime.sample(1) as tf.Tensor2D;
  const sample12 = await midime.sample(1) as tf.Tensor2D;
  const sample13 = await midime.sample(1) as tf.Tensor2D;
  const sample14 = await midime.sample(1) as tf.Tensor2D;
  const sample15 = await midime.sample(1) as tf.Tensor2D;

  const ns31 = await vae.decode(sample11);
  const ns32 = await vae.decode(sample12);
  const ns33 = await vae.decode(sample13);
  const ns34 = await vae.decode(sample14);
  const ns35 = await vae.decode(sample15);

  visualizeNoteSeqs(
      `${prefix}_sample-midime`,
      [
        mm.sequences.concatenate(ns31), mm.sequences.concatenate(ns32),
        mm.sequences.concatenate(ns33), mm.sequences.concatenate(ns34),
        mm.sequences.concatenate(ns35)
      ],
      true);
  sample11.dispose();
  sample12.dispose();
  sample13.dispose();
  sample14.dispose();
  sample15.dispose();

  // 5. Sample from MusicVAE.
  const sample2 = await vae.sample(1);
  visualizeNoteSeqs(
      `${prefix}_sample-musicvae`, [mm.sequences.concatenate(sample2)], true);

  z.dispose();
  vae.dispose();
  midime.dispose();
}
