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

import {ifft, ifreqToPhase, istft, linearToMelMatrix, melToLinear, melToLinearMatrix, stft} from '../src/gansynth/audio_utils';
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
  console.log('Yay!!');

  // Testing inverse fourier transform
  // const SR = 16000;
  // const T = 1.0;
  // const audioArray =
  //     tf.sin(tf.linspace(0, 400 * 2 * Math.PI, T * SR)).dataSync();
  // const audio = new Float32Array(audioArray);

  // const specParams =
  //     {nFFt: 2048, winLength: 2048, hopLength: 512, sampleRate: SR};
  // const reIm = stft(audio, specParams);
  // console.log(reIm);
  // const ispecParams =
  //     {nFFt: 2048, winLength: 2048, hopLength: 512, sampleRate: SR};
  // const recon = istft(reIm, ispecParams);
  // console.log(recon);
  // const audioBuffer = Tone.context.createBuffer(1, T * SR, SR);
  // audioBuffer.copyToChannel(recon, 0, 0);
  // const options = {'url': audioBuffer, 'loop': true};
  // const player = new Tone.Player(options).toMaster();
  // player.start();

  const gansynth = new mm.GANSynth(GANSYNTH_CHECKPOINT);
  await gansynth.initialize();
  console.log('Done loading!');
  const start = await performance.now();
  const specgram = await gansynth.random_sample(60);
  await writeTimer('single-sample-gen-time', start);
  // console.log('Specgram:' + specgram.shape);

  // Synthesize audio
  const magSlice =
      tf.slice(specgram, [0, 0, 0, 0], [1, -1, -1, 1]).reshape([1, 128, 1024]);
  const magMel = magSlice as tf.Tensor3D;
  const mag = melToLinear(magMel);

  const ifreqSlice =
      tf.slice(specgram, [0, 0, 0, 1], [1, -1, -1, 1]).reshape([1, 128, 1024]);
  const ifreq = ifreqSlice as tf.Tensor3D;
  const phase = ifreqToPhase(ifreq);

  let real = mag.mul(tf.cos(phase));
  real = tf.concat([real, tf.reverse(real, 2)], 2);
  let imag = mag.mul(tf.sin(phase));
  imag = tf.concat([imag, tf.reverse(tf.mul(imag, -1.0), 2)], 2);
  const reImBatch = tf.concat([real, imag], 0).expandDims(3);
  const crops = [[0, 0], [0, 0]];
  const reImNoPad =
      tf.batchToSpaceND(reImBatch, [1, 2], crops).reshape([128, 4096]);
  // Add back in DC component
  const reImTensor = tf.pad(reImNoPad, [[0, 0], [2, 0]]);
  const reImArray = reImTensor.dataSync();
  const reIm = [] as Float32Array[];
  for (let i = 0; i < 128; i++) {
    reIm[i] = reImArray.slice(i * 4098, (i + 1) * 4098) as Float32Array;
  }

  // ISTFT and play sound
  const T = 4.0;
  const SR = 16000;
  const ispecParams =
      {nFFt: 2048, winLength: 2048, hopLength: 512, sampleRate: SR};
  const recon = istft(reIm, ispecParams);
  console.log(recon);
  const audioBuffer = Tone.context.createBuffer(1, T * SR, SR);
  audioBuffer.copyToChannel(recon, 0, 0);
  const options = {'url': audioBuffer, 'loop': true};
  const player = new Tone.Player(options).toMaster();
  player.start();

  // // // // PLOTTING
  // // // // Get magnitudes
  // const magSlice =
  //     tf.slice(specgram, [0, 0, 0, 0], [1, -1, -1, 1]).reshape([128, 1024]);
  // let mag = magSlice as tf.Tensor2D;
  // // Scale from [-1, 1] to [0, 1]
  // mag = tf.add(mag, 1.0);
  // mag = tf.div(mag, 2.0);
  // // Plot on canvas
  // const magCanvas = document.getElementById('mag-canvas') as
  // HTMLCanvasElement; await tf.toPixels(mag, magCanvas);

  // // Plot Mel 2 Linear Matrix
  // // let m2l = linearToMelMatrix() as tf.Tensor2D;
  // let m2l = melToLinearMatrix() as tf.Tensor2D;
  // tf.min(m2l).print();
  // tf.max(m2l).print();
  // // scale to [0, 1]
  // m2l = tf.sub(m2l, tf.min(m2l));
  // m2l = tf.div(m2l, tf.max(m2l));
  // // Plot on canvas
  // const m2lCanvas = document.getElementById('m2l-canvas') as
  // HTMLCanvasElement; await tf.toPixels(m2l, m2lCanvas);

  // // // Convert to linear
  // mag = mag.expandDims(0);
  // let magLin = melToLinear(mag).reshape([128, 1024]) as tf.Tensor2D;
  // // Scale from [-1, 1] to [0, 1]
  // magLin = tf.sub(magLin, tf.min(magLin));
  // magLin = tf.div(magLin, tf.max(magLin));
  // // Plot on canvas
  // const magLinCanvas =
  //     document.getElementById('magLin-canvas') as HTMLCanvasElement;
  // await tf.toPixels(magLin, magLinCanvas);

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
