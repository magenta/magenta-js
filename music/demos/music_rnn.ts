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

const CHECKPOINTS_DIR =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/';
const MEL_CHECKPOINT = `${CHECKPOINTS_DIR}basic_rnn`;
const DRUMS_CHECKPOINT = `${CHECKPOINTS_DIR}drum_kit_rnn`;
const IMPROV_CHECKPOINT = `${CHECKPOINTS_DIR}chord_pitches_improv`;

const SOUNDFONT_URL =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/download.magenta.tensorflow.org/soundfonts_js/sgm_v85';

const MELODY_NS: mm.INoteSequence = {
  ticksPerQuarter: 220,
  totalTime: 1.5,
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  notes: [
    {
      instrument: 0,
      program: 0,
      startTime: 0,
      endTime: 0.5,
      pitch: 60,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.5,
      endTime: 1.0,
      pitch: 60,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 1.0,
      endTime: 1.5,
      pitch: 67,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 1.5,
      endTime: 2.0,
      pitch: 67,
      velocity: 100,
      isDrum: false
    }
  ]
};

const DRUMS_NS: mm.INoteSequence = {
  ticksPerQuarter: 220,
  totalTime: 1.5,
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  notes: [
    {startTime: 0, endTime: 0.5, pitch: 35, velocity: 100, isDrum: true}, {
      instrument: 0,
      startTime: 0.5,
      endTime: 1.0,
      pitch: 39,
      velocity: 100,
      isDrum: true
    },
    {
      instrument: 0,
      startTime: 0.5,
      endTime: 1.0,
      pitch: 43,
      velocity: 100,
      isDrum: true
    },
    {startTime: 1.0, endTime: 1.5, pitch: 35, velocity: 100, isDrum: true}, {
      instrument: 0,
      startTime: 1.5,
      endTime: 2.0,
      pitch: 39,
      velocity: 100,
      isDrum: true
    },
    {
      instrument: 0,
      startTime: 1.5,
      endTime: 2.0,
      pitch: 43,
      velocity: 100,
      isDrum: true
    }
  ]
};

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
  const player = new mm.SoundFontPlayer(SOUNDFONT_URL);
  const button = document.createElement('button');
  button.textContent = 'Play';
  button.disabled = true;
  player.initialize()
      .then(() => player.loadSamples(seq))
      .then(() => button.disabled = false);
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

async function runMelodyRnn() {
  const melodyRnn = new mm.MusicRNN(MEL_CHECKPOINT);
  await melodyRnn.initialize();

  const qns = mm.sequences.quantizeNoteSequence(MELODY_NS, 4);
  writeNoteSeqs('melody-cont-inputs', [qns]);
  const start = performance.now();
  const continuation = await melodyRnn.continueSequence(qns, 20);
  writeTimer('melody-cont-time', start);
  writeNoteSeqs('melody-cont-results', [continuation]);
  melodyRnn.dispose();

  console.log(tf.getBackend());
  console.log(tf.memory());
}

async function runDrumsRnn() {
  const drumsRnn = new mm.MusicRNN(DRUMS_CHECKPOINT);
  await drumsRnn.initialize();

  const qns = mm.sequences.quantizeNoteSequence(DRUMS_NS, 4);
  writeNoteSeqs('drums-cont-inputs', [qns]);
  const start = performance.now();
  const continuation = await drumsRnn.continueSequence(qns, 20);
  writeTimer('drums-cont-time', start);
  writeNoteSeqs('drums-cont-results', [continuation]);
  drumsRnn.dispose();

  console.log(tf.getBackend());
  console.log(tf.memory());
}

async function runImprovRnn() {
  const improvRnn = new mm.MusicRNN(IMPROV_CHECKPOINT);
  await improvRnn.initialize();

  const qns = mm.sequences.quantizeNoteSequence(MELODY_NS, 4);
  writeNoteSeqs('improv-cont-inputs', [qns]);
  const start = performance.now();
  const continuation = await improvRnn.continueSequence(qns, 20, 1.0, ['Cm']);
  writeTimer('improv-cont-time', start);
  writeNoteSeqs('improv-cont-results', [continuation]);
  improvRnn.dispose();

  console.log(tf.getBackend());
  console.log(tf.memory());
}

runMelodyRnn();
runDrumsRnn();
runImprovRnn();
