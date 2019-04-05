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
import {ANNA_MAGDALENA_BACH, DOUBLE_SCALE, STAFF_USE_CASES} 
  from './staff_svg_scores';

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

const UNIFORM_TIME_SIZE = 200;

let visualizerRight: mm.StaffSVGVisualizer;
let visualizerLeft: mm.StaffSVGVisualizer;
const sequence2 = ANNA_MAGDALENA_BACH;

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
  scrollType: mm.ScrollType.BAR
};

let configLeft = {
  noteHeight: 15,
  pixelsPerTimeStep: UNIFORM_TIME_SIZE,
  instruments: [1],
  defaultKey: 7,
  scrollType: mm.ScrollType.BAR
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

let visualizer3: mm.StaffSVGVisualizer;
const sequence3 = mm.sequences.clone(DOUBLE_SCALE);

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
const signatures = document.getElementById('multiple-signatures') as HTMLDivElement;

let configSignatures:mm.AdvancedVisualizerConfig = {
  noteHeight: 15,
  pixelsPerTimeStep: 100,
  scrollType: mm.ScrollType.NOTE
};

// Set up some event listeners
visualization3.addEventListener('change', changeVisualization3);
playBtn3.addEventListener('click', () => startOrStop3());
growBtn.addEventListener('click', 
  () => { //
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

// Section 4 ******

let visualizer4: mm.StaffSVGVisualizer;
const sequence4 = STAFF_USE_CASES;

const player4 = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    visualizer4.redraw(note, true);
  },
  stop: () => {}
});

// UI elements
const visualization4 = document.getElementById('visualization4') as HTMLInputElement;
const playBtn4 = document.getElementById('playBtn4') as HTMLButtonElement;
const tempoInput4 = document.getElementById('tempoInput4') as HTMLInputElement;
const tempoValue4 = document.getElementById('tempoValue4') as HTMLDivElement;
const catalog = document.getElementById('catalog') as HTMLDivElement;

let configCatalog:mm.AdvancedVisualizerConfig = {
  noteHeight: 15,
  pixelsPerTimeStep: 0,
  scrollType: mm.ScrollType.NOTE
};

// Set up some event listeners
visualization4.checked = true;
visualization4.addEventListener('change', changeVisualization4);
playBtn4.addEventListener('click', () => startOrStop4());
tempoInput4.addEventListener('input', () => {
  player4.setTempo(parseInt(tempoInput4.value, 10));
  tempoValue4.textContent = tempoInput4.value;
});

function changeVisualization4() {
  configCatalog.pixelsPerTimeStep = visualization4.checked ? 0 : 4 * UNIFORM_TIME_SIZE;
  initPlayerAndVisualizer4(sequence4);
}

function initPlayerAndVisualizer4(seq: mm.INoteSequence) {
  // Disable the UI
  playBtn4.disabled = false;
  playBtn4.textContent = 'Loading';

  visualizer4 = new mm.StaffSVGVisualizer(seq, catalog, configCatalog);

  const tempo = seq.tempos[0].qpm;
  player4.setTempo(tempo);
  tempoValue4.textContent = tempoInput4.value = '' + tempo;

  // Enable the UI
  playBtn4.disabled = false;
  playBtn4.textContent = 'Play';
}

function startOrStop4() {
  if (player4.isPlaying()) {
    player4.stop();
    playBtn4.textContent = 'Play';
  } else {
    player4.start(visualizer4.noteSequence);
    playBtn4.textContent = 'Stop';
  }
}

initPlayerAndVisualizer2(sequence2);
initPlayerAndVisualizer3(sequence3);
initPlayerAndVisualizer4(sequence4);