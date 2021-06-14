import * as tf from '@tensorflow/tfjs-core';
import { fetch, performance } from '../core/compat/global';
import * as logging from '../core/logging';
import * as sequences from '../core/sequences';
import { IS_IOS, NUM_PITCHES, pianorollToSequence, sequenceToPianoroll } from './coconet_utils';
const DEFAULT_SPEC = {
    useSoftmaxLoss: true,
    batchNormVarianceEpsilon: 1.0e-07,
    numInstruments: 4,
    numFilters: 128,
    numLayers: 33,
    numRegularConvLayers: 0,
    dilation: [
        [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
        [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
        [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
        [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
        [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32]
    ],
    layers: null,
    interleaveSplitEveryNLayers: 16,
    numPointwiseSplits: 4,
};
class ConvNet {
    constructor(spec, vars) {
        this.residualPeriod = 2;
        this.outputForResidual = null;
        this.residualCounter = -1;
        this.rawVars = null;
        this.spec = spec;
        this.rawVars = vars;
    }
    dispose() {
        if (this.rawVars !== null) {
            tf.dispose(this.rawVars);
        }
        if (this.outputForResidual) {
            this.outputForResidual.dispose();
        }
    }
    predictFromPianoroll(pianoroll, masks) {
        return tf.tidy(() => {
            let featuremaps = this.getConvnetInput(pianoroll, masks);
            const n = this.spec.layers.length;
            for (let i = 0; i < n; i++) {
                this.residualCounter += 1;
                this.residualSave(featuremaps);
                let numPointwiseSplits = null;
                if (this.spec.interleaveSplitEveryNLayers && i > 0 && i < n - 2 &&
                    i % (this.spec.interleaveSplitEveryNLayers + 1) === 0) {
                    numPointwiseSplits = this.spec.numPointwiseSplits;
                }
                featuremaps = this.applyConvolution(featuremaps, this.spec.layers[i], i, i >= this.spec.numRegularConvLayers, numPointwiseSplits);
                featuremaps = this.applyResidual(featuremaps, i === 0, i === n - 1, i);
                featuremaps = this.applyActivation(featuremaps, this.spec.layers[i], i);
                featuremaps = this.applyPooling(featuremaps, this.spec.layers[i], i);
            }
            return this.computePredictions(featuremaps);
        });
    }
    computePredictions(logits) {
        if (this.spec.useSoftmaxLoss) {
            return logits.transpose([0, 1, 3, 2]).softmax().transpose([0, 1, 3, 2]);
        }
        return logits.sigmoid();
    }
    residualReset() {
        this.outputForResidual = null;
        this.residualCounter = 0;
    }
    residualSave(x) {
        if (this.residualCounter % this.residualPeriod === 1) {
            this.outputForResidual = x;
        }
    }
    applyResidual(x, isFirst, isLast, i) {
        if (this.outputForResidual == null) {
            return x;
        }
        if (this.outputForResidual
            .shape[this.outputForResidual.shape.length - 1] !==
            x.shape[x.shape.length - 1]) {
            this.residualReset();
            return x;
        }
        if (this.residualCounter % this.residualPeriod === 0) {
            if (!isFirst && !isLast) {
                x = x.add(this.outputForResidual);
            }
        }
        return x;
    }
    getVar(name, layerNum) {
        const varname = `model/conv${layerNum}/${name}`;
        return this.rawVars[varname];
    }
    getSepConvVar(name, layerNum) {
        const varname = `model/conv${layerNum}/SeparableConv2d/${name}`;
        return this.rawVars[varname];
    }
    getPointwiseSplitVar(name, layerNum, splitNum) {
        const varname = `model/conv${layerNum}/split_${layerNum}_${splitNum}/${name}`;
        return this.rawVars[varname];
    }
    applyConvolution(x, layer, i, depthwise, numPointwiseSplits) {
        if (layer.filters == null) {
            return x;
        }
        const filterShape = layer.filters;
        const stride = layer.convStride || 1;
        const padding = layer.convPad ?
            layer.convPad.toLowerCase() :
            'same';
        let conv = null;
        if (depthwise) {
            const dWeights = this.getSepConvVar('depthwise_weights', i);
            if (!numPointwiseSplits) {
                const pWeights = this.getSepConvVar('pointwise_weights', i);
                const biases = this.getSepConvVar('biases', i);
                const sepConv = tf.separableConv2d(x, dWeights, pWeights, [stride, stride], padding, layer.dilation, 'NHWC');
                conv = sepConv.add(biases);
            }
            else {
                conv = tf.depthwiseConv2d(x, dWeights, [stride, stride], padding, 'NHWC', layer.dilation);
                const splits = tf.split(conv, numPointwiseSplits, conv.rank - 1);
                const pointwiseSplits = [];
                for (let splitIdx = 0; splitIdx < numPointwiseSplits; splitIdx++) {
                    const outputShape = filterShape[3] / numPointwiseSplits;
                    const weights = this.getPointwiseSplitVar('kernel', i, splitIdx);
                    const biases = this.getPointwiseSplitVar('bias', i, splitIdx);
                    const dot = tf.matMul(splits[splitIdx].reshape([-1, outputShape]), weights, false, false);
                    const bias = tf.add(dot, biases);
                    pointwiseSplits.push(bias.reshape([
                        splits[splitIdx].shape[0], splits[splitIdx].shape[1],
                        splits[splitIdx].shape[2], outputShape
                    ]));
                }
                conv = tf.concat(pointwiseSplits, conv.rank - 1);
            }
        }
        else {
            const weights = this.getVar('weights', i);
            const stride = layer.convStride || 1;
            const padding = layer.convPad ?
                layer.convPad.toLowerCase() :
                'same';
            conv = tf.conv2d(x, weights, [stride, stride], padding, 'NHWC', [1, 1]);
        }
        return this.applyBatchnorm(conv, i);
    }
    applyBatchnorm(x, i) {
        const gammas = this.getVar('gamma', i);
        const betas = this.getVar('beta', i);
        const mean = this.getVar('popmean', i);
        const variance = this.getVar('popvariance', i);
        if (IS_IOS) {
            const v = variance.arraySync()[0][0][0];
            const stdevs = tf.tensor(v.map((x) => Math.sqrt(x + this.spec.batchNormVarianceEpsilon)));
            return x.sub(mean).mul(gammas.div(stdevs)).add(betas);
        }
        return tf.batchNorm(x, tf.squeeze(mean), tf.squeeze(variance), tf.squeeze(betas), tf.squeeze(gammas), this.spec.batchNormVarianceEpsilon);
    }
    applyActivation(x, layer, i) {
        if (layer.activation === 'identity') {
            return x;
        }
        return x.relu();
    }
    applyPooling(x, layer, i) {
        if (layer.pooling == null) {
            return x;
        }
        const pooling = layer.pooling;
        const padding = layer.poolPad ?
            layer.poolPad.toLowerCase() :
            'same';
        return tf.maxPool(x, [pooling[0], pooling[1]], [pooling[0], pooling[1]], padding);
    }
    getConvnetInput(pianoroll, masks) {
        pianoroll = tf.scalar(1, 'float32').sub(masks).mul(pianoroll);
        masks = tf.scalar(1, 'float32').sub(masks);
        return pianoroll.concat(masks, 3);
    }
}
class Coconet {
    constructor(checkpointURL) {
        this.spec = null;
        this.initialized = false;
        this.checkpointURL = checkpointURL;
        this.spec = DEFAULT_SPEC;
    }
    async initialize() {
        this.dispose();
        const startTime = performance.now();
        this.instantiateFromSpec();
        const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
            .then((response) => response.json())
            .then((manifest) => tf.io.loadWeights(manifest, this.checkpointURL));
        this.convnet = new ConvNet(this.spec, vars);
        this.initialized = true;
        logging.logWithDuration('Initialized model', startTime, 'Coconet');
    }
    dispose() {
        if (this.convnet) {
            this.convnet.dispose();
        }
        this.initialized = false;
    }
    isInitialized() {
        return this.initialized;
    }
    instantiateFromSpec() {
        const nonFinalLayerFilterOuterSizes = 3;
        const finalTwoLayersFilterOuterSizes = 2;
        this.spec.layers = [];
        this.spec.layers.push({
            filters: [
                nonFinalLayerFilterOuterSizes, nonFinalLayerFilterOuterSizes,
                this.spec.numInstruments * 2, this.spec.numFilters
            ]
        });
        for (let i = 0; i < this.spec.numLayers - 3; i++) {
            this.spec.layers.push({
                filters: [
                    nonFinalLayerFilterOuterSizes, nonFinalLayerFilterOuterSizes,
                    this.spec.numFilters, this.spec.numFilters
                ],
                dilation: this.spec.dilation ? this.spec.dilation[i] : null
            });
        }
        this.spec.layers.push({
            filters: [
                finalTwoLayersFilterOuterSizes, finalTwoLayersFilterOuterSizes,
                this.spec.numFilters, this.spec.numFilters
            ]
        });
        this.spec.layers.push({
            filters: [
                finalTwoLayersFilterOuterSizes, finalTwoLayersFilterOuterSizes,
                this.spec.numFilters, this.spec.numInstruments
            ],
            activation: 'identity',
        });
    }
    async infill(sequence, config) {
        sequences.assertIsRelativeQuantizedSequence(sequence);
        if (sequence.notes.length === 0) {
            throw new Error(`NoteSequence ${sequence.id} does not have any notes to infill.`);
        }
        const numSteps = sequence.totalQuantizedSteps ||
            sequence.notes[sequence.notes.length - 1].quantizedEndStep;
        const pianoroll = sequenceToPianoroll(sequence, numSteps);
        let temperature = 0.99;
        let numIterations = 96;
        let outerMasks;
        if (config) {
            numIterations = config.numIterations || numIterations;
            temperature = config.temperature || temperature;
            outerMasks =
                this.getCompletionMaskFromInput(config.infillMask, pianoroll);
        }
        else {
            outerMasks = this.getCompletionMask(pianoroll);
        }
        const samples = await this.run(pianoroll, numIterations, temperature, outerMasks);
        const outputSequence = pianorollToSequence(samples, numSteps);
        pianoroll.dispose();
        samples.dispose();
        outerMasks.dispose();
        return outputSequence;
    }
    async run(pianorolls, numSteps, temperature, outerMasks) {
        return this.gibbs(pianorolls, numSteps, temperature, outerMasks);
    }
    getCompletionMaskFromInput(masks, pianorolls) {
        if (!masks) {
            return this.getCompletionMask(pianorolls);
        }
        else {
            const buffer = tf.buffer([pianorolls.shape[1], 4]);
            for (let i = 0; i < masks.length; i++) {
                buffer.set(1, masks[i].step, masks[i].voice);
            }
            return tf.tidy(() => {
                return buffer.toTensor()
                    .expandDims(1)
                    .tile([1, NUM_PITCHES, 1])
                    .expandDims(0);
            });
        }
    }
    getCompletionMask(pianorolls) {
        return tf.tidy(() => {
            const isEmpty = pianorolls.sum(2, true).equal(tf.scalar(0, 'float32'));
            return tf.cast(isEmpty, 'float32').add(tf.zerosLike(pianorolls));
        });
    }
    async gibbs(pianorolls, numSteps, temperature, outerMasks) {
        const numStepsTensor = tf.scalar(numSteps, 'float32');
        let pianoroll = pianorolls.clone();
        for (let s = 0; s < numSteps; s++) {
            const pm = this.yaoSchedule(s, numStepsTensor);
            const innerMasks = this.bernoulliMask(pianoroll.shape, pm, outerMasks);
            await tf.nextFrame();
            const predictions = tf.tidy(() => {
                return this.convnet.predictFromPianoroll(pianoroll, innerMasks);
            });
            await tf.nextFrame();
            pianoroll = tf.tidy(() => {
                const samples = this.samplePredictions(predictions, temperature);
                const updatedPianorolls = tf.where(tf.cast(innerMasks, 'bool'), samples, pianoroll);
                pianoroll.dispose();
                predictions.dispose();
                innerMasks.dispose();
                pm.dispose();
                return updatedPianorolls;
            });
            await tf.nextFrame();
        }
        numStepsTensor.dispose();
        return pianoroll;
    }
    yaoSchedule(i, n) {
        return tf.tidy(() => {
            const pmin = tf.scalar(0.1, 'float32');
            const pmax = tf.scalar(0.9, 'float32');
            const alpha = tf.scalar(0.7, 'float32');
            const wat = pmax.sub(pmin).mul(tf.scalar(i, 'float32')).div(n);
            const secondArg = pmax.sub(wat).div(alpha);
            return pmin.reshape([1]).concat(secondArg.reshape([1])).max();
        });
    }
    bernoulliMask(shape, pm, outerMasks) {
        return tf.tidy(() => {
            const [bb, tt, pp, ii] = shape;
            const probs = tf.tile(tf.randomUniform([bb, tt, 1, ii], 0, 1, 'float32'), [1, 1, pp, 1]);
            const masks = probs.less(pm);
            return tf.cast(masks, 'float32').mul(outerMasks);
        });
    }
    samplePredictions(predictions, temperature) {
        return tf.tidy(() => {
            predictions = tf.pow(predictions, tf.scalar(1 / temperature, 'float32'));
            const cmf = tf.cumsum(predictions, 2, false, false);
            const totalMasses = cmf.slice([0, 0, cmf.shape[2] - 1, 0], [cmf.shape[0], cmf.shape[1], 1, cmf.shape[3]]);
            const u = tf.randomUniform(totalMasses.shape, 0, 1, 'float32');
            const i = u.mul(totalMasses).less(cmf).argMax(2);
            return tf.oneHot(i.flatten(), predictions.shape[2], 1, 0)
                .reshape([
                predictions.shape[0], predictions.shape[1], predictions.shape[3],
                predictions.shape[2]
            ])
                .transpose([0, 1, 3, 2]);
        });
    }
}
export { Coconet };
//# sourceMappingURL=model.js.map