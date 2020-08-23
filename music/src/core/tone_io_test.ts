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

import * as test from 'tape';

import {NoteSequence} from '../protobuf/index';

import * as sequences from './sequences';
import * as tone_io from './tone_io';

// import * as tone_io from './tone_io';
const MEL_TWINKLE = NoteSequence.create({
  notes: [
    {
      pitch: 60,
      quantizedStartStep: 0,
      quantizedEndStep: 2,
      program: 0,
      instrument: 0
    },
    {
      pitch: 60,
      quantizedStartStep: 2,
      quantizedEndStep: 4,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 4,
      quantizedEndStep: 6,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 6,
      quantizedEndStep: 8,
      program: 0,
      instrument: 0
    },
    {
      pitch: 69,
      quantizedStartStep: 8,
      quantizedEndStep: 10,
      program: 0,
      instrument: 0
    },
    {
      pitch: 69,
      quantizedStartStep: 10,
      quantizedEndStep: 12,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 12,
      quantizedEndStep: 16,
      program: 0,
      instrument: 0
    },
    {
      pitch: 65,
      quantizedStartStep: 16,
      quantizedEndStep: 18,
      program: 0,
      instrument: 0
    },
    {
      pitch: 65,
      quantizedStartStep: 18,
      quantizedEndStep: 20,
      program: 0,
      instrument: 0
    },
    {
      pitch: 64,
      quantizedStartStep: 20,
      quantizedEndStep: 22,
      program: 0,
      instrument: 0
    },
    {
      pitch: 64,
      quantizedStartStep: 22,
      quantizedEndStep: 24,
      program: 0,
      instrument: 0
    },
    {
      pitch: 62,
      quantizedStartStep: 24,
      quantizedEndStep: 26,
      program: 0,
      instrument: 0
    },
    {
      pitch: 62,
      quantizedStartStep: 26,
      quantizedEndStep: 28,
      program: 0,
      instrument: 0
    },
    {
      pitch: 60,
      quantizedStartStep: 28,
      quantizedEndStep: 32,
      program: 0,
      instrument: 0
    }
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
});

test('Get ToneEvents from Quantized NoteSequence', (t: test.Test) => {
  const ns = sequences.clone(MEL_TWINKLE);
  const nsRounTrip = tone_io.toneEventsToNoteSequence(
    tone_io.noteSequenceToToneEvents(ns)
  );
  t.deepEqual(ns, nsRounTrip);
  t.end();
});
