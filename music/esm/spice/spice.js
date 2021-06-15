import * as tf from '@tensorflow/tfjs';
import { resampleAndMakeMono } from '../core/audio_utils';
import { computePower } from './loudness_utils';
import { getPitches } from './pitch_utils';
export const MODEL_SAMPLE_RATE = 16000;
export const MODEL_FRAME_RATE = 250;
export const PT_OFFSET = 25.58;
export const PT_SLOPE = 63.07;
export const PITCH_CONF_JITTER = 0.002;
export const CONF_THRESHOLD = 0.7;
async function startSpice(modelUrl) {
    let spiceModel;
    spiceModel = await tf.loadGraphModel(modelUrl, {
        fromTFHub: true,
    });
    return spiceModel;
}
async function getAudioFeatures(inputAudioBuffer, spiceModel, confidenceThreshold) {
    if (tf.getBackend() !== 'webgl') {
        throw new Error('Device does not support webgl.');
    }
    const audioData = await resampleAndMakeMono(inputAudioBuffer, MODEL_SAMPLE_RATE);
    const originalRecordedBufferLength = audioData.length;
    const powerTmp = await computePower(audioData);
    const { pitches, confidences } = await getPitches(spiceModel, audioData, confidenceThreshold);
    return {
        f0_hz: pitches,
        loudness_db: powerTmp,
        confidences,
        originalRecordedBufferLength,
    };
}
export { startSpice, getAudioFeatures };
//# sourceMappingURL=spice.js.map