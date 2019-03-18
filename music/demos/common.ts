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

import {saveAs} from 'file-saver';
import * as mm from '../src';
import {sequences} from '../src';

export const CHECKPOINTS_DIR =
    'https://storage.googleapis.com/magentadata/js/checkpoints';

// Samples from Shan's SGM SoundFont:
// http://www.polyphone-soundfonts.com/en/files/27-instrument-sets/256-sgm-v2-01
export const SOUNDFONT_URL =
    'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus';

export const DRUM_SEQS: mm.INoteSequence[] = [
  {
    notes: [
      {pitch: 36, quantizedStartStep: 0}, {pitch: 42, quantizedStartStep: 2},
      {pitch: 36, quantizedStartStep: 4}, {pitch: 42, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8}, {pitch: 42, quantizedStartStep: 10},
      {pitch: 36, quantizedStartStep: 12}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 36, quantizedStartStep: 16}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 36, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 30}
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    totalQuantizedSteps: 32,
  },
  {
    notes: [
      {pitch: 36, quantizedStartStep: 0},  {pitch: 38, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 0},  {pitch: 46, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 2},  {pitch: 42, quantizedStartStep: 3},
      {pitch: 42, quantizedStartStep: 4},  {pitch: 50, quantizedStartStep: 4},
      {pitch: 36, quantizedStartStep: 6},  {pitch: 38, quantizedStartStep: 6},
      {pitch: 42, quantizedStartStep: 6},  {pitch: 45, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 8},
      {pitch: 46, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 10},
      {pitch: 48, quantizedStartStep: 10}, {pitch: 50, quantizedStartStep: 10},
      {pitch: 36, quantizedStartStep: 12}, {pitch: 38, quantizedStartStep: 12},
      {pitch: 42, quantizedStartStep: 12}, {pitch: 48, quantizedStartStep: 12},
      {pitch: 50, quantizedStartStep: 13}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 45, quantizedStartStep: 14}, {pitch: 48, quantizedStartStep: 14},
      {pitch: 36, quantizedStartStep: 16}, {pitch: 38, quantizedStartStep: 16},
      {pitch: 42, quantizedStartStep: 16}, {pitch: 46, quantizedStartStep: 16},
      {pitch: 49, quantizedStartStep: 16}, {pitch: 42, quantizedStartStep: 18},
      {pitch: 42, quantizedStartStep: 19}, {pitch: 42, quantizedStartStep: 20},
      {pitch: 50, quantizedStartStep: 20}, {pitch: 36, quantizedStartStep: 22},
      {pitch: 38, quantizedStartStep: 22}, {pitch: 42, quantizedStartStep: 22},
      {pitch: 45, quantizedStartStep: 22}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 24}, {pitch: 46, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 26}, {pitch: 48, quantizedStartStep: 26},
      {pitch: 50, quantizedStartStep: 26}, {pitch: 36, quantizedStartStep: 28},
      {pitch: 38, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 28},
      {pitch: 42, quantizedStartStep: 30}, {pitch: 48, quantizedStartStep: 30}
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    totalQuantizedSteps: 32,
  },
  {
    notes: [
      {pitch: 38, quantizedStartStep: 0},  {pitch: 42, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 2},  {pitch: 42, quantizedStartStep: 4},
      {pitch: 36, quantizedStartStep: 6},  {pitch: 38, quantizedStartStep: 6},
      {pitch: 42, quantizedStartStep: 6},  {pitch: 45, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 8},
      {pitch: 42, quantizedStartStep: 10}, {pitch: 38, quantizedStartStep: 12},
      {pitch: 42, quantizedStartStep: 12}, {pitch: 45, quantizedStartStep: 12},
      {pitch: 36, quantizedStartStep: 14}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 46, quantizedStartStep: 14}, {pitch: 36, quantizedStartStep: 16},
      {pitch: 42, quantizedStartStep: 16}, {pitch: 42, quantizedStartStep: 18},
      {pitch: 38, quantizedStartStep: 20}, {pitch: 42, quantizedStartStep: 20},
      {pitch: 45, quantizedStartStep: 20}, {pitch: 36, quantizedStartStep: 22},
      {pitch: 42, quantizedStartStep: 22}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 24}, {pitch: 38, quantizedStartStep: 26},
      {pitch: 42, quantizedStartStep: 26}, {pitch: 45, quantizedStartStep: 26},
      {pitch: 42, quantizedStartStep: 28}, {pitch: 45, quantizedStartStep: 28},
      {pitch: 36, quantizedStartStep: 30}, {pitch: 42, quantizedStartStep: 30},
      {pitch: 45, quantizedStartStep: 30}
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    totalQuantizedSteps: 32,
  },
  {
    notes: [
      {pitch: 50, quantizedStartStep: 4}, {pitch: 50, quantizedStartStep: 20}
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    totalQuantizedSteps: 32,
  }
];
DRUM_SEQS.map(s => s.notes.map(n => {
  n.isDrum = true;
  n.quantizedEndStep = n.quantizedStartStep + 1;
}));

export const MEL_A_QUARTERS: mm.INoteSequence = {
  notes: [
    {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 4, program: 0},
    {pitch: 69, quantizedStartStep: 4, quantizedEndStep: 8, program: 0},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 12, program: 0},
    {pitch: 69, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 69, quantizedStartStep: 16, quantizedEndStep: 20, program: 0},
    {pitch: 69, quantizedStartStep: 20, quantizedEndStep: 24, program: 0},
    {pitch: 69, quantizedStartStep: 24, quantizedEndStep: 28, program: 0},
    {pitch: 69, quantizedStartStep: 28, quantizedEndStep: 32, program: 0},
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

export const MEL_TEAPOT: mm.INoteSequence = {
  notes: [
    {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
    {pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
    {pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
    {pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
    {pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
    {pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 78, quantizedStartStep: 16, quantizedEndStep: 20, program: 0},
    {pitch: 81, quantizedStartStep: 20, quantizedEndStep: 24, program: 0},
    {pitch: 76, quantizedStartStep: 24, quantizedEndStep: 32, program: 0}
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

export const MEL_TWINKLE: mm.INoteSequence = {
  notes: [
    {
      pitch: 60,
      quantizedStartStep: 0,
      quantizedEndStep: 2,
      program: 0,
      instrument: 0
    },
    {
      pitch: 60,
      quantizedStartStep: 2,
      quantizedEndStep: 4,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 4,
      quantizedEndStep: 6,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 6,
      quantizedEndStep: 8,
      program: 0,
      instrument: 0
    },
    {
      pitch: 69,
      quantizedStartStep: 8,
      quantizedEndStep: 10,
      program: 0,
      instrument: 0
    },
    {
      pitch: 69,
      quantizedStartStep: 10,
      quantizedEndStep: 12,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 12,
      quantizedEndStep: 16,
      program: 0,
      instrument: 0
    },
    {
      pitch: 65,
      quantizedStartStep: 16,
      quantizedEndStep: 18,
      program: 0,
      instrument: 0
    },
    {
      pitch: 65,
      quantizedStartStep: 18,
      quantizedEndStep: 20,
      program: 0,
      instrument: 0
    },
    {
      pitch: 64,
      quantizedStartStep: 20,
      quantizedEndStep: 22,
      program: 0,
      instrument: 0
    },
    {
      pitch: 64,
      quantizedStartStep: 22,
      quantizedEndStep: 24,
      program: 0,
      instrument: 0
    },
    {
      pitch: 62,
      quantizedStartStep: 24,
      quantizedEndStep: 26,
      program: 0,
      instrument: 0
    },
    {
      pitch: 62,
      quantizedStartStep: 26,
      quantizedEndStep: 28,
      program: 0,
      instrument: 0
    },
    {
      pitch: 60,
      quantizedStartStep: 28,
      quantizedEndStep: 32,
      program: 0,
      instrument: 0
    }
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

export const MEL_TWINKLE_WITH_VELOCITIES: mm.INoteSequence = {
  notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2, velocity: 10},
    {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4, velocity: 10},
    {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6, velocity: 30},
    {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8, velocity: 30},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10, velocity: 50},
    {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12, velocity: 50},
    {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16, velocity: 80},
    {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18, velocity: 50},
    {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20, velocity: 50},
    {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22, velocity: 30},
    {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24, velocity: 30},
    {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26, velocity: 10},
    {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28, velocity: 10},
    {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32, velocity: 50}
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

export const DRUM_SEQ_WITH_VELOCITIES: mm.INoteSequence = {
  notes: [
    {pitch: 36, quantizedStartStep: 0, velocity: 10},
    {pitch: 36, quantizedStartStep: 4, velocity: 80},
    {pitch: 38, quantizedStartStep: 8, velocity: 10},
    {pitch: 38, quantizedStartStep: 12, velocity: 80},
    {pitch: 42, quantizedStartStep: 16, velocity: 10},
    {pitch: 42, quantizedStartStep: 20, velocity: 80},
    {pitch: 45, quantizedStartStep: 24, velocity: 10},
    {pitch: 45, quantizedStartStep: 28, velocity: 80},
    {pitch: 46, quantizedStartStep: 32, velocity: 10},
    // This drum is really unhappy if played too quickly twice in a row.
    {pitch: 46, quantizedStartStep: 38, velocity: 80},
    {pitch: 48, quantizedStartStep: 40, velocity: 10},
    {pitch: 48, quantizedStartStep: 44, velocity: 80},
    {pitch: 49, quantizedStartStep: 48, velocity: 10},
    {pitch: 49, quantizedStartStep: 52, velocity: 80},
    {pitch: 50, quantizedStartStep: 56, velocity: 10},
    {pitch: 50, quantizedStartStep: 60, velocity: 80},
    {pitch: 51, quantizedStartStep: 64, velocity: 10},
    {pitch: 51, quantizedStartStep: 68, velocity: 80},
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 72
};
DRUM_SEQ_WITH_VELOCITIES.notes.map(n => {
  n.isDrum = true;
  n.quantizedEndStep = n.quantizedStartStep + 1;
});

export const FULL_TWINKLE: mm.INoteSequence = {
  notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
    {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
    {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
    {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
    {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12, program: 0},
    {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18, program: 0},
    {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20, program: 0},
    {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22, program: 0},
    {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24, program: 0},
    {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26, program: 0},
    {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28, program: 0},
    {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32, program: 0},
    {pitch: 67, quantizedStartStep: 32, quantizedEndStep: 34, program: 0},
    {pitch: 67, quantizedStartStep: 34, quantizedEndStep: 36, program: 0},
    {pitch: 65, quantizedStartStep: 36, quantizedEndStep: 38, program: 0},
    {pitch: 65, quantizedStartStep: 38, quantizedEndStep: 40, program: 0},
    {pitch: 64, quantizedStartStep: 40, quantizedEndStep: 42, program: 0},
    {pitch: 64, quantizedStartStep: 42, quantizedEndStep: 44, program: 0},
    {pitch: 62, quantizedStartStep: 44, quantizedEndStep: 48, program: 0},
    {pitch: 67, quantizedStartStep: 48, quantizedEndStep: 50, program: 0},
    {pitch: 67, quantizedStartStep: 50, quantizedEndStep: 52, program: 0},
    {pitch: 65, quantizedStartStep: 52, quantizedEndStep: 54, program: 0},
    {pitch: 65, quantizedStartStep: 54, quantizedEndStep: 56, program: 0},
    {pitch: 64, quantizedStartStep: 56, quantizedEndStep: 58, program: 0},
    {pitch: 64, quantizedStartStep: 58, quantizedEndStep: 60, program: 0},
    {pitch: 62, quantizedStartStep: 60, quantizedEndStep: 64, program: 0},
    {pitch: 60, quantizedStartStep: 64, quantizedEndStep: 66, program: 0},
    {pitch: 60, quantizedStartStep: 66, quantizedEndStep: 68, program: 0},
    {pitch: 67, quantizedStartStep: 68, quantizedEndStep: 70, program: 0},
    {pitch: 67, quantizedStartStep: 70, quantizedEndStep: 72, program: 0},
    {pitch: 69, quantizedStartStep: 72, quantizedEndStep: 74, program: 0},
    {pitch: 69, quantizedStartStep: 74, quantizedEndStep: 76, program: 0},
    {pitch: 67, quantizedStartStep: 76, quantizedEndStep: 80, program: 0},
    {pitch: 65, quantizedStartStep: 80, quantizedEndStep: 82, program: 0},
    {pitch: 65, quantizedStartStep: 82, quantizedEndStep: 84, program: 0},
    {pitch: 64, quantizedStartStep: 84, quantizedEndStep: 86, program: 0},
    {pitch: 64, quantizedStartStep: 86, quantizedEndStep: 88, program: 0},
    {pitch: 62, quantizedStartStep: 88, quantizedEndStep: 90, program: 0},
    {pitch: 62, quantizedStartStep: 90, quantizedEndStep: 92, program: 0},
    {pitch: 60, quantizedStartStep: 92, quantizedEndStep: 96, program: 0}
  ],
  tempos: [{time: 0, qpm: 60}],
  totalQuantizedSteps: 96,
  quantizationInfo: {stepsPerQuarter: 4}
};

export const FULL_TWINKLE_UNQUANTIZED: mm.INoteSequence = {
  notes: [
    {pitch: 60, startTime: 0.0, endTime: 0.5, program: 0},
    {pitch: 60, startTime: 0.5, endTime: 1.0, program: 0},
    {pitch: 67, startTime: 1.0, endTime: 1.5, program: 0},
    {pitch: 67, startTime: 1.5, endTime: 2.0, program: 0},
    {pitch: 69, startTime: 2.0, endTime: 2.5, program: 0},
    {pitch: 69, startTime: 2.5, endTime: 3.0, program: 0},
    {pitch: 67, startTime: 3.0, endTime: 4.0, program: 0},
    {pitch: 65, startTime: 4.0, endTime: 4.5, program: 0},
    {pitch: 65, startTime: 4.5, endTime: 5.0, program: 0},
    {pitch: 64, startTime: 5.0, endTime: 5.5, program: 0},
    {pitch: 64, startTime: 5.5, endTime: 6.0, program: 0},
    {pitch: 62, startTime: 6.0, endTime: 6.5, program: 0},
    {pitch: 62, startTime: 6.5, endTime: 7.0, program: 0},
    {pitch: 60, startTime: 7.0, endTime: 8.0, program: 0},
    {pitch: 67, startTime: 8.0, endTime: 8.5, program: 0},
    {pitch: 67, startTime: 8.5, endTime: 9.0, program: 0},
    {pitch: 65, startTime: 9.0, endTime: 9.5, program: 0},
    {pitch: 65, startTime: 9.5, endTime: 10.0, program: 0},
    {pitch: 64, startTime: 10.0, endTime: 10.5, program: 0},
    {pitch: 64, startTime: 10.5, endTime: 11.0, program: 0},
    {pitch: 62, startTime: 11.0, endTime: 12.0, program: 0},
    {pitch: 67, startTime: 12.0, endTime: 12.5, program: 0},
    {pitch: 67, startTime: 12.5, endTime: 13.0, program: 0},
    {pitch: 65, startTime: 13.0, endTime: 13.5, program: 0},
    {pitch: 65, startTime: 13.5, endTime: 14.0, program: 0},
    {pitch: 64, startTime: 14.0, endTime: 14.5, program: 0},
    {pitch: 64, startTime: 14.5, endTime: 15.0, program: 0},
    {pitch: 62, startTime: 15.0, endTime: 16.0, program: 0},
    {pitch: 60, startTime: 16.0, endTime: 16.5, program: 0},
    {pitch: 60, startTime: 16.5, endTime: 17.0, program: 0},
    {pitch: 67, startTime: 17.0, endTime: 17.5, program: 0},
    {pitch: 67, startTime: 17.5, endTime: 18.0, program: 0},
    {pitch: 69, startTime: 18.0, endTime: 18.5, program: 0},
    {pitch: 69, startTime: 18.5, endTime: 19.0, program: 0},
    {pitch: 67, startTime: 19.0, endTime: 20.0, program: 0},
    {pitch: 65, startTime: 20.0, endTime: 20.5, program: 0},
    {pitch: 65, startTime: 20.5, endTime: 21.0, program: 0},
    {pitch: 64, startTime: 21.0, endTime: 21.5, program: 0},
    {pitch: 64, startTime: 21.5, endTime: 22.0, program: 0},
    {pitch: 62, startTime: 22.0, endTime: 22.5, program: 0},
    {pitch: 62, startTime: 22.5, endTime: 23.0, program: 0},
    {pitch: 60, startTime: 23.0, endTime: 24.0, program: 0}
  ],
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 60}],
  totalTime: 24
};

export function writeTimer(elementId: string, startTime: number) {
  document.getElementById(elementId).innerHTML =
      ((performance.now() - startTime) / 1000).toString() + 's';
}

export function writeNoteSeqs(
    elementId: string, seqs: mm.INoteSequence[], useSoundFontPlayer = false,
    writeVelocity = false) {
  const element = document.getElementById(elementId);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  seqs.forEach(seq => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'View NoteSequence';
    details.appendChild(summary);

    const seqText = document.createElement('span');
    const isQuantized = mm.sequences.isQuantizedSequence(seq);
    seqText.innerHTML = '[' +
        seq.notes
            .map(n => {
              let s = '{p:' + n.pitch + ' s:' +
                  (isQuantized ? n.quantizedStartStep :
                                 n.startTime.toPrecision(2));
              const end =
                  isQuantized ? n.quantizedEndStep : n.endTime.toPrecision(3);
              if (end != null) {
                s += ' e:' + end;
              }
              if (writeVelocity) {
                s += ' v:' + n.velocity;
              }
              s += '}';
              return s;
            })
            .join(', ') +
        ']';
    details.appendChild(seqText);
    details.appendChild(createPlayer(seq, useSoundFontPlayer));
    element.appendChild(details);
  });
}

export function visualizeNoteSeqs(
    elementId: string, seqs: mm.INoteSequence[], useSoundFontPlayer = false) {
  const element = document.getElementById(elementId);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  seqs.forEach(seq => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'View NoteSequence';
    details.appendChild(summary);
    details.appendChild(createPlayer(seq, useSoundFontPlayer));
    element.appendChild(details);
  });
}

export function writeMemory(bytes: number, name = 'leaked-memory') {
  document.getElementById(name).innerHTML = bytes.toString() + ' bytes';
}

function createPlayerButton(
    seq: mm.INoteSequence, withClick: boolean, useSoundFontPlayer: boolean,
    el: SVGSVGElement) {
  const visualizer = new mm.PianoRollSVGVisualizer(seq, el as SVGSVGElement);
  const container = el.parentElement as HTMLDivElement;

  const callbackObject = {
    run: (note: mm.NoteSequence.Note) => {
      const currentNotePosition = visualizer.redraw(note);

      // See if we need to scroll the container.
      const containerWidth = container.getBoundingClientRect().width;
      if (currentNotePosition > (container.scrollLeft + containerWidth)) {
        container.scrollLeft = currentNotePosition - 20;
      }
    },
    stop: () => {}
  };

  const button = document.createElement('button');
  const playText = withClick ? 'Play With Click' : 'Play';
  button.textContent = playText;

  // tslint:disable-next-line:no-any
  let player: any;
  if (useSoundFontPlayer) {
    player = new mm.SoundFontPlayer(
        SOUNDFONT_URL, undefined, undefined, undefined, callbackObject);
    player.loadSamples(seq).then(() => button.disabled = false);
  } else {
    player = new mm.Player(withClick, callbackObject);
  }

  button.addEventListener('click', () => {
    if (player.isPlaying()) {
      player.stop();
      button.textContent = playText;
    } else {
      player.start(visualizer.noteSequence)
          .then(() => (button.textContent = playText));
      button.textContent = 'Stop';
    }
  });
  return button;
}

function createDownloadButton(seq: mm.INoteSequence) {
  const button = document.createElement('button');
  button.textContent = 'Save MIDI';
  button.addEventListener('click', () => {
    saveAs(new File([mm.sequenceProtoToMidi(seq)], 'saved.mid'));
  });
  return button;
}

function createPlayer(seq: mm.INoteSequence, useSoundFontPlayer = false) {
  // Visualizer
  const div = document.createElement('div');
  div.classList.add('player-container');
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('visualizer-container');
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  containerDiv.appendChild(el);

  const buttonsDiv = document.createElement('div');
  // Regular player.
  buttonsDiv.appendChild(
      createPlayerButton(seq, false, useSoundFontPlayer, el));

  // Player with click. Only works for quantized sequences.
  if (!useSoundFontPlayer && sequences.isQuantizedSequence(seq)) {
    buttonsDiv.appendChild(createPlayerButton(seq, true, false, el));
  }

  // Download midi.
  buttonsDiv.appendChild(createDownloadButton(seq));
  div.appendChild(buttonsDiv);
  div.appendChild(containerDiv);
  return div;
}

function compareNotes(a: mm.NoteSequence.INote, b: mm.NoteSequence.INote) {
  if (a.startTime < b.startTime) {
    return -1;
  }
  if (a.endTime < b.endTime) {
    return -1;
  }
  return a.pitch - b.pitch;
}

export function notesMatch(
    aNotes: mm.NoteSequence.INote[], bNotes: mm.NoteSequence.INote[]) {
  if (aNotes.length !== bNotes.length) {
    return false;
  }
  // This sorts the arrays in place, which messes up the Visualizer that's
  // already connected to this sequence. Make a copy first.
  const a = JSON.parse(JSON.stringify(aNotes));
  const b = JSON.parse(JSON.stringify(bNotes));

  a.sort(compareNotes);
  b.sort(compareNotes);
  for (let i = 0; i < a.length; ++i) {
    if (a[i].startTime !== b[i].startTime || a[i].endTime !== b[i].endTime ||
        a[i].velocity !== b[i].velocity || a[i].pitch !== b[i].pitch) {
      return false;
    }
  }
  return true;
}
