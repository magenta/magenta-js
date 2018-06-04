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

export const CHECKPOINTS_DIR =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/magentadata/js/checkpoints';

// Samples from Shan's SGM SoundFont:
// http://www.polyphone-soundfonts.com/en/files/27-instrument-sets/256-sgm-v2-01
const SOUNDFONT_URL =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_v85';

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
    quantizationInfo: {stepsPerQuarter: 4}
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
    quantizationInfo: {stepsPerQuarter: 4}
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
    quantizationInfo: {stepsPerQuarter: 4}
  },
  {
    notes: [
      {pitch: 50, quantizedStartStep: 4}, {pitch: 50, quantizedStartStep: 20}
    ],
    quantizationInfo: {stepsPerQuarter: 4}
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
  quantizationInfo: {stepsPerQuarter: 4}
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
  quantizationInfo: {stepsPerQuarter: 4}
};

export const MEL_TWINKLE: mm.INoteSequence = {
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
    {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32, program: 0}
  ],
  quantizationInfo: {stepsPerQuarter: 4}
};

export function writeTimer(elementId: string, startTime: number) {
  document.getElementById(elementId).innerHTML =
      ((performance.now() - startTime) / 1000).toString() + 's';
}

export function writeNoteSeqs(
    elementId: string, seqs: mm.INoteSequence[], useSoundFontPlayer = false) {
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
    seqWrap.appendChild(
        useSoundFontPlayer ? createSoundFontPlayer(seq) : createPlayer(seq));
    element.appendChild(seqWrap);
  });
}

function createPlayerButton(seq: mm.INoteSequence, player: mm.Player,
                            withClick: boolean) {
  const button = document.createElement('button');
  let playText = withClick ? 'Play With Click' : 'Play';
  button.textContent = playText;
  button.addEventListener('click', () => {
    if (player.isPlaying()) {
      player.stop();
      button.textContent = playText;
    } else {
      player.start(seq, withClick).then(() => (button.textContent = playText));
      button.textContent = 'Stop';
    }
  });
  return button;
}

function createPlayer(seq: mm.INoteSequence) {
  const player = new mm.Player();
  const buttonsDiv = document.createElement('div');
  buttonsDiv.appendChild(createPlayerButton(seq, player, false));
  buttonsDiv.appendChild(createPlayerButton(seq, player, true));
  return buttonsDiv;
}

function createSoundFontPlayer(seq: mm.INoteSequence) {
  const player = new mm.SoundFontPlayer(SOUNDFONT_URL);
  const button = document.createElement('button');
  button.textContent = 'Play';
  button.disabled = true;
  player.loadSamples(seq).then(() => button.disabled = false);
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
