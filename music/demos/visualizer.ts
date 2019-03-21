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
let sequence2: mm.NoteSequence;

const player2 = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    visualizerRight.redraw(note, true);
    visualizerLeft.redraw(note, true);
  },
  stop: () => {}
});

// UI elements
const visualization2 = document.getElementById('visualization2') as HTMLInputElement;
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
visualization2.addEventListener('change', changeVisualization2);
playBtn2.addEventListener('click', () => startOrStop2());
tempoInput2.addEventListener('input', () => {
  player2.setTempo(parseInt(tempoInput2.value, 10));
  tempoValue2.textContent = tempoInput2.value;
});

function changeVisualization2() {
  configRight.pixelsPerTimeStep = visualization2.checked ? 0 : UNIFORM_TIME_SIZE;
  configLeft.pixelsPerTimeStep = visualization2.checked ? 0 : UNIFORM_TIME_SIZE;
  initPlayerAndVisualizer2(sequence2);
}

function fetchMidi2(url: string) {
  urlToNoteSequence(url).then(
    (seq) => {
      sequence2 = seq;
      initPlayerAndVisualizer2(sequence2);
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

// Section 3 ******

const DOUBLE_SCALE: mm.INoteSequence = {
  notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 1, program: 0},
    {pitch: 61, quantizedStartStep: 1, quantizedEndStep: 2, program: 0},
    {pitch: 62, quantizedStartStep: 2, quantizedEndStep: 3, program: 0},
    {pitch: 63, quantizedStartStep: 3, quantizedEndStep: 4, program: 0},
    {pitch: 64, quantizedStartStep: 4, quantizedEndStep: 5, program: 0},
    {pitch: 65, quantizedStartStep: 5, quantizedEndStep: 6, program: 0},
    {pitch: 66, quantizedStartStep: 6, quantizedEndStep: 7, program: 0},
    {pitch: 67, quantizedStartStep: 7, quantizedEndStep: 8, program: 0},
    {pitch: 68, quantizedStartStep: 8, quantizedEndStep: 9, program: 0},
    {pitch: 69, quantizedStartStep: 9, quantizedEndStep: 10, program: 0},
    {pitch: 70, quantizedStartStep: 10, quantizedEndStep: 11, program: 0},
    {pitch: 71, quantizedStartStep: 11, quantizedEndStep: 12, program: 0},
    {pitch: 72, quantizedStartStep: 12, quantizedEndStep: 13, program: 0},
    {pitch: 73, quantizedStartStep: 13, quantizedEndStep: 14, program: 0},
    {pitch: 74, quantizedStartStep: 14, quantizedEndStep: 15, program: 0},
    {pitch: 75, quantizedStartStep: 15, quantizedEndStep: 16, program: 0},
    {pitch: 76, quantizedStartStep: 16, quantizedEndStep: 17, program: 0},
    {pitch: 77, quantizedStartStep: 17, quantizedEndStep: 18, program: 0},
    {pitch: 78, quantizedStartStep: 18, quantizedEndStep: 19, program: 0},
    {pitch: 79, quantizedStartStep: 19, quantizedEndStep: 20, program: 0},
    {pitch: 80, quantizedStartStep: 20, quantizedEndStep: 21, program: 0},
    {pitch: 81, quantizedStartStep: 21, quantizedEndStep: 22, program: 0},
    {pitch: 82, quantizedStartStep: 22, quantizedEndStep: 23, program: 0},
    {pitch: 83, quantizedStartStep: 23, quantizedEndStep: 24, program: 0}
  ],
  tempos: [{time: 0, qpm: 120}],
  keySignatures: [{time: 0, key: 0}],
  timeSignatures: [{time: 0, numerator: 2, denominator: 4}],
  totalQuantizedSteps: 24,
  quantizationInfo: {stepsPerQuarter: 2}
};
let visualizer3: mm.StaffSVGVisualizer;
let sequence3 = DOUBLE_SCALE;

const player3 = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    visualizer3.redraw(note, true);
  },
  stop: () => {}
});

// UI elements
const visualization3 = document.getElementById('visualization3') as HTMLInputElement;
const playBtn3 = document.getElementById('playBtn3') as HTMLButtonElement;
const growBtn = document.getElementById('growBtn') as HTMLButtonElement;
const tempoInput3 = document.getElementById('tempoInput3') as HTMLInputElement;
const tempoValue3 = document.getElementById('tempoValue3') as HTMLDivElement;
const signatures = document.getElementById('signatures') as HTMLDivElement;

let configSignatures = {
  noteHeight: 15,
  pixelsPerTimeStep: UNIFORM_TIME_SIZE,
};

// Set up some event listeners
visualization3.addEventListener('change', changeVisualization3);
playBtn3.addEventListener('click', () => startOrStop3());
growBtn.addEventListener('click', 
  () => {
    ++DOUBLE_SCALE.keySignatures[0].key; 
    if(DOUBLE_SCALE.keySignatures[0].key == 12) {
      DOUBLE_SCALE.keySignatures[0].key = 0;
    };
    ++DOUBLE_SCALE.timeSignatures[0].numerator; 
    if(DOUBLE_SCALE.timeSignatures[0].numerator == 5) {
      DOUBLE_SCALE.timeSignatures[0].numerator = 2;
    };
    appendQuantized(sequence3, DOUBLE_SCALE, 16);
    visualizer3.redraw();
  }
);
tempoInput3.addEventListener('input', () => {
  player3.setTempo(parseInt(tempoInput3.value, 10));
  tempoValue3.textContent = tempoInput3.value;
});

function changeVisualization3() {
  configSignatures.pixelsPerTimeStep = visualization3.checked ? 0 : UNIFORM_TIME_SIZE;
  initPlayerAndVisualizer3(sequence3);
}

function initPlayerAndVisualizer3(seq: mm.INoteSequence) {
  // Disable the UI
  playBtn3.disabled = false;
  playBtn3.textContent = 'Loading';

  visualizer3 = new mm.StaffSVGVisualizer(seq, signatures, configSignatures);

  const tempo = seq.tempos[0].qpm;
  player3.setTempo(tempo);
  tempoValue3.textContent = tempoInput3.value = '' + tempo;

  // Enable the UI
  playBtn3.disabled = false;
  playBtn3.textContent = 'Play';
}

function startOrStop3() {
  if (player3.isPlaying()) {
    player3.stop();
    playBtn3.textContent = 'Play';
  } else {
    player3.start(visualizer3.noteSequence);
    playBtn3.textContent = 'Stop';
  }
}

function appendQuantized(
  sequence: mm.INoteSequence, 
  appended: mm.INoteSequence, 
  stepsPerQuarter: number
): mm.INoteSequence {
  mm.sequences.assertIsQuantizedSequence(sequence);
  sequence = mm.sequences.isQuantizedSequence(sequence) ?
    sequence : 
    mm.sequences.quantizeNoteSequence(sequence, stepsPerQuarter);
  appended = mm.sequences.isQuantizedSequence(appended) ?
    mm.sequences.clone(appended) : 
    mm.sequences.quantizeNoteSequence(appended, stepsPerQuarter);
  const offset = sequence.totalQuantizedSteps;
  appended.notes.forEach(
    note => {
      note.quantizedStartStep += offset;
      note.quantizedEndStep += offset;
      sequence.notes.push(note);
    }
  );
  appended.keySignatures.forEach(
    k => { sequence.keySignatures.push({time: k.time + offset, key:k.key}); }
  );
  appended.timeSignatures.forEach(
    t => {
      sequence.timeSignatures.push(
        {time: t.time + offset, numerator: t.numerator, denominator: t.denominator}
      ); 
    }
  );
  sequence.totalQuantizedSteps += appended.totalQuantizedSteps;
  return sequence;
}

fetchMidi2(ADVANCED_MIDI_URL);
initPlayerAndVisualizer3(sequence3);