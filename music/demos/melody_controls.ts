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
import {INoteSequence} from '../src/index';
import * as timer from '../src/core/compat/timer';

import {CHECKPOINTS_DIR, MEL_TEAPOT, MEL_TWINKLE} from './common';
import {writeMemory, writeNoteSeqs, writeTimer} from './common';

mm.logging.verbosity = mm.logging.Level.DEBUG;

const MEL_CONTROLS_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_controls`;
const MEL_RHYTHM_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_rhythm`;
const MEL_SHAPE_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_shape`;

const MEL_MULTI_DIR = `${CHECKPOINTS_DIR}/music_vae/mel_multicontrol`;
const MEL_MULTI_CONTROLS = `${MEL_MULTI_DIR}/mel_2bar_multicontrol_tiny_fb16`;
const MEL_MULTI_CONTROLS_KEY =
    `${MEL_MULTI_DIR}/mel_2bar_multicontrol_key_tiny_fb16`;
const MEL_MULTI_RHYTHM = `${MEL_MULTI_DIR}/mel_rhythm_2bar_tiny_fb16`;
const MEL_MULTI_SHAPE = `${MEL_MULTI_DIR}/mel_shape_2bar_tiny_fb16`;

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
const REGISTER = new mm.melodies.MelodyRegister([50, 63, 70]);

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

  let start = timer.now();
  const interp = await mvae.interpolate(inputs, 5, null, {
    chordProgression: ['A'],
    extraControls: {rhythm: teapotRhythm, shape: teapotShape}
  });
  writeTimer('mel-controls-interp-time', start);
  writeNoteSeqs('mel-controls-interp', interp);

  start = timer.now();
  const sample = await mvae.sample(4, null, {
    chordProgression: ['C'],
    extraControls: {rhythm: DOTTED_RHYTHM, shape: UDUDF_SHAPE}
  });
  writeTimer('mel-controls-sample-time', start);
  writeNoteSeqs('mel-controls-samples', sample);

  mvae.dispose();
}

async function runMelRhythm() {
  const inputs = [MEL_TEAPOT, MEL_TWINKLE];
  writeNoteSeqs('mel-rhythm-inputs', inputs);

  const mvae = new mm.MusicVAE(MEL_RHYTHM_CKPT);
  await mvae.initialize();

  let start = timer.now();
  const interp = await mvae.interpolate(inputs, 5);
  writeTimer('mel-rhythm-interp-time', start);
  writeNoteSeqs('mel-rhythm-interp', interp);

  const source = MEL_TEAPOT;
  writeNoteSeqs('mel-rhythm-source', [source]);
  start = timer.now();
  const similar = await mvae.similar(source, 4, 0.8);
  writeTimer('mel-rhythm-similar-time', start);
  writeNoteSeqs('mel-rhythm-similar', similar);

  start = timer.now();
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

  let start = timer.now();
  const interp = await mvae.interpolate(inputs, 5);
  writeTimer('mel-shape-interp-time', start);
  writeNoteSeqs('mel-shape-interp', interp);

  const source = MEL_TEAPOT;
  writeNoteSeqs('mel-shape-source', [source]);
  start = timer.now();
  const similar = await mvae.similar(source, 4, 0.8);
  writeTimer('mel-shape-similar-time', start);
  writeNoteSeqs('mel-shape-similar', similar);

  start = timer.now();
  const sample = await mvae.sample(4);
  writeTimer('mel-shape-sample-time', start);
  writeNoteSeqs('mel-shape-samples', sample);

  mvae.dispose();
}

async function runMelMulti() {
  const mvaeMel = new mm.MusicVAE(MEL_MULTI_CONTROLS);
  const mvaeMelKey = new mm.MusicVAE(MEL_MULTI_CONTROLS_KEY);
  const mvaeRhythm = new mm.MusicVAE(MEL_MULTI_RHYTHM);
  const mvaeShape = new mm.MusicVAE(MEL_MULTI_SHAPE);

  await Promise.all([
    mvaeMel.initialize(), mvaeMelKey.initialize(), mvaeRhythm.initialize(),
    mvaeShape.initialize()
  ]);

  let start = timer.now();

  const rhythmTensors = await mvaeRhythm.sampleTensors(1);
  const shapeTensors = await mvaeShape.sampleTensors(1);
  const rhythmTensor = tf.squeeze(rhythmTensors, [0]) as tf.Tensor2D;
  const shapeTensor = tf.squeeze(shapeTensors, [0]) as tf.Tensor2D;
  const registerTensor = REGISTER.extract(
      mm.melodies.Melody.fromNoteSequence(MEL_TEAPOT, 0, 127, true, 32));
  const extraControls = {
    rhythm: rhythmTensor,
    shape: shapeTensor,
    register: registerTensor
  };

  const melodySeqs =
      await mvaeMel.sample(1, null, {chordProgression: ['C'], extraControls});
  const rhythmSeq = await mvaeRhythm.dataConverter.toNoteSequence(rhythmTensor);
  const shapeSeq = await mvaeShape.dataConverter.toNoteSequence(shapeTensor);

  writeTimer('mel-multi-sample-time', start);
  writeNoteSeqs('mel-multi-seqs', [rhythmSeq, shapeSeq, melodySeqs[0]]);

  const melodySeqsIonian = await mvaeMelKey.sample(
      1, null, {chordProgression: ['C'], key: 0, extraControls});
  const zKey = await mvaeMelKey.encode(
      melodySeqsIonian, {chordProgression: ['C'], key: 0, extraControls});
  const melodySeqsLydian = await mvaeMelKey.decode(
      zKey, null, {chordProgression: ['C'], key: 7, extraControls});
  const melodySeqsMixolydian = await mvaeMelKey.decode(
      zKey, null, {chordProgression: ['C'], key: 5, extraControls});

  writeNoteSeqs(
      'mel-multi-key-seqs',
      [melodySeqsIonian[0], melodySeqsLydian[0], melodySeqsMixolydian[0]]);

  start = timer.now();

  const z = await mvaeMel.encode(
      melodySeqs, {chordProgression: ['C'], extraControls});

  const similarRhythmTensors =
      await mvaeRhythm.similarTensors(rhythmTensor, 4, 0.8);
  const similarShapeTensors =
      await mvaeShape.similarTensors(shapeTensor, 4, 0.8);
  const similarRhythmTensorsSplit = similarRhythmTensors.split(4);
  const similarShapeTensorsSplit = similarShapeTensors.split(4);

  const similarSeqs: INoteSequence[] = [];
  for (let i = 0; i < 4; ++i) {
    const similarRhythmTensor: tf.Tensor2D =
        tf.squeeze(similarRhythmTensorsSplit[i], [0]);
    const similarShapeTensor: tf.Tensor2D =
        tf.squeeze(similarShapeTensorsSplit[i], [0]);
    const similarSeq = await mvaeMel.decode(z, null, {
      chordProgression: ['C'],
      extraControls: {
        rhythm: similarRhythmTensor,
        shape: similarShapeTensor,
        register: registerTensor
      }
    });
    similarSeqs.push(similarSeq[0]);
    similarRhythmTensor.dispose();
    similarShapeTensor.dispose();
    similarRhythmTensorsSplit[i].dispose();
    similarShapeTensorsSplit[i].dispose();
  }

  writeTimer('mel-multi-similar-time', start);
  writeNoteSeqs('mel-multi-similar', similarSeqs);

  rhythmTensors.dispose();
  shapeTensors.dispose();
  rhythmTensor.dispose();
  shapeTensor.dispose();
  registerTensor.dispose();

  z.dispose();
  similarRhythmTensors.dispose();
  similarShapeTensors.dispose();

  mvaeMel.dispose();
  mvaeRhythm.dispose();
  mvaeShape.dispose();
}

async function generateAllButton() {
  const button = document.createElement('button');
  button.textContent = 'Generate All';
  button.addEventListener('click', () => {
    runMelControls();
    runMelRhythm();
    runMelShape();
    runMelMulti();
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

async function generateMelMultiButton() {
  const melMultiButton = document.createElement('button');
  melMultiButton.textContent = 'Generate Rhythm, Shape, and Melody';
  melMultiButton.addEventListener('click', () => {
    runMelMulti();
    melMultiButton.disabled = true;
  });
  const melMultiDiv = document.getElementById('generate-melody-multi');
  melMultiDiv.appendChild(melMultiButton);
}

try {
  Promise
      .all([
        generateAllButton(), generateMelControlsButton(),
        generateMelRhythmButton(), generateMelShapeButton(),
        generateMelMultiButton()
      ])
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
