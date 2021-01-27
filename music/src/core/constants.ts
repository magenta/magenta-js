/**
 * Global constants.
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
 * Null comment for documentation generation.
 */
null;  // tslint:disable-line:no-unused-expression

export const DEFAULT_QUARTERS_PER_MINUTE = 120.0;
// 4/4 music sampled at 4 steps per quarter note.
export const DEFAULT_STEPS_PER_BAR = 16;
export const DEFAULT_STEPS_PER_QUARTER = 4;

// Default absolute quantization.
export const DEFAULT_STEPS_PER_SECOND = 100;

export const DEFAULT_VELOCITY = 80;
export const DEFAULT_PROGRAM = 0;
export const DEFAULT_TICKS_PER_QUARTER = 220;
export const DEFAULT_CHANNEL = 0;
export const DRUM_CHANNEL = 9;
export const NON_DRUM_CHANNELS : ReadonlyArray<number> =
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15];
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
  [51, 52, 53, 59, 82]
];

// Velocity-related constants.
export const MIN_MIDI_VELOCITY = 0;
export const MAX_MIDI_VELOCITY = 127;
export const MIDI_VELOCITIES = MAX_MIDI_VELOCITY - MIN_MIDI_VELOCITY + 1;

// Pitch-related constants.
export const NO_CHORD = 'N.C.';
export const NUM_PITCH_CLASSES = 12;
export const MIN_MIDI_PITCH = 0;
export const MAX_MIDI_PITCH = 127;
export const MIDI_PITCHES = MAX_MIDI_PITCH - MIN_MIDI_PITCH + 1;
export const MIN_PIANO_PITCH = 21;
export const MAX_PIANO_PITCH = 108;
export const MIN_DRUM_PITCH = 35;
export const MAX_DRUM_PITCH = 81;

// Program-related constants.
export const MIN_MIDI_PROGRAM = 0;
export const MAX_MIDI_PROGRAM = 127;

// Click-track constants.
export const LO_CLICK_PITCH = 89;
export const HI_CLICK_PITCH = 90;
export const LO_CLICK_CLASS = 9;
export const HI_CLICK_CLASS = 10;
