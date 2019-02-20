/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
import * as tf from '@tensorflow/tfjs-core';

import {logging, sequences} from '..';
import {INoteSequence, NoteSequence} from '../protobuf';

// tslint:disable-next-line:max-line-length
import {DURATION_STEPS, IS_IOS, pianorollToSequence, sequenceToPianoroll} from './coconet_utils';

interface LayerSpec {
  pooling?: number[];
  filters?: number[];
  activation?: string;
  dilation?: number[];
  activeNoteRGB?: string;
  minPitch?: number;
  maxPitch?: number;
  poolPad?: 'same'|'valid';
  convPad?: string;
  convStride?: number;
}

interface ModelSpec {
  useSoftmaxLoss: boolean;
  batchNormVarianceEpsilon: number;
  numInstruments: number;
  numFilters: number;
  numLayers: number;
  numRegularConvLayers: number;
  numSteps: number;
  dilation?: number[][];
  layers: LayerSpec[];
  interleaveSplitEveryNLayers?: number;
  numPointwiseSplits?: number;
}

const DEFAULT_SPEC: ModelSpec = {
  useSoftmaxLoss: true,
  batchNormVarianceEpsilon: 1.0e-07,
  numInstruments: 4,
  numFilters: 128,
  numLayers: 33,
  numRegularConvLayers: 0,
  numSteps: 96,
  dilation: [
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32]
  ],
  layers: null,
  interleaveSplitEveryNLayers: 16,
  numPointwiseSplits: 4,
};

class ConvNet {
  private residualPeriod = 2;
  private outputForResidual: tf.Tensor = null;
  private residualCounter = -1;
  private spec: ModelSpec;

  // Save for disposal.
  private rawVars: {[varName: string]: tf.Tensor} = null;

  constructor(spec: ModelSpec, vars: {[varName: string]: tf.Tensor}) {
    this.spec = spec;
    this.rawVars = vars;
  }

  dispose() {
    if (this.rawVars !== null) {
      Object.keys(this.rawVars).forEach(name => this.rawVars[name].dispose());
    }
  }

  public predictFromPianoroll(pianoroll: tf.Tensor4D, masks: tf.Tensor4D):
      tf.Tensor {
    return tf.tidy(() => {
      let featuremaps = this.getConvnetInput(pianoroll, masks);

      const n = this.spec.layers.length;
      for (let i = 0; i < n; i++) {
        this.residualCounter += 1;
        this.residualSave(featuremaps);
        let numPointwiseSplits = null;
        if (this.spec.interleaveSplitEveryNLayers && i > 0 && i < n - 2 &&
            i % (this.spec.interleaveSplitEveryNLayers + 1) === 0) {
          numPointwiseSplits = this.spec.numPointwiseSplits;
        }
        featuremaps = this.applyConvolution(
            featuremaps, this.spec.layers[i], i,
            i >= this.spec.numRegularConvLayers, numPointwiseSplits);
        featuremaps = this.applyResidual(featuremaps, i === 0, i === n - 1, i);
        featuremaps =
            this.applyActivation(featuremaps, this.spec.layers[i], i);
        featuremaps = this.applyPooling(featuremaps, this.spec.layers[i], i);
      }
      const predictions = this.computePredictions(featuremaps);
      return predictions;
    });
  }

  private computePredictions(logits: tf.Tensor): tf.Tensor {
    if (this.spec.useSoftmaxLoss) {
      return logits.transpose([0, 1, 3, 2]).softmax().transpose([0, 1, 3, 2]);
    }
    return logits.sigmoid();
  }

  private residualReset() {
    this.outputForResidual = null;
    this.residualCounter = 0;
  }

  private residualSave(x: tf.Tensor) {
    if (this.residualCounter % this.residualPeriod === 1) {
      this.outputForResidual = x;
    }
  }

  private applyResidual(
      x: tf.Tensor4D, isFirst: boolean, isLast: boolean,
      i: number): tf.Tensor4D {
    if (this.outputForResidual == null) {
      return x;
    }
    if (this.outputForResidual
            .shape[this.outputForResidual.shape.length - 1] !==
        x.shape[x.shape.length - 1]) {
      this.residualReset();
      return x;
    }
    if (this.residualCounter % this.residualPeriod === 0) {
      if (!isFirst && !isLast) {
        x = x.add(this.outputForResidual);
      }
    }
    return x;
  }

  private getVar(name: string, layerNum: number) : tf.Tensor4D {
    const varname = 'model/conv' + layerNum + '/' + name;
    return this.rawVars[varname] as tf.Tensor4D;
  }

  private getSepConvVar(name: string, layerNum: number): tf.Tensor4D {
    const varname = 'model/conv' + layerNum + '/SeparableConv2d/' + name;
    return this.rawVars[varname] as tf.Tensor4D;
  }

  private getPointwiseSplitVar(
      name: string, layerNum: number, splitNum: number) {
    const varname = 'model/conv' + layerNum + '/split_' + layerNum + '_' +
        splitNum + '/' + name;
    return this.rawVars[varname];
  }

  private applyConvolution(
      x: tf.Tensor4D, layer: LayerSpec, i: number, depthwise: boolean,
      numPointwiseSplits?: number): tf.Tensor4D {
    if (layer.filters == null) {
      return x;
    }
    const filterShape = layer.filters;
    const stride = layer.convStride || 1;
    const padding = layer.convPad ?
        layer.convPad.toLowerCase() as 'same' | 'valid' :
        'same';
    let conv = null;
    if (depthwise) {
      const dWeights = this.getSepConvVar('depthwise_weights', i);
      if (!numPointwiseSplits) {
        const pWeights = this.getSepConvVar('pointwise_weights', i);
        const biases = this.getSepConvVar('biases', i);
        const sepConv = tf.separableConv2d(
            x, dWeights, pWeights, [stride, stride], padding,
            (layer.dilation as [number, number]), 'NHWC');
        conv = sepConv.add(biases);
      } else {
        conv = tf.depthwiseConv2d(
            x, dWeights, [stride, stride], padding, 'NHWC',
            (layer.dilation as [number, number]));
        const splits = tf.split(conv, numPointwiseSplits, conv.rank - 1);
        const pointwiseSplits = [];
        for (let splitIdx = 0; splitIdx < numPointwiseSplits; splitIdx++) {
          const outputShape = filterShape[3] / numPointwiseSplits;
          const weights = this.getPointwiseSplitVar('kernel', i, splitIdx);
          const biases = this.getPointwiseSplitVar('bias', i, splitIdx);
          const dot = tf.matMul(
              splits[splitIdx].reshape([-1, outputShape]), weights, false,
              false);
          const bias = tf.add(dot, biases);
          pointwiseSplits.push(bias.reshape([
            splits[splitIdx].shape[0], splits[splitIdx].shape[1],
            splits[splitIdx].shape[2], outputShape
          ]));
        }
        conv = tf.concat(pointwiseSplits, conv.rank - 1);
      }
    } else {
      const weights = this.getVar('weights', i);
      const stride = layer.convStride || 1;
      const padding = layer.convPad ?
          layer.convPad.toLowerCase() as 'same' | 'valid' :
          'same';
      conv = tf.conv2d(x, weights, [stride, stride], padding, 'NHWC', [1, 1]);
    }
    return this.applyBatchnorm(conv, i) as tf.Tensor4D;
  }

  private applyBatchnorm(x: tf.Tensor4D, i: number): tf.Tensor {
    const gammas = this.getVar('gamma', i);
    const betas = this.getVar('beta', i);
    const mean = this.getVar('popmean', i);
    const variance = this.getVar('popvariance', i);
    if (IS_IOS) {
      // iOS WebGL floats are 16-bit, and the variance is outside this range.
      // This loads the variance to 32-bit floats in JS to compute batchnorm.
      const v = tf.sqrt(tf.add(variance, this.spec.batchNormVarianceEpsilon));
      return x.sub(mean).mul(gammas.div(v)).add(betas);
    }
    return tf.batchNormalization(
        x, tf.squeeze(mean), tf.squeeze(variance),
        this.spec.batchNormVarianceEpsilon, tf.squeeze(gammas),
        tf.squeeze(betas));
  }

  private applyActivation(x: tf.Tensor4D, layer: LayerSpec, i: number):
      tf.Tensor4D {
    if (layer.activation === 'identity') {
      return x;
    }
    return x.relu();
  }

  private applyPooling(x: tf.Tensor4D, layer: LayerSpec, i: number):
      tf.Tensor4D {
    if (layer.pooling == null) {
      return x;
    }
    const pooling = layer.pooling;
    const padding = layer.poolPad ?
        layer.poolPad.toLowerCase() as 'same' | 'valid' :
        'same';
    return tf.maxPool(
        x, [pooling[0], pooling[1]], [pooling[0], pooling[1]], padding);
  }

  private getConvnetInput(pianoroll: tf.Tensor4D, masks: tf.Tensor4D):
      tf.Tensor4D {
    pianoroll = tf.scalar(1, 'float32').sub(masks).mul(pianoroll);
    masks = tf.scalar(1, 'float32').sub(masks);
    return pianoroll.concat(masks, 3);
  }
}

/**
 * Coconet model implementation in TensorflowJS.
 * Thanks to [James Wexler](https://github.com/jameswex) for the original
 * implementation.
 */
class Coconet {
  private checkpointURL: string;
  private spec: ModelSpec = null;
  private convnet: ConvNet;
  private initialized = false;

  /**
   * `Coconet` constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   */
  constructor(checkpointURL: string) {
    this.checkpointURL = checkpointURL;
    this.spec = DEFAULT_SPEC;
  }

  /**
   * Loads variables from the checkpoint and instantiates the model.
   */
  async initialize() {
    this.dispose();

    const startTime = performance.now();
    this.instantiateFromSpec();
    const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                     .then((response) => response.json())
                     .then(
                         (manifest: tf.io.WeightsManifestConfig) =>
                             tf.io.loadWeights(manifest, this.checkpointURL));
    this.convnet = new ConvNet(this.spec, vars);
    this.initialized = true;
    logging.logWithDuration('Initialized model', startTime, 'Coconet');
  }

  dispose() {
    if (this.convnet) {
      this.convnet.dispose();
    }
    this.initialized = false;
  }

  isInitialized() {
    return this.initialized;
  }

  /**
   * Sets up layer configuration from params
   */
  instantiateFromSpec() {
    // Outermost dimensions' sizes of the non-final layers in the network.
    const nonFinalLayerFilterOuterSizes = 3;

    // Outermost dimensions' sizes of the last two layers in the network.
    const finalTwoLayersFilterOuterSizes = 2;

    this.spec.layers = [];
    // Set-up filter size of first convolutional layer.
    this.spec.layers.push({
      filters: [
        nonFinalLayerFilterOuterSizes, nonFinalLayerFilterOuterSizes,
        this.spec.numInstruments * 2, this.spec.numFilters
      ]
    });
    // Set-up filter sizes of middle convolutional layers.
    for (let i = 0; i < this.spec.numLayers - 3; i++) {
      this.spec.layers.push({
        filters: [
          nonFinalLayerFilterOuterSizes, nonFinalLayerFilterOuterSizes,
          this.spec.numFilters, this.spec.numFilters
        ],
        dilation: this.spec.dilation ? this.spec.dilation[i] : null
      });
    }
    // Set-up filter size of penultimate convolutional layer.
    this.spec.layers.push({
      filters: [
        finalTwoLayersFilterOuterSizes, finalTwoLayersFilterOuterSizes,
        this.spec.numFilters, this.spec.numFilters
      ]
    });
    // Set-up filter size and activation of final convolutional layer.
    this.spec.layers.push({
      filters: [
        finalTwoLayersFilterOuterSizes, finalTwoLayersFilterOuterSizes,
        this.spec.numFilters, this.spec.numInstruments
      ],
      activation: 'identity',
    });
  }

  /**
   * Use the model to generate a new sequence, conditioned on the input
   * sequence.
   * **Note**: regardless of the length of the notes in the original sequence,
   * all the notes in the generated sequence will be 1 step long. If you want
   * to clean up the sequence to consider consecutive notes for the same
   * pitch and instruments as "held", as well as restore the original
   * sequence, you can call `mergeHeldNotes()` on the result.
   *
   * @param sequence The sequence to continue. Must be quantized.
   */
  async infill(sequence: INoteSequence) {
    sequences.assertIsRelativeQuantizedSequence(sequence);

    // Convert the sequence to a pianoroll.
    const pianoroll = sequenceToPianoroll(sequence, DURATION_STEPS);

    // Run sampling on the pianoroll.
    const samples = await this.run(pianoroll, this.spec.numSteps);

    // Convert the resulting pianoroll to a noteSequence.

    // const outputPianoroll =
    //     flatArrayToPianoroll(Array.from(samples.dataSync()), DURATION_STEPS);
    const outputSequence = pianorollToSequence(samples, DURATION_STEPS);
    outputSequence.quantizationInfo = {stepsPerQuarter: 4};
    outputSequence.totalQuantizedSteps =
        outputSequence.notes[outputSequence.notes.length - 1].quantizedEndStep;

    pianoroll.dispose();
    samples.dispose();
    return outputSequence;
  }

  /**
   * Runs sampling on pianorolls.
   */
  private async run(pianorolls: tf.Tensor4D, numSteps: number):
      Promise<tf.Tensor4D> {
    const masks = this.getCompletionMask(pianorolls);
    const samples = await this.gibbs(pianorolls, masks, numSteps);
    return samples;
  }

  private getCompletionMask(pianorolls: tf.Tensor4D): tf.Tensor4D {
    const isEmpty = pianorolls.sum(2, true).equal(tf.scalar(0, 'float32'));
    // Explicit broadcasting.
    return tf.cast(isEmpty, 'float32').add(tf.zerosLike(pianorolls));
  }

  private async gibbs(
      pianorolls: tf.Tensor4D, outerMasks: tf.Tensor4D,
      numSteps: number): Promise<tf.Tensor4D> {
    let numStepsTensor: tf.Scalar = null;
    if (!numSteps) {
      numStepsTensor = this.numbersOfMaskedVariables(outerMasks).max();
      numSteps = numStepsTensor.dataSync()[0];
    } else {
      numStepsTensor = tf.scalar(numSteps, 'float32');
    }
    let pianoroll = pianorolls.clone();
    for (let s = 0; s < numSteps; s++) {
      const innerMasks = tf.tidy(() => {
        const pm = this.yaoSchedule(s, numStepsTensor);
        return this.bernoulliMask(pianoroll.shape, pm, outerMasks);
      });
      await tf.nextFrame();
      const predictions = tf.tidy(() => {
        return this.convnet.predictFromPianoroll(pianoroll, innerMasks);
      }) as tf.Tensor4D;
      await tf.nextFrame();
      pianoroll = tf.tidy(() => {
        const samples = this.samplePredictions(predictions) as tf.Tensor4D;
        const updatedPianorolls =
            tf.where(tf.cast(innerMasks, 'bool'), samples, pianoroll);
        pianoroll.dispose();
        return updatedPianorolls;
      });
      await tf.nextFrame();
    }

    return pianoroll;
  }

  /**
   * Replace a voice in a `NoteSequence` sequence with a different voice.
   * @param sequence The `NoteSequence` to be changed.
   * @param originalVoice The `NoteSequence` that will replace the notes in
   * `sequence` with the same instrument.
   * @return a new `NoteSequence` with sustained notes merged, and a voice
   * replaced.
   */
  public replaceVoice(sequence: INoteSequence, originalVoice: INoteSequence)
      : NoteSequence {
    const output = this.mergeHeldNotes(sequence);
    const newNotes = [];
    const voice = originalVoice.notes[0].instrument;
    let hasReplacedVoice = false;

    for (let i = 0; i < output.notes.length; i++) {
      if (output.notes[i].instrument === voice && !hasReplacedVoice) {
        hasReplacedVoice = true;
        for (let i = 0; i < originalVoice.notes.length; i++) {
          const note = new NoteSequence.Note();
          note.pitch = originalVoice.notes[i].pitch;
          note.velocity = originalVoice.notes[i].velocity;
          note.instrument = originalVoice.notes[i].instrument;
          note.program = originalVoice.notes[i].program;
          note.isDrum = originalVoice.notes[i].isDrum;
          note.quantizedStartStep = originalVoice.notes[i].quantizedStartStep;
          note.quantizedEndStep = originalVoice.notes[i].quantizedEndStep;
          newNotes.push(note);
        }
      } else if (output.notes[i].instrument !== voice) {
        newNotes.push(output.notes[i]);
      }
    }
    output.notes = newNotes;
    return output;
  }

  /**
   * Any consecutive notes of the same pitch are merged into a sustained note.
   * Does not merge notes that connect on a measure boundary. This process
   * also rearranges the order of the notes - notes are grouped by instrument,
   * then ordered by timestamp.
   *
   * @param sequence The `NoteSequence` to be merged.
   * @return a new `NoteSequence` with sustained notes merged.
   */
  public mergeHeldNotes(sequence: INoteSequence) {
    const output = sequences.clone(sequence);
    output.notes = [];

    // Sort the input notes.
    const newNotes = sequence.notes.sort((a, b) => {
      const voiceCompare = a.instrument - b.instrument;
      if (voiceCompare) {
        return voiceCompare;
      }
      return a.quantizedStartStep - b.quantizedStartStep;
    });

    // Start with the first note.
    const note = new NoteSequence.Note();
    note.pitch = newNotes[0].pitch;
    note.instrument = newNotes[0].instrument;
    note.quantizedStartStep = newNotes[0].quantizedStartStep;
    note.quantizedEndStep = newNotes[0].quantizedEndStep;
    output.notes.push(note);
    let o = 0;

    for (let i = 1; i < newNotes.length; i++) {
      const thisNote = newNotes[i];
      const previousNote = output.notes[o];
      // Compare next note's start time with previous note's end time.
      if (previousNote.instrument === thisNote.instrument &&
          previousNote.pitch === thisNote.pitch &&
          thisNote.quantizedStartStep === previousNote.quantizedEndStep &&
          // Doesn't start on the measure boundary.
          thisNote.quantizedStartStep % 16 !== 0) {
        // If the next note has the same pitch as this note and starts at the
        // same time as the previous note ends, absorb the next note into the
        // previous output note.
        output.notes[o].quantizedEndStep +=
            thisNote.quantizedEndStep - thisNote.quantizedStartStep;
      } else {
        // Otherwise, append the next note to the output notes.
        const note = new NoteSequence.Note();
        note.pitch = newNotes[i].pitch;
        note.instrument = newNotes[i].instrument;
        note.quantizedStartStep = newNotes[i].quantizedStartStep;
        note.quantizedEndStep = newNotes[i].quantizedEndStep;
        output.notes.push(note);
        o++;
      }
    }
    return output;
  }

  private numbersOfMaskedVariables(masks: tf.Tensor4D): tf.Tensor {
    return masks.max(2).sum([1, 2]);
  }

  private yaoSchedule(i: number, n: tf.Scalar) {
    return tf.tidy(() => {
      const pmin = tf.scalar(0.1, 'float32');
      const pmax = tf.scalar(0.9, 'float32');
      const alpha = tf.scalar(0.7, 'float32');
      const wat = pmax.sub(pmin).mul(tf.scalar(i, 'float32')).div(n);
      const secondArg = pmax.sub(wat).div(alpha);
      return pmin.reshape([1]).concat(secondArg.reshape([1])).max();
    });
  }

  private bernoulliMask(
      shape: number[], pm: tf.Tensor, outerMasks: tf.Tensor4D): tf.Tensor4D {
    return tf.tidy(() => {
      const [bb, tt, pp, ii] = shape;
      const probs = tf.tile(
          tf.randomUniform([bb, tt, 1, ii], 0, 1, 'float32'), [1, 1, pp, 1]);
      const masks = probs.less(pm);
      return tf.cast(masks, 'float32').mul(outerMasks);
    });
  }

  private samplePredictions(predictions: tf.Tensor4D, temperature = 0.99)
      : tf.Tensor {
    return tf.tidy(() => {
      predictions = tf.pow(predictions, tf.scalar(1 / temperature, 'float32'));
      const cmf = tf.cumsum(predictions, 2, false, false);
      const totalMasses = cmf.slice(
          [0, 0, cmf.shape[2] - 1, 0],
          [cmf.shape[0], cmf.shape[1], 1, cmf.shape[3]]);
      const u = tf.randomUniform(totalMasses.shape, 0, 1, 'float32');
      const i = u.mul(totalMasses).less(cmf).argMax(2);
      return tf.oneHot(i.flatten(), predictions.shape[2], 1, 0)
          .reshape([
            predictions.shape[0], predictions.shape[1], predictions.shape[3],
            predictions.shape[2]
          ])
          .transpose([0, 1, 3, 2]);
    });
  }
}

export {Coconet};
