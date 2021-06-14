import * as tf from '@tensorflow/tfjs';
import { fetch } from '../core/compat/global';
import { logging } from '../core';
const DATA_TIME_QUANTIZE_RATE = 31.25;
const DATA_MAX_DISCRETE_TIMES = 32;
const RNN_NLAYERS = 2;
const RNN_NUNITS = 128;
const NUM_BUTTONS = 8;
const NUM_PIANOKEYS = 88;
function createZeroState() {
    const state = { c: [], h: [] };
    for (let i = 0; i < RNN_NLAYERS; ++i) {
        state.c.push(tf.zeros([1, RNN_NUNITS], 'float32'));
        state.h.push(tf.zeros([1, RNN_NUNITS], 'float32'));
    }
    return state;
}
function disposeState(state) {
    for (let i = 0; i < RNN_NLAYERS; ++i) {
        state.c[i].dispose();
        state.h[i].dispose();
    }
}
function sampleLogits(logits, temperature, seed) {
    temperature = temperature !== undefined ? temperature : 1.;
    if (temperature < 0. || temperature > 1.) {
        throw new Error('Invalid temperature specified');
    }
    let result;
    if (temperature === 0) {
        result = tf.argMax(logits, 0);
    }
    else {
        if (temperature < 1) {
            logits = tf.div(logits, tf.scalar(temperature, 'float32'));
        }
        const scores = tf.reshape(tf.softmax(logits, 0), [1, -1]);
        const sample = tf.multinomial(scores, 1, seed, true);
        result = tf.reshape(sample, []);
    }
    return result;
}
class PianoGenieBase {
    constructor(checkpointURL) {
        this.checkpointURL = checkpointURL;
        this.initialized = false;
    }
    isInitialized() {
        return this.initialized;
    }
    async initialize(staticVars) {
        if (this.initialized) {
            this.dispose();
        }
        if (this.checkpointURL === undefined && staticVars === undefined) {
            throw new Error('Need to specify either URI or static variables');
        }
        if (staticVars === undefined) {
            const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                .then((response) => response.json())
                .then((manifest) => tf.io.loadWeights(manifest, this.checkpointURL));
            this.modelVars = vars;
        }
        else {
            this.modelVars = staticVars;
        }
        this.decLSTMCells = [];
        this.decForgetBias = tf.scalar(1, 'float32');
        for (let i = 0; i < RNN_NLAYERS; ++i) {
            const cellPrefix = `phero_model/decoder/rnn/rnn/multi_rnn_cell/cell_${i}/lstm_cell/`;
            this.decLSTMCells.push((data, c, h) => tf.basicLSTMCell(this.decForgetBias, this.modelVars[cellPrefix + 'kernel'], this.modelVars[cellPrefix + 'bias'], data, c, h));
        }
        this.resetState();
        this.initialized = true;
        this.next(0);
        this.resetState();
    }
    getRnnInputFeats() {
        const feats = tf.tidy(() => {
            const buttonTensor = tf.tensor1d([this.button], 'float32');
            const buttonScaled = tf.sub(tf.mul(2., tf.div(buttonTensor, NUM_BUTTONS - 1)), 1);
            return buttonScaled.as1D();
        });
        return feats;
    }
    next(button, temperature, seed) {
        const sampleFunc = (logits) => {
            return sampleLogits(logits, temperature, seed);
        };
        return this.nextWithCustomSamplingFunction(button, sampleFunc);
    }
    nextFromKeyList(button, keyList, temperature, seed) {
        const sampleFunc = (logits) => {
            const keySubsetTensor = tf.tensor1d(keyList, 'int32');
            logits = tf.gather(logits, keySubsetTensor);
            let result = sampleLogits(logits, temperature, seed);
            const result1d = tf.gather(keySubsetTensor, tf.reshape(result, [1]));
            result = tf.reshape(result1d, []);
            return result;
        };
        return this.nextWithCustomSamplingFunction(button, sampleFunc);
    }
    nextFromKeyWhitelist(button, keyList, temperature, seed) {
        logging.log('nextFromKeyWhitelist() is deprecated, and will be removed in a future \
         version. Please use nextFromKeyList() instead', 'PianoGenie', 5);
        return this.nextFromKeyList(button, keyList, temperature, seed);
    }
    nextWithCustomSamplingFunction(button, sampleFunc) {
        const lastState = this.lastState;
        this.button = button;
        const rnnInput = this.getRnnInputFeats();
        const [state, output] = this.evaluateModelAndSample(rnnInput, lastState, sampleFunc);
        rnnInput.dispose();
        disposeState(this.lastState);
        this.lastState = state;
        return output;
    }
    evaluateModelAndSample(rnnInput1d, initialState, sampleFunc) {
        if (!this.initialized) {
            throw new Error('Model is not initialized.');
        }
        const [finalState, output] = tf.tidy(() => {
            let rnnInput = tf.matMul(tf.expandDims(rnnInput1d, 0), this.modelVars['phero_model/decoder/rnn_input/dense/kernel']);
            rnnInput = tf.add(rnnInput, this.modelVars['phero_model/decoder/rnn_input/dense/bias']);
            const [c, h] = tf.multiRNNCell(this.decLSTMCells, rnnInput, initialState.c, initialState.h);
            const finalState = { c, h };
            let logits = tf.matMul(h[RNN_NLAYERS - 1], this.modelVars['phero_model/decoder/pitches/dense/kernel']);
            logits = tf.add(logits, this.modelVars['phero_model/decoder/pitches/dense/bias']);
            const logits1D = tf.reshape(logits, [NUM_PIANOKEYS]);
            const sample = sampleFunc(logits1D);
            const output = sample.dataSync()[0];
            return [finalState, output];
        });
        return [finalState, output];
    }
    resetState() {
        if (this.lastState !== undefined) {
            disposeState(this.lastState);
        }
        this.lastState = createZeroState();
    }
    dispose() {
        if (!this.initialized) {
            return;
        }
        Object.keys(this.modelVars).forEach(name => this.modelVars[name].dispose());
        this.decForgetBias.dispose();
        disposeState(this.lastState);
        this.initialized = false;
    }
}
class PianoGenieAutoregressiveDeltaTime extends PianoGenieBase {
    getRnnInputFeats() {
        const feats = tf.tidy(() => {
            const featsArr = [super.getRnnInputFeats()];
            const lastOutput = this.lastOutput;
            const lastTime = this.lastTime;
            const time = this.time;
            let deltaTime;
            if (this.deltaTimeOverride === undefined) {
                deltaTime = (time.getTime() - lastTime.getTime()) / 1000;
            }
            else {
                deltaTime = this.deltaTimeOverride;
                this.deltaTimeOverride = undefined;
            }
            const lastOutputTensor = tf.scalar(lastOutput, 'int32');
            const lastOutputInc = tf.addStrict(lastOutputTensor, tf.scalar(1, 'int32'));
            const lastOutputOh = tf.cast(tf.oneHot(lastOutputInc, NUM_PIANOKEYS + 1), 'float32');
            featsArr.push(lastOutputOh);
            const deltaTimeTensor = tf.scalar(deltaTime, 'float32');
            const deltaTimeBin = tf.round(tf.mul(deltaTimeTensor, DATA_TIME_QUANTIZE_RATE));
            const deltaTimeTrunc = tf.minimum(deltaTimeBin, DATA_MAX_DISCRETE_TIMES);
            const deltaTimeInt = tf.cast(tf.add(deltaTimeTrunc, 1e-4), 'int32');
            const deltaTimeOh = tf.oneHot(deltaTimeInt, DATA_MAX_DISCRETE_TIMES + 1);
            const deltaTimeOhFloat = tf.cast(deltaTimeOh, 'float32');
            featsArr.push(deltaTimeOhFloat);
            this.lastTime = time;
            return tf.concat1d(featsArr);
        });
        return feats;
    }
    nextWithCustomSamplingFunction(button, sampleFunc) {
        this.time = new Date();
        const output = super.nextWithCustomSamplingFunction(button, sampleFunc);
        this.lastOutput = output;
        this.lastTime = this.time;
        return output;
    }
    overrideLastOutput(lastOutput) {
        this.lastOutput = lastOutput;
    }
    overrideDeltaTime(deltaTime) {
        this.deltaTimeOverride = deltaTime;
    }
    resetState() {
        super.resetState();
        this.lastOutput = -1;
        this.lastTime = new Date();
        this.lastTime.setSeconds(this.lastTime.getSeconds() - 100000);
        this.time = new Date();
    }
}
var PitchClass;
(function (PitchClass) {
    PitchClass[PitchClass["None"] = 0] = "None";
    PitchClass[PitchClass["C"] = 1] = "C";
    PitchClass[PitchClass["Cs"] = 2] = "Cs";
    PitchClass[PitchClass["D"] = 3] = "D";
    PitchClass[PitchClass["Eb"] = 4] = "Eb";
    PitchClass[PitchClass["E"] = 5] = "E";
    PitchClass[PitchClass["F"] = 6] = "F";
    PitchClass[PitchClass["Fs"] = 7] = "Fs";
    PitchClass[PitchClass["G"] = 8] = "G";
    PitchClass[PitchClass["Ab"] = 9] = "Ab";
    PitchClass[PitchClass["A"] = 10] = "A";
    PitchClass[PitchClass["Bb"] = 11] = "Bb";
    PitchClass[PitchClass["B"] = 12] = "B";
})(PitchClass || (PitchClass = {}));
var ChordFamily;
(function (ChordFamily) {
    ChordFamily[ChordFamily["None"] = 0] = "None";
    ChordFamily[ChordFamily["Maj"] = 1] = "Maj";
    ChordFamily[ChordFamily["Min"] = 2] = "Min";
    ChordFamily[ChordFamily["Aug"] = 3] = "Aug";
    ChordFamily[ChordFamily["Dim"] = 4] = "Dim";
    ChordFamily[ChordFamily["Seven"] = 5] = "Seven";
    ChordFamily[ChordFamily["Maj7"] = 6] = "Maj7";
    ChordFamily[ChordFamily["Min7"] = 7] = "Min7";
    ChordFamily[ChordFamily["Min7b5"] = 8] = "Min7b5";
})(ChordFamily || (ChordFamily = {}));
class PianoGenieAutoregressiveDeltaTimeChord extends PianoGenieAutoregressiveDeltaTime {
    getRnnInputFeats() {
        const feats = tf.tidy(() => {
            const feats1d = super.getRnnInputFeats();
            const featsArr = [feats1d];
            const chordRootTensor = tf.scalar(this.chordRoot, 'int32');
            const chordRootTensorSubOne = tf.subStrict(chordRootTensor, tf.scalar(1, 'int32'));
            const chordRootTensorOh = tf.cast(tf.oneHot(chordRootTensorSubOne, 12), 'float32');
            featsArr.push(chordRootTensorOh);
            const chordFamilyTensor = tf.scalar(this.chordFamily, 'int32');
            const chordFamilyTensorSubOne = tf.subStrict(chordFamilyTensor, tf.scalar(1, 'int32'));
            const chordFamilyTensorOh = tf.cast(tf.oneHot(chordFamilyTensorSubOne, 8), 'float32');
            featsArr.push(chordFamilyTensorOh);
            return tf.concat1d(featsArr);
        });
        return feats;
    }
    setChordRoot(chordRoot) {
        this.chordRoot = chordRoot;
    }
    setChordFamily(chordFamily) {
        this.chordFamily = chordFamily;
    }
    resetState() {
        super.resetState();
        this.chordRoot = PitchClass.None;
        this.chordFamily = ChordFamily.None;
    }
}
class PianoGenieAutoregressiveDeltaTimeKeysig extends PianoGenieAutoregressiveDeltaTime {
    getRnnInputFeats() {
        const feats = tf.tidy(() => {
            const feats1d = super.getRnnInputFeats();
            const featsArr = [feats1d];
            const keySigTensor = tf.scalar(this.keySignature, 'int32');
            const keySigTensorSubOne = tf.subStrict(keySigTensor, tf.scalar(1, 'int32'));
            const keySigTensorOh = tf.cast(tf.oneHot(keySigTensorSubOne, 12), 'float32');
            featsArr.push(keySigTensorOh);
            return tf.concat1d(featsArr);
        });
        return feats;
    }
    setKeySignature(keySignature) {
        this.keySignature = keySignature;
    }
    resetState() {
        super.resetState();
        this.keySignature = PitchClass.None;
    }
}
class PianoGenieAutoregressiveDeltaTimeKeysigChord extends PianoGenieAutoregressiveDeltaTimeKeysig {
    getRnnInputFeats() {
        const feats = tf.tidy(() => {
            const feats1d = super.getRnnInputFeats();
            const featsArr = [feats1d];
            const chordRootTensor = tf.scalar(this.chordRoot, 'int32');
            const chordRootTensorSubOne = tf.subStrict(chordRootTensor, tf.scalar(1, 'int32'));
            const chordRootTensorOh = tf.cast(tf.oneHot(chordRootTensorSubOne, 12), 'float32');
            featsArr.push(chordRootTensorOh);
            const chordFamilyTensor = tf.scalar(this.chordFamily, 'int32');
            const chordFamilyTensorSubOne = tf.subStrict(chordFamilyTensor, tf.scalar(1, 'int32'));
            const chordFamilyTensorOh = tf.cast(tf.oneHot(chordFamilyTensorSubOne, 8), 'float32');
            featsArr.push(chordFamilyTensorOh);
            return tf.concat1d(featsArr);
        });
        return feats;
    }
    setChordRoot(chordRoot) {
        this.chordRoot = chordRoot;
    }
    setChordFamily(chordFamily) {
        this.chordFamily = chordFamily;
    }
    resetState() {
        super.resetState();
        this.chordRoot = PitchClass.None;
        this.chordFamily = ChordFamily.None;
    }
}
class PianoGenieAutoregressiveDeltaTimeKeysigChordFamily extends PianoGenieAutoregressiveDeltaTimeKeysig {
    getRnnInputFeats() {
        const feats = tf.tidy(() => {
            const feats1d = super.getRnnInputFeats();
            const featsArr = [feats1d];
            const chordFamilyTensor = tf.scalar(this.chordFamily, 'int32');
            const chordFamilyTensorSubOne = tf.subStrict(chordFamilyTensor, tf.scalar(1, 'int32'));
            const chordFamilyTensorOh = tf.cast(tf.oneHot(chordFamilyTensorSubOne, 8), 'float32');
            featsArr.push(chordFamilyTensorOh);
            return tf.concat1d(featsArr);
        });
        return feats;
    }
    setChordFamily(chordFamily) {
        this.chordFamily = chordFamily;
    }
    resetState() {
        super.resetState();
        this.chordFamily = ChordFamily.None;
    }
}
class PianoGenie extends PianoGenieAutoregressiveDeltaTime {
}
class PianoGenieChord extends PianoGenieAutoregressiveDeltaTimeChord {
}
class PianoGenieKeysig extends PianoGenieAutoregressiveDeltaTimeKeysig {
}
class PianoGenieKeysigChord extends PianoGenieAutoregressiveDeltaTimeKeysigChord {
}
class PianoGenieKeysigChordFamily extends PianoGenieAutoregressiveDeltaTimeKeysigChordFamily {
}
export { PianoGenie, PianoGenieChord, PianoGenieKeysig, PianoGenieKeysigChord, PianoGenieKeysigChordFamily, PitchClass, ChordFamily };
//# sourceMappingURL=model.js.map