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
import * as Tone from 'tone';
import * as tf from '@tensorflow/tfjs';
import { resampleAndMakeMono, hzToMidi } from '../core/audio_utils';
import { mixAndJoinAudioData } from './audio_utils';
import {
  CROSSFADE_DURATION,
  MODEL_SAMPLE_RATE,
  OUTPUT_SAMPLE_RATE,
  LOWEST_LD,
  CONF_SMOOTH_SIZE,
  CONF_THRESHOLD,
  LD_CONF_REDUCTION,
  MODEL,
  PRESET_MODELS,
  MODEL_FRAME_RATE,
  MIN_VRAM,
} from './constants';
import { AudioFeatures, CUSTOM_MODEL } from './interfaces';
import { computePower } from './loudness_utils';
import { getPitches, upsample_f0, shiftF0 } from './pitch_utils';
import { startSpice } from './spice';
import { Tensor3D, Tensor } from '@tensorflow/tfjs';
import { addReverb } from './add_reverb';
import { arrayBufferToAudioBuffer } from './buffer_utils';

async function memCheck() {
  const bytesPerMB = 1024 * 1024;
  const screenResToVRAMFactor = 600;
  const screenSize = window.screen.availWidth * window.screen.availHeight;
  const DPI = window.devicePixelRatio;

  // checking of vram ensures that the device can hold
  // all the models and operations
  const vramSize = Math.round(
    (screenSize * DPI * screenResToVRAMFactor) / bytesPerMB
  );

  // 50MB limit
  if (!isNaN(vramSize) && vramSize < MIN_VRAM) {
    throw new Error('Insufficient memory');
  }

  // loading a model and then executing it tests if
  // the device can hold the texture size needed by the model
  // load the biggest model and test it
  try {
    await tf.ready();

    if (tf.getBackend() !== 'webgl') {
      throw new Error('browser does not support webgl');
    }
  } catch (err) {
    throw new Error(`insufficient memory - ${err}`);
  }

  return true;
}

async function getModel(url: string) {
  tf.registerOp('Roll', (node) => {
    const tensors = tf.split(node.inputs[0], 2, 2);
    const result = tf.concat([tensors[1], tensors[0]], 2);
    tensors.forEach((tensor) => tensor.dispose());
    return result;
  });
  tf.env().set('WEBGL_PACK', false);
  tf.env().set('WEBGL_CONV_IM2COL', false);
  tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 100 * 1024 * 1024);
  const model = await tf.loadGraphModel(url);
  return model;
}

async function getAudioFeatures(
  inputAudioBuffer: AudioBuffer
): Promise<AudioFeatures> {
  const spiceModel = await startSpice();
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
  const { pitches, confidences } = await getPitches(spiceModel, audioData);

  return {
    f0_hz: pitches,
    loudness_db: powerTmp as number[],
    confidences,
    originalRecordedBufferLength,
  };
}

function resizeAudioFeatures(
  audioFeatures: AudioFeatures,
  startingFrame: number,
  endingFrame: number,
  isLastChunks: boolean,
  resizedLength: number
): Promise<AudioFeatures> {
  return new Promise((resolve) => {
    const resizedAudioFeatures = {
      loudness_db: [0],
      f0_hz: [0],
    };
    let counter = 0;
    for (let i = startingFrame; i < endingFrame; i++) {
      if (isLastChunks && i >= resizedLength) {
        resizedAudioFeatures.loudness_db[counter] = LOWEST_LD;
        resizedAudioFeatures.f0_hz[counter] = -1;
      } else {
        resizedAudioFeatures.loudness_db[counter] =
          audioFeatures.loudness_db[i];
        resizedAudioFeatures.f0_hz[counter] = audioFeatures.f0_hz[i];
      }
      counter += 1;
    }

    resolve(resizedAudioFeatures);
  });
}

async function ddsp_process(
  inputs: AudioFeatures,
  inputDataLength: number,
  model: tf.GraphModel,
  modelValues: CUSTOM_MODEL
) {
  // we have to process the audio in chunks according
  // to the model max frame length
  // eg. if we have a 10s input and a 5s model, we'll have
  // to splice our input into 2, process it twice, and then stitch it
  // stitching the inputs require a linear mask to prevent an audible blip
  // we overlap the last second and the first second of 2 conjoining chunks.
  // eg. for a 10s input [1,2,3,4,5] + [5,6,7,8,9] + [9,10]
  const audioChunks = [];
  const inputFrameLength = inputs.loudness_db.length;
  const inputAudioLengthInSecs = convertFrameToSecs(inputFrameLength);
  let isLastChunks = false;
  const usableAudioDuration = convertFrameToSecs(
    modelValues.modelMaxFrameLength
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
      inputs,
      startFrameIndex,
      endFrameIndex,
      isLastChunks,
      inputFrameLength
    );

    // tslint:disable-next-line: variable-name
    const f0hzTensor = tf.tensor1d(f0_hz, 'float32');
    // tslint:disable-next-line: variable-name
    const loudnessTensor = tf.tensor1d(loudness_db, 'float32');

    const result = await model.predict({
      f0_hz: f0hzTensor,
      loudness_db: loudnessTensor,
    });

    // apply a loudness modifier here to make some
    // models louder/softer
    const resultModified = (result as Tensor).mul(modelValues.postGain || 1);
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
    inputDataLength
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

  model.dispose();

  return bufferWithReverbData;
}

async function normalizeAudioFeatures(af: AudioFeatures, model: CUSTOM_MODEL) {
  const SELECTED_LD_AVG_MAX = model.averageMaxLoudness;
  const SELECTED_LD_MEAN = model.meanLoudness;
  const SELECTED_LD_THRESH = model.loudnessThreshold;
  const SELECTED_P_MEAN = model.meanPitch;

  // tslint:disable-next-line: variable-name
  let loudness_db: number[] = [];
  let maskedPower;

  if (af.loudness_db.length > 0) {
    // Adjust the peak loudness.
    const ldShifted = tf.tidy(() => {
      const inputLoudnessTensor = tf.tensor1d(af.loudness_db, 'float32');
      const ldMax = inputLoudnessTensor.max();
      const ldDiffMax = tf.sub(SELECTED_LD_AVG_MAX, ldMax);
      // shift the max of power_db from user down to max of instrument power_db
      const final = tf.add(inputLoudnessTensor, ldDiffMax);
      inputLoudnessTensor.dispose();
      ldMax.dispose();
      ldDiffMax.dispose();

      return final; //af.loudness_db.add(ldDiffMax)
    });

    // Further adjust the average loudness above a threshold.
    const ldShiftedGreater = ldShifted.greater(SELECTED_LD_THRESH);
    const ldGreater = await tf.booleanMaskAsync(ldShifted, ldShiftedGreater);
    const ldGreaterVal = await ldGreater.array();

    const ldFinal = tf.tidy(() => {
      const ldMean = ldGreaterVal > 0 ? ldGreater.mean() : ldShifted.mean();

      const ldDiffMean = tf.sub(SELECTED_LD_MEAN, ldMean);
      const ldDiffMeanAdded = ldShifted.add(ldDiffMean);

      const loudnessAdjustment = 0;
      const ldAdjusted = ldDiffMeanAdded.add(loudnessAdjustment);

      const ldClipped = ldAdjusted.clipByValue(LOWEST_LD, SELECTED_LD_AVG_MAX);

      // rescale
      const oldMin = ldClipped.min();
      const subOldMin = ldMean.sub(oldMin);
      return ldClipped
        .sub(oldMin)
        .div(subOldMin)
        .mul(SELECTED_LD_MEAN - LOWEST_LD)
        .add(LOWEST_LD);
    });

    const reshapedConf = tf.reshape(af.confidences, [-1, 1, 1]);
    const smoothConf = tf.pool(
      reshapedConf as Tensor3D,
      [CONF_SMOOTH_SIZE, 1],
      'avg',
      'same'
    );
    const smoothConfReshaped = smoothConf.reshape([-1]);
    const confMask = tf.lessEqual(smoothConfReshaped, CONF_THRESHOLD);

    maskedPower = tf.tidy(() => {
      const confReduction = confMask.mul(LD_CONF_REDUCTION);
      const loudnessReduced = ldFinal.add(confReduction);
      const finalMaskedPower = tf.maximum(loudnessReduced, LOWEST_LD);
      confReduction.dispose();
      loudnessReduced.dispose();
      return finalMaskedPower;
    });

    loudness_db = (await maskedPower.array()) as number[];

    ldShiftedGreater.dispose();
    ldShifted.dispose();
    ldFinal.dispose();
    ldGreater.dispose();
    smoothConf.dispose();
    smoothConfReshaped.dispose();
    reshapedConf.dispose();
    confMask.dispose();
  }
  // tslint:disable-next-line: variable-name
  let f0_hz: number[] = [];
  if (af.f0_hz.length > 0) {
    // shift the pitch register.
    const _p = await hzToMidi(af.f0_hz);

    const p = tf.tidy(() => {
      for (let i = 0, n = _p.length; i < n; ++i) {
        if (_p[i] === -Infinity) {
          _p[i] = 0;
        }
      }

      return _p;
    });

    const confMask = tf.lessEqual(af.confidences, CONF_THRESHOLD);
    const maskedPowerThreshold = maskedPower.greater(SELECTED_LD_THRESH);
    const mask = tf.logicalOr(confMask, maskedPowerThreshold);
    const pMask = await tf.booleanMaskAsync(p, mask);
    const pMean = pMask.mean();
    const pDiff = await tf.sub(SELECTED_P_MEAN, pMean);
    const pDiffVal = await pDiff.array();

    const finalf0 = tf.tidy(() => {
      let pDiffOctave = (pDiffVal as number) / 12;
      pDiffOctave = Math.round(pDiffOctave);
      const shiftedF0WithOctave = shiftF0(af.f0_hz, pDiffOctave);
      return shiftedF0WithOctave;
    });

    f0_hz = (await finalf0.array()) as number[];

    maskedPower.dispose();
    pMean.dispose();
    pMask.dispose();
    pDiff.dispose();
    finalf0.dispose();
    maskedPowerThreshold.dispose();
    mask.dispose();
    confMask.dispose();
  }
  return { f0_hz, loudness_db };
}

async function synthesize(
  selectedModel: MODEL | CUSTOM_MODEL,
  af: AudioFeatures
) {
  const { f0_hz, loudness_db, confidences } = af;
  let modelValues;

  if (typeof selectedModel === 'string') {
    modelValues = PRESET_MODELS[selectedModel];
  } else {
    modelValues = selectedModel;
  }

  // we need to upsample pitches because spice
  // gives back something that is smaller
  const upsampledPitches = upsample_f0(
    f0_hz,
    loudness_db.length,
    modelValues.modelMaxFrameLength
  );
  const upsampledConfidences = upsample_f0(
    confidences,
    loudness_db.length,
    modelValues.modelMaxFrameLength
  );

  const model = await getModel(modelValues.modelUrl);

  const normalizedAudioFeatures = await normalizeAudioFeatures(
    { f0_hz: upsampledPitches, loudness_db, confidences: upsampledConfidences },
    modelValues
  );

  return await ddsp_process(
    normalizedAudioFeatures,
    af.originalRecordedBufferLength,
    model,
    modelValues
  );
}

function convertSecsToFrame(secs: number) {
  return secs * MODEL_FRAME_RATE;
}
function convertFrameToSecs(frameLength: number) {
  return frameLength / MODEL_FRAME_RATE;
}

export { getAudioFeatures, memCheck, synthesize };
