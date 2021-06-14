import * as tf from '@tensorflow/tfjs';
import { NoteSequence } from '../protobuf/index';
import { FRAME_LENGTH_SECONDS, MIDI_PITCHES, MIN_MIDI_PITCH } from './constants';
const RF_PAD = 3;
export function batchInput(input, batchLength) {
    let batchSize = Math.ceil(input.length / batchLength);
    let batchRemainder = input.length % batchLength;
    let mergedRemainder = 0;
    if (batchSize > 1 && batchRemainder > 0 && batchRemainder <= RF_PAD) {
        batchSize -= 1;
        mergedRemainder = batchRemainder;
        batchRemainder = 0;
    }
    if (batchSize === 1) {
        return tf.tensor2d(input).expandDims(0);
    }
    const actualBatchLength = batchLength + 2 * RF_PAD;
    const firstBatch = tf.tensor2d(input.slice(0, actualBatchLength)).expandDims(0);
    const lastBatch = tf.tensor2d(input.slice(input.length - actualBatchLength))
        .expandDims(0);
    if (batchSize === 2) {
        return tf.concat([firstBatch, lastBatch], 0);
    }
    let naivePaddedBatches;
    if (batchRemainder) {
        naivePaddedBatches = tf.tensor2d(input)
            .pad([[0, batchLength - batchRemainder], [0, 0]])
            .as3D(batchSize, batchLength, -1);
    }
    else {
        naivePaddedBatches =
            tf.tensor2d(input.slice(0, input.length - mergedRemainder))
                .as3D(batchSize, batchLength, -1);
    }
    const leftPad = tf.slice(naivePaddedBatches, [0, batchLength - RF_PAD], [batchSize - 2, -1]);
    const rightPad = tf.slice(naivePaddedBatches, [2, 0], [-1, RF_PAD]);
    const midBatches = tf.concat([leftPad, naivePaddedBatches.slice(1, batchSize - 2), rightPad], 1);
    return tf.concat([firstBatch, midBatches, lastBatch], 0);
}
export function unbatchOutput(batches, batchLength, totalLength) {
    if (batches.shape[0] === 1) {
        return batches;
    }
    return tf.tidy(() => {
        const firstBatch = batches.slice([0, 0], [1, batchLength]);
        let finalBatchLength = totalLength % batchLength;
        if (finalBatchLength <= RF_PAD) {
            finalBatchLength += batchLength;
        }
        const finalBatch = batches.slice([batches.shape[0] - 1, batches.shape[1] - finalBatchLength], [-1, -1]);
        let toConcat = [firstBatch, finalBatch];
        if (batches.shape[0] > 2) {
            const midBatchSize = batches.shape[0] - 2;
            const midBatches = batches.slice([1, RF_PAD], [midBatchSize, batchLength]);
            toConcat = [
                firstBatch, midBatches.as3D(1, (midBatchSize) * batchLength, -1),
                finalBatch
            ];
        }
        return tf.concat(toConcat, 1);
    });
}
export async function pianorollToNoteSequence(frameProbs, onsetProbs, velocityValues, onsetThreshold = 0.5, frameThreshold = 0.5) {
    const ns = NoteSequence.create();
    const pitchStartStepPlusOne = new Uint32Array(MIDI_PITCHES);
    const onsetVelocities = new Uint8Array(MIDI_PITCHES);
    let previousOnsets = new Uint8Array(MIDI_PITCHES);
    function endPitch(pitch, endFrame) {
        ns.notes.push(NoteSequence.Note.create({
            pitch: pitch + MIN_MIDI_PITCH,
            startTime: (pitchStartStepPlusOne[pitch] - 1) * FRAME_LENGTH_SECONDS,
            endTime: endFrame * FRAME_LENGTH_SECONDS,
            velocity: onsetVelocities[pitch]
        }));
        pitchStartStepPlusOne[pitch] = 0;
    }
    function processOnset(p, f, velocity) {
        if (pitchStartStepPlusOne[p]) {
            if (!previousOnsets[p]) {
                endPitch(p, f);
                pitchStartStepPlusOne[p] = f + 1;
                onsetVelocities[p] = velocity;
            }
        }
        else {
            pitchStartStepPlusOne[p] = f + 1;
            onsetVelocities[p] = velocity;
        }
    }
    const predictions = tf.tidy(() => {
        let onsetPredictions = tf.greater(onsetProbs, onsetThreshold);
        let framePredictions = tf.greater(frameProbs, frameThreshold);
        onsetPredictions = onsetPredictions.pad([[0, 1], [0, 0]]);
        framePredictions = framePredictions.pad([[0, 1], [0, 0]]);
        velocityValues = velocityValues.pad([[0, 1], [0, 0]]);
        framePredictions = tf.logicalOr(framePredictions, onsetPredictions);
        return [framePredictions, onsetPredictions, velocityValues];
    });
    const [frames, onsets, velocities] = await Promise.all(predictions.map(t => t.data()));
    predictions.forEach(t => t.dispose());
    const numFrames = frameProbs.shape[0];
    for (let f = 0; f < numFrames + 1; ++f) {
        for (let p = 0; p < MIDI_PITCHES; ++p) {
            const i = f * MIDI_PITCHES + p;
            if (onsets[i]) {
                processOnset(p, f, velocities[i]);
            }
            else if (!frames[i] && pitchStartStepPlusOne[p]) {
                endPitch(p, f);
            }
        }
        previousOnsets = onsets.slice(f * MIDI_PITCHES, (f + 1) * MIDI_PITCHES);
    }
    ns.totalTime = numFrames * FRAME_LENGTH_SECONDS;
    return ns;
}
//# sourceMappingURL=transcription_utils.js.map