import * as tf from '@tensorflow/tfjs';
import { midiToHz } from '../core/audio_utils';
import { CONF_THRESHOLD, PITCH_CONF_JITTER, PT_OFFSET, PT_SLOPE, } from './spice';
function shiftF0(f0Hz, f0OctaveShift = 0.0) {
    return tf.tidy(() => {
        let tempF0 = tf.mul(f0Hz, tf.pow(2, f0OctaveShift));
        tempF0 = tempF0.clipByValue(0.0, midiToHz(110.0).dataSync()[0]);
        return tempF0;
    });
}
function upsample_linear(buffer, newSampleRateLength) {
    const pitchedInput = [];
    const dupCountPitches = Math.floor(newSampleRateLength / buffer.length);
    const modulos = newSampleRateLength % buffer.length;
    for (let i = 0; i < buffer.length; i++) {
        pitchedInput.push(buffer[i]);
        for (let j = 1; j < dupCountPitches; j++) {
            pitchedInput.push(-1);
        }
        if (i < modulos) {
            pitchedInput.push(-1);
        }
    }
    let lastPitch = -1;
    for (let i = 0; i < pitchedInput.length; i++) {
        if (pitchedInput[i] !== -1) {
            let dif = pitchedInput[i];
            const lastValue = lastPitch >= 0 ? pitchedInput[lastPitch] : 0;
            if (lastPitch !== -1) {
                dif -= pitchedInput[lastPitch];
            }
            for (let j = lastPitch + 1; j < i; j++) {
                pitchedInput[j] = lastValue + (dif * (j - lastPitch)) / (i - lastPitch);
            }
            lastPitch = i;
        }
    }
    for (let i = lastPitch + 1; i < pitchedInput.length; i++) {
        pitchedInput[i] = lastPitch >= 0 ? pitchedInput[i - 1] : 0;
    }
    return pitchedInput;
}
function upsample_f0(buffer, newSampleRateLength, modelMaxFrameLength) {
    buffer.splice(modelMaxFrameLength);
    return upsample_linear(buffer, newSampleRateLength);
}
function getPitchHz(modelPitch) {
    const fmin = 10.0;
    const binsPerOctave = 12.0;
    const cqtBin = modelPitch * PT_SLOPE + PT_OFFSET;
    return fmin * Math.pow(2.0, (1.0 * cqtBin) / binsPerOctave);
}
async function getPitches(spiceModel, inputData, confidenceThreshold = CONF_THRESHOLD) {
    const SPICE_SAMPLE_RATE = 16000;
    const SPICE_MODEL_MULTIPLE = 512;
    const spicePitchesOutput = [];
    const allConfidences = [];
    const audioChannelDataLength = inputData.length;
    const inputTensor = tf.tensor(inputData);
    const inputSampleNum = Math.ceil(audioChannelDataLength / SPICE_MODEL_MULTIPLE) *
        SPICE_MODEL_MULTIPLE;
    const fullInputWithPadding = inputTensor.pad([
        [0, inputSampleNum - audioChannelDataLength],
    ]);
    const expectedDuration = fullInputWithPadding.size / SPICE_SAMPLE_RATE;
    const output = await spiceModel.execute({
        input_audio_samples: fullInputWithPadding,
    });
    let uncertainties = await output[0].data();
    const pitches = await output[1].data();
    if (((pitches.length - 1) * 32) / 1000 === expectedDuration) {
        let lastPitch = 20.0;
        for (let i = 0; i < pitches.length; ++i) {
            const confidence = 1.0 - uncertainties[i];
            allConfidences.push(confidence);
            if (confidence >= CONF_THRESHOLD) {
                lastPitch = getPitchHz(pitches[i]);
                spicePitchesOutput.push(lastPitch);
            }
            else {
                const noiseT = tf.truncatedNormal([1], 0.0, PITCH_CONF_JITTER);
                const noise = await noiseT.array();
                const jitter = 1.0 - noise;
                spicePitchesOutput.push(lastPitch * jitter);
                noiseT.dispose();
            }
        }
    }
    else {
        const finalPitchesLength = inputSampleNum / SPICE_MODEL_MULTIPLE + 1;
        const stitchedPitches = new Float32Array(finalPitchesLength);
        uncertainties = new Float32Array(finalPitchesLength);
        for (let i = 0; i < inputSampleNum; i += inputSampleNum / 4) {
            const partialInput = fullInputWithPadding.slice([i], [inputSampleNum / 4]);
            const partialOutput = await spiceModel.execute({
                input_audio_samples: partialInput,
            });
            const partialUncertainties = await partialOutput[0].data();
            const partialPitches = await partialOutput[1].data();
            const index = Math.floor(i / SPICE_MODEL_MULTIPLE);
            uncertainties.set(partialUncertainties, index);
            stitchedPitches.set(partialPitches, index);
            partialInput.dispose();
            partialOutput[0].dispose();
            partialOutput[1].dispose();
        }
        let lastPitch = 20.0;
        for (let i = 0; i < stitchedPitches.length; ++i) {
            const confidence = 1.0 - uncertainties[i];
            allConfidences.push(confidence);
            if (confidence >= confidenceThreshold) {
                lastPitch = getPitchHz(stitchedPitches[i]);
                spicePitchesOutput.push(lastPitch);
            }
            else {
                const noiseT = tf.truncatedNormal([1], 0.0, PITCH_CONF_JITTER);
                const noise = await noiseT.array();
                const jitter = 1.0 - noise;
                spicePitchesOutput.push(lastPitch * jitter);
                noiseT.dispose();
            }
        }
    }
    output[0].dispose();
    output[1].dispose();
    inputTensor.dispose();
    fullInputWithPadding.dispose();
    return { pitches: spicePitchesOutput, confidences: allConfidences };
}
export { getPitches, shiftF0, upsample_f0, upsample_linear };
//# sourceMappingURL=pitch_utils.js.map