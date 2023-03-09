import * as tf from '@tensorflow/tfjs';
export interface BinaryCounterSpec {
    type: 'BinaryCounter';
    args: BinaryCounterArgs;
}
export declare type AuxiliaryInputSpec = BinaryCounterSpec;
export declare function auxiliaryInputFromSpec(spec: AuxiliaryInputSpec): AuxiliaryInput;
export declare abstract class AuxiliaryInput {
    readonly depth: number;
    abstract getTensors(numSteps: number): tf.Tensor2D;
    constructor(depth: number);
}
export declare type BinaryCounterArgs = {
    numBits: number;
};
export declare class BinaryCounter extends AuxiliaryInput {
    constructor(args: BinaryCounterArgs);
    getTensors(numSteps: number): tf.Tensor2D;
}
