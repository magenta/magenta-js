import * as tf from '@tensorflow/tfjs';
export declare enum ChordQuality {
    Major = 0,
    Minor = 1,
    Augmented = 2,
    Diminished = 3,
    Other = 4
}
export declare class ChordSymbolException extends Error {
    constructor(message?: string);
}
export declare class ChordEncodingException extends Error {
    constructor(message?: string);
}
export declare class ChordSymbols {
    static pitches(chord: string): number[];
    static root(chord: string): number;
    static quality(chord: string): ChordQuality;
}
export declare abstract class ChordEncoder {
    abstract depth: number;
    abstract encode(chord: string): tf.Tensor1D;
    encodeProgression(chords: string[], numSteps: number): tf.Tensor2D;
}
export declare type ChordEncoderType = 'MajorMinorChordEncoder' | 'TriadChordEncoder' | 'PitchChordEncoder';
export declare function chordEncoderFromType(type: ChordEncoderType): MajorMinorChordEncoder | TriadChordEncoder | PitchChordEncoder;
export declare class MajorMinorChordEncoder extends ChordEncoder {
    depth: number;
    private index;
    encode(chord: string): tf.Tensor1D;
}
export declare class TriadChordEncoder extends ChordEncoder {
    depth: number;
    private index;
    encode(chord: string): tf.Tensor1D;
}
export declare class PitchChordEncoder extends ChordEncoder {
    depth: number;
    encode(chord: string): tf.Tensor1D;
}
