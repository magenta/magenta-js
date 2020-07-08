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

import {mergeConsecutiveNotes, replaceInstruments} from '../src/core/sequences';
import * as mm from '../src/index';
import {NoteSequence} from '../src/index';
import * as timer from '../src/core/compat/timer';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, MEL_TWINKLE, writeMemory, writeNoteSeqs, writeTimer} from './common';

async function infillFirstVoice() {
  const model = new mm.Coconet(`${CHECKPOINTS_DIR}/coconet/bach`);
  await model.initialize();
  writeNoteSeqs('input-1', [MEL_TWINKLE], true);

  const start = timer.now();
  const output = await model.infill(MEL_TWINKLE);
  // Optionally, merge the held notes and restore the original melody timing
  // since the model chunks up the melody in 16ths.
  const fixedOutput =
      replaceInstruments(mergeConsecutiveNotes(output), MEL_TWINKLE);
  writeNoteSeqs('output-1', [fixedOutput], true);
  writeTimer('time-1', start);
  model.dispose();
}

async function infillSecondVoice() {
  const model = new mm.Coconet(`${CHECKPOINTS_DIR}/coconet/bach`);
  await model.initialize();

  const ns = mm.sequences.clone(MEL_TWINKLE);
  for (let i = 0; i < ns.notes.length; i++) {
    ns.notes[i].instrument = 2;
  }
  writeNoteSeqs('input-2', [ns], true);

  const start = timer.now();
  // A smaller temperature means the output is more random. Fewer sampling
  // iterations means the process is faster, but the results are less good.
  const output = await model.infill(ns, {temperature: 0.5, numIterations: 10});
  // Optionally, merge the held notes and restore the original melody timing
  // since the model chunks up the melody in 16ths.
  const fixedOutput = replaceInstruments(mergeConsecutiveNotes(output), ns);
  writeNoteSeqs('output-2', [fixedOutput], true);
  writeTimer('time-2', start);
  model.dispose();
}

async function infillSection() {
  const model = new mm.Coconet(`${CHECKPOINTS_DIR}/coconet/bach`);
  await model.initialize();

  // First voice.
  const ns = mm.NoteSequence.create();

  for (let i = 0; i < 32; i++) {
    // Leave silence for 4 beats, between time steps 4 and 8, to
    // show that using a mask doesn't infill space.
    if (i < 8 && i > 4) {
      continue;
    }
    // One per voice.
    for (let v = 0; v < 4; v++) {
      const note = new NoteSequence.Note();
      note.pitch = 76 - 10 * v;  // Different pitches for each voice.
      note.instrument = v;
      note.quantizedStartStep = i;
      note.quantizedEndStep = note.quantizedStartStep + 1;
      ns.notes.push(note);
    }
  }
  ns.quantizationInfo = {stepsPerQuarter: 4};
  ns.totalQuantizedSteps = 32;

  // Remove everything between timesteps 10 and 30
  const mask = [];
  for (let i = 10; i < 30; i++) {
    // Infill all voices.
    for (let v = 0; v < 4; v++) {
      mask.push({step: i, voice: v});
    }
  }
  writeNoteSeqs('input-3', [ns], true);

  const start = timer.now();
  const output = await model.infill(ns, {infillMask: mask});

  // Optionally, treat any consecutive notes as merged.
  const fixedOutput = mergeConsecutiveNotes(output);
  writeNoteSeqs('output-3', [fixedOutput], true);
  writeTimer('time-3', start);
  model.dispose();
}

try {
  Promise.all([infillFirstVoice(), infillSecondVoice(), infillSection()])
      .then(() => {
        writeMemory(tf.memory().numBytes);
      });
} catch (err) {
  console.error(err);
}
