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

let visualizer: mm.Visualizer;
const player = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    visualizer.redraw(note, true);
  },
  stop: () => {}
});

// UI elements
const playBtn = document.getElementById('playBtn') as HTMLButtonElement;
const urlBtn = document.getElementById('urlBtn') as HTMLButtonElement;
const seqBtn = document.getElementById('seqBtn') as HTMLButtonElement;
const tempoInput = document.getElementById('tempoInput') as HTMLInputElement;
const tempoValue = document.getElementById('tempoValue') as HTMLDivElement;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

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

function initPlayerAndVisualizer(seq: mm.INoteSequence) {
  // Disable the UI
  playBtn.disabled = false;
  playBtn.textContent = 'Loading';

  visualizer = new mm.Visualizer(seq, canvas);

  const tempo = seq.tempos[0].qpm;
  player.setTempo(tempo);
  tempoValue.textContent = tempoInput.value = '' + tempo;

  // Enable the UI
  playBtn.disabled = false;
  playBtn.textContent = 'Play';
}

function startOrStop() {
  if (player.isPlaying()) {
    player.stop();
    playBtn.textContent = 'Play';
  } else {
    player.start(visualizer.noteSequence);
    playBtn.textContent = 'Stop';
  }
}
