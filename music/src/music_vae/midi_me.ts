import * as tf from '@tensorflow/tfjs';
import * as logging from '../core/logging';
export {MidiMe};

function klDivergence(yTrue: tf.Tensor, yPred: tf.Tensor): tf.Tensor {
  const epsilon = 0.00001;
  return tf.tidy(() => {
    const clippedTrue = tf.clipByValue(yTrue, epsilon, 1);
    const clippedPred = tf.clipByValue(yPred, epsilon, 1);
    return tf.sum(tf.mul(yTrue, tf.log(tf.div(clippedTrue, clippedPred))), -1);
  });
}

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

class MidiMe {
  public config: MidiMeConfig;
  private encoder: tf.Model;
  private decoder: tf.Model;
  public vae: tf.Model;
  trained = false;
  initialized = false;

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

  async initialize() {
    this.initialized = false;
    const startTime = performance.now();

    const z = tf.input({shape: [this.config['input_size']]});

    // Encoder model, goes from the original input, returns an output.
    this.encoder = this.getEncoder(z);
    const sampleZ = this.encoder.apply(z) as tf.SymbolicTensor;

    // Decoder moel, goes from the output of the encoder, to the final output.
    this.decoder = this.getDecoder(sampleZ.shape.slice(1));
    const y = this.decoder.apply(sampleZ) as tf.SymbolicTensor;

    this.vae = tf.model({inputs: z, outputs: [sampleZ, y], name: 'vae'});
    this.vae.compile({optimizer: 'adam', loss: this.vaeLoss.bind(this)});

    this.initialized = true;
    logging.logWithDuration('Initialized model', startTime, 'MidiMe');
  }

  async train(data: tf.Tensor) {
    this.trained = false;
    const xTrain = data;

    // The model predicts [sampleZ, pxMu], but the yTrue values are ignored for
    // sampleZ, so fill them with zeroes of the right size.
    const yTrain =
        [tf.zeros([xTrain.shape[0], this.config['output_size']]), xTrain];
    const h = await this.vae.fit(xTrain, yTrain, {
      batchSize: this.config['batch_size'],
      epochs: this.config['epochs'],
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          console.log(epoch, logs.loss);
        }
      }
    });
    const finalLoss = h.history.loss[h.history.loss.length - 1];
    logging.log('Final training error ' + finalLoss, 'MidiMe');
    this.trained = true;
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
      softplus: boolean) {
    const dzLayer = tf.layers.dense({units: outputSize});
    const gatesLayer =
        tf.layers.dense({units: outputSize, activation: 'sigmoid'});
    const zLayer = tf.layers.dense({units: outputSize});

    const dz = dzLayer.apply(x) as tf.SymbolicTensor;
    const gates = gatesLayer.apply(x) as tf.SymbolicTensor;
    const z = zLayer.apply(z_) as tf.SymbolicTensor;

    const output = new AffineLayer().apply([gates, z, dz]) as tf.SymbolicTensor;
    if (softplus) {
      return tf.layers.activation({activation: 'softplus'}).apply(output);
    } else {
      return output;
    }
  }
}
