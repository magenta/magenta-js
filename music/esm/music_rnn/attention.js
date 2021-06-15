import * as tf from '@tensorflow/tfjs';
export const ATTENTION_PREFIX = 'attention_cell_wrapper/';
export class AttentionWrapper {
    constructor(cells, attnLength, attnSize) {
        this.cells = cells;
        this.attnLength = attnLength;
        this.attnSize = attnSize;
    }
    static isWrapped(vars) {
        return `rnn/${ATTENTION_PREFIX}kernel` in vars;
    }
    initialize(vars) {
        const prefix = `rnn/${ATTENTION_PREFIX}`;
        this.attnInputMatrix = vars[`${prefix}kernel`];
        this.attnInputBias = vars[`${prefix}bias`];
        this.attnW = vars[`${prefix}attention/attn_w`];
        this.attnV = vars[`${prefix}attention/attn_v`];
        this.attnMatrix = vars[`${prefix}attention/kernel`];
        this.attnBias = vars[`${prefix}attention/bias`];
        this.attnOutputMatrix =
            vars[`${prefix}attention_output_projection/kernel`];
        this.attnOutputBias =
            vars[`${prefix}attention_output_projection/bias`];
    }
    initState() {
        const attention = tf.zeros([this.attnSize]);
        const attentionState = tf.zeros([1, this.attnSize * this.attnLength]);
        return { attention, attentionState };
    }
    call(input, c, h, state) {
        const nextAttnInput = tf.concat([input, state.attention.as2D(1, -1)], 1);
        const nextRnnInput = tf.add(tf.matMul(nextAttnInput, this.attnInputMatrix), this.attnInputBias.as2D(1, -1));
        [c, h] = tf.multiRNNCell(this.cells, nextRnnInput, c, h);
        const attnHidden = tf.reshape(state.attentionState, [-1, this.attnLength, 1, this.attnSize]);
        const attnHiddenFeatures = tf.conv2d(attnHidden, this.attnW, [1, 1], 'same');
        const attnQueryParts = [];
        for (let q = 0; q < c.length; q++) {
            attnQueryParts.push(c[q]);
            attnQueryParts.push(h[q]);
        }
        const attnQuery = tf.concat(attnQueryParts, 1);
        const attnY = tf.matMul(attnQuery, this.attnMatrix).reshape([
            -1, 1, 1, this.attnSize
        ]);
        const attnS = tf.sum(tf.mul(this.attnV, tf.tanh(tf.add(attnHiddenFeatures, attnY))), [2, 3]);
        const attnA = tf.softmax(attnS);
        const attnD = tf.sum(tf.mul(tf.reshape(attnA, [-1, this.attnLength, 1, 1]), attnHidden), [1, 2]);
        const newAttns = attnD.reshape([-1, this.attnSize]);
        const attnStates = state.attentionState.reshape([-1, this.attnLength, this.attnSize]);
        const newAttnStates = tf.slice(attnStates, [0, 1, 0], [attnStates.shape[0], attnStates.shape[1] - 1, attnStates.shape[2]]);
        const output = tf.add(tf.matMul(tf.concat([h[2], newAttns], 1), this.attnOutputMatrix), this.attnOutputBias);
        const attention = newAttns.flatten();
        const attentionState = tf.concat([newAttnStates, output.as3D(output.shape[0], 1, output.shape[1])], 1)
            .reshape([-1, this.attnLength * this.attnSize]);
        return { output, c, h, attentionState: { attention, attentionState } };
    }
}
//# sourceMappingURL=attention.js.map