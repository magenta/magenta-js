/**
 * Core implementation for RNN-based Magenta music models such as MelodyRNN,
 * ImprovRNN, DrumsRNN, and PerformanceRNN.
 *
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
 */

/**
 * Imports
 */
import * as tf from '@tensorflow/tfjs-core';

import * as aux_inputs from '../core/aux_inputs';
import * as chords from '../core/chords';
import * as data from '../core/data';
import * as sequences from '../core/sequences';
import {INoteSequence} from '../protobuf/index';

import {ATTENTION_PREFIX, AttentionWrapper} from './attention';

/**
 * @hidden
 */
const CELL_FORMAT = 'multi_rnn_cell/cell_%d/basic_lstm_cell/';

/**
 * Interface for JSON specification of a `MusicRNN` model.
 *
 * @property type The type of the model, `MusicRNN`.
 * @property dataConverter: A `DataConverterSpec` specifying the data converter
 * to use.
 * @property attentionLength: (Optional) Size of attention vector to use.
 * @property chordEncoder: (Optional) Type of chord encoder to use when
 * conditioning on chords.
 * @property auxInputs: (Optional) An array of `AuxiliaryInputSpec`s for any
 * auxiliary inputs.
 */
export interface MusicRNNSpec {
  type: 'MusicRNN';
  dataConverter: data.ConverterSpec;
  attentionLength?: number;
  chordEncoder?: chords.ChordEncoderType;
  auxInputs?: aux_inputs.AuxiliaryInputSpec[];
}

/**
 * Main MusicRNN model class.
 *
 * A MusicRNN is an LSTM-based language model for musical notes.
 */
export class MusicRNN {
  private checkpointURL: string;
  private spec: MusicRNNSpec;

  private dataConverter: data.DataConverter;
  private attentionLength?: number;
  private chordEncoder: chords.ChordEncoder;
  private auxInputs: aux_inputs.AuxiliaryInput[];

  private lstmCells: tf.LSTMCellFunc[];
  private lstmFcB: tf.Tensor1D;
  private lstmFcW: tf.Tensor2D;
  private forgetBias: tf.Scalar;
  private biasShapes: number[];
  private attentionWrapper?: AttentionWrapper;

  private rawVars: {[varName: string]: tf.Tensor};  // Store for disposal.

  private initialized: boolean;

  /**
   * `MusicRNN` constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   * @param spec (Optional) `MusicRNNSpec` object. If undefined, will be loaded
   * from a `config.json` file in the checkpoint directory.
   */
  constructor(checkpointURL: string, spec?: MusicRNNSpec) {
    this.checkpointURL = checkpointURL;
    this.spec = spec;
    this.initialized = false;
    this.rawVars = {};
    this.biasShapes = [];
    this.lstmCells = [];
  }

  /**
   * Returns true iff model is intialized.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Instantiates data converter, attention length, chord encoder, and auxiliary
   * inputs from the `MusicRNNSpec`.
   */
  private instantiateFromSpec() {
    this.dataConverter = data.converterFromSpec(this.spec.dataConverter);
    this.attentionLength = this.spec.attentionLength;
    this.chordEncoder = this.spec.chordEncoder ?
        chords.chordEncoderFromType(this.spec.chordEncoder) :
        undefined;
    this.auxInputs = this.spec.auxInputs ?
        this.spec.auxInputs.map(s => aux_inputs.auxiliaryInputFromSpec(s)) :
        undefined;
  }

  /**
   * Loads variables from the checkpoint and instantiates the `Encoder` and
   * `Decoder`.
   */
  async initialize() {
    this.dispose();

    if (!this.spec) {
      await fetch(`${this.checkpointURL}/config.json`)
          .then((response) => response.json())
          .then((spec) => {
            if (spec.type !== 'MusicRNN') {
              throw new Error(
                  `Attempted to instantiate MusicRNN model with incorrect type:
                  ${spec.type}`);
            }
            this.spec = spec;
          });
    }

    this.instantiateFromSpec();

    const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                     .then((response) => response.json())
                     .then(
                         (manifest: tf.io.WeightsManifestConfig) =>
                             tf.io.loadWeights(manifest, this.checkpointURL));

    const hasAttention = AttentionWrapper.isWrapped(vars);
    const rnnPrefix = hasAttention ? `rnn/${ATTENTION_PREFIX}` : 'rnn/';

    this.forgetBias = tf.scalar(1.0);

    this.lstmCells.length = 0;
    this.biasShapes.length = 0;
    let l = 0;
    while (true) {
      const cellPrefix = rnnPrefix + CELL_FORMAT.replace('%d', l.toString());
      if (!(`${cellPrefix}kernel` in vars)) {
        break;
      }
      this.lstmCells.push(
          (data: tf.Tensor2D, c: tf.Tensor2D, h: tf.Tensor2D) =>
              tf.basicLSTMCell(
                  this.forgetBias, vars[`${cellPrefix}kernel`] as tf.Tensor2D,
                  vars[`${cellPrefix}bias`] as tf.Tensor1D, data, c, h));
      this.biasShapes.push((vars[`${cellPrefix}bias`] as tf.Tensor2D).shape[0]);
      ++l;
    }

    this.lstmFcW = vars['fully_connected/weights'] as tf.Tensor2D;
    this.lstmFcB = vars['fully_connected/biases'] as tf.Tensor1D;

    if (hasAttention) {
      this.attentionWrapper = new AttentionWrapper(
          this.lstmCells, this.attentionLength, this.biasShapes[0] / 4);
      this.attentionWrapper.initialize(vars);
    }

    this.rawVars = vars;
    this.initialized = true;
    console.log('Initialized MusicRNN.');
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
   * Continues a provided quantized NoteSequence containing a melody.
   *
   * @param sequence The sequence to continue. Must be quantized.
   * @param steps How many steps to continue.
   * @param temperature (Optional) The softmax temperature to use when sampling
   * from the logits. Argmax is used if not provided.
   * @param chordProgression (Optional) Chord progression to use as
   * conditioning.
   */
  async continueSequence(
      sequence: INoteSequence, steps: number, temperature?: number,
      chordProgression?: string[]): Promise<INoteSequence> {
    const result = await this.continueSequenceImpl(
        sequence, steps, temperature, chordProgression, false);
    return result.sequence;
  }

  /**
   * Continues a provided quantized NoteSequence containing a melody,
   * and returns the computed probability distribution at each step.
   *
   * @param sequence The sequence to continue. Must be quantized.
   * @param steps How many steps to continue.
   * @param temperature (Optional) The softmax temperature to use when sampling
   * from the logits. Argmax is used if not provided.
   * @param chordProgression (Optional) Chord progression to use as
   * conditioning.
   */
  async continueSequenceAndReturnProbabilities(
      sequence: INoteSequence, steps: number, temperature?: number,
      chordProgression?: string[]):
      Promise<{sequence: Promise<INoteSequence>; probs: Float32Array[]}> {
    return this.continueSequenceImpl(
        sequence, steps, temperature, chordProgression, true);
  }

  private async continueSequenceImpl(
      sequence: INoteSequence, steps: number, temperature?: number,
      chordProgression?: string[], returnProbs?: boolean):
      Promise<{sequence: Promise<INoteSequence>; probs: Float32Array[]}> {
    sequences.assertIsRelativeQuantizedSequence(sequence);

    if (this.chordEncoder && !chordProgression) {
      throw new Error('Chord progression expected but not provided.');
    }
    if (!this.chordEncoder && chordProgression) {
      throw new Error('Unexpected chord progression provided.');
    }

    if (!this.initialized) {
      await this.initialize();
    }

    const oh = tf.tidy(() => {
      const inputs = this.dataConverter.toTensor(sequence);
      const length: number = inputs.shape[0];
      const outputSize: number = inputs.shape[1];
      const controls = this.chordEncoder ?
          this.chordEncoder.encodeProgression(
              chordProgression, length + steps) :
          undefined;
      const auxInputs = this.auxInputs ?
          tf.concat(
              this.auxInputs.map(
                  auxInput => auxInput.getTensors(length + steps)),
              1) :
          undefined;
      const rnnResult = this.sampleRnn(
          inputs, steps, temperature, controls, auxInputs, returnProbs);
      const samples = rnnResult.samples;
      return {
        samples: tf.stack(samples).as2D(samples.length, outputSize),
        probs: rnnResult.probs
      };
    });

    const samplesAndProbs = await oh;
    const result = this.dataConverter.toNoteSequence(
        samplesAndProbs.samples, sequence.quantizationInfo.stepsPerQuarter);

    // Convert the array of 2D tensors into an array of arrays.
    const probs: Float32Array[] = [];
    if (returnProbs) {
      for (let i = 0; i < samplesAndProbs.probs.length; i++) {
        probs.push(await samplesAndProbs.probs[i].data() as Float32Array);
        samplesAndProbs.probs[i].dispose();
      }
    }

    oh.samples.dispose();
    return {sequence: result, probs};
  }

  private sampleRnn(
      inputs: tf.Tensor2D, steps: number, temperature: number,
      controls?: tf.Tensor2D, auxInputs?: tf.Tensor2D, returnProbs?: boolean) {
    const length: number = inputs.shape[0];
    const outputSize: number = inputs.shape[1];

    let c: tf.Tensor2D[] = [];
    let h: tf.Tensor2D[] = [];
    for (let i = 0; i < this.biasShapes.length; i++) {
      c.push(tf.zeros([1, this.biasShapes[i] / 4]));
      h.push(tf.zeros([1, this.biasShapes[i] / 4]));
    }

    let attentionState =
        this.attentionWrapper ? this.attentionWrapper.initState() : null;
    let lastOutput: tf.Tensor2D;

    // Initialize with input.
    inputs = inputs.toFloat();
    const samples: tf.Tensor1D[] = [];
    const probs: tf.Tensor2D[] = [];
    const splitInputs = tf.split(inputs.toFloat(), length);
    const splitControls =
        controls ? tf.split(controls, controls.shape[0]) : undefined;
    const splitAuxInputs =
        auxInputs ? tf.split(auxInputs, auxInputs.shape[0]) : undefined;
    for (let i = 0; i < length + steps; i++) {
      let nextInput: tf.Tensor2D;
      if (i < length) {
        nextInput = splitInputs[i];
      } else {
        const logits =
            lastOutput.matMul(this.lstmFcW).add(this.lstmFcB) as tf.Tensor2D;

        let sampledOutput;
        if (returnProbs || temperature) {
          const theseProbs = temperature ?
              tf.softmax(logits.div(tf.scalar(temperature))) :
              tf.softmax(logits);
          probs.push(theseProbs as tf.Tensor2D);
          sampledOutput =
              tf.multinomial(theseProbs as tf.Tensor2D, 1, undefined, true)
                  .as1D();
        } else {
          sampledOutput = logits.argMax(1).as1D();
        }
        nextInput = tf.oneHot(sampledOutput, outputSize).toFloat();
        // Save samples as bool to reduce data sync time.
        samples.push(nextInput.as1D().toBool());
      }
      // No need to run an RNN step once we have all our samples.
      if (i === length + steps - 1) {
        break;
      }

      const tensors = [];
      if (splitControls) {
        tensors.push(splitControls[i + 1]);
      }
      tensors.push(nextInput);
      if (splitAuxInputs) {
        tensors.push(splitAuxInputs[i]);
      }
      nextInput = tf.concat(tensors, 1);

      if (this.attentionWrapper) {
        const wrapperOutput =
            this.attentionWrapper.call(nextInput, c, h, attentionState);
        c = wrapperOutput.c;
        h = wrapperOutput.h;
        attentionState = wrapperOutput.attentionState;
        lastOutput = wrapperOutput.output;
      } else {
        [c, h] = tf.multiRNNCell(this.lstmCells, nextInput, c, h);
        lastOutput = h[h.length - 1];
      }
    }
    return {samples, probs};
  }
}
