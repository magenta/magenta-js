import * as tf from '@tensorflow/tfjs';
export { MidiMe };
interface MidiMeConfig {
    input_size?: number;
    latent_size?: number;
    encoder_layers?: number[];
    decoder_layers?: number[];
    beta?: number;
    epochs?: number;
}
declare class MidiMe {
    config: MidiMeConfig;
    private vae;
    private encoder;
    private decoder;
    trained: boolean;
    initialized: boolean;
    constructor(config?: MidiMeConfig);
    dispose(): void;
    initialize(): void;
    train(xTrain: tf.Tensor, callback?: Function): Promise<void>;
    sample(numSamples?: number): Promise<tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[]>;
    decode(z: tf.Tensor2D): Promise<tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[]>;
    encode(z: tf.Tensor2D): Promise<tf.Tensor<tf.Rank>>;
    predict(z: tf.Tensor): tf.Tensor2D;
    private getEncoder;
    private getDecoder;
    private loss;
    reconstructionLoss(yTrue: tf.Tensor, yPred: tf.Tensor): tf.Scalar;
    klLoss(mu: tf.Tensor, sigma: tf.Tensor): tf.Scalar;
    private getAffineLayers;
}
