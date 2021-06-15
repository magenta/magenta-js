import * as tf from '@tensorflow/tfjs';
import { MODEL_FRAME_RATE, MODEL_SAMPLE_RATE } from './spice';
async function computePower(audioChannelData) {
    const frameSize = 1024;
    const refDb = 20.7;
    const ldRange = 120.0;
    const hopSize = Math.floor(MODEL_SAMPLE_RATE / MODEL_FRAME_RATE);
    const audioTensor = tf.tensor1d(audioChannelData, 'float32');
    const newSamplesCount = audioChannelData.length;
    if (audioTensor === null) {
        return [];
    }
    const sq = audioTensor.mul(audioTensor).reshape([newSamplesCount, 1]);
    const rmsEnergy = tf.conv1d(sq, tf.ones([frameSize, 1, 1]).div(frameSize), hopSize, 'same')
        .sqrt()
        .squeeze();
    const amin = 1e-20;
    const powerDb = tf.mul(tf.log(tf.maximum(amin, rmsEnergy)).div(tf.log(10)), 20);
    const powerDbShifted = powerDb.sub(refDb);
    const powerDbClipped = tf.maximum(powerDbShifted, -ldRange);
    const output = await powerDbClipped.array();
    audioTensor.dispose();
    sq.dispose();
    rmsEnergy.dispose();
    powerDb.dispose();
    powerDbShifted.dispose();
    powerDbClipped.dispose();
    return output;
}
export { computePower };
//# sourceMappingURL=loudness_utils.js.map