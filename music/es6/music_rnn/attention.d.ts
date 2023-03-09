import * as tf from '@tensorflow/tfjs';
export declare const ATTENTION_PREFIX = "attention_cell_wrapper/";
export interface AttentionState {
    attention: tf.Tensor1D;
    attentionState: tf.Tensor2D;
}
export interface AttentionWrapperOutput {
    output: tf.Tensor2D;
    c: tf.Tensor2D[];
    h: tf.Tensor2D[];
    attentionState: AttentionState;
}
export declare class AttentionWrapper {
    cells: tf.LSTMCellFunc[];
    attnLength: number;
    attnSize: number;
    attnInputMatrix: tf.Tensor2D;
    attnInputBias: tf.Tensor1D;
    attnW: tf.Tensor4D;
    attnV: tf.Tensor2D;
    attnMatrix: tf.Tensor2D;
    attnBias: tf.Tensor1D;
    attnOutputMatrix: tf.Tensor2D;
    attnOutputBias: tf.Tensor1D;
    static isWrapped(vars: {
        [varName: string]: tf.Tensor;
    }): boolean;
    constructor(cells: tf.LSTMCellFunc[], attnLength: number, attnSize: number);
    initialize(vars: {
        [varName: string]: tf.Tensor;
    }): void;
    initState(): AttentionState;
    call(input: tf.Tensor2D, c: tf.Tensor2D[], h: tf.Tensor2D[], state: AttentionState): AttentionWrapperOutput;
}
