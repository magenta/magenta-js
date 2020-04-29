/**
 * Module containing functions for converting to and from quantized melodies.
 *
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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

/**
 * Imports
 */
import * as tf from '@tensorflow/tfjs';
import {INoteSequence, NoteSequence} from '../protobuf/index';

import * as sequences from './sequences';

export const NO_EVENT = 0;
export const NOTE_OFF = 1;
const FIRST_PITCH = 2;

/**
 * Melody representation as an array of integers: 0 for `NO_EVENT` (sustain), 1
 * for `NOTE_OFF`, and 2+ for note onsets at pitches between `minPitch` and
 * `maxPitch`.  Each position in the array corresponds to a fixed length of
 * time.  So, `[2, 4, 6, 7, 9, 11, 13, 14, 0, 0, 0, 1]` represents a major scale
 * where the final note is held for 4 time steps then released.
 *
 * @param events An array of melody events.
 * @param minPitch The minimum pitch to represent.
 * @param maxPitch The maximum pitch to represent.
 *
 */
export class Melody {
  readonly events: ArrayLike<number>;
  readonly minPitch: number;
  readonly maxPitch: number;

  constructor(events: ArrayLike<number>, minPitch: number, maxPitch: number) {
    this.events = events;
    this.minPitch = minPitch;
    this.maxPitch = maxPitch;
  }

  /**
   * Extract a melody from a `NoteSequence`.
   *
   * @param noteSequence `NoteSequence` from which to extract a melody.
   * @param minPitch The minimum pitch to represent. Those above this value will
   * cause an error to be thrown.
   * @param maxPitch The maximum pitch to represent. Those above this value will
   * cause an error to be thrown.
   * @param ignorePolyphony If false, an error will be raised when notes start
   * at the same step. If true, the highest pitched note is used and others are
   * ignored.
   * @param numSteps The length of each sequence.
   * @returns A `Melody` created from the `NoteSequence`.
   */
  static fromNoteSequence(
      noteSequence: INoteSequence, minPitch: number, maxPitch: number,
      ignorePolyphony = false, numSteps?: number) {
    sequences.assertIsQuantizedSequence(noteSequence);
    // Sort by note start times, and secondarily by pitch descending.
    const sortedNotes: NoteSequence.INote[] =
        noteSequence.notes.sort((n1, n2) => {
          if (n1.quantizedStartStep === n2.quantizedStartStep) {
            return n2.pitch - n1.pitch;
          }
          return n1.quantizedStartStep - n2.quantizedStartStep;
        });
    const events = new Int32Array(numSteps || noteSequence.totalQuantizedSteps);
    let lastStart = -1;
    sortedNotes.forEach(n => {
      if (n.quantizedStartStep === lastStart) {
        if (!ignorePolyphony) {
          throw new Error('`NoteSequence` is not monophonic.');
        } else {
          // Keep highest note.
          // Notes are sorted by pitch descending, so if a note is already at
          // this position its the highest pitch.
          return;
        }
      }
      if (n.pitch < minPitch || n.pitch > maxPitch) {
        throw Error(
            '`NoteSequence` has a pitch outside of the valid range: ' +
            `${n.pitch}`);
      }
      events[n.quantizedStartStep] = n.pitch - minPitch + FIRST_PITCH;
      events[n.quantizedEndStep] = NOTE_OFF;
      lastStart = n.quantizedStartStep;
    });
    return new Melody(events, minPitch, maxPitch);
  }

  /**
   * Convert a melody to quantized NoteSequence.
   *
   * @param stepsPerQuarter Optional number of steps per quarter note.
   * @param qpm Optional number of quarter notes per minute.
   * @returns A quantized `NoteSequence` created from the `Melody`.
   */
  toNoteSequence(stepsPerQuarter?: number, qpm?: number): NoteSequence {
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
    let currNote: NoteSequence.Note = null;
    for (let s = 0; s < this.events.length; ++s) {  // step
      const event = this.events[s];
      switch (event) {
        case NO_EVENT:
          break;
        case NOTE_OFF:
          if (currNote) {
            currNote.quantizedEndStep = s;
            noteSequence.notes.push(currNote);
            currNote = null;
          }
          break;
        default:
          if (currNote) {
            currNote.quantizedEndStep = s;
            noteSequence.notes.push(currNote);
          }
          currNote = NoteSequence.Note.create({
            pitch: event - FIRST_PITCH + this.minPitch,
            quantizedStartStep: s
          });
      }
    }
    if (currNote) {
      currNote.quantizedEndStep = this.events.length;
      noteSequence.notes.push(currNote);
    }
    noteSequence.totalQuantizedSteps = this.events.length;
    return noteSequence;
  }
}

/**
 * MelodyControl interface for extracting control signals from melodies. These
 * control signals can be used as conditioning for melody generation, or can
 * themselves be generated.
 *
 * @param depth The dimension of the control signal at each step.
 */
export interface MelodyControl {
  readonly depth: number;
  extract(melody: Melody): tf.Tensor2D;
}

/**
 * Rhythm control signal. Extracts a depth-1 tensor indicating note onsets.
 */
export class MelodyRhythm implements MelodyControl {
  readonly depth = 1;

  /**
   * Extract the rhythm from a Melody object.
   *
   * @param melody Melody object from which to extract rhythm.
   * @returns An n-by-1 2D tensor containing the melody rhythm, with 1 in steps
   * with a note onset and 0 elsewhere.
   */
  extract(melody: Melody) {
    const numSteps = melody.events.length;
    const buffer = tf.buffer([numSteps, 1]);
    for (let step = 0; step < numSteps; ++step) {
      buffer.set(melody.events[step] >= FIRST_PITCH ? 1 : 0, step, 0);
    }
    return buffer.toTensor().as2D(numSteps, 1);
  }
}

/**
 * Melodic shape control signal. Extracts a depth-3 tensor representing a
 * melodic contour as a Parsons code, a sequence of {up, down, same} values
 * corresponding to the pitch interval direction. We use a one-hot encoding,
 * where 0 = down, 1 = same, and 2 = up.
 */
export class MelodyShape implements MelodyControl {
  readonly depth = 3;

  /**
   * Extract the melodic shape from a Melody object.
   *
   * @param melody Melody object from which to extract shape.
   * @returns An n-by-3 2D tensor containing the melodic shape as one-hot
   * Parsons code.
   */
  extract(melody: Melody) {
    const numSteps = melody.events.length;
    const buffer = tf.buffer([numSteps, 3]);

    let lastIndex = null;
    let lastPitch = null;

    for (let step = 0; step < numSteps; ++step) {
      if (melody.events[step] >= FIRST_PITCH) {
        if (lastIndex !== null) {
          if (buffer.get(lastIndex, 0) === 0 &&
              buffer.get(lastIndex, 1) === 0 &&
              buffer.get(lastIndex, 2) === 0) {
            // This is the first time contour direction has been established, so
            // propagate that direction back to the beginning of the melody.
            lastIndex = -1;
          }
          let direction: number;
          if (melody.events[step] < lastPitch) {
            direction = 0;  // down
          } else if (melody.events[step] > lastPitch) {
            direction = 2;  // up
          } else {
            direction = 1;  // flat
          }
          // Fill in a 'linear' contour.
          for (let i = step; i > lastIndex; --i) {
            buffer.set(1, i, direction);
          }
        }
        lastIndex = step;
        lastPitch = melody.events[step];
      }
    }

    // Handle the final contour segment.
    if (lastIndex !== numSteps - 1) {
      if ((lastIndex === null) ||
          (buffer.get(lastIndex, 0) === 0 && buffer.get(lastIndex, 1) === 0 &&
           buffer.get(lastIndex, 2) === 0)) {
        // There were zero or one notes, make this a flat contour.
        for (let i = 0; i < numSteps; ++i) {
          buffer.set(1, i, 1);
        }
      } else {
        // Just continue whatever the final contour direction was.
        for (let i = numSteps - 1; i > lastIndex; --i) {
          for (let j = 0; j < 3; j++) {
            buffer.set(buffer.get(lastIndex, j), i, j);
          }
        }
      }
    }

    return buffer.toTensor().as2D(numSteps, 3);
  }
}
