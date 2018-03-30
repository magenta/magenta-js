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

const CELL_FORMAT = "rnn/multi_rnn_cell/cell_%d/basic_lstm_cell/";

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

    this.forgetBias = tf.scalar(1.0);

    this.lstmCells.length = 0;
    this.biasShapes.length = 0;
    let l = 0;
    while (true) {
      const cellPrefix = CELL_FORMAT.replace('%d', l.toString());
      if (!(cellPrefix + 'kernel' in vars)) {
          break;
      }
      // TODO(fjord): Support attention model.
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
            tf.multinomial(logits.div(tf.scalar(temperature)), 1).as1D():
            logits.argMax(1).as1D());
          nextInput = tf.oneHot(sampledOutput, outputSize).toFloat();
          // Save samples as bool to reduce data sync time.
          samples.push(nextInput.as1D().toBool());
        }
        [c, h] = tf.multiRNNCell(this.lstmCells, nextInput, c, h);
      }

      return tf.stack(samples).as2D(samples.length, outputSize);
    });

    const result = this.dataConverter.toNoteSequence(await oh);
    oh.dispose();
    return result;
  }
}
