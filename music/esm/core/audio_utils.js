import * as tf from '@tensorflow/tfjs';
import * as FFT from 'fft.js';
import * as ndarray from 'ndarray';
import * as resample from 'ndarray-resample';
import { fetch, getOfflineAudioContext, isSafari } from '../core/compat/global';
import * as logging from './logging';
const SAMPLE_RATE = 16000;
const offlineCtx = getOfflineAudioContext(SAMPLE_RATE);
export async function loadAudioFromUrl(url) {
    return fetch(url)
        .then((body) => body.arrayBuffer())
        .then((buffer) => offlineCtx.decodeAudioData(buffer));
}
export async function loadAudioFromFile(blob) {
    const fileReader = new FileReader();
    const loadFile = new Promise((resolve, reject) => {
        fileReader.onerror = () => {
            fileReader.abort();
            reject(new DOMException('Something went wrong reading that file.'));
        };
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.readAsArrayBuffer(blob);
    });
    return loadFile.then((arrayBuffer) => offlineCtx.decodeAudioData(arrayBuffer));
}
export function melSpectrogram(y, params) {
    if (!params.power) {
        params.power = 2.0;
    }
    const stftMatrix = stft(y, params);
    const [spec, nFft] = magSpectrogram(stftMatrix, params.power);
    params.nFft = nFft;
    const melBasis = createMelFilterbank(params);
    return applyWholeFilterbank(spec, melBasis);
}
export function powerToDb(spec, amin = 1e-10, topDb = 80.0) {
    const width = spec.length;
    const height = spec[0].length;
    const logSpec = [];
    for (let i = 0; i < width; i++) {
        logSpec[i] = new Float32Array(height);
    }
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const val = spec[i][j];
            logSpec[i][j] = 10.0 * Math.log10(Math.max(amin, val));
        }
    }
    if (topDb) {
        if (topDb < 0) {
            throw new Error(`topDb must be non-negative.`);
        }
        for (let i = 0; i < width; i++) {
            const maxVal = max(logSpec[i]);
            for (let j = 0; j < height; j++) {
                logSpec[i][j] = Math.max(logSpec[i][j], maxVal - topDb);
            }
        }
    }
    return logSpec;
}
function getMonoAudio(audioBuffer) {
    if (audioBuffer.numberOfChannels === 1) {
        return audioBuffer.getChannelData(0);
    }
    if (audioBuffer.numberOfChannels !== 2) {
        throw Error(`${audioBuffer.numberOfChannels} channel audio is not supported.`);
    }
    const ch0 = audioBuffer.getChannelData(0);
    const ch1 = audioBuffer.getChannelData(1);
    const mono = new Float32Array(audioBuffer.length);
    for (let i = 0; i < audioBuffer.length; ++i) {
        mono[i] = (ch0[i] + ch1[i]) / 2;
    }
    return mono;
}
export async function resampleAndMakeMono(audioBuffer, targetSr = SAMPLE_RATE) {
    if (audioBuffer.sampleRate === targetSr) {
        return getMonoAudio(audioBuffer);
    }
    const sourceSr = audioBuffer.sampleRate;
    const lengthRes = (audioBuffer.length * targetSr) / sourceSr;
    if (!isSafari) {
        const _offlineCtx = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.duration * targetSr, targetSr);
        const bufferSource = _offlineCtx.createBufferSource();
        bufferSource.buffer = audioBuffer;
        bufferSource.connect(_offlineCtx.destination);
        bufferSource.start();
        return _offlineCtx.startRendering().then((buffer) => buffer.getChannelData(0));
    }
    else {
        logging.log('Safari does not support WebAudio resampling, so this may be slow.', 'O&F', 5);
        const originalAudio = getMonoAudio(audioBuffer);
        const resampledAudio = new Float32Array(lengthRes);
        resample(ndarray(resampledAudio, [lengthRes]), ndarray(originalAudio, [originalAudio.length]));
        return resampledAudio;
    }
}
function magSpectrogram(stft, power) {
    const spec = stft.map((fft) => pow(mag(fft), power));
    const nFft = stft[0].length - 1;
    return [spec, nFft];
}
function stft(y, params) {
    const nFft = params.nFft || 2048;
    const winLength = params.winLength || nFft;
    const hopLength = params.hopLength || Math.floor(winLength / 4);
    let fftWindow = hannWindow(winLength);
    fftWindow = padCenterToLength(fftWindow, nFft);
    y = padReflect(y, Math.floor(nFft / 2));
    const yFrames = frame(y, nFft, hopLength);
    const stftMatrix = [];
    const width = yFrames.length;
    const height = nFft + 2;
    for (let i = 0; i < width; i++) {
        const col = new Float32Array(height);
        stftMatrix[i] = col;
    }
    for (let i = 0; i < width; i++) {
        const winBuffer = applyWindow(yFrames[i], fftWindow);
        const col = fft(winBuffer);
        stftMatrix[i].set(col.slice(0, height));
    }
    return stftMatrix;
}
function applyWholeFilterbank(spec, filterbank) {
    const out = [];
    for (let i = 0; i < spec.length; i++) {
        out[i] = applyFilterbank(spec[i], filterbank);
    }
    return out;
}
function applyFilterbank(mags, filterbank) {
    if (mags.length !== filterbank[0].length) {
        throw new Error(`Each entry in filterbank should have dimensions ` +
            `matching FFT. |mags| = ${mags.length}, ` +
            `|filterbank[0]| = ${filterbank[0].length}.`);
    }
    const out = new Float32Array(filterbank.length);
    for (let i = 0; i < filterbank.length; i++) {
        const win = applyWindow(mags, filterbank[i]);
        out[i] = win.reduce((a, b) => a + b);
    }
    return out;
}
export function applyWindow(buffer, win) {
    if (buffer.length !== win.length) {
        console.error(`Buffer length ${buffer.length} != window length ${win.length}.`);
        return null;
    }
    const out = new Float32Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
        out[i] = win[i] * buffer[i];
    }
    return out;
}
export function padCenterToLength(data, length) {
    if (data.length > length) {
        throw new Error('Data is longer than length.');
    }
    const paddingLeft = Math.floor((length - data.length) / 2);
    const paddingRight = length - data.length - paddingLeft;
    return padConstant(data, [paddingLeft, paddingRight]);
}
export function padConstant(data, padding) {
    let padLeft, padRight;
    if (typeof padding === 'object') {
        [padLeft, padRight] = padding;
    }
    else {
        padLeft = padRight = padding;
    }
    const out = new Float32Array(data.length + padLeft + padRight);
    out.set(data, padLeft);
    return out;
}
function padReflect(data, padding) {
    const out = padConstant(data, padding);
    for (let i = 0; i < padding; i++) {
        out[i] = out[2 * padding - i];
        out[out.length - i - 1] = out[out.length - 2 * padding + i - 1];
    }
    return out;
}
export function frame(data, frameLength, hopLength) {
    const bufferCount = Math.floor((data.length - frameLength) / hopLength) + 1;
    const buffers = Array.from({ length: bufferCount }, (x, i) => new Float32Array(frameLength));
    for (let i = 0; i < bufferCount; i++) {
        const ind = i * hopLength;
        const buffer = data.slice(ind, ind + frameLength);
        buffers[i].set(buffer);
        if (buffer.length !== frameLength) {
            continue;
        }
    }
    return buffers;
}
function createMelFilterbank(params) {
    const fMin = params.fMin || 0;
    const fMax = params.fMax || params.sampleRate / 2;
    const nMels = params.nMels || 128;
    const nFft = params.nFft || 2048;
    const fftFreqs = calculateFftFreqs(params.sampleRate, nFft);
    const melFreqs = calculateMelFreqs(nMels + 2, fMin, fMax);
    const melDiff = internalDiff(melFreqs);
    const ramps = outerSubtract(melFreqs, fftFreqs);
    const filterSize = ramps[0].length;
    const weights = [];
    for (let i = 0; i < nMels; i++) {
        weights[i] = new Float32Array(filterSize);
        for (let j = 0; j < ramps[i].length; j++) {
            const lower = -ramps[i][j] / melDiff[i];
            const upper = ramps[i + 2][j] / melDiff[i + 1];
            const weight = Math.max(0, Math.min(lower, upper));
            weights[i][j] = weight;
        }
    }
    for (let i = 0; i < weights.length; i++) {
        const enorm = 2.0 / (melFreqs[2 + i] - melFreqs[i]);
        weights[i] = weights[i].map((val) => val * enorm);
    }
    return weights;
}
function fft(y) {
    const fft = new FFT(y.length);
    const out = fft.createComplexArray();
    const data = fft.toComplexArray(y);
    fft.transform(out, data);
    return out;
}
export function hannWindow(length) {
    const win = new Float32Array(length);
    for (let i = 0; i < length; i++) {
        win[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (length - 1)));
    }
    return win;
}
function linearSpace(start, end, count) {
    const delta = (end - start) / (count - 1);
    const out = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        out[i] = start + delta * i;
    }
    return out;
}
function mag(y) {
    const out = new Float32Array(y.length / 2);
    for (let i = 0; i < y.length / 2; i++) {
        out[i] = Math.sqrt(y[i * 2] * y[i * 2] + y[i * 2 + 1] * y[i * 2 + 1]);
    }
    return out;
}
export function midiToHz(notes) {
    let notesTensor = tf.sub(notes, 69.0);
    notesTensor = tf.div(notesTensor, 12.0);
    notesTensor = tf.pow(2.0, notesTensor);
    notesTensor = tf.mul(440.0, notesTensor);
    return notesTensor;
}
export async function hzToMidi(frequencies) {
    let frequenciesTensor = tf.sub(tf.div(tf.log(frequencies), tf.log(2)), tf.div(tf.log(440.0), tf.log(2)));
    frequenciesTensor = tf.mul(12, frequenciesTensor);
    frequenciesTensor = tf.add(frequenciesTensor, 69);
    const frequenciesVal = await frequenciesTensor.array();
    return frequenciesVal;
}
function hzToMel(hz) {
    return 1125.0 * Math.log(1 + hz / 700.0);
}
function melToHz(mel) {
    return 700.0 * (Math.exp(mel / 1125.0) - 1);
}
function calculateFftFreqs(sampleRate, nFft) {
    return linearSpace(0, sampleRate / 2, Math.floor(1 + nFft / 2));
}
function calculateMelFreqs(nMels, fMin, fMax) {
    const melMin = hzToMel(fMin);
    const melMax = hzToMel(fMax);
    const mels = linearSpace(melMin, melMax, nMels);
    const hzs = mels.map((mel) => melToHz(mel));
    return hzs;
}
function internalDiff(arr) {
    const out = new Float32Array(arr.length - 1);
    for (let i = 0; i < arr.length; i++) {
        out[i] = arr[i + 1] - arr[i];
    }
    return out;
}
function outerSubtract(arr, arr2) {
    const out = [];
    for (let i = 0; i < arr.length; i++) {
        out[i] = new Float32Array(arr2.length);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            out[i][j] = arr[i] - arr2[j];
        }
    }
    return out;
}
function pow(arr, power) {
    return arr.map((v) => Math.pow(v, power));
}
function max(arr) {
    return arr.reduce((a, b) => Math.max(a, b));
}
//# sourceMappingURL=audio_utils.js.map