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

import {logging, sequences} from '..';
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
 * @param pianoroll Array of shape `[steps][NUM_PITCHES][NUM_VOICES]`,
 * where each entry represents an instrument being played at a particular step
 * and for a particular pitch. For example, `pianoroll[0][64] =[0, 0, 1, 0]`
 * means that the third instrument plays pitch 64 at time 0.
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
  sequence.quantizationInfo = {stepsPerQuarter: 4};
  return sequence;
}

/**
 * Converts a `NoteSequence` to a pianoroll representation. Note that
 * this pianoroll representation can't distinguish between
 * multiple eighth notes and held notes, so that information will be lost.
 *
 * @param ns A `NoteSequence`.
 * @returns A Tensor of shape `[numberOfSteps][NUM_PITCHES][NUM_VOICES]`
 * where each entry represents an instrument being played at a particular
 * step and for a particular pitch. For example,
 * `pianoroll[0][64] = [0, 0, 1, 0]` means that the third instrument plays
 * pitch 64 at time 0. Instruments 0-4 represent "voices": 0 is Soprano,
 * 1 is Alto, 2 Tenor and 3 Bass. Any instruments outside of this range are
 * ignored.
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
      for (let i = stepIndex; i < stepIndex + duration; i++) {
        pianoroll[i][pitchIndex][voice] = 1;
      }
    }
  });
  return tf.tensor([pianoroll]);
}

/**
 * Replace a voice in a `NoteSequence` sequence with a different voice.
 * @param sequence The `NoteSequence` to be changed.
 * @param originalVoice The `NoteSequence` that will replace the notes in
 * `sequence` with the same instrument.
 * @return a new `NoteSequence` with sustained notes merged, and a voice
 * replaced.
 */
export function replaceVoice(
    sequence: INoteSequence, originalVoice: INoteSequence): NoteSequence {
  const output = mergeHeldNotes(sequence);
  const newNotes = [];
  const voice = originalVoice.notes[0].instrument;
  let hasReplacedVoice = false;

  for (let i = 0; i < output.notes.length; i++) {
    if (output.notes[i].instrument === voice && !hasReplacedVoice) {
      hasReplacedVoice = true;
      for (let i = 0; i < originalVoice.notes.length; i++) {
        const note = new NoteSequence.Note();
        note.pitch = originalVoice.notes[i].pitch;
        note.velocity = originalVoice.notes[i].velocity;
        note.instrument = originalVoice.notes[i].instrument;
        note.program = originalVoice.notes[i].program;
        note.isDrum = originalVoice.notes[i].isDrum;
        note.quantizedStartStep = originalVoice.notes[i].quantizedStartStep;
        note.quantizedEndStep = originalVoice.notes[i].quantizedEndStep;
        newNotes.push(note);
      }
    } else if (output.notes[i].instrument !== voice) {
      newNotes.push(output.notes[i]);
    }
  }
  output.notes = newNotes;
  return output;
}

/**
 * Any consecutive notes of the same pitch are merged into a sustained note.
 * Does not merge notes that connect on a measure boundary. This process
 * also rearranges the order of the notes - notes are grouped by instrument,
 * then ordered by timestamp.
 *
 * @param sequence The `NoteSequence` to be merged.
 * @return a new `NoteSequence` with sustained notes merged.
 */
export function mergeHeldNotes(sequence: INoteSequence) {
  const output = sequences.clone(sequence);
  output.notes = [];

  // Sort the input notes.
  const newNotes = sequence.notes.sort((a, b) => {
    const voiceCompare = a.instrument - b.instrument;
    if (voiceCompare) {
      return voiceCompare;
    }
    return a.quantizedStartStep - b.quantizedStartStep;
  });

  // Start with the first note.
  const note = new NoteSequence.Note();
  note.pitch = newNotes[0].pitch;
  note.instrument = newNotes[0].instrument;
  note.quantizedStartStep = newNotes[0].quantizedStartStep;
  note.quantizedEndStep = newNotes[0].quantizedEndStep;
  output.notes.push(note);
  let o = 0;

  for (let i = 1; i < newNotes.length; i++) {
    const thisNote = newNotes[i];
    const previousNote = output.notes[o];
    // Compare next note's start time with previous note's end time.
    if (previousNote.instrument === thisNote.instrument &&
        previousNote.pitch === thisNote.pitch &&
        thisNote.quantizedStartStep === previousNote.quantizedEndStep &&
        // Doesn't start on the measure boundary.
        thisNote.quantizedStartStep % 16 !== 0) {
      // If the next note has the same pitch as this note and starts at the
      // same time as the previous note ends, absorb the next note into the
      // previous output note.
      output.notes[o].quantizedEndStep +=
          thisNote.quantizedEndStep - thisNote.quantizedStartStep;
    } else {
      // Otherwise, append the next note to the output notes.
      const note = new NoteSequence.Note();
      note.pitch = newNotes[i].pitch;
      note.instrument = newNotes[i].instrument;
      note.quantizedStartStep = newNotes[i].quantizedStartStep;
      note.quantizedEndStep = newNotes[i].quantizedEndStep;
      output.notes.push(note);
      o++;
    }
  }
  return output;
}
