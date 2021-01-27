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
import * as tf from '@tensorflow/tfjs';

import {INoteSequence, NoteSequence} from '../protobuf/index';

import * as constants from './constants';
import {DEFAULT_DRUM_PITCH_CLASSES} from './constants';
import * as logging from './logging';
import {Melody, MelodyControl, MelodyRhythm, MelodyShape} from './melodies';
import * as performance from './performance';
import * as sequences from './sequences';

export {DEFAULT_DRUM_PITCH_CLASSES};

export interface MelodyConverterSpec {
  type: 'MelodyConverter';
  args: MelodyConverterArgs;
}
export interface MelodyRhythmConverterSpec {
  type: 'MelodyRhythmConverter';
  args: MelodyConverterArgs;
}
export interface MelodyShapeConverterSpec {
  type: 'MelodyShapeConverter';
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
export interface TrioRhythmConverterSpec {
  type: 'TrioRhythmConverter';
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

export interface GrooveConverterSpec {
  type: 'GrooveConverter';
  args: GrooveConverterArgs;
}

/**
 * Interface for JSON specification of a `DataConverter`.
 *
 * @property type The name of the `DataConverter` class.
 * @property args Map containing values for argments to the constructor of the
 * `DataConverter` class specified above.
 */
export type ConverterSpec = MelodyConverterSpec|MelodyRhythmConverterSpec|
    MelodyShapeConverterSpec|DrumsConverterSpec|DrumRollConverterSpec|
    TrioConverterSpec|TrioRhythmConverterSpec|DrumsOneHotConverterSpec|
    MultitrackConverterSpec|GrooveConverterSpec;

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
    case 'MelodyRhythmConverter':
      return new MelodyRhythmConverter(spec.args);
    case 'MelodyShapeConverter':
      return new MelodyShapeConverter(spec.args);
    case 'DrumsConverter':
      return new DrumsConverter(spec.args);
    case 'DrumRollConverter':
      return new DrumRollConverter(spec.args);
    case 'TrioConverter':
      return new TrioConverter(spec.args);
    case 'TrioRhythmConverter':
      return new TrioRhythmConverter(spec.args);
    case 'DrumsOneHotConverter':
      return new DrumsOneHotConverter(spec.args);
    case 'MultitrackConverter':
      return new MultitrackConverter(spec.args);
    case 'GrooveConverter':
      return new GrooveConverter(spec.args);
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
  readonly NUM_SPLITS: number = 0;  // Const number of conductor splits.
  readonly SEGMENTED_BY_TRACK: boolean = false;  // Segments are tracks.

  abstract toTensor(noteSequence: INoteSequence): tf.Tensor2D;
  abstract async toNoteSequence(
      tensor: tf.Tensor2D, stepsPerQuarter?: number,
      qpm?: number): Promise<INoteSequence>;

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
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  constructor(args: DrumsConverterArgs) {
    super(args);
    this.pitchClasses = args.pitchClasses || DEFAULT_DRUM_PITCH_CLASSES;
    this.pitchToClass = new Map<number, number>();
    for (let c = 0; c < this.pitchClasses.length; ++c) {  // class
      this.pitchClasses[c].forEach((p) => {
        this.pitchToClass.set(p, c);
      });
    }
    this.depth = this.pitchClasses.length + 1;
  }

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    sequences.assertIsQuantizedSequence(noteSequence);
    const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
    const drumRoll =
        tf.buffer([numSteps, this.pitchClasses.length + 1], 'int32');
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
      oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
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
    noteSequence.totalQuantizedSteps = labels.length;
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
      roll: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
    const flatRoll = await roll.data() as Uint8Array;
    for (let s = 0; s < roll.shape[0]; ++s) {  // step
      const pitches = flatRoll.slice(
          s * this.pitchClasses.length, (s + 1) * this.pitchClasses.length);
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
    noteSequence.totalQuantizedSteps = roll.shape[0];
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

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    sequences.assertIsRelativeQuantizedSequence(noteSequence);
    const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
    const labels = Array<number>(numSteps).fill(0);
    for (const {pitch, quantizedStartStep} of noteSequence.notes) {
      labels[quantizedStartStep] += Math.pow(2, this.pitchToClass.get(pitch));
    }
    return tf.tidy(
        () =>
            tf.oneHot(tf.tensor1d(labels, 'int32'), this.depth) as tf.Tensor2D);
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
 * cause an error to be thrown.
 * @param maxPitch The maximum pitch to model. Those above this value will
 * cause an error to be thrown.
 * @param ignorePolpyhony (default: true) If false, an error will be raised
 * when notes start at the same step. If true, the highest pitched note is used
 * and others are ignored.
 * @param numSegments (Optional) The number of conductor segments, if
 * applicable.
 */
export interface MelodyConverterArgs extends BaseConverterArgs {
  minPitch: number;
  maxPitch: number;
  ignorePolyphony?: boolean;
}
export class MelodyConverter extends DataConverter {
  readonly minPitch: number;  // inclusive
  readonly maxPitch: number;  // inclusive
  readonly ignorePolyphony: boolean;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  readonly NOTE_OFF = 1;     // const
  readonly FIRST_PITCH = 2;  // const

  constructor(args: MelodyConverterArgs) {
    super(args);
    this.minPitch = args.minPitch;
    this.maxPitch = args.maxPitch;
    this.ignorePolyphony = args.ignorePolyphony;
    this.depth = args.maxPitch - args.minPitch + 1 + this.FIRST_PITCH;
  }

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    const melody = Melody.fromNoteSequence(
        noteSequence, this.minPitch, this.maxPitch, this.ignorePolyphony,
        this.numSteps);
    return tf.tidy(
        () => tf.oneHot(
                  tf.tensor(melody.events, [melody.events.length], 'int32') as
                      tf.Tensor1D,
                  this.depth) as tf.Tensor2D);
  }

  async toNoteSequence(
      oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    const labelsTensor = oh.argMax(1);
    const labels: Int32Array = await labelsTensor.data() as Int32Array;
    labelsTensor.dispose();
    const melody = new Melody(labels, this.minPitch, this.maxPitch);
    return melody.toNoteSequence(stepsPerQuarter, qpm);
  }
}

/**
 * Abstract `MelodyControlConverter` class for handling melody control signals.
 * The `toTensor` method first extracts a monophonic melody from the
 * `NoteSequence` then extracts the control signal from the melody. The
 * `toNoteSequence` method is left undefined here but can be used by subclasses
 * for debugging purposes.
 *
 * @param numSteps The length of each sequence.
 * @param minPitch The minimum melody pitch.
 * @param maxPitch The maximum melody pitch.
 * @param ignorePolpyhony Whether to raise an error if multiple notes start at
 * the same step.
 * @param numSegments (Optional) The number of conductor segments.
 */
abstract class MelodyControlConverter extends DataConverter {
  readonly minPitch: number;
  readonly maxPitch: number;
  readonly ignorePolyphony: boolean;
  readonly melodyControl: MelodyControl;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  constructor(args: MelodyConverterArgs, melodyControl: MelodyControl) {
    super(args);
    this.minPitch = args.minPitch;
    this.maxPitch = args.maxPitch;
    this.ignorePolyphony = args.ignorePolyphony;
    this.melodyControl = melodyControl;
    this.depth = melodyControl.depth;
  }

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    const melody = Melody.fromNoteSequence(
        noteSequence, this.minPitch, this.maxPitch, this.ignorePolyphony,
        this.numSteps);
    return this.melodyControl.extract(melody);
  }
}

/**
 * Converts between a monophonic, quantized `NoteSequence` containing a melody
 * and a `Tensor` representing only the *rhythm* of the melody.
 *
 * The rhythm is represented as a [`numSteps`, 1]-shaped `Tensor` with 1 in the
 * positions corresponding to steps with a note-on and 0 elsewhere.
 *
 * Since the melody cannot be reconstructed from its rhythm alone,
 * `toNoteSequence` returns a `NoteSequence` with drum hits at the note-on
 * steps.
 */
export class MelodyRhythmConverter extends MelodyControlConverter {
  constructor(args: MelodyConverterArgs) {
    super(args, new MelodyRhythm());
  }

  async toNoteSequence(
      tensor: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    // Create a NoteSequence containing the rhythm as drum hits.
    // This is mainly for debugging purposes.
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
    const rhythm: Int32Array = await tensor.data() as Int32Array;
    for (let s = 0; s < rhythm.length; ++s) {
      if (rhythm[s]) {
        noteSequence.notes.push(NoteSequence.Note.create({
          pitch: DEFAULT_DRUM_PITCH_CLASSES[1][0],  // snare
          quantizedStartStep: s,
          quantizedEndStep: s + 1,
          isDrum: true
        }));
      }
    }
    noteSequence.totalQuantizedSteps = rhythm.length;
    return noteSequence;
  }
}

/**
 * Converts between a monophonic, quantized `NoteSequence` containing a melody
 * and a `Tensor` representing only the *shape* of the melody.
 *
 * The shape is represented as a [`numSteps`, 3]-shaped `Tensor` containing a
 * one-hot Parsons code, where 0 = descending pitch, 1 = same pitch, and 2 =
 * ascending pitch.
 *
 * Since the melody cannot be reconstructed from its shape alone,
 * `toNoteSequence` returns a `NoteSequence` having the shape of the contour
 * with a note at each time step.
 */
export class MelodyShapeConverter extends MelodyControlConverter {
  constructor(args: MelodyConverterArgs) {
    super(args, new MelodyShape());
  }

  async toNoteSequence(
      oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    // Create a NoteSequence containing the melodic shape, with a new note every
    // time step. This is mainly for debugging purposes.
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
    const shapeTensor = oh.argMax(1);
    const shape: Int32Array = await shapeTensor.data() as Int32Array;
    shapeTensor.dispose();
    let pitch = Math.round((this.maxPitch + this.minPitch) / 2);
    for (let s = 0; s < shape.length; ++s) {
      switch (shape[s]) {
        case 0:
          pitch -= 1;
          if (pitch < this.minPitch) {
            pitch = this.minPitch;
            logging.log(
                'Pitch range exceeded when creating NoteSequence from shape.',
                'MelodyShapeConverter');
          }
          break;
        case 2:
          pitch += 1;
          if (pitch > this.maxPitch) {
            pitch = this.maxPitch;
            logging.log(
                'Pitch range exceeded when creating NoteSequence from shape.',
                'MelodyShapeConverter');
          }
          break;
        default:
          break;
      }
      noteSequence.notes.push(NoteSequence.Note.create(
          {pitch, quantizedStartStep: s, quantizedEndStep: s + 1}));
    }
    noteSequence.totalQuantizedSteps = shape.length;
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

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
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
      th: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    const ohs: tf.Tensor2D[] = tf.split(
        th,
        [
          this.melConverter.depth, this.bassConverter.depth,
          this.drumsConverter.depth
        ],
        -1);
    const ns =
        await this.melConverter.toNoteSequence(ohs[0], stepsPerQuarter, qpm);

    ns.notes.forEach(n => {
      n.instrument = 0;
      n.program = 0;
    });
    const bassNs =
        await this.bassConverter.toNoteSequence(ohs[1], stepsPerQuarter, qpm);
    ns.notes.push(...bassNs.notes.map(n => {
      n.instrument = 1;
      n.program = this.BASS_PROG_RANGE[0];
      return n;
    }));
    const drumsNs =
        await this.drumsConverter.toNoteSequence(ohs[2], stepsPerQuarter, qpm);
    ns.notes.push(...drumsNs.notes.map(n => {
      n.instrument = 2;
      return n;
    }));
    ohs.forEach(oh => oh.dispose());
    return ns;
  }
}

export class TrioRhythmConverter extends DataConverter {
  readonly trioConverter: TrioConverter;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;
  readonly NUM_SPLITS = 3;

  constructor(args: TrioConverterArgs) {
    super(args);
    this.trioConverter = new TrioConverter(args);
    this.depth = 3;
  }

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    return tf.tidy(() => {
      const trioTensor = this.trioConverter.toTensor(noteSequence);
      const instrumentTensors = tf.split(
          trioTensor,
          [
            this.trioConverter.melConverter.depth,
            this.trioConverter.bassConverter.depth,
            this.trioConverter.drumsConverter.depth
          ],
          1);
      const melodyEvents: tf.Tensor1D = tf.argMax(instrumentTensors[0], 1);
      const bassEvents: tf.Tensor1D = tf.argMax(instrumentTensors[1], 1);
      const drumsEvents: tf.Tensor1D = tf.argMax(instrumentTensors[2], 1);
      const melodyRhythm: tf.Tensor1D = tf.greater(melodyEvents, 1);
      const bassRhythm: tf.Tensor1D = tf.greater(bassEvents, 1);
      const drumsRhythm: tf.Tensor1D = tf.greater(drumsEvents, 0);
      return tf.stack([melodyRhythm, bassRhythm, drumsRhythm], 1) as
          tf.Tensor2D;
    });
  }

  async toNoteSequence(
      tensor: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    // Create a NoteSequence containing the rhythm as drum hits.
    // This is mainly for debugging purposes.
    const rhythmTensors = tf.split(tensor, 3, 1);
    const rhythms =
        await Promise.all(rhythmTensors.map(t => t.data())) as Int32Array[];
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
    for (let s = 0; s < this.numSteps; ++s) {
      if (rhythms[0][s]) {
        // melody
        noteSequence.notes.push(NoteSequence.Note.create({
          pitch: 72,
          quantizedStartStep: s,
          quantizedEndStep: s + 1,
          instrument: 0,
          program: 0,
        }));
      }
      if (rhythms[1][s]) {
        // bass
        noteSequence.notes.push(NoteSequence.Note.create({
          pitch: 36,
          quantizedStartStep: s,
          quantizedEndStep: s + 1,
          instrument: 1,
          program: 32,
        }));
      }
      if (rhythms[2][s]) {
        // drums
        noteSequence.notes.push(NoteSequence.Note.create({
          pitch: DEFAULT_DRUM_PITCH_CLASSES[1][0],
          quantizedStartStep: s,
          quantizedEndStep: s + 1,
          instrument: 2,
          isDrum: true
        }));
      }
    }
    noteSequence.totalQuantizedSteps = this.numSteps;
    return noteSequence;
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
 * encoded and padded with zeros to the maximum number of events. If fewer
 * than the maximum number of tracks are present, extra tracks consisting of
 * only an end token (then one-hot encoded and zero-padded) will be added.
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
    // note-on, note-off, time-shift, velocity-change, program-select,
    // end-token

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
    let tokens: tf.TensorBuffer<tf.Rank.R1, 'int32'> = undefined;

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

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
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
                  sortedTracks.map((track) => this.trackToTensor(track)), 0) as
            tf.Tensor2D);
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
      oh: tf.Tensor2D, stepsPerQuarter = this.stepsPerQuarter, qpm?: number) {
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
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

/**
 * Converts to and from hit/velocity/offset representations.
 * In this setting, we represent drum sequences and performances
 * as triples of (hit, velocity, offset). Each timestep refers to a fixed beat
 * on a grid, which is by default spaced at 16th notes (when `stepsPerQuarter`
 * is 4). Drum hits that don't fall exactly on beat are represented through
 * the offset value, which refers to the relative distance from the nearest
 * quantized step.
 *
 * Hits are binary [0, 1].
 * Velocities are continuous values in [0, 1].
 * Offsets are continuous values in [-0.5, 0.5], rescaled to [-1, 1] for
 * tensors.
 *
 * @param stepsPerQuarter The number of quantization steps per quarter note.
 * @param humanize If True, flatten all input velocities and
 * microtiming. The model then maps from a flattened input one with velocities
 * and microtiming. Defaults to False.
 * @param tapify  If True, squash all input drums at each timestep to the
 *     hi-hat
 * channel (3) and set velocities to 0. Defaults to False.
 * @param pitchClasses  An array of arrays, grouping together MIDI pitches to
 * treat as the same drum. The first pitch in each class will be used in the
 * `NoteSequence` returned by `toNoteSequence`. A default mapping to 9 classes
 * is used if not provided.
 * @param splitInstruments If True, the individual drum/pitch events for a
 *     given
 * time are split across seprate, sequentail steps of the RNN. Otherwise, they
 * are combined into a single step of the RNN. Defaults to False.
 */
export interface GrooveConverterArgs extends BaseConverterArgs {
  stepsPerQuarter?: number;
  humanize?: boolean;
  tapify?: boolean;
  pitchClasses?: number[][];
  splitInstruments?: boolean;
}
export class GrooveConverter extends DataConverter {
  readonly stepsPerQuarter: number;
  readonly humanize: boolean;
  readonly tapify: boolean;
  readonly pitchClasses: number[][];
  readonly pitchToClass: Map<number, number>;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;
  readonly splitInstruments: boolean;
  readonly TAPIFY_CHANNEL = 3;

  constructor(args: GrooveConverterArgs) {
    super(args);

    this.stepsPerQuarter =
        args.stepsPerQuarter || constants.DEFAULT_STEPS_PER_QUARTER;
    this.pitchClasses = args.pitchClasses || DEFAULT_DRUM_PITCH_CLASSES;
    this.pitchToClass = new Map<number, number>();
    for (let c = 0; c < this.pitchClasses.length; ++c) {  // class
      this.pitchClasses[c].forEach((p) => {
        this.pitchToClass.set(p, c);
      });
    }
    this.humanize = args.humanize || false;
    this.tapify = args.tapify || false;
    this.splitInstruments = args.splitInstruments || false;

    // Each drum hit is represented by 3 numbers - on/off, velocity, and
    // offset.
    this.depth = 3;
  }

  toTensor(ns: INoteSequence): tf.Tensor2D {
    const qns = sequences.isRelativeQuantizedSequence(ns) ?
        ns :
        sequences.quantizeNoteSequence(ns, this.stepsPerQuarter);
    const numSteps = this.numSteps;
    const qpm = (qns.tempos && qns.tempos.length) ?
        qns.tempos[0].qpm :
        constants.DEFAULT_QUARTERS_PER_MINUTE;
    const stepLength = (60. / qpm) / this.stepsPerQuarter;

    // For each quantized time step bin, collect a mapping from each pitch
    // class to at most one drum hit. Break ties by selecting hit with highest
    // velocity.
    const stepNotes: Array<Map<number, NoteSequence.INote>> = [];
    for (let i = 0; i < numSteps; ++i) {
      stepNotes.push(new Map<number, NoteSequence.INote>());
    }
    qns.notes.forEach(n => {
      if (!(this.tapify || this.pitchToClass.has(n.pitch))) {
        return;
      }
      const s = n.quantizedStartStep;
      if (s >= stepNotes.length) {
        throw Error(`Model does not support sequences with more than ${
            numSteps} steps (${numSteps * stepLength} seconds at qpm ${qpm}).`);
      }
      const d =
          this.tapify ? this.TAPIFY_CHANNEL : this.pitchToClass.get(n.pitch);
      if (!stepNotes[s].has(d) || stepNotes[s].get(d).velocity < n.velocity) {
        stepNotes[s].set(d, n);
      }
    });

    // For each time step and drum (pitch class), store the value of the
    // hit (bool for whether the drum what hit at that time), velocity
    // ([0, 1] velocity of hit, or 0 if not hit), and offset ([-1, 1] distance
    // from quantized start).
    const numDrums = this.pitchClasses.length;
    const hitVectors = tf.buffer([numSteps, numDrums]);
    const velocityVectors = tf.buffer([numSteps, numDrums]);
    const offsetVectors = tf.buffer([numSteps, numDrums]);

    function getOffset(n: NoteSequence.INote) {
      if (n.startTime === undefined) {
        return 0;
      }
      const tOnset = n.startTime;
      const qOnset = n.quantizedStartStep * stepLength;
      return 2 * (qOnset - tOnset) / stepLength;
    }

    // Loop through each step.
    for (let s = 0; s < numSteps; ++s) {
      // Loop through each drum instrument and set the hit, velocity, and
      // offset.
      for (let d = 0; d < numDrums; ++d) {
        const note = stepNotes[s].get(d);
        hitVectors.set(note ? 1 : 0, s, d);
        if (!this.humanize && !this.tapify) {
          velocityVectors.set(
              note ? note.velocity / constants.MAX_MIDI_VELOCITY : 0, s, d);
        }
        if (!this.humanize) {
          offsetVectors.set(note ? getOffset(note) : 0, s, d);
        }
      }
    }

    return tf.tidy(() => {
      const hits = hitVectors.toTensor() as tf.Tensor2D;
      const velocities = velocityVectors.toTensor() as tf.Tensor2D;
      const offsets = offsetVectors.toTensor() as tf.Tensor2D;

      // Stack the three signals, first flattening if splitInstruemnts is
      // enabled.
      const outLength = this.splitInstruments ? numSteps * numDrums : numSteps;
      return tf.concat(
                 [
                   hits.as2D(outLength, -1), velocities.as2D(outLength, -1),
                   offsets.as2D(outLength, -1)
                 ],
                 1) as tf.Tensor2D;
    });
  }

  async toNoteSequence(
      t: tf.Tensor2D, stepsPerQuarter?: number,
      qpm = constants.DEFAULT_QUARTERS_PER_MINUTE) {
    if (stepsPerQuarter && stepsPerQuarter !== this.stepsPerQuarter) {
      throw Error('`stepsPerQuarter` is set by the model.');
    }
    stepsPerQuarter = this.stepsPerQuarter;
    const numSteps = this.splitInstruments ?
        t.shape[0] / this.pitchClasses.length :
        t.shape[0];
    const stepLength = (60. / qpm) / this.stepsPerQuarter;
    const ns = NoteSequence.create(
        {totalTime: numSteps * stepLength, tempos: [{qpm}]});
    const results = await t.data() as Float32Array;

    function clip(v: number, min: number, max: number) {
      return Math.min(Math.max(v, min), max);
    }

    const numDrums = this.pitchClasses.length;
    // Loop through time steps.
    for (let s = 0; s < numSteps; ++s) {
      const stepResults = results.slice(
          s * numDrums * this.depth, (s + 1) * numDrums * this.depth);
      // Loop through individual drums at each time step.
      for (let d = 0; d < numDrums; ++d) {
        const hitOutput =
            stepResults[this.splitInstruments ? d * this.depth : d];
        const velI =
            this.splitInstruments ? (d * this.depth + 1) : (numDrums + d);
        const velOutput = stepResults[velI];
        const offsetI =
            this.splitInstruments ? (d * this.depth + 2) : (2 * numDrums + d);
        const offsetOutput = stepResults[offsetI];
        // If hit output is above threshold, add note.
        if (hitOutput > 0.5) {
          // Convert output to velocity, clipping to be in the valid range.
          const velocity = clip(
              Math.round(velOutput * constants.MAX_MIDI_VELOCITY),
              constants.MIN_MIDI_VELOCITY, constants.MAX_MIDI_VELOCITY);
          // Convert output to time offset, clipping to be in the valid range.
          const offset = clip(offsetOutput / 2, -0.5, 0.5);
          ns.notes.push(NoteSequence.Note.create({
            pitch: this.pitchClasses[d][0],
            startTime: (s - offset) * stepLength,
            endTime: (s - offset + 1) * stepLength,
            velocity,
            isDrum: true
          }));
        }
      }
    }
    return ns;
  }
}
