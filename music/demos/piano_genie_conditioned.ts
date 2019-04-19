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
import { CHECKPOINTS_DIR } from './common';

/*
In addition to these recommended checkpoints, there are a number of alternative
checkpoints for each conditioning configurations. Depending on your application,
you may find that a different checkpoint is preferrable to our recommendations.

Each checkpoint is named as "COND_TYPE/encA_kpBB_CCCCCC". If none of the
following explanation of this naming convention means anything to you, you might
simply consider the other checkpoints as alternatives and try out their behavior
in your application. In all likelihood, the performance of all the checkpoints
for a given conditioning configuration will be quite similar.

COND_TYPE is the type of conditioning information for that model: one of
["dt_only", "keysig", "chord", "keysig_chordfamily", "keysig_chord"].

A=0 means that the Piano Genie encoder did not receive the conditioning features
during training. A=1 means that the encoder *did* receive the features. While we
only use the decoder for performance, the inclusion of conditioning features in
the encoder during training may alter the performance mechanics of the decoder.

BB=05 means that half of the conditioning information was randomly discarded
during training, so those models can be safely played with or without specifying
conditioning information. BB=10 means that the conditioning information was
never discarded, so playing those models *without* specifying conditioning
information may lead to unspecified behavior.

CCCCCC refers to the number of minibatches the model saw during training (these
numbers differ because we use early stopping).

dt_only
- ${GENIE_DIR}/epiano/stp_iq_auto_contour_dt_166006 (original Piano Genie)
- ${GENIE_DIR}/maestro/dt_only/enc0_kp10_110114
- ${GENIE_DIR}/maestro/dt_only/enc1_kp10_135091

keysig
- ${GENIE_DIR}/maestro/keysig/enc0_kp05_114087
- ${GENIE_DIR}/maestro/keysig/enc1_kp05_159962

chord
- ${GENIE_DIR}/maestro/chord/enc0_kp05_111680
- ${GENIE_DIR}/maestro/chord/enc0_kp05_132241
- ${GENIE_DIR}/maestro/chord/enc0_kp10_099645
- ${GENIE_DIR}/maestro/chord/enc1_kp05_152860
- ${GENIE_DIR}/maestro/chord/enc1_kp05_153966
- ${GENIE_DIR}/maestro/chord/enc1_kp10_121447

keysig_chordfamily
- ${GENIE_DIR}/maestro/keysig_chordfamily/enc0_kp05_126711
- ${GENIE_DIR}/maestro/keysig_chordfamily/enc1_kp05_172469

keysig_chord
- ${GENIE_DIR}/maestro/keysig_chord/enc0_kp05_192822
- ${GENIE_DIR}/maestro/keysig_chord/enc1_kp05_159786
*/
const GENIE_DIR = `${CHECKPOINTS_DIR}/piano_genie/model`;
const GENIE_CHECKPOINTS: Array<[string, string, string]> = [
  [
    'No conditioning', 'dt_only',
    `${GENIE_DIR}/epiano/stp_iq_auto_contour_dt_166006`],
  [
    'Key signature', 'keysig',
    `${GENIE_DIR}/maestro/keysig/enc1_kp05_159962`],
  [
    'Chord', 'chord',
    `${GENIE_DIR}/maestro/chord/enc1_kp05_153966`],
  [
    'Key signature and chord family', 'keysig_chordfamily',
    `${GENIE_DIR}/maestro/keysig_chordfamily/enc1_kp05_172469`],
  [
    'Key signature and chord', 'keysig_chord',
    `${GENIE_DIR}/maestro/keysig_chord/enc1_kp05_159786`],
];
const COND_TYPES = [
  'dt_only', 'keysig', 'chord', 'keysig_chordfamily', 'keysig_chord'];

const NUM_BUTTONS = 8;
const LOWEST_PIANO_KEY_MIDI_NOTE = 21;

let genie: mm.PianoGenie;
let temperature = 0.25;

function resetConditioningSelectors() {
  const resetEls = document.getElementsByClassName('rs');
  for (let i = 0; i < resetEls.length; ++i) {
    (resetEls[i] as HTMLSelectElement).selectedIndex = 0;
  }
}

function selectModel(n: number) {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loaded').style.display = 'none';

  resetConditioningSelectors();

  const condtype = GENIE_CHECKPOINTS[n][1];
  const ckpt = GENIE_CHECKPOINTS[n][2];

  if (genie !== undefined) {
    genie.dispose();
  }
  genie = undefined;

  switch (condtype) {
    case 'dt_only':
      genie = new mm.PianoGenie(ckpt);
      break;
    case 'keysig':
      genie = new mm.PianoGenieKeysig(ckpt);
      break;
    case 'chord':
      genie = new mm.PianoGenieChord(ckpt);
      break;
    case 'keysig_chordfamily':
      genie = new mm.PianoGenieKeysigChordFamily(ckpt);
      break;
    case 'keysig_chord':
      genie = new mm.PianoGenieKeysigChord(ckpt);
      break;
    default:
      throw new Error();
  }

  genie.initialize().then(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('loaded').style.display = 'block';

    COND_TYPES.forEach((c) => {
      if (c === condtype) {
        document.getElementById(c).style.display = 'block';
      } else {
        document.getElementById(c).style.display = 'none';
      }
    });
  });
}

function initModelControls() {
  const kk = document.getElementById('keysig_keysig') as HTMLSelectElement;
  kk.onchange = () => {
    (genie as mm.PianoGenieKeysig).setKeySignature(Number(kk.value));
  };

  const ccr = document.getElementById('chord_chordroot') as HTMLSelectElement;
  const ccf = document.getElementById('chord_chordfamily') as HTMLSelectElement;
  ccr.onchange = () => {
    (genie as mm.PianoGenieChord).setChordRoot(Number(ccr.value));
  };
  ccf.onchange = () => {
    (genie as mm.PianoGenieChord).setChordFamily(Number(ccf.value));
  };

  const kcfk = document.getElementById(
    'keysig_chordfamily_keysig') as HTMLSelectElement;
  const kcfcf = document.getElementById(
    'keysig_chordfamily_chordfamily') as HTMLSelectElement;
  kcfk.onchange = () => {
    (genie as mm.PianoGenieKeysigChordFamily).setKeySignature(
      Number(kcfk.value));
  };
  kcfcf.onchange = () => {
    (genie as mm.PianoGenieKeysigChordFamily).setChordFamily(
      Number(kcfcf.value));
  };

  const kck = document.getElementById(
    'keysig_chord_keysig') as HTMLSelectElement;
  const kccr = document.getElementById(
    'keysig_chord_chordroot') as HTMLSelectElement;
  const kccf = document.getElementById(
    'keysig_chord_chordfamily') as HTMLSelectElement;
  kck.onchange = () => {
    (genie as mm.PianoGenieKeysigChord).setKeySignature(Number(kck.value));
  };
  kccr.onchange = () => {
    (genie as mm.PianoGenieKeysigChord).setChordRoot(Number(kccr.value));
  };
  kccf.onchange = () => {
    (genie as mm.PianoGenieKeysigChord).setChordFamily(Number(kccf.value));
  };
}

function initModelSelector() {
  const modelSelector = document.getElementById('models') as HTMLSelectElement;
  for (let i = 0; i < GENIE_CHECKPOINTS.length; ++i) {
    const text = GENIE_CHECKPOINTS[i][0];
    const condtype = GENIE_CHECKPOINTS[i][1];
    const option = document.createElement('option') as HTMLOptionElement;
    option.text = text;
    if (i === 0) {
      option.selected = true;
    }
    modelSelector.add(option);
  }
  modelSelector.onchange = () => {
    selectModel(modelSelector.selectedIndex);
  };
}

function initGlobalControlsAndAudio() {
  const heldButtonToMidiNote = new Map<number, number>();
  const tone = mm.Player.tone;
  const synth = new tone.PolySynth(NUM_BUTTONS, tone.FMSynth).toMaster();

  // Bind keyboard controls
  document.onkeydown = (evt: KeyboardEvent) => {
    if (genie === undefined) {
      return;
    }
    if (tone.context.state !== 'running') {
      tone.context.resume();
    }
    const key = evt.keyCode;
    const button = key - 49;
    if (button >= 0 && button < NUM_BUTTONS) {
      if (heldButtonToMidiNote.has(button)) {
        return;
      }

      const output = genie.next(button, temperature);
      const note = output + LOWEST_PIANO_KEY_MIDI_NOTE;

      synth.triggerAttack(tone.Frequency(note, 'midi'));
      heldButtonToMidiNote.set(button, note);
    }
  };

  document.onkeyup = (evt: KeyboardEvent) => {
    if (genie === undefined) {
      return;
    }
    const key = evt.keyCode;
    const button = key - 49;
    if (button >= 0 && button < NUM_BUTTONS) {
      if (heldButtonToMidiNote.has(button)) {
        const note = heldButtonToMidiNote.get(button);

        synth.triggerRelease(tone.Frequency(note, 'midi'));
        heldButtonToMidiNote.delete(button);
      }
    }
  };

  const tempSlider = document.getElementById('temp') as HTMLInputElement;
  tempSlider.oninput = () => {
    temperature = Number(tempSlider.value) / Number(tempSlider.max);
  };

  (document.getElementById('reset') as HTMLButtonElement).onclick = () => {
    if (genie !== undefined) {
      resetConditioningSelectors();
      genie.resetState();
    }
  };
}

initModelControls();
initModelSelector();
selectModel(0);
initGlobalControlsAndAudio();
