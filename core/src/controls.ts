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

import * as tf from '@tensorflow/tfjs';
import {ChordEncoderType, chordEncoderFromType} from './chords';

export type BinaryCounterArgs = {numSteps: number, numBits: number};
export interface BinaryCounterSpec {
  type: 'BinaryCounter';
  args: BinaryCounterArgs;
}

export type ChordProgressionArgs = {
  numSteps: number, encoderType: ChordEncoderType
};
export interface ChordProgressionSpec {
  type: 'ChordProgression';
  args: ChordProgressionArgs;
}

export type ControlSignalSpec = BinaryCounterSpec | ChordProgressionSpec;

/**
 * Creates a `ControlSignal` based on the given `ControlSignalSpec`.
 *
 * @param type Specifies the `ControlSignal` to create.
 * @param chords (Optional) List of chord symbol strings.
 * @returns A new `ControlSignal` object based on `spec`.
 */
export function controlSignalFromSpec(
    spec: ControlSignalSpec, chords?: string[]) {
  switch (spec.type) {
    case 'BinaryCounter': return new BinaryCounter(spec.args);
    case 'ChordProgression': return new ChordProgression(spec.args, chords!);
    default: throw new Error(`Unknown control signal: ${spec}`);
  }
}

/**
 * Abstract ControlSignal class for producing control tensors.
 *
 * @param numSteps The length of the control signal.
 * @param depth The size of the control tensor at each step.
 */
export abstract class ControlSignal {
  readonly numSteps: number;  // Total length of sequences.
  readonly depth: number;     // Size of final output dimension.
  abstract getTensor(step: number): tf.Tensor1D;

  constructor(numSteps: number, depth: number) {
    this.numSteps = numSteps;
    this.depth = depth;
  }
}

/**
 * Binary counter control signal.
 *
 * @param numSteps The length of the control signal.
 * @param numBits The number of binary counter bits.
 */
export class BinaryCounter extends ControlSignal {
  constructor(args: BinaryCounterArgs) { super(args.numSteps, args.numBits); }

  /**
   * Get the tensor of control values at the specified step. The returned tensor
   * acts as a binary counter (using -1 instead of 0), with least significant
   * bit first.
   *
   * @param step Step for which to get the binary counter.
   */
  getTensor(step: number) {
    if (step >= this.numSteps) {
      throw new RangeError(`Step out of range: ${step} >= ${this.numSteps}`);
    }

    const buffer = tf.buffer([this.depth]);
    for (let i = 0; i < this.depth; ++i) {
      buffer.set(Math.floor(step / Math.pow(2, i)) % 2 ? 1.0 : -1.0, i);
    }
    return buffer.toTensor().as1D();
  }
}

/**
 * Chord progression control signal.
 *
 * @param numSteps The length of the control signal.
 * @param chords An array of chord symbol strings.
 * @param encoder The chord encoder to use.
 */
export class ChordProgression extends ControlSignal {
  readonly encodedChords: tf.Tensor1D[];

  constructor(args: ChordProgressionArgs, chords: string[]) {
    const encoder = chordEncoderFromType(args.encoderType);
    super(args.numSteps, encoder.depth);
    this.encodedChords = chords.map(chord => encoder.encode(chord));
  }

  /**
   * Get the tensor of control values at the specified step. The returned tensor
   * will be the encoded chord at the corresponding position in the chord
   * progression.
   *
   * @param step Step for which to get the encoded chord.
   */
  getTensor(step: number) {
    if (step >= this.numSteps) {
      throw new RangeError(`Step out of range: ${step} >= ${this.numSteps}`);
    }

    const index = Math.floor(step * this.encodedChords.length / this.numSteps);
    return this.encodedChords[index];
  }
}
