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

const CHECKPOINTS_DIR =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_vae/';
const DRUMS_CKPT = `${CHECKPOINTS_DIR}drums_2bar_hikl_small`;
const DRUMS_NADE_CKPT = `${CHECKPOINTS_DIR}drums_2bar_nade_9`;
const MEL_CKPT = `${CHECKPOINTS_DIR}mel_2bar_small`;
const MEL_16_CKPT = `${CHECKPOINTS_DIR}mel_16bar_small`;
const TRIO_CKPT = `${CHECKPOINTS_DIR}trio_4bar_small`;

const DRUM_SEQS: mm.INoteSequence[] = [
  {
    notes: [
      {pitch: 36, quantizedStartStep: 0}, {pitch: 42, quantizedStartStep: 2},
      {pitch: 36, quantizedStartStep: 4}, {pitch: 42, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8}, {pitch: 42, quantizedStartStep: 10},
      {pitch: 36, quantizedStartStep: 12}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 36, quantizedStartStep: 16}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 36, quantizedStartStep: 28},
      {pitch: 42, quantizedStartStep: 30}
    ]
  },
  {
    notes: [
      {pitch: 36, quantizedStartStep: 0},
      {pitch: 38, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 0},
      {pitch: 46, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 2},
      {pitch: 42, quantizedStartStep: 3},
      {pitch: 42, quantizedStartStep: 4},
      {pitch: 50, quantizedStartStep: 4},
      {pitch: 36, quantizedStartStep: 6},
      {pitch: 38, quantizedStartStep: 6},
      {pitch: 42, quantizedStartStep: 6},
      {pitch: 45, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8},
      {pitch: 42, quantizedStartStep: 8},
      {pitch: 46, quantizedStartStep: 8},
      {pitch: 42, quantizedStartStep: 10},
      {pitch: 48, quantizedStartStep: 10},
      {pitch: 50, quantizedStartStep: 10},
      {pitch: 36, quantizedStartStep: 12},
      {pitch: 38, quantizedStartStep: 12},
      {pitch: 42, quantizedStartStep: 12},
      {pitch: 48, quantizedStartStep: 12},
      {pitch: 50, quantizedStartStep: 13},
      {pitch: 42, quantizedStartStep: 14},
      {pitch: 45, quantizedStartStep: 14},
      {pitch: 48, quantizedStartStep: 14},
      {pitch: 36, quantizedStartStep: 16},
      {pitch: 38, quantizedStartStep: 16},
      {pitch: 42, quantizedStartStep: 16},
      {pitch: 46, quantizedStartStep: 16},
      {pitch: 49, quantizedStartStep: 16},
      {pitch: 42, quantizedStartStep: 18},
      {pitch: 42, quantizedStartStep: 19},
      {pitch: 42, quantizedStartStep: 20},
      {pitch: 50, quantizedStartStep: 20},
      {pitch: 36, quantizedStartStep: 22},
      {pitch: 38, quantizedStartStep: 22},
      {pitch: 42, quantizedStartStep: 22},
      {pitch: 45, quantizedStartStep: 22},
      {pitch: 36, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 24},
      {pitch: 46, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 26},
      {pitch: 48, quantizedStartStep: 26},
      {pitch: 50, quantizedStartStep: 26},
      {pitch: 36, quantizedStartStep: 28},
      {pitch: 38, quantizedStartStep: 28},
      {pitch: 42, quantizedStartStep: 28},
      {pitch: 42, quantizedStartStep: 30},
      {pitch: 48, quantizedStartStep: 30}
    ]
  },
  {
    notes: [
      {pitch: 38, quantizedStartStep: 0},  {pitch: 42, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 2},  {pitch: 42, quantizedStartStep: 4},
      {pitch: 36, quantizedStartStep: 6},  {pitch: 38, quantizedStartStep: 6},
      {pitch: 42, quantizedStartStep: 6},  {pitch: 45, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 8},
      {pitch: 42, quantizedStartStep: 10}, {pitch: 38, quantizedStartStep: 12},
      {pitch: 42, quantizedStartStep: 12}, {pitch: 45, quantizedStartStep: 12},
      {pitch: 36, quantizedStartStep: 14}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 46, quantizedStartStep: 14}, {pitch: 36, quantizedStartStep: 16},
      {pitch: 42, quantizedStartStep: 16}, {pitch: 42, quantizedStartStep: 18},
      {pitch: 38, quantizedStartStep: 20}, {pitch: 42, quantizedStartStep: 20},
      {pitch: 45, quantizedStartStep: 20}, {pitch: 36, quantizedStartStep: 22},
      {pitch: 42, quantizedStartStep: 22}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 24}, {pitch: 38, quantizedStartStep: 26},
      {pitch: 42, quantizedStartStep: 26}, {pitch: 45, quantizedStartStep: 26},
      {pitch: 42, quantizedStartStep: 28}, {pitch: 45, quantizedStartStep: 28},
      {pitch: 36, quantizedStartStep: 30}, {pitch: 42, quantizedStartStep: 30},
      {pitch: 45, quantizedStartStep: 30}
    ]
  },
  {
    notes: [
      {pitch: 50, quantizedStartStep: 4},
      {pitch: 50, quantizedStartStep: 20}
    ]
  }
];
DRUM_SEQS.map(s => s.notes.map(n => {
  n.isDrum = true;
  n.quantizedEndStep = n.quantizedStartStep + 1;
}));

const MEL_TEAPOT: mm.INoteSequence = {
  notes: [
    {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4},
    {pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6},
    {pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8},
    {pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16},
    {pitch: 77, quantizedStartStep: 16, quantizedEndStep: 20},
    {pitch: 80, quantizedStartStep: 20, quantizedEndStep: 24},
    {pitch: 75, quantizedStartStep: 24, quantizedEndStep: 32}
  ]
};

const MEL_TWINKLE: mm.INoteSequence = {
  notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4},
    {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6},
    {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12},
    {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16},
    {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18},
    {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20},
    {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22},
    {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24},
    {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26},
    {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28},
    {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32}
  ]
};

const TRIO_EXAMPLE: mm.INoteSequence = {
  notes: []
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

function writeTimer(elementId: string, startTime: number) {
  document.getElementById(elementId).innerHTML =
      ((performance.now() - startTime) / 1000).toString() + 's';
}

function writeNoteSeqs(elementId: string, seqs: mm.INoteSequence[]) {
  const element = document.getElementById(elementId);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  seqs.forEach(seq => {
    const seqWrap = document.createElement('div');
    const seqText = document.createElement('span');
    seqText.innerHTML = '[' +
        seq.notes
            .map(n => {
              let s = '{p:' + n.pitch + ' s:' + n.quantizedStartStep;
              if (n.quantizedEndStep != null) {
                s += ' e:' + n.quantizedEndStep;
              }
              s += '}';
              return s;
            })
            .join(', ') +
        ']';
    seqWrap.appendChild(seqText);
    seqWrap.appendChild(createPlayer(seq));
    element.appendChild(seqWrap);
  });
}

function createPlayer(seq: mm.INoteSequence) {
  const player = new mm.Player();
  const button = document.createElement('button');
  button.textContent = 'Play';
  button.addEventListener('click', () => {
    if (player.isPlaying()) {
      player.stop();
      button.textContent = 'Play';
    } else {
      player.start(seq).then(() => (button.textContent = 'Play'));
      button.textContent = 'Stop';
    }
  });
  return button;
}

async function runDrums() {
  const mvae = new mm.MusicVAE(DRUMS_CKPT);
  await mvae.initialize();

  writeNoteSeqs('drums-inputs', DRUM_SEQS);

  let start = performance.now();
  const interp = await mvae.interpolate(DRUM_SEQS, 3);
  writeTimer('drums-interp-time', start);
  writeNoteSeqs('drums-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(5);
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
  const sample = await mvae.sample(5);
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
  const sample = await mvae.sample(5);
  writeTimer('mel-sample-time', start);
  writeNoteSeqs('mel-samples', sample);

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
  const sample = await mvae.sample(1);
  writeTimer('trio-sample-time', start);
  writeNoteSeqs('trio-samples', sample);

  mvae.dispose();
}

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
  const sample = await mvae.sample(5);
  writeTimer('mel16-sample-time', start);
  writeNoteSeqs('mel16-samples', sample);

  mvae.dispose();
}

try {
  Promise.all([runDrums(), runDrumsNade(), runMel(), runMel16(), runTrio()])
      .then(() => console.log(tf.memory()));
} catch (err) {
  console.error(err);
}
