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
//@ts-ignore
import * as MediaRecorder from 'audio-recorder-polyfill';

import * as mm from '../src/index';
import {INoteSequence} from '../src/index';
// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, notesMatch, writeMemory, writeNoteSeqs, writeTimer} from './common';

mm.logging.verbosity = mm.logging.Level.DEBUG;

const TRANS_CKPT_DIR = `${CHECKPOINTS_DIR}/transcription`;
const MEL_CKPT_URL = `${TRANS_CKPT_DIR}/onsets_frames_htk0`;
const AUD_CKPT_URL = `${TRANS_CKPT_DIR}/onsets_frames_htk1`;
const MEL_SPEC_SUFFIX = 'MAPS_MUS-mz_331_3_ENSTDkCl.250frames.melspec.json';
const EXPECTED_NS_SUFFIX = 'MAPS_MUS-mz_331_3_ENSTDkCl.250frames.ns.json';
// tslint:disable:max-line-length
const ORIGINAL_AUDIO_URL =
    'https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_htk0/MAPS_MUS-mz_331_3_ENSTDkCl-250frames.wav';
// tslint:enable:max-line-length

// Transcription from a file.
document.getElementById('fileInput').addEventListener('change', (e: any) => {
  const file = e.target.files[0];
  transcribeFromFile(file);
  return false;
});

// Audio transcription.
document.getElementById('audioBtn').addEventListener('click', () => {
  const oafA = new mm.OnsetsAndFrames(AUD_CKPT_URL);
  setLoadingMessage('audio');
  oafA.initialize()
      .then(() => transcribeFromAudio(oafA))
      .then(() => oafA.dispose())
      .then(() => writeMemory(tf.memory().numBytes, 'audio-leaked-memory'));
});

// Mel transcription.
document.getElementById('melBtn').addEventListener('click', () => {
  const oafM = new mm.OnsetsAndFrames(MEL_CKPT_URL);
  setLoadingMessage('batch');
  oafM.initialize()
      .then(() => transcribe(oafM, 250))
      .then(() => transcribe(oafM, 150))
      .then(() => transcribe(oafM, 80))
      .then(() => transcribe(oafM, 62))
      .then(() => transcribe(oafM, 50))
      .then(() => oafM.dispose())
      .then(() => writeMemory(tf.memory().numBytes));
});

// Audio recording. Only supported natively in Firefox and Safari.
// See https://caniuse.com/#feat=mediarecorder.
// For everything else, we use a polyfill.

// tslint:disable-next-line:no-any
const appeaseTsLintWindow = (window as any);
if (!appeaseTsLintWindow.MediaRecorder) {
  mm.logging.log(
      'Using the MediaRecorder polyfill.', 'Demo', mm.logging.Level.DEBUG);
  appeaseTsLintWindow.MediaRecorder = MediaRecorder;
}

// tslint:disable-next-line:no-any
let recorder: any;
let isRecording = false;
const recordBtn = document.getElementById('recordBtn');
recordBtn.addEventListener('click', () => {
  if (isRecording) {
    isRecording = false;
    recordBtn.textContent = 'Record';
    recorder.stop();
  } else {
    isRecording = true;
    recordBtn.textContent = 'Stop';
    // Request permissions to record audio.
    navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
      recorder = new appeaseTsLintWindow.MediaRecorder(stream);

      // tslint:disable-next-line:no-any
      recorder.addEventListener('dataavailable', (e: any) => {
        transcribeFromFile(e.data, 'recorder');
      });
      recorder.start();
    });
  }
});

let expectedNs: INoteSequence;
fetch(`${MEL_CKPT_URL}/${EXPECTED_NS_SUFFIX}`)
    .then((response) => response.json())
    .then((ns) => {
      expectedNs = ns;
      writeNoteSeqs('expected-ns', [expectedNs], undefined, true);
      writeNoteSeqs('expected-audio-ns', [expectedNs], undefined, true);
    });

async function transcribe(oaf: mm.OnsetsAndFrames, batchLength: number) {
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
  const start = performance.now();
  const ns = await oaf.transcribeFromAudioURL(ORIGINAL_AUDIO_URL);
  writeTimer('audio-time', start);
  writeNoteSeqs('audio-results', [ns], undefined, true);

  document.getElementById('audio-match').innerHTML =
      notesMatch(ns.notes, expectedNs.notes) ?
      '<span style="color:green">TRUE</span>' :
      '<b><span style="color:red">FALSE</span></b>';
}

async function transcribeFromFile(blob: Blob, prefix = 'file') {
  setLoadingMessage(prefix);
  const audioEl =
      document.getElementById(`${prefix}Player`) as HTMLAudioElement;
  audioEl.hidden = false;
  audioEl.src = window.URL.createObjectURL(blob);

  const oafA = new mm.OnsetsAndFrames(AUD_CKPT_URL);
  oafA.initialize()
      .then(async () => {
        const start = performance.now();
        const ns = await oafA.transcribeFromAudioFile(blob);
        writeTimer(`${prefix}-time`, start);
        writeNoteSeqs(`${prefix}-results`, [ns], undefined, true);
      })
      .then(() => oafA.dispose())
      .then(() => writeMemory(tf.memory().numBytes, `${prefix}-leaked-memory`));
}

function setLoadingMessage(className: string) {
  const els = document.querySelectorAll(`.${className}`);
  for (let i = 0; i < els.length; i++) {
    els[i].textContent = 'Loading...';
  }
}
