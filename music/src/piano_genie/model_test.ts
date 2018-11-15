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
import * as tf from '@tensorflow/tfjs-core';

import {PianoGenie,sampleLogits} from './model';

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

const EPS = 1e-6;

test('Piano Genie Model Correctness', async (t: test.Test) => {
  const modelWeightsFp = 'src/piano_genie/test_data/stp_iq_auto_dt.json';
  if (!fs.existsSync(modelWeightsFp)) {
    console.log('Piano Genie model weights not found. Provisional pass.');
    t.end();
  }

  const vars = loadJSONModelWeights(modelWeightsFp);

  const model = new PianoGenie(undefined);
  await model.initialize(vars);

  let logits: tf.Tensor1D;
  let scores: tf.Tensor1D;

  [logits, scores] = tf.tidy(() => {
    let logits = model.evaluate(0, -1, 0.);
    logits = model.evaluate(1, 43, 0.125);
    logits = model.evaluate(2, 45, 1.);
    const scores = tf.softmax(logits, 0);
    return [logits, scores];
  });

  t.ok(sampleLogits(logits, 0.).dataSync()[0] === 40);
  t.ok(sampleLogits(logits, 0.5, 20).dataSync()[0] === 39);
  t.ok(sampleLogits(logits, 1.0, 13).dataSync()[0] === 41);
  let _scores = scores.dataSync();
  t.ok(Math.abs(_scores[39] - 0.12285) < EPS);
  t.ok(Math.abs(_scores[40] - 0.829168) < EPS);
  t.ok(Math.abs(_scores[41] - 0.0366595) < EPS);

  logits.dispose();
  scores.dispose();

  model.resetState();

  [logits, scores] = tf.tidy(() => {
    let logits = model.evaluate(1, -1, 0.125);
    logits = model.evaluate(2, 44, 0.25);
    logits = model.evaluate(3, 46, 1.5);
    const scores = tf.softmax(logits, 0);
    return [logits, scores];
  });

  t.ok(sampleLogits(logits, 0.).dataSync()[0] === 44);
  t.ok(sampleLogits(logits, 0.5, 14).dataSync()[0] === 43);
  t.ok(sampleLogits(logits, 1.0, 541).dataSync()[0] === 42);
  _scores = scores.dataSync();
  t.ok(Math.abs(_scores[43] - 0.18577) < EPS);
  t.ok(Math.abs(_scores[44] - 0.813153) < EPS);
  t.ok(Math.abs(_scores[45] - 2.67857e-05) < EPS);

  logits.dispose();
  scores.dispose();
  model.dispose();

  t.end();
});
