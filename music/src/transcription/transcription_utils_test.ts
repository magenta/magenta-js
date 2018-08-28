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
import * as tf from '@tensorflow/tfjs-core';
import * as test from 'tape';

import {NoteSequence} from '../protobuf';

// tslint:disable-next-line:max-line-length
import {batchInput, FRAME_LENGTH_SECONDS, MIDI_PITCHES, MIN_MIDI_PITCH, pianorollToNoteSequence, unbatchOutput} from './transcription_utils';

const OVER_THRESHOLD_PROB = 0.6;

test('PianorollToNoteSequence', (t: test.Test) => {
  const frames = tf.buffer([300, MIDI_PITCHES]);
  const onsets = tf.buffer([300, MIDI_PITCHES]);
  // Activate key 39 for the middle 50 frames and last 10 frames.
  for (let i = 25; i < 75; ++i) {
    frames.set(OVER_THRESHOLD_PROB, i, 39);
  }
  for (let i = 90; i < 100; ++i) {
    frames.set(OVER_THRESHOLD_PROB, i, 39);
  }
  // Add an onset for the first occurrence.
  onsets.set(OVER_THRESHOLD_PROB, 25, 39);
  // Add an onset for a note that doesn't have an active frame.
  onsets.set(OVER_THRESHOLD_PROB, 260, 49);

  const expectedNs = NoteSequence.create({
    notes: [
      {
        pitch: 39 + MIN_MIDI_PITCH,
        startTime: 25 * FRAME_LENGTH_SECONDS,
        endTime: 75 * FRAME_LENGTH_SECONDS,
        velocity: 1
      },
      {
        pitch: 49 + MIN_MIDI_PITCH,
        startTime: 260 * FRAME_LENGTH_SECONDS,
        endTime: 261 * FRAME_LENGTH_SECONDS,
        velocity: 1
      },
    ],
    totalTime: 301 * FRAME_LENGTH_SECONDS
  });

  pianorollToNoteSequence(
      frames.toTensor() as tf.Tensor2D, onsets.toTensor() as tf.Tensor2D,
      tf.ones([300, MIDI_PITCHES]))
      .then((ns) => {
        t.deepEqual(ns, expectedNs);
        t.end();
      });
});

test('PianorollToNoteSequenceWithOverlappingFrames', (t: test.Test) => {
  const frames = tf.buffer([100, MIDI_PITCHES]);
  const onsets = tf.buffer([100, MIDI_PITCHES]);
  // Activate key 39 for the middle 50 frames and last 10 frames.
  for (let i = 25; i < 75; ++i) {
    frames.set(OVER_THRESHOLD_PROB, i, 39);
  }
  for (let i = 90; i < 100; ++i) {
    frames.set(OVER_THRESHOLD_PROB, i, 39);
  }
  // Add multiple onsets within those frames.
  onsets.set(OVER_THRESHOLD_PROB, 25, 39);
  onsets.set(OVER_THRESHOLD_PROB, 30, 39);
  // If an onset lasts for multiple frames, it should create only 1 note.
  onsets.set(OVER_THRESHOLD_PROB, 35, 39);
  onsets.set(OVER_THRESHOLD_PROB, 36, 39);

  const expectedNs = NoteSequence.create({
    notes: [
      {
        pitch: 39 + MIN_MIDI_PITCH,
        startTime: 25 * FRAME_LENGTH_SECONDS,
        endTime: 30 * FRAME_LENGTH_SECONDS,
        velocity: 1
      },
      {
        pitch: 39 + MIN_MIDI_PITCH,
        startTime: 30 * FRAME_LENGTH_SECONDS,
        endTime: 35 * FRAME_LENGTH_SECONDS,
        velocity: 1
      },
      {
        pitch: 39 + MIN_MIDI_PITCH,
        startTime: 35 * FRAME_LENGTH_SECONDS,
        endTime: 75 * FRAME_LENGTH_SECONDS,
        velocity: 1
      },
    ],
    totalTime: 101 * FRAME_LENGTH_SECONDS
  });

  pianorollToNoteSequence(
      frames.toTensor() as tf.Tensor2D, onsets.toTensor() as tf.Tensor2D,
      tf.ones([100, MIDI_PITCHES]))
      .then((ns) => {
        t.deepEqual(ns, expectedNs);
        t.end();
      });
});

function fakeInput(l: number, w: number) {
  const input: number[][] = [];
  for (let i = 0; i < l; ++i) {
    const row: number[] = [];
    for (let j = 0; j < w; ++j) {
      row.push(i * w + j);
    }
    input.push(row);
  }
  return input;
}

const flatten = ((a: number[][]) => [].concat.apply([], a));

test('BatchInputWithOneBatch', (t: test.Test) => {
  let input = fakeInput(100, 4);

  // Try with perfect split.
  let [firstBatches, finalBatch] = batchInput(input, 100);
  t.deepEqual(firstBatches, undefined);
  t.deepEqual(finalBatch.shape, [1, 100, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input));

  // Try with imperfect split.
  [firstBatches, finalBatch] = batchInput(input, 150);
  t.deepEqual(firstBatches, undefined);
  t.deepEqual(finalBatch.shape, [1, 100, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input));

  // Try with an input sightly over the batch length, but less than the
  // receptive field padding.
  input = fakeInput(103, 4);
  [firstBatches, finalBatch] = batchInput(input, 100);
  t.deepEqual(firstBatches, undefined);
  t.deepEqual(finalBatch.shape, [1, 103, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input));

  t.end();
});

test('BatchInputWithTwoBatch', (t: test.Test) => {
  let input = fakeInput(100, 4);

  // Try with perfect split.
  let [firstBatches, finalBatch] = batchInput(input, 50);
  t.deepEqual(firstBatches.shape, [1, 53, 4]);
  t.deepEqual(firstBatches.dataSync(), flatten(input.slice(0, 53)));
  t.deepEqual(finalBatch.shape, [1, 53, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input.slice(47)));
  // Reverse.
  let unbatched = unbatchOutput(firstBatches, finalBatch, 50);
  t.deepEqual(unbatched.shape, [1, 100, 4]);
  t.deepEqual(unbatched.dataSync(), flatten(input));

  // Try with imperfect split.
  [firstBatches, finalBatch] = batchInput(input, 75);
  t.deepEqual(firstBatches.shape, [1, 78, 4]);
  t.deepEqual(firstBatches.dataSync(), flatten(input.slice(0, 78)));
  t.deepEqual(finalBatch.shape, [1, 28, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input.slice(72)));
  // Reverse.
  unbatched = unbatchOutput(firstBatches, finalBatch, 75);
  t.deepEqual(unbatched.shape, [1, 100, 4]);
  t.deepEqual(unbatched.dataSync(), flatten(input));

  // Try with an input sightly over the batch length, but less than the
  // receptive field padding.
  input = fakeInput(103, 4);
  [firstBatches, finalBatch] = batchInput(input, 50);
  t.deepEqual(firstBatches.shape, [1, 53, 4]);
  t.deepEqual(firstBatches.dataSync(), flatten(input.slice(0, 53)));
  t.deepEqual(finalBatch.shape, [1, 56, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input.slice(47)));
  // Reverse.
  unbatched = unbatchOutput(firstBatches, finalBatch, 50);
  t.deepEqual(unbatched.shape, [1, 103, 4]);
  t.deepEqual(unbatched.dataSync(), flatten(input));

  t.end();
});

test('BatchInputWithOverTwoBatch', (t: test.Test) => {
  let input = fakeInput(100, 4);

  // Try with perfect split.
  let [firstBatches, finalBatch] = batchInput(input, 25);
  // First batch.
  t.deepEqual(firstBatches.shape, [3, 31, 4]);
  t.deepEqual(firstBatches.slice(0, 1).dataSync(), flatten(input.slice(0, 31)));
  // Middle batches.
  t.deepEqual(
      firstBatches.slice(1, 1).dataSync(), flatten(input.slice(22, 53)));
  t.deepEqual(
      firstBatches.slice(2, 1).dataSync(), flatten(input.slice(47, 78)));
  // Final batch.
  t.deepEqual(finalBatch.shape, [1, 28, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input.slice(72)));
  // Reverse.
  let unbatched = unbatchOutput(firstBatches, finalBatch, 25);
  t.deepEqual(unbatched.shape, [1, 100, 4]);
  t.deepEqual(unbatched.dataSync(), flatten(input));

  // Try with imperfect split.
  [firstBatches, finalBatch] = batchInput(input, 22);
  // First batch.
  t.deepEqual(firstBatches.shape, [4, 28, 4]);
  t.deepEqual(firstBatches.slice(0, 1).dataSync(), flatten(input.slice(0, 28)));
  // Middle batches.
  t.deepEqual(
      firstBatches.slice(1, 1).dataSync(), flatten(input.slice(19, 47)));
  t.deepEqual(
      firstBatches.slice(2, 1).dataSync(), flatten(input.slice(41, 69)));
  t.deepEqual(
      firstBatches.slice(3, 1).dataSync(), flatten(input.slice(63, 91)));
  // Final batch.
  t.deepEqual(finalBatch.shape, [1, 15, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input.slice(85)));
  // Reverse.
  unbatched = unbatchOutput(firstBatches, finalBatch, 22);
  t.deepEqual(unbatched.shape, [1, 100, 4]);
  t.deepEqual(unbatched.dataSync(), flatten(input));

  // Try with an input sightly over the batch length, but less than the
  // receptive field padding.
  input = fakeInput(103, 4);
  [firstBatches, finalBatch] = batchInput(input, 25);
  // First batch.
  t.deepEqual(firstBatches.shape, [3, 31, 4]);
  t.deepEqual(firstBatches.slice(0, 1).dataSync(), flatten(input.slice(0, 31)));
  // Middle batches.
  t.deepEqual(
      firstBatches.slice(1, 1).dataSync(), flatten(input.slice(22, 53)));
  t.deepEqual(
      firstBatches.slice(2, 1).dataSync(), flatten(input.slice(47, 78)));
  // Final batch.
  t.deepEqual(finalBatch.shape, [1, 31, 4]);
  t.deepEqual(finalBatch.dataSync(), flatten(input.slice(72)));
  // Reverse.
  unbatched = unbatchOutput(firstBatches, finalBatch, 25);
  t.deepEqual(unbatched.shape, [1, 103, 4]);
  t.deepEqual(unbatched.dataSync(), flatten(input));

  t.end();
});
