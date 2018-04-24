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

import {INoteSequence, NoteSequence} from '../protobuf/index';
import * as constants from './constants';

/**
 * Start a new note.
 */
export interface NoteOn {
  type: 'note-on';
  pitch: number;
}

/**
 * End an active note.
 */
export interface NoteOff {
  type: 'note-off';
  pitch: number;
}

/**
 * Move current time forward.
 */
export interface TimeShift {
  type: 'time-shift';
  steps: number;
}

/**
 * Change velocity applied to subsequent notes.
 */
export interface VelocityChange {
  type: 'velocity-change';
  velocityBin: number;
}

export type PerformanceEvent = NoteOn|NoteOff|TimeShift|VelocityChange;

/**
 * Performance representation with variable step size, consisting of a sequence
 * of `NoteOn`, `NoteOff`, `TimeShift`, and `VelocityChange` events.
 *
 * @param events An array of performance events.
 * @param maxShiftSteps Number of steps in the maximum time shift.
 * @param numVelocityBins The number of quantized MIDI velocity bins to use.
 * If zero, velocities will be ignored.
 * @param program (Optional) The MIDI program to use for these events.
 * @param isDrum (Optional) Whether or not these are drum events.
 */
export class Performance {
  readonly events: PerformanceEvent[];

  readonly maxShiftSteps: number;
  readonly numVelocityBins: number;

  readonly program?: number;
  readonly isDrum?: boolean;

  constructor(
      events: PerformanceEvent[], maxShiftSteps: number,
      numVelocityBins: number, program?: number, isDrum?: boolean) {
    this.events = events;
    this.maxShiftSteps = maxShiftSteps;
    this.numVelocityBins = numVelocityBins;

    this.program = program;
    this.isDrum = isDrum;
  }

  /**
   * Extract a performance from a `NoteSequence`.
   *
   * @param noteSequence `NoteSequence` from which to extract a performance.
   * @param maxShiftSteps Number of steps in maximum time shift.
   * @param numVelocityBins Number of velocity bins to use. If zero, ignore note
   * velocities.
   * @param instrument (Optional) Instrument to extract. If not specified,
   * extract all instruments.
   * @returns A `Performance` created from the `NoteSequence`.
   */
  static fromNoteSequence(
      noteSequence: INoteSequence, maxShiftSteps: number,
      numVelocityBins: number, instrument?: number) {
    // First extract all desired notes and sort by increasing start time and
    // (secondarily) pitch.
    const notes = noteSequence.notes.filter(
        (note, _) =>
            instrument !== undefined ? note.instrument === instrument : true);
    const sortedNotes = notes.sort(
        (a, b) => a.startTime === b.startTime ? a.pitch - b.pitch :
                                                a.startTime - b.startTime);

    // Now sort all note start and end events by quantized time step and
    // position of the note in the above list.
    const onsets = sortedNotes.map(
        (note, i) => ({step: note.quantizedStartStep, index: i, isOffset: 0}));
    const offsets = sortedNotes.map(
        (note, i) => ({step: note.quantizedEndStep, index: i, isOffset: 1}));
    const noteEvents = onsets.concat(offsets).sort(
        (a, b) => a.step === b.step ?
            (a.index === b.index ? a.isOffset - b.isOffset :
                                   a.index - b.index) :
            a.step - b.step);

    const velocityBinSize = numVelocityBins ?
        Math.ceil((constants.MIDI_VELOCITIES - 1) / numVelocityBins) :
        undefined;

    const events: PerformanceEvent[] = [];

    let currentStep = 0;
    let currentVelocityBin = numVelocityBins;

    for (const e of noteEvents) {
      if (e.step > currentStep) {
        // The next note event requires a time shift.
        while (e.step > currentStep + maxShiftSteps) {
          events.push({type: 'time-shift', steps: maxShiftSteps});
          currentStep += maxShiftSteps;
        }
        events.push({type: 'time-shift', steps: e.step - currentStep});
        currentStep = e.step;
      }

      if (e.isOffset) {
        // Turn off the note.
        events.push({type: 'note-off', pitch: sortedNotes[e.index].pitch});
      } else {
        // Before we turn on the note, we may need to change the current
        // velocity bin.
        if (velocityBinSize) {
          const velocityBin = Math.floor(
                                  (sortedNotes[e.index].velocity -
                                   constants.MIN_MIDI_VELOCITY - 1) /
                                  velocityBinSize) +
              1;
          if (velocityBin !== currentVelocityBin) {
            events.push({type: 'velocity-change', velocityBin});
            currentVelocityBin = velocityBin;
          }
        }

        // Now turn on the note.
        events.push({type: 'note-on', pitch: sortedNotes[e.index].pitch});
      }
    }

    // Determine the drum status, if consistent.
    const isDrum = notes.some(note => note.isDrum) ?
        (notes.some(note => !note.isDrum) ? undefined : true) :
        false;

    // Determine the program used, if consistent.
    const programs =
        notes.map(note => note.program).filter((p, i, a) => a.indexOf(p) === i);
    const program =
        (!isDrum && programs.length === 1) ? programs[0] : undefined;

    return new Performance(
        events, maxShiftSteps, numVelocityBins, program, isDrum);
  }

  /**
   * Convert this performance representation to `NoteSequence`.
   *
   * @param instrument Instrument value to give each note.
   * @returns A `NoteSequence` corresponding to these performance events.
   */
  toNoteSequence(instrument?: number): INoteSequence {
    const velocityBinSize = this.numVelocityBins ?
        Math.ceil((constants.MIDI_VELOCITIES - 1) / this.numVelocityBins) :
        undefined;

    const noteSequence = NoteSequence.create();

    let currentStep = 0;
    let currentVelocity = constants.MAX_MIDI_VELOCITY;

    // Initialize a map from pitch to (the start step and velocity of) all
    // active notes at that pitch. Multiple notes can be active at the same
    // pitch.
    const pitchStartStepsAndVelocities =
        new Map<number, Array<[number, number]>>();
    for (let i = constants.MIN_MIDI_PITCH; i <= constants.MAX_MIDI_PITCH; ++i) {
      pitchStartStepsAndVelocities.set(i, []);
    }

    for (const event of this.events) {
      switch (event.type) {
        case 'note-on':
          // Start a new note.
          pitchStartStepsAndVelocities.get(event.pitch).push([
            currentStep, currentVelocity
          ]);
          break;
        case 'note-off':
          // End an active note.
          const startStepsAndVelocities =
              pitchStartStepsAndVelocities.get(event.pitch);
          if (startStepsAndVelocities.length) {
            const [startStep, velocity] = startStepsAndVelocities.shift();
            if (currentStep > startStep) {
              noteSequence.notes.push(NoteSequence.Note.create({
                pitch: event.pitch,
                velocity,
                instrument,
                quantizedStartStep: startStep,
                quantizedEndStep: currentStep,
                program: this.program,
                isDrum: this.isDrum,
              }));
            } else {
              console.log(
                  'Ignoring zero-length note: ' +
                  `(pitch = ${event.pitch}, step = ${currentStep})`);
            }
          } else {
            console.log(
                'Ignoring note-off with no previous note-on:' +
                `(pitch = ${event.pitch}, step = ${currentStep})`);
          }
          break;
        case 'time-shift':
          // Shift time forward.
          currentStep += event.steps;
          break;
        case 'velocity-change':
          // Change current velocity.
          if (velocityBinSize) {
            currentVelocity = constants.MIN_MIDI_VELOCITY +
                (event.velocityBin - 1) * velocityBinSize + 1;
          } else {
            throw new Error(`Unexpected velocity change event: ${event}`);
          }
          break;
        default:
          throw new Error(`Unrecognized performance event: ${event}`);
      }
    }

    // There could be remaining pitches that were never ended. End them now
    // and create notes.
    pitchStartStepsAndVelocities.forEach((startStepsAndVelocities, pitch) => {
      for (const [startStep, velocity] of startStepsAndVelocities) {
        if (currentStep > startStep) {
          noteSequence.notes.push(NoteSequence.Note.create({
            pitch,
            velocity,
            instrument,
            quantizedStartStep: startStep,
            quantizedEndStep: currentStep,
            program: this.program,
            isDrum: this.isDrum
          }));
        } else {
          console.log(
              'Ignoring zero-length note: ' +
              `(pitch = ${pitch}, step = ${currentStep})`);
        }
      }
    });

    return noteSequence;
  }
}
