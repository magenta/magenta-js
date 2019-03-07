/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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

export enum PitchName {
  UNKNOWN_PITCH_NAME = 0,
  F_FLAT_FLAT = 1,
  C_FLAT_FLAT = 2,
  G_FLAT_FLAT = 3,
  D_FLAT_FLAT = 4,
  A_FLAT_FLAT = 5,
  E_FLAT_FLAT = 6,
  B_FLAT_FLAT = 7,
  F_FLAT = 8,
  C_FLAT = 9,
  G_FLAT = 10,
  D_FLAT = 11,
  A_FLAT = 12,
  E_FLAT = 13,
  B_FLAT = 14,
  F = 15,
  C = 16,
  G = 17,
  D = 18,
  A = 19,
  E = 20,
  B = 21,
  F_SHARP = 22,
  C_SHARP = 23,
  G_SHARP = 24,
  D_SHARP = 25,
  A_SHARP = 26,
  E_SHARP = 27,
  B_SHARP = 28,
  F_SHARP_SHARP = 29,
  C_SHARP_SHARP = 30,
  G_SHARP_SHARP = 31,
  D_SHARP_SHARP = 32,
  A_SHARP_SHARP = 33,
  E_SHARP_SHARP = 34,
  B_SHARP_SHARP = 35
}

export enum Key {
  C = 0,
  C_SHARP = 1,
  D_FLAT = 1,
  D = 2,
  D_SHARP = 3,
  E_FLAT = 3,
  E = 4,
  F = 5,
  F_SHARP = 6,
  G_FLAT = 6,
  G = 7,
  G_SHARP = 8,
  A_FLAT = 8,
  A = 9,
  A_SHARP = 10,
  B_FLAT = 10,
  B = 11
}

export enum Mode {
  MAJOR = 0,
  MINOR = 1,
  NOT_SPECIFIED = 2,
  MIXOLYDIAN = 3,
  DORIAN = 4,
  PHRYGIAN = 5,
  LYDIAN = 6,
  LOCRIAN = 7
}

export interface TimeSignature {
  time?: (number|null);
  numerator?: (number|null);
  denominator?: (number|null);
}

export interface KeySignature {
  time?: (number|null);
  key?: (Key|null);
  mode?: (Mode|null);
}

export interface Tempo {
  time?: (number|null);
  qpm?: (number|null);
}

export interface QuantizationInfo {
  stepsPerQuarter?: (number|null);
  stepsPerSecond?: (number|null);
}

export class Note {
  constructor(note?: Note) {
    if (note) {
      this.pitch = note.pitch;
      this.pitchName = note.pitchName;
      this.velocity = note.velocity;
      this.instrument = note.instrument;
      this.program = note.program;
      this.isDrum = note.isDrum;
      this.startTime = note.startTime;
      this.endTime = note.endTime;
      this.quantizedStartStep = note.quantizedStartStep;
      this.quantizedEndStep = note.quantizedEndStep;
      this.pitchName = note.pitchName;
      this.numerator = note.numerator;
      this.denominator = note.denominator;
      this.part = note.part;
      this.voice = note.voice;
    }
  }

  // Basic properties.
  public pitch: number;
  public velocity: number;
  public instrument: number;
  public program: number;
  public isDrum: boolean;

  // Unquantized notes.
  public startTime: number;
  public endTime: number;

  // Quantized notes.
  public quantizedStartStep: number;
  public quantizedEndStep: number;

  // Optional properties.
  public pitchName: PitchName;
  public numerator: number;
  public denominator: number;
  public part: number;
  public voice: number;
}

export class NoteSequence {
  /**
   * Constructs a new NoteSequence.
   * @param [properties] Properties to set
   */
  constructor(ns?: NoteSequence) {
    if (ns) {
      this.id = ns.id;
      this.notes = JSON.parse(JSON.stringify(ns.notes));
      this.totalTime = ns.totalTime;
      this.totalQuantizedSteps = ns.totalQuantizedSteps;
      this.ticksPerQuarter = ns.ticksPerQuarter;
      this.timeSignatures = JSON.parse(JSON.stringify(ns.timeSignatures));
      this.keySignatures = JSON.parse(JSON.stringify(ns.keySignatures));
      this.tempos = JSON.parse(JSON.stringify(ns.tempos));
    }
  }

  public id: string;
  public notes: Note[];
  public totalTime: number;
  public totalQuantizedSteps: number;
  public ticksPerQuarter: number;
  public timeSignatures: TimeSignature[];
  public keySignatures: KeySignature[];
  public tempos: Tempo[];
  public quantizationInfo?: QuantizationInfo|null;

  // TODO(notwaldorf): Add these too.
  // public filename: string;
  // public referenceNumber: number;
  // public collectionName: string;
  // public pitchBends: tensorflow.magenta.NoteSequence.IPitchBend[];
  // public controlChanges: tensorflow.magenta.NoteSequence.IControlChange[];
  // public partInfos: tensorflow.magenta.NoteSequence.IPartInfo[];
  // public sourceInfo?: (tensorflow.magenta.NoteSequence.ISourceInfo|null);
  // public textAnnotations: tensorflow.magenta.NoteSequence.ITextAnnotation[];
  // public sectionAnnotations:
  //     tensorflow.magenta.NoteSequence.ISectionAnnotation[];
  // public sectionGroups: tensorflow.magenta.NoteSequence.ISectionGroup[];

  // public subsequenceInfo?: (tensorflow.magenta.NoteSequence.ISubsequenceInfo|
  //                           null);
  // public sequenceMetadata?: (tensorflow.magenta.ISequenceMetadata|null);
}
