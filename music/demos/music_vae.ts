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
import * as clone from 'clone';

import * as mm from '../src/index';

import {CHECKPOINTS_DIR} from './common';
import {DRUM_SEQS, MEL_A_QUARTERS, MEL_TEAPOT, MEL_TWINKLE} from './common';
import {writeNoteSeqs, writeTimer} from './common';

const DRUMS_CKPT = `${CHECKPOINTS_DIR}/music_vae/drums_2bar_hikl_small`;
const DRUMS_NADE_CKPT = `${CHECKPOINTS_DIR}/music_vae/drums_2bar_nade_9_q2`;
const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const MEL_CHORDS_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_chords`;
const MEL_16_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_16bar_small_q2`;
const TRIO_CKPT = `${CHECKPOINTS_DIR}/music_vae/trio_4bar`;

// TODO(adarob): Switch to magenta/core function once implemented.
function concatNoteSequences(
    seqs: mm.INoteSequence[], individualDuration: number) {
  const concatSeq: mm.INoteSequence = clone(seqs[0]);
  for (let i = 1; i < seqs.length; ++i) {
    Array.prototype.push.apply(concatSeq.notes, seqs[i].notes.map(n => {
      const newN = clone(n);
      newN.quantizedStartStep += individualDuration * i;
      newN.quantizedEndStep += individualDuration * i;
      return newN;
    }));
  }
  return concatSeq;
}

const TRIO_EXAMPLE: mm.INoteSequence = {
  notes: [],
  quantizationInfo: {stepsPerQuarter: 4}
};
concatNoteSequences([MEL_TWINKLE, MEL_TWINKLE], 32).notes.map(n => {
  const m = clone(n);
  m.program = 0;
  m.instrument = 0;
  TRIO_EXAMPLE.notes.push(m);
});
concatNoteSequences([MEL_TWINKLE, MEL_TWINKLE], 32).notes.map(n => {
  const m = clone(n);
  m.pitch -= 36;
  m.program = 32;
  m.instrument = 1;
  TRIO_EXAMPLE.notes.push(m);
});
concatNoteSequences([DRUM_SEQS[0], DRUM_SEQS[0]], 32).notes.map(n => {
  const m = clone(n);
  m.instrument = 2;
  TRIO_EXAMPLE.notes.push(m);
});

async function runDrums() {
  const mvae = new mm.MusicVAE(DRUMS_CKPT);
  await mvae.initialize();

  writeNoteSeqs('drums-inputs', DRUM_SEQS);

  let start = performance.now();
  const interp = await mvae.interpolate(DRUM_SEQS, 3);
  writeTimer('drums-interp-time', start);
  writeNoteSeqs('drums-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('drums-sample-time', start);
  writeNoteSeqs('drums-samples', sample);

  mvae.dispose();
}

async function runDrumsNade() {
  const mvae = new mm.MusicVAE(DRUMS_NADE_CKPT);
  await mvae.initialize();

  writeNoteSeqs('nade-inputs', DRUM_SEQS);

  let start = performance.now();
  const interp = await mvae.interpolate(DRUM_SEQS, 3);
  writeTimer('nade-interp-time', start);
  writeNoteSeqs('nade-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('nade-sample-time', start);
  writeNoteSeqs('nade-samples', sample);

  mvae.dispose();
}

async function runMel() {
  const mvae = new mm.MusicVAE(MEL_CKPT);
  await mvae.initialize();

  const inputs = [MEL_TEAPOT, MEL_TWINKLE];
  writeNoteSeqs('mel-inputs', inputs);

  let start = performance.now();
  const interp = await mvae.interpolate(inputs, 5);
  writeTimer('mel-interp-time', start);
  writeNoteSeqs('mel-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('mel-sample-time', start);
  writeNoteSeqs('mel-samples', sample);

  mvae.dispose();
}

async function runMelChords() {
  const mvae = new mm.MusicVAE(MEL_CHORDS_CKPT);
  await mvae.initialize();

  const inputs = [MEL_A_QUARTERS, MEL_TEAPOT];
  writeNoteSeqs('mel-chords-inputs', inputs);

  let start = performance.now();
  const interp = await mvae.interpolate(inputs, 5, null, ['A', 'A', 'D', 'A']);
  writeTimer('mel-chords-interp-time', start);
  writeNoteSeqs('mel-chords-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(4, null, ['C']);
  writeTimer('mel-chords-sample-time', start);
  writeNoteSeqs('mel-chords-samples', sample);

  mvae.dispose();
}

async function runMel16() {
  const mvae = new mm.MusicVAE(MEL_16_CKPT);
  await mvae.initialize();

  const inputs: mm.INoteSequence[] = [
    concatNoteSequences(
        [
          MEL_TEAPOT, MEL_TWINKLE, MEL_TEAPOT, MEL_TWINKLE, MEL_TEAPOT,
          MEL_TWINKLE, MEL_TEAPOT, MEL_TWINKLE
        ],
        32),
    concatNoteSequences(
        [
          MEL_TWINKLE, MEL_TEAPOT, MEL_TWINKLE, MEL_TEAPOT, MEL_TWINKLE,
          MEL_TEAPOT, MEL_TWINKLE, MEL_TEAPOT
        ],
        32)
  ];

  writeNoteSeqs('mel16-inputs', inputs);

  let start = performance.now();
  const interp = await mvae.interpolate(inputs, 5);
  writeTimer('mel16-interp-time', start);
  writeNoteSeqs('mel16-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('mel16-sample-time', start);
  writeNoteSeqs('mel16-samples', sample);

  mvae.dispose();
}

async function runTrio() {
  const mvae = new mm.MusicVAE(TRIO_CKPT);
  await mvae.initialize();

  const inputs = [TRIO_EXAMPLE];
  writeNoteSeqs('trio-inputs', inputs);

  let start = performance.now();
  const z = await mvae.encode(inputs);
  const recon = await mvae.decode(z);
  z.dispose();
  writeTimer('trio-recon-time', start);
  writeNoteSeqs('trio-recon', recon);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('trio-sample-time', start);
  writeNoteSeqs('trio-samples', sample);

  mvae.dispose();
}

async function generateAllButton() {
  const button = document.createElement('button');
  button.textContent = 'Generate All';
  button.addEventListener('click', () => {
    runDrums();
    runDrumsNade();
    runMel();
    runMelChords();
    runMel16(), runTrio();
    button.disabled = true;
  });
  const div = document.getElementById('generate-all');
  div.appendChild(button);
}

async function generateDrumsButton() {
  const drumsButton = document.createElement('button');
  drumsButton.textContent = 'Generate Drums';
  drumsButton.addEventListener('click', () => {
    runDrums();
    drumsButton.disabled = true;
  });
  const drumsDiv = document.getElementById('generate-drums');
  drumsDiv.appendChild(drumsButton);
}

async function generateDrumsNadeButton() {
  const drumsNadeButton = document.createElement('button');
  drumsNadeButton.textContent = 'Generate Drums NADE';
  drumsNadeButton.addEventListener('click', () => {
    runDrumsNade();
    drumsNadeButton.disabled = true;
  });
  const drumsNadeDiv = document.getElementById('generate-drums-nade');
  drumsNadeDiv.appendChild(drumsNadeButton);
}

async function generateMelButton() {
  const melButton = document.createElement('button');
  melButton.textContent = 'Generate Melody';
  melButton.addEventListener('click', () => {
    runMel();
    melButton.disabled = true;
  });
  const melDiv = document.getElementById('generate-melody');
  melDiv.appendChild(melButton);
}

async function generateMelChordsButton() {
  const melChordsButton = document.createElement('button');
  melChordsButton.textContent = 'Generate Chord-Conditioned Melody';
  melChordsButton.addEventListener('click', () => {
    runMelChords();
    melChordsButton.disabled = true;
  });
  const melChordsDiv = document.getElementById('generate-melody-chord');
  melChordsDiv.appendChild(melChordsButton);
}

async function generateMel16Button() {
  const mel16Button = document.createElement('button');
  mel16Button.textContent = 'Generate Melody 16-bar';
  mel16Button.addEventListener('click', () => {
    runMel16();
    mel16Button.disabled = true;
  });
  const mel16Div = document.getElementById('generate-melody-16');
  mel16Div.appendChild(mel16Button);
}

async function generateTrioButton() {
  const trioButton = document.createElement('button');
  trioButton.textContent = 'Generate Trio';
  trioButton.addEventListener('click', () => {
    runTrio();
    trioButton.disabled = true;
  });
  const trioDiv = document.getElementById('generate-trio');
  trioDiv.appendChild(trioButton);
}

try {
  Promise
      .all([
        generateAllButton(), generateDrumsButton(), generateDrumsNadeButton(),
        generateMelButton(), generateMelChordsButton(), generateMel16Button(),
        generateTrioButton()
      ])
      .then(() => console.log(tf.memory()));
} catch (err) {
  console.error(err);
}
