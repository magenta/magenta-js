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
import * as Tone from 'tone';

// import {CHECKPOINTS_DIR} from './common';
import {specgramsToAudio} from '../src/gansynth/audio_utils';
import * as mm from '../src/index';

import {writeMemory, writeTimer} from './common';

// const GANSYNTH_CHECKPOINT = `${CHECKPOINTS_DIR}/gansynth`;
const GANSYNTH_CHECKPOINT = `./gansynth_ckpt_js`;

mm.logging.verbosity = mm.logging.Level.DEBUG;

async function runGANSynth() {
  console.log('Yay!!');

  const gansynth = new mm.GANSynth(GANSYNTH_CHECKPOINT);
  await gansynth.initialize();
  console.log('Done loading!');

  const start = await performance.now();
  const specgrams = await gansynth.random_sample(36);
  const audio = await specgramsToAudio(specgrams);
  await writeTimer('single-sample-gen-time', start);

  // Play sound
  const T = 4.0;
  const SR = 16000;

  const audioBuffer = Tone.context.createBuffer(1, T * SR, SR);
  audioBuffer.copyToChannel(audio, 0, 0);
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

  const newButton = document.createElement('BUTTON');
  const newText = document.createTextNode('NewSample');
  newButton.appendChild(newText);
  document.body.appendChild(newButton);
  newButton.addEventListener('click', () => {
    console.log(player);
  });

  // Cleanup
  // audio.dispose();
  specgrams.dispose();
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
