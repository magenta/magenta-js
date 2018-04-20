import {tf} from '@magenta/core';

export const ATTENTION_PREFIX = 'attention_cell_wrapper/';

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

export class AttentionWrapper {
  attnInputMatrix: tf.Tensor2D;
  attnInputBias: tf.Tensor1D;
  attnW: tf.Tensor4D;
  attnV: tf.Tensor2D;
  attnMatrix: tf.Tensor2D;
  attnBias: tf.Tensor1D;
  attnOutputMatrix: tf.Tensor2D;
  attnOutputBias: tf.Tensor1D;

  static isWrapped(vars: {[varName: string]: tf.Tensor}) {
    return `rnn/${ATTENTION_PREFIX}kernel` in vars;
  }

  constructor(
      public cells: tf.LSTMCellFunc[], public attnLength: number,
      public attnSize: number) {}

  initialize(vars: {[varName: string]: tf.Tensor}) {
    const prefix = `rnn/${ATTENTION_PREFIX}`;
    this.attnInputMatrix = vars[`${prefix}kernel`] as tf.Tensor2D;
    this.attnInputBias = vars[`${prefix}bias`] as tf.Tensor1D;
    this.attnW = vars[`${prefix}attention/attn_w`] as tf.Tensor4D;
    this.attnV = vars[`${prefix}attention/attn_v`] as tf.Tensor2D;
    this.attnMatrix = vars[`${prefix}attention/kernel`] as tf.Tensor2D;
    this.attnBias = vars[`${prefix}attention/bias`] as tf.Tensor1D;
    this.attnOutputMatrix =
        vars[`${prefix}attention_output_projection/kernel`] as tf.Tensor2D;
    this.attnOutputBias =
        vars[`${prefix}attention_output_projection/bias`] as tf.Tensor1D;
  }

  initState(): AttentionState {
    const attention: tf.Tensor1D = tf.zeros([this.attnSize]);
    const attentionState: tf.Tensor2D =
        tf.zeros([1, this.attnSize * this.attnLength]);
    return {attention, attentionState};
  }

  call(
      input: tf.Tensor2D, c: tf.Tensor2D[], h: tf.Tensor2D[],
      state: AttentionState): AttentionWrapperOutput {
    const nextAttnInput = tf.concat([input, state.attention.as2D(1, -1)], 1);
    const nextRnnInput: tf.Tensor2D = tf.add(
        tf.matMul(nextAttnInput, this.attnInputMatrix),
        this.attnInputBias.as2D(1, -1));
    [c, h] = tf.multiRNNCell(this.cells, nextRnnInput, c, h);

    const attnHidden: tf.Tensor4D = tf.reshape(
        state.attentionState, [-1, this.attnLength, 1, this.attnSize]);
    const attnHiddenFeatures =
        tf.conv2d(attnHidden, this.attnW, [1, 1], 'same');
    const attnQueryParts = [];
    for (let q = 0; q < c.length; q++) {
      attnQueryParts.push(c[q]);
      attnQueryParts.push(h[q]);
    }
    const attnQuery = tf.concat(attnQueryParts, 1);
    const attnY = tf.matMul(attnQuery, this.attnMatrix).reshape([
      -1, 1, 1, this.attnSize
    ]);
    const attnS = tf.sum(
        tf.mul(this.attnV, tf.tanh(tf.add(attnHiddenFeatures, attnY))), [2, 3]);
    const attnA = tf.softmax(attnS);
    const attnD = tf.sum(
        tf.mul(tf.reshape(attnA, [-1, this.attnLength, 1, 1]), attnHidden),
        [1, 2]);
    const newAttns: tf.Tensor2D = attnD.reshape([-1, this.attnSize]);

    const attnStates =
        state.attentionState.reshape([-1, this.attnLength, this.attnSize]);
    const newAttnStates = tf.slice(
        attnStates, [0, 1, 0],
        [attnStates.shape[0], attnStates.shape[1] - 1, attnStates.shape[2]]);

    const output: tf.Tensor2D = tf.add(
        tf.matMul(tf.concat([h[2], newAttns], 1), this.attnOutputMatrix),
        this.attnOutputBias);

    const attention = newAttns.flatten();
    const attentionState: tf.Tensor2D =
        tf.concat(
              [newAttnStates, output.as3D(output.shape[0], 1, output.shape[1])],
              1)
            .reshape([-1, this.attnLength * this.attnSize]);

    return {output, c, h, attentionState: {attention, attentionState}};
  }
}
