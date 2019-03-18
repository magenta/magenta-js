/**
 * Utiltities for loading audio and computing mel spectrograms, based on
 * {@link https://github.com/google/web-audio-recognition/blob/librosa-compat}.
 * TODO(adarob): Rewrite using tfjs.
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
// tslint:disable-next-line:max-line-length
import {melSpectrogram, powerToDb, resampleAndMakeMono} from '../core/audio_utils';
import {MEL_SPEC_BINS, SAMPLE_RATE, SPEC_HOP_LENGTH} from './constants';

/**
 * Resamples and computes a log mel spectrogram from the given AudioBuffer.
 *
 * @param audioBuffer An audio buffer to transcribe.
 * @returns The log mel spectrogram based on the AudioBuffer.
 */
export async function preprocessAudio(audioBuffer: AudioBuffer) {
  const resampledMonoAudio = await resampleAndMakeMono(audioBuffer);
  return powerToDb(melSpectrogram(resampledMonoAudio, {
    sampleRate: SAMPLE_RATE,
    hopLength: SPEC_HOP_LENGTH,
    nMels: MEL_SPEC_BINS,
    nFft: 2048,
    fMin: 30,
  }));
}
