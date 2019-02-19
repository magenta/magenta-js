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

import * as tf from '@tensorflow/tfjs-core';
import * as mm from '../src/index';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, MEL_TWINKLE, writeMemory, writeNoteSeqs, writeTimer} from './common';
import { NoteSequence } from '../src/index';

async function infillFirstVoice() {
  const model = new mm.Coconet(`${CHECKPOINTS_DIR}/coconet/bach`);
  await model.initialize();
  writeNoteSeqs('input-1', [MEL_TWINKLE], true);

  const start = performance.now();
  const output = await model.infill(MEL_TWINKLE);
  // Optionally, merge the held notes and restore the original melody timing
  // since the model chunks up the melody in 16ths.
  const fixedOutput = model.replaceVoice(output, MEL_TWINKLE);
  writeNoteSeqs('output-1', [fixedOutput], true);
  writeTimer('time-1', start);
  model.dispose();
}

async function infillSecondVoice() {
  const model = new mm.Coconet(`${CHECKPOINTS_DIR}/coconet/bach`);
  await model.initialize();

  const ns = mm.sequences.clone(MEL_TWINKLE);
  for (let i = 0; i < ns.notes.length; i++ ) {
    ns.notes[i].instrument = 2;
  }
  writeNoteSeqs('input-2', [ns], true);

  const start = performance.now();
  const output = await model.infill(ns);
  // Optionally, merge the held notes and restore the original melody timing
  // since the model chunks up the melody in 16ths.
  const fixedOutput = model.replaceVoice(output, ns);
  writeNoteSeqs('output-2', [fixedOutput], true);
  writeTimer('time-2', start);
  model.dispose();
}

async function infillSection() {
  const model = new mm.Coconet(`${CHECKPOINTS_DIR}/coconet/bach`);
  await model.initialize();

  // First voice.
  const ns = mm.sequences.clone(MEL_TWINKLE);
  const firstVoiceNotes = ns.notes.length;

  // Second voice.
  for (let i = 0; i < firstVoiceNotes; i++) {
    const note = new NoteSequence.Note();
    note.pitch = 58;
    note.instrument = 1;
    note.quantizedStartStep = i * 2;
    note.quantizedEndStep = note.quantizedStartStep + 2;
    ns.notes.push(note);
  }

  // Third voice.
  for (let i = 0; i < firstVoiceNotes; i++) {
    const note = new NoteSequence.Note();
    note.pitch = i % 2 ? 55 : 53;
    note.instrument = 2;
    note.quantizedStartStep = ns.notes[i].quantizedStartStep;
    note.quantizedEndStep = ns.notes[i].quantizedEndStep;
    ns.notes.push(note);
  }

  // Fourth voice.
  for (let i = 0; i < firstVoiceNotes; i++) {
    const note = new NoteSequence.Note();
    note.pitch = 50;
    note.instrument = 3;
    note.quantizedStartStep = i * 2;
    note.quantizedEndStep = note.quantizedStartStep + 2;
    ns.notes.push(note);
  }

  // Remove everything between timesteps 10 and 20.
  const ns2 = mm.sequences.clone(ns);
  ns2.notes = [];
  for (let i = 0; i < ns.notes.length; i++) {
    if (ns.notes[i].quantizedEndStep < 16 ||
        ns.notes[i].quantizedStartStep > 20) {
      const note = new NoteSequence.Note();
      note.pitch = ns.notes[i].pitch;
      note.instrument = ns.notes[i].instrument;
      note.quantizedStartStep = ns.notes[i].quantizedStartStep;
      note.quantizedEndStep = ns.notes[i].quantizedEndStep;
      ns2.notes.push(note);
    }
  }

  ns2.totalQuantizedSteps = ns2.notes[ns2.notes.length - 1].quantizedEndStep;
  writeNoteSeqs('input-3', [ns2], true);

  const start = performance.now();
  const output = await model.infill(ns2);

  // Optionally, merge the held notes.
  const fixedOutput = model.mergeHeldNotes(output);
  writeNoteSeqs('output-3', [fixedOutput], true);
  writeTimer('time-3', start);
  model.dispose();
}

try {
  Promise
      .all([
        infillFirstVoice(), infillSecondVoice(), infillSection()
      ])
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
