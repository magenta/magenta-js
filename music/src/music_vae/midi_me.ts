import * as tf from '@tensorflow/tfjs';

export {MidiMe};

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
      return tf.add(
          tf.mul(tf.sub(tf.onesLike(gates), gates), z), tf.mul(gates, dz));
    });
  }

  getClassName() {
    return 'SamplingLayer';
  }
}

class MidiMe {
  // tslint:disable-next-line:no-any
  public config: any;
  // tslint:disable-next-line:no-any
  private encoder: any;
  // tslint:disable-next-line:no-any
  private decoder: any;
  // tslint:disable-next-line:no-any
  private vae: any;
  public trainingDone = false;

  constructor() {
    this.config = {
      encoder_layers: [1024, 256, 64],
      decoder_layers: [64, 256, 1024],
      n_latents_x: 512,
      n_latents_z: 4,
      batch_size: 1,
      beta: 1,
      p_x_sigma: 1,
    };
  }

  async initialize() {
    this.encoder = this.getEncoder();
    this.decoder = this.getDecoder();
    debugger;
    const z = tf.input({shape: this.config['n_latents_x']});
    const qzSample = this.encoder.apply(z);
    const pxMu = this.decoder.apply(qzSample);

    this.vae = tf.model({inputs: z, outputs: [qzSample, pxMu], name: 'vae'});
    // this.vae = new tf.Sequential();
    // // const qzSample = this.encoder.apply(input);
    // // const pxMu = this.decoder.apply(qzSample);
    // this.vae.add(this.encoder);
    // this.vae.add(this.decoder);
  }

  vaeLoss(yTrue: tf.Tensor2D[], yPred: tf.Tensor2D[]): tf.Scalar {
    debugger
    const [qzSample, pxMu] = yPred;
    const reconLoss = this.reconstructionLoss(yTrue[0], pxMu) as tf.Scalar;
    const pz = tf.randomNormal(this.config['n_latents_z']);  // prior.
    const klLoss = this.klLoss(qzSample, pz) as tf.Scalar;

    const totalLoss =
        tf.add(reconLoss, tf.mul(klLoss, this.config['beta'])) as tf.Scalar;
    return totalLoss;
  }

  reconstructionLoss(yTrue: tf.Tensor, yPred: tf.Tensor) {
    return tf.tidy(() => {
      // -tf.sum(pX.log_prob(x));
      // = - mse(x,p_x_mu) / 2 'p_x_sigma ^2
      const nll = -tf.div(
          tf.losses.meanSquaredError(yTrue, yPred),
          tf.mul(2, tf.pow(this.config['p_x_sigma'], 2)));
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

  // async train(dataArr: number[]) {
  //   const data = tf.tensor(dataArr);
  //   this.trainingDone = false;
  //   const epochs = 2;
  //   const batchSize = 27;
  //   const testBatchSize = 10;
  //   const numBatch = 1;
  //   const lr = 3e-4;
  //   const optimizer = tf.train.adam(lr);

  //   for (let i = 0; i < epochs; i++) {
  //     console.log(`[Epoch ${i}]`);
  //     let epochLoss = 0;

  //     for (let j = 0; j < numBatch; j++) {
  //       const batchInput = data.nextTrainBatch(batchSize).xs.reshape(
  //           [batchSize, this.config['n_latents_z']]);

  //       const trainLoss = await optimizer.minimize(() => {
  //         const batchResult = this.runVAE(batchInput);
  //         const loss = this.vaeLoss(batchInput, batchResult);
  //         return loss;
  //       }, true);

  //       epochLoss += Number(trainLoss.dataSync());
  //       console.log('Batch training loss: ', trainLoss);
  //       await tf.nextFrame();
  //     }
  //     epochLoss = epochLoss / numBatch;
  //     console.log('Average training loss', epochLoss);

  //     const testBatchInput = data.nextTrainBatch(testBatchSize).xs.reshape([
  //       testBatchSize, this.config['n_latents_z']
  //     ]);
  //     const testBatchResult = this.runVAE(testBatchInput);
  //     const testLoss = this.vaeLoss(testBatchInput, testBatchResult);
  //     console.log('Test batch loss', testLoss.dataSync());
  //   }

  //   this.trainingDone = true;
  // }

  async train(data: number[]) {
    this.vae.compile({optimizer: 'adam', loss: this.vaeLoss});
    const t = tf.tensor(data).reshape([-1, this.config['n_latents_x']]);
    debugger;
    this.vae.fit(t, [t, t], {batchSize: 1, epochs: 1});
  }

  getEncoder() {
    const z = tf.input({shape: this.config['n_latents_x']});
    debugger
    let x = z;

    for (let i = 0; i < this.config['encoder_layers'].length; i++) {
      x = tf.layers
              .dense(
                  {units: this.config['encoder_layers'][i], activation: 'relu'})
              .apply(x) as tf.SymbolicTensor;
    }
    debugger
    const mu = this.getAffineLayers(x, this.config['n_latents_z'], z, false) as
        tf.SymbolicTensor;

    const sigma =
        this.getAffineLayers(x, this.config['n_latents_z'], z, true) as
        tf.SymbolicTensor;

    const qz = new SamplingLayer().apply([sigma, mu]) as tf.SymbolicTensor;

    return tf.model({inputs: z, outputs: qz, name: 'encoder'});
  }

  getDecoder() {
    const z = tf.input({shape: this.config['n_latents_z']});
    let x = z;

    for (let i = 0; i < this.config['decoder_layers'].length; i++) {
      x = tf.layers
              .dense(
                  {units: this.config['decoder_layers'][i], activation: 'relu'})
              .apply(x) as tf.SymbolicTensor;
    }
    const mu = this.getAffineLayers(x, this.config['n_latents_x'], z, false) as
        tf.SymbolicTensor;

    return tf.model({inputs: z, outputs: mu, name: 'decoder'});
  }

  // runVAE(input: tf.Tensor2D) {
  //   return tf.tidy(() => {
  //     const qzSample = this.encoder.apply(input);
  //     const pxMu = this.decoder.apply(qzSample);
  //     tf.model({inputs: , outputs: mu, name: 'decoder'});
  //     return [qzSample, pxMu];
  //   });
  // }

  getAffineLayers(
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

function epsilon() {
  return 0.00001;
}

function klDivergence(yTrue: tf.Tensor, yPred: tf.Tensor): tf.Tensor {
  return tf.tidy(() => {
    const clippedTrue = tf.clipByValue(yTrue, epsilon(), 1);
    const clippedPred = tf.clipByValue(yPred, epsilon(), 1);
    return tf.sum(tf.mul(yTrue, tf.log(tf.div(clippedTrue, clippedPred))), -1);
  });
}
