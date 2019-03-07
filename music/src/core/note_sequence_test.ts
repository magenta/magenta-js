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

import * as test from 'tape';

// tslint:disable-next-line:max-line-length
import {MultipleTempoException, MultipleTimeSignatureException, QuantizationStatusException, quantizeToStep, SimpleNote, SimpleNoteSequence, stepsPerQuarterToStepsPerSecond} from './note_sequence';

const STEPS_PER_QUARTER = 4;

function createTestNS() {
  const ns = new SimpleNoteSequence();
  ns.tempos.push({qpm: 60, time: 0});

  ns.timeSignatures.push({
    time: 0,
    numerator: 4,
    denominator: 4,
  });

  return ns;
}

function addTrackToSequence(
    ns: SimpleNoteSequence, instrument: number, notes: number[][]) {
  for (const noteParams of notes) {
    const note = new SimpleNote();
    note.pitch = noteParams[0];
    note.velocity = noteParams[1];
    note.startTime = noteParams[2];
    note.endTime = noteParams[3];
    ns.addNote(note);
  }
}

function addQuantizedStepsToSequence(
    ns: SimpleNoteSequence, quantizedSteps: number[][]) {
  quantizedSteps.forEach((qstep, i) => {
    const note = ns.notes[i];
    note.quantizedStartStep = qstep[0];
    note.quantizedEndStep = qstep[1];
    if (note.quantizedEndStep > ns.totalQuantizedSteps) {
      ns.totalQuantizedSteps = note.quantizedEndStep;
    }
  });
}

function addControlChangesToSequence(
    ns: SimpleNoteSequence, instrument: number, controlChanges: number[][]) {
  for (const ccParams of controlChanges) {
    ns.controlChanges.push({
      time: ccParams[0],
      controlNumber: ccParams[1],
      controlValue: ccParams[2],
      instrument
    });
  }
}

function addQuantizedControlStepsToSequence(
    ns: SimpleNoteSequence, quantizedSteps: number[]) {
  quantizedSteps.forEach((qstep, i) => {
    const cc = ns.controlChanges[i];
    cc.quantizedStep = qstep;
  });
}

test('Quantize SimpleNoteSequence', (t: test.Test) => {
  const ns = createTestNS();

  addTrackToSequence(ns, 0, [
    [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
    [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
  ]);
  addControlChangesToSequence(ns, 0, [[2.0, 64, 127], [4.0, 64, 0]]);

  // Make a copy.
  const expectedQuantizedSequence = new SimpleNoteSequence(ns);
  expectedQuantizedSequence.quantizationInfo.stepsPerQuarter =
      STEPS_PER_QUARTER;
  addQuantizedStepsToSequence(
      expectedQuantizedSequence,
      [[0, 40], [1, 2], [10, 14], [16, 17], [19, 20]]);
  addQuantizedControlStepsToSequence(expectedQuantizedSequence, [8, 16]);

  const qns = ns.quantize(STEPS_PER_QUARTER);
  t.deepEqual(qns, expectedQuantizedSequence);

  t.end();
});

test('Quantize SimpleNoteSequence, Time Signature Change', (t: test.Test) => {
  const ns = createTestNS();

  addTrackToSequence(ns, 0, [
    [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
    [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
  ]);
  ns.timeSignatures.length = 0;

  ns.quantize(STEPS_PER_QUARTER);

  // Single time signature.
  ns.timeSignatures.push({numerator: 4, denominator: 4, time: 0});
  ns.quantize(STEPS_PER_QUARTER);

  // Multiple time signatures with no change.
  ns.timeSignatures.push({numerator: 4, denominator: 4, time: 1});
  ns.quantize(STEPS_PER_QUARTER);

  // Time signature change.
  ns.timeSignatures.push({numerator: 2, denominator: 4, time: 2});
  t.throws(
      () => ns.quantize(STEPS_PER_QUARTER), MultipleTimeSignatureException);
  t.end();
});

test(
    'Quantize SimpleNoteSequence, Implicit Time Signature Change',
    (t: test.Test) => {
      const ns = createTestNS();

      addTrackToSequence(ns, 0, [
        [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
        [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
      ]);
      ns.timeSignatures.length = 0;

      // No time signature.
      ns.quantize(STEPS_PER_QUARTER);

      // Implicit time signature change.
      ns.timeSignatures.push({numerator: 2, denominator: 4, time: 2});
      t.throws(
          () => ns.quantize(STEPS_PER_QUARTER), MultipleTimeSignatureException);

      t.end();
    });

// tslint:disable-next-line:max-line-length
test('Quantize SimpleNoteSequence, No Implicit Time Signature Change, Out Of Order',
    (t: test.Test) => {
      const ns = createTestNS();

      addTrackToSequence(ns, 0, [
        [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
        [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
      ]);
      ns.timeSignatures.length = 0;

      // No time signature.
      ns.quantize(STEPS_PER_QUARTER);

      // No implicit time signature change, but time signatures are added out of
      // order.
      ns.timeSignatures.push({numerator: 2, denominator: 4, time: 2});
      ns.timeSignatures.push({numerator: 2, denominator: 4, time: 0});
      ns.quantize(STEPS_PER_QUARTER);
      t.pass();

      t.end();
    });

test('StepsPerQuarterToStepsPerSecond', (t: test.Test) => {
  t.equal(stepsPerQuarterToStepsPerSecond(4, 60.0), 4.0);
  t.end();
});

test('QuantizeToStep', (t: test.Test) => {
  t.equal(quantizeToStep(8.0001, 4), 32);
  t.equal(quantizeToStep(8.4999, 4), 34);
  t.equal(quantizeToStep(8.4999, 4, 1.0), 33);
  t.end();
});

test('Quantize SimpleNoteSequence, Tempo Change', (t: test.Test) => {
  const ns = createTestNS();

  addTrackToSequence(ns, 0, [
    [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
    [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
  ]);
  ns.tempos.length = 0;

  // No tempos.
  ns.quantize(STEPS_PER_QUARTER);

  // Single tempo.
  ns.tempos.push({qpm: 60, time: 0});
  ns.quantize(STEPS_PER_QUARTER);

  // Multiple tempos with no change.
  ns.tempos.push({qpm: 60, time: 1});
  ns.quantize(STEPS_PER_QUARTER);

  // Tempo change.
  ns.tempos.push({qpm: 120, time: 2});
  t.throws(() => ns.quantize(STEPS_PER_QUARTER), MultipleTempoException);

  t.end();
});

test('Quantize SimpleNoteSequence, Implicit Tempo Change', (t: test.Test) => {
  const ns = createTestNS();

  addTrackToSequence(ns, 0, [
    [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
    [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
  ]);
  ns.tempos.length = 0;

  // No tempos.
  ns.quantize(STEPS_PER_QUARTER);

  // Implicit tempo change.
  ns.tempos.push({qpm: 60, time: 2});
  t.throws(() => ns.quantize(STEPS_PER_QUARTER), MultipleTempoException);

  t.end();
});

test(
    'Quantize SimpleNoteSequence, No Implicit Tempo Change, Out of Order',
    (t: test.Test) => {
      const ns = createTestNS();

      addTrackToSequence(ns, 0, [
        [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
        [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
      ]);
      ns.tempos.length = 0;

      // No tempos.
      ns.quantize(STEPS_PER_QUARTER);

      // No implicit tempo change, but tempos are added out of order.
      ns.tempos.push({qpm: 60, time: 2});
      ns.tempos.push({qpm: 60, time: 0});
      ns.quantize(STEPS_PER_QUARTER);
      t.pass();

      t.end();
    });

test('Quantize SimpleNoteSequence, Rounding', (t: test.Test) => {
  const ns = createTestNS();

  addTrackToSequence(ns, 1, [
    [12, 100, 0.01, 0.24], [11, 100, 0.22, 0.55], [40, 100, 0.50, 0.75],
    [41, 100, 0.689, 1.18], [44, 100, 1.19, 1.69], [55, 100, 4.0, 4.01]
  ]);

  // Make a copy.
  const expectedQuantizedSequence = new SimpleNoteSequence(ns);
  expectedQuantizedSequence.quantizationInfo.stepsPerQuarter =
      STEPS_PER_QUARTER;

  addQuantizedStepsToSequence(
      expectedQuantizedSequence,
      [[0, 1], [1, 2], [2, 3], [3, 5], [5, 7], [16, 17]]);

  const quantizedSequence = ns.quantize(STEPS_PER_QUARTER);

  t.deepEqual(quantizedSequence, expectedQuantizedSequence);

  t.end();
});

test('Quantize SimpleNoteSequence, MultiTrack', (t: test.Test) => {
  const ns = createTestNS();

  addTrackToSequence(ns, 0, [[12, 100, 1.0, 4.0], [19, 100, 0.95, 3.0]]);
  addTrackToSequence(ns, 3, [[12, 100, 1.0, 4.0], [19, 100, 2.0, 5.0]]);
  addTrackToSequence(
      ns, 7, [[12, 100, 1.0, 5.0], [19, 100, 2.0, 4.0], [24, 100, 3.0, 3.5]]);

  // Make a copy.
  const expectedQuantizedSequence = new SimpleNoteSequence(ns);
  expectedQuantizedSequence.quantizationInfo.stepsPerQuarter =
      STEPS_PER_QUARTER;

  addQuantizedStepsToSequence(
      expectedQuantizedSequence,
      [[4, 16], [4, 12], [4, 16], [8, 20], [4, 20], [8, 16], [12, 14]]);

  const quantizedSequence = ns.quantize(STEPS_PER_QUARTER);

  t.deepEqual(quantizedSequence, expectedQuantizedSequence);

  t.end();
});

test('Assert isQuantizedSimpleNoteSequence', (t: test.Test) => {
  const ns = createTestNS();

  addTrackToSequence(ns, 0, [
    [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
    [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
  ]);

  t.throws(() => ns.assertIsQuantizedSequence(), QuantizationStatusException);

  const qns = ns.quantize(STEPS_PER_QUARTER);
  qns.assertIsQuantizedSequence();

  t.end();
});

test('Assert isRelativeQuantizedSimpleNoteSequence', (t: test.Test) => {
  const ns = createTestNS();

  addTrackToSequence(ns, 0, [
    [12, 100, 0.01, 10.0], [11, 55, 0.22, 0.50], [40, 45, 2.50, 3.50],
    [55, 120, 4.0, 4.01], [52, 99, 4.75, 5.0]
  ]);

  t.throws(
      () => ns.assertIsRelativeQuantizedSequence(),
      QuantizationStatusException);

  const qns = ns.quantize(STEPS_PER_QUARTER);
  qns.assertIsRelativeQuantizedSequence();

  t.end();
});

function testUnQuantize(
    t: test.Test, expectedTimes: Array<[number, number]>,
    expectedTotalTime: number, originalQpm?: number, finalQpm?: number,
    originalTotalSteps?: number) {
  let qns = createTestNS();

  const notes = [
    [12, 100, 0.01, 0.24], [11, 100, 0.22, 0.55], [40, 100, 0.50, 0.75],
    [41, 100, 0.689, 1.18], [44, 100, 1.19, 1.69]
  ];
  addTrackToSequence(qns, 1, notes);
  qns = qns.quantize(STEPS_PER_QUARTER);
  if (!originalQpm) {
    qns.tempos = [];
  } else {
    qns.tempos[0].qpm = originalQpm;
  }
  if (originalTotalSteps) {
    qns.totalQuantizedSteps = originalTotalSteps;
  }

  const ns = qns.unquantize(finalQpm);

  const expectedSequence = new SimpleNoteSequence(qns);
  expectedSequence.notes.map((n, i) => {
    n.startTime = expectedTimes[i][0];
    n.endTime = expectedTimes[i][1];
  });
  expectedSequence.totalTime = expectedTotalTime;
  if (!finalQpm && !originalQpm) {
    expectedSequence.tempos = [];
  } else {
    expectedSequence.tempos =
        [{time: 0, qpm: finalQpm ? finalQpm : originalQpm}];
  }

  t.deepEqual(ns, expectedSequence);

  t.end();
}

test('Un-Quantize SimpleNoteSequence, ns qpm', (t: test.Test) => {
  testUnQuantize(
      t, [[0.0, 0.25], [0.25, 0.50], [0.50, 0.75], [0.75, 1.25], [1.25, 1.75]],
      1.75, 60);
});

test('Un-Quantize SimpleNoteSequence, no qpm', (t: test.Test) => {
  testUnQuantize(
      t,
      [
        [0.0, 0.125], [0.125, 0.25], [0.25, 0.375], [0.375, 0.625],
        [0.625, 0.875]
      ],
      0.875);
});

test('Un-Quantize SimpleNoteSequence, arg qpm', (t: test.Test) => {
  testUnQuantize(
      t, [[0.0, 0.5], [0.5, 1.00], [1.00, 1.5], [1.5, 2.5], [2.5, 3.5]], 3.5,
      undefined, 30);
});

test('Un-Quantize SimpleNoteSequence, orig and arg qpm', (t: test.Test) => {
  testUnQuantize(
      t, [[0.0, 0.5], [0.5, 1.00], [1.00, 1.5], [1.5, 2.5], [2.5, 3.5]], 3.5,
      60, 30);
});

test(
    'Un-Quantize SimpleNoteSequence, existing total steps lower',
    (t: test.Test) => {
      testUnQuantize(
          t, [[0.0, 0.5], [0.5, 1.00], [1.00, 1.5], [1.5, 2.5], [2.5, 3.5]],
          3.5, undefined, 30, 1);
    });

test(
    'Un-Quantize SimpleNoteSequence, existing total steps higher',
    (t: test.Test) => {
      testUnQuantize(
          t, [[0.0, 0.5], [0.5, 1.00], [1.00, 1.5], [1.5, 2.5], [2.5, 3.5]], 10,
          undefined, 30, 20);
    });
