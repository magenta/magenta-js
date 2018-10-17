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

  const SR = 16000;
  const T = 1.0;
  const audioArray =
      tf.sin(tf.linspace(0, 400 * 2 * Math.PI, T * SR)).dataSync();
  const audio = new Float32Array(audioArray);

  const specParams =
      {nFFt: 2048, winLength: 2048, hopLength: 512, sampleRate: SR};
  const reIm = stft(audio, specParams);
  console.log(reIm);
  const ispecParams =
      {nFFt: 2048, winLength: 2048, hopLength: 512, sampleRate: SR};
  const recon = istft(reIm, ispecParams);
  console.log(recon);

  const audioBuffer = Tone.context.createBuffer(1, T * SR, SR);
  audioBuffer.copyToChannel(recon, 0, 0);
  const player = new Tone.Player(audioBuffer).toMaster();
  player.start();

  // const gansynth = new mm.GANSynth(GANSYNTH_CHECKPOINT);
  // await gansynth.initialize();
  // console.log('Done loading!');
  // const start = performance.now();
  // const specgram = await gansynth.random_sample(60);
  // await writeTimer('single-sample-gen-time', start);
  // // console.log('Specgram:' + specgram.shape);

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
  // tf.div(data, 0.8);
  // let ifreq = ifreqSlice as tf.Tensor3D;
  // // scale to [0, 1]
  // ifreq = tf.sub(ifreq, tf.min(ifreq));
  // ifreq = tf.div(ifreq, tf.max(ifreq));
  // // Plot on canvas
  // const ifreqCanvas =
  //     document.getElementById('ifreq-canvas') as HTMLCanvasElement;
  // await tf.toPixels(ifreq, ifreqCanvas);

  // const phase = ifreqToPhase(ifreq));
  // const complexMag = tf.complex(magLin, tf.zeros(magLin.shape));
  // const complexPhase = tf.complex(tf.cos(phase), tf.sin(phase));
  // const complexNoPad = complexMag.mul(complexPhase);
  // // Add back in DC component
  // const complexPad = tf.pad(complexNoPad, [[0, 0], [1, 0]]);
  // complexPad.print();

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
