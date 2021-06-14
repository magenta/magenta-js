import * as tf from '@tensorflow/tfjs';
import * as aux_inputs from '../core/aux_inputs';
import * as chords from '../core/chords';
import * as data from '../core/data';
import { fetch, performance } from '../core/compat/global';
import * as logging from '../core/logging';
import * as sequences from '../core/sequences';
import { ATTENTION_PREFIX, AttentionWrapper } from './attention';
const CELL_FORMAT = 'multi_rnn_cell/cell_%d/basic_lstm_cell/';
export class MusicRNN {
    constructor(checkpointURL, spec) {
        this.checkpointURL = checkpointURL;
        this.spec = spec;
        this.initialized = false;
        this.rawVars = {};
        this.biasShapes = [];
        this.lstmCells = [];
    }
    isInitialized() {
        return this.initialized;
    }
    instantiateFromSpec() {
        this.dataConverter = data.converterFromSpec(this.spec.dataConverter);
        this.attentionLength = this.spec.attentionLength;
        this.chordEncoder = this.spec.chordEncoder ?
            chords.chordEncoderFromType(this.spec.chordEncoder) :
            undefined;
        this.auxInputs = this.spec.auxInputs ?
            this.spec.auxInputs.map(s => aux_inputs.auxiliaryInputFromSpec(s)) :
            undefined;
    }
    async initialize() {
        this.dispose();
        const startTime = performance.now();
        if (!this.spec) {
            await fetch(`${this.checkpointURL}/config.json`)
                .then((response) => response.json())
                .then((spec) => {
                if (spec.type !== 'MusicRNN') {
                    throw new Error(`Attempted to instantiate MusicRNN model with incorrect type:
                  ${spec.type}`);
                }
                this.spec = spec;
            });
        }
        this.instantiateFromSpec();
        const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
            .then((response) => response.json())
            .then((manifest) => tf.io.loadWeights(manifest, this.checkpointURL));
        const hasAttention = AttentionWrapper.isWrapped(vars);
        const rnnPrefix = hasAttention ? `rnn/${ATTENTION_PREFIX}` : 'rnn/';
        this.forgetBias = tf.scalar(1.0);
        this.lstmCells.length = 0;
        this.biasShapes.length = 0;
        let l = 0;
        while (true) {
            const cellPrefix = rnnPrefix + CELL_FORMAT.replace('%d', l.toString());
            if (!(`${cellPrefix}kernel` in vars)) {
                break;
            }
            this.lstmCells.push((data, c, h) => tf.basicLSTMCell(this.forgetBias, vars[`${cellPrefix}kernel`], vars[`${cellPrefix}bias`], data, c, h));
            this.biasShapes.push(vars[`${cellPrefix}bias`].shape[0]);
            ++l;
        }
        this.lstmFcW = vars['fully_connected/weights'];
        this.lstmFcB = vars['fully_connected/biases'];
        if (hasAttention) {
            this.attentionWrapper = new AttentionWrapper(this.lstmCells, this.attentionLength, this.biasShapes[0] / 4);
            this.attentionWrapper.initialize(vars);
        }
        this.rawVars = vars;
        this.initialized = true;
        logging.logWithDuration('Initialized model', startTime, 'MusicRNN');
    }
    dispose() {
        Object.keys(this.rawVars).forEach(name => this.rawVars[name].dispose());
        this.rawVars = {};
        if (this.forgetBias) {
            this.forgetBias.dispose();
            this.forgetBias = undefined;
        }
        this.initialized = false;
    }
    async continueSequence(sequence, steps, temperature, chordProgression) {
        const result = await this.continueSequenceImpl(sequence, steps, temperature, chordProgression, false);
        return result.sequence;
    }
    async continueSequenceAndReturnProbabilities(sequence, steps, temperature, chordProgression) {
        return this.continueSequenceImpl(sequence, steps, temperature, chordProgression, true);
    }
    async continueSequenceImpl(sequence, steps, temperature, chordProgression, returnProbs) {
        sequences.assertIsRelativeQuantizedSequence(sequence);
        if (this.chordEncoder && !chordProgression) {
            throw new Error('Chord progression expected but not provided.');
        }
        if (!this.chordEncoder && chordProgression) {
            throw new Error('Unexpected chord progression provided.');
        }
        if (!this.initialized) {
            await this.initialize();
        }
        const startTime = performance.now();
        const oh = tf.tidy(() => {
            const inputs = this.dataConverter.toTensor(sequence);
            const length = inputs.shape[0];
            const outputSize = inputs.shape[1];
            const controls = this.chordEncoder ?
                this.chordEncoder.encodeProgression(chordProgression, length + steps) :
                undefined;
            const auxInputs = this.auxInputs ?
                tf.concat(this.auxInputs.map(auxInput => auxInput.getTensors(length + steps)), 1) :
                undefined;
            const rnnResult = this.sampleRnn(inputs, steps, temperature, controls, auxInputs, returnProbs);
            const samples = rnnResult.samples;
            return {
                samples: tf.stack(samples).as2D(samples.length, outputSize),
                probs: rnnResult.probs
            };
        });
        const samplesAndProbs = await oh;
        const result = this.dataConverter.toNoteSequence(samplesAndProbs.samples, sequence.quantizationInfo.stepsPerQuarter);
        const probs = [];
        if (returnProbs) {
            for (let i = 0; i < samplesAndProbs.probs.length; i++) {
                probs.push(await samplesAndProbs.probs[i].data());
                samplesAndProbs.probs[i].dispose();
            }
        }
        oh.samples.dispose();
        result.then(() => logging.logWithDuration('Continuation completed', startTime, 'MusicRNN', 20));
        return { sequence: result, probs };
    }
    sampleRnn(inputs, steps, temperature, controls, auxInputs, returnProbs) {
        const length = inputs.shape[0];
        const outputSize = inputs.shape[1];
        let c = [];
        let h = [];
        for (let i = 0; i < this.biasShapes.length; i++) {
            c.push(tf.zeros([1, this.biasShapes[i] / 4]));
            h.push(tf.zeros([1, this.biasShapes[i] / 4]));
        }
        let attentionState = this.attentionWrapper ? this.attentionWrapper.initState() : null;
        let lastOutput;
        inputs = inputs.toFloat();
        const samples = [];
        const probs = [];
        const splitInputs = tf.split(inputs.toFloat(), length);
        const splitControls = controls ? tf.split(controls, controls.shape[0]) : undefined;
        const splitAuxInputs = auxInputs ? tf.split(auxInputs, auxInputs.shape[0]) : undefined;
        for (let i = 0; i < length + steps; i++) {
            let nextInput;
            if (i < length) {
                nextInput = splitInputs[i];
            }
            else {
                let logits = lastOutput.matMul(this.lstmFcW).add(this.lstmFcB).as1D();
                let sampledOutput;
                if (temperature) {
                    logits = logits.div(tf.scalar(temperature));
                    sampledOutput = tf.multinomial(logits, 1).as1D();
                }
                else {
                    sampledOutput = logits.argMax().as1D();
                }
                if (returnProbs) {
                    probs.push(tf.softmax(logits));
                }
                nextInput =
                    tf.oneHot(sampledOutput, outputSize).toFloat();
                samples.push(nextInput.as1D());
            }
            if (i === length + steps - 1) {
                break;
            }
            const tensors = [];
            if (splitControls) {
                tensors.push(splitControls[i + 1]);
            }
            tensors.push(nextInput);
            if (splitAuxInputs) {
                tensors.push(splitAuxInputs[i]);
            }
            nextInput = tf.concat(tensors, 1);
            if (this.attentionWrapper) {
                const wrapperOutput = this.attentionWrapper.call(nextInput, c, h, attentionState);
                c = wrapperOutput.c;
                h = wrapperOutput.h;
                attentionState = wrapperOutput.attentionState;
                lastOutput = wrapperOutput.output;
            }
            else {
                [c, h] = tf.multiRNNCell(this.lstmCells, nextInput, c, h);
                lastOutput = h[h.length - 1];
            }
        }
        return { samples, probs };
    }
}
//# sourceMappingURL=model.js.map