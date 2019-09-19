/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
import {DRUM_SEQS, FULL_TWINKLE} from './common';

const players: mm.SoundFontPlayer[] = [
  new mm.SoundFontPlayer(
      'https://storage.googleapis.com/magentadata/js/soundfonts/salamander'),
  new mm.SoundFontPlayer(
      'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'),
  new mm.SoundFontPlayer(
      'https://storage.googleapis.com/magentadata/js/soundfonts/jazz_kit')
];
const samples: mm.INoteSequence[] = [FULL_TWINKLE, FULL_TWINKLE, DRUM_SEQS[1]];

populateInstruments();
initializeListeners();

async function populateInstruments() {
  const select = document.getElementById('select') as HTMLSelectElement;
  const response =
      await (
          await fetch(
              'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus/soundfont.json'))
          .json();
  const instruments = Object.values(response.instruments);
  select.innerHTML = instruments.map(i => `<option>${i}</option>`).join('');
}

function initializeListeners() {
  document.getElementById('btnSalamander')
      .addEventListener('click', (event) => togglePlayer(event, 0));
  document.getElementById('btnSgmPlus')
      .addEventListener('click', (event) => togglePlayer(event, 1));
  document.getElementById('btnJazzKit')
      .addEventListener('click', (event) => togglePlayer(event, 2));
}

function togglePlayer(event: MouseEvent, index: number) {
  const button = event.target as HTMLButtonElement;
  const player = players[index];

  // If this is the sgm player, use the right instrument.
  if (index === 1) {
    const instrument =
        (document.getElementById('select') as HTMLSelectElement).selectedIndex;
    samples[1].notes.forEach(n => n.program = instrument);
  }
  if (player.isPlaying()) {
    button.textContent = 'play';
    player.stop();
  } else {
    // Stop all players.
    players[0].stop();
    players[1].stop();
    players[2].stop();
    button.textContent = 'stop';
    player.start(samples[index]);
  }
}
