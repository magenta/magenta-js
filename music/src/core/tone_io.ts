/**
 * A module for converting between MIDI files and our `NoteSequence` protobuf
 * representation.
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

/**
 * Imports
 */

import * as Tone from 'tone';
const { Midi, Time } = Tone;
import {INoteSequence, NoteSequence} from '../protobuf/index';

interface ToneEvent {
  isEnd: boolean;
  note: string;
  time: typeof Tone.Time;
  duration: typeof Tone.Time;
  velocity: number;
  originalNote: NoteSequence.INote;
}

interface ToneEvents {
  notes: ToneEvent[];
  quantizationInfo: NoteSequence.IQuantizationInfo;
  totalQuantizedSteps: number;
}

export function noteSequenceToToneEvents(sequence: INoteSequence) {
  
  // TODO(vibert): handle Unquantized NoteSequence by quantizing them.

  const { quantizationInfo, totalQuantizedSteps } = sequence;
  let stepsPerQuarter: number;
  if (quantizationInfo && quantizationInfo.stepsPerQuarter) {
    stepsPerQuarter = quantizationInfo.stepsPerQuarter;
  } else {
    stepsPerQuarter = 4;
  }
  let endTime = "0";

  const notes = sequence.notes.map((n, i) => {
    const { pitch, quantizedStartStep, quantizedEndStep } = n;
    const dur = quantizedEndStep - quantizedStartStep;
    const time = Time({
      "4n": quantizedStartStep / stepsPerQuarter
    });
    const duration = Time({ "4n": dur / stepsPerQuarter });
    const velocity = 1;
    const note = Midi(pitch).toNote();
    const isEnd = false;

    if (i === sequence.notes.length - 1) {
      endTime = Time({
        "4n": quantizedEndStep / stepsPerQuarter
      });
    }

    return {
      note,
      duration,
      time,
      velocity,
      isEnd,
      originalNote: n
    };
  });

  notes.push({
    note: "C4",
    duration: { "4n": 0 },
    time: endTime,
    velocity: 0,
    isEnd: true,
    originalNote: {}
  });

  const toneEvents = {
    notes,
    totalQuantizedSteps,
    quantizationInfo,
  };

  return toneEvents;
}

export function toneEventsToNoteSequence(toneEvents: ToneEvents) {
  const { totalQuantizedSteps, quantizationInfo } = toneEvents;
  if (quantizationInfo && !quantizationInfo.stepsPerQuarter) {
    quantizationInfo.stepsPerQuarter = 4;
  }
  
  if (toneEvents.notes && toneEvents.notes[toneEvents.notes.length - 1].isEnd) {
    toneEvents.notes.pop();
  }

  const notes = toneEvents.notes.map(value => {

    // TODO(vibert): parse the Tone.TimeClass 
    // information in case original INote is not presented

    const { originalNote } = value;
    return originalNote;
  });

  return NoteSequence.create({
    notes,
    quantizationInfo,
    totalQuantizedSteps,
  });
}
