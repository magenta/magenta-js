import { INoteSequence } from '../protobuf/index';
export interface NoteOn {
    type: 'note-on';
    pitch: number;
}
export interface NoteOff {
    type: 'note-off';
    pitch: number;
}
export interface TimeShift {
    type: 'time-shift';
    steps: number;
}
export interface VelocityChange {
    type: 'velocity-change';
    velocityBin: number;
}
export declare type PerformanceEvent = NoteOn | NoteOff | TimeShift | VelocityChange;
export declare class Performance {
    readonly events: PerformanceEvent[];
    readonly maxShiftSteps: number;
    readonly numVelocityBins: number;
    readonly program?: number;
    readonly isDrum?: boolean;
    constructor(events: PerformanceEvent[], maxShiftSteps: number, numVelocityBins: number, program?: number, isDrum?: boolean);
    static fromNoteSequence(noteSequence: INoteSequence, maxShiftSteps: number, numVelocityBins: number, instrument?: number): Performance;
    getNumSteps(): number;
    setNumSteps(numSteps: number): void;
    toNoteSequence(instrument?: number): INoteSequence;
}
