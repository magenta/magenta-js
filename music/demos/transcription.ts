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
import * as mm from '../src/index';

// import {CHECKPOINTS_DIR} from './common';
import {writeNoteSeqs, writeTimer} from './common';

const CHECKPOINTS_DIR = 'checkpoints'
const CKPT = `${CHECKPOINTS_DIR}/onsets_and_frames`;
const MEL_SPEC_URL = `${CHECKPOINTS_DIR}/onsets_and_frames/melSpec.json`;

async function transcribe() {
  // Set up listener for changing tempo.
  const melSpec: number[][] = await fetch(MEL_SPEC_URL).then((response) => {
    return response.json();
  });

  const oaf = new mm.OnsetsAndFrames(CKPT);
  await oaf.initialize();

  let start = performance.now();
  const ns = await oaf.transcribeFromMelSpec(melSpec);
  writeTimer('transcription-time', start);
  writeNoteSeqs('transcription-results', [ns]);
  debugger
}

try {
  Promise.all([transcribe()]);
} catch (err) {
  console.error(err);
}
