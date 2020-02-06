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

import * as mm from '../src/index';
import {blobToNoteSequence, urlToNoteSequence} from '../src/index';
import {FULL_TWINKLE_UNQUANTIZED} from './common';

const MIDI_URL = './melody.mid';
let visualizers: mm.BaseVisualizer[] = [];
let currentSequence: mm.INoteSequence = null;

const player = new mm.SoundFontPlayer(
    'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus',
    mm.Player.tone.Master, null, null, {
      run: (note: mm.NoteSequence.Note) => {
        for (let i = 0; i < visualizers.length; i++) {
          visualizers[i].redraw(note, true);
        }
      },
      stop: () => {
        for (let i = 0; i < visualizers.length; i++) {
          visualizers[i].clearActiveNotes();
        }
      }
    });

// UI elements
const playBtn = document.getElementById('playBtn') as HTMLButtonElement;
const urlBtn = document.getElementById('urlBtn') as HTMLButtonElement;
const seqBtn = document.getElementById('seqBtn') as HTMLButtonElement;
const tempoInput = document.getElementById('tempoInput') as HTMLInputElement;
const tempoValue = document.getElementById('tempoValue') as HTMLDivElement;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const svg = document.getElementsByTagName('svg')[0] as SVGSVGElement;
const waterfall = document.querySelector('#waterfall') as HTMLDivElement;
const staff = document.getElementById('staff') as HTMLDivElement;

// Set up some event listeners
urlBtn.addEventListener('click', () => fetchMidi(MIDI_URL));
playBtn.addEventListener('click', () => startOrStop());
seqBtn.addEventListener('click', () => {
  initPlayerAndVisualizer(FULL_TWINKLE_UNQUANTIZED);
});
fileInput.addEventListener('change', loadFile);
tempoInput.addEventListener('input', () => {
  player.setTempo(parseInt(tempoInput.value, 10));
  tempoValue.textContent = tempoInput.value;
});

function fetchMidi(url: string) {
  urlToNoteSequence(url).then((seq) => initPlayerAndVisualizer(seq));
}

// tslint:disable-next-line:no-any
function loadFile(e: any) {
  blobToNoteSequence(e.target.files[0])
      .then((seq) => initPlayerAndVisualizer(seq));
}

async function initPlayerAndVisualizer(seq: mm.INoteSequence) {
  // Disable the UI.
  playBtn.disabled = false;
  playBtn.textContent = 'Loading';

  visualizers = [
    new mm.PianoRollSVGVisualizer(seq, svg),
    new mm.StaffSVGVisualizer(seq, staff),
    new mm.WaterfallSVGVisualizer(seq, waterfall),
    new mm.PianoRollCanvasVisualizer(seq, canvas),
  ];
  currentSequence = seq;

  const tempo = seq.tempos[0].qpm;
  player.setTempo(tempo);
  tempoValue.textContent = tempoInput.value = '' + tempo;

  // Enable the UI.
  await player.loadSamples(seq);
  playBtn.disabled = false;
  playBtn.textContent = 'Play';
}

function startOrStop() {
  if (player.isPlaying()) {
    player.stop();
    playBtn.textContent = 'Play';
  } else {
    player.start(currentSequence);
    playBtn.textContent = 'Stop';
  }
}
