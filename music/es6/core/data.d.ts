import * as tf from '@tensorflow/tfjs';
import { INoteSequence, NoteSequence } from '../protobuf/index';
import { DEFAULT_DRUM_PITCH_CLASSES } from './constants';
import { MelodyControl } from './melodies';
export { DEFAULT_DRUM_PITCH_CLASSES };
export interface MelodyConverterSpec {
    type: 'MelodyConverter';
    args: MelodyConverterArgs;
}
export interface MelodyRhythmConverterSpec {
    type: 'MelodyRhythmConverter';
    args: MelodyConverterArgs;
}
export interface MelodyShapeConverterSpec {
    type: 'MelodyShapeConverter';
    args: MelodyConverterArgs;
}
export interface DrumsConverterSpec {
    type: 'DrumsConverter';
    args: DrumsConverterArgs;
}
export interface DrumRollConverterSpec {
    type: 'DrumRollConverter';
    args: DrumsConverterArgs;
}
export interface TrioConverterSpec {
    type: 'TrioConverter';
    args: TrioConverterArgs;
}
export interface TrioRhythmConverterSpec {
    type: 'TrioRhythmConverter';
    args: TrioConverterArgs;
}
export interface DrumsOneHotConverterSpec {
    type: 'DrumsOneHotConverter';
    args: DrumsConverterArgs;
}
export interface MultitrackConverterSpec {
    type: 'MultitrackConverter';
    args: MultitrackConverterArgs;
}
export interface GrooveConverterSpec {
    type: 'GrooveConverter';
    args: GrooveConverterArgs;
}
export declare type ConverterSpec = MelodyConverterSpec | MelodyRhythmConverterSpec | MelodyShapeConverterSpec | DrumsConverterSpec | DrumRollConverterSpec | TrioConverterSpec | TrioRhythmConverterSpec | DrumsOneHotConverterSpec | MultitrackConverterSpec | GrooveConverterSpec;
export declare function converterFromSpec(spec: ConverterSpec): DataConverter;
export interface BaseConverterArgs {
    numSteps?: number;
    numSegments?: number;
}
export declare abstract class DataConverter {
    readonly numSteps: number;
    readonly numSegments: number;
    abstract readonly depth: number;
    abstract readonly endTensor: tf.Tensor1D;
    readonly NUM_SPLITS: number;
    readonly SEGMENTED_BY_TRACK: boolean;
    abstract toTensor(noteSequence: INoteSequence): tf.Tensor2D;
    abstract toNoteSequence(tensor: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<INoteSequence>;
    constructor(args: BaseConverterArgs);
    tensorSteps(tensor: tf.Tensor2D): tf.Scalar;
}
export interface DrumsConverterArgs extends BaseConverterArgs {
    pitchClasses?: number[][];
}
export declare class DrumsConverter extends DataConverter {
    readonly pitchClasses: number[][];
    readonly pitchToClass: Map<number, number>;
    readonly depth: number;
    readonly endTensor: tf.Tensor1D;
    constructor(args: DrumsConverterArgs);
    toTensor(noteSequence: INoteSequence): tf.Tensor2D;
    toNoteSequence(oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
export declare class DrumRollConverter extends DrumsConverter {
    toNoteSequence(roll: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
export declare class DrumsOneHotConverter extends DrumsConverter {
    readonly depth: number;
    constructor(args: DrumsConverterArgs);
    toTensor(noteSequence: INoteSequence): tf.Tensor2D;
}
export interface MelodyConverterArgs extends BaseConverterArgs {
    minPitch: number;
    maxPitch: number;
    ignorePolyphony?: boolean;
}
export declare class MelodyConverter extends DataConverter {
    readonly minPitch: number;
    readonly maxPitch: number;
    readonly ignorePolyphony: boolean;
    readonly depth: number;
    readonly endTensor: tf.Tensor1D;
    readonly NOTE_OFF = 1;
    readonly FIRST_PITCH = 2;
    constructor(args: MelodyConverterArgs);
    toTensor(noteSequence: INoteSequence): tf.Tensor2D;
    toNoteSequence(oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
declare abstract class MelodyControlConverter extends DataConverter {
    readonly minPitch: number;
    readonly maxPitch: number;
    readonly ignorePolyphony: boolean;
    readonly melodyControl: MelodyControl;
    readonly depth: number;
    readonly endTensor: tf.Tensor1D;
    constructor(args: MelodyConverterArgs, melodyControl: MelodyControl);
    toTensor(noteSequence: INoteSequence): tf.Tensor2D;
}
export declare class MelodyRhythmConverter extends MelodyControlConverter {
    constructor(args: MelodyConverterArgs);
    toNoteSequence(tensor: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
export declare class MelodyShapeConverter extends MelodyControlConverter {
    constructor(args: MelodyConverterArgs);
    toNoteSequence(oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
export interface TrioConverterArgs extends BaseConverterArgs {
    melArgs: MelodyConverterArgs;
    bassArgs: MelodyConverterArgs;
    drumsArgs: DrumsConverterArgs;
}
export declare class TrioConverter extends DataConverter {
    melConverter: MelodyConverter;
    bassConverter: MelodyConverter;
    drumsConverter: DrumsConverter;
    readonly depth: number;
    readonly endTensor: tf.Tensor1D;
    readonly NUM_SPLITS = 3;
    readonly MEL_PROG_RANGE: number[];
    readonly BASS_PROG_RANGE: number[];
    constructor(args: TrioConverterArgs);
    toTensor(noteSequence: INoteSequence): tf.Tensor2D;
    toNoteSequence(th: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
export declare class TrioRhythmConverter extends DataConverter {
    readonly trioConverter: TrioConverter;
    readonly depth: number;
    readonly endTensor: tf.Tensor1D;
    readonly NUM_SPLITS = 3;
    constructor(args: TrioConverterArgs);
    toTensor(noteSequence: INoteSequence): tf.Tensor2D;
    toNoteSequence(tensor: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
export interface MultitrackConverterArgs extends BaseConverterArgs {
    stepsPerQuarter: number;
    totalSteps: number;
    numVelocityBins: number;
    minPitch?: number;
    maxPitch?: number;
}
export declare class MultitrackConverter extends DataConverter {
    readonly SEGMENTED_BY_TRACK = true;
    readonly stepsPerQuarter: number;
    readonly totalSteps: number;
    readonly numVelocityBins: number;
    readonly minPitch: number;
    readonly maxPitch: number;
    readonly numPitches: number;
    readonly performanceEventDepth: number;
    readonly numPrograms: number;
    readonly endToken: number;
    readonly depth: number;
    readonly endTensor: tf.Tensor1D;
    constructor(args: MultitrackConverterArgs);
    private trackToTensor;
    toTensor(noteSequence: INoteSequence): tf.Tensor2D;
    private tokensToTrack;
    toNoteSequence(oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
export interface GrooveConverterArgs extends BaseConverterArgs {
    stepsPerQuarter?: number;
    humanize?: boolean;
    tapify?: boolean;
    pitchClasses?: number[][];
    splitInstruments?: boolean;
}
export declare class GrooveConverter extends DataConverter {
    readonly stepsPerQuarter: number;
    readonly humanize: boolean;
    readonly tapify: boolean;
    readonly pitchClasses: number[][];
    readonly pitchToClass: Map<number, number>;
    readonly depth: number;
    readonly endTensor: tf.Tensor1D;
    readonly splitInstruments: boolean;
    readonly TAPIFY_CHANNEL = 3;
    constructor(args: GrooveConverterArgs);
    toTensor(ns: INoteSequence): tf.Tensor2D;
    toNoteSequence(t: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number): Promise<NoteSequence>;
}
