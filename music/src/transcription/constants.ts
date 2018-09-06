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
export const SAMPLE_RATE = 16000;
export const SPEC_HOP_LENGTH = 512;
export const FRAME_LENGTH_SECONDS = SPEC_HOP_LENGTH / SAMPLE_RATE;
export const MEL_SPEC_BINS = 229;

export const MIN_MIDI_PITCH = 21;
export const MAX_MIDI_PITCH = 108;
export const MIDI_PITCHES = MAX_MIDI_PITCH - MIN_MIDI_PITCH + 1;
