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

// tslint:disable:no-require-imports
const mm = require('../node/music_vae');
const core = require('../node/core');
const proto = require('../node/protobuf');
const test = require('tape');
const tf = require('@tensorflow/tfjs');

// These hacks below are because we use performance and fetch which
// exist in browsers but not in node.
// TODO: figure out a way to wrap these so that users don't have to.
// tslint:disable-next-line:no-any
const globalAny: any = global;
globalAny.performance = Date;
globalAny.fetch = require('node-fetch');

const MEL_CKPT =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small';
const MEL_TEAPOT = new proto.NoteSequence({
  notes: [
    {pitch: 69, startTime: 0, endTime: 2},
    {pitch: 71, startTime: 2, endTime: 4},
    {pitch: 73, startTime: 4, endTime: 6},
    {pitch: 74, startTime: 6, endTime: 8},
    {pitch: 76, startTime: 8, endTime: 10},
    {pitch: 81, startTime: 12, endTime: 16},
    {pitch: 78, startTime: 16, endTime: 20},
    {pitch: 81, startTime: 20, endTime: 24},
    {pitch: 76, startTime: 24, endTime: 32}
  ]
});
let mvae, quantizedInput;

test('Quantization works', async (t) => {
  const quant = core.sequences.quantizeNoteSequence(MEL_TEAPOT, 4);
  t.equals(quant.notes.length, MEL_TEAPOT.notes.length);
  t.end();
});

test('MusicVAE can be initialized', async (t) => {
  mvae = new mm.MusicVAE(MEL_CKPT);
  await mvae.initialize();
  t.true(mvae.isInitialized);
  t.end();
});

test('MusicVAE can encode ', async (t) => {
  const startMemory = tf.memory().numBytes;
  const ns = core.sequences.quantizeNoteSequence(MEL_TEAPOT, 4);
  const z = await mvae.encode([ns]);
  t.deepEquals(z.shape, [1, 256]);
  z.dispose();
  // Doesn't leak memory.
  t.isEqual(tf.memory().numBytes, startMemory);
  t.end();
});

test('MusicVAE can decode ', async (t) => {
  const startMemory = tf.memory().numBytes;
  const ns = core.sequences.quantizeNoteSequence(MEL_TEAPOT, 4);
  const z = await mvae.encode([ns]);
  const recon = await mvae.decode(z);
  t.ok(recon);
  t.isEqual(recon.length, 1);
  z.dispose();

  const notes = recon[0].notes;
  t.true(notes.length > 0);

  // Doesn't leak memory.
  t.isEqual(tf.memory().numBytes, startMemory);
  t.end();
});

test('MusicVAE can sample ', async (t) => {
  const startMemory = tf.memory().numBytes;
  const ns = await mvae.sample(1);
  t.ok(ns);
  t.isEqual(ns.length, 1);
  const notes = ns[0].notes;
  t.true(notes.length > 0);

  // Doesn't leak memory.
  t.isEqual(tf.memory().numBytes, startMemory);
  t.end();
});

test('MusicVAE can be disposed', async (t) => {
  mvae.dispose();
  t.end();
});
