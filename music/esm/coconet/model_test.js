const globalAny = global;
globalAny.performance = Date;
globalAny.navigator = {
    userAgent: ''
};
globalAny.fetch = require('node-fetch');
import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import { Coconet } from './model';
const MEL_CKPT = 'https://storage.googleapis.com/magentadata/js/checkpoints/coconet/bach';
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
test('Coconet can be initialized', async (t) => {
    initialBytes = tf.memory().numBytes;
    model = new Coconet(MEL_CKPT);
    await model.initialize();
    t.true(model.isInitialized);
    t.end();
});
test('Coconet can infill a sequence ', async (t) => {
    const startMemory = tf.memory().numBytes;
    const ns = await model.infill(MEL_TEAPOT, { numIterations: 1 });
    t.ok(ns);
    t.true(ns.notes.length > 0);
    const v0 = ns.notes.map(n => n.instrument === 0);
    const v1 = ns.notes.map(n => n.instrument === 1);
    const v2 = ns.notes.map(n => n.instrument === 2);
    const v3 = ns.notes.map(n => n.instrument === 3);
    t.true(v0.length > 0);
    t.true(v1.length > 0);
    t.true(v2.length > 0);
    t.true(v3.length > 0);
    t.isEqual(tf.memory().numBytes, startMemory);
    t.end();
});
test('Coconet can be disposed', async (t) => {
    model.dispose();
    t.isEqual(tf.memory().numBytes, initialBytes);
    t.end();
});
//# sourceMappingURL=model_test.js.map