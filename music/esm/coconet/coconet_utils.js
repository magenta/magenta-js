import * as tf from '@tensorflow/tfjs-core';
import * as logging from '../core/logging';
import { NoteSequence } from '../protobuf/index';
export const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
export const NUM_PITCHES = 46;
export const MIN_PITCH = 36;
export const NUM_VOICES = 4;
export function pianorollToSequence(pianoroll, numberOfSteps) {
    const reshaped = tf.tidy(() => pianoroll.reshape([numberOfSteps, NUM_PITCHES, NUM_VOICES])
        .arraySync());
    const sequence = NoteSequence.create();
    const notes = [];
    for (let s = 0; s < numberOfSteps; s++) {
        for (let p = 0; p < NUM_PITCHES; p++) {
            for (let v = 0; v < NUM_VOICES; v++) {
                const value = reshaped[s][p][v];
                if (value === 1.0) {
                    const note = NoteSequence.Note.create({
                        pitch: p + MIN_PITCH,
                        instrument: v,
                        quantizedStartStep: s,
                        quantizedEndStep: s + 1
                    });
                    notes.push(note);
                }
            }
        }
    }
    sequence.notes = notes;
    sequence.totalQuantizedSteps = notes[notes.length - 1].quantizedEndStep;
    sequence.quantizationInfo = { stepsPerQuarter: 4 };
    return sequence;
}
export function sequenceToPianoroll(ns, numberOfSteps) {
    const pianoroll = tf.tidy(() => tf.zeros([numberOfSteps, NUM_PITCHES, NUM_VOICES]).arraySync());
    const notes = ns.notes;
    notes.forEach(note => {
        const pitchIndex = note.pitch - MIN_PITCH;
        const stepIndex = note.quantizedStartStep;
        const duration = note.quantizedEndStep - note.quantizedStartStep;
        const voice = note.instrument;
        if (voice < 0 || voice >= NUM_VOICES) {
            logging.log(`Found invalid voice ${voice}. Skipping.`, 'Coconet', 5);
        }
        else {
            if (stepIndex + duration > numberOfSteps) {
                throw new Error(`NoteSequence ${ns.id} has notes that are longer than the sequence's
          totalQuantizedSteps.`);
            }
            for (let i = stepIndex; i < stepIndex + duration; i++) {
                pianoroll[i][pitchIndex][voice] = 1;
            }
        }
    });
    return tf.tensor([pianoroll]);
}
//# sourceMappingURL=coconet_utils.js.map