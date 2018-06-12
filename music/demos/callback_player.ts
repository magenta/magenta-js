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
import {DRUM_SEQS, MEL_TEAPOT, MEL_TWINKLE} from './common';

class MetronomeCallback extends mm.BasePlayerCallback {
  private clickDivs: any;
  private drumDivs: any;
  private keyDivs: any;
  private beatPos: number;
  private currentDrum: number;
  private drumPitchToClass: Map<number, number>;

  constructor() {
    super();
    this.clickDivs = [
      document.getElementById('click1'),
      document.getElementById('click2'),
      document.getElementById('click3'),
      document.getElementById('click4')
    ];
    this.drumDivs = [
      document.getElementById('drum1'),
      document.getElementById('drum2'),
      document.getElementById('drum3'),
      document.getElementById('drum4'),
      document.getElementById('drum5'),
      document.getElementById('drum6'),
      document.getElementById('drum7'),
      document.getElementById('drum8'),
      document.getElementById('drum9')
    ];
    this.keyDivs = [
      [document.getElementById('top_c'),
       document.getElementById('bottom_c'),
       document.getElementById('right_bottom_c')],
      [document.getElementById('c_sharp')],
      [document.getElementById('top_d'),
       document.getElementById('left_bottom_d'),
       document.getElementById('bottom_d'),
       document.getElementById('right_bottom_d')],
      [document.getElementById('d_sharp')],
      [document.getElementById('top_e'),
       document.getElementById('left_bottom_e'),
       document.getElementById('bottom_e')],
      [document.getElementById('top_f'),
       document.getElementById('bottom_f'),
       document.getElementById('right_bottom_f')],
      [document.getElementById('f_sharp')],
      [document.getElementById('top_g'),
       document.getElementById('left_bottom_g'),
       document.getElementById('bottom_g'),
       document.getElementById('right_bottom_g')],
      [document.getElementById('g_sharp')],
      [document.getElementById('top_a'),
       document.getElementById('left_bottom_a'),
       document.getElementById('bottom_a'),
       document.getElementById('right_bottom_a')],
      [document.getElementById('a_sharp')],
      [document.getElementById('top_b'),
       document.getElementById('left_bottom_b'),
       document.getElementById('bottom_b')]
    ];
    this.drumPitchToClass = new Map<number, number>();
    for (let c = 0; c < mm.DEFAULT_DRUM_PITCH_CLASSES.length; ++c) {
      mm.DEFAULT_DRUM_PITCH_CLASSES[c].forEach((p) => {
        this.drumPitchToClass.set(p, c);
      });
    }
    this.beatPos = -1;
    this.currentDrum = -1;
    this.greyOut(this.clickDivs, -1);
    this.greyOut(this.drumDivs, -1);
  }

  greyOut(divs: any, ignorePos: number) {
    for (let i = 0; i < divs.length; ++i) {
      if (i == ignorePos) continue;
      divs[i].style.background = 'grey';
    }
  }

  colorDrums(n: mm.NoteSequence.INote) {
    if (n.pitch == mm.HI_CLICK_PITCH) {
      this.beatPos = 0;
      this.clickDivs[this.beatPos].style.background = 'red';
      setTimeout(() => {
        this.clickDivs[this.beatPos].style.background = 'grey';
      }, 300);
    } else if (n.pitch == mm.LO_CLICK_PITCH) {
      if (this.beatPos < this.clickDivs.length - 1) {
        ++this.beatPos;
      }
      this.clickDivs[this.beatPos].style.background = 'blue';
      setTimeout(() => {
        this.clickDivs[this.beatPos].style.background = 'grey';
      }, 300);
    } else {
      this.currentDrum = this.drumPitchToClass.get(n.pitch);
      this.drumDivs[this.currentDrum].style.background = 'green';
      setTimeout(() => {
        this.drumDivs[this.currentDrum].style.background = 'grey';
      }, 100);
    }
  }

  colorKeys(n: mm.NoteSequence.INote) {
    let relativePitch = (n.pitch - 60) % 12;
    for (let i = 0; i < this.keyDivs[relativePitch].length; ++i) {
      this.keyDivs[relativePitch][i].style.background = 'red';
      let color = 'white';
      if (relativePitch == 1 || relativePitch == 3 || relativePitch == 6 ||
          relativePitch == 8 || relativePitch == 10) {
        color = 'black';
      }
      setTimeout(() => {
        this.keyDivs[relativePitch][i].style.background = color;
      }, 100);
    }
  }

  run(n: mm.NoteSequence.INote) {
    if (n.isDrum) {
      this.colorDrums(n);
    } else {
      this.colorKeys(n);
    }
  }

  stop() {
    this.greyOut(this.clickDivs, -1);
    this.greyOut(this.drumDivs, -1);
  }
}


function generateDrums() {
  const callback = new MetronomeCallback();
  let playClicks = [true, false];
  let buttonSuffixes = [' with click', ' without click']
  for (let i = 0; i < playClicks.length; ++i) {
    const player = new mm.Player(playClicks[i], callback);
    // Add drums buttons.
    const drumsDiv = document.getElementById('drums-button-div');
    for (let j = 0; j < DRUM_SEQS.length; ++j) {
      const button = document.createElement('button');
      button.textContent = 'Play Beat ' + j + buttonSuffixes[i];
      button.addEventListener('click', () => {
        if (player.isPlaying()) {
          player.stop();
          button.textContent = 'Play Beat ' + j + buttonSuffixes[i];
          callback.stop();
        } else {
          player.start(DRUM_SEQS[j]).then(() => (
            button.textContent = 'Play Beat ' + j + buttonSuffixes[i]));
          button.textContent = 'Stop';
        }
      });
      drumsDiv.appendChild(button);
    }
    // Add melody buttons.
    const melDiv = document.getElementById('mel-button-div');
    const teapotButton = document.createElement('button');
    teapotButton.textContent = 'Play Teapot' + buttonSuffixes[i];
    teapotButton.addEventListener('click', () => {
      if (player.isPlaying()) {
        player.stop();
        teapotButton.textContent = 'Play Teapot' + buttonSuffixes[i];
        callback.stop();
      } else {
        player.start(MEL_TEAPOT).then(() => (
          teapotButton.textContent = 'Play Teapot' + buttonSuffixes[i]));
        teapotButton.textContent = 'Stop';
      }
    });
    melDiv.appendChild(teapotButton);
    const twinkleButton = document.createElement('button');
    twinkleButton.textContent = 'Play Twinkle' + buttonSuffixes[i];
    twinkleButton.addEventListener('click', () => {
      if (player.isPlaying()) {
        player.stop();
        twinkleButton.textContent = 'Play Twinkle' + buttonSuffixes[i];
        callback.stop();
      } else {
        player.start(MEL_TWINKLE).then(() => (
          twinkleButton.textContent = 'Play Twinkle' + buttonSuffixes[i]));
        twinkleButton.textContent = 'Stop';
      }
    });
    melDiv.appendChild(twinkleButton);
  }
}

try {
  Promise.all([generateDrums()]);
} catch (err) {
  console.error(err);
}
