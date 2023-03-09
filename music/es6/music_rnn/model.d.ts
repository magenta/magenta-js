import * as aux_inputs from '../core/aux_inputs';
import * as chords from '../core/chords';
import * as data from '../core/data';
import { INoteSequence } from '../protobuf/index';
export interface MusicRNNSpec {
    type: 'MusicRNN';
    dataConverter: data.ConverterSpec;
    attentionLength?: number;
    chordEncoder?: chords.ChordEncoderType;
    auxInputs?: aux_inputs.AuxiliaryInputSpec[];
}
export declare class MusicRNN {
    private checkpointURL;
    private spec;
    private dataConverter;
    private attentionLength?;
    private chordEncoder;
    private auxInputs;
    private lstmCells;
    private lstmFcB;
    private lstmFcW;
    private forgetBias;
    private biasShapes;
    private attentionWrapper?;
    private rawVars;
    private initialized;
    constructor(checkpointURL: string, spec?: MusicRNNSpec);
    isInitialized(): boolean;
    private instantiateFromSpec;
    initialize(): Promise<void>;
    dispose(): void;
    continueSequence(sequence: INoteSequence, steps: number, temperature?: number, chordProgression?: string[]): Promise<INoteSequence>;
    continueSequenceAndReturnProbabilities(sequence: INoteSequence, steps: number, temperature?: number, chordProgression?: string[]): Promise<{
        sequence: Promise<INoteSequence>;
        probs: Float32Array[];
    }>;
    private continueSequenceImpl;
    private sampleRnn;
}
