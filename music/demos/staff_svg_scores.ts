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

import * as mm from '../src';

export const DOUBLE_SCALE: mm.INoteSequence = {
  notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 1, program: 0},
    {pitch: 61, quantizedStartStep: 1, quantizedEndStep: 2, program: 0},
    {pitch: 62, quantizedStartStep: 2, quantizedEndStep: 3, program: 0},
    {pitch: 63, quantizedStartStep: 3, quantizedEndStep: 4, program: 0},
    {pitch: 64, quantizedStartStep: 4, quantizedEndStep: 5, program: 0},
    {pitch: 65, quantizedStartStep: 5, quantizedEndStep: 6, program: 0},
    {pitch: 66, quantizedStartStep: 6, quantizedEndStep: 7, program: 0},
    {pitch: 67, quantizedStartStep: 7, quantizedEndStep: 8, program: 0},
    {pitch: 68, quantizedStartStep: 8, quantizedEndStep: 9, program: 0},
    {pitch: 69, quantizedStartStep: 9, quantizedEndStep: 10, program: 0},
    {pitch: 70, quantizedStartStep: 10, quantizedEndStep: 11, program: 0},
    {pitch: 71, quantizedStartStep: 11, quantizedEndStep: 12, program: 0},
    {pitch: 72, quantizedStartStep: 12, quantizedEndStep: 13, program: 0},
    {pitch: 73, quantizedStartStep: 13, quantizedEndStep: 14, program: 0},
    {pitch: 74, quantizedStartStep: 14, quantizedEndStep: 15, program: 0},
    {pitch: 75, quantizedStartStep: 15, quantizedEndStep: 16, program: 0},
    {pitch: 76, quantizedStartStep: 16, quantizedEndStep: 17, program: 0},
    {pitch: 77, quantizedStartStep: 17, quantizedEndStep: 18, program: 0},
    {pitch: 78, quantizedStartStep: 18, quantizedEndStep: 19, program: 0},
    {pitch: 79, quantizedStartStep: 19, quantizedEndStep: 20, program: 0},
    {pitch: 80, quantizedStartStep: 20, quantizedEndStep: 21, program: 0},
    {pitch: 81, quantizedStartStep: 21, quantizedEndStep: 22, program: 0},
    {pitch: 82, quantizedStartStep: 22, quantizedEndStep: 23, program: 0},
    {pitch: 83, quantizedStartStep: 23, quantizedEndStep: 24, program: 0}
  ],
  tempos: [{time: 0, qpm: 140}],
  keySignatures: [{time: 0, key: 0}],
  timeSignatures: [{time: 0, numerator: 2, denominator: 4}],
  totalQuantizedSteps: 24,
  quantizationInfo: {stepsPerQuarter: 2}
};

export const STAFF_USE_CASES: mm.INoteSequence = {
  notes: [
    {pitch: 65, startTime: 0, endTime: 4, program: 0, velocity: 128},
    {pitch: 65, startTime: 8, endTime: 10, program: 0, velocity: 112},
    {pitch: 65, startTime: 12, endTime: 13, program: 0, velocity: 96},
    {pitch: 65, startTime: 14, endTime: 14.5, program: 0, velocity: 80},
    {pitch: 65, startTime: 15, endTime: 15.25, program: 0, velocity: 64},
    {pitch: 65, startTime: 15.5, endTime: 15.625, program: 0, velocity: 48},
    {pitch: 65, startTime: 15.75, endTime: 15.8125, program: 0, velocity: 32},
    {pitch: 77, startTime: 15.875, endTime: 16.0625, program: 0},
    {pitch: 65, startTime: 20, endTime: 22, program: 0},
    {pitch: 77, startTime: 21, endTime: 23, program: 0},
    {pitch: 65, startTime: 25, endTime: 25.5, program: 0},
    {pitch: 66, startTime: 25.5, endTime: 26, program: 0},
    {pitch: 66, startTime: 26, endTime: 26.5, program: 0},
    {pitch: 65, startTime: 26.5, endTime: 27, program: 0},
    {pitch: 65, startTime: 27, endTime: 27.5, program: 0},
    {pitch: 66, startTime: 27.5, endTime: 28, program: 0},
    {pitch: 66, startTime: 28, endTime: 32.5, program: 0},
    {pitch: 66, startTime: 32.5, endTime: 33, program: 0},
    {pitch: 66, startTime: 33, endTime: 36, program: 0},
  ],
  tempos: [{time: 0, qpm: 60}],
  keySignatures: [{time: 0, key: 0}],
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  totalTime: 36
};

export const ANNA_MAGDALENA_BACH: mm.INoteSequence = {
  ticksPerQuarter: 480,
  timeSignatures: [{time: 0, numerator: 3, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  notes: [
    {
      pitch: 74,
      velocity: 128,
      startTime: 0,
      endTime: 0.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 0.5,
      endTime: 0.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 0.75,
      endTime: 1,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 1,
      endTime: 1.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 1.25,
      endTime: 1.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 1.5,
      endTime: 2,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 2,
      endTime: 2.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 2.5,
      endTime: 3,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 3,
      endTime: 3.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 3.5,
      endTime: 3.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 3.75,
      endTime: 4,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 4,
      endTime: 4.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 78,
      velocity: 128,
      startTime: 4.25,
      endTime: 4.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 79,
      velocity: 128,
      startTime: 4.5,
      endTime: 5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 5,
      endTime: 5.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 5.5,
      endTime: 6,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 6,
      endTime: 6.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 6.5,
      endTime: 6.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 6.75,
      endTime: 7,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 7,
      endTime: 7.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 7.25,
      endTime: 7.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 7.5,
      endTime: 8,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 8,
      endTime: 8.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 8.25,
      endTime: 8.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 8.5,
      endTime: 8.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 8.75,
      endTime: 9,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 66,
      velocity: 128,
      startTime: 9,
      endTime: 9.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 9.5,
      endTime: 9.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 9.75,
      endTime: 10,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 10,
      endTime: 10.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 10.25,
      endTime: 10.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 10.5,
      endTime: 11.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 11.25,
      endTime: 12,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 12,
      endTime: 12.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 12.5,
      endTime: 12.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 12.75,
      endTime: 13,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 13,
      endTime: 13.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 13.25,
      endTime: 13.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 13.5,
      endTime: 14,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 14,
      endTime: 14.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 14.5,
      endTime: 15,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 15,
      endTime: 15.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 15.5,
      endTime: 15.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 15.75,
      endTime: 16,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 16,
      endTime: 16.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 78,
      velocity: 128,
      startTime: 16.25,
      endTime: 16.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 79,
      velocity: 128,
      startTime: 16.5,
      endTime: 17,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 17,
      endTime: 17.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 17.5,
      endTime: 18,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 18,
      endTime: 18.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 18.5,
      endTime: 18.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 18.75,
      endTime: 19,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 19,
      endTime: 19.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 19.25,
      endTime: 19.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 19.5,
      endTime: 20,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 20,
      endTime: 20.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 20.25,
      endTime: 20.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 20.5,
      endTime: 20.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 20.75,
      endTime: 21,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 21,
      endTime: 21.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 21.5,
      endTime: 21.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 21.75,
      endTime: 22,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 22,
      endTime: 22.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 66,
      velocity: 128,
      startTime: 22.25,
      endTime: 22.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 22.5,
      endTime: 24,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 83,
      velocity: 128,
      startTime: 24,
      endTime: 24.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 79,
      velocity: 128,
      startTime: 24.5,
      endTime: 24.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 81,
      velocity: 128,
      startTime: 24.75,
      endTime: 25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 83,
      velocity: 128,
      startTime: 25,
      endTime: 25.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 79,
      velocity: 128,
      startTime: 25.25,
      endTime: 25.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 81,
      velocity: 128,
      startTime: 25.5,
      endTime: 26,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 26,
      endTime: 26.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 26.25,
      endTime: 26.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 78,
      velocity: 128,
      startTime: 26.5,
      endTime: 26.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 26.75,
      endTime: 27,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 79,
      velocity: 128,
      startTime: 27,
      endTime: 27.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 27.5,
      endTime: 27.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 78,
      velocity: 128,
      startTime: 27.75,
      endTime: 28,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 79,
      velocity: 128,
      startTime: 28,
      endTime: 28.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 28.25,
      endTime: 28.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 73,
      velocity: 128,
      startTime: 28.5,
      endTime: 29,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 29,
      endTime: 29.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 73,
      velocity: 128,
      startTime: 29.25,
      endTime: 29.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 29.5,
      endTime: 30,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 30,
      endTime: 30.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 30.25,
      endTime: 30.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 73,
      velocity: 128,
      startTime: 30.5,
      endTime: 30.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 30.75,
      endTime: 31,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 31,
      endTime: 31.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 78,
      velocity: 128,
      startTime: 31.25,
      endTime: 31.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 79,
      velocity: 128,
      startTime: 31.5,
      endTime: 32,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 78,
      velocity: 128,
      startTime: 32,
      endTime: 32.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 32.5,
      endTime: 33,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 78,
      velocity: 128,
      startTime: 33,
      endTime: 33.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 33.5,
      endTime: 34,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 73,
      velocity: 128,
      startTime: 34,
      endTime: 34.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 34.5,
      endTime: 36,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 36,
      endTime: 36.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 36.5,
      endTime: 36.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 66,
      velocity: 128,
      startTime: 36.75,
      endTime: 37,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 37,
      endTime: 37.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 76,
      velocity: 128,
      startTime: 37.5,
      endTime: 38,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 38,
      endTime: 38.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 66,
      velocity: 128,
      startTime: 38.25,
      endTime: 38.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 38.5,
      endTime: 39,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 39,
      endTime: 39.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 39.5,
      endTime: 40,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 40,
      endTime: 40.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 40.5,
      endTime: 40.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 40.75,
      endTime: 41,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 66,
      velocity: 128,
      startTime: 41,
      endTime: 41.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 41.25,
      endTime: 41.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 41.5,
      endTime: 42,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 42,
      endTime: 42.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 64,
      velocity: 128,
      startTime: 42.25,
      endTime: 42.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 66,
      velocity: 128,
      startTime: 42.5,
      endTime: 42.75,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 42.75,
      endTime: 43,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 43,
      endTime: 43.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 43.25,
      endTime: 43.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 72,
      velocity: 128,
      startTime: 43.5,
      endTime: 44,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 44,
      endTime: 44.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 69,
      velocity: 128,
      startTime: 44.5,
      endTime: 45,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 71,
      velocity: 128,
      startTime: 45,
      endTime: 45.25,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 74,
      velocity: 128,
      startTime: 45.25,
      endTime: 45.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 45.5,
      endTime: 46,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 66,
      velocity: 128,
      startTime: 46,
      endTime: 46.5,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 46.5,
      endTime: 48,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 46.5,
      endTime: 48,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      velocity: 128,
      startTime: 46.5,
      endTime: 48,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 0,
      endTime: 1,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 0,
      endTime: 1,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 0,
      endTime: 1,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 1,
      endTime: 1.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 1.5,
      endTime: 3,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 60,
      velocity: 128,
      startTime: 3,
      endTime: 4.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 4.5,
      endTime: 6,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 6,
      endTime: 7.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 7.5,
      endTime: 9,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 9,
      endTime: 9.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 9.5,
      endTime: 10,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 10,
      endTime: 10.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 10.5,
      endTime: 11,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 50,
      velocity: 128,
      startTime: 11,
      endTime: 11.25,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 60,
      velocity: 128,
      startTime: 11.25,
      endTime: 11.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 11.5,
      endTime: 11.75,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 11.75,
      endTime: 12,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 12,
      endTime: 13,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 13,
      endTime: 13.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 13.5,
      endTime: 14,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 14,
      endTime: 14.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 14.5,
      endTime: 15,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 60,
      velocity: 128,
      startTime: 15,
      endTime: 16.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 16.5,
      endTime: 17,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 60,
      velocity: 128,
      startTime: 17,
      endTime: 17.25,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 17.25,
      endTime: 17.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 17.5,
      endTime: 17.75,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 17.75,
      endTime: 18,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 18,
      endTime: 19,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 54,
      velocity: 128,
      startTime: 19,
      endTime: 19.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 19.5,
      endTime: 20.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 20.5,
      endTime: 21,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 60,
      velocity: 128,
      startTime: 21,
      endTime: 21.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 21.5,
      endTime: 22,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 50,
      velocity: 128,
      startTime: 22,
      endTime: 22.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 22.5,
      endTime: 23.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 43,
      velocity: 128,
      startTime: 23.5,
      endTime: 24,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 24,
      endTime: 25.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 54,
      velocity: 128,
      startTime: 25.5,
      endTime: 27,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 52,
      velocity: 128,
      startTime: 27,
      endTime: 27.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 27.5,
      endTime: 28,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 52,
      velocity: 128,
      startTime: 28,
      endTime: 28.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 28.5,
      endTime: 29.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 45,
      velocity: 128,
      startTime: 29.5,
      endTime: 30,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 30,
      endTime: 31.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 31.5,
      endTime: 32,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 32,
      endTime: 32.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 61,
      velocity: 128,
      startTime: 32.5,
      endTime: 33,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 33,
      endTime: 33.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 54,
      velocity: 128,
      startTime: 33.5,
      endTime: 34,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 34,
      endTime: 34.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 34.5,
      endTime: 35,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 50,
      velocity: 128,
      startTime: 35,
      endTime: 35.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 60,
      velocity: 128,
      startTime: 35.5,
      endTime: 36,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 36,
      endTime: 37,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 36.5,
      endTime: 37.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 37,
      endTime: 37.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 60,
      velocity: 128,
      startTime: 37.5,
      endTime: 38.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 64,
      velocity: 128,
      startTime: 38,
      endTime: 39,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 60,
      velocity: 128,
      startTime: 38.5,
      endTime: 39,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      velocity: 128,
      startTime: 39,
      endTime: 39.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 57,
      velocity: 128,
      startTime: 39.5,
      endTime: 40,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 40,
      endTime: 40.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 62,
      velocity: 128,
      startTime: 40.5,
      endTime: 41.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 50,
      velocity: 128,
      startTime: 42,
      endTime: 43.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 54,
      velocity: 128,
      startTime: 43,
      endTime: 43.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 52,
      velocity: 128,
      startTime: 43.5,
      endTime: 44,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 44,
      endTime: 44.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 54,
      velocity: 128,
      startTime: 44.5,
      endTime: 45,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 45,
      endTime: 45.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 47,
      velocity: 128,
      startTime: 45.5,
      endTime: 46,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 50,
      velocity: 128,
      startTime: 46,
      endTime: 46.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 55,
      velocity: 128,
      startTime: 46.5,
      endTime: 47,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 50,
      velocity: 128,
      startTime: 47,
      endTime: 47.5,
      instrument: 1,
      program: 1,
      isDrum: false
    },
    {
      pitch: 43,
      velocity: 128,
      startTime: 47.5,
      endTime: 48,
      instrument: 1,
      program: 1,
      isDrum: false
    }
  ],
  totalTime: 48,
  sourceInfo: {encodingType: 3, parser: 6}
}