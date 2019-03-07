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
import * as tf from '@tensorflow/tfjs-core';
import * as Tone from 'tone';

import {specgramsToAudio} from '../src/gansynth/audio_utils';
import * as mm from '../src/index';

import {CHECKPOINTS_DIR, writeMemory, writeTimer} from './common';

const GANSYNTH_CHECKPOINT = `${CHECKPOINTS_DIR}/gansynth/acoustic_only`;

mm.logging.verbosity = mm.logging.Level.DEBUG;

async function plotSpectra(
    spectra: tf.Tensor4D, canvasId: string, channel: number) {
  // Slice a single example.
  const spectraSlice = tf.slice(spectra, [0, 0, 0, channel], [
                           1, -1, -1, 1
                         ]).reshape([128, 1024]);
  let spectraPlot = spectraSlice as tf.Tensor3D;
  // Scale to [0, 1].
  spectraPlot = tf.sub(spectraPlot, tf.min(spectraPlot));
  spectraPlot = tf.div(spectraPlot, tf.max(spectraPlot));
  // Plot on canvas.
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  await tf.browser.toPixels(spectraPlot, canvas);
}

async function runGANSynth() {
  const gansynth = new mm.GANSynth(GANSYNTH_CHECKPOINT);
  await gansynth.initialize();

  const start = await performance.now();
  const specgrams = await gansynth.randomSample(36);
  const audio = await specgramsToAudio(specgrams);
  await writeTimer('single-sample-gen-time', start);

  // Play sound.
  const T = 4.0;
  const SR = 16000;

  const audioBuffer = Tone.context.createBuffer(1, T * SR, SR);
  audioBuffer.copyToChannel(audio, 0, 0);
  const options = {'url': audioBuffer, 'loop': true, 'volume': -24};
  const player = new Tone.Player(options).toMaster();

  // Plotting.
  plotSpectra(specgrams, 'mag-canvas', 0);
  plotSpectra(specgrams, 'ifreq-canvas', 1);

  // Connect GUI actions.
  document.getElementById('start-button').addEventListener('click', () => {
    player.start();
  });
  document.getElementById('stop-button').addEventListener('click', () => {
    player.stop();
  });

  // Cleanup.
  specgrams.dispose();
  gansynth.dispose();
}

try {
  Promise
      .all([
        runGANSynth(),
      ])
      .then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
