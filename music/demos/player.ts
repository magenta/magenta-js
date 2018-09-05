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
// tslint:disable-next-line:max-line-length
import {DRUM_SEQS, FULL_TWINKLE, FULL_TWINKLE_UNQUANTIZED, writeNoteSeqs} from './common';

function generatePlayers() {
  writeNoteSeqs('unq-player', [FULL_TWINKLE_UNQUANTIZED], false);
  writeNoteSeqs('unq-soundfont', [FULL_TWINKLE_UNQUANTIZED], true);
  writeNoteSeqs('q-player', [FULL_TWINKLE], false);
  writeNoteSeqs('q-soundfont', [FULL_TWINKLE], true);
  writeNoteSeqs('d-player', [DRUM_SEQS[1]], false);
}
try {
  Promise.all([generatePlayers()]);
} catch (err) {
  console.error(err);
}
