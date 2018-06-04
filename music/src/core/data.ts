/**
 * Module containing functionality for creating and using `DataConverter`
 * objects that convert between tensors and `NoteSequence`s. A `DataConverter`
 * is created from a `ConverterSpec` (typically read from JSON) that specifies
 * the converter type and optional arguments.
 *
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

/**
 * Imports
 */
import * as tf from '@tensorflow/tfjs-core';
import {isNullOrUndefined} from 'util';

import {INoteSequence, NoteSequence} from '../protobuf/index';

import * as constants from './constants';
import * as performance from './performance';
import * as sequences from './sequences';

export const DEFAULT_DRUM_PITCH_CLASSES: number[][] = [
  // bass drum
  [36, 35],
  // snare drum
  [38, 27, 28, 31, 32, 33, 34, 37, 39, 40, 56, 65, 66, 75, 85],
  // closed hi-hat
  [42, 44, 54, 68, 69, 70, 71, 73, 78, 80],
  // open hi-hat
  [46, 67, 72, 74, 79, 81],
  // low tom
  [45, 29, 41, 61, 64, 84],
  // mid tom
  [48, 47, 60, 63, 77, 86, 87],
  // high tom
  [50, 30, 43, 62, 76, 83],
  // crash cymbal
  [49, 55, 57, 58],
  // ride cymbal
  [51, 52, 53, 59, 82] /*,
  // lo-click
  [89],
  // hi-click
  [90]
                        */
];

export interface MelodyConverterSpec {
  type: 'MelodyConverter';
  args: MelodyConverterArgs;
}
export interface DrumsConverterSpec {
  type: 'DrumsConverter';
  args: DrumsConverterArgs;
}
export interface DrumRollConverterSpec {
  type: 'DrumRollConverter';
  args: DrumsConverterArgs;
}
export interface TrioConverterSpec {
  type: 'TrioConverter';
  args: TrioConverterArgs;
}
export interface DrumsOneHotConverterSpec {
  type: 'DrumsOneHotConverter';
  args: DrumsConverterArgs;
}
export interface MultitrackConverterSpec {
  type: 'MultitrackConverter';
  args: MultitrackConverterArgs;
}

/**
 * Interface for JSON specification of a `DataConverter`.
 *
 * @property type The name of the `DataConverter` class.
 * @property args Map containing values for argments to the constructor of the
 * `DataConverter` class specified above.
 */
export type ConverterSpec =
    MelodyConverterSpec|DrumsConverterSpec|DrumRollConverterSpec|
    TrioConverterSpec|DrumsOneHotConverterSpec|MultitrackConverterSpec;

/**
 * Builds a `DataConverter` based on the given `ConverterSpec`.
 *
 * @param spec Specifies the `DataConverter` to build.
 * @returns A new `DataConverter` object based on `spec`.
 */
export function converterFromSpec(spec: ConverterSpec): DataConverter {
  switch (spec.type) {
    case 'MelodyConverter':
      return new MelodyConverter(spec.args);
    case 'DrumsConverter':
      return new DrumsConverter(spec.args);
    case 'DrumRollConverter':
      return new DrumRollConverter(spec.args);
    case 'TrioConverter':
      return new TrioConverter(spec.args);
    case 'DrumsOneHotConverter':
      return new DrumsOneHotConverter(spec.args);
    case 'MultitrackConverter':
      return new MultitrackConverter(spec.args);
    default:
      throw new Error(`Unknown DataConverter type: ${spec}`);
  }
}

/**
 * Constructor arguments shared by all `DataConverter`s.
 *
 * @param numSteps The length of each sequence.
 * @param numSegments (Optional) The number of conductor segments, if
 * applicable.
 */
export interface BaseConverterArgs {
  numSteps?: number;
  numSegments?: number;
}

/**
 * Abstract DataConverter class for converting between `Tensor` and
 * `NoteSequence` objects. Each subclass handles a particular type of musical
 * sequence e.g. monophonic melody or (a few different representations of) drum
 * track.
 */
export abstract class DataConverter {
  readonly numSteps: number;                 // Total length of sequences.
  readonly numSegments: number;              // Number of steps for conductor.
  abstract readonly depth: number;           // Size of final output dimension.
  abstract readonly endTensor: tf.Tensor1D;  // Tensor marking segment end.
  abstract readonly NUM_SPLITS: number;  // Const number of conductor splits.
  abstract readonly SEGMENTED_BY_TRACK: boolean;  // Segments are tracks.
  abstract toTensor(noteSequence: INoteSequence): tf.Tensor2D;
  abstract async toNoteSequence(tensor: tf.Tensor2D, stepsPerQuarter: number):
      Promise<INoteSequence>;

  constructor(args: BaseConverterArgs) {
    this.numSteps = args.numSteps;
    this.numSegments = args.numSegments;
  }

  tensorSteps(tensor: tf.Tensor2D): tf.Scalar {
    return tf.scalar(tensor.shape[0], 'int32');
  }
}

/**
 * Converts between a quantized `NoteSequence` containing a drum sequence
 * and the `Tensor` objects used by `MusicVAE`.
 *
 * The `Tensor` output by `toTensor` is a 2D "drum roll" format. Each
 * row is a time step, and each column (up to the final) is a vector of Booleans
 * representing whether a drum from the associated pitch class is being hit at
 * that time. The final column is a Boolean computed by taking a NOR of the
 * other columns in the row.
 *
 * The expected `Tensor` in `toNoteSequence` is a one-hot encoding of labels
 * generated by converting the bit string from the input (excluding the final
 * bit) to an integer.
 *
 * The output `NoteSequence` uses quantized time and only the first pitch in
 * pitch class are used.
 *
 * @param numSteps The length of each sequence.
 * @param numSegments (Optional) The number of conductor segments, if
 * applicable.
 * @param pitchClasses (Optional) An array of arrays, grouping together MIDI
 * pitches to treat as the same drum. The first pitch in each class will be used
 * in the `NoteSequence` returned by `toNoteSequence`. A default mapping to 9
 * classes is used if not provided.
 */
export interface DrumsConverterArgs extends BaseConverterArgs {
  pitchClasses?: number[][];
}
export class DrumsConverter extends DataConverter {
  readonly pitchClasses: number[][];
  readonly pitchToClass: Map<number, number>;
  readonly NUM_SPLITS = 0;              // const
  readonly SEGMENTED_BY_TRACK = false;  // const
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  constructor(args: DrumsConverterArgs) {
    super(args);
    this.pitchClasses = isNullOrUndefined(args.pitchClasses) ?
        DEFAULT_DRUM_PITCH_CLASSES :
        args.pitchClasses;
    this.pitchToClass = new Map<number, number>();
    for (let c = 0; c < this.pitchClasses.length; ++c) {  // class
      this.pitchClasses[c].forEach((p) => {
        this.pitchToClass.set(p, c);
      });
    }
    // We also add two extra pitches for the click-track.
    // lo-click.
    this.pitchToClass.set(89, this.pitchClasses.length + 1);
    // hi-click.
    this.pitchToClass.set(90, this.pitchClasses.length + 2);
    this.depth = this.pitchClasses.length;
  }

  toTensor(noteSequence: INoteSequence) {
    sequences.assertIsQuantizedSequence(noteSequence);
    const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
    const drumRoll = tf.buffer([numSteps, this.pitchClasses.length + 1]);
    // Set final values to 1 and change to 0 later if the column gets a note.
    for (let i = 0; i < numSteps; ++i) {
      drumRoll.set(1, i, -1);
    }
    noteSequence.notes.forEach((note) => {
      drumRoll.set(
          1, note.quantizedStartStep, this.pitchToClass.get(note.pitch));
      drumRoll.set(0, note.quantizedStartStep, -1);
    });
    return drumRoll.toTensor() as tf.Tensor2D;
  }

  async toNoteSequence(
      oh: tf.Tensor2D,
      stepsPerQuarter = constants.DEFAULT_QUARTERS_PER_MINUTE) {
    const noteSequence = NoteSequence.create();
    noteSequence.quantizationInfo =
        NoteSequence.QuantizationInfo.create({stepsPerQuarter});
    const labelsTensor = oh.argMax(1);
    const labels: Int32Array = await labelsTensor.data() as Int32Array;
    labelsTensor.dispose();
    for (let s = 0; s < labels.length; ++s) {               // step
      for (let p = 0; p < this.pitchClasses.length; p++) {  // pitch class
        if (labels[s] >> p & 1) {
          noteSequence.notes.push(NoteSequence.Note.create({
            pitch: this.pitchClasses[p][0],
            quantizedStartStep: s,
            quantizedEndStep: s + 1,
            isDrum: true
          }));
        }
      }
    }
    return noteSequence;
  }
}

/**
 * Converts between a quantized `NoteSequence` containing a drum sequence
 * and the `Tensor` objects used by `MusicVAE`.
 *
 * The `Tensor` output by `toTensor` is the same 2D "drum roll" as in
 * `DrumsConverter`.
 *
 * The expected `Tensor` in `toNoteSequence` is the same as the "drum roll",
 * excluding the final NOR column.
 *
 * The output `NoteSequence` uses quantized time and only the first pitch in
 * pitch class are used.
 */
export class DrumRollConverter extends DrumsConverter {
  async toNoteSequence(
      roll: tf.Tensor2D,
      stepsPerQuarter = constants.DEFAULT_QUARTERS_PER_MINUTE) {
    const noteSequence = NoteSequence.create();
    noteSequence.quantizationInfo =
        NoteSequence.QuantizationInfo.create({stepsPerQuarter});
    const rollSplit = tf.split(roll, roll.shape[0]);
    for (let s = 0; s < roll.shape[0]; ++s) {  // step
      const pitches = await rollSplit[s].data() as Uint8Array;
      rollSplit[s].dispose();
      for (let p = 0; p < pitches.length; ++p) {  // pitch class
        if (pitches[p]) {
          noteSequence.notes.push(NoteSequence.Note.create({
            pitch: this.pitchClasses[p][0],
            quantizedStartStep: s,
            quantizedEndStep: s + 1,
            isDrum: true
          }));
        }
      }
    }
    return noteSequence;
  }
}

/**
 * Converts between a quantized `NoteSequence` containing a drum sequence
 * and the `Tensor` objects used by `MusicRNN`.
 *
 * The `Tensor` output by `toTensor` is a 2D one-hot encoding. Each
 * row is a time step, and each column is a one-hot vector where each drum
 * combination is mapped to a single bit of a binary integer representation,
 * where the bit has value 0 if the drum combination is not present, and 1 if
 * it is present.
 *
 * The expected `Tensor` in `toNoteSequence` is the same kind of one-hot
 * encoding as the `Tensor` output by `toTensor`.
 *
 * The output `NoteSequence` uses quantized time and only the first pitch in
 * pitch class are used.
 *
 */
export class DrumsOneHotConverter extends DrumsConverter {
  readonly depth: number;

  constructor(args: DrumsConverterArgs) {
    super(args);
    this.depth = Math.pow(2, this.pitchClasses.length);
  }

  toTensor(noteSequence: INoteSequence) {
    sequences.assertIsRelativeQuantizedSequence(noteSequence);
    const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
    const labels = Array<number>(numSteps).fill(0);
    for (const {pitch, quantizedStartStep} of noteSequence.notes) {
      labels[quantizedStartStep] += Math.pow(2, this.pitchToClass.get(pitch));
    }
    return tf.tidy(() => tf.oneHot(tf.tensor1d(labels, 'int32'), this.depth));
  }
}

/**
 * Converts between a monophonic, quantized `NoteSequence` containing a melody
 * and the `Tensor` objects used by `MusicVAE`.
 *
 * Melodies are represented as a sequence of categorical variables, representing
 * one of three possible events:
 *   - A non-event, i.e. holding a note or resting. (0)
 *   - A note off. (1)
 *   - A note on with a specific pitch. (> 1)
 *
 * The `Tensor` output by `toTensor` is a one-hot encoding of the sequence of
 * labels extracted from the `NoteSequence`.
 *
 * The expected `Tensor` in `toNoteSequence` is a one-hot encoding of melody
 * sequence labels like those returned by `toTensor`.
 *
 * @param numSteps The length of each sequence.
 * @param minPitch The minimum pitch to model. Those above this value will
 * cause an errot to be thrown.
 * @param maxPitch The maximum pitch to model. Those above this value will
 * cause an error to be thrown.
 * @param numSegments (Optional) The number of conductor segments, if
 * applicable.
 */
export interface MelodyConverterArgs extends BaseConverterArgs {
  minPitch: number;
  maxPitch: number;
}
export class MelodyConverter extends DataConverter {
  readonly minPitch: number;  // inclusive
  readonly maxPitch: number;  // inclusive
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  readonly NUM_SPLITS = 0;              // const
  readonly SEGMENTED_BY_TRACK = false;  // const
  readonly NOTE_OFF = 1;                // const
  readonly FIRST_PITCH = 2;             // const

  constructor(args: MelodyConverterArgs) {
    super(args);
    this.minPitch = args.minPitch;
    this.maxPitch = args.maxPitch;
    this.depth = args.maxPitch - args.minPitch + 1 + this.FIRST_PITCH;
  }

  toTensor(noteSequence: INoteSequence) {
    sequences.assertIsQuantizedSequence(noteSequence);
    const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
    const sortedNotes: NoteSequence.INote[] = noteSequence.notes.sort(
        (n1, n2) => n1.quantizedStartStep - n2.quantizedStartStep);
    const mel = tf.buffer([numSteps], 'int32');
    let lastEnd = -1;
    sortedNotes.forEach(n => {
      if (n.quantizedStartStep < lastEnd) {
        throw new Error('`NoteSequence` is not monophonic.');
      }
      if (n.pitch < this.minPitch || n.pitch > this.maxPitch) {
        throw Error(
            '`NoteSequence` has a pitch outside of the valid range: ' +
            `${n.pitch}`);
      }
      mel.set(n.pitch - this.minPitch + this.FIRST_PITCH, n.quantizedStartStep);
      mel.set(this.NOTE_OFF, n.quantizedEndStep);
      lastEnd = n.quantizedEndStep;
    });
    return tf.tidy(() => tf.oneHot(mel.toTensor() as tf.Tensor1D, this.depth));
  }

  async toNoteSequence(
      oh: tf.Tensor2D,
      stepsPerQuarter = constants.DEFAULT_QUARTERS_PER_MINUTE) {
    const noteSequence = NoteSequence.create();
    noteSequence.quantizationInfo =
        NoteSequence.QuantizationInfo.create({stepsPerQuarter});
    const labelsTensor = oh.argMax(1);
    const labels: Int32Array = await labelsTensor.data() as Int32Array;
    labelsTensor.dispose();
    let currNote: NoteSequence.Note = null;
    for (let s = 0; s < labels.length; ++s) {  // step
      const label = labels[s];
      switch (label) {
        case 0:
          break;
        case 1:
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
            pitch: label - this.FIRST_PITCH + this.minPitch,
            quantizedStartStep: s
          });
      }
    }
    if (currNote) {
      currNote.quantizedEndStep = labels.length;
      noteSequence.notes.push(currNote);
    }
    return noteSequence;
  }
}

export interface TrioConverterArgs extends BaseConverterArgs {
  melArgs: MelodyConverterArgs;
  bassArgs: MelodyConverterArgs;
  drumsArgs: DrumsConverterArgs;
}
export class TrioConverter extends DataConverter {
  melConverter: MelodyConverter;
  bassConverter: MelodyConverter;
  drumsConverter: DrumsConverter;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;
  readonly NUM_SPLITS = 3;              // const
  readonly SEGMENTED_BY_TRACK = false;  // const
  readonly MEL_PROG_RANGE = [0, 31];    // inclusive, const
  readonly BASS_PROG_RANGE = [32, 39];  // inclusive, const

  constructor(args: TrioConverterArgs) {
    super(args);
    // Copy numSteps to all converters.
    args.melArgs.numSteps = args.numSteps;
    args.bassArgs.numSteps = args.numSteps;
    args.drumsArgs.numSteps = args.numSteps;
    this.melConverter = new MelodyConverter(args.melArgs);
    this.bassConverter = new MelodyConverter(args.bassArgs);
    this.drumsConverter = new DrumsOneHotConverter(args.drumsArgs);
    this.depth =
        (this.melConverter.depth + this.bassConverter.depth +
         this.drumsConverter.depth);
  }

  toTensor(noteSequence: INoteSequence) {
    sequences.assertIsQuantizedSequence(noteSequence);
    const melSeq = sequences.clone(noteSequence);
    const bassSeq = sequences.clone(noteSequence);
    const drumsSeq = sequences.clone(noteSequence);
    melSeq.notes = noteSequence.notes.filter(
        n =>
            (!n.isDrum && n.program >= this.MEL_PROG_RANGE[0] &&
             n.program <= this.MEL_PROG_RANGE[1]));
    bassSeq.notes = noteSequence.notes.filter(
        n =>
            (!n.isDrum && n.program >= this.BASS_PROG_RANGE[0] &&
             n.program <= this.BASS_PROG_RANGE[1]));
    drumsSeq.notes = noteSequence.notes.filter(n => n.isDrum);
    return tf.tidy(
        () => tf.concat(
            [
              this.melConverter.toTensor(melSeq),
              this.bassConverter.toTensor(bassSeq),
              this.drumsConverter.toTensor(drumsSeq)
            ],
            -1));
  }

  async toNoteSequence(
      th: tf.Tensor2D,
      stepsPerQuarter = constants.DEFAULT_QUARTERS_PER_MINUTE) {
    const ohs = tf.split(
        th,
        [
          this.melConverter.depth, this.bassConverter.depth,
          this.drumsConverter.depth
        ],
        -1);
    const ns = await this.melConverter.toNoteSequence(ohs[0], stepsPerQuarter);

    ns.notes.forEach(n => {
      n.instrument = 0;
      n.program = 0;
    });
    const bassNs = await this.bassConverter.toNoteSequence(ohs[1]);
    ns.notes.push(...bassNs.notes.map(n => {
      n.instrument = 1;
      n.program = this.BASS_PROG_RANGE[0];
      return n;
    }));
    const drumsNs = await this.drumsConverter.toNoteSequence(ohs[2]);
    ns.notes.push(...drumsNs.notes.map(n => {
      n.instrument = 2;
      return n;
    }));
    ohs.forEach(oh => oh.dispose());
    return ns;
  }
}

/**
 * Converts between a quantized multitrack `NoteSequence` and `Tensor` objects
 * used by `MusicVAE`.
 *
 * Each track is represented using events from the following vocabulary:
 *   - An initial program-select event specifying which MIDI program to use.
 *   - A sequence of performance (note-on, note-off, time-shift,
 *     velocity-change) events.
 *   - An end token.
 *
 * Tracks are ordered by program number with drums at the end, then one-hot
 * encoded and padded with zeros to the maximum number of events. If fewer than
 * the maximum number of tracks are present, extra tracks consisting of only an
 * end token (then one-hot encoded and zero-padded) will be added.
 *
 * @param numSteps The total number of events used to encode each
 * `NoteSequence`.
 * @param numSegments The number of tracks to use. `NoteSequence`s with more
 * tracks will have tracks removed. `NoteSequence`s with fewer tracks will be
 * padded with empty tracks.
 * @param stepsPerQuarter The number of time steps per quarter note.
 * @param totalSteps The length of each `NoteSequence` in time steps. Longer
 * `NoteSequence`s will be truncated. Shorter `NoteSequence`s will be padded
 * with silence.
 * @param numVelocityBins The number of bins into which to quantize note
 * velocities.
 * @param minPitch (Optional) Minimum MIDI pitch to allow. Will be 0 if not
 * specified.
 * @param maxPitch (Optional) Maximum MIDI pitch to allow. Will be 127 if not
 * specified.
 */
export interface MultitrackConverterArgs extends BaseConverterArgs {
  stepsPerQuarter: number;
  totalSteps: number;
  numVelocityBins: number;
  minPitch?: number;
  maxPitch?: number;
}
export class MultitrackConverter extends DataConverter {
  readonly NUM_SPLITS = 0;             // const
  readonly SEGMENTED_BY_TRACK = true;  // const

  readonly stepsPerQuarter: number;
  readonly totalSteps: number;
  readonly numVelocityBins: number;
  readonly minPitch: number;
  readonly maxPitch: number;

  readonly numPitches: number;
  readonly performanceEventDepth: number;
  readonly numPrograms: number;
  readonly endToken: number;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  constructor(args: MultitrackConverterArgs) {
    super(args);

    this.stepsPerQuarter = args.stepsPerQuarter;
    this.totalSteps = args.totalSteps;
    this.numVelocityBins = args.numVelocityBins;
    this.minPitch = args.minPitch ? args.minPitch : constants.MIN_MIDI_PITCH;
    this.maxPitch = args.maxPitch ? args.maxPitch : constants.MAX_MIDI_PITCH;

    // Vocabulary:
    // note-on, note-off, time-shift, velocity-change, program-select, end-token

    this.numPitches = this.maxPitch - this.minPitch + 1;
    this.performanceEventDepth =
        2 * this.numPitches + this.totalSteps + this.numVelocityBins;

    // Include an extra "program" for drums.
    this.numPrograms =
        constants.MAX_MIDI_PROGRAM - constants.MIN_MIDI_PROGRAM + 2;

    this.endToken = this.performanceEventDepth + this.numPrograms;
    this.depth = this.endToken + 1;

    this.endTensor = tf.tidy(
        () => tf.oneHot(tf.tensor1d([this.endToken], 'int32'), this.depth)
                  .as1D());
  }

  private trackToTensor(track?: performance.Performance) {
    const maxEventsPerTrack = this.numSteps / this.numSegments;
    let tokens: tf.TensorBuffer<tf.Rank.R1> = undefined;

    if (track) {
      // Drop events from track until we have the maximum number of events
      // (leaving room for program select and end token).
      while (track.events.length > maxEventsPerTrack - 2) {
        track.events.pop();
      }

      tokens = tf.buffer([track.events.length + 2], 'int32');

      // Add an initial program select token.
      tokens.set(
          this.performanceEventDepth +
              (track.isDrum ? this.numPrograms - 1 : track.program),
          0);

      // Add tokens for each performance event.
      track.events.forEach((event, index) => {
        switch (event.type) {
          case 'note-on':
            tokens.set(event.pitch - this.minPitch, index + 1);
            break;
          case 'note-off':
            tokens.set(
                this.numPitches + event.pitch - this.minPitch, index + 1);
            break;
          case 'time-shift':
            tokens.set(2 * this.numPitches + event.steps - 1, index + 1);
            break;
          case 'velocity-change':
            tokens.set(
                2 * this.numPitches + this.totalSteps + event.velocityBin - 1,
                index + 1);
            break;
          default:
            throw new Error(`Unrecognized performance event: ${event}`);
        }
      });

      // Add a single end token.
      tokens.set(this.endToken, track.events.length + 1);
    } else {
      // Track doesn't exist, just use an end token.
      tokens = tf.buffer([1], 'int32', new Int32Array([this.endToken]));
    }

    // Now do one-hot encoding and pad with zeros up to the maximum number of
    // events.
    return tf.tidy(() => {
      const oh = tf.oneHot(tokens.toTensor() as tf.Tensor1D, this.depth);
      return oh.pad([[0, maxEventsPerTrack - oh.shape[0]], [0, 0]]);
    });
  }

  toTensor(noteSequence: INoteSequence) {
    sequences.assertIsRelativeQuantizedSequence(noteSequence);

    if (noteSequence.quantizationInfo.stepsPerQuarter !==
        this.stepsPerQuarter) {
      throw new Error(`Steps per quarter note mismatch: ${
          noteSequence.quantizationInfo.stepsPerQuarter} != ${
          this.stepsPerQuarter}`);
    }

    // Drop all notes outside the valid pitch range.
    const seq = sequences.clone(noteSequence);
    seq.notes = noteSequence.notes.filter(
        note => note.pitch >= this.minPitch && note.pitch <= this.maxPitch);

    const instruments = new Set(seq.notes.map(note => note.instrument));
    const tracks =
        Array.from(instruments)
            .map(
                instrument => performance.Performance.fromNoteSequence(
                    seq, this.totalSteps, this.numVelocityBins, instrument));

    // Sort tracks by program number, with drums at the end.
    const sortedTracks = tracks.sort(
        (a, b) => b.isDrum ? -1 : (a.isDrum ? 1 : a.program - b.program));

    // Drop tracks until we have the maximum number of instruments.
    while (sortedTracks.length > this.numSegments) {
      sortedTracks.pop();
    }

    // Make sure all tracks are the proper length (in time).
    sortedTracks.forEach((track) => track.setNumSteps(this.totalSteps));

    // Pad with "undefined" tracks to reach the desired number of instruments.
    while (sortedTracks.length < this.numSegments) {
      sortedTracks.push(undefined);
    }

    // Convert tracks to tensors then concatenate.
    return tf.tidy(
        () => tf.concat(
            sortedTracks.map((track) => this.trackToTensor(track)), 0));
  }

  private tokensToTrack(tokens: Int32Array) {
    // Trim to end token.
    const idx = tokens.indexOf(this.endToken);
    const endIndex = idx >= 0 ? idx : tokens.length;
    const trackTokens = tokens.slice(0, endIndex);

    // Split into performance event tokens and program change tokens.
    const eventTokens =
        trackTokens.filter((token) => token < this.performanceEventDepth);
    const programTokens =
        trackTokens.filter((token) => token >= this.performanceEventDepth);

    // Use the first program token to determine program. If no program tokens,
    // use program zero (piano).
    const [program, isDrum] = programTokens.length ?
        (programTokens[0] - this.performanceEventDepth < this.numPrograms - 1 ?
             [programTokens[0] - this.performanceEventDepth, false] :
             [0, true]) :
        [0, false];

    // Decode event tokens.
    const events: performance.PerformanceEvent[] =
        Array.from(eventTokens).map((token) => {
          if (token < this.numPitches) {
            return {type: 'note-on', pitch: this.minPitch + token} as
                performance.NoteOn;
          } else if (token < 2 * this.numPitches) {
            return {
              type: 'note-off',
              pitch: this.minPitch + token - this.numPitches
            } as performance.NoteOff;
          } else if (token < 2 * this.numPitches + this.totalSteps) {
            return {
              type: 'time-shift',
              steps: token - 2 * this.numPitches + 1
            } as performance.TimeShift;
          } else if (
              token <
              2 * this.numPitches + this.totalSteps + this.numVelocityBins) {
            return {
              type: 'velocity-change',
              velocityBin: token - 2 * this.numPitches - this.totalSteps + 1
            } as performance.VelocityChange;
          } else {
            throw new Error(`Invalid performance event token: ${token}`);
          }
        });

    return new performance.Performance(
        events, this.totalSteps, this.numVelocityBins, program, isDrum);
  }

  async toNoteSequence(
      oh: tf.Tensor2D, stepsPerQuarter = this.stepsPerQuarter) {
    const noteSequence = NoteSequence.create();
    noteSequence.quantizationInfo =
        NoteSequence.QuantizationInfo.create({stepsPerQuarter});
    noteSequence.totalQuantizedSteps = this.totalSteps;

    // Split into tracks and convert to performance representation.
    const tensors =
        tf.tidy(() => tf.split(oh.argMax(1) as tf.Tensor1D, this.numSegments));
    const tracks = await Promise.all(tensors.map(async (tensor) => {
      const tokens = await tensor.data() as Int32Array;
      const track = this.tokensToTrack(tokens);
      tensor.dispose();
      return track;
    }));

    tracks.forEach((track, instrument) => {
      // Make sure track is the proper length.
      track.setNumSteps(this.totalSteps);

      // Add notes to main NoteSequence.
      noteSequence.notes.push(...track.toNoteSequence(instrument).notes);
    });

    return noteSequence;
  }
}
