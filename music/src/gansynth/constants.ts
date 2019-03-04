/**
 * Constants for transcription.
 *
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export const MAG_DESCALE_A = 0.0661371661726;
export const MAG_DESCALE_B = 0.113718730221;
export const PHASE_DESCALE_A = 0.8;
export const PHASE_DESCALE_B = 0.0;

export const N_LATENTS = 256;
export const N_PITCHES = 61;

export const SAMPLE_RATE = 16000;
export const N_HOP = 512;
export const N_FFT = 2048;

export const MIN_MIDI_PITCH = 24;
export const MAX_MIDI_PITCH = 84;
export const MIDI_PITCHES = MAX_MIDI_PITCH - MIN_MIDI_PITCH + 1;
