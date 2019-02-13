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

import * as tf from '@tensorflow/tfjs-core';
import * as mm from '../src/index';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, MEL_TWINKLE, writeMemory, writeNoteSeqs, writeTimer} from './common';
infill();

async function infill() {
  const model = new mm.Coconet(`${CHECKPOINTS_DIR}/coconet/bach`);
  await model.initialize();
  writeNoteSeqs('input', [MEL_TWINKLE], true);

  const start = performance.now();
  const output = await model.infill(MEL_TWINKLE);
  // Optionally, merge the held notes and restore the original melody timing
  // since the model chunks up the moelody in 16ths.
  const fixedOutput = model.mergeHeldNotes(output, MEL_TWINKLE);
  writeNoteSeqs('output', [fixedOutput], true);
  writeTimer('time', start);

  writeMemory(tf.memory().numBytes);
  model.dispose();
}
