
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

export const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
export const DURATION_STEPS = 32;
// The length of the pitch array in Pianoroll.
export const NUM_PITCHES = 46;
// The pitch array in Pianoroll is shifted so that index 0 is MIN_PITCH.
export const MIN_PITCH = 36;

/**
 * Converts a pianoroll representation to a `NoteSequence`.
 *
 * @param pianoroll Array of shape `[steps][NUM_PITCHES][4]`, where each entry
 * represents an instrument being played at a particular step and for
 * a particular pitch. For example, `pianoroll[0][64] =[0, 0, 1, 0]` means
 * that the third instrument plays pitch 64 at time 0.
 * @returns A `NoteSequence` containing the melody.
 */
export function pianorollToSequence(pianoroll: number[][][]): NoteSequence {
  const sequence = NoteSequence.create();
  // tslint:disable-next-line:no-any
  const notes: any = [];
  pianoroll.forEach((step: number[][], stepIndex) => {
    step.forEach((pitch, pitchIndex) => {
      pitch.forEach((voice: number, voiceIndex: number) => {
        if (voice === 1.0) {
          notes.push({
            pitch: pitchIndex + MIN_PITCH,
            instrument: voiceIndex,
            quantizedStartStep: stepIndex,
            quantizedEndStep: stepIndex + 1
          });
        }
      });
    });
  });
  sequence.notes = notes;
  return sequence;
}

/**
 * Converts a `NoteSequence` to a pianoroll representation.
 *
 * @param ns A `NoteSequence` containing a melody.
 * @returns An array of shape `[numberOfSteps][NUM_PITCHES][4]` where each entry
 * represents an instrument being played at a particular step and for
 * a particular pitch. For example, `pianoroll[0][64] =[0, 0, 1, 0]` means
 * that the third instrument plays pitch 64 at time 0.
 */
export function sequenceToPianoroll(
    ns: INoteSequence, numberOfSteps: number): number[][][] {
  const pianoroll = buildEmptyPianoroll(numberOfSteps);
  const notes = ns.notes;
  notes.forEach(note => {
    const pitchIndex = note.pitch - MIN_PITCH;
    const stepIndex = note.quantizedStartStep;
    const duration = note.quantizedEndStep - note.quantizedStartStep;
    // Assume that input sequences are always on the first voice.
    const voiceIndex = 0;
    for (let i = stepIndex; i < stepIndex + duration; i++) {
      pianoroll[i][pitchIndex][voiceIndex] = 1;
    }
  });
  return pianoroll;
}

/**
 * Reshapes a 1D array of size `[numberOfSteps * NUM_PITCHES * 4]` into a
 * 3D pianoroll of shape `[numberOfSteps][NUM_PITCHES][4]`.
 * @param flatArray The 1D input array.
 * @param numberOfSteps The size of the first dimension, representing the number
 * of steps in the melody.
 * @returns A reshaped array with shape `[steps][pitches][4]`.
 */
export function flatArrayToPianoroll(
    flatArray: number[], numberOfSteps: number): number[][][] {
  const pianoroll = [];
  for (let stepIndex = 0; stepIndex < numberOfSteps; stepIndex++) {
    const step = [];
    for (let pitchIndex = 0; pitchIndex < NUM_PITCHES; pitchIndex++) {
      const index = stepIndex * NUM_PITCHES * 4 + pitchIndex * 4;
      step.push(flatArray.slice(index, index + 4));
    }
    pianoroll.push(step);
  }
  return pianoroll;
}

/**
 * Creates an empty 3D pianoroll of shape `[numberOfSteps][NUM_PITCHES][4]`.
 * @param numberOfSteps The size of the first dimension, representing the number
 * of steps in the melody.
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
