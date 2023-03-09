import * as tf from '@tensorflow/tfjs';
import { INoteSequence, NoteSequence } from '../protobuf/index';
export declare const NO_EVENT = 0;
export declare const NOTE_OFF = 1;
export declare class Melody {
    readonly events: ArrayLike<number>;
    readonly minPitch: number;
    readonly maxPitch: number;
    constructor(events: ArrayLike<number>, minPitch: number, maxPitch: number);
    static fromNoteSequence(noteSequence: INoteSequence, minPitch: number, maxPitch: number, ignorePolyphony?: boolean, numSteps?: number): Melody;
    toNoteSequence(stepsPerQuarter?: number, qpm?: number): NoteSequence;
}
export interface MelodyControl {
    readonly depth: number;
    extract(melody: Melody): tf.Tensor2D;
}
export declare class MelodyRhythm implements MelodyControl {
    readonly depth = 1;
    extract(melody: Melody): tf.Tensor2D;
}
export declare class MelodyShape implements MelodyControl {
    readonly depth = 3;
    extract(melody: Melody): tf.Tensor2D;
}
export declare class MelodyRegister implements MelodyControl {
    readonly boundaryPitches: number[];
    readonly depth: number;
    constructor(boundaryPitches: number[]);
    private meanMelodyPitch;
    extract(melody: Melody): tf.Tensor2D;
}
