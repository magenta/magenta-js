import * as tf from '@tensorflow/tfjs';
import * as logging from '../core/logging';
export {MidiMe};

/**
 * Class for transforming a single variable Gaussian distribution into a
 * multivariate one.
 */
class SamplingLayer extends tf.layers.Layer {
  constructor() {
    super({});
  }

  computeOutputShape(inputShape: tf.Shape[]) {
    return inputShape[0];
  }

  call(inputs: [tf.Tensor2D, tf.Tensor2D]) {
    return tf.tidy(() => {
      const [mu, sigma] = inputs;
      return tf.add(tf.mul(tf.randomNormal(sigma.shape), sigma), mu);
    });
  }
  getClassName() {
    return 'SamplingLayer';
  }
}

/**
 * Class for applying an affine transformation.
 */
class AffineLayer extends tf.layers.Layer {
  constructor() {
    super({});
  }

  computeOutputShape(inputShape: tf.Shape[]) {
    return inputShape[1];
  }

  call(inputs: [tf.Tensor2D, tf.Tensor2D, tf.Tensor2D]) {
    // output = (1 - gates) * z + gates * dz
    return tf.tidy(() => {
      const [gates, z, dz] = inputs;
      return tf.add(tf.mul(tf.sub(1, gates), z), tf.mul(gates, dz));
    });
  }

  getClassName() {
    return 'AffineLayer';
  }
}

/**
 * An interface for providing configurable properties to a Visualizer.
 * @param encoder_layers The shape of the layers in the Encoder network.
 * @param decoder_layers The shape of the layers in the Decoder network.
 * @param input_size The shape of the VAE input. Since the inputs to this
 * VAE are actually latent vectors from MusicVAE, then this number should be
 * equal to the number of latent variables used by MusicVAE (`zDims`).
 * @param output_size The size of the output.
 * @param beta Weight of the latent loss in the VAE loss.
 * @param batch_size The batch size used in training.
 * @param epochs Number of epochs to train for
 */
interface MidiMeConfig {
  encoder_layers?: number[];
  decoder_layers?: number[];
  input_size?: number;
  output_size?: number;
  beta?: number;
  // For training:
  batch_size?: number;
  epochs?: number;
}

/**
 * Main `MidiMe` model class.
 *
 * A `MidiMe` is a variational autoencoder made up of an `Encoder` and
 * `Decoder`, that encodes a latent vector generated by `MusicVAE`.
 */
class MidiMe {
  // Model configuration.
  public config: MidiMeConfig;
  // Main model and submodels.
  public vae: tf.Model;
  public encoder: tf.Model;
  public decoder: tf.Model;

  trained = false;
  initialized = false;

  /**
   * `MidiMe` constructor.
   *
   * @param config (optional) Model configuration.
   */
  constructor(config: MidiMeConfig = {}) {
    this.config = {
      encoder_layers: config.encoder_layers || [1024, 256, 64],
      decoder_layers: config.decoder_layers || [64, 256, 1024],
      input_size: config.input_size || 256,
      output_size: config.output_size || 4,
      beta: config.beta || 1,
      batch_size: config.batch_size || 32,
      epochs: config.epochs || 10,
    };
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    if (!this.initialized) {
      return;
    }
    if (this.encoder) {
      this.encoder.dispose();
    }
    this.encoder = undefined;
    if (this.decoder) {
      this.decoder.dispose();
    }
    this.decoder = undefined;
    if (this.vae) {
      this.vae.dispose();
    }
    this.vae = undefined;
    this.initialized = false;
  }

  /**
   * Instantiates the `Encoder`, `Decoder` and the main `VAE`.
   */
  initialize() {
    this.dispose();

    const startTime = performance.now();
    const z = tf.input({shape: [this.config['input_size']]});

    // Encoder model, goes from the original input, returns an output.
    this.encoder = this.getEncoder(z);
    const [sampleZ, , ] = this.encoder.apply(z) as tf.SymbolicTensor[];

    // Decoder model, goes from the output of the encoder, to the final output.
    this.decoder = this.getDecoder(sampleZ.shape.slice(1));
    const y = this.decoder.apply(sampleZ) as tf.SymbolicTensor;

    this.vae = tf.model({inputs: z, outputs: y, name: 'vae'});
    this.initialized = true;
    logging.logWithDuration('Initialized model', startTime, 'MidiMe');
  }

  /**
   * Trains the `VAE` on the provided data.
   * @param data A `Tensor` of shape
   * [`this.config['batch_size']`, this.config['output_size']].
   * @param callback A callback function to be called at the end of every
   * training epoch.
   *
   * @returns The final training error.
   */
  async train(xTrain: tf.Tensor, callback?: Function) {
    const startTime = performance.now();
    this.trained = false;

    // TODO(notwaldorf): need to batch this data.
    // const xTrain = data;
    const optimizer = tf.train.adam();

    for (let e = 0; e < this.config['epochs']; e++) {
      await tf.nextFrame();

      await optimizer.minimize(() => {
        return tf.tidy(() => {
          const [z, muZ, sigmaZ] = this.encoder.predict(xTrain) as tf.Tensor[];
          z.dispose();
          const y = this.vae.predict(xTrain) as tf.Tensor;
          const loss = this.loss(muZ, sigmaZ, y, xTrain);
          if (callback) {
            callback(e, {
              y,
              total: loss.totalLoss.get(),
              losses: [loss.reconLoss.get(), loss.latentLoss.get()]
            });
          }
          loss.reconLoss.dispose();
          loss.latentLoss.dispose();
          return loss.totalLoss;
        });
      });

      // Use tf.nextFrame to not block the browser.
      await tf.nextFrame();
    }

    logging.logWithDuration('Training finished', startTime, 'MidiMe');
    this.trained = true;
  }

  /**
   * Samples sequences from the model prior.
   *
   * @param numSamples The number of samples to return.
   *
   * @returns A thing
   */
  async sample(numSamples = 1) {
    if (!this.initialized) {
      await this.initialize();
    }
    return tf.tidy(() => {
      const randZs: tf.Tensor2D =
          tf.randomNormal([numSamples, this.config['output_size']]);
      return this.decoder.predict(randZs);
    });
  }

  private getEncoder(input: tf.SymbolicTensor) {
    let x = input;

    for (let i = 0; i < this.config['encoder_layers'].length; i++) {
      x = tf.layers
              .dense(
                  {units: this.config['encoder_layers'][i], activation: 'relu'})
              .apply(x) as tf.SymbolicTensor;
    }
    const mu =
        this.getAffineLayers(x, this.config['output_size'], input, false) as
        tf.SymbolicTensor;

    const sigma =
        this.getAffineLayers(x, this.config['output_size'], input, true) as
        tf.SymbolicTensor;

    const z = new SamplingLayer().apply([mu, sigma]) as tf.SymbolicTensor;

    return tf.model({inputs: input, outputs: [z, mu, sigma], name: 'encoder'});
  }

  private getDecoder(shape: tf.Shape) {
    const z = tf.input({shape});
    let x = z;

    for (let i = 0; i < this.config['decoder_layers'].length; i++) {
      x = tf.layers
              .dense(
                  {units: this.config['decoder_layers'][i], activation: 'relu'})
              .apply(x) as tf.SymbolicTensor;
    }
    const mu = this.getAffineLayers(x, this.config['input_size'], z, false) as
        tf.SymbolicTensor;
    return tf.model({inputs: z, outputs: mu, name: 'decoder'});
  }

  private loss(
      muZ: tf.Tensor, sigmaZ: tf.Tensor, yPred: tf.Tensor, yTrue: tf.Tensor):
      {latentLoss: tf.Scalar, reconLoss: tf.Scalar, totalLoss: tf.Scalar} {
    return tf.tidy(() => {
      // How closely the z matches a unit gaussian.
      const latentLoss = this.klLoss(muZ, sigmaZ);

      // How well we regenerated yTrue.
      const reconLoss = this.reconstructionLoss(yTrue, yPred);

      const totalLoss =
          tf.add(reconLoss, tf.mul(latentLoss, this.config['beta'])) as
          tf.Scalar;
      return {latentLoss, reconLoss, totalLoss};
    });
  }

  reconstructionLoss(yTrue: tf.Tensor, yPred: tf.Tensor): tf.Scalar {
    return tf.tidy(() => {
      // = mse(x,p_x_mu) / 2 'input_sigma ^2
      const se = tf.pow(tf.sub(yTrue, yPred), 2);
      const nll = tf.div(se, tf.mul(2, tf.pow(tf.ones([1]), 2)));
      return tf.mean(tf.sum(nll, -1));
    });
  }

  klLoss(mu: tf.Tensor, sigma: tf.Tensor): tf.Scalar {
    return tf.tidy(() => {
      // - { [(1 + s^2) - (mu^2 + s^2)] / 2}
      const mu2 = tf.pow(mu, 2);
      const sigma2 = tf.pow(sigma, 2);

      const term1 = tf.add(1, tf.log(sigma2));
      const term2 = tf.add(mu2, sigma2);
      const term = tf.sub(term1, term2);
      const div = tf.div(tf.mean(tf.sum(term, -1)), 2);
      return tf.mul(-1, div);
    });
  }

  private getAffineLayers(
      x: tf.SymbolicTensor, outputSize: number, z_: tf.SymbolicTensor,
      softplus: boolean, residual = false) {
    let output;
    if (residual) {
      const dzLayer = tf.layers.dense({units: outputSize});
      const gatesLayer =
          tf.layers.dense({units: outputSize, activation: 'sigmoid'});
      const zLayer = tf.layers.dense({units: outputSize});

      const dz = dzLayer.apply(x) as tf.SymbolicTensor;
      const gates = gatesLayer.apply(x) as tf.SymbolicTensor;
      const z = zLayer.apply(z_) as tf.SymbolicTensor;

      output = new AffineLayer().apply([gates, z, dz]) as tf.SymbolicTensor;
    } else {
      const linear = tf.layers.dense({units: outputSize});
      output = linear.apply(x);
    }

    if (softplus) {
      return tf.layers.activation({activation: 'softplus'}).apply(output);
    } else {
      return output;
    }
  }
}
