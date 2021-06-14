import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import { MusicRNN } from './model';
const MEL_CKPT = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn';
const MEL_TEAPOT = {
    notes: [
        { pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2, program: 0 },
        { pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4, program: 0 },
        { pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6, program: 0 },
        { pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8, program: 0 },
        { pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10, program: 0 },
        { pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16, program: 0 },
        { pitch: 78, quantizedStartStep: 16, quantizedEndStep: 20, program: 0 },
        { pitch: 81, quantizedStartStep: 20, quantizedEndStep: 24, program: 0 },
        { pitch: 76, quantizedStartStep: 24, quantizedEndStep: 32, program: 0 }
    ],
    quantizationInfo: { stepsPerQuarter: 4 },
    totalQuantizedSteps: 32,
};
let model;
let initialBytes;
test('MusicRNN can be initialized', async (t) => {
    initialBytes = tf.memory().numBytes;
    model = new MusicRNN(MEL_CKPT);
    await model.initialize();
    t.true(model.isInitialized);
    t.end();
});
test('MusicRNN can continue a sequence ', async (t) => {
    const startMemory = tf.memory().numBytes;
    const temperature = 1;
    const continuation = await model.continueSequence(MEL_TEAPOT, 20, temperature);
    t.ok(continuation);
    t.true(continuation.notes.length > 0);
    t.isEqual(tf.memory().numBytes, startMemory);
    t.end();
});
test('MusicRNN can be disposed', async (t) => {
    model.dispose();
    t.isEqual(tf.memory().numBytes, initialBytes);
    t.end();
});
//# sourceMappingURL=model_test.js.map