import * as tf from '@tensorflow/tfjs';
import * as logging from '../core/logging';
export {MidiMe};

// TODO(notwaldorf): This function exists in tfjs-layers, but hasn't been
// released yet. Use that version when it's available. See:
// https://github.com/tensorflow/tfjs-layers/blob/master/src/losses.ts#L269
function klDivergence(yTrue: tf.Tensor, yPred: tf.Tensor): tf.Tensor {
  const epsilon = 0.00001;
  return tf.tidy(() => {
    const clippedTrue = tf.clipByValue(yTrue, epsilon, 1);
    const clippedPred = tf.clipByValue(yPred, epsilon, 1);
    return tf.sum(tf.mul(yTrue, tf.log(tf.div(clippedTrue, clippedPred))), -1);
  });
}

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
      const [sigma, mu] = inputs;
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
 * @param input_sigma The standard deviation of the inputs. This shouldn't
 * change across samples, and is basically the standard deviation of the
 * MusicVAE latent variables.
 * @param batch_size The batch size used in training.
 * @param epochs Number of epochs to train for
 */
interface MidiMeConfig {
  encoder_layers?: number[];
  decoder_layers?: number[];
  input_size?: number;
  output_size?: number;
  beta?: number;
  input_sigma?: tf.Tensor;
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
      input_sigma: config.input_sigma || tf.ones([1]),
      batch_size: config.batch_size || 32,
      epochs: config.epochs || 10,
    };
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    this.encoder = undefined;
    this.decoder = undefined;
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
    const sampleZ = this.encoder.apply(z) as tf.SymbolicTensor;

    // Decoder model, goes from the output of the encoder, to the final output.
    this.decoder = this.getDecoder(sampleZ.shape.slice(1));
    const y = this.decoder.apply(sampleZ) as tf.SymbolicTensor;

    this.vae = tf.model({inputs: z, outputs: [sampleZ, y], name: 'vae'});
    // const lr = 3e-4;
    this.vae.compile({optimizer: 'adam', loss: this.vaeLoss.bind(this)});

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
  async train(data: tf.Tensor, callback: Function) {
    const startTime = performance.now();
    this.trained = false;
    const xTrain = data;

    // The model predicts [sampleZ, pxMu], but the yTrue values are ignored for
    // sampleZ, so fill them with zeroes of the right size.
    const yTrain =
        [tf.zeros([xTrain.shape[0], this.config['output_size']]), xTrain];
    const h = await this.vae.fit(xTrain, yTrain, {
      batchSize: this.config['batch_size'],
      epochs: this.config['epochs'],
      callbacks: {onEpochEnd: async (epoch, logs) => callback(epoch, logs)}
    });
    const finalLoss = h.history.loss[h.history.loss.length - 1];
    logging.logWithDuration(
        'Final training error ' + finalLoss, startTime, 'MidiMe');
    this.trained = true;
    return finalLoss;
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
    const randZs: tf.Tensor2D = tf.tidy(
        () => tf.randomNormal([numSamples, this.config['output_size']]));
    const output = this.decoder.predict(randZs);
    randZs.dispose();
    return output;
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

    const z = new SamplingLayer().apply([sigma, mu]) as tf.SymbolicTensor;

    return tf.model({inputs: input, outputs: z, name: 'encoder'});
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

  // This function is actually called for each of the outputs of the vae model,
  // so once for sampleZ, and once for pxMu. Then tfjs sums the two losses up
  // before it uses them.
  vaeLoss(yTrue: tf.Tensor2D, yPred: tf.Tensor2D): tf.Scalar {
    if (yTrue.shape[1] === this.config['output_size']) {  // 4
      // This is the sampleZ.
      // The latent loss represents how closely the z matches a unit gaussian.
      const pz = tf.randomNormal(yTrue.shape);  // unit gaussian.
      const latentLoss = this.klLoss(yTrue, pz) as tf.Scalar;
      return tf.mul(latentLoss, this.config['beta']);
    } else if (yTrue.shape[1] === this.config['input_size']) {  // 512
      // This is the pxMu.
      // THe reconstruction loss represents how well we regenerated yTrue.
      const reconLoss =
          this.reconstructionLoss(yTrue, yPred, this.config['input_sigma']) as
          tf.Scalar;
      return reconLoss;
    } else {
      return tf.zeros([1]);
    }
  }

  reconstructionLoss(
      yTrue: tf.Tensor, yPred: tf.Tensor, inputSigma: tf.Tensor) {
    return tf.tidy(() => {
      // TODO: I removed the - here, verify that makes sense.

      // -tf.sum(pX.log_prob(x));
      // = - mse(x,p_x_mu) / 2 'input_sigma ^2
      const nll = tf.div(
          tf.losses.meanSquaredError(yTrue, yPred),
          tf.mul(2, tf.pow(inputSigma, 2)));

      return tf.mean(nll);  //
    });
  }

  klLoss(qz: tf.Tensor, pz: tf.Tensor) {
    return tf.tidy(() => {
      const klQP = klDivergence(qz, pz);
      const kl = tf.sum(klQP);
      return tf.mean(kl);
    });
  }

  private getAffineLayers(
      x: tf.SymbolicTensor, outputSize: number, z_: tf.SymbolicTensor,
      softplus: boolean, residual = false) {
    let output;
    if (residual) {
      console.log('doing residual');
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
