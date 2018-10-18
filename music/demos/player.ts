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

// tslint:disable-next-line:max-line-length
import {DRUM_SEQ_WITH_VELOCITIES, DRUM_SEQS, FULL_TWINKLE, FULL_TWINKLE_UNQUANTIZED, MEL_TWINKLE_WITH_VELOCITIES, writeNoteSeqs} from './common';

function generatePlayers() {
  writeNoteSeqs('unq-player', [FULL_TWINKLE_UNQUANTIZED], false);
  writeNoteSeqs('unq-soundfont', [FULL_TWINKLE_UNQUANTIZED], true);
  writeNoteSeqs('q-player', [FULL_TWINKLE], false);
  writeNoteSeqs('q-soundfont', [FULL_TWINKLE], true);
  writeNoteSeqs('d-player', [DRUM_SEQS[1]], false);
  writeNoteSeqs('d-soundfont', [DRUM_SEQS[1]], true);
}

function generateTempoPlayer() {
  const visualizer = new mm.Visualizer(
      FULL_TWINKLE_UNQUANTIZED,
      document.getElementById('canvas') as HTMLCanvasElement);
  const player = new mm.Player(false, {
    run: (note: mm.NoteSequence.Note) => {
      visualizer.redraw(note);
    },
    stop: () => {}
  });

  const tempoSlider = document.getElementById('tempo') as HTMLInputElement;
  tempoSlider.addEventListener('change', () => {
    document.getElementById('tempoValue').textContent = tempoSlider.value;
    player.setTempo(parseFloat(tempoSlider.value));
  });

  const playBtn = document.getElementById('playBtn') as HTMLButtonElement;
  playBtn.addEventListener('click', () => {
    if (player.isPlaying()) {
      player.stop();
      playBtn.textContent = 'Play';
    } else {
      player.resumeContext();
      player.start(visualizer.noteSequence);
      playBtn.textContent = 'Stop';
    }
  });
}

function generateVelocityPlayers() {
  writeNoteSeqs('v-player', [MEL_TWINKLE_WITH_VELOCITIES], false);
  writeNoteSeqs('d-v-player', [DRUM_SEQ_WITH_VELOCITIES], false);
  writeNoteSeqs('s-v-player', [MEL_TWINKLE_WITH_VELOCITIES], true);
}

try {
  Promise.all(
      [generatePlayers(), generateTempoPlayer(), generateVelocityPlayers()]);
} catch (err) {
  console.error(err);
}
