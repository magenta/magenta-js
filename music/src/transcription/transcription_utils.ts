/**
 * Utility functions for [Onsets and Frames]{@link
 * https://g.co/magenta/onsets-frames} models.
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
import * as tf from '@tensorflow/tfjs';

import {NoteSequence} from '../protobuf/index';

import {FRAME_LENGTH_SECONDS, MIDI_PITCHES, MIN_MIDI_PITCH} from './constants';

// The number of frames of padding needed on each side when splitting into
// batches to account for the receptive field (which is a total of 7 for this
// model).
const RF_PAD = 3;

/**
 * Batches the input, adding padding for the receptive field.
 *
 * For batches in the middle (not the first or last), we pad the beginning and
 * end with values from the previous and following batches to cover the
 * receptive field.
 *
 * We can't just use zero padding for the first and last batch since bias will
 * be added to it, making it non-zero after the first convolution. This does
 * not match how `same` padding works, which is reset to 0 at each layer.
 * Instead we treat the first and last batch differently. The first batch has no
 * initial padding and we include extra padding from the second batch on the end
 * to make its length match. The final batch has no end padding and we include
 * extra padding from the previous batch to the beginning to make its length
 * match.
 *
 * In most cases, the number of batches will equal `ceil(input.shape[0] /
 * batchLength)`. However, in rare cases where the final batch would be shorter
 * than the receptive field, it is instead appended to the previous batch,
 * reducing the final batch size by 1.
 *
 * @param input The 2D input matrix, shaped [N, D].
 * @param batchLength The desired batch size (excluding receptive field
 * padding). The final batch may be less or slightly more than this.
 * @returns The 3D batched input, shaped [B, batchLength + RF_PAD * 2, D]
 */
export function batchInput(input: number[][], batchLength: number) {
  let batchSize = Math.ceil(input.length / batchLength);
  let batchRemainder = input.length % batchLength;
  // If the last batch is smaller than our receptive field padding, we need
  // to merge it with the previous batch.
  let mergedRemainder = 0;
  if (batchSize > 1 && batchRemainder > 0 && batchRemainder <= RF_PAD) {
    batchSize -= 1;
    mergedRemainder = batchRemainder;
    batchRemainder = 0;
  }
  if (batchSize === 1) {
    return tf.tensor2d(input).expandDims(0) as tf.Tensor3D;
  }

  // Add some extra RF padding to the end/beginning of the first/last batches
  // so their lengths match the mid batches (if applicable).
  const actualBatchLength = batchLength + 2 * RF_PAD;
  const firstBatch =
      tf.tensor2d(input.slice(0, actualBatchLength)).expandDims(0) as
      tf.Tensor3D;
  const lastBatch = tf.tensor2d(input.slice(input.length - actualBatchLength))
                        .expandDims(0) as tf.Tensor3D;

  if (batchSize === 2) {
    return tf.concat([firstBatch, lastBatch], 0);
  }

  // Add zero padding to make the length divisible by the
  // this.batchLength. Don't worry about receptive field padding for now.
  let naivePaddedBatches;
  if (batchRemainder) {
    naivePaddedBatches = tf.tensor2d(input)
                             .pad([[0, batchLength - batchRemainder], [0, 0]])
                             .as3D(batchSize, batchLength, -1);
  } else {
    naivePaddedBatches =
        tf.tensor2d(input.slice(0, input.length - mergedRemainder))
            .as3D(batchSize, batchLength, -1);
  }
  // Slice out the receptive field padding we will need for all but the
  // first and last batch.
  const leftPad = tf.slice(
      naivePaddedBatches, [0, batchLength - RF_PAD], [batchSize - 2, -1]);
  const rightPad = tf.slice(naivePaddedBatches, [2, 0], [-1, RF_PAD]);
  // Pad the middle (not first and last) to cover the receptive field.
  const midBatches = tf.concat(
      [leftPad, naivePaddedBatches.slice(1, batchSize - 2), rightPad], 1);

  return tf.concat([firstBatch, midBatches, lastBatch], 0);
}

/**
 * Unbatches the input, reversing the procedure of `batchInput`.
 *
 * @param batches The batched input matrix.
 * @param batchLength The desired batch size (excluding receptive field
 * padding). The final batch may be less or slightly more than this.
 * @returns The batched input, shaped [N, batchLength + RF_PAD * 2]
 */
export function unbatchOutput(
    batches: tf.Tensor3D, batchLength: number, totalLength: number) {
  if (batches.shape[0] === 1) {
    return batches;
  }
  return tf.tidy(() => {
    const firstBatch = batches.slice([0, 0], [1, batchLength]);
    let finalBatchLength = totalLength % batchLength;
    if (finalBatchLength <= RF_PAD) {
      finalBatchLength += batchLength;
    }
    const finalBatch = batches.slice(
        [batches.shape[0] - 1, batches.shape[1] - finalBatchLength], [-1, -1]);
    let toConcat = [firstBatch, finalBatch];

    if (batches.shape[0] > 2) {
      const midBatchSize = batches.shape[0] - 2;
      const midBatches =
          batches.slice([1, RF_PAD], [midBatchSize, batchLength]);
      toConcat = [
        firstBatch, midBatches.as3D(1, (midBatchSize) * batchLength, -1),
        finalBatch
      ];
    }
    return tf.concat(toConcat, 1);
  });
}

/**
 * Converts the model predictions to a NoteSequence.
 *
 * @param frameProbs Probabilities of an active frame, shaped `[frame,
 * pitch]`.
 * @param onsetProbs Probabilities of an onset, shaped `[frame, pitch]`.
 * @param velocityValues Predicted velocities in the range [0, 127], shaped
 * `[frame, pitch]`.
 * @returns A `NoteSequence` containing the transcribed piano performance.
 */
export async function pianorollToNoteSequence(
    frameProbs: tf.Tensor2D, onsetProbs: tf.Tensor2D,
    velocityValues: tf.Tensor2D, onsetThreshold = 0.5, frameThreshold = 0.5) {
  const ns = NoteSequence.create();

  // Store (step + 1) with 0 signifying no active note.
  const pitchStartStepPlusOne = new Uint32Array(MIDI_PITCHES);
  const onsetVelocities = new Uint8Array(MIDI_PITCHES);
  let previousOnsets = new Uint8Array(MIDI_PITCHES);

  function endPitch(pitch: number, endFrame: number) {
    // End an active pitch.
    ns.notes.push(NoteSequence.Note.create({
      pitch: pitch + MIN_MIDI_PITCH,
      startTime: (pitchStartStepPlusOne[pitch] - 1) * FRAME_LENGTH_SECONDS,
      endTime: endFrame * FRAME_LENGTH_SECONDS,
      velocity: onsetVelocities[pitch]
    }));
    pitchStartStepPlusOne[pitch] = 0;
  }

  function processOnset(p: number, f: number, velocity: number) {
    if (pitchStartStepPlusOne[p]) {
      // Pitch is already active, but if this is a new onset, we should end
      // the note and start a new one.
      if (!previousOnsets[p]) {
        endPitch(p, f);
        pitchStartStepPlusOne[p] = f + 1;
        onsetVelocities[p] = velocity;
      }
    } else {
      pitchStartStepPlusOne[p] = f + 1;
      onsetVelocities[p] = velocity;
    }
  }

  const predictions = tf.tidy(() => {
    let onsetPredictions =
        tf.greater(onsetProbs, onsetThreshold) as tf.Tensor2D;
    let framePredictions =
        tf.greater(frameProbs, frameThreshold) as tf.Tensor2D;

    // Add silent frame at the end so we can do a final loop and terminate
    // any notes that are still active.
    onsetPredictions = onsetPredictions.pad([[0, 1], [0, 0]]);
    framePredictions = framePredictions.pad([[0, 1], [0, 0]]);
    velocityValues = velocityValues.pad([[0, 1], [0, 0]]);

    // Ensure that any frame with an onset prediction is considered active.
    framePredictions = tf.logicalOr(framePredictions, onsetPredictions);

    return [framePredictions, onsetPredictions, velocityValues];
  });

  const [frames, onsets, velocities] =
      await Promise.all(predictions.map(t => t.data() as Promise<Uint8Array>));
  predictions.forEach(t => t.dispose());
  const numFrames: number = frameProbs.shape[0];
  for (let f = 0; f < numFrames + 1; ++f) {  // Go 1 past to end notes
    for (let p = 0; p < MIDI_PITCHES; ++p) {
      const i = f * MIDI_PITCHES + p;
      if (onsets[i]) {
        processOnset(p, f, velocities[i]);
      } else if (!frames[i] && pitchStartStepPlusOne[p]) {
        endPitch(p, f);
      }
    }
    previousOnsets = onsets.slice(f * MIDI_PITCHES, (f + 1) * MIDI_PITCHES);
  }
  ns.totalTime = numFrames * FRAME_LENGTH_SECONDS;
  return ns;
}
