/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as magenta from '@magenta/core';
import tf = magenta.tf;
import { isNullOrUndefined } from 'util';

const CELL_FORMAT = "multi_rnn_cell/cell_%d/basic_lstm_cell/";

/**
 * Main MusicRNN model class.
 *
 * A MusicRNN is an LSTM-based language model for musical notes.
 */
export class MusicRNN {
  checkpointURL: string;
  dataConverter: magenta.data.DataConverter;

  lstmCells: tf.LSTMCellFunc[];
  lstmFcB: tf.Tensor1D;
  lstmFcW: tf.Tensor2D;
  forgetBias: tf.Scalar;
  biasShapes: number[];

  attnInputMatrix?: tf.Tensor2D;
  attnInputBias?: tf.Tensor1D;
  attnW?:  tf.Tensor4D;
  attnV?: tf.Tensor2D;
  attnMatrix?: tf.Tensor2D;
  attnBias?: tf.Tensor1D;
  attnOutputMatrix?: tf.Tensor2D;
  attnOutputBias?: tf.Tensor1D;

  rawVars: {[varName: string]: tf.Tensor};  // Store for disposal.

  initialized: boolean;

  /**
   * `MusicRNN` constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   * @param dataConverter A `DataConverter` object to use for converting between
   * `NoteSequence` and `Tensor` objects. If not provided, a `converter.json`
   * file must exist within the checkpoint directory specifying the type and
   * args for the correct `DataConverter`.
   */
  constructor(checkpointURL:string, dataConverter?:magenta.data.DataConverter) {
    this.checkpointURL = checkpointURL;
    this.initialized = false;
    this.rawVars = {};
    this.biasShapes = [];
    this.lstmCells = [];
    this.dataConverter = dataConverter;
  }

  /**
   * Loads variables from the checkpoint and instantiates the `Encoder` and
   * `Decoder`.
   */
  async initialize() {
    this.dispose();

    if (isNullOrUndefined(this.dataConverter)) {
      fetch(this.checkpointURL + '/converter.json')
        .then((response) => response.json())
        .then((converterSpec: magenta.data.ConverterSpec) => {
          this.dataConverter = magenta.data.converterFromSpec(converterSpec);
        });
    }

    const reader = new magenta.CheckpointLoader(this.checkpointURL);
    const vars = await reader.getAllVariables();
    const hasAttention = 'rnn/attention_cell_wrapper/kernel' in vars;
    const rnnPrefix = hasAttention ? 'rnn/attention_cell_wrapper/' : 'rnn/';

    this.forgetBias = tf.scalar(1.0);

    this.lstmCells.length = 0;
    this.biasShapes.length = 0;
    let l = 0;
    while (true) {
      const cellPrefix = rnnPrefix + CELL_FORMAT.replace('%d', l.toString());
      if (!(cellPrefix + 'kernel' in vars)) {
          break;
      }
      this.lstmCells.push(
        (data: tf.Tensor2D, c: tf.Tensor2D, h: tf.Tensor2D) =>
            tf.basicLSTMCell(this.forgetBias,
              vars[cellPrefix + 'kernel'] as tf.Tensor2D,
              vars[cellPrefix + 'bias'] as tf.Tensor1D, data, c, h));
      this.biasShapes.push((vars[cellPrefix + 'bias'] as tf.Tensor2D).shape[0]);
      ++l;
    }

    this.lstmFcW = vars['fully_connected/weights'] as tf.Tensor2D;
    this.lstmFcB = vars['fully_connected/biases'] as tf.Tensor1D;

    if (hasAttention) {
      this.attnInputMatrix = vars[rnnPrefix + 'kernel'] as tf.Tensor2D;
      this.attnInputBias = vars[rnnPrefix + 'bias'] as tf.Tensor1D;
      this.attnW = vars[rnnPrefix + 'attention/attn_w'] as tf.Tensor4D;
      this.attnV = vars[rnnPrefix + 'attention/attn_v'] as tf.Tensor2D;
      this.attnMatrix = vars[rnnPrefix + 'attention/kernel'] as tf.Tensor2D;
      this.attnBias = vars[rnnPrefix + 'attention/bias'] as tf.Tensor1D;
      this.attnOutputMatrix =
        vars[rnnPrefix + 'attention_output_projection/kernel'] as tf.Tensor2D;
      this.attnOutputBias =
        vars[rnnPrefix + 'attention_output_projection/bias'] as tf.Tensor1D;
    }

    this.rawVars = vars;
    this.initialized = true;
  }

  dispose() {
    Object.keys(this.rawVars).forEach(name => this.rawVars[name].dispose());
    this.rawVars = {};
    if (this.forgetBias) {
      this.forgetBias.dispose();
      this.forgetBias = undefined;
    }
    this.dataConverter= undefined;
    this.initialized = false;
  }

  /**
   * Continues a provided quantized NoteSequence containing a monophonic melody.
   *
   * @param sequence The sequence to continue. Must be quantized.
   * @param steps How many steps to continue.
   * @param temperature The softmax temperature to use when sampling from the
   *   logits. Argmax is used if not provided.
   */
  async continueSequence(sequence: magenta.INoteSequence, steps: number,
      temperature?: number): Promise<magenta.INoteSequence> {
    magenta.Sequences.assertIsQuantizedSequence(sequence);

    if(!this.initialized) {
      await this.initialize();
    }

    const oh = tf.tidy(() => {
      const inputs = this.dataConverter.toTensor(sequence);
      const outputSize:number = inputs.shape[1];
      const samples = this.attnMatrix ?
        this.sampleRnnWithAttention(inputs, steps, temperature) :
        this.sampleRnn(inputs, steps, temperature);
      return tf.stack(samples).as2D(samples.length, outputSize);
    });

    const result = this.dataConverter.toNoteSequence(await oh);
    oh.dispose();
    return result;
  }

  private sampleRnn(inputs: tf.Tensor2D, steps: number, temperature: number) {
    const length:number = inputs.shape[0];
    const outputSize:number = inputs.shape[1];

    let c: tf.Tensor2D[] = [];
    let h: tf.Tensor2D[] = [];
    for (let i = 0; i < this.biasShapes.length; i++) {
      c.push(tf.zeros([1, this.biasShapes[i] / 4]));
      h.push(tf.zeros([1, this.biasShapes[i] / 4]));
    }

    // Initialize with input.
    const samples: tf.Tensor1D[] = [];
    for (let i = 0; i < length + steps; i++) {
      let nextInput: tf.Tensor2D;
      if (i < length) {
        nextInput = inputs.slice([i, 0], [1, outputSize]).as2D(1, outputSize);
      } else {
        const logits = h[h.length - 1].matMul(this.lstmFcW).add(this.lstmFcB);
        const sampledOutput = (
          temperature ?
          tf.multinomial(tf.softmax(logits.div(tf.scalar(temperature))), 1)
            .as1D():
          logits.argMax(1).as1D());
        nextInput = tf.oneHot(sampledOutput, outputSize).toFloat();
        // Save samples as bool to reduce data sync time.
          samples.push(nextInput.as1D().toBool());
      }
      [c, h] = tf.multiRNNCell(this.lstmCells, nextInput, c, h);
    }
    return samples;
  }

  private sampleRnnWithAttention(inputs: tf.Tensor2D,
                                 steps: number,
                                 temperature: number) {
    const length:number = inputs.shape[0];
    const outputSize:number = inputs.shape[1];

    let c: tf.Tensor2D[] = [];
    let h: tf.Tensor2D[] = [];
    for (let i = 0; i < this.biasShapes.length; i++) {
      c.push(tf.zeros([1, this.biasShapes[i] / 4]));
      h.push(tf.zeros([1, this.biasShapes[i] / 4]));
    }
    const attnSize = this.biasShapes[0] / 4;
    const attnLength = 32;
    const numCounterBits = 6;

    let attention: tf.Tensor1D = tf.zeros([attnSize]);
    let attentionState: tf.Tensor2D = tf.zeros([1, attnSize * attnLength]);
    let lastOutput: tf.Tensor2D;

    // Initialize with input.
    const samples: tf.Tensor1D[] = [];
    for (let i = 0; i < length + steps; i++) {
      let nextInput: tf.Tensor2D;
      if (i < length) {
        nextInput = inputs.slice([i, 0], [1, outputSize]).as2D(1, outputSize);
      } else {
        const logits = lastOutput.matMul(this.lstmFcW).add(this.lstmFcB);
        const sampledOutput = (
          temperature ?
          tf.multinomial(logits.div(tf.scalar(temperature)), 1).as1D():
          logits.argMax(1).as1D());
        nextInput = tf.oneHot(sampledOutput, outputSize).toFloat();
        // Save samples as bool to reduce data sync time.
        samples.push(nextInput.as1D().toBool());
      }

      const binaryCounts = tf.buffer([1, numCounterBits]);
      for (let bit = 0; bit < numCounterBits; bit++) {
        const counterValue = Math.floor((i + 1) / 2 ** bit) % 2 ? 1.0 : -1.0;
        binaryCounts.set(counterValue, 0, bit);
      }
      nextInput = nextInput.concat(binaryCounts.toTensor(), 1) as tf.Tensor2D;

      const nextAttnInput = tf.concat([nextInput, attention.as2D(1, -1)], 1);
      const nextRnnInput: tf.Tensor2D = tf.add(
        tf.matMul(nextAttnInput, this.attnInputMatrix),
        this.attnInputBias.as2D(1, -1)
      );
      [c, h] = tf.multiRNNCell(this.lstmCells, nextRnnInput, c, h);

      const attnHidden: tf.Tensor4D = tf.reshape(
        attentionState,
        [-1, attnLength, 1, attnSize]
      );
      const attnHiddenFeatures = tf.conv2d(
        attnHidden,
        this.attnW,
        [1, 1],
        'same'
      );
      const attnQueryParts = [];
      for (let q = 0 ; q < c.length ; q++) {
        attnQueryParts.push(c[q]);
        attnQueryParts.push(h[q]);
      }
      const attnQuery = tf.concat(attnQueryParts, 1);
      const attnY = tf
        .matMul(attnQuery, this.attnMatrix)
        .reshape([-1, 1, 1, attnSize]);
      const attnS = tf.sum(
        tf.mul(this.attnV, tf.tanh(tf.add(attnHiddenFeatures, attnY))),
        [2, 3]
      );
      const attnA = tf.softmax(attnS);
      const attnD = tf.sum(
        tf.mul(tf.reshape(attnA, [-1, attnLength, 1, 1]), attnHidden),
        [1, 2]
      );
      const newAttns: tf.Tensor2D = attnD.reshape([-1, attnSize]);

      const attnStates = attentionState.reshape([
        -1,
        attnLength,
        attnSize
      ]);
      const newAttnStates = tf.slice(
        attnStates,
        [0, 1, 0],
        [attnStates.shape[0], attnStates.shape[1] - 1, attnStates.shape[2]]
      );

      lastOutput = tf.add(
        tf.matMul(tf.concat([h[2], newAttns], 1), this.attnOutputMatrix),
        this.attnOutputBias
      );

      attention = newAttns.flatten();
      attentionState = tf
        .concat(
          [
            newAttnStates,
            lastOutput.as3D(lastOutput.shape[0], 1, lastOutput.shape[1])
          ],
          1
        )
        .reshape([-1, attnLength * attnSize]);
    }
    return samples;
  }

}
