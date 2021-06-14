import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';
import * as Tone from 'tone';
import { resampleAndMakeMono } from '../core/audio_utils';
import { upsample_f0 } from '../spice/pitch_utils';
import { MODEL_SAMPLE_RATE } from '../spice/spice';
import { addReverb } from './add_reverb';
import { mixAndJoinAudioData } from './audio_utils';
import { arrayBufferToAudioBuffer } from './buffer_utils';
import { CROSSFADE_DURATION, OUTPUT_SAMPLE_RATE } from './constants';
import { convertFrameToSecs, convertSecsToFrame, getModel, memCheck, normalizeAudioFeatures, resizeAudioFeatures, } from './ddsp';
class DDSP {
    constructor(checkpointUrl, settings) {
        this.checkpointUrl = checkpointUrl;
        if (settings) {
            this.settings = settings;
        }
    }
    async initialize() {
        tf.registerOp('Roll', (node) => {
            const tensors = tf.split(node.inputs[0], 2, 2);
            const result = tf.concat([tensors[1], tensors[0]], 2);
            tensors.forEach((tensor) => tensor.dispose());
            return result;
        });
        tf.env().set('WEBGL_PACK', false);
        tf.env().set('WEBGL_CONV_IM2COL', false);
        tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 100 * 1024 * 1024);
        this.model = await getModel(`${this.checkpointUrl}/model.json`);
        let settings;
        try {
            settings = await fetch(`${this.checkpointUrl}/settings.json`)
                .then((res) => res.json());
        }
        finally {
            if (this.settings === null) {
                throw new Error('Passing settings is required if you do not have a settings.json file.');
            }
        }
        this.settings = {
            ...settings,
            ...this.settings,
        };
        this.initialized = true;
    }
    dispose() {
        if (!this.initialized) {
            return;
        }
        this.model.dispose();
        this.checkpointUrl = null;
        this.initialized = false;
    }
    isInitialized() {
        return this.initialized;
    }
    async memCheck() {
        return await memCheck();
    }
    async synthesize(audioFeatures, settings) {
        if (settings !== null) {
            this.settings = { ...this.settings, ...settings };
        }
        const { f0_hz, loudness_db, confidences } = audioFeatures;
        const upsampledPitches = upsample_f0(f0_hz, loudness_db.length, this.settings.modelMaxFrameLength);
        const upsampledConfidences = upsample_f0(confidences, loudness_db.length, this.settings.modelMaxFrameLength);
        const normalizedAudioFeatures = await normalizeAudioFeatures({
            f0_hz: upsampledPitches,
            loudness_db,
            confidences: upsampledConfidences,
        }, this.settings);
        const audioChunks = [];
        const inputFrameLength = normalizedAudioFeatures.loudness_db.length;
        const inputAudioLengthInSecs = convertFrameToSecs(inputFrameLength);
        let isLastChunks = false;
        const usableAudioDuration = convertFrameToSecs(this.settings.modelMaxFrameLength);
        let audioBuffer;
        const mixBufferLength = CROSSFADE_DURATION * MODEL_SAMPLE_RATE;
        for (let i = 0; i < inputAudioLengthInSecs; i += usableAudioDuration - CROSSFADE_DURATION) {
            const startFrameIndex = Math.floor(convertSecsToFrame(i));
            const endFrameIndex = convertSecsToFrame(i + usableAudioDuration);
            if (endFrameIndex > inputFrameLength) {
                isLastChunks = true;
            }
            const { f0_hz, loudness_db } = await resizeAudioFeatures(normalizedAudioFeatures, startFrameIndex, endFrameIndex, isLastChunks, inputFrameLength);
            const f0hzTensor = tf.tensor1d(f0_hz, 'float32');
            const loudnessTensor = tf.tensor1d(loudness_db, 'float32');
            const result = await this.model.predict({
                f0_hz: f0hzTensor,
                loudness_db: loudnessTensor,
            });
            const resultData = await result.data();
            audioChunks.push(resultData);
            result.dispose();
            f0hzTensor.dispose();
            loudnessTensor.dispose();
        }
        if (inputAudioLengthInSecs <= usableAudioDuration) {
            audioBuffer = audioChunks[0];
        }
        else {
            const buffers = [];
            for (let i = 0; i < audioChunks.length; i++) {
                const ac = audioChunks[i];
                buffers.push(ac);
            }
            audioBuffer = mixAndJoinAudioData(buffers, mixBufferLength);
        }
        const trimmedAudioChannelData = audioBuffer
            .slice(0, audioFeatures.originalRecordedBufferLength);
        const trimmedACModified = trimmedAudioChannelData.map((val) => val * (this.settings.postGain || 1));
        const audioCtx = new Tone.Context();
        const trimmedAudioBuffer = arrayBufferToAudioBuffer(audioCtx, trimmedACModified, MODEL_SAMPLE_RATE);
        const resampledAudio = await resampleAndMakeMono(trimmedAudioBuffer, OUTPUT_SAMPLE_RATE);
        const bufferWithReverbData = await addReverb({
            audioCtx,
            arrayBuffer: resampledAudio,
            sampleRate: OUTPUT_SAMPLE_RATE,
        });
        return bufferWithReverbData;
    }
}
export { DDSP };
//# sourceMappingURL=model.js.map