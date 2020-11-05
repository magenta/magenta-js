/**
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
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';
import {
  CONF_THRESHOLD,
  PT_SLOPE,
  PT_OFFSET,
  PITCH_CONF_JITTER,
} from './constants';
import { AudioData } from './interfaces';
import { Tensor } from '@tensorflow/tfjs';

function upsample_linear(
  spicePitchesOutput: number[],
  newSampleRateLength: number
) {
  const pitchedInput = [];
  const dupCountPitches = Math.floor(
    newSampleRateLength / spicePitchesOutput.length
  );
  const modulos = newSampleRateLength % spicePitchesOutput.length;

  for (let i = 0; i < spicePitchesOutput.length; i++) {
    pitchedInput.push(spicePitchesOutput[i]);
    for (let j = 1; j < dupCountPitches; j++) {
      pitchedInput.push(-1);
    }
    if (i < modulos) {
      pitchedInput.push(-1);
    }
  }

  //cover missing pitches
  let lastPitch = -1;
  for (let i = 0; i < pitchedInput.length; i++) {
    if (pitchedInput[i] !== -1) {
      let dif: number = pitchedInput[i];
      const lastValue: number = lastPitch >= 0 ? pitchedInput[lastPitch] : 0;
      if (lastPitch !== -1) {
        dif -= pitchedInput[lastPitch];
      }
      for (let j = lastPitch + 1; j < i; j++) {
        // tslint:disable-next-line: restrict-plus-operands
        pitchedInput[j] = lastValue + (dif * (j - lastPitch)) / (i - lastPitch);
      }
      lastPitch = i;
    }
  }
  //solve trailing -1
  for (let i = lastPitch + 1; i < pitchedInput.length; i++) {
    pitchedInput[i] = lastPitch >= 0 ? pitchedInput[i - 1] : 0;
  }

  return pitchedInput;
}

function upsample_f0(
  buffer: number[],
  newSampleRateLength: number,
  modelMaxFrameLength: number
) {
  buffer.splice(modelMaxFrameLength);

  return upsample_linear(buffer, newSampleRateLength);
}

function getPitchHz(modelPitch: number) {
  const fmin = 10.0;
  const binsPerOctave = 12.0;
  const cqtBin = modelPitch * PT_SLOPE + PT_OFFSET;
  return fmin * Math.pow(2.0, (1.0 * cqtBin) / binsPerOctave);
}

async function getPitches(spiceModel: tf.GraphModel, inputData: AudioData) {
  const SPICE_SAMPLE_RATE = 16000;
  const SPICE_MODEL_MULTIPLE = 512;
  const spicePitchesOutput = [];
  const allConfidences = [];
  const audioChannelDataLength = inputData.length;

  const inputTensor = tf.tensor(inputData);
  const inputSampleNum =
    Math.ceil(audioChannelDataLength / SPICE_MODEL_MULTIPLE) *
    SPICE_MODEL_MULTIPLE; //always multiple of 512;
  const fullInputWithPadding = inputTensor.pad([
    [0, inputSampleNum - audioChannelDataLength],
  ]);
  const expectedDuration = fullInputWithPadding.size / SPICE_SAMPLE_RATE;

  // determine if slicing is needed
  const output = await spiceModel.execute({
    input_audio_samples: fullInputWithPadding,
  });
  // @ts-ignore
  let uncertainties = await output[0].data();
  // @ts-ignore
  const pitches = await output[1].data();

  //spice extracts 1 pitch for every 32ms, so to get duration,
  // we multiply it by 32
  //we minus one to offset for the zero
  //to convert it into seconds, we divide by 1000
  if (((pitches.length - 1) * 32) / 1000 === expectedDuration) {
    let lastPitch = 20.0;

    for (let i = 0; i < pitches.length; ++i) {
      const confidence = 1.0 - uncertainties[i];
      allConfidences.push(confidence);
      if (confidence >= CONF_THRESHOLD) {
        lastPitch = getPitchHz(pitches[i]);
        spicePitchesOutput.push(lastPitch);
      } else {
        const noise = tf.truncatedNormal([1], 0.0, PITCH_CONF_JITTER);

        // @ts-ignore
        const jitter = 1.0 - noise.dataSync();
        spicePitchesOutput.push(lastPitch * jitter);
        noise.dispose();
      }
    }
  } else {
    // we try splicing it into 4 parts to run spice again, then combine it all
    const finalPitchesLength = inputSampleNum / SPICE_MODEL_MULTIPLE + 1;
    const stitchedPitches = new Float32Array(finalPitchesLength);
    uncertainties = new Float32Array(finalPitchesLength);
    for (let i = 0; i < inputSampleNum; i += inputSampleNum / 4) {
      const partialInput = fullInputWithPadding.slice(
        [i],
        [inputSampleNum / 4]
      );
      const partialOutput = await spiceModel.execute({
        input_audio_samples: partialInput,
      });
      // @ts-ignore
      const partialUncertainties = await partialOutput[0].data();
      // @ts-ignore
      const partialPitches = await partialOutput[1].data();
      const index = Math.floor(i / SPICE_MODEL_MULTIPLE);
      uncertainties.set(partialUncertainties, index);
      stitchedPitches.set(partialPitches, index);
      partialInput.dispose();
      // @ts-ignore
      partialOutput[0].dispose();
      // @ts-ignore
      partialOutput[1].dispose();
    }

    let lastPitch = 20.0;

    for (let i = 0; i < stitchedPitches.length; ++i) {
      const confidence = 1.0 - uncertainties[i];
      allConfidences.push(confidence);
      if (confidence >= CONF_THRESHOLD) {
        lastPitch = getPitchHz(stitchedPitches[i]);
        spicePitchesOutput.push(lastPitch);
      } else {
        const noise = tf.truncatedNormal([1], 0.0, PITCH_CONF_JITTER);

        // @ts-ignore
        const jitter = 1.0 - noise.dataSync();
        spicePitchesOutput.push(lastPitch * jitter);
        noise.dispose();
      }
    }
  }

  // @ts-ignore
  output[0].dispose();
  // @ts-ignore
  output[1].dispose();
  inputTensor.dispose();
  fullInputWithPadding.dispose();
  return { pitches: spicePitchesOutput, confidences: allConfidences };
}

export { getPitches, upsample_f0, upsample_linear };
