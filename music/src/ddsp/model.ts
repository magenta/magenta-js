/**
 * Core implementation for [DDSP]{@link
 * https://g.co/magenta/ddsp} models.
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

/**
 * Imports.
 */
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as Tone from 'tone';

import {
  memCheck,
  getModel,
  normalizeAudioFeatures,
  convertFrameToSecs,
  convertSecsToFrame,
  resizeAudioFeatures,
} from './ddsp';
import { AudioFeatures, ModelValues } from './interfaces';
import { Tensor } from '@tensorflow/tfjs';
import { mixAndJoinAudioData } from './audio_utils';
import { arrayBufferToAudioBuffer } from './buffer_utils';
import { OUTPUT_SAMPLE_RATE, CROSSFADE_DURATION } from './constants';
import { addReverb } from './add_reverb';
import { resampleAndMakeMono } from '../core/audio_utils';
import { MODEL_SAMPLE_RATE } from '../spice/spice';
import { upsample_f0 } from '../spice/pitch_utils';

class DDSP {
  private initialized: boolean;
  private checkpointUrl: string;
  private model: tf.GraphModel;
  private settings: ModelValues;

  /**
   * `DDSP` constructor.
   */
  constructor(checkpointUrl: string, settings?: ModelValues) {
    this.checkpointUrl = checkpointUrl;
    if (settings) {
      this.settings = settings;
    }
  }

  /**
   * Loads variables from the checkpoint and builds the model graph.
   */
  async initialize() {
    tf.registerOp('Roll', (node) => {
      const tensors = tf.split(node.inputs[0], 2, 2);
      const result = tf.concat([tensors[1], tensors[0]], 2);
      tensors.forEach((tensor) => tensor.dispose());
      return result;
    });
    tf.env().set('WEBGL_PACK', false);
    tf.env().set('WEBGL_CONV_IM2COL', false);
    tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 100 * 1024 * 1024);

    this.model = await getModel(`${this.checkpointUrl}/model.json`);

    let settings;
    try {
      settings = await fetch(
        `${this.checkpointUrl}/settings.json`
      ).then((res) => res.json());
    } finally {
      if (this.settings === null) {
        throw new Error(
          'Passing settings is required if you do not have a settings.json file.'
        );
      }
    }
    this.settings = {
      ...settings,
      ...this.settings,
    };
    console.log('settings', settings);
    console.log('this.settings', this.settings);
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    if (!this.initialized) {
      return;
    }
    this.model.dispose();
    this.checkpointUrl = null;
    this.initialized = false;
  }

  /**
   * Returns true if model is intialized.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Include memCheck as a member method for API/export.
   *
   * @param memCheck An AudioBuffer
   * @returns Audio Features of provided audio buffer
   */
  async memCheck(): Promise<boolean> {
    return await memCheck();
  }

  /**
   * Synthesizes audio features based on model.
   *
   * @param inputAudioBuffer An AudioBuffer
   * @returns Audio Features of provided audio buffer
   */
  async synthesize(
    audioFeatures: AudioFeatures,
    settings?: ModelValues
  ): Promise<Float32Array> {
    if (settings !== null) {
      this.settings = { ...this.settings, ...settings };
    }

    const { f0_hz, loudness_db, confidences } = audioFeatures;

    // we need to upsample pitches because spice
    // gives back something that is smaller
    const upsampledPitches = upsample_f0(
      f0_hz,
      loudness_db.length,
      this.settings.modelMaxFrameLength
    );
    const upsampledConfidences = upsample_f0(
      confidences,
      loudness_db.length,
      this.settings.modelMaxFrameLength
    );

    const normalizedAudioFeatures = await normalizeAudioFeatures(
      {
        f0_hz: upsampledPitches,
        loudness_db,
        confidences: upsampledConfidences,
      },
      this.settings
    );

    // we have to process the audio in chunks according
    // to the model max frame length
    // eg. if we have a 10s input and a 5s model, we'll have
    // to splice our input into 2, process it twice, and then stitch it
    // stitching the inputs require a linear mask to prevent an audible blip
    // we overlap the last second and the first second of 2 conjoining chunks.
    // eg. for a 10s input [1,2,3,4,5] + [5,6,7,8,9] + [9,10]
    const audioChunks = [];
    const inputFrameLength = normalizedAudioFeatures.loudness_db.length;
    const inputAudioLengthInSecs = convertFrameToSecs(inputFrameLength);
    let isLastChunks = false;
    const usableAudioDuration = convertFrameToSecs(
      this.settings.modelMaxFrameLength
    );
    let audioBuffer;

    const mixBufferLength = CROSSFADE_DURATION * MODEL_SAMPLE_RATE;
    for (
      let i = 0;
      i < inputAudioLengthInSecs;
      i += usableAudioDuration - CROSSFADE_DURATION
    ) {
      const startFrameIndex = Math.floor(convertSecsToFrame(i));
      const endFrameIndex = convertSecsToFrame(i + usableAudioDuration);
      if (endFrameIndex > inputFrameLength) {
        isLastChunks = true;
      }

      // tslint:disable-next-line: variable-name
      const { f0_hz, loudness_db }: AudioFeatures = await resizeAudioFeatures(
        normalizedAudioFeatures,
        startFrameIndex,
        endFrameIndex,
        isLastChunks,
        inputFrameLength
      );

      // tslint:disable-next-line: variable-name
      const f0hzTensor = tf.tensor1d(f0_hz, 'float32');
      // tslint:disable-next-line: variable-name
      const loudnessTensor = tf.tensor1d(loudness_db, 'float32');

      const result = await this.model.predict({
        f0_hz: f0hzTensor,
        loudness_db: loudnessTensor,
      });

      // apply a loudness modifier here to make some
      // models louder/softer
      const resultModified = (result as Tensor).mul(
        this.settings.postGain || 1
      );
      const resultModifiedData = await resultModified.data();
      audioChunks.push(resultModifiedData);

      resultModified.dispose();
      (result as Tensor).dispose();
      f0hzTensor.dispose();
      loudnessTensor.dispose();
    }

    // does not require stiching
    if (inputAudioLengthInSecs <= usableAudioDuration) {
      audioBuffer = audioChunks[0];
    } else {
      const buffers = [];
      for (let i = 0; i < audioChunks.length; i++) {
        const ac = audioChunks[i];
        buffers.push(ac);
      }
      audioBuffer = mixAndJoinAudioData(buffers, mixBufferLength);
    }

    // trim off the extra bits
    // tslint:disable-next-line: max-line-length
    const trimmedAudioChannelData: Float32Array = (audioBuffer as Float32Array).slice(
      0,
      audioFeatures.originalRecordedBufferLength
    );

    const audioCtx = new Tone.Context();
    const trimmedAudioBuffer = arrayBufferToAudioBuffer(
      audioCtx,
      trimmedAudioChannelData,
      MODEL_SAMPLE_RATE
    );
    const resampledAudio = await resampleAndMakeMono(
      trimmedAudioBuffer,
      OUTPUT_SAMPLE_RATE
    );
    const bufferWithReverbData = await addReverb({
      audioCtx,
      arrayBuffer: resampledAudio,
      sampleRate: OUTPUT_SAMPLE_RATE,
    });

    return bufferWithReverbData;
  }
}

export { DDSP };
