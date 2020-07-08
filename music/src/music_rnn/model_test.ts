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

import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import {INoteSequence} from '..';
import {MusicRNN} from './model';

const MEL_CKPT =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn';
const MEL_TEAPOT: INoteSequence = {
  notes: [
    {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
    {pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
    {pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
    {pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
    {pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
    {pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 78, quantizedStartStep: 16, quantizedEndStep: 20, program: 0},
    {pitch: 81, quantizedStartStep: 20, quantizedEndStep: 24, program: 0},
    {pitch: 76, quantizedStartStep: 24, quantizedEndStep: 32, program: 0}
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

let model: MusicRNN;
let initialBytes: number;

test('MusicRNN can be initialized', async (t: test.Test) => {
  initialBytes = tf.memory().numBytes;
  model = new MusicRNN(MEL_CKPT);
  await model.initialize();
  t.true(model.isInitialized);
  t.end();
});

test('MusicRNN can continue a sequence ', async (t: test.Test) => {
  const startMemory = tf.memory().numBytes;
  const temperature = 1;
  const continuation =
      await model.continueSequence(MEL_TEAPOT, 20, temperature);
  t.ok(continuation);
  t.true(continuation.notes.length > 0);

  // Doesn't leak memory.
  t.isEqual(tf.memory().numBytes, startMemory);
  t.end();
});

test('MusicRNN can be disposed', async (t: test.Test) => {
  model.dispose();
  t.isEqual(tf.memory().numBytes, initialBytes);
  t.end();
});
