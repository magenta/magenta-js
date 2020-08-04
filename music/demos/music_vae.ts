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

import {performance} from '../src/core/compat/global';
import * as mm from '../src/index';
import {sequences} from '../src/index';

import {CHECKPOINTS_DIR, TRIO_EXAMPLE, writeMemory} from './common';
import {DRUM_SEQS, MEL_A_QUARTERS, MEL_TEAPOT, MEL_TWINKLE} from './common';
import {writeNoteSeqs, writeTimer} from './common';

mm.logging.verbosity = mm.logging.Level.DEBUG;

const DRUMS_CKPT = `${CHECKPOINTS_DIR}/music_vae/drums_2bar_hikl_small`;
const DRUMS_NADE_CKPT = `${CHECKPOINTS_DIR}/music_vae/drums_2bar_nade_9_q2`;
const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const MEL_CHORDS_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_chords`;
const MEL_16_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_16bar_small_q2`;
const TRIO_2_CKPT = `${CHECKPOINTS_DIR}/music_vae/trio_2bar`;
const TRIO_CKPT = `${CHECKPOINTS_DIR}/music_vae/trio_4bar`;

async function runDrums() {
  writeNoteSeqs('drums-inputs', DRUM_SEQS);

  const mvae = new mm.MusicVAE(DRUMS_CKPT);
  await mvae.initialize();

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
  writeNoteSeqs('nade-inputs', DRUM_SEQS);

  const mvae = new mm.MusicVAE(DRUMS_NADE_CKPT);
  await mvae.initialize();

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
  const inputs = [MEL_TEAPOT, MEL_TWINKLE];
  writeNoteSeqs('mel-inputs', inputs);

  const mvae = new mm.MusicVAE(MEL_CKPT);
  await mvae.initialize();

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
  const inputs = [MEL_A_QUARTERS, MEL_TEAPOT];
  writeNoteSeqs('mel-chords-inputs', inputs);

  const mvae = new mm.MusicVAE(MEL_CHORDS_CKPT);
  await mvae.initialize();

  let start = performance.now();
  const interp = await mvae.interpolate(
      inputs, 5, null, {chordProgression: ['A', 'A', 'D', 'A']});
  writeTimer('mel-chords-interp-time', start);
  writeNoteSeqs('mel-chords-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(4, null, {chordProgression: ['C']});
  writeTimer('mel-chords-sample-time', start);
  writeNoteSeqs('mel-chords-samples', sample);

  mvae.dispose();
}

async function runMel16() {
  const inputs: mm.INoteSequence[] = [
    mm.sequences.concatenate(
        [
          MEL_TEAPOT, MEL_TWINKLE, MEL_TEAPOT, MEL_TWINKLE, MEL_TEAPOT,
          MEL_TWINKLE, MEL_TEAPOT, MEL_TWINKLE
        ],
        [32, 32]),
    mm.sequences.concatenate(
        [
          MEL_TWINKLE, MEL_TEAPOT, MEL_TWINKLE, MEL_TEAPOT, MEL_TWINKLE,
          MEL_TEAPOT, MEL_TWINKLE, MEL_TEAPOT
        ],
        [32, 32])
  ];

  writeNoteSeqs('mel16-inputs', inputs);

  const mvae = new mm.MusicVAE(MEL_16_CKPT);
  await mvae.initialize();

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

async function runTrio2() {
  const ns = sequences.trim(TRIO_EXAMPLE, 0, 32);
  const inputs = [ns];
  writeNoteSeqs('trio2-inputs', inputs);

  const mvae = new mm.MusicVAE(TRIO_2_CKPT);
  await mvae.initialize();

  let start = performance.now();
  const z = await mvae.encode(inputs);
  const recon = await mvae.decode(z);
  z.dispose();
  writeTimer('trio2-recon-time', start);
  writeNoteSeqs('trio2-recon', recon);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('trio2-sample-time', start);
  writeNoteSeqs('trio2-samples', sample);

  mvae.dispose();
}

async function runTrio() {
  const inputs = [TRIO_EXAMPLE];
  TRIO_EXAMPLE.totalQuantizedSteps = 64;
  writeNoteSeqs('trio-inputs', inputs);

  const mvae = new mm.MusicVAE(TRIO_CKPT);
  await mvae.initialize();

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

async function generateTrio2Button() {
  const trio2Button = document.createElement('button');
  trio2Button.textContent = 'Generate Trio 2-bar';
  trio2Button.addEventListener('click', () => {
    runTrio2();
    trio2Button.disabled = true;
  });
  const trio2Div = document.getElementById('generate-trio-2');
  trio2Div.appendChild(trio2Button);
}

async function generateTrioButton() {
  const trioButton = document.createElement('button');
  trioButton.textContent = 'Generate Trio 4-bar';
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
        generateTrio2Button(), generateTrioButton()
      ])
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
