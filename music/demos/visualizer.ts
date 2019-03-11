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

// Section 1 *****

const MIDI_URL = './melody.mid';

let canvasVisualizer: mm.PianoRollCanvasVisualizer;
let pianoRollSvgVisualizer: mm.PianoRollSVGVisualizer;
let staffSvgVisualizer: mm.StaffSVGVisualizer;

const player = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    canvasVisualizer.redraw(note, true);
    pianoRollSvgVisualizer.redraw(note, true);
    staffSvgVisualizer.redraw(note, true);
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
const canvas = document.getElementById('piano-roll-canvas-viewer') as HTMLCanvasElement;
const svg = document.querySelector('svg[id="piano-roll-svg-viewer"]') as SVGSVGElement;
const staff = document.getElementById('staff-svg-viewer') as HTMLDivElement;

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

  let config = {
    pixelsPerTimeStep: 60,
  };

  canvasVisualizer = new mm.PianoRollCanvasVisualizer(seq, canvas, config);
  pianoRollSvgVisualizer = new mm.PianoRollSVGVisualizer(seq, svg, config);
  staffSvgVisualizer = new mm.StaffSVGVisualizer(seq, staff, config);

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
    player.start(canvasVisualizer.noteSequence);
    playBtn.textContent = 'Stop';
  }
}


// Section 2 ******

const ADVANCED_MIDI_URL = './anna-magdalena-bach.mid';
const UNIFORM_TIME_SIZE = 200;

let visualizerRight: mm.StaffSVGVisualizer;
let visualizerLeft: mm.StaffSVGVisualizer;
let sequence: mm.NoteSequence;

const player2 = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    visualizerRight.redraw(note, true);
    visualizerLeft.redraw(note, true);
  },
  stop: () => {}
});

// UI elements
const visualization = document.getElementById('visualization') as HTMLInputElement;
const playBtn2 = document.getElementById('playBtn2') as HTMLButtonElement;
const tempoInput2 = document.getElementById('tempoInput2') as HTMLInputElement;
const tempoValue2 = document.getElementById('tempoValue2') as HTMLDivElement;
const staffRight = document.getElementById('right-hand') as HTMLDivElement;
const staffLeft = document.getElementById('left-hand') as HTMLDivElement;

let configRight = {
  noteHeight: 15,
  pixelsPerTimeStep: UNIFORM_TIME_SIZE,
  instruments: [0],
  defaultKey: 7,
  scrollOnBars: true
};

let configLeft = {
  noteHeight: 15,
  pixelsPerTimeStep: UNIFORM_TIME_SIZE,
  instruments: [1],
  defaultKey: 7,
  scrollOnBars: true
}

// Set up some event listeners
visualization.addEventListener('change', changeVisualization);
playBtn2.addEventListener('click', () => startOrStop2());
tempoInput2.addEventListener('input', () => {
  player2.setTempo(parseInt(tempoInput.value, 10));
  tempoValue2.textContent = tempoInput.value;
});

function changeVisualization() {
  configRight.pixelsPerTimeStep = visualization.checked ? 0 : UNIFORM_TIME_SIZE;
  configLeft.pixelsPerTimeStep = visualization.checked ? 0 : UNIFORM_TIME_SIZE;
  initPlayerAndVisualizer2(sequence);
}

function fetchMidi2(url: string) {
  urlToNoteSequence(url).then(
    (seq) => {
      sequence = seq;
      initPlayerAndVisualizer2(sequence);
    }
  );
}

function initPlayerAndVisualizer2(seq: mm.INoteSequence) {
  // Disable the UI
  playBtn2.disabled = false;
  playBtn2.textContent = 'Loading';

  visualizerRight = new mm.StaffSVGVisualizer(seq, staffRight, configRight);
  visualizerLeft = new mm.StaffSVGVisualizer(seq, staffLeft, configLeft);

  const tempo = seq.tempos[0].qpm;
  player2.setTempo(tempo);
  tempoValue2.textContent = tempoInput2.value = '' + tempo;

  // Enable the UI
  playBtn2.disabled = false;
  playBtn2.textContent = 'Play';
}

function startOrStop2() {
  if (player2.isPlaying()) {
    player2.stop();
    playBtn2.textContent = 'Play';
  } else {
    player2.start(visualizerLeft.noteSequence);
    playBtn2.textContent = 'Stop';
  }
}

fetchMidi2(ADVANCED_MIDI_URL);