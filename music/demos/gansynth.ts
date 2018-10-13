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
import * as tf from '@tensorflow/tfjs-core';

import * as mm from '../src/index';

// import {CHECKPOINTS_DIR} from './common';
import {writeMemory, writeTimer} from './common';

// const GANSYNTH_CHECKPOINT = `${CHECKPOINTS_DIR}/gansynth`;
const GANSYNTH_CHECKPOINT = `./gansynth_ckpt_js`;

mm.logging.verbosity = mm.logging.Level.DEBUG;

// async function dump(tensor: tf.Tensor) {
//   console.log(JSON.stringify(tensor.dataSync()));
// }

async function runGANSynth() {
  console.log('Yay!');

  const gansynth = new mm.GANSynth(GANSYNTH_CHECKPOINT);
  await gansynth.initialize();
  console.log('Done loading!');
  const start = performance.now();
  const specgram = await gansynth.random_sample(24);
  await writeTimer('single-sample-gen-time', start);
  console.log(specgram.shape);

  // PLOTTING
  // Get magnitudes
  const magSlice =
      tf.slice(specgram, [0, 0, 0, 0], [1, -1, -1, 1]).reshape([128, 1024, 1]);
  let mag = magSlice as tf.Tensor3D;
  // Scale from [-1, 1] to [0, 1]
  mag = tf.add(mag, 1.0);
  mag = tf.div(mag, 2.0);
  // Plot on canvas
  const magCanvas = document.getElementById('mag-canvas') as HTMLCanvasElement;
  await tf.toPixels(mag, magCanvas);

  // Get IFreq
  const ifreqSlice =
      tf.slice(specgram, [0, 0, 0, 1], [1, -1, -1, 1]).reshape([128, 1024, 1]);
  let ifreq = ifreqSlice as tf.Tensor3D;
  // Scale from [-1, 1] to [0, 1]
  ifreq = tf.add(ifreq, 1.0);
  ifreq = tf.div(ifreq, 2.0);
  // Plot on canvas
  const ifreqCanvas =
      document.getElementById('ifreq-canvas') as HTMLCanvasElement;
  await tf.toPixels(ifreq, ifreqCanvas);

  // dump(mag);
  mag.dispose();
  magSlice.dispose();
  ifreq.dispose();
  ifreqSlice.dispose();
  specgram.dispose();
  gansynth.dispose();
  console.log('Done disposing!');
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
