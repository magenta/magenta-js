import * as tf from '@tensorflow/tfjs';
export declare function melToLinearMatrix(): tf.Tensor<tf.Rank>;
export declare function melToLinear(melLogPower: tf.Tensor3D): tf.Tensor<tf.Rank>;
export declare function ifreqToPhase(ifreq: tf.Tensor): tf.Tensor<tf.Rank>;
export interface InverseSpecParams {
    sampleRate: number;
    hopLength?: number;
    winLength?: number;
    nFft?: number;
    center?: boolean;
}
export declare function specgramsToAudio(specgrams: tf.Tensor4D): Promise<Float32Array>;
export declare function ifft(reIm: Float32Array): Float32Array;
export declare function istft(reIm: Float32Array[], params: InverseSpecParams): Float32Array;
