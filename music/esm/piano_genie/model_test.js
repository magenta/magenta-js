import * as fs from 'fs';
import * as test from 'tape';
import * as tf from '@tensorflow/tfjs';
import * as logging from '../core/logging';
import { PianoGenie } from './model';
function loadJSONModelWeights(fp) {
    const rawVars = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const vars = {};
    Object.keys(rawVars).forEach(key => {
        rawVars[key].length = rawVars[key].size;
        vars[key] = tf.tensor(Float32Array.from(rawVars[key]), rawVars[key].shape, 'float32');
    });
    return vars;
}
const TOLERANCE = 1e-6;
test('Piano Genie Model Correctness', async (t) => {
    const initialMemory = tf.memory();
    const modelWeightsFp = 'src/piano_genie/test_data/stp_iq_auto_dt.json';
    if (!fs.existsSync(modelWeightsFp)) {
        logging.log('Piano Genie model weights not found. Provisional pass.', 'Model Test');
        return t.end();
    }
    const vars = loadJSONModelWeights(modelWeightsFp);
    const genie = new PianoGenie(undefined);
    await genie.initialize(vars);
    const memoryPostInitialize = tf.memory();
    tf.tidy(() => {
        const keys = [];
        for (let i = 0; i < 8; ++i) {
            genie.overrideDeltaTime(0.1);
            keys.push(genie.next(i, 1., 1337));
        }
        for (let i = 7; i >= 0; --i) {
            genie.overrideDeltaTime(0.1);
            keys.push(genie.next(i, 0.));
        }
        for (let i = 0; i < 8; ++i) {
            genie.overrideDeltaTime(0.05);
            keys.push(genie.next(3 + (i % 2), 0.5, 1337));
        }
        const expectedKeys = [
            21, 23, 24, 26, 28, 31, 35, 40,
            43, 45, 45, 43, 42, 40, 36, 33,
            35, 36, 36, 38, 36, 38, 36, 38
        ];
        t.equal(tf.memory().numBytes, memoryPostInitialize.numBytes);
        t.deepEqual(keys, expectedKeys);
    });
    genie.resetState();
    tf.tidy(() => {
        const gMajTwoOctaves = [
            22, 24, 26, 27, 29, 31, 33,
            34, 36, 38, 39, 41, 43, 45
        ];
        const keys = [];
        for (let i = 0; i < 8; ++i) {
            genie.overrideDeltaTime(0.1);
            keys.push(genie.nextFromKeyList(i, gMajTwoOctaves, 1., 1337));
        }
        for (let i = 7; i >= 0; --i) {
            genie.overrideDeltaTime(0.1);
            keys.push(genie.nextFromKeyList(i, gMajTwoOctaves, 0.));
        }
        for (let i = 0; i < 8; ++i) {
            genie.overrideDeltaTime(0.05);
            keys.push(genie.nextFromKeyList(3 + (i % 2), gMajTwoOctaves, 0.5, 1337));
        }
        const expectedKeys = [
            26, 26, 26, 27, 29, 31, 34, 39,
            43, 45, 45, 43, 41, 39, 36, 33,
            34, 36, 36, 38, 38, 39, 38, 39
        ];
        t.deepEqual(keys, expectedKeys);
    });
    genie.resetState();
    const testSampleFuncFactory = (pairs) => {
        return (logits) => {
            const scores = tf.softmax(logits);
            const _scores = scores.dataSync();
            pairs.forEach(([pianoKey, expectedScore]) => {
                t.ok(Math.abs(_scores[pianoKey] - expectedScore) < TOLERANCE);
            });
            return tf.scalar(0, 'int32');
        };
    };
    tf.tidy(() => {
        genie.overrideDeltaTime(0.);
        genie.next(0);
        genie.overrideDeltaTime(0.125);
        genie.overrideLastOutput(43);
        genie.next(1);
        const sampleFunc = testSampleFuncFactory([
            [39, 0.12285],
            [40, 0.829168],
            [41, 0.0366595],
        ]);
        genie.overrideDeltaTime(1.);
        genie.overrideLastOutput(45);
        genie.nextWithCustomSamplingFunction(2, sampleFunc);
    });
    genie.resetState();
    tf.tidy(() => {
        genie.overrideDeltaTime(0.125);
        genie.next(1);
        genie.overrideDeltaTime(0.25);
        genie.overrideLastOutput(44);
        genie.next(2);
        const sampleFunc = testSampleFuncFactory([
            [43, 0.18577],
            [44, 0.813153],
            [45, 2.67857e-05],
        ]);
        genie.overrideDeltaTime(1.5);
        genie.overrideLastOutput(46);
        genie.nextWithCustomSamplingFunction(3, sampleFunc);
    });
    genie.dispose();
    t.equal(tf.memory().numBytes, initialMemory.numBytes);
    t.end();
});
//# sourceMappingURL=model_test.js.map