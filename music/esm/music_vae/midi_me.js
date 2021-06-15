import * as tf from '@tensorflow/tfjs';
import * as logging from '../core/logging';
import { performance } from '../core/compat/global';
export { MidiMe };
class SamplingLayer extends tf.layers.Layer {
    constructor() {
        super({});
    }
    computeOutputShape(inputShape) {
        return inputShape[0];
    }
    call(inputs) {
        return tf.tidy(() => {
            const [mu, sigma] = inputs;
            return tf.add(tf.mul(tf.randomNormal(sigma.shape), sigma), mu);
        });
    }
    getClassName() {
        return 'SamplingLayer';
    }
}
class MidiMe {
    constructor(config = {}) {
        this.trained = false;
        this.initialized = false;
        this.config = {
            encoder_layers: config.encoder_layers || [1024, 256, 64],
            decoder_layers: config.decoder_layers || [64, 256, 1024],
            input_size: config.input_size || 256,
            latent_size: config.latent_size || 4,
            beta: config.beta || 1,
            epochs: config.epochs || 10
        };
    }
    dispose() {
        if (!this.initialized) {
            return;
        }
        this.encoder.dispose();
        this.decoder.dispose();
        this.vae.dispose();
        this.initialized = false;
    }
    initialize() {
        this.dispose();
        const startTime = performance.now();
        const x = tf.input({ shape: [this.config['input_size']] });
        this.encoder = this.getEncoder(x);
        const [z, ,] = this.encoder.apply(x);
        this.decoder = this.getDecoder(z.shape.slice(1));
        const y = this.decoder.apply(z);
        this.vae = tf.model({ inputs: x, outputs: y, name: 'vae' });
        this.initialized = true;
        logging.logWithDuration('Initialized model', startTime, 'MidiMe');
    }
    async train(xTrain, callback) {
        const startTime = performance.now();
        this.trained = false;
        let learningRate = 0.001;
        if (tf.ENV.get('WEBGL_RENDER_FLOAT32_ENABLED') === false &&
            tf.ENV.get('WEBGL_DOWNLOAD_FLOAT_ENABLED') === false &&
            tf.ENV.get('WEBGL_VERSION') === 1) {
            learningRate = 0.00005;
        }
        const optimizer = tf.train.adam(learningRate);
        for (let e = 0; e < this.config.epochs; e++) {
            await tf.nextFrame();
            await optimizer.minimize(() => {
                return tf.tidy(() => {
                    const [, zMu, zSigma] = this.encoder.predict(xTrain);
                    const y = this.vae.predict(xTrain);
                    const loss = this.loss(zMu, zSigma, y, xTrain);
                    if (callback) {
                        callback(e, {
                            y,
                            total: loss.totalLoss.arraySync(),
                            losses: [loss.reconLoss.arraySync(), loss.latentLoss.arraySync()]
                        });
                    }
                    return loss.totalLoss;
                });
            });
            await tf.nextFrame();
        }
        logging.logWithDuration('Training finished', startTime, 'MidiMe');
        this.trained = true;
        optimizer.dispose();
    }
    async sample(numSamples = 1) {
        if (!this.initialized) {
            await this.initialize();
        }
        return tf.tidy(() => {
            const randZs = tf.randomNormal([numSamples, this.config['latent_size']]);
            return this.decoder.predict(randZs);
        });
    }
    async decode(z) {
        if (!this.initialized) {
            await this.initialize();
        }
        return this.decoder.predict(z);
    }
    async encode(z) {
        if (!this.initialized) {
            await this.initialize();
        }
        const [z_, ,] = this.encoder.predict(z);
        return z_;
    }
    predict(z) {
        return this.vae.predict(z);
    }
    getEncoder(input) {
        let x = input;
        for (let i = 0; i < this.config['encoder_layers'].length; i++) {
            x = tf.layers
                .dense({ units: this.config['encoder_layers'][i], activation: 'relu' })
                .apply(x);
        }
        const mu = this.getAffineLayers(x, this.config['latent_size'], input, false);
        const sigma = this.getAffineLayers(x, this.config['latent_size'], input, true);
        const z = new SamplingLayer().apply([mu, sigma]);
        return tf.model({ inputs: input, outputs: [z, mu, sigma], name: 'encoder' });
    }
    getDecoder(shape) {
        const z = tf.input({ shape });
        let x = z;
        for (let i = 0; i < this.config['decoder_layers'].length; i++) {
            x = tf.layers
                .dense({ units: this.config['decoder_layers'][i], activation: 'relu' })
                .apply(x);
        }
        const mu = this.getAffineLayers(x, this.config['input_size'], z, false);
        return tf.model({ inputs: z, outputs: mu, name: 'decoder' });
    }
    loss(zMu, zSigma, yPred, yTrue) {
        return tf.tidy(() => {
            const latentLoss = this.klLoss(zMu, zSigma);
            const reconLoss = this.reconstructionLoss(yTrue, yPred);
            const totalLoss = tf.add(reconLoss, tf.mul(latentLoss, this.config['beta']));
            return { latentLoss, reconLoss, totalLoss };
        });
    }
    reconstructionLoss(yTrue, yPred) {
        return tf.tidy(() => {
            const se = tf.pow(tf.sub(yTrue, yPred), 2);
            const nll = tf.div(se, tf.mul(2, tf.pow(tf.ones([1]), 2)));
            return tf.mean(tf.sum(nll, -1));
        });
    }
    klLoss(mu, sigma) {
        return tf.tidy(() => {
            const mu2 = tf.pow(mu, 2);
            const sigma2 = tf.pow(sigma, 2);
            const term1 = tf.add(1, tf.log(sigma2));
            const term2 = tf.add(mu2, sigma2);
            const term = tf.sub(term1, term2);
            const div = tf.div(tf.mean(tf.sum(term, -1)), 2);
            return tf.mul(-1, div);
        });
    }
    getAffineLayers(x, outputSize, z_, softplus) {
        const linear = tf.layers.dense({ units: outputSize });
        const output = linear.apply(x);
        if (softplus) {
            return tf.layers.activation({ activation: 'softplus' }).apply(output);
        }
        else {
            return output;
        }
    }
}
//# sourceMappingURL=midi_me.js.map