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

// tslint:disable-next-line:max-line-length
const GENIE_CHECKPOINT =
    `${CHECKPOINTS_DIR}/piano_genie/model/epiano/stp_iq_auto_contour_dt_166006`;
const NUM_BUTTONS = 8;
const LOWEST_PIANO_KEY_MIDI_NOTE = 21;
const TEMPERATURE = 0.25;

const genie = new mm.PianoGenie(GENIE_CHECKPOINT);

function initControlsAndAudio() {
  const heldButtonToMidiNote = new Map<number, number>();
  const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

  // Bind keyboard controls
  document.onkeydown = (evt: KeyboardEvent) => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    const key = evt.keyCode;
    const button = key - 49;
    if (button >= 0 && button < NUM_BUTTONS) {
      if (heldButtonToMidiNote.has(button)) {
        return;
      }

      const output = genie.next(button, TEMPERATURE);
      const note = output + LOWEST_PIANO_KEY_MIDI_NOTE;

      synth.triggerAttack(Tone.Frequency(note, 'midi').toFrequency());
      heldButtonToMidiNote.set(button, note);
    }
  };

  document.onkeyup = (evt: KeyboardEvent) => {
    const key = evt.keyCode;
    const button = key - 49;
    if (button >= 0 && button < NUM_BUTTONS) {
      if (heldButtonToMidiNote.has(button)) {
        const note = heldButtonToMidiNote.get(button);

        synth.triggerRelease(Tone.Frequency(note, 'midi').toFrequency());
        heldButtonToMidiNote.delete(button);
      }
    }
  };

  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
}

genie.initialize().then(initControlsAndAudio);
