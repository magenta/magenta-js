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
import {ChordEncoder} from './chords';

/**
 * Abstract ControlSignal class for producing control tensors.
 *
 * @param numSteps The length of the control signal.
 * @param depth The size of the control tensor at each step.
 */
export abstract class ControlSignal {
  readonly numSteps: number;  // Total length of sequences.
  readonly depth: number;     // Size of final output dimension.
  abstract tensor(step: number): tf.Tensor1D;

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
  constructor(numSteps: number, numBits: number) { super(numSteps, numBits); }

  tensor(step: number) {
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

  constructor(numSteps: number, chords: string[], encoder: ChordEncoder) {
    super(numSteps, encoder.depth);
    this.encodedChords = chords.map(chord => encoder.encode(chord));
  }

  tensor(step: number) {
    if (step >= this.numSteps) {
      throw new RangeError(`Step out of range: ${step} >= ${this.numSteps}`);
    }

    const index = Math.floor(step * this.encodedChords.length / this.numSteps);
    return this.encodedChords[index];
  }
}
