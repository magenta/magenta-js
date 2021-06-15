import * as tf from '@tensorflow/tfjs';
import { NoteSequence } from '../protobuf/index';
import * as sequences from './sequences';
export const NO_EVENT = 0;
export const NOTE_OFF = 1;
const FIRST_PITCH = 2;
export class Melody {
    constructor(events, minPitch, maxPitch) {
        this.events = events;
        this.minPitch = minPitch;
        this.maxPitch = maxPitch;
    }
    static fromNoteSequence(noteSequence, minPitch, maxPitch, ignorePolyphony = true, numSteps) {
        sequences.assertIsQuantizedSequence(noteSequence);
        const sortedNotes = noteSequence.notes.sort((n1, n2) => {
            if (n1.quantizedStartStep === n2.quantizedStartStep) {
                return n2.pitch - n1.pitch;
            }
            return n1.quantizedStartStep - n2.quantizedStartStep;
        });
        const events = new Int32Array(numSteps || noteSequence.totalQuantizedSteps);
        let lastStart = -1;
        sortedNotes.forEach(n => {
            if (n.quantizedStartStep === lastStart) {
                if (!ignorePolyphony) {
                    throw new Error('`NoteSequence` is not monophonic.');
                }
                else {
                    return;
                }
            }
            if (n.pitch < minPitch || n.pitch > maxPitch) {
                throw Error('`NoteSequence` has a pitch outside of the valid range: ' +
                    `${n.pitch}`);
            }
            events[n.quantizedStartStep] = n.pitch - minPitch + FIRST_PITCH;
            events[n.quantizedEndStep] = NOTE_OFF;
            lastStart = n.quantizedStartStep;
        });
        return new Melody(events, minPitch, maxPitch);
    }
    toNoteSequence(stepsPerQuarter, qpm) {
        const noteSequence = sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
        let currNote = null;
        for (let s = 0; s < this.events.length; ++s) {
            const event = this.events[s];
            switch (event) {
                case NO_EVENT:
                    break;
                case NOTE_OFF:
                    if (currNote) {
                        currNote.quantizedEndStep = s;
                        noteSequence.notes.push(currNote);
                        currNote = null;
                    }
                    break;
                default:
                    if (currNote) {
                        currNote.quantizedEndStep = s;
                        noteSequence.notes.push(currNote);
                    }
                    currNote = NoteSequence.Note.create({
                        pitch: event - FIRST_PITCH + this.minPitch,
                        quantizedStartStep: s
                    });
            }
        }
        if (currNote) {
            currNote.quantizedEndStep = this.events.length;
            noteSequence.notes.push(currNote);
        }
        noteSequence.totalQuantizedSteps = this.events.length;
        return noteSequence;
    }
}
export class MelodyRhythm {
    constructor() {
        this.depth = 1;
    }
    extract(melody) {
        const numSteps = melody.events.length;
        const buffer = tf.buffer([numSteps, 1]);
        for (let step = 0; step < numSteps; ++step) {
            buffer.set(melody.events[step] >= FIRST_PITCH ? 1 : 0, step, 0);
        }
        return buffer.toTensor().as2D(numSteps, 1);
    }
}
export class MelodyShape {
    constructor() {
        this.depth = 3;
    }
    extract(melody) {
        const numSteps = melody.events.length;
        const buffer = tf.buffer([numSteps, 3]);
        let lastIndex = null;
        let lastPitch = null;
        for (let step = 0; step < numSteps; ++step) {
            if (melody.events[step] >= FIRST_PITCH) {
                if (lastIndex !== null) {
                    if (buffer.get(lastIndex, 0) === 0 &&
                        buffer.get(lastIndex, 1) === 0 &&
                        buffer.get(lastIndex, 2) === 0) {
                        lastIndex = -1;
                    }
                    let direction;
                    if (melody.events[step] < lastPitch) {
                        direction = 0;
                    }
                    else if (melody.events[step] > lastPitch) {
                        direction = 2;
                    }
                    else {
                        direction = 1;
                    }
                    for (let i = step; i > lastIndex; --i) {
                        buffer.set(1, i, direction);
                    }
                }
                lastIndex = step;
                lastPitch = melody.events[step];
            }
        }
        if (lastIndex !== numSteps - 1) {
            if ((lastIndex === null) ||
                (buffer.get(lastIndex, 0) === 0 && buffer.get(lastIndex, 1) === 0 &&
                    buffer.get(lastIndex, 2) === 0)) {
                for (let i = 0; i < numSteps; ++i) {
                    buffer.set(1, i, 1);
                }
            }
            else {
                for (let i = numSteps - 1; i > lastIndex; --i) {
                    for (let j = 0; j < 3; j++) {
                        buffer.set(buffer.get(lastIndex, j), i, j);
                    }
                }
            }
        }
        return buffer.toTensor().as2D(numSteps, 3);
    }
}
export class MelodyRegister {
    constructor(boundaryPitches) {
        this.boundaryPitches = boundaryPitches;
        this.depth = boundaryPitches.length + 1;
    }
    meanMelodyPitch(melody) {
        let total = 0;
        let count = 0;
        let currentPitch = null;
        for (let step = 0; step < melody.events.length; ++step) {
            if (melody.events[step] === NOTE_OFF) {
                currentPitch = null;
            }
            else if (melody.events[step] >= FIRST_PITCH) {
                currentPitch = melody.minPitch + melody.events[step] - FIRST_PITCH;
            }
            if (currentPitch !== null) {
                total += currentPitch;
                count += 1;
            }
        }
        if (count) {
            return total / count;
        }
        else {
            return null;
        }
    }
    extract(melody) {
        const numSteps = melody.events.length;
        const meanPitch = this.meanMelodyPitch(melody);
        if (meanPitch === null) {
            return tf.zeros([numSteps, this.depth]);
        }
        let bin = 0;
        while (bin < this.boundaryPitches.length &&
            meanPitch >= this.boundaryPitches[bin]) {
            bin++;
        }
        const buffer = tf.buffer([numSteps, this.depth]);
        for (let step = 0; step < numSteps; ++step) {
            buffer.set(1, step, bin);
        }
        return buffer.toTensor().as2D(numSteps, this.depth);
    }
}
//# sourceMappingURL=melodies.js.map