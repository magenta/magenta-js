import * as tf from '@tensorflow/tfjs';
import * as FFT from 'fft.js';
import { applyWindow, hannWindow, padCenterToLength } from '../core/audio_utils';
import { MAG_DESCALE_A, MAG_DESCALE_B, N_FFT, N_HOP, PHASE_DESCALE_A, PHASE_DESCALE_B, SAMPLE_LENGTH, SAMPLE_RATE } from './constants';
import { MEL_SPARSE_COEFFS } from './mel_sparse_coeffs';
export function melToLinearMatrix() {
    const m2l = tf.buffer([1024, 1024]);
    for (let i = 0; i < MEL_SPARSE_COEFFS.length; i++) {
        const x = MEL_SPARSE_COEFFS[i];
        m2l.set(x[2], x[0], x[1]);
    }
    return m2l.toTensor();
}
function descale(data, a, b) {
    return tf.div(tf.sub(data, b), a);
}
export function melToLinear(melLogPower) {
    return tf.tidy(() => {
        const m2l = melToLinearMatrix().expandDims(0);
        const melLogPowerDb = descale(melLogPower, MAG_DESCALE_A, MAG_DESCALE_B);
        const melPower = tf.exp(melLogPowerDb);
        const powerLin = tf.matMul(melPower, m2l);
        const magLin = tf.sqrt(powerLin);
        return magLin;
    });
}
export function ifreqToPhase(ifreq) {
    return tf.tidy(() => {
        const m2l = melToLinearMatrix().expandDims(0);
        const ifreqDescale = descale(ifreq, PHASE_DESCALE_A, PHASE_DESCALE_B);
        const phase = tf.cumsum(tf.mul(ifreqDescale, Math.PI), 1);
        const phaseLin = tf.matMul(phase, m2l);
        return phaseLin;
    });
}
function interleaveReIm(real, imag) {
    const reImInterleave = tf.tidy(() => {
        let reImBatch = tf.concat([real, imag], 0).expandDims(3);
        reImBatch = tf.pad(reImBatch, [[0, 0], [0, 0], [1, 0], [0, 0]]);
        const crops = [[0, 0], [0, 0]];
        const reImInterleave = tf.batchToSpaceND(reImBatch, [1, 2], crops).reshape([128, 4096]);
        return reImInterleave;
    });
    const reImArray = reImInterleave.dataSync();
    const reIm = [];
    for (let i = 0; i < 128; i++) {
        reIm[i] = reImArray.slice(i * 4096, (i + 1) * 4096);
    }
    reImInterleave.dispose();
    return reIm;
}
async function reImToAudio(reIm) {
    const ispecParams = {
        nFFt: N_FFT,
        winLength: N_FFT,
        hopLength: N_HOP,
        sampleRate: SAMPLE_RATE,
        center: false,
    };
    return istft(reIm, ispecParams);
}
export async function specgramsToAudio(specgrams) {
    const reImArray = tf.tidy(() => {
        const magSlice = tf.slice(specgrams, [0, 0, 0, 0], [1, -1, -1, 1]).reshape([
            1, 128, 1024
        ]);
        const magMel = magSlice;
        const mag = melToLinear(magMel);
        const ifreqSlice = tf.slice(specgrams, [0, 0, 0, 1], [
            1, -1, -1, 1
        ]).reshape([1, 128, 1024]);
        const ifreq = ifreqSlice;
        const phase = ifreqToPhase(ifreq);
        let real = mag.mul(tf.cos(phase));
        const mirrorReal = tf.reverse(real.slice([0, 0, 0], [1, 128, 1023]), 2);
        real = tf.concat([real, mirrorReal], 2);
        let imag = mag.mul(tf.sin(phase));
        const mirrorImag = tf.reverse(imag.slice([0, 0, 0], [1, 128, 1023]), 2);
        imag = tf.concat([imag, tf.mul(mirrorImag, -1.0)], 2);
        return [real, imag];
    });
    const reIm = await interleaveReIm(reImArray[0], reImArray[1]);
    const audio = await reImToAudio(reIm);
    reImArray.forEach(t => t.dispose());
    return audio;
}
export function ifft(reIm) {
    const nFFT = reIm.length / 2;
    const fft = new FFT(nFFT);
    const recon = fft.createComplexArray();
    fft.inverseTransform(recon, reIm);
    const result = fft.fromComplexArray(recon);
    return result;
}
export function istft(reIm, params) {
    const nFrames = reIm.length;
    const nReIm = reIm[0].length;
    const nFft = (nReIm / 2);
    const winLength = params.winLength || nFft;
    const hopLength = params.hopLength || Math.floor(winLength / 4);
    const center = params.center || false;
    let ifftWindow = hannWindow(winLength);
    for (let i = 0; i < ifftWindow.length; i++) {
        ifftWindow[i] = ifftWindow[i] / 1.5;
    }
    ifftWindow = padCenterToLength(ifftWindow, nFft);
    const expectedSignalLen = nFft + hopLength * (nFrames - 1);
    const y = new Float32Array(expectedSignalLen);
    for (let i = 0; i < nFrames; i++) {
        const sample = i * hopLength;
        let yTmp = ifft(reIm[i]);
        yTmp = applyWindow(yTmp, ifftWindow);
        yTmp = add(yTmp, y.slice(sample, sample + nFft));
        y.set(yTmp, sample);
    }
    let sliceStart = 0;
    let sliceLength = expectedSignalLen;
    if (center) {
        sliceStart = nFft / 2;
        sliceLength = y.length - (nFft / 2);
    }
    else {
        sliceStart = expectedSignalLen - SAMPLE_LENGTH;
        sliceLength = y.length - sliceStart;
    }
    const yTrimmed = y.slice(sliceStart, sliceLength);
    return yTrimmed;
}
function add(arr0, arr1) {
    if (arr0.length !== arr1.length) {
        console.error(`Array lengths must be equal to add: ${arr0.length}, ${arr0.length}`);
        return null;
    }
    const out = new Float32Array(arr0.length);
    for (let i = 0; i < arr0.length; i++) {
        out[i] = arr0[i] + arr1[i];
    }
    return out;
}
//# sourceMappingURL=audio_utils.js.map