/**
 *
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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

import * as tf from '@tensorflow/tfjs';
import { resampleAndMakeMono } from '../core/audio_utils';
import { computePower } from './loudness_utils';
import { AudioFeatures } from '../ddsp/interfaces';
import { getPitches } from './pitch_utils';

// SPICE SPECIFIC CONSTANTS
const SPICE_MODEL_URL = 'https://tfhub.dev/google/tfjs-model/spice/2/default/1';
export const MODEL_SAMPLE_RATE = 16000;
export const MODEL_FRAME_RATE = 250;
export const PT_OFFSET = 25.58;
export const PT_SLOPE = 63.07;

// Pitch and confidence related settings
export const PITCH_CONF_JITTER = 0.002;
export const CONF_THRESHOLD = 0.7;

async function startSpice() {
  let spiceModel;

  spiceModel = await tf.loadGraphModel(SPICE_MODEL_URL, {
    fromTFHub: true,
  });

  return spiceModel;
}

async function getAudioFeatures(
  inputAudioBuffer: AudioBuffer,
  spiceModel: tf.GraphModel,
  confidenceThreshold?: number
): Promise<AudioFeatures> {
  if (tf.getBackend() !== 'webgl') {
    throw new Error('Device does not support webgl.');
  }

  // spice requires 16k sample rate and mono,
  // so we need to downsample and make mono
  const audioData = await resampleAndMakeMono(
    inputAudioBuffer,
    MODEL_SAMPLE_RATE
  );
  const originalRecordedBufferLength = audioData.length;

  const powerTmp = await computePower(audioData);
  const { pitches, confidences } = await getPitches(
    spiceModel,
    audioData,
    confidenceThreshold
  );

  return {
    f0_hz: pitches,
    loudness_db: powerTmp as number[],
    confidences,
    originalRecordedBufferLength,
  };
}

export { startSpice, getAudioFeatures };
