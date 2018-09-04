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
import {INoteSequence} from '../src/index';
import {loadBuffer} from '../src/transcription/audio_utils';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, notesMatch, writeMemory, writeNoteSeqs, writeTimer} from './common';

const TRANS_CKPT_DIR = `${CHECKPOINTS_DIR}/transcription`;
const MEL_CKPT_URL = `${TRANS_CKPT_DIR}/onsets_frames_htk0`;
const AUD_CKPT_URL = `${TRANS_CKPT_DIR}/onsets_frames_htk1`;
const MEL_SPEC_SUFFIX = 'MAPS_MUS-mz_331_3_ENSTDkCl.250frames.melspec.json';
const EXPECTED_NS_SUFFIX = 'MAPS_MUS-mz_331_3_ENSTDkCl.250frames.ns.json';
// tslint:disable:max-line-length
const ORIGINAL_AUDIO_URL =
    'https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_htk0/MAPS_MUS-mz_331_3_ENSTDkCl-250frames.wav';
// tslint:enable:max-line-length

async function transcribe(oaf: mm.OnsetsAndFrames, batchLength: number) {
  const expectedNs: INoteSequence =
      await fetch(`${MEL_CKPT_URL}/${EXPECTED_NS_SUFFIX}`)
          .then((response) => response.json());
  writeNoteSeqs('expected-ns', [expectedNs], undefined, true);

  const melSpec: number[][] = await fetch(`${MEL_CKPT_URL}/${MEL_SPEC_SUFFIX}`)
                                  .then((response) => response.json());

  const start = performance.now();
  oaf.batchLength = batchLength;
  const ns = await oaf.transcribeFromMelSpec(melSpec);
  writeTimer(`${batchLength}-time`, start);
  writeNoteSeqs(`${batchLength}-results`, [ns], undefined, true);

  document.getElementById(`${batchLength}-match`).innerHTML =
      notesMatch(ns.notes, expectedNs.notes) ?
      '<span style="color:green">TRUE</span>' :
      '<b><span style="color:red">FALSE</span></b>';
}

async function transcribeFromAudio(oaf: mm.OnsetsAndFrames) {
  const audio = await loadBuffer(ORIGINAL_AUDIO_URL);
  const expectedNs: INoteSequence =
      await fetch(`${MEL_CKPT_URL}/${EXPECTED_NS_SUFFIX}`)
          .then((response) => response.json());
  writeNoteSeqs('expected-audio-ns', [expectedNs], undefined, true);

  const start = performance.now();
  const ns = await oaf.transcribeFromAudio(audio);
  writeTimer('audio-time', start);
  writeNoteSeqs('audio-results', [ns], undefined, true);

  document.getElementById('audio-match').innerHTML =
      notesMatch(ns.notes, expectedNs.notes) ?
      '<span style="color:green">TRUE</span>' :
      '<b><span style="color:red">FALSE</span></b>';
}

try {
  const oafA = new mm.OnsetsAndFrames(AUD_CKPT_URL);
  const oafM = new mm.OnsetsAndFrames(MEL_CKPT_URL);
  oafA.initialize()
      .then(() => transcribeFromAudio(oafA))
      .then(() => oafM.initialize())
      .then(() => transcribe(oafM, 250))
      .then(() => transcribe(oafM, 150))
      .then(() => transcribe(oafM, 80))
      .then(() => transcribe(oafM, 62))
      .then(() => transcribe(oafM, 50))
      .then(() => oafA.dispose())
      .then(() => oafM.dispose())
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
