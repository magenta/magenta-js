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
import {FULL_TWINKLE, FULL_TWINKLE_UNQUANTIZED} from './common';

function generateMelodies() {
  // Set up listener for changing tempo.
  var rng = (<HTMLInputElement>document.getElementById('tempo'));

  let visualizer: mm.Visualizer;
  const player = new mm.Player(true, {
    run: (note: mm.NoteSequence.Note) => visualizer.redraw(note),
    stop: () => {}
  });

  var listener = function() {
    player.setTempo(+rng.value);
  };
  rng.addEventListener('input', listener);
  const buttonDiv = document.getElementById('button-div');
  const canvasDiv = document.getElementById('canvas') as HTMLCanvasElement;

  let melodies = [FULL_TWINKLE, FULL_TWINKLE_UNQUANTIZED];
  let strings = ['Quantized', 'Unquantized'];
  for (let i = 0; i < melodies.length; ++i) {
    let playString = 'Play ' + strings[i] + ' Twinkle';
    const playButton = document.createElement('button');
    playButton.textContent = playString;
    playButton.addEventListener('click', () => {
      if (player.isPlaying()) {
        player.stop();
        playButton.textContent = playString;
      } else {
        visualizer = new mm.Visualizer(melodies[i], canvasDiv);
        player.setTempo(+rng.value);
        player.start(melodies[i])
            .then(() => (playButton.textContent = playString));
        playButton.textContent = 'Stop';
      }
    });
    buttonDiv.appendChild(playButton);
  }
}

try {
  Promise.all([generateMelodies()]);
} catch (err) {
  console.error(err);
}
