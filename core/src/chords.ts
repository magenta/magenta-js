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

import { Chord, Note } from 'tonal';

const CHORD_QUALITY_INTERVALS = [
  ['1P', '3M', '5P'],
  ['1P', '3m', '5P'],
  ['1P', '3M', '5A'],
  ['1P', '3m', '5d'],
];

export enum ChordQuality {
  Major = 0,
  Minor = 1,
  Augmented = 2,
  Diminished = 3,
  Other = 4,
}

export class ChordSymbolException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ChordSymbols {
  /**
   * Returns an array containing integers (0-11) representing the pitch classes
   * in a chord.
   * @param chord A chord symbol string.
   * @returns An array of integer pitch classes in the chord.
   * @throws {ChordSymbolException} If the chord cannot be recognized.
   */
  public static pitches(chord: string): number[] {
    if (!Chord.exists(chord)) {
      throw new ChordSymbolException(
        'Unrecognized chord symbol: ' + `${chord}`);
    }

    let notes = Chord.notes(chord);
    return notes.map(Note.chroma);
  }

  /**
   * Returns an integer (0-11) representing the pitch class of the chord root.
   * @param chord A chord symbol string.
   * @returns The integer pitch class of the chord root.
   * @throws {ChordSymbolException} If the chord root cannot be determined.
   */
  public static root(chord: string): number {
    let [root, kind] = Chord.tokenize(chord);
    if (!root) {
      throw new ChordSymbolException(
        'Chord symbol has unknown root: ' + `${chord}`);
    }

    return Note.chroma(root);
  }

  /**
   * Returns the chord quality (major, minor, augmented, diminished, or other).
   * @param chord A chord symbol string.
   * @returns The ChordQuality enum value specifying the quality.
   * @throws {ChordSymbolException} If the chord cannot be recognized.
   */
  public static quality(chord: string): ChordQuality {
    if (!Chord.exists(chord)) {
      throw new ChordSymbolException(
        'Unrecognized chord symbol: ' + `${chord}`);
    }

    let intervals = Chord.intervals(chord);
    let qualities = CHORD_QUALITY_INTERVALS.map(
      cqis => cqis.every(cqi => intervals.includes(cqi)));

    let i = qualities.indexOf(true);
    let j = qualities.lastIndexOf(true);

    if (i >= 0 && i === j) {
      return i;
    }
    else {
      return ChordQuality.Other;
    }
  }
}

