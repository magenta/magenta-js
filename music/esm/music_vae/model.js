import * as tf from '@tensorflow/tfjs';
import * as chords from '../core/chords';
import { fetch, performance } from '../core/compat/global';
import * as constants from '../core/constants';
import * as data from '../core/data';
import * as logging from '../core/logging';
class LayerVars {
    constructor(kernel, bias) {
        if (kernel === undefined) {
            throw Error('`kernel` is undefined.');
        }
        if (bias === undefined) {
            throw Error('`bias` is undefined.');
        }
        this.kernel = kernel;
        this.bias = bias;
    }
}
function dense(vars, inputs) {
    return inputs.matMul(vars.kernel).add(vars.bias);
}
class Encoder {
}
class BidirectionalLstm {
    constructor(lstmFwVars, lstmBwVars) {
        this.lstmFwVars = lstmFwVars;
        this.lstmBwVars = lstmBwVars;
    }
    process(sequence) {
        return tf.tidy(() => {
            const fwStates = this.singleDirection(sequence, true);
            const bwStates = this.singleDirection(sequence, false);
            return [fwStates, bwStates];
        });
    }
    singleDirection(inputs, fw) {
        const batchSize = inputs.shape[0];
        const length = inputs.shape[1];
        const lstmVars = fw ? this.lstmFwVars : this.lstmBwVars;
        let state = [
            tf.zeros([batchSize, lstmVars.bias.shape[0] / 4]),
            tf.zeros([batchSize, lstmVars.bias.shape[0] / 4])
        ];
        const forgetBias = tf.scalar(1.0);
        const lstm = (data, state) => tf.basicLSTMCell(forgetBias, lstmVars.kernel, lstmVars.bias, data, state[0], state[1]);
        const splitInputs = tf.split(inputs.toFloat(), length, 1);
        const outputStates = [];
        for (const data of (fw ? splitInputs : splitInputs.reverse())) {
            state = lstm(data.squeeze([1]), state);
            outputStates.push(state[1]);
        }
        return fw ? outputStates : outputStates.reverse();
    }
}
class BidirectionalLstmEncoder extends Encoder {
    constructor(lstmFwVars, lstmBwVars, muVars) {
        super();
        this.bidirectionalLstm = new BidirectionalLstm(lstmFwVars, lstmBwVars);
        this.muVars = muVars;
        this.zDims = muVars ? this.muVars.bias.shape[0] : null;
    }
    encode(sequence, segmentLengths) {
        if (segmentLengths) {
            throw new Error('Variable-length segments not supported in flat encoder');
        }
        return tf.tidy(() => {
            const [fwStates, bwStates] = this.bidirectionalLstm.process(sequence);
            const finalState = tf.concat([fwStates[fwStates.length - 1], bwStates[0]], 1);
            if (this.muVars) {
                return dense(this.muVars, finalState);
            }
            else {
                return finalState;
            }
        });
    }
}
class HierarchicalEncoder extends Encoder {
    constructor(baseEncoders, numSteps, muVars) {
        super();
        this.baseEncoders = baseEncoders;
        this.numSteps = numSteps;
        this.muVars = muVars;
        this.zDims = this.muVars.bias.shape[0];
    }
    encode(sequence, segmentLengths) {
        if (segmentLengths) {
            if (sequence.shape[0] !== 1) {
                throw new Error('When using variable-length segments, batch size must be 1.');
            }
            if (segmentLengths.length !== this.numSteps[0]) {
                throw new Error('Must provide length for all variable-length segments.');
            }
        }
        return tf.tidy(() => {
            let inputs = sequence;
            for (let level = 0; level < this.baseEncoders.length; ++level) {
                const levelSteps = this.numSteps[level];
                const splitInputs = tf.split(inputs, levelSteps, 1);
                const embeddings = [];
                for (let step = 0; step < levelSteps; ++step) {
                    embeddings.push(this.baseEncoders[level].encode((level === 0 && segmentLengths) ?
                        tf.slice3d(splitInputs[step], [0, 0, 0], [1, segmentLengths[step], -1]) :
                        splitInputs[step]));
                }
                inputs = tf.stack(embeddings, 1);
            }
            return dense(this.muVars, inputs.squeeze([1]));
        });
    }
}
function initLstmCells(z, lstmCellVars, zToInitStateVars) {
    const lstmCells = [];
    const c = [];
    const h = [];
    const initialStates = tf.split(dense(zToInitStateVars, z).tanh(), 2 * lstmCellVars.length, 1);
    for (let i = 0; i < lstmCellVars.length; ++i) {
        const lv = lstmCellVars[i];
        const forgetBias = tf.scalar(1.0);
        lstmCells.push((data, c, h) => tf.basicLSTMCell(forgetBias, lv.kernel, lv.bias, data, c, h));
        c.push(initialStates[i * 2]);
        h.push(initialStates[i * 2 + 1]);
    }
    return { 'cell': lstmCells, 'c': c, 'h': h };
}
class Decoder {
}
class BaseDecoder extends Decoder {
    constructor(lstmCellVars, zToInitStateVars, outputProjectVars, outputDims, controlLstmFwVars, controlLstmBwVars) {
        super();
        this.lstmCellVars = lstmCellVars;
        this.zToInitStateVars = zToInitStateVars;
        this.outputProjectVars = outputProjectVars;
        this.zDims = this.zToInitStateVars.kernel.shape[0];
        this.outputDims = outputDims || outputProjectVars.bias.shape[0];
        if (controlLstmFwVars && controlLstmBwVars) {
            this.controlBidirectionalLstm =
                new BidirectionalLstm(controlLstmFwVars, controlLstmBwVars);
        }
    }
    decode(z, length, initialInput, temperature, controls) {
        const batchSize = z.shape[0];
        return tf.tidy(() => {
            const lstmCell = initLstmCells(z, this.lstmCellVars, this.zToInitStateVars);
            let expandedControls = controls ? tf.expandDims(controls, 0) : undefined;
            const samples = [];
            let nextInput = initialInput ?
                initialInput :
                tf.zeros([batchSize, this.outputDims]);
            if (this.controlBidirectionalLstm) {
                const [fwStates, bwStates] = this.controlBidirectionalLstm.process(expandedControls);
                expandedControls =
                    tf.concat([tf.stack(fwStates, 1), tf.stack(bwStates, 1)], 2);
            }
            const splitControls = expandedControls ?
                tf.split(tf.tile(expandedControls, [batchSize, 1, 1]), controls.shape[0], 1) :
                undefined;
            for (let i = 0; i < length; ++i) {
                const toConcat = splitControls ?
                    [nextInput, z, tf.squeeze(splitControls[i], [1])] :
                    [nextInput, z];
                [lstmCell.c, lstmCell.h] = tf.multiRNNCell(lstmCell.cell, tf.concat(toConcat, 1), lstmCell.c, lstmCell.h);
                const lstmOutput = dense(this.outputProjectVars, lstmCell.h[lstmCell.h.length - 1]);
                nextInput = this.sample(lstmOutput, temperature);
                samples.push(nextInput);
            }
            return tf.stack(samples, 1);
        });
    }
}
class BooleanDecoder extends BaseDecoder {
    sample(lstmOutput, temperature) {
        const logits = lstmOutput;
        return (temperature ?
            tf.greaterEqual(tf.sigmoid(logits.div(tf.scalar(temperature))), tf.randomUniform(logits.shape)) :
            tf.greaterEqual(logits, 0))
            .toFloat();
    }
}
class CategoricalDecoder extends BaseDecoder {
    sample(lstmOutput, temperature) {
        const logits = lstmOutput;
        const timeLabels = (temperature ?
            tf.multinomial(logits.div(tf.scalar(temperature)), 1)
                .as1D() :
            logits.argMax(1).as1D());
        return tf.oneHot(timeLabels, this.outputDims).toFloat();
    }
}
class NadeDecoder extends BaseDecoder {
    constructor(lstmCellVars, zToInitStateVars, outputProjectVars, nade, controlLstmFwVars, controlLstmBwVars) {
        super(lstmCellVars, zToInitStateVars, outputProjectVars, nade.numDims, controlLstmFwVars, controlLstmBwVars);
        this.nade = nade;
    }
    sample(lstmOutput, temperature) {
        const [encBias, decBias] = tf.split(lstmOutput, [this.nade.numHidden, this.nade.numDims], 1);
        return this.nade.sample(encBias, decBias);
    }
}
class GrooveDecoder extends BaseDecoder {
    sample(lstmOutput, temperature) {
        let [hits, velocities, offsets] = tf.split(lstmOutput, 3, 1);
        velocities = tf.sigmoid(velocities);
        offsets = tf.tanh(offsets);
        if (temperature) {
            hits = tf.sigmoid(hits.div(tf.scalar(temperature)));
            const threshold = tf.randomUniform(hits.shape, 0, 1);
            hits = tf.greater(hits, threshold).toFloat();
        }
        else {
            hits = tf.greater(tf.sigmoid(hits), 0.5).toFloat();
        }
        return tf.concat([hits, velocities, offsets], 1);
    }
}
class SplitDecoder extends Decoder {
    constructor(coreDecoders) {
        super();
        this.coreDecoders = coreDecoders;
        this.numDecoders = this.coreDecoders.length;
        this.zDims = this.coreDecoders[0].zDims;
        this.outputDims =
            this.coreDecoders.reduce((dims, dec) => dims + dec.outputDims, 0);
    }
    decodeSeparately(z, length, initialInput, temperature, controls) {
        const samples = [];
        for (let i = 0; i < this.coreDecoders.length; ++i) {
            samples.push(this.coreDecoders[i].decode(z, length, initialInput[i], temperature, controls));
        }
        return samples;
    }
    decode(z, length, initialInput, temperature, controls) {
        return tf.tidy(() => {
            const samples = this.decodeSeparately(z, length, this.coreDecoders.map(_ => initialInput), temperature, controls);
            return tf.concat(samples, -1);
        });
    }
}
class ConductorDecoder extends Decoder {
    constructor(coreDecoders, lstmCellVars, zToInitStateVars, numSteps) {
        super();
        this.splitDecoder = new SplitDecoder(coreDecoders);
        this.lstmCellVars = lstmCellVars;
        this.zToInitStateVars = zToInitStateVars;
        this.numSteps = numSteps;
        this.zDims = this.zToInitStateVars.kernel.shape[0];
        this.outputDims = this.splitDecoder.outputDims;
    }
    decode(z, length, initialInput, temperature, controls) {
        const batchSize = z.shape[0];
        return tf.tidy(() => {
            const lstmCell = initLstmCells(z, this.lstmCellVars, this.zToInitStateVars);
            const samples = [];
            let initialInput = new Array(this.splitDecoder.numDecoders).fill(undefined);
            const dummyInput = tf.zeros([batchSize, 1]);
            const splitControls = controls ? tf.split(controls, this.numSteps) : undefined;
            for (let i = 0; i < this.numSteps; ++i) {
                [lstmCell.c, lstmCell.h] =
                    tf.multiRNNCell(lstmCell.cell, dummyInput, lstmCell.c, lstmCell.h);
                const currSamples = this.splitDecoder.decodeSeparately(lstmCell.h[lstmCell.h.length - 1], length / this.numSteps, initialInput, temperature, splitControls ? splitControls[i] : undefined);
                samples.push(tf.concat(currSamples, -1));
                initialInput = currSamples.map(s => s.slice([0, s.shape[1] - 1, 0], [batchSize, 1, s.shape[s.rank - 1]])
                    .squeeze([1])
                    .toFloat());
            }
            return tf.concat(samples, 1);
        });
    }
}
class Nade {
    constructor(encWeights, decWeightsT) {
        this.numDims = encWeights.shape[0];
        this.numHidden = encWeights.shape[2];
        this.encWeights = encWeights.as2D(this.numDims, this.numHidden);
        this.decWeightsT = decWeightsT.as2D(this.numDims, this.numHidden);
    }
    sample(encBias, decBias) {
        const batchSize = encBias.shape[0];
        return tf.tidy(() => {
            const samples = [];
            let a = encBias.clone();
            for (let i = 0; i < this.numDims; i++) {
                const h = tf.sigmoid(a);
                const encWeightsI = this.encWeights.slice([i, 0], [1, this.numHidden]).as1D();
                const decWeightsTI = this.decWeightsT.slice([i, 0], [1, this.numHidden]);
                const decBiasI = decBias.slice([0, i], [batchSize, 1]);
                const contfogitsI = decBiasI.add(tf.matMul(h, decWeightsTI, false, true));
                const condProbsI = contfogitsI.sigmoid();
                const samplesI = condProbsI.greaterEqual(tf.scalar(0.5)).toFloat().as1D();
                if (i < this.numDims - 1) {
                    a = a.add(tf.outerProduct(samplesI.toFloat(), encWeightsI));
                }
                samples.push(samplesI);
            }
            return tf.stack(samples, 1);
        });
    }
}
class MusicVAE {
    constructor(checkpointURL, spec) {
        this.initialized = false;
        this.checkpointURL = checkpointURL;
        this.spec = spec;
    }
    instantiateFromSpec() {
        this.dataConverter = data.converterFromSpec(this.spec.dataConverter);
        this.chordEncoder = this.spec.chordEncoder ?
            chords.chordEncoderFromType(this.spec.chordEncoder) :
            undefined;
    }
    dispose() {
        if (this.rawVars !== undefined) {
            Object.keys(this.rawVars).forEach(name => this.rawVars[name].dispose());
        }
        this.encoder = undefined;
        this.decoder = undefined;
        this.initialized = false;
    }
    getLstmLayers(cellFormat, vars) {
        const lstmLayers = [];
        let l = 0;
        while (true) {
            const cellPrefix = cellFormat.replace('%d', l.toString());
            if (!(cellPrefix + 'kernel' in vars)) {
                break;
            }
            lstmLayers.push(new LayerVars(vars[cellPrefix + 'kernel'], vars[cellPrefix + 'bias']));
            ++l;
        }
        return lstmLayers;
    }
    async initialize() {
        this.dispose();
        const startTime = performance.now();
        if (!this.spec) {
            await fetch(`${this.checkpointURL}/config.json`)
                .then((response) => response.json())
                .then((spec) => {
                if (spec.type !== 'MusicVAE') {
                    throw new Error(`Attempted to instantiate MusicVAE model with incorrect type:
                  ${spec.type}`);
                }
                this.spec = spec;
            });
        }
        this.instantiateFromSpec();
        const LSTM_CELL_FORMAT = 'cell_%d/lstm_cell/';
        const MUTLI_LSTM_CELL_FORMAT = `multi_rnn_cell/${LSTM_CELL_FORMAT}`;
        const CONDUCTOR_PREFIX = 'decoder/hierarchical_level_0/';
        const BIDI_LSTM_CELL = 'cell_%d/bidirectional_rnn/%s/multi_rnn_cell/cell_0/lstm_cell/';
        const ENCODER_FORMAT = `encoder/${BIDI_LSTM_CELL}`;
        const HIER_ENCODER_FORMAT = `encoder/hierarchical_level_%d/${BIDI_LSTM_CELL.replace('%d', '0')}`;
        const CONTROL_BIDI_LSTM_CELL = `control_preprocessing/${BIDI_LSTM_CELL}`;
        const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
            .then((response) => response.json())
            .then((manifest) => tf.io.loadWeights(manifest, this.checkpointURL));
        this.rawVars = vars;
        const encMu = new LayerVars(vars['encoder/mu/kernel'], vars['encoder/mu/bias']);
        if (this.dataConverter.numSegments) {
            const fwLayers = this.getLstmLayers(HIER_ENCODER_FORMAT.replace('%s', 'fw'), vars);
            const bwLayers = this.getLstmLayers(HIER_ENCODER_FORMAT.replace('%s', 'bw'), vars);
            if (fwLayers.length !== bwLayers.length || fwLayers.length !== 2) {
                throw Error('Only 2 hierarchical encoder levels are supported. ' +
                    `Got ${fwLayers.length} forward and ${bwLayers.length} ` +
                    'backward.');
            }
            const baseEncoders = [0, 1].map(l => new BidirectionalLstmEncoder(fwLayers[l], bwLayers[l]));
            this.encoder = new HierarchicalEncoder(baseEncoders, [this.dataConverter.numSegments, 1], encMu);
        }
        else {
            const fwLayers = this.getLstmLayers(ENCODER_FORMAT.replace('%s', 'fw'), vars);
            const bwLayers = this.getLstmLayers(ENCODER_FORMAT.replace('%s', 'bw'), vars);
            if (fwLayers.length !== bwLayers.length || fwLayers.length !== 1) {
                throw Error('Only single-layer bidirectional encoders are supported. ' +
                    `Got ${fwLayers.length} forward and ${bwLayers.length} ` +
                    'backward.');
            }
            this.encoder =
                new BidirectionalLstmEncoder(fwLayers[0], bwLayers[0], encMu);
        }
        const hasControlBidiLayers = `${CONTROL_BIDI_LSTM_CELL.replace('%s', 'fw')
            .replace('%d', '0')}kernel` in vars;
        const decVarPrefix = (this.dataConverter.numSegments) ? 'core_decoder/' : '';
        const decVarPrefixes = [];
        if (this.dataConverter.NUM_SPLITS) {
            for (let i = 0; i < this.dataConverter.NUM_SPLITS; ++i) {
                decVarPrefixes.push(`${decVarPrefix}core_decoder_${i}/decoder/`);
            }
        }
        else {
            decVarPrefixes.push(`${decVarPrefix}decoder/`);
        }
        let controlLstmFwLayers = [null];
        let controlLstmBwLayers = [null];
        if (hasControlBidiLayers) {
            controlLstmFwLayers =
                this.getLstmLayers(CONTROL_BIDI_LSTM_CELL.replace('%s', 'fw'), vars);
            controlLstmBwLayers =
                this.getLstmLayers(CONTROL_BIDI_LSTM_CELL.replace('%s', 'bw'), vars);
            if (controlLstmFwLayers.length !== controlLstmBwLayers.length ||
                controlLstmFwLayers.length !== 1) {
                throw Error('Only single-layer bidirectional control preprocessing is ' +
                    'supported. Got ' +
                    `${controlLstmFwLayers.length} forward and ${controlLstmBwLayers.length} backward.`);
            }
        }
        const baseDecoders = decVarPrefixes.map((varPrefix) => {
            const decLstmLayers = this.getLstmLayers(varPrefix + MUTLI_LSTM_CELL_FORMAT, vars);
            const decZtoInitState = new LayerVars(vars[`${varPrefix}z_to_initial_state/kernel`], vars[`${varPrefix}z_to_initial_state/bias`]);
            const decOutputProjection = new LayerVars(vars[`${varPrefix}output_projection/kernel`], vars[`${varPrefix}output_projection/bias`]);
            if (`${varPrefix}nade/w_enc` in vars) {
                return new NadeDecoder(decLstmLayers, decZtoInitState, decOutputProjection, new Nade(vars[`${varPrefix}nade/w_enc`], vars[`${varPrefix}nade/w_dec_t`]), controlLstmFwLayers[0], controlLstmBwLayers[0]);
            }
            else if (this.spec.dataConverter.type === 'GrooveConverter') {
                return new GrooveDecoder(decLstmLayers, decZtoInitState, decOutputProjection, undefined, controlLstmFwLayers[0], controlLstmBwLayers[0]);
            }
            else if (this.spec.useBooleanDecoder) {
                return new BooleanDecoder(decLstmLayers, decZtoInitState, decOutputProjection, undefined, controlLstmFwLayers[0], controlLstmBwLayers[0]);
            }
            else {
                return new CategoricalDecoder(decLstmLayers, decZtoInitState, decOutputProjection, undefined, controlLstmFwLayers[0], controlLstmBwLayers[0]);
            }
        });
        if (this.dataConverter.numSegments) {
            const condLstmLayers = this.getLstmLayers(CONDUCTOR_PREFIX + LSTM_CELL_FORMAT, vars);
            const condZtoInitState = new LayerVars(vars[`${CONDUCTOR_PREFIX}initial_state/kernel`], vars[`${CONDUCTOR_PREFIX}initial_state/bias`]);
            this.decoder = new ConductorDecoder(baseDecoders, condLstmLayers, condZtoInitState, this.dataConverter.numSegments);
        }
        else if (baseDecoders.length === 1) {
            this.decoder = baseDecoders[0];
        }
        else {
            this.decoder = new SplitDecoder(baseDecoders);
        }
        this.zDims = this.decoder.zDims;
        this.initialized = true;
        logging.logWithDuration('Initialized model', startTime, 'MusicVAE');
    }
    isInitialized() {
        return this.initialized;
    }
    checkControlArgs(controlArgs) {
        controlArgs = controlArgs || {};
        const extraControls = controlArgs.extraControls || {};
        if (this.chordEncoder && !controlArgs.chordProgression) {
            throw new Error('Chord progression expected but not provided.');
        }
        if (!this.chordEncoder && controlArgs.chordProgression) {
            throw new Error('Unexpected chord progression provided.');
        }
        if (this.chordEncoder && this.dataConverter.endTensor &&
            controlArgs.chordProgression.length > 1) {
            throw new Error('Multiple chords not supported when using variable-length segments.');
        }
        if (this.spec.conditionOnKey && controlArgs.key == null) {
            throw new Error('Key expected but not provided.');
        }
        if (!this.spec.conditionOnKey && controlArgs.key != null) {
            throw new Error('Unexpected key provided.');
        }
        if (this.spec.extraControls) {
            for (const controlSpec of this.spec.extraControls) {
                if (controlSpec.name in extraControls) {
                    if (extraControls[controlSpec.name].shape[1] !== controlSpec.depth) {
                        throw new Error(`Control signal ${controlSpec.name} has invalid depth: ${extraControls[controlSpec.name].shape[1]} != ${controlSpec.depth}`);
                    }
                }
                else {
                    throw new Error(`Missing control signal: ${controlSpec.name}`);
                }
            }
        }
        const controlNames = this.spec.extraControls ?
            new Set(this.spec.extraControls.map((controlSpec) => controlSpec.name)) :
            new Set();
        for (const name in extraControls) {
            if (!controlNames.has(name)) {
                logging.log(`Unspecified control signal provided: ${name}`, 'MusicVAE', 5);
            }
        }
    }
    controlArgsToTensor(controlArgs) {
        controlArgs = controlArgs || {};
        return tf.tidy(() => {
            const controls = [];
            if (controlArgs.chordProgression) {
                const encodedChords = this.encodeChordProgression(controlArgs.chordProgression);
                controls.push(encodedChords);
            }
            if (controlArgs.key != null) {
                const encodedKey = tf.oneHot(tf.fill([this.dataConverter.numSteps], controlArgs.key, 'int32'), 12);
                controls.push(encodedKey);
            }
            if (controlArgs.extraControls) {
                for (const controlSpec of this.spec.extraControls) {
                    controls.push(controlArgs.extraControls[controlSpec.name]);
                }
            }
            return controls.length ? tf.concat2d(controls, 1) : undefined;
        });
    }
    async interpolateTensors(inputTensors, numInterps, temperature, controlArgs) {
        if (!this.initialized) {
            await this.initialize();
        }
        const inputZs = await this.encodeTensors(inputTensors, controlArgs);
        const interpZs = tf.tidy(() => this.getInterpolatedZs(inputZs, numInterps));
        inputZs.dispose();
        const outputTensors = await this.decodeTensors(interpZs, temperature, controlArgs);
        interpZs.dispose();
        return outputTensors;
    }
    async interpolate(inputSequences, numInterps, temperature, controlArgs) {
        this.checkControlArgs(controlArgs);
        if (!this.initialized) {
            await this.initialize();
        }
        const startTime = 0;
        const inputZs = await this.encode(inputSequences, controlArgs);
        const interpZs = tf.tidy(() => this.getInterpolatedZs(inputZs, numInterps));
        inputZs.dispose();
        const outputSequences = this.decode(interpZs, temperature, controlArgs);
        interpZs.dispose();
        outputSequences.then(() => logging.logWithDuration('Interpolation completed', startTime, 'MusicVAE', 20));
        return outputSequences;
    }
    async getSegmentLengths(inputTensors) {
        if (inputTensors.shape[0] > 1) {
            throw new Error('Variable-length segments not supported for batch size > 1.');
        }
        const numSteps = this.dataConverter.numSteps;
        const numSegments = this.dataConverter.numSegments;
        const isEndTensor = tf.tidy(() => tf.min(tf.equal(inputTensors.squeeze([0]), this.dataConverter.endTensor.expandDims(0)), 1));
        const isEndArray = await isEndTensor.data();
        isEndTensor.dispose();
        const maxSegmentLength = numSteps / numSegments;
        const segmentLengths = [];
        let offset = 0;
        let fromIndex = isEndArray.indexOf(1);
        while (fromIndex !== -1) {
            segmentLengths.push(fromIndex - offset + 1);
            offset += maxSegmentLength;
            fromIndex = isEndArray.indexOf(1, offset);
        }
        if (segmentLengths.length !== numSegments) {
            throw new Error(`Incorrect number of segments: ${segmentLengths.length} != ${numSegments}`);
        }
        return segmentLengths;
    }
    encodeChordProgression(chordProgression) {
        const numSteps = this.dataConverter.numSteps;
        const numSegments = this.dataConverter.numSegments;
        const numChordSteps = this.dataConverter.SEGMENTED_BY_TRACK ?
            numSteps / numSegments :
            numSteps;
        const encodedChordProgression = this.dataConverter.SEGMENTED_BY_TRACK ?
            tf.concat2d([
                this.chordEncoder.encode(constants.NO_CHORD)
                    .expandDims(0),
                this.chordEncoder.encodeProgression(chordProgression, numChordSteps - 1)
            ], 0) :
            this.chordEncoder.encodeProgression(chordProgression, numChordSteps);
        return this.dataConverter.SEGMENTED_BY_TRACK ?
            tf.tile(encodedChordProgression, [numSegments, 1]) :
            encodedChordProgression;
    }
    async encodeTensors(inputTensors, controlArgs) {
        this.checkControlArgs(controlArgs);
        if (!this.initialized) {
            await this.initialize();
        }
        const segmentLengths = this.dataConverter.endTensor ?
            await this.getSegmentLengths(inputTensors) :
            undefined;
        return tf.tidy(() => {
            const controlTensor = this.controlArgsToTensor(controlArgs);
            const inputsAndControls = [inputTensors];
            if (controlTensor) {
                const tiles = tf.tile(tf.expandDims(controlTensor, 0), [inputTensors.shape[0], 1, 1]);
                inputsAndControls.push(tiles);
            }
            const inputTensorsWithControls = tf.concat3d(inputsAndControls, 2);
            return this.encoder.encode(inputTensorsWithControls, segmentLengths);
        });
    }
    async encode(inputSequences, controlArgs) {
        if (!this.initialized) {
            await this.initialize();
        }
        const startTime = performance.now();
        const inputTensors = tf.tidy(() => tf.stack(inputSequences.map(t => this.dataConverter.toTensor(t))));
        const z = await this.encodeTensors(inputTensors, controlArgs);
        inputTensors.dispose();
        logging.logWithDuration('Encoding completed', startTime, 'MusicVAE', 20);
        return z;
    }
    async decodeTensors(z, temperature, controlArgs) {
        this.checkControlArgs(controlArgs);
        if (!this.initialized) {
            await this.initialize();
        }
        return tf.tidy(() => {
            const controlTensor = this.controlArgsToTensor(controlArgs);
            return this.decoder.decode(z, this.dataConverter.numSteps, undefined, temperature, controlTensor);
        });
    }
    async decode(z, temperature, controlArgs, stepsPerQuarter = constants.DEFAULT_STEPS_PER_QUARTER, qpm = constants.DEFAULT_QUARTERS_PER_MINUTE) {
        if (!this.initialized) {
            await this.initialize();
        }
        const startTime = performance.now();
        const tensors = await this.decodeTensors(z, temperature, controlArgs);
        const ohSeqs = tf.tidy(() => {
            return tf.split(tensors, tensors.shape[0])
                .map(oh => oh.squeeze([0]));
        });
        const outputSequences = [];
        for (const oh of ohSeqs) {
            outputSequences.push(await this.dataConverter.toNoteSequence(oh, stepsPerQuarter, qpm));
            oh.dispose();
        }
        tensors.dispose();
        logging.logWithDuration('Decoding completed', startTime, 'MusicVAE', 20);
        return outputSequences;
    }
    getInterpolatedZs(z, numInterps) {
        if (typeof numInterps === 'number') {
            numInterps = [numInterps];
        }
        if (z.shape[0] !== 2 && z.shape[0] !== 4) {
            throw new Error('Invalid number of input sequences. Requires length 2, or 4');
        }
        if (numInterps.length !== 1 && numInterps.length !== 2) {
            throw new Error('Invalid number of dimensions. Requires length 1, or 2.');
        }
        const w = numInterps[0];
        const h = numInterps.length === 2 ? numInterps[1] : w;
        const interpolatedZs = tf.tidy(() => {
            const rangeX = tf.linspace(0.0, 1.0, w);
            const z0 = z.slice([0, 0], [1, z.shape[1]]).as1D();
            const z1 = z.slice([1, 0], [1, z.shape[1]]).as1D();
            if (z.shape[0] === 2) {
                const zDiff = z1.sub(z0);
                return tf.outerProduct(rangeX, zDiff).add(z0);
            }
            else if (z.shape[0] === 4) {
                const rangeY = tf.linspace(0.0, 1.0, h);
                const z2 = z.slice([2, 0], [1, z.shape[1]]).as1D();
                const z3 = z.slice([3, 0], [1, z.shape[1]]).as1D();
                const revRangeX = tf.scalar(1.0).sub(rangeX);
                const revRangeY = tf.scalar(1.0).sub(rangeY);
                let finalZs = z0.mul(tf.outerProduct(revRangeY, revRangeX).as3D(h, w, 1));
                finalZs = tf.addStrict(finalZs, z1.mul(tf.outerProduct(rangeY, revRangeX).as3D(h, w, 1)));
                finalZs = tf.addStrict(finalZs, z2.mul(tf.outerProduct(revRangeY, rangeX).as3D(h, w, 1)));
                finalZs = tf.addStrict(finalZs, z3.mul(tf.outerProduct(rangeY, rangeX).as3D(h, w, 1)));
                return finalZs.as2D(w * h, z.shape[1]);
            }
            else {
                throw new Error('Invalid number of note sequences. Requires length 2, or 4');
            }
        });
        return interpolatedZs;
    }
    async sampleTensors(numSamples, temperature = 0.5, controlArgs) {
        this.checkControlArgs(controlArgs);
        if (!this.initialized) {
            await this.initialize();
        }
        const randZs = tf.tidy(() => tf.randomNormal([numSamples, this.decoder.zDims]));
        const outputTensors = await this.decodeTensors(randZs, temperature, controlArgs);
        randZs.dispose();
        return outputTensors;
    }
    async sample(numSamples, temperature = 0.5, controlArgs, stepsPerQuarter = constants.DEFAULT_STEPS_PER_QUARTER, qpm = constants.DEFAULT_QUARTERS_PER_MINUTE) {
        this.checkControlArgs(controlArgs);
        if (!this.initialized) {
            await this.initialize();
        }
        const startTime = performance.now();
        const randZs = tf.tidy(() => tf.randomNormal([numSamples, this.decoder.zDims]));
        const outputSequences = this.decode(randZs, temperature, controlArgs, stepsPerQuarter, qpm);
        randZs.dispose();
        outputSequences.then(() => logging.logWithDuration('Sampling completed', startTime, 'MusicVAE', 20));
        return outputSequences;
    }
    async similarTensors(inputTensor, numSamples, similarity, temperature, controlArgs) {
        if (similarity < 0 || similarity > 1) {
            throw new Error('Similarity must be between 0 and 1.');
        }
        if (!this.initialized) {
            await this.initialize();
        }
        const inputTensors = tf.expandDims(inputTensor, 0);
        const inputZs = await this.encodeTensors(inputTensors, controlArgs);
        inputTensors.dispose();
        const similarZs = tf.tidy(() => {
            const randZs = tf.randomNormal([numSamples, this.decoder.zDims]);
            return tf.add(inputZs.mul(similarity), randZs.mul(1 - similarity));
        });
        inputZs.dispose();
        const outputTensors = await this.decodeTensors(similarZs, temperature, controlArgs);
        similarZs.dispose();
        return outputTensors;
    }
    async similar(inputSequence, numSamples, similarity, temperature, controlArgs) {
        this.checkControlArgs(controlArgs);
        if (similarity < 0 || similarity > 1) {
            throw new Error('Similarity must be between 0 and 1.');
        }
        if (!this.initialized) {
            await this.initialize();
        }
        const startTime = 0;
        const inputZs = await this.encode([inputSequence], controlArgs);
        const similarZs = tf.tidy(() => {
            const randZs = tf.randomNormal([numSamples, this.decoder.zDims]);
            return tf.add(inputZs.mul(similarity), randZs.mul(1 - similarity));
        });
        inputZs.dispose();
        const outputSequences = this.decode(similarZs, temperature, controlArgs);
        similarZs.dispose();
        outputSequences.then(() => logging.logWithDuration('Similar sequence generation completed', startTime, 'MusicVAE', 20));
        return outputSequences;
    }
}
export { LayerVars, Encoder, Decoder, Nade, MusicVAE, };
//# sourceMappingURL=model.js.map