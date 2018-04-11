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

import {tensorflow} from '@magenta/protobuf';
import * as test from 'tape';

import * as data from './data';

import NoteSequence = tensorflow.magenta.NoteSequence;

test('Test MelodyConverter', (t: test.Test) => {
  const melConverter = new data.MelodyConverter(
      {'numSteps': 32, 'minPitch': 21, 'maxPitch': 108});
  const exMel = NoteSequence.create({
    notes: [
      {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2},
      {pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4},
      {pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6},
      {pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8},
      {pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10},
      {pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16},
      {pitch: 77, quantizedStartStep: 16, quantizedEndStep: 20},
      {pitch: 80, quantizedStartStep: 20, quantizedEndStep: 24},
      {pitch: 75, quantizedStartStep: 24, quantizedEndStep: 28}
    ]
  });

  const melTensor = melConverter.toTensor(exMel);
  t.deepEqual(melTensor.shape, [32, 90]);

  melConverter.toNoteSequence(melTensor).then(
      melNs => t.deepEqual(melNs, exMel));

  melTensor.dispose();
  t.end();
});

test('Test DrumsConverter', (t: test.Test) => {
  const drumsConverter = new data.DrumsConverter({'numSteps': 32});
  const exDrums = NoteSequence.create({
    notes: [
      {pitch: 36, quantizedStartStep: 0}, {pitch: 42, quantizedStartStep: 2},
      {pitch: 36, quantizedStartStep: 4}, {pitch: 42, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8}, {pitch: 42, quantizedStartStep: 10},
      {pitch: 36, quantizedStartStep: 12}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 36, quantizedStartStep: 16}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 36, quantizedStartStep: 28},
      {pitch: 42, quantizedStartStep: 30}
    ]
  });
  exDrums.notes.map(n => { n.isDrum = true; });

  const drumsTensor = drumsConverter.toTensor(exDrums);
  t.deepEqual(drumsTensor.shape, [32, 9]);

  const drumRollConverter = new data.DrumRollConverter({'numSteps': 32});

  drumRollConverter.toNoteSequence(drumsTensor)
      .then(ns => t.deepEqual(ns, exDrums));

  drumsTensor.dispose();
  t.end();
});
