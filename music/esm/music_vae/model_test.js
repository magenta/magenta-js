import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import { MusicVAE } from './model';
const MEL_CKPT = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small';
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
let mvae;
let initialBytes;
test('MusicVAE can be initialized', async (t) => {
    initialBytes = tf.memory().numBytes;
    mvae = new MusicVAE(MEL_CKPT);
    await mvae.initialize();
    t.true(mvae.isInitialized);
    t.end();
});
test('MusicVAE can encode ', async (t) => {
    const startMemory = tf.memory().numBytes;
    const z = await mvae.encode([MEL_TEAPOT]);
    t.deepEquals(z.shape, [1, 256]);
    z.dispose();
    t.isEqual(tf.memory().numBytes, startMemory);
    t.end();
});
test('MusicVAE can decode ', async (t) => {
    const startMemory = tf.memory().numBytes;
    const z = await mvae.encode([MEL_TEAPOT]);
    const recon = await mvae.decode(z);
    t.ok(recon);
    t.isEqual(recon.length, 1);
    z.dispose();
    const notes = recon[0].notes;
    t.true(notes.length > 0);
    t.isEqual(tf.memory().numBytes, startMemory);
    t.end();
});
test('MusicVAE can be disposed', async (t) => {
    mvae.dispose();
    t.isEqual(tf.memory().numBytes, initialBytes);
    t.end();
});
//# sourceMappingURL=model_test.js.map