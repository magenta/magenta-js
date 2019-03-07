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

// Set the quantization cutoff.
// Note events before this cutoff are rounded down to nearest step. Notes
// above this cutoff are rounded up to nearest step. The cutoff is given as a
// fraction of a step.
// For example, with quantize_cutoff = 0.75 using 0-based indexing,
// if .75 < event <= 1.75, it will be quantized to step 1.
// If 1.75 < event <= 2.75 it will be quantized to step 2.
// A number close to 1.0 gives less wiggle room for notes that start early,
// and they will be snapped to the previous step.
const QUANTIZE_CUTOFF = 0.5;

/**
 * Calculates steps per second given stepsPerQuarter and a QPM.
 */
export function stepsPerQuarterToStepsPerSecond(
    stepsPerQuarter: number, qpm: number): number {
  return stepsPerQuarter * qpm / 60.0;
}

/**
 * Quantizes seconds to the nearest step, given steps_per_second.
 * See the comments above `QUANTIZE_CUTOFF` for details on how the
 * quantizing algorithm works.
 * @param unquantizedSeconds Seconds to quantize.
 * @param stepsPerSecond Quantizing resolution.
 * @param quantizeCutoff Value to use for quantizing cutoff.
 * @returns the quantized step.
 */
export function quantizeToStep(
    unquantizedSeconds: number, stepsPerSecond: number,
    quantizeCutoff = QUANTIZE_CUTOFF): number {
  const unquantizedSteps = unquantizedSeconds * stepsPerSecond;
  return Math.floor(unquantizedSteps + (1 - quantizeCutoff));
}

export class MultipleTimeSignatureException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class BadTimeSignatureException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class NegativeTimeException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class MultipleTempoException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Exception for when a sequence was unexpectedly quantized or unquantized.
 *
 * Should not happen during normal operation and likely indicates a programming
 * error.
 */
export class QuantizationStatusException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
