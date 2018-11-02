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
//@ts-ignore
import * as stftModule from 'stft';
import * as Tone from 'tone';

import {ifft, ifreqToPhase, istft, melToLinear, melToLinearMatrix, stft} from '../src/gansynth/audio_utils';
import * as mm from '../src/index';

// import {CHECKPOINTS_DIR} from './common';
import {writeMemory, writeTimer} from './common';

// const GANSYNTH_CHECKPOINT = `${CHECKPOINTS_DIR}/gansynth`;
const GANSYNTH_CHECKPOINT = `./gansynth_ckpt_js`;

mm.logging.verbosity = mm.logging.Level.DEBUG;

async function dump(tensor: tf.Tensor) {
  console.log(JSON.stringify(tensor.dataSync()));
}

// async function array_dump(array: Float32Array|Float32Array[]) {
//   console.log(JSON.stringify(array));
// }

async function runGANSynth() {
  console.log('Yay!!');

  const gansynth = new mm.GANSynth(GANSYNTH_CHECKPOINT);
  await gansynth.initialize();
  console.log('Done loading!');

  const start = await performance.now();
  const specgram = await gansynth.random_sample(36);
  await writeTimer('single-sample-gen-time', start);
  // console.log('Specgram:' + specgram.shape);

  // Synthesize audio
  const magSlice =
      tf.slice(specgram, [0, 0, 0, 0], [1, -1, -1, 1]).reshape([1, 128, 1024]);
  const magMel = magSlice as tf.Tensor3D;
  console.log('logmag');
  dump(magMel.reshape([128, 1024]));
  const mag = melToLinear(magMel);

  const ifreqSlice =
      tf.slice(specgram, [0, 0, 0, 1], [1, -1, -1, 1]).reshape([1, 128, 1024]);
  const ifreq = ifreqSlice as tf.Tensor3D;
  console.log('ifreq');
  dump(ifreq.reshape([128, 1024]));
  const phase = ifreqToPhase(ifreq);

  // Reflect all frequencies except for the Nyquist, which is shared between
  // positive and negative frequencies for even nFft.
  let real = mag.mul(tf.cos(phase));
  const mirrorReal = tf.reverse(real.slice([0, 0, 0], [1, 128, 1023]), 2);
  real = tf.concat([real, mirrorReal], 2);
  console.log('real');
  dump(real.reshape([128, 2047]));

  // Reflect all frequencies except for the Nyquist, take complex conjugate of
  // the negative frequencies.
  let imag = mag.mul(tf.sin(phase));
  const mirrorImag = tf.reverse(imag.slice([0, 0, 0], [1, 128, 1023]), 2);
  imag = tf.concat([imag, tf.mul(mirrorImag, -1.0)], 2);
  console.log('imag');
  dump(imag.reshape([128, 2047]));

  // Combine and add back in the zero DC component
  let reImBatch = tf.concat([real, imag], 0).expandDims(3);
  reImBatch = tf.pad(reImBatch, [[0, 0], [0, 0], [1, 0], [0, 0]]);
  // Interleave real and imaginary for javascript ISTFT
  // Hack to interleave [re0, im0, re1, im1, ...] with batchToSpace
  const crops = [[0, 0], [0, 0]];
  const reImInterleave =
      tf.batchToSpaceND(reImBatch, [1, 2], crops).reshape([128, 4096]);
  // Convert Tensor to a Float32Array[]
  const reImArray = reImInterleave.dataSync();
  const reIm = [] as Float32Array[];
  for (let i = 0; i < 128; i++) {
    reIm[i] = reImArray.slice(i * 4096, (i + 1) * 4096) as Float32Array;
  }

  // const realArr = real.dataSync();
  // const imagArr = imag.dataSync();
  // console.log(realArr);


  // ISTFT and play sound
  const T = 4.0;
  const SR = 16000;
  const ispecParams =
      {nFFt: 2048, winLength: 2048, hopLength: 512, sampleRate: SR};
  const recon = istft(reIm, ispecParams);

  // console.log(recon);
  const audioBuffer = Tone.context.createBuffer(1, T * SR, SR);
  audioBuffer.copyToChannel(recon, 0, 0);
  const options = {'url': audioBuffer, 'loop': true, 'volume': -24};
  const player = new Tone.Player(options).toMaster();

  // GUI
  const startButton = document.createElement('BUTTON');
  const startText = document.createTextNode('Start');
  startButton.appendChild(startText);
  document.body.appendChild(startButton);
  startButton.addEventListener('click', () => {
    player.start();
  });

  const stopButton = document.createElement('BUTTON');
  const stopText = document.createTextNode('Stop');
  stopButton.appendChild(stopText);
  document.body.appendChild(stopButton);
  stopButton.addEventListener('click', () => {
    player.stop();
  });

  // GUI
  const newButton = document.createElement('BUTTON');
  const newText = document.createTextNode('NewSample');
  newButton.appendChild(newText);
  document.body.appendChild(newButton);
  newButton.addEventListener('click', () => {
    console.log(player);
  });

  // // // PLOTTING
  // // // // Get magnitudes
  // const magSlicePlot =
  //     tf.slice(specgram, [0, 0, 0, 0], [1, -1, -1, 1]).reshape([128, 1024]);
  // let magPlot = magSlicePlot as tf.Tensor2D;
  // // Scale from [-1, 1] to [0, 1]
  // magPlot = tf.add(magPlot, 1.0);
  // magPlot = tf.div(magPlot, 2.0);
  // // Plot on canvas
  // const magCanvas = document.getElementById('mag-canvas') as
  // HTMLCanvasElement; await tf.toPixels(magPlot, magCanvas);

  // // // Plot Mel 2 Linear Matrix
  // let m2l = melToLinearMatrix() as tf.Tensor2D;
  // // tf.min(m2l).print();
  // // tf.max(m2l).print();
  // // // scale to [0, 1]
  // m2l = tf.sub(m2l, tf.min(m2l));
  // m2l = tf.div(m2l, tf.max(m2l));
  // // // Plot on canvas
  // const m2lCanvas = document.getElementById('m2l-canvas') as
  // HTMLCanvasElement; await tf.toPixels(m2l, m2lCanvas);

  // // Convert to linear
  let magLin = tf.log(tf.add(mag.reshape([128, 1024]), 1e-6)) as tf.Tensor2D;
  // Scale to [0, 1]
  magLin = tf.sub(magLin, tf.min(magLin));
  magLin = tf.div(magLin, tf.max(magLin));
  // Plot on canvas
  const magLinCanvas =
      document.getElementById('magLin-canvas') as HTMLCanvasElement;
  await tf.toPixels(magLin, magLinCanvas);

  // // Get IFreq
  // const ifreqSlice =
  //     tf.slice(specgram, [0, 0, 0, 1], [1, -1, -1, 1]).reshape([128, 1024]);
  // let ifreq = ifreqSlice as tf.Tensor3D;
  // // scale to [0, 1]
  // ifreq = tf.sub(ifreq, tf.min(ifreq));
  // ifreq = tf.div(ifreq, tf.max(ifreq));
  // // Plot on canvas
  // const ifreqCanvas =
  //     document.getElementById('ifreq-canvas') as HTMLCanvasElement;
  // await tf.toPixels(ifreq, ifreqCanvas);

  // // dump(mag);
  // mag.dispose();
  // magSlice.dispose();
  // ifreq.dispose();
  // ifreqSlice.dispose();
  // specgram.dispose();
  // gansynth.dispose();
  // console.log('Done disposing!');
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
