import * as tf from '@tensorflow/tfjs';
declare class PixelNorm extends tf.layers.Layer {
    epsilon: number;
    layerConfig: {};
    constructor(epsilon?: number, layerConfig?: {});
    computeOutputShape(inputShape: number[]): number[];
    call(inputs: tf.Tensor4D): tf.Tensor4D;
    getClassName(): string;
}
export declare function pixelNorm(epsilon?: number, layerConfig?: {}): PixelNorm;
declare class InitialPad extends tf.layers.Layer {
    kernelH: number;
    kernelW: number;
    layerConfig: {};
    constructor(kernelH?: number, kernelW?: number, layerConfig?: {});
    computeOutputShape(inputShape: number[]): number[];
    call(inputs: tf.Tensor4D): tf.Tensor4D;
    getClassName(): string;
}
export declare function initialPad(kernelH?: number, kernelW?: number, layerConfig?: {}): InitialPad;
declare class BoxUpscale extends tf.layers.Layer {
    scale: number;
    constructor(scale?: number);
    computeOutputShape(inputShape: number[]): number[];
    call(inputs: tf.Tensor4D): tf.Tensor4D;
    getClassName(): string;
}
export declare function boxUpscale(scale?: number): BoxUpscale;
export {};
