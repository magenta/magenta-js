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

import * as dl from 'deeplearn';
import * as magenta from '@magenta/core';
import * as data from './data';

const CELL_FORMAT = "rnn/multi_rnn_cell/cell_%d/basic_lstm_cell/";

/**
 * Main MusicRNN model class.
 *
 * A MusicRNN is an LSTM-based language model for musical notes.
 */
export class MusicRNN {
  checkpointURL: string;
  dataConverter: data.DataConverter;

  lstmCells: dl.LSTMCellFunc[];
  lstmFcB: dl.Tensor1D;
  lstmFcW: dl.Tensor2D;
  forgetBias: dl.Scalar;
  biasShapes: number[];
  rawVars: {[varName: string]: dl.Tensor};  // Store for disposal.

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
  constructor(checkpointURL:string, dataConverter?:data.DataConverter) {
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

    if (!this.dataConverter) {
      fetch(this.checkpointURL + '/converter.json')
        .then((response) => response.json())
        .then((converterSpec: data.ConverterSpec) => {
          this.dataConverter = data.converterFromSpec(converterSpec);
        });
    }

    const reader = new dl.CheckpointLoader(this.checkpointURL);
    const vars = await reader.getAllVariables();

    this.forgetBias = dl.scalar(1.0);

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
        (data: dl.Tensor2D, c: dl.Tensor2D, h: dl.Tensor2D) =>
            dl.basicLSTMCell(this.forgetBias,
              vars[cellPrefix + 'kernel'] as dl.Tensor2D,
              vars[cellPrefix + 'bias'] as dl.Tensor1D, data, c, h));
      this.biasShapes.push((vars[cellPrefix + 'bias'] as dl.Tensor2D).shape[0]);
      ++l;
    }

    this.lstmFcW = vars['fully_connected/weights'] as dl.Tensor2D;
    this.lstmFcB = vars['fully_connected/biases'] as dl.Tensor1D;

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

    const oh = dl.tidy(() => {
      const inputs = this.dataConverter.toTensor(sequence);

      const length:number = inputs.shape[0];
      const outputSize:number = inputs.shape[1];

      let c: dl.Tensor2D[] = [];
      let h: dl.Tensor2D[] = [];
      for (let i = 0; i < this.biasShapes.length; i++) {
        c.push(dl.zeros([1, this.biasShapes[i] / 4]));
        h.push(dl.zeros([1, this.biasShapes[i] / 4]));
      }

      // Initialize with input.
      const samples: dl.Tensor1D[] = [];
      for (let i = 0; i < length + steps; i++) {
        let nextInput: dl.Tensor2D;
        if (i < length) {
          nextInput = inputs.slice([
            i, 0], [1, outputSize]).as2D(1, outputSize);
        } else {
          const logits = h[1].matMul(this.lstmFcW).add(this.lstmFcB);
          const sampledOutput = (
            temperature ?
            dl.multinomial(logits.div(dl.scalar(temperature)), 1).as1D():
            logits.argMax(1).as1D());
          nextInput = dl.oneHot(sampledOutput, outputSize).toFloat();
          // Save samples as bool to reduce data sync time.
          samples.push(nextInput.as1D().toBool());
        }
        const output = dl.multiRNNCell(this.lstmCells, nextInput, c, h);
        c = output[0];
        h = output[1];
      }

      return dl.stack(samples).as2D(samples.length, outputSize);
    });

    const result = this.dataConverter.toNoteSequence(await oh);
    oh.dispose();
    return result;
  }
}
