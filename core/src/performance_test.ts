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

import {tensorflow} from '@magenta/protobuf';
import * as test from 'tape';
import {Performance, PerformanceEvent} from './performance';
import {NoteOff, NoteOn, TimeShift, VelocityChange} from './performance';
import NoteSequence = tensorflow.magenta.NoteSequence;

test('To NoteSequence', (t: test.Test) => {
  const events: PerformanceEvent[] = [
    {kind: 'note-on', pitch: 60},
    {kind: 'note-on', pitch: 64},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-on', pitch: 67},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 67},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 64},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 60},
  ];
  const performance = new Performance(events);
  const noteSequence = performance.toNoteSequence();
  const expectedNoteSequence = NoteSequence.create({
    notes: [
      {pitch: 67, velocity: 127, quantizedStartStep: 10, quantizedEndStep: 20},
      {pitch: 64, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 30},
      {pitch: 60, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 40},
    ]
  });
  t.deepEqual(noteSequence, expectedNoteSequence);
  t.end();
});

test('To NoteSequence With Velocity', (t: test.Test) => {
  const events: PerformanceEvent[] = [
    {kind: 'velocity-change', velocityBin: 100},
    {kind: 'note-on', pitch: 60},
    {kind: 'velocity-change', velocityBin: 115},
    {kind: 'note-on', pitch: 64},
    {kind: 'velocity-change', velocityBin: 127},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-on', pitch: 67},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 67},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 64},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 60},
  ];
  const performance = new Performance(events, 127);
  const noteSequence = performance.toNoteSequence();
  const expectedNoteSequence = NoteSequence.create({
    notes: [
      {pitch: 67, velocity: 127, quantizedStartStep: 10, quantizedEndStep: 20},
      {pitch: 64, velocity: 115, quantizedStartStep: 0, quantizedEndStep: 30},
      {pitch: 60, velocity: 100, quantizedStartStep: 0, quantizedEndStep: 40},
    ]
  });
  t.deepEqual(noteSequence, expectedNoteSequence);
  t.end();
});

test('To NoteSequence With Quantized Velocity', (t: test.Test) => {
  const events: PerformanceEvent[] = [
    {kind: 'velocity-change', velocityBin: 13},
    {kind: 'note-on', pitch: 60},
    {kind: 'note-on', pitch: 64},
    {kind: 'velocity-change', velocityBin: 16},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-on', pitch: 67},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 67},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 64},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-off', pitch: 60},
  ];
  const performance = new Performance(events, 16);
  const noteSequence = performance.toNoteSequence();
  const expectedNoteSequence = NoteSequence.create({
    notes: [
      {pitch: 67, velocity: 121, quantizedStartStep: 10, quantizedEndStep: 20},
      {pitch: 64, velocity: 97, quantizedStartStep: 0, quantizedEndStep: 30},
      {pitch: 60, velocity: 97, quantizedStartStep: 0, quantizedEndStep: 40},
    ]
  });
  t.deepEqual(noteSequence, expectedNoteSequence);
  t.end();
});

test('To NoteSequence With Unmatched Note-Offs', (t: test.Test) => {
  const events: PerformanceEvent[] = [
    {kind: 'note-on', pitch: 60},
    {kind: 'note-on', pitch: 64},
    {kind: 'time-shift', steps: 5},
    {kind: 'note-off', pitch: 60},
    {kind: 'note-off', pitch: 64},
    {kind: 'note-off', pitch: 67},
  ];
  const performance = new Performance(events);
  const noteSequence = performance.toNoteSequence();
  const expectedNoteSequence = NoteSequence.create({
    notes: [
      {pitch: 60, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 5},
      {pitch: 64, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 5},
    ]
  });
  t.deepEqual(noteSequence, expectedNoteSequence);
  t.end();
});

test('To NoteSequence With Unmatched Note-Ons', (t: test.Test) => {
  const events: PerformanceEvent[] = [
    {kind: 'note-on', pitch: 60},
    {kind: 'note-on', pitch: 64},
    {kind: 'time-shift', steps: 10},
  ];
  const performance = new Performance(events);
  const noteSequence = performance.toNoteSequence();
  const expectedNoteSequence = NoteSequence.create({
    notes: [
      {pitch: 60, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 10},
      {pitch: 64, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 10},
    ]
  });
  t.deepEqual(noteSequence, expectedNoteSequence);
  t.end();
});

test('To NoteSequence With Repeated Notes', (t: test.Test) => {
  const events: PerformanceEvent[] = [
    {kind: 'note-on', pitch: 60},
    {kind: 'note-on', pitch: 64},
    {kind: 'time-shift', steps: 10},
    {kind: 'note-on', pitch: 60},
    {kind: 'time-shift', steps: 10},
  ];
  const performance = new Performance(events);
  const noteSequence = performance.toNoteSequence();
  const expectedNoteSequence = NoteSequence.create({
    notes: [
      {pitch: 60, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 20},
      {pitch: 60, velocity: 127, quantizedStartStep: 10, quantizedEndStep: 20},
      {pitch: 64, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 20},
    ]
  });
  t.deepEqual(noteSequence, expectedNoteSequence);
  t.end();
});
