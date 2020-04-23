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
  readonly events: Int32Array;
  readonly minPitch: number;
  readonly maxPitch: number;

  constructor(events: Int32Array, minPitch: number, maxPitch: number) {
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
