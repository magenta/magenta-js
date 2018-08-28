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
import {NoteSequence} from '../protobuf';

export const MIN_MIDI_PITCH = 21;
export const MAX_MIDI_PITCH = 108;
export const MIDI_PITCHES = MAX_MIDI_PITCH - MIN_MIDI_PITCH + 1;

const SAMPLE_RATE = 16000;
const SPEC_HOP_LENGTH = 512;
export const FRAME_LENGTH_SECONDS = SPEC_HOP_LENGTH / SAMPLE_RATE;

// The number of frames of padding needed when splitting into batches to account
// for the receptive field.
const RF_PAD = 3;

export function batchInput(input: number[][], batchLength: number) {
  let batchSize = Math.ceil(input.length / batchLength);
  const batchRemainder = input.length % batchLength;
  // If the last batch is smaller than our receptive field padding, we need
  // to merge it with the previous batch.
  let mergeFinal = false;
  if (batchSize > 1 && batchRemainder > 0 && batchRemainder <= RF_PAD) {
    batchSize -= 1;
    mergeFinal = true;
  }
  let firstBatches: tf.Tensor3D;
  let finalBatch: tf.Tensor3D;
  if (batchSize === 1) {
    firstBatches = undefined;
    finalBatch = tf.tensor2d(input).expandDims(0);
  } else if (batchSize === 2) {
    firstBatches =
        tf.tensor2d(input.slice(0, batchLength + RF_PAD)).expandDims(0);
    finalBatch = tf.tensor2d(input.slice(batchLength - RF_PAD)).expandDims(0);
  } else {
    // Add zero padding to make the length divisible by the
    // this.batchLength. Don't worry about receptive field padding for now.
    let naivePaddedBatches;
    if (mergeFinal) {
      naivePaddedBatches =
          tf.tensor2d(input.slice(0, input.length - batchRemainder))
              .as3D(batchSize, batchLength, -1);
    } else if (batchRemainder) {
      naivePaddedBatches = tf.tensor2d(input)
                               .pad([[0, batchLength - batchRemainder], [0, 0]])
                               .as3D(batchSize, batchLength, -1);
    } else {
      naivePaddedBatches = tf.tensor2d(input).as3D(batchSize, batchLength, -1);
    }
    // Slice out the receptive field padding we will need for all but the
    // first and last batch.
    const leftPad = tf.slice(
        naivePaddedBatches, [0, batchLength - RF_PAD], [batchSize - 2, -1]);
    const rightPad = tf.slice(naivePaddedBatches, [2, 0], [-1, RF_PAD]);
    // Pad the middle (not first and last) to cover the receptive field.
    const midBatches = tf.concat(
        [leftPad, naivePaddedBatches.slice(1, batchSize - 2), rightPad], 1);

    // Add some extra RF padding to the end of the first batch so its
    // length matches the mid batches.
    const firstBatch =
        tf.tensor2d(input.slice(0, batchLength + 2 * RF_PAD)).expandDims(0) as
        tf.Tensor3D;

    firstBatches = tf.concat([firstBatch, midBatches], 0);
    finalBatch =
        tf.tensor2d(input.slice((batchSize - 1) * batchLength - RF_PAD))
            .expandDims(0);
  }
  return [firstBatches, finalBatch];
}

export function unbatchOutput(
    batches: tf.Tensor3D, finalBatch: tf.Tensor3D, batchLength: number) {
  const firstBatch = batches.slice([0, 0], [1, batchLength]);
  finalBatch = finalBatch.slice([0, RF_PAD]);
  let toConcat = [firstBatch, finalBatch];
  if (batches.shape[0] > 1) {
    const midBatches = batches.slice([1, RF_PAD], [-1, batchLength]);
    toConcat = [
      firstBatch, midBatches.as3D(1, (batches.shape[0] - 1) * batchLength, -1),
      finalBatch
    ];
  }
  return tf.concat(toConcat, 1);
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
  const [splitFrames, splitOnsets, splitVelocities] = tf.tidy(() => {
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

    return [
      tf.unstack(framePredictions), tf.unstack(onsetPredictions),
      tf.unstack(velocityValues)
    ];
  });

  const ns = NoteSequence.create();

  // Store (step + 1) with 0 signifying no active note.
  const pitchStartStepPlusOne = new Uint32Array(MIDI_PITCHES);
  const onsetVelocities = new Uint8Array(MIDI_PITCHES);
  let frame: Uint8Array;
  let onsets: Uint8Array;
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

  for (let f = 0; f < splitFrames.length; ++f) {
    frame = await splitFrames[f].data() as Uint8Array;
    onsets = await splitOnsets[f].data() as Uint8Array;
    const velocities = await splitVelocities[f].data() as Uint8Array;
    splitFrames[f].dispose();
    splitOnsets[f].dispose();
    splitVelocities[f].dispose();
    for (let p = 0; p < frame.length; ++p) {
      if (onsets[p]) {
        processOnset(p, f, velocities[p]);
      } else if (!frame[p] && pitchStartStepPlusOne[p]) {
        endPitch(p, f);
      }
    }
    previousOnsets = onsets;
  }
  ns.totalTime = splitFrames.length * FRAME_LENGTH_SECONDS;
  return ns;
}
