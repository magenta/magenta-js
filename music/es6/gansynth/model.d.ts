import * as tf from '@tensorflow/tfjs';
declare class GANSynth {
    private checkpointURL;
    private initialized;
    private readonly nn;
    readonly nLatents = 256;
    readonly nPitches = 61;
    readonly minMidiPitch = 24;
    readonly maxMidiPitch = 84;
    readonly midiPitches: number;
    constructor(checkpointURL: string);
    initialize(): Promise<void>;
    dispose(): void;
    isInitialized(): boolean;
    private build;
    private setWeights;
    predict(inputs: tf.Tensor4D, batchSize: number): tf.Tensor4D;
    randomSample(pitch: number): tf.Tensor4D;
    specgramsToAudio(specgrams: tf.Tensor4D): Promise<Float32Array>;
}
export { GANSynth };
