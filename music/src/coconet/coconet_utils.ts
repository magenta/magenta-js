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
import * as tf from '@tensorflow/tfjs-core';

import * as logging from '../core/logging';
import {INoteSequence, NoteSequence} from '../protobuf';

export const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

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
 * and held notes, the resulting `NoteSequence` won't either.
 *
 * @param pianoroll Tensor of shape `[steps][NUM_PITCHES][NUM_VOICES]`,
 * where each entry represents an instrument being played at a particular step
 * and for a particular pitch. For example, `pianoroll[0][64] =[0, 0, 1, 0]`
 * means that the third instrument plays pitch 64 at time 0.
 * @param numberOfSteps The number of quantized steps in the sequence.
 * @returns A `NoteSequence`.
 */
export function pianorollToSequence(
    pianoroll: tf.Tensor4D, numberOfSteps: number): NoteSequence {
  // First reshape the flat tensor so that it's shaped [steps][NUM_PITCHES][4].
  const reshaped = tf.tidy(
      () => pianoroll.reshape([numberOfSteps, NUM_PITCHES, NUM_VOICES])
                .arraySync() as number[][][]);
  const sequence = NoteSequence.create();
  const notes: NoteSequence.Note[] = [];

  for (let s = 0; s < numberOfSteps; s++) {
    for (let p = 0; p < NUM_PITCHES; p++) {
      for (let v = 0; v < NUM_VOICES; v++) {
        const value = reshaped[s][p][v];
        // If this note is on, then it's being played by a voice and
        // it should be added to the note sequence.
        if (value === 1.0) {
          const note = NoteSequence.Note.create({
            pitch: p + MIN_PITCH,
            instrument: v,
            quantizedStartStep: s,
            quantizedEndStep: s + 1
          });
          notes.push(note);
        }
      }
    }
  }
  sequence.notes = notes;
  sequence.totalQuantizedSteps = notes[notes.length - 1].quantizedEndStep;
  sequence.quantizationInfo = {stepsPerQuarter: 4};
  return sequence;
}

/**
 * Converts a `NoteSequence` to a pianoroll representation. This sequence
 * needs to contain notes with a valid set of instruments, representing the
 * voices in a Bach harmony: 0 is Soprano, 1 is Alto, 2 Tenor and 3 Bass. Any
 * notes with instruments outside of this range are ignored. Note that this
 * pianoroll representation can't distinguish between multiple eighth notes and
 * held notes, so that information will be lost.
 *
 * @param ns A quantized `NoteSequence` with at least one note.
 * @param numberOfSteps The number of quantized steps in the sequence.
 * @returns A Tensor of shape `[numberOfSteps][NUM_PITCHES][NUM_VOICES]`
 * where each entry represents an instrument being played at a particular
 * step and for a particular pitch. For example,
 * `pianoroll[0][64] = [0, 0, 1, 0]` means that the third instrument plays
 * pitch 64 at time 0.
 */
export function sequenceToPianoroll(
    ns: INoteSequence, numberOfSteps: number): tf.Tensor4D {
  const pianoroll = tf.tidy(
      () => tf.zeros([numberOfSteps, NUM_PITCHES, NUM_VOICES]).arraySync() as
          number[][][]);
  const notes = ns.notes;
  notes.forEach(note => {
    const pitchIndex = note.pitch - MIN_PITCH;
    const stepIndex = note.quantizedStartStep;
    const duration = note.quantizedEndStep - note.quantizedStartStep;
    const voice = note.instrument;

    if (voice < 0 || voice >= NUM_VOICES) {
      logging.log(
          `Found invalid voice ${voice}. Skipping.`, 'Coconet',
          logging.Level.WARN);
    } else {
      if (stepIndex + duration > numberOfSteps) {
        throw new Error(
            `NoteSequence ${ns.id} has notes that are longer than the sequence's
          totalQuantizedSteps.`);
      }
      for (let i = stepIndex; i < stepIndex + duration; i++) {
        pianoroll[i][pitchIndex][voice] = 1;
      }
    }
  });
  return tf.tensor([pianoroll]);
}
