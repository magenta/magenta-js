/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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

import {CHECKPOINTS_DIR, MEL_TWINKLE, writeMemory} from './common';
import {MEL_TEAPOT} from './common';
import {writeNoteSeqs, writeTimer} from './common';

mm.logging.verbosity = mm.logging.Level.DEBUG;

const MEL_CONTROLS_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_controls`;
const MEL_RHYTHM_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_rhythm`;
const MEL_SHAPE_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_shape`;

const DOTTED_RHYTHM = tf.tensor(
                          [
                            1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0,
                            1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0
                          ],
                          [32, 1]) as tf.Tensor2D;

const UDUDF_SHAPE = tf.oneHot(
                        [
                          2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0,
                          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                        ],
                        3) as tf.Tensor2D;

const RHYTHM = new mm.melodies.MelodyRhythm();
const SHAPE = new mm.melodies.MelodyShape();

async function runMelControls() {
  const melTeapotStaccato = mm.sequences.clone(MEL_TEAPOT);
  for (const note of melTeapotStaccato.notes) {
    note.quantizedEndStep = note.quantizedStartStep + 1;
  }

  const inputs = [MEL_TEAPOT, melTeapotStaccato];
  writeNoteSeqs('mel-controls-inputs', inputs);

  const mvae = new mm.MusicVAE(MEL_CONTROLS_CKPT);
  await mvae.initialize();

  const teapotMel =
      mm.melodies.Melody.fromNoteSequence(MEL_TEAPOT, 0, 127, true, 32);
  const teapotRhythm = RHYTHM.extract(teapotMel);
  const teapotShape = SHAPE.extract(teapotMel);
  const teapotControls = tf.concat([teapotRhythm, teapotShape], 1);

  let start = performance.now();
  const interp = await mvae.interpolate(inputs, 5, null, ['A'], teapotControls);
  writeTimer('mel-controls-interp-time', start);
  writeNoteSeqs('mel-controls-interp', interp);

  const sampleControls = tf.concat([DOTTED_RHYTHM, UDUDF_SHAPE], 1);
  start = performance.now();
  const sample =
      await mvae.sample(4, null, ['C'], undefined, undefined, sampleControls);
  writeTimer('mel-controls-sample-time', start);
  writeNoteSeqs('mel-controls-samples', sample);

  mvae.dispose();
}

async function runMelRhythm() {
  const inputs = [MEL_TEAPOT, MEL_TWINKLE];
  writeNoteSeqs('mel-rhythm-inputs', inputs);

  const mvae = new mm.MusicVAE(MEL_RHYTHM_CKPT);
  await mvae.initialize();

  let start = performance.now();
  const interp = await mvae.interpolate(inputs, 5);
  writeTimer('mel-rhythm-interp-time', start);
  writeNoteSeqs('mel-rhythm-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('mel-rhythm-sample-time', start);
  writeNoteSeqs('mel-rhythm-samples', sample);

  mvae.dispose();
}

async function runMelShape() {
  const inputs = [MEL_TEAPOT, MEL_TWINKLE];
  writeNoteSeqs('mel-shape-inputs', inputs);

  const mvae = new mm.MusicVAE(MEL_SHAPE_CKPT);
  await mvae.initialize();

  let start = performance.now();
  const interp = await mvae.interpolate(inputs, 5);
  writeTimer('mel-shape-interp-time', start);
  writeNoteSeqs('mel-shape-interp', interp);

  start = performance.now();
  const sample = await mvae.sample(4);
  writeTimer('mel-shape-sample-time', start);
  writeNoteSeqs('mel-shape-samples', sample);

  mvae.dispose();
}

async function generateAllButton() {
  const button = document.createElement('button');
  button.textContent = 'Generate All';
  button.addEventListener('click', () => {
    runMelControls();
    runMelRhythm();
    runMelShape();
    button.disabled = true;
  });
  const div = document.getElementById('generate-all');
  div.appendChild(button);
}

async function generateMelControlsButton() {
  const melControlsButton = document.createElement('button');
  melControlsButton.textContent = 'Generate Multi-Conditioned Melody';
  melControlsButton.addEventListener('click', () => {
    runMelControls();
    melControlsButton.disabled = true;
  });
  const melControlsDiv = document.getElementById('generate-melody-controls');
  melControlsDiv.appendChild(melControlsButton);
}

async function generateMelRhythmButton() {
  const melRhythmButton = document.createElement('button');
  melRhythmButton.textContent = 'Generate Rhythm';
  melRhythmButton.addEventListener('click', () => {
    runMelRhythm();
    melRhythmButton.disabled = true;
  });
  const melRhythmDiv = document.getElementById('generate-melody-rhythm');
  melRhythmDiv.appendChild(melRhythmButton);
}

async function generateMelShapeButton() {
  const melShapeButton = document.createElement('button');
  melShapeButton.textContent = 'Generate Shape';
  melShapeButton.addEventListener('click', () => {
    runMelShape();
    melShapeButton.disabled = true;
  });
  const melShapeDiv = document.getElementById('generate-melody-shape');
  melShapeDiv.appendChild(melShapeButton);
}

try {
  Promise
      .all([
        generateAllButton(), generateMelControlsButton(),
        generateMelRhythmButton(), generateMelShapeButton()
      ])
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
