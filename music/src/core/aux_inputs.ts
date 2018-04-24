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

import * as tf from '@tensorflow/tfjs-core';

export interface BinaryCounterSpec {
  type: 'BinaryCounter';
  args: BinaryCounterArgs;
}

export type AuxiliaryInputSpec = BinaryCounterSpec;

/**
 * Creates an `AuxiliaryInput` based on the given `AuxiliaryInputSpec`.
 *
 * @param spec Specifies the `AuxiliaryInput` to create.
 * @returns A new `AuxiliaryInput` object based on `spec`.
 */
export function auxiliaryInputFromSpec(spec: AuxiliaryInputSpec):
    AuxiliaryInput {
  switch (spec.type) {
    case 'BinaryCounter':
      return new BinaryCounter(spec.args);
    default:
      throw new Error(`Unknown auxiliary input: ${spec}`);
  }
}

/**
 * Abstract AuxiliaryInput class for producing auxiliary input tensors.
 *
 * @param depth The size of the auxiliary input tensor at each step.
 */
export abstract class AuxiliaryInput {
  readonly depth: number;  // Size of final output dimension.
  abstract getTensors(numSteps: number): tf.Tensor2D;

  constructor(depth: number) {
    this.depth = depth;
  }
}

/**
 * Binary counter auxiliary input.
 *
 * @param numBits The number of binary counter bits.
 */
export type BinaryCounterArgs = {
  numBits: number
};
export class BinaryCounter extends AuxiliaryInput {
  constructor(args: BinaryCounterArgs) {
    super(args.numBits);
  }

  /**
   * Get the tensor of auxiliary inputs. The returned tensor acts as a binary
   * counter (using -1 instead of 0), with least significant bit first.
   *
   * @param numSteps Number of steps of binary counter values to return.
   * @returns A 2D tensor of binary counter values.
   */
  getTensors(numSteps: number) {
    const buffer = tf.buffer([numSteps, this.depth]);
    for (let step = 0; step < numSteps; ++step) {
      for (let i = 0; i < this.depth; ++i) {
        buffer.set(
            Math.floor((step + 1) / Math.pow(2, i)) % 2 ? 1.0 : -1.0, step, i);
      }
    }
    return buffer.toTensor().as2D(numSteps, this.depth);
  }
}
