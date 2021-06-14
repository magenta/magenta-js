import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import { NoteSequence } from '../protobuf/index';
import { Melody, MelodyRegister, MelodyRhythm, MelodyShape } from './melodies';
const TEST_NS = NoteSequence.create({
    notes: [
        { pitch: 60, quantizedStartStep: 1, quantizedEndStep: 3 },
        { pitch: 62, quantizedStartStep: 4, quantizedEndStep: 5 },
        { pitch: 64, quantizedStartStep: 5, quantizedEndStep: 6 },
        { pitch: 65, quantizedStartStep: 6, quantizedEndStep: 7 },
        { pitch: 67, quantizedStartStep: 6, quantizedEndStep: 7 },
    ],
    tempos: [{ qpm: 120 }],
    quantizationInfo: { stepsPerQuarter: 2 },
    totalQuantizedSteps: 8,
});
test('Test Melody From NoteSequence (Ignore Polyphony)', (t) => {
    const melody = Melody.fromNoteSequence(TEST_NS, 60, 72, true);
    t.deepEqual(melody.events, [0, 2, 0, 1, 4, 6, 9, 1]);
    t.end();
});
test('Test Melody From NoteSequence (Check Polyphony)', (t) => {
    t.throws(() => Melody.fromNoteSequence(TEST_NS, 60, 72, false));
    t.end();
});
test('Test Melody From NoteSequence (Extra Steps)', (t) => {
    const melody = Melody.fromNoteSequence(TEST_NS, 60, 72, true, 12);
    t.deepEqual(melody.events, [0, 2, 0, 1, 4, 6, 9, 1, 0, 0, 0, 0]);
    t.end();
});
test('Test Melody To NoteSequence', (t) => {
    const melody = new Melody([0, 2, 0, 1, 4, 6, 9, 1], 60, 72);
    const ns = melody.toNoteSequence(2, 120);
    const expected = TEST_NS;
    expected.notes.pop();
    t.deepEqual(ns, expected);
    t.end();
});
test('Test Melody Rhythm Control', (t) => {
    const melody = new Melody([0, 2, 0, 1, 4, 6, 9, 1], 60, 72);
    const mr = new MelodyRhythm();
    const rhythmTensor = mr.extract(melody);
    t.deepEqual(rhythmTensor.shape, [8, 1]);
    t.deepEqual(rhythmTensor.dataSync(), [0, 1, 0, 0, 1, 1, 1, 0]);
    t.end();
});
test('Test Melody Shape Control', (t) => {
    const melody = new Melody([0, 2, 0, 6, 6, 2, 9, 1], 60, 72);
    const ms = new MelodyShape();
    const shapeTensor = ms.extract(melody);
    const shapeIndices = tf.argMax(shapeTensor, 1);
    t.deepEqual(shapeTensor.shape, [8, 3]);
    t.deepEqual(shapeIndices.dataSync(), [2, 2, 2, 2, 1, 0, 2, 2]);
    t.end();
});
test('Test Melody Register Control', (t) => {
    const melody = new Melody([0, 2, 0, 0, 4, 6, 6, 1], 60, 72);
    const mr = new MelodyRegister([60, 63, 72]);
    const registerTensor = mr.extract(melody);
    const registerIndices = tf.argMax(registerTensor, 1);
    t.deepEqual(registerTensor.shape, [8, 4]);
    t.deepEqual(registerIndices.dataSync(), [1, 1, 1, 1, 1, 1, 1, 1]);
    t.end();
});
//# sourceMappingURL=melodies_test.js.map