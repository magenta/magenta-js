/**
 * Utility functions for the [Coconet]{@link} model.
 *
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Imports
 */
import {INoteSequence, NoteSequence} from '../protobuf';
import * as tf from '@tensorflow/tfjs-core';

export const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
export const DURATION_STEPS = 32;
// The length of the pitch array in Pianoroll.
export const NUM_PITCHES = 46;
// The pitch array in Pianoroll is shifted so that index 0 is MIN_PITCH.
export const MIN_PITCH = 36;
// Number of voices used in the model. 0 represents Soprano, 1 Alto,
// 2 Tenor and 3 is Bass.
export const NUM_VOICES = 4;

/**
 * Converts a pianoroll representation to a `NoteSequence`. Note that since
 * the pianoroll representation can't distinguish between multiple eighth notes
 *  and held notes, the resulting `NoteSequence` won't either.
 *
 * @param pianoroll Array of shape `[steps][NUM_PITCHES][NUM_VOICES]`,
 * where each entry represents an instrument being played at a particular step
 * and for a particular pitch. For example, `pianoroll[0][64] =[0, 0, 1, 0]`
 * means that the third instrument plays pitch 64 at time 0.
 * @returns A `NoteSequence` containing the melody.
 */
export function pianorollToSequence(pianoroll: tf.Tensor4D,
    numberOfSteps: number): NoteSequence {
  // First reshape the flat tensor so that it's shaped [steps][NUM_PITCHES][4].
  const reshaped = tf.reshape(pianoroll,
      [numberOfSteps, NUM_PITCHES, NUM_VOICES]);
  const sequence = NoteSequence.create();
  const notes: NoteSequence.Note[] = [];

  for (let s = 0; s < numberOfSteps; s++) {
    for (let p = 0; p < NUM_PITCHES; p++) {
      for (let v = 0; v < NUM_VOICES; v++) {
        const value = reshaped.get(s, p, v);
        // If this note is on, then it's being played by a voice and
        // it should be added to the note sequence.
        if (value === 1.0) {
          const note = new NoteSequence.Note();
          note.pitch = p + MIN_PITCH;
          note.instrument = v;
          note.quantizedStartStep = s;
          note.quantizedEndStep = s + 1;
          notes.push(note);
        }
      }
    }
  }
  sequence.notes = notes;
  sequence.totalQuantizedSteps = notes[notes.length - 1].quantizedEndStep;
  return sequence;
}

/**
 * Converts a `NoteSequence` to a pianoroll representation. Note that
 * this pianoroll representation can't distinguish between
 * multiple eighth notes and held notes, so that information will be lost.
 *
 * @param ns A `NoteSequence` containing a melody.
 * @returns A Tensor of shape `[numberOfSteps][NUM_PITCHES][NUM_VOICES]`
 * where each entry represents an instrument being played at a particular
 * step and for a particular pitch. For example,
 * `pianoroll[0][64] = [0, 0, 1, 0]` means that the third instrument plays
 * pitch 64 at time 0.
 */
export function sequenceToPianoroll(
    ns: INoteSequence, numberOfSteps: number): tf.Tensor4D {
  const pianoroll = buildEmptyPianoroll(numberOfSteps);
  const notes = ns.notes;
  notes.forEach(note => {
    const pitchIndex = note.pitch - MIN_PITCH;
    const stepIndex = note.quantizedStartStep;
    const duration = note.quantizedEndStep - note.quantizedStartStep;
    const voice = note.instrument;

    if (voice < 0 || voice > 3) {
      throw new Error(`Found invalid voice ${voice}. Skipping.`);
    } else {
      for (let i = stepIndex; i < stepIndex + duration; i++) {
        pianoroll[i][pitchIndex][voice] = 1;
      }
    }
  });
  return tf.tensor([pianoroll]);
}

/**
 * Creates an empty 3D pianoroll of shape `[numberOfSteps][NUM_PITCHES][4]`.
 * @param numberOfSteps The size of the first dimension, representing the number
 * of steps in the sequence.
 * @returns The initialized pianoroll.
 */
function buildEmptyPianoroll(numberOfSteps: number) {
  const pianoroll = [];
  for (let stepIndex = 0; stepIndex < numberOfSteps; stepIndex++) {
    const step = [];
    for (; step.push([0, 0, 0, 0]) < NUM_PITCHES;) {
    }
    pianoroll.push(step);
  }
  return pianoroll;
}
