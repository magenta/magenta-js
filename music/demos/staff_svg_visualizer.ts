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

import {ANNA_MAGDALENA_BACH, DOUBLE_SCALE, STAFF_USE_CASES} 
  from './staff_svg_scores';

// Section 1 ******

const UNIFORM_TIME_SIZE = 200;

let visualizerRight: mm.StaffSVGVisualizer;
let visualizerLeft: mm.StaffSVGVisualizer;
const sequence1 = ANNA_MAGDALENA_BACH;

const player1 = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    visualizerRight.redraw(note, true);
    visualizerLeft.redraw(note, true);
  },
  stop: () => {}
});

// UI elements
const compactMode1 = document.getElementById('compactMode1') as HTMLInputElement;
const playBtn1 = document.getElementById('playBtn1') as HTMLButtonElement;
const tempoInput1 = document.getElementById('tempoInput1') as HTMLInputElement;
const tempoValue1 = document.getElementById('tempoValue1') as HTMLDivElement;
const staffRight = document.getElementById('right-hand') as HTMLDivElement;
const staffLeft = document.getElementById('left-hand') as HTMLDivElement;

let configRight = {
  noteHeight: 15,
  pixelsPerTimeStep: 0,
  instruments: [0],
  defaultKey: 7,
  scrollType: mm.ScrollType.BAR
};

let configLeft = {
  noteHeight: 15,
  pixelsPerTimeStep: 0,
  instruments: [1],
  defaultKey: 7,
  scrollType: mm.ScrollType.BAR
}

// Set up some event listeners
playBtn1.addEventListener(
  'click', () => startOrStop(player1, visualizerRight.noteSequence, playBtn1)
);

compactMode1.checked = true;
compactMode1.addEventListener(
  'change', () => {
    [configLeft, configRight].forEach(
      config => config.pixelsPerTimeStep = compactMode1.checked ? 0 : UNIFORM_TIME_SIZE
    )  
    initPlayerAndVisualizer1(sequence1);
  }
);

tempoInput1.addEventListener(
  'input', () => changeTempo(player1, tempoInput1.value, tempoValue1)
);

function initPlayerAndVisualizer1(seq: mm.INoteSequence) {
  // Disable the UI
  playBtn1.disabled = false;
  playBtn1.textContent = 'Loading';

  visualizerRight = new mm.StaffSVGVisualizer(seq, staffRight, configRight);
  visualizerLeft = new mm.StaffSVGVisualizer(seq, staffLeft, configLeft);

  const tempo = seq.tempos[0].qpm;
  player1.setTempo(tempo);
  tempoValue1.textContent = tempoInput1.value = '' + tempo;

  // Enable the UI
  playBtn1.disabled = false;
  playBtn1.textContent = 'Play';
}

// Section 2 ******

let visualizer2: mm.StaffSVGVisualizer;
const sequence2 = mm.sequences.clone(DOUBLE_SCALE);

const player2 = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    visualizer2.redraw(note, true);
  },
  stop: () => {}
});

// UI elements
const compactMode2 = document.getElementById('compactMode2') as HTMLInputElement;
const playBtn2 = document.getElementById('playBtn2') as HTMLButtonElement;
const growBtn = document.getElementById('growBtn') as HTMLButtonElement;
const tempoInput2 = document.getElementById('tempoInput2') as HTMLInputElement;
const tempoValue2 = document.getElementById('tempoValue2') as HTMLDivElement;
const signatures = document.getElementById('multiple-signatures') as HTMLDivElement;

let configSignatures: mm.StaffSVGVisualizerConfig = {
  noteHeight: 15,
  pixelsPerTimeStep: 0,
  scrollType: mm.ScrollType.NOTE
};

// Set up some event listeners
compactMode2.checked = true;
compactMode2.addEventListener(
  'change', () => {
    configSignatures.pixelsPerTimeStep = compactMode2.checked ? 0 : UNIFORM_TIME_SIZE;
    initPlayerAndVisualizer2(sequence2);
  }
);

playBtn2.addEventListener(
  'click', () => startOrStop(player2, visualizer2.noteSequence, playBtn2)
);

growBtn.addEventListener('click', 
  () => { // Rotate among 12 keys and [2/4, 3/4, 4/4] times
    ++DOUBLE_SCALE.keySignatures[0].key; 
    if(DOUBLE_SCALE.keySignatures[0].key == 12) {
      DOUBLE_SCALE.keySignatures[0].key = 0;
    };
    ++DOUBLE_SCALE.timeSignatures[0].numerator; 
    if(DOUBLE_SCALE.timeSignatures[0].numerator == 5) {
      DOUBLE_SCALE.timeSignatures[0].numerator = 2;
    };
    appendQuantized(sequence2, DOUBLE_SCALE, 16);
    visualizer2.redraw();
  }
);

tempoInput2.addEventListener(
  'input', () => changeTempo(player2, tempoInput2.value, tempoValue2)
);

function initPlayerAndVisualizer2(seq: mm.INoteSequence) {
  // Disable the UI
  playBtn2.disabled = false;
  playBtn2.textContent = 'Loading';

  visualizer2 = new mm.StaffSVGVisualizer(seq, signatures, configSignatures);

  const tempo = seq.tempos[0].qpm;
  player2.setTempo(tempo);
  tempoValue2.textContent = tempoInput2.value = '' + tempo;

  // Enable the UI
  playBtn2.disabled = false;
  playBtn2.textContent = 'Play';
}

// Section 3 ******

let visualizers: mm.BaseVisualizer[] = [];
let configList: mm.StaffSVGVisualizerConfig[] = [];
let sequence3: mm.INoteSequence;

const player3 = new mm.Player(false, {
  run: (note: mm.NoteSequence.Note) => {
    visualizers.forEach(
      visualizer => visualizer.redraw(note, true)
    );
  },
  stop: () => {}
});

// UI elements
const compactMode3 = document.getElementById('compactMode3') as HTMLInputElement;
const fileInput = document.getElementById('file-input') as HTMLInputElement;
const playBtn3 = document.getElementById('playBtn3') as HTMLButtonElement;
const tempoInput3 = document.getElementById('tempoInput3') as HTMLInputElement;
const tempoValue3 = document.getElementById('tempoValue3') as HTMLDivElement;
const container3 = document.getElementById('container3') as HTMLDivElement;

// Set up some event listeners
fileInput.addEventListener('change', loadFile);

playBtn3.addEventListener(
  'click', () => startOrStop(player3, sequence3, playBtn3)
);  

compactMode3.checked = true;
compactMode3.addEventListener(
  'change', () => {
    configList.forEach(
      config => config.pixelsPerTimeStep = compactMode3.checked ? 0 : UNIFORM_TIME_SIZE
    )  
    if (sequence3) {
      initPlayerAndVisualizer3(sequence3);
    }
  }
);

tempoInput3.addEventListener(
  'input', () => changeTempo(player3, tempoInput3.value, tempoValue3)
);

// tslint:disable-next-line:no-any
function loadFile(e: any) {
  mm.blobToNoteSequence(e.target.files[0]).then(
    (seq) => {
      sequence3 = seq;
      // Collect which instruments / tracks are used
      let instruments: number[] = [];
      seq.notes.forEach(
        (note) => {
          if (!instruments.includes(note.instrument)) {
            instruments.push(note.instrument);
          }
        }
      );
      instruments.forEach(
        instrument => {
          let configMidi: mm.StaffSVGVisualizerConfig = {
            noteHeight: 8,
            pixelsPerTimeStep: 0,
            instruments: [instrument],
            scrollType: mm.ScrollType.PAGE
          };
          configList.push(configMidi);
        }
      );
      initPlayerAndVisualizer3(seq);
    }
  );
}

function initPlayerAndVisualizer3(seq: mm.INoteSequence) {
  // Disable the UI
  playBtn3.disabled = false;
  playBtn3.textContent = 'Loading';

  // Clear previous visualizers if any
  visualizers = [];
  while (container3.lastChild) {
    container3.removeChild(container3.lastChild);
  }
  // Create as many visualizers as instruments
  configList.forEach(
    config => {
      const visualizerDiv = document.createElement('div');
      container3.appendChild(visualizerDiv);
      visualizers.push(new mm.StaffSVGVisualizer(seq, visualizerDiv, config));
    }
  );
  const parent = document.createElement('div');
  parent.style.overflow = 'auto';
  container3.appendChild(parent);
  const visualizerSVG = 
    document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  parent.appendChild(visualizerSVG);
  const config: mm.VisualizerConfig = {
    noteHeight: 8,
    pixelsPerTimeStep: UNIFORM_TIME_SIZE,
  };
  visualizers.push(new mm.PianoRollSVGVisualizer(seq, visualizerSVG, config));

  const tempo = seq.tempos[0].qpm;
  player3.setTempo(tempo);
  tempoValue3.textContent = tempoInput3.value = '' + tempo;

  // Enable the UI
  playBtn3.disabled = false;
  playBtn3.textContent = 'Play';
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
const compactMode4 = document.getElementById('compactMode4') as HTMLInputElement;
const playBtn4 = document.getElementById('playBtn4') as HTMLButtonElement;
const tempoInput4 = document.getElementById('tempoInput4') as HTMLInputElement;
const tempoValue4 = document.getElementById('tempoValue4') as HTMLDivElement;
const catalog = document.getElementById('catalog') as HTMLDivElement;

let configCatalog: mm.StaffSVGVisualizerConfig = {
  noteHeight: 15,
  pixelsPerTimeStep: 0,
  scrollType: mm.ScrollType.NOTE
};

// Set up some event listeners
playBtn4.addEventListener(
  'click', () => startOrStop(player4, visualizer4.noteSequence, playBtn4)
);

compactMode4.checked = true;
compactMode4.addEventListener(
  'change', () => {
    configCatalog.pixelsPerTimeStep = compactMode4.checked ? 0 : UNIFORM_TIME_SIZE;
    initPlayerAndVisualizer4(sequence4);
  }
);

tempoInput4.addEventListener(
  'input', () => changeTempo(player4, tempoInput4.value, tempoValue4)
);

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

// Common section ******

function startOrStop(
  player: mm.BasePlayer, 
  noteSequence: mm.INoteSequence,
  playBtn: HTMLButtonElement
) {
  if (player.isPlaying()) {
    player.stop();
    playBtn.textContent = 'Play';
  } else {
    player.start(noteSequence);
    playBtn.textContent = 'Stop';
  }
}

function changeTempo(player: mm.BasePlayer, value: string, label: HTMLDivElement){
  player.setTempo(parseInt(value, 10));
  label.textContent = value;
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

initPlayerAndVisualizer1(sequence1);
initPlayerAndVisualizer2(sequence2);
initPlayerAndVisualizer4(sequence4);