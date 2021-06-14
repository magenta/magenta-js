import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import { NoteSequence } from '../protobuf/index';
import { FRAME_LENGTH_SECONDS, MIDI_PITCHES, MIN_MIDI_PITCH } from './constants';
import { batchInput, pianorollToNoteSequence, unbatchOutput } from './transcription_utils';
const OVER_THRESHOLD_PROB = 0.6;
test('PianorollToNoteSequence', (t) => {
    const frames = tf.buffer([300, MIDI_PITCHES]);
    const onsets = tf.buffer([300, MIDI_PITCHES]);
    for (let i = 25; i < 75; ++i) {
        frames.set(OVER_THRESHOLD_PROB, i, 39);
    }
    for (let i = 90; i < 100; ++i) {
        frames.set(OVER_THRESHOLD_PROB, i, 39);
    }
    onsets.set(OVER_THRESHOLD_PROB, 25, 39);
    onsets.set(OVER_THRESHOLD_PROB, 260, 49);
    onsets.set(OVER_THRESHOLD_PROB, 299, 50);
    const expectedNs = NoteSequence.create({
        notes: [
            {
                pitch: 39 + MIN_MIDI_PITCH,
                startTime: 25 * FRAME_LENGTH_SECONDS,
                endTime: 75 * FRAME_LENGTH_SECONDS,
                velocity: 1
            },
            {
                pitch: 49 + MIN_MIDI_PITCH,
                startTime: 260 * FRAME_LENGTH_SECONDS,
                endTime: 261 * FRAME_LENGTH_SECONDS,
                velocity: 1
            },
            {
                pitch: 50 + MIN_MIDI_PITCH,
                startTime: 299 * FRAME_LENGTH_SECONDS,
                endTime: 300 * FRAME_LENGTH_SECONDS,
                velocity: 1
            },
        ],
        totalTime: 300 * FRAME_LENGTH_SECONDS
    });
    pianorollToNoteSequence(frames.toTensor(), onsets.toTensor(), tf.ones([300, MIDI_PITCHES]))
        .then((ns) => {
        t.deepEqual(ns, expectedNs);
        t.end();
    });
});
test('PianorollToNoteSequenceWithOverlappingFrames', (t) => {
    const frames = tf.buffer([100, MIDI_PITCHES]);
    const onsets = tf.buffer([100, MIDI_PITCHES]);
    for (let i = 25; i < 75; ++i) {
        frames.set(OVER_THRESHOLD_PROB, i, 39);
    }
    for (let i = 90; i < 100; ++i) {
        frames.set(OVER_THRESHOLD_PROB, i, 39);
    }
    onsets.set(OVER_THRESHOLD_PROB, 25, 39);
    onsets.set(OVER_THRESHOLD_PROB, 30, 39);
    onsets.set(OVER_THRESHOLD_PROB, 35, 39);
    onsets.set(OVER_THRESHOLD_PROB, 36, 39);
    const expectedNs = NoteSequence.create({
        notes: [
            {
                pitch: 39 + MIN_MIDI_PITCH,
                startTime: 25 * FRAME_LENGTH_SECONDS,
                endTime: 30 * FRAME_LENGTH_SECONDS,
                velocity: 1
            },
            {
                pitch: 39 + MIN_MIDI_PITCH,
                startTime: 30 * FRAME_LENGTH_SECONDS,
                endTime: 35 * FRAME_LENGTH_SECONDS,
                velocity: 1
            },
            {
                pitch: 39 + MIN_MIDI_PITCH,
                startTime: 35 * FRAME_LENGTH_SECONDS,
                endTime: 75 * FRAME_LENGTH_SECONDS,
                velocity: 1
            },
        ],
        totalTime: 100 * FRAME_LENGTH_SECONDS
    });
    pianorollToNoteSequence(frames.toTensor(), onsets.toTensor(), tf.ones([100, MIDI_PITCHES]))
        .then((ns) => {
        t.deepEqual(ns, expectedNs);
        t.end();
    });
});
function fakeInput(l, w) {
    const input = [];
    for (let i = 0; i < l; ++i) {
        const row = [];
        for (let j = 0; j < w; ++j) {
            row.push(i * w + j);
        }
        input.push(row);
    }
    return input;
}
const flatten = ((a) => [].concat.apply([], a));
test('BatchInputWithOneBatch', (t) => {
    let input = fakeInput(100, 4);
    let batches = batchInput(input, 100);
    t.deepEqual(batches.shape, [1, 100, 4]);
    t.deepEqual(batches.dataSync(), flatten(input));
    batches = batchInput(input, 150);
    t.deepEqual(batches.shape, [1, 100, 4]);
    t.deepEqual(batches.dataSync(), flatten(input));
    input = fakeInput(103, 4);
    batches = batchInput(input, 100);
    t.deepEqual(batches.shape, [1, 103, 4]);
    t.deepEqual(batches.dataSync(), flatten(input));
    t.end();
});
test('BatchInputWithTwoBatch', (t) => {
    let input = fakeInput(100, 4);
    let batches = batchInput(input, 50);
    t.deepEqual(batches.shape, [2, 56, 4]);
    t.deepEqual(batches.slice(0, 1).dataSync(), flatten(input.slice(0, 56)));
    t.deepEqual(batches.slice(1, 1).dataSync(), flatten(input.slice(44)));
    let unbatched = unbatchOutput(batches, 50, 100);
    t.deepEqual(unbatched.shape, [1, 100, 4]);
    t.deepEqual(unbatched.dataSync(), flatten(input));
    batches = batchInput(input, 75);
    t.deepEqual(batches.shape, [2, 81, 4]);
    t.deepEqual(batches.slice(0, 1).dataSync(), flatten(input.slice(0, 81)));
    t.deepEqual(batches.slice(1, 1).dataSync(), flatten(input.slice(19)));
    unbatched = unbatchOutput(batches, 75, 100);
    t.deepEqual(unbatched.shape, [1, 100, 4]);
    t.deepEqual(unbatched.dataSync(), flatten(input));
    input = fakeInput(103, 4);
    batches = batchInput(input, 50);
    t.deepEqual(batches.shape, [2, 56, 4]);
    t.deepEqual(batches.slice(0, 1).dataSync(), flatten(input.slice(0, 56)));
    t.deepEqual(batches.slice(1, 1).dataSync(), flatten(input.slice(47)));
    unbatched = unbatchOutput(batches, 50, 103);
    t.deepEqual(unbatched.shape, [1, 103, 4]);
    t.deepEqual(unbatched.dataSync(), flatten(input));
    t.end();
});
test('BatchInputWithOverTwoBatch', (t) => {
    let input = fakeInput(100, 4);
    let batches = batchInput(input, 25);
    t.deepEqual(batches.shape, [4, 31, 4]);
    t.deepEqual(batches.slice(0, 1).dataSync(), flatten(input.slice(0, 31)));
    t.deepEqual(batches.slice(1, 1).dataSync(), flatten(input.slice(22, 53)));
    t.deepEqual(batches.slice(2, 1).dataSync(), flatten(input.slice(47, 78)));
    t.deepEqual(batches.slice(3, 1).dataSync(), flatten(input.slice(69)));
    let unbatched = unbatchOutput(batches, 25, 100);
    t.deepEqual(unbatched.shape, [1, 100, 4]);
    t.deepEqual(unbatched.dataSync(), flatten(input));
    batches = batchInput(input, 22);
    t.deepEqual(batches.shape, [5, 28, 4]);
    t.deepEqual(batches.slice(0, 1).dataSync(), flatten(input.slice(0, 28)));
    t.deepEqual(batches.slice(1, 1).dataSync(), flatten(input.slice(19, 47)));
    t.deepEqual(batches.slice(2, 1).dataSync(), flatten(input.slice(41, 69)));
    t.deepEqual(batches.slice(3, 1).dataSync(), flatten(input.slice(63, 91)));
    t.deepEqual(batches.slice(4, 1).dataSync(), flatten(input.slice(100 - 28)));
    unbatched = unbatchOutput(batches, 22, 100);
    t.deepEqual(unbatched.shape, [1, 100, 4]);
    t.deepEqual(unbatched.dataSync(), flatten(input));
    input = fakeInput(103, 4);
    batches = batchInput(input, 25);
    t.deepEqual(batches.shape, [4, 31, 4]);
    t.deepEqual(batches.slice(0, 1).dataSync(), flatten(input.slice(0, 31)));
    t.deepEqual(batches.slice(1, 1).dataSync(), flatten(input.slice(22, 53)));
    t.deepEqual(batches.slice(2, 1).dataSync(), flatten(input.slice(47, 78)));
    t.deepEqual(batches.slice(3, 1).dataSync(), flatten(input.slice(103 - 31)));
    unbatched = unbatchOutput(batches, 25, 103);
    t.deepEqual(unbatched.shape, [1, 103, 4]);
    t.deepEqual(unbatched.dataSync(), flatten(input));
    t.end();
});
//# sourceMappingURL=transcription_utils_test.js.map