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

import * as Tone from 'tone';
import * as mm from '../src/index';
import { CHECKPOINTS_DIR } from './common';

const GENIE_DIR = `${CHECKPOINTS_DIR}/piano_genie/model`;
const GENIE_CHECKPOINTS: {[key:string]: {[key:string]: string}} = {
  // Models conditioned on performance timing features
  dt_only: {
    // Original Piano Genie trained on an older version of the MAESTRO dataset.
    v1: `${GENIE_DIR}/epiano/stp_iq_auto_contour_dt_166006`,
    // Trained on MAESTRO without timing in encoder.
    enc0_kp10: `${GENIE_DIR}/maestro/dt_only/enc0_kp10_110114`,
    // Trained on MAESTRO with timing in encoder.
    enc1_kp10: `${GENIE_DIR}/maestro/dt_only/enc1_kp10_135091`,
  },
  // Models conditioned on timing and key signature.
  keysig: {
    // Conditioning features *not* in encoder.
    enc0_kp05: `${GENIE_DIR}/maestro/keysig/enc0_kp05_114087`,
    // Conditioning features in encoder.
    enc1_kp05: `${GENIE_DIR}/maestro/keysig/enc1_kp05_159962`,
  },
  // Models conditioned on timing, chord root, and chord family.
  chord: {
    // Conditioning features not in encoder and optional dropout.
    enc0_kp05_a: `${GENIE_DIR}/maestro/chord/enc0_kp05_111680`,
    enc0_kp05_b: `${GENIE_DIR}/maestro/chord/enc0_kp05_132241`,
    enc0_kp10: `${GENIE_DIR}/maestro/chord/enc0_kp10_099645`,
    // Conditioning features in encoder and optional dropout.
    enc1_kp05_a: `${GENIE_DIR}/maestro/chord/enc1_kp05_152860`,
    enc1_kp05_b: `${GENIE_DIR}/maestro/chord/enc1_kp05_153966`,
    enc1_kp10: `${GENIE_DIR}/maestro/chord/enc1_kp10_121447`,
  },
  // Models conditioned on timing, key signature, and chord family.
  keysig_chordfamily: {
    // Conditioning features *not* in encoder.
    enc0_kp05: `${GENIE_DIR}/maestro/keysig_chordfamily/enc0_kp05_126711`,
    // Conditioning features in encoder.
    enc1_kp05: `${GENIE_DIR}/maestro/keysig_chordfamily/enc0_kp05_126711`,
  },
  // Models conditioned on timing, key signature, chord root, and chord family.
  keysig_chord: {
    // Conditioning features *not* in encoder.
    enc0_kp05: `${GENIE_DIR}/maestro/keysig_chord/enc0_kp05_192822`,
    // Conditioning features in encoder.
    enc1_kp05: `${GENIE_DIR}/maestro/keysig_chord/enc1_kp05_159786`,
  },
};

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

function selectModel(condtype: string, model: string) {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loaded').style.display = 'none';

  resetConditioningSelectors();

  const ckpt = GENIE_CHECKPOINTS[condtype][model];

  if (genie !== undefined) {
    genie.dispose();
  }
  genie = undefined;

  if (condtype === 'dt_only') {
    genie = new mm.PianoGenie(ckpt);
  } else if (condtype === 'keysig') {
    genie = new mm.PianoGenieKeysig(ckpt);
  } else if (condtype === 'chord') {
    genie = new mm.PianoGenieChord(ckpt);
  } else if (condtype === 'keysig_chordfamily') {
    genie = new mm.PianoGenieKeysigChordFamily(ckpt);
  } else if (condtype === 'keysig_chord') {
    genie = new mm.PianoGenieKeysigChord(ckpt);
  } else {
    throw new Error();
  }

  genie.initialize().then(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('loaded').style.display = 'block';

    for (const c in GENIE_CHECKPOINTS) {
      if (c === condtype) {
        document.getElementById(c).style.display = 'block';
      } else {
        document.getElementById(c).style.display = 'none';
      }
    }
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
  for (const c in GENIE_CHECKPOINTS) {
    for (const n in GENIE_CHECKPOINTS[c]) {
      const option = document.createElement('option') as HTMLOptionElement;
      option.text = c + ' ' + n;
      if (c === 'dt_only' && n === 'v1') {
        option.selected = true;
      }
      modelSelector.add(option);
    }
  }
  modelSelector.onchange = () => {
    const cn = modelSelector.options[modelSelector.selectedIndex].text;
    const [c, n] = cn.split(' ');
    selectModel(c, n);
  };
}

function initGlobalControlsAndAudio() {
  const heldButtonToMidiNote = new Map<number, number>();
  const synth = new Tone.PolySynth(NUM_BUTTONS, Tone.FMSynth).toMaster();

  // Bind keyboard controls
  document.onkeydown = (evt: KeyboardEvent) => {
    if (genie === undefined) {
      return;
    }
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    const key = evt.keyCode;
    const button = key - 49;
    if (button >= 0 && button < NUM_BUTTONS) {
      if (heldButtonToMidiNote.has(button)) {
        return;
      }

      const output = genie.next(button, temperature);
      const note = output + LOWEST_PIANO_KEY_MIDI_NOTE;

      synth.triggerAttack(Tone.Frequency(note, 'midi'));
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

        synth.triggerRelease(Tone.Frequency(note, 'midi'));
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
selectModel('dt_only', 'v1');
initGlobalControlsAndAudio();
