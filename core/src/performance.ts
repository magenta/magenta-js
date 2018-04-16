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

import {tensorflow} from '@magenta/protobuf';
import * as constants from './constants';
import NoteSequence = tensorflow.magenta.NoteSequence;
import INoteSequence = tensorflow.magenta.INoteSequence;

/**
 * Start a new note.
 */
export interface NoteOn {
  kind: 'note-on';
  pitch: number;
}

/**
 * End an active note.
 */
export interface NoteOff {
  kind: 'note-off';
  pitch: number;
}

/**
 * Move current time forward.
 */
export interface TimeShift {
  kind: 'time-shift';
  steps: number;
}

/**
 * Change velocity applied to subsequent notes.
 */
export interface VelocityChange {
  kind: 'velocity-change';
  velocityBin: number;
}

export type PerformanceEvent = NoteOn | NoteOff | TimeShift | VelocityChange;

/**
 * Performance representation with variable step size, consisting of a sequence
 * of `NoteOn`, `NoteOff`, `TimeShift`, and `VelocityChange` events.
 *
 * @param events An array of performance events.
 * @param numVelocityBins (Optional) The number of quantized MIDI velocity bins
 * to use. If not specified, velocities will be ignored.
 * @param program (Optional) The MIDI program to use for these events.
 * @param isDrum (Optional) Whether or not these are drum events.
 */
export class Performance {
  readonly events: PerformanceEvent[];

  readonly numVelocityBins?: number;
  readonly velocityBinSize?: number;
  readonly velocityToBin?: (v: number) => number;
  readonly binToVelocity?: (b: number) => number;

  readonly program?: number;
  readonly isDrum?: boolean;

  constructor(
      events: PerformanceEvent[], numVelocityBins?: number, program?: number,
      isDrum?: boolean) {
    this.events = events;

    if (numVelocityBins) {
      this.numVelocityBins = numVelocityBins;
      this.velocityBinSize =
          Math.ceil((constants.MIDI_VELOCITIES - 1) / this.numVelocityBins);
      this.velocityToBin = v =>
          Math.floor(
              (v - constants.MIN_MIDI_VELOCITY - 1) / this.velocityBinSize) +
          1;
      this.binToVelocity = b =>
          constants.MIN_MIDI_VELOCITY + (b - 1) * this.velocityBinSize + 1;
    }

    this.program = program;
    this.isDrum = isDrum;
  }

  /**
   * Convert this performance representation to `NoteSequence`.
   *
   * @param instrument MIDI instrument to give each note.
   * @returns A `NoteSequence` corresponding to these performance events.
   */
  toNoteSequence(instrument?: number): INoteSequence {
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
      switch (event.kind) {
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
          if (this.binToVelocity) {
            currentVelocity = this.binToVelocity(event.velocityBin);
          } else {
            throw new TypeError(`Unexpected velocity change event: ${event}`);
          }
          break;
        default:
          throw new TypeError(`Unrecognized performance event: ${event}`);
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
