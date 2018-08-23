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
import {FRAME_LENGTH_SECONDS, MIDI_PITCHES, MIN_MIDI_PITCH, pianorollToNoteSequence} from './model';

test('PianorollToNoteSequence', (t: test.Test) => {
  const frames = tf.buffer([300, MIDI_PITCHES]);
  const onsets = tf.buffer([300, MIDI_PITCHES]);
  // Activate key 39 for the middle 50 frames and last 10 frames.
  for (let i = 25; i < 75; ++i) {
    frames.set(0.6, i, 39);
  }
  for (let i = 90; i < 100; ++i) {
    frames.set(0.6, i, 39);
  }
  // Add an onset for the first occurrence.
  onsets.set(0.6, 25, 39);
  // Add an onset for a note that doesn't have an active frame.
  onsets.set(0.6, 260, 49);

  const expectedNs = NoteSequence.create({
    notes: [
      {
        pitch: 39 + MIN_MIDI_PITCH,
        startTime: 25 * FRAME_LENGTH_SECONDS,
        endTime: 75 * FRAME_LENGTH_SECONDS,
        velocity: 90
      },
      {
        pitch: 49 + MIN_MIDI_PITCH,
        startTime: 260 * FRAME_LENGTH_SECONDS,
        endTime: 261 * FRAME_LENGTH_SECONDS,
        velocity: 90
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
    frames.set(0.6, i, 39);
  }
  for (let i = 90; i < 100; ++i) {
    frames.set(0.6, i, 39);
  }
  // Add multiple onsets within those frames.
  onsets.set(0.6, 25, 39);
  onsets.set(0.6, 30, 39);
  // If an onset lasts for multiple frames, it should create only 1 note.
  onsets.set(0.6, 35, 39);
  onsets.set(0.6, 36, 39);

  const expectedNs = NoteSequence.create({
    notes: [
      {
        pitch: 39 + MIN_MIDI_PITCH,
        startTime: 25 * FRAME_LENGTH_SECONDS,
        endTime: 30 * FRAME_LENGTH_SECONDS,
        velocity: 90
      },
      {
        pitch: 39 + MIN_MIDI_PITCH,
        startTime: 30 * FRAME_LENGTH_SECONDS,
        endTime: 35 * FRAME_LENGTH_SECONDS,
        velocity: 90
      },
      {
        pitch: 39 + MIN_MIDI_PITCH,
        startTime: 35 * FRAME_LENGTH_SECONDS,
        endTime: 75 * FRAME_LENGTH_SECONDS,
        velocity: 90
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
