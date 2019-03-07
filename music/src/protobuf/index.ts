/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {tensorflow} from './proto';
import NoteSequence = tensorflow.magenta.NoteSequence;
import INoteSequence = tensorflow.magenta.INoteSequence;
import ITimeSignature = tensorflow.magenta.NoteSequence.ITimeSignature;
import IKeySignature = tensorflow.magenta.NoteSequence.IKeySignature;
import ITempo = tensorflow.magenta.NoteSequence.ITempo;
import IQuantizationInfo = tensorflow.magenta.NoteSequence.IQuantizationInfo;
import IPitchBend = tensorflow.magenta.NoteSequence.IPitchBend;
import IControlChange = tensorflow.magenta.NoteSequence.IControlChange;
import PitchName = tensorflow.magenta.NoteSequence.PitchName;

export {NoteSequence, INoteSequence, ITimeSignature, IKeySignature, ITempo,
    IQuantizationInfo, IPitchBend, IControlChange, PitchName};
