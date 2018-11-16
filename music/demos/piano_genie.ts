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

import * as Tone from 'tone';

import * as mm from '../src/index';

import {CHECKPOINTS_DIR} from './common';

mm.logging.verbosity = mm.logging.Level.DEBUG;

// tslint:disable-next-line:max-line-length
const GENIE_CHECKPOINT = `${CHECKPOINTS_DIR}/piano_genie/model/epiano/stp_iq_auto_contour_dt_166006`;

const genie = new mm.PianoGenie(GENIE_CHECKPOINT);

function initControlsAndAudio () {
  let lastOutput = -1;
  let lastTime = new Date();
  lastTime.setSeconds(lastTime.getSeconds() - 100000);
  
  const buttonToNote = new Map<number, number>();

  const synth = new Tone.PolySynth(8, Tone.FMSynth).toMaster();

  // Bind keyboard controls
  document.onkeydown = (evt: KeyboardEvent) => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    const key = evt.keyCode;
    const button = key - 49;
    if (button >= 0 && button < 8) {
      if (buttonToNote.has(button)) {
        return;
      }

      const time = new Date();
      const deltaTime = (time.getTime() - lastTime.getTime()) / 1000;
      const logits = genie.evaluate(button, lastOutput, deltaTime);
      const sample = mm.sampleLogits(logits, 0.25);

      const output = sample.dataSync()[0];
      const note = output + 21;

      console.log(
        `button: ${button} last: ${lastOutput} dt: ${deltaTime} => ${output}`);

      synth.triggerAttack(Tone.Frequency(note, 'midi'));
      buttonToNote.set(button, note);

      logits.dispose();
      sample.dispose();

      lastOutput = output;
      lastTime = time;
    }
  };

  document.onkeyup = (evt: KeyboardEvent) => {
    const key = evt.keyCode;
    const button = key - 49;
    if (button >= 0 && button < 8) {
      if (buttonToNote.has(button)) {
        const note = buttonToNote.get(button);

        synth.triggerRelease(Tone.Frequency(note, 'midi'));
        buttonToNote.delete(button);
      }
    }
  };

  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
}

genie.initialize().then(initControlsAndAudio);

