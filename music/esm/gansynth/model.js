import * as tf from '@tensorflow/tfjs';
import * as logging from '../core/logging';
import { fetch, performance } from '../core/compat/global';
import { specgramsToAudio } from './audio_utils';
import { boxUpscale, initialPad, pixelNorm } from './custom_layers';
class GANSynth {
    constructor(checkpointURL) {
        this.nn = tf.sequential();
        this.nLatents = 256;
        this.nPitches = 61;
        this.minMidiPitch = 24;
        this.maxMidiPitch = 84;
        this.midiPitches = this.maxMidiPitch - this.minMidiPitch + 1;
        this.checkpointURL = checkpointURL;
    }
    async initialize() {
        const startTime = performance.now();
        const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
            .then((response) => response.json())
            .then((manifest) => tf.io.loadWeights(manifest, this.checkpointURL));
        tf.tidy(() => {
            for (const v in vars) {
                if (v.includes('kernel')) {
                    const fanIn = vars[v].shape[0] * vars[v].shape[1] * vars[v].shape[2];
                    const tmp = vars[v];
                    vars[v] = tf.mul(tmp, tf.sqrt(2 / fanIn));
                    tmp.dispose();
                }
            }
            this.build(vars);
            this.initialized = true;
            logging.logWithDuration('Initialized model', startTime, 'GANSynth');
        });
        Object.keys(vars).map(name => vars[name].dispose());
    }
    dispose() {
        if (!this.initialized) {
            return;
        }
        this.nn.dispose();
        this.initialized = false;
    }
    isInitialized() {
        return this.initialized;
    }
    build(vars) {
        tf.tidy(() => {
            const convConfig = {
                filters: 256,
                kernelSize: [2, 16],
                strides: [1, 1],
                activation: 'linear',
                useBias: true,
                padding: 'valid',
                dilationRate: [1, 1],
                trainable: false
            };
            const inputShape = { inputShape: [1, 1, this.nLatents + this.nPitches] };
            this.nn.add(pixelNorm(1e-8, inputShape));
            this.nn.add(initialPad(2, 16));
            this.nn.add(tf.layers.conv2d(convConfig));
            this.nn.add(tf.layers.leakyReLU({ alpha: 0.2 }));
            this.nn.add(pixelNorm());
            convConfig.padding = 'same';
            convConfig.kernelSize = [3, 3];
            this.nn.add(tf.layers.conv2d(convConfig));
            this.nn.add(tf.layers.leakyReLU({ alpha: 0.2 }));
            this.nn.add(pixelNorm());
            const layerFilters = [256, 256, 256, 128, 64, 32];
            for (let i = 0; i < layerFilters.length; i++) {
                this.nn.add(boxUpscale(2));
                convConfig.filters = layerFilters[i];
                this.nn.add(tf.layers.conv2d(convConfig));
                this.nn.add(tf.layers.leakyReLU({ alpha: 0.2 }));
                this.nn.add(pixelNorm());
                this.nn.add(tf.layers.conv2d(convConfig));
                this.nn.add(tf.layers.leakyReLU({ alpha: 0.2 }));
                this.nn.add(pixelNorm());
            }
            convConfig.filters = 2;
            convConfig.kernelSize = [1, 1];
            convConfig.activation = 'tanh';
            this.nn.add(tf.layers.conv2d(convConfig));
            this.setWeights(vars);
        });
    }
    setWeights(vars) {
        function getVar(name) {
            const v = vars[name];
            if (v === undefined) {
                throw Error(`Variable not found: ${name}`);
            }
            return v;
        }
        const prefix = 'Generator/progressive_gan_generator/progressive_gan_block_';
        const weights = [
            getVar(`${prefix}1/conv0/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}1/conv0/bias/ExponentialMovingAverage`),
            getVar(`${prefix}1/conv1/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}1/conv1/bias/ExponentialMovingAverage`),
            getVar(`${prefix}2/conv0/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}2/conv0/bias/ExponentialMovingAverage`),
            getVar(`${prefix}2/conv1/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}2/conv1/bias/ExponentialMovingAverage`),
            getVar(`${prefix}3/conv0/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}3/conv0/bias/ExponentialMovingAverage`),
            getVar(`${prefix}3/conv1/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}3/conv1/bias/ExponentialMovingAverage`),
            getVar(`${prefix}4/conv0/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}4/conv0/bias/ExponentialMovingAverage`),
            getVar(`${prefix}4/conv1/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}4/conv1/bias/ExponentialMovingAverage`),
            getVar(`${prefix}5/conv0/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}5/conv0/bias/ExponentialMovingAverage`),
            getVar(`${prefix}5/conv1/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}5/conv1/bias/ExponentialMovingAverage`),
            getVar(`${prefix}6/conv0/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}6/conv0/bias/ExponentialMovingAverage`),
            getVar(`${prefix}6/conv1/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}6/conv1/bias/ExponentialMovingAverage`),
            getVar(`${prefix}7/conv0/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}7/conv0/bias/ExponentialMovingAverage`),
            getVar(`${prefix}7/conv1/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}7/conv1/bias/ExponentialMovingAverage`),
            getVar(`${prefix}7/to_rgb/conv2d/kernel/ExponentialMovingAverage`),
            getVar(`${prefix}7/to_rgb/bias/ExponentialMovingAverage`),
        ];
        this.nn.setWeights(weights);
    }
    predict(inputs, batchSize) {
        return this.nn.predict(inputs, { batchSize });
    }
    randomSample(pitch) {
        return tf.tidy(() => {
            const z = tf.randomNormal([1, this.nLatents], 0, 1, 'float32');
            const pitchIdx = tf.tensor1d([pitch - this.minMidiPitch], 'int32');
            const pitchOneHot = tf.oneHot(pitchIdx, this.midiPitches);
            const cond = tf.concat([z, pitchOneHot], 1).expandDims(1).expandDims(1);
            const specgrams = this.predict(cond, 1);
            return specgrams;
        });
    }
    specgramsToAudio(specgrams) {
        return specgramsToAudio(specgrams);
    }
}
export { GANSynth };
//# sourceMappingURL=model.js.map