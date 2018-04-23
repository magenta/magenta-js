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
import {ChordEncoder, ChordEncoderType, chordEncoderFromType} from './chords';

export interface BinaryCounterSpec {
  type: 'BinaryCounter';
  args: BinaryCounterArgs;
}

export interface ChordProgressionSpec {
  type: 'ChordProgression';
  args: ChordProgressionArgs;
}

export type ControlSignalSpec = BinaryCounterSpec | ChordProgressionSpec;
export type ControlSignalUserArgs =
    BinaryCounterUserArgs | ChordProgressionUserArgs;

/**
 * Type mapping from control signal type to "user" arguments type needed to
 * construct the tensors for the control signal at runtime.
 */
export interface UserArgsMap {
  BinaryCounter: BinaryCounterUserArgs;
  ChordProgression: ChordProgressionUserArgs;
}

/**
 * Creates a `ControlSignal` based on the given `ControlSignalSpec`.
 *
 * @param spec Specifies the `ControlSignal` to create.
 * @returns A new `ControlSignal` object based on `spec`.
 */
export function controlSignalFromSpec<T extends ControlSignalSpec['type']>(
    spec: ControlSignalSpec): ControlSignal<UserArgsMap[T]> {
  switch (spec.type) {
    case 'BinaryCounter':
      return new BinaryCounter(spec.args);
    case 'ChordProgression':
      return new ChordProgression(spec.args);
    default:
      throw new Error(`Unknown control signal: ${spec}`);
  }
}

/**
 * Abstract ControlSignal class for producing control tensors.
 *
 * @param depth The size of the control tensor at each step.
 */
export abstract class ControlSignal<A extends ControlSignalUserArgs> {
  readonly depth: number;  // Size of final output dimension.
  abstract getTensors(numSteps: number, args: A): tf.Tensor2D;

  constructor(depth: number) { this.depth = depth; }
}

/**
 * Binary counter control signal.
 *
 * @param numBits The number of binary counter bits.
 */
export type BinaryCounterArgs = {
  numBits: number
};
export type BinaryCounterUserArgs = void;
export class BinaryCounter extends ControlSignal<BinaryCounterUserArgs> {
  constructor(args: BinaryCounterArgs) { super(args.numBits); }

  /**
   * Get the tensor of control values. The returned tensor acts as a binary
   * counter (using -1 instead of 0), with least significant bit first.
   *
   * @param numSteps Number of steps of binary counter values to return.
   * @returns A 2D tensor of binary counter values.
   */
  getTensors(numSteps: number, args: BinaryCounterUserArgs) {
    const buffer = tf.buffer([numSteps, this.depth]);
    for (let step = 0; step < numSteps; ++step) {
      for (let i = 0; i < this.depth; ++i) {
        buffer.set(Math.floor(step / Math.pow(2, i)) % 2 ? 1.0 : -1.0, step, i);
      }
    }
    return buffer.toTensor().as2D(numSteps, this.depth);
  }
}

/**
 * Chord progression control signal.
 *
 * @param encoderType The chord encoder type to use.
 */
export type ChordProgressionArgs = {
  encoderType: ChordEncoderType
};
export type ChordProgressionUserArgs = {
  chords: string[]
};
export class ChordProgression extends ControlSignal<ChordProgressionUserArgs> {
  readonly encoder: ChordEncoder;

  constructor(args: ChordProgressionArgs) {
    const encoder = chordEncoderFromType(args.encoderType);
    super(encoder.depth);
    this.encoder = encoder;
  }

  /**
   * Get the tensor of control values. The returned tensor will be the encoded
   * chord progression over the requested number of steps.
   *
   * @param numSteps Number of steps to use.
   * @param chords An array of chord symbol strings.
   * @returns A 2D tensor containing the encoded chord progression.
   */
  getTensors(numSteps: number, args: ChordProgressionUserArgs) {
    const encodedChords = args.chords.map(chord => this.encoder.encode(chord));
    const indices =
        Array.from(Array(numSteps).keys())
            .map(step => Math.floor(step * encodedChords.length / numSteps));
    return tf.stack(indices.map(i => encodedChords[i]))
        .as2D(numSteps, this.depth);
  }
}
