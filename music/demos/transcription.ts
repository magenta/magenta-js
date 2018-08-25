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
import {INoteSequence} from '../src/index';

import {CHECKPOINTS_DIR} from './common';
import {writeMemory, writeNoteSeqs, writeTimer} from './common';

const TRANS_CKPT_DIR = `${CHECKPOINTS_DIR}/transcription`
const CKPT_URL = `${TRANS_CKPT_DIR}/onsets_frames_htk0`;
// tslint:disable:max-line-length
const MEL_SPEC_URL = `${
    TRANS_CKPT_DIR}/onsets_frames_htk0/MAPS_MUS-mz_331_3_ENSTDkCl.melhtk0-250frames.spec.json`;
const EXPECTED_NS_URL = `${
    TRANS_CKPT_DIR}/onsets_frames_htk0/MAPS_MUS-mz_331_3_ENSTDkCl.melhtk0-250frames.ns.json`;
// tslint:enable:max-line-length

async function transcribe() {
  const expectedNs: INoteSequence =
      await fetch(EXPECTED_NS_URL).then((response) => response.json());
  writeNoteSeqs('expected-ns', [expectedNs], undefined, true);

  const melSpec: number[][] =
      await fetch(MEL_SPEC_URL).then((response) => response.json());

  const oaf = new mm.OnsetsAndFrames(CKPT_URL);
  await oaf.initialize();

  const start = performance.now();
  const ns = await oaf.transcribeFromMelSpec(melSpec, 625);
  writeTimer('transcription-time', start);
  writeNoteSeqs('transcription-results', [ns], undefined, true);
  oaf.dispose();
}

try {
  Promise.all([transcribe()]).then(() => writeMemory(tf.memory().numBytes));
} catch (err) {
  console.error(err);
}
