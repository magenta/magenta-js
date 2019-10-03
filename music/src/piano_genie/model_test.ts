// tslint:disable:max-line-length
/**
 * Tests for Piano Genie. Note that this test requires model weights.
 * This test will give a provisional pass if model weights not found.
 * To run the test properly, download model weights from:
 * https://storage.googleapis.com/magentadata/js/checkpoints/piano_genie/testdata.zip
 * And unzip them to src/piano_genie/testdata/*.json.
 * Then run yarn test from magenta-js/musis directory.
 *
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
// tslint:enable:max-line-length

import * as fs from 'fs';
import * as test from 'tape';
import * as tf from '@tensorflow/tfjs';
import * as logging from '../core/logging';

import {PianoGenie} from './model';

function loadJSONModelWeights(fp: string) {
  const rawVars = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const vars: tf.NamedTensorMap = {};
  Object.keys(rawVars).forEach(key => {
    rawVars[key].length = rawVars[key].size;
    vars[key] = tf.tensor(
      Float32Array.from(rawVars[key]), rawVars[key].shape, 'float32');
  });
  return vars;
}

const TOLERANCE = 1e-6;

test('Piano Genie Model Correctness', async (t: test.Test) => {
  const initialMemory = tf.memory();

  const modelWeightsFp = 'src/piano_genie/test_data/stp_iq_auto_dt.json';
  if (!fs.existsSync(modelWeightsFp)) {
    logging.log('Piano Genie model weights not found. Provisional pass.');
    t.end();
  }

  const vars = loadJSONModelWeights(modelWeightsFp);

  const genie = new PianoGenie(undefined);
  await genie.initialize(vars);

  const memoryPostInitialize = tf.memory();

  /**
   * Tests simple usage of PianoGenie.
   */

  tf.tidy(() => {
    const keys: number[] = [];
    // Ascending pattern with sampling.
    for (let i = 0; i < 8; ++i) {
      genie.overrideDeltaTime(0.1);
      keys.push(genie.next(i, 1., 1337));
    }
    // Descending pattern with argmax.
    for (let i = 7; i >= 0; --i) {
      genie.overrideDeltaTime(0.1);
      keys.push(genie.next(i, 0.));
    }
    // Fast trill with temperature 0.5.
    for (let i = 0; i < 8; ++i) {
      genie.overrideDeltaTime(0.05);
      keys.push(genie.next(3 + (i % 2), 0.5, 1337));
    }

    const expectedKeys = [
      21, 23, 24, 26, 28, 31, 35, 40,
      43, 45, 45, 43, 42, 40, 36, 33,
      35, 36, 36, 38, 36, 38, 36, 38
    ];

    t.equal(tf.memory().numBytes, memoryPostInitialize.numBytes);
    t.deepEqual(keys, expectedKeys);
  });

  // Reset model.
  genie.resetState();

  /**
   * Tests PianoGenie note whitelist.
   */

  tf.tidy(() => {
    const gMajTwoOctaves = [
      22, 24, 26, 27, 29, 31, 33,
      34, 36, 38, 39, 41, 43, 45
    ];

    const keys: number[] = [];
    // Ascending pattern with sampling.
    for (let i = 0; i < 8; ++i) {
      genie.overrideDeltaTime(0.1);
      keys.push(genie.nextFromKeyWhitelist(i, gMajTwoOctaves, 1., 1337));
    }
    // Descending pattern with argmax.
    for (let i = 7; i >= 0; --i) {
      genie.overrideDeltaTime(0.1);
      keys.push(genie.nextFromKeyWhitelist(i, gMajTwoOctaves, 0.));
    }
    // Fast trill with temperature 0.5.
    for (let i = 0; i < 8; ++i) {
      genie.overrideDeltaTime(0.05);
      keys.push(
        genie.nextFromKeyWhitelist(3 + (i % 2), gMajTwoOctaves, 0.5, 1337));
    }

    const expectedKeys = [
      26, 26, 26, 27, 29, 31, 34, 39,
      43, 45, 45, 43, 41, 39, 36, 33,
      34, 36, 36, 38, 38, 39, 38, 39
    ];

    t.deepEqual(keys, expectedKeys);
  });

  // Reset model.
  genie.resetState();

  /**
   * Tests advanced usage of PianoGenie.
   */

  // Creates a mock sample function which tests scores.
  const testSampleFuncFactory = (pairs: Array<[number, number]>) => {
    return (logits: tf.Tensor1D) => {
      const scores = tf.softmax(logits);
      const _scores = scores.dataSync();
      pairs.forEach(([pianoKey, expectedScore]) => {
        t.ok(Math.abs(_scores[pianoKey] - expectedScore) < TOLERANCE);
      });
      return tf.scalar(0, 'int32');
    };
  };

  // Ensures that JavaScript model outputs match test outputs from Python.
  tf.tidy(() => {
    genie.overrideDeltaTime(0.);
    genie.next(0);

    genie.overrideDeltaTime(0.125);
    genie.overrideLastOutput(43);
    genie.next(1);

    const sampleFunc = testSampleFuncFactory([
      [39, 0.12285],
      [40, 0.829168],
      [41, 0.0366595],
    ]);
    genie.overrideDeltaTime(1.);
    genie.overrideLastOutput(45);
    genie.nextWithCustomSamplingFunction(2, sampleFunc);
  });

  // Reset model.
  genie.resetState();

  // Ensures that JavaScript model outputs match test outputs from Python.
  tf.tidy(() => {
    genie.overrideDeltaTime(0.125);
    genie.next(1);

    genie.overrideDeltaTime(0.25);
    genie.overrideLastOutput(44);
    genie.next(2);

    const sampleFunc = testSampleFuncFactory([
      [43, 0.18577],
      [44, 0.813153],
      [45, 2.67857e-05],
    ]);
    genie.overrideDeltaTime(1.5);
    genie.overrideLastOutput(46);
    genie.nextWithCustomSamplingFunction(3, sampleFunc);
  });

  // Dispose model.
  genie.dispose();

  // Ensure no memory leaks from PianoGenie
  t.equal(tf.memory().numBytes, initialMemory.numBytes);

  t.end();
});
