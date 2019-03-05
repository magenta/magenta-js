/**
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
//@ts-ignore
import * as Tone from 'tone';

import {istft, stft} from '../src/gansynth/audio_utils';
import * as mm from '../src/index';

import {TEST_AUDIO} from './gansynth_audio_test_const';

mm.logging.verbosity = mm.logging.Level.DEBUG;

async function array_dump(array: Float32Array|Float32Array[]) {
  console.log(JSON.stringify(array));
}

function Float32Concat(first: Float32Array, second: Float32Array) {
  const firstLength = first.length;
  const result = new Float32Array(firstLength + second.length);
  result.set(first);
  result.set(second, firstLength);
  return result;
}

async function runAudioTest() {
  console.log('Yay!!');

  // Testing inverse fourier transform
  const SR = 16000;
  const T = 0.1;

  // const audioArray =
  //     tf.sin(tf.linspace(0, 800 * 2 * Math.PI, T * SR)).dataSync();
  // const audio = new Float32Array(audioArray);
  const testAudio = TEST_AUDIO;
  array_dump(testAudio);
  // pad up front
  const nPad = 4096;
  const padding = new Float32Array(nPad);
  const audio = Float32Concat(padding, testAudio);

  const specParams =
      {nFft: 2048, winLength: 2048, hopLength: 512, sampleRate: SR};
  const reIm = stft(audio, specParams);
  // array_dump(reIm);
  const ispecParams =
      {nFft: 2048, winLength: 2048, hopLength: 512, sampleRate: SR};
  const reconPad = istft(reIm, ispecParams);
  const recon = reconPad.slice(nPad, reconPad.length);
  array_dump(recon);
  const audioBuffer = Tone.context.createBuffer(1, T * SR, SR);
  audioBuffer.copyToChannel(recon, 0, 0);
  const options = {'url': audioBuffer, 'loop': true};
  const player = new Tone.Player(options).toMaster();
  player.start();
}

try {
  Promise.all([
    runAudioTest(),
  ]);
} catch (err) {
  console.error(err);
}
