import * as tf from '@tensorflow/tfjs';
import * as chords from '../core/chords';
import * as data from '../core/data';
import { INoteSequence } from '../protobuf/index';
declare class LayerVars {
    kernel: tf.Tensor2D;
    bias: tf.Tensor1D;
    constructor(kernel: tf.Tensor2D, bias: tf.Tensor1D);
}
declare abstract class Encoder {
    abstract readonly zDims: number;
    abstract encode(sequence: tf.Tensor3D, segmentLengths?: number[]): tf.Tensor2D;
}
declare abstract class Decoder {
    abstract readonly outputDims: number;
    abstract readonly zDims: number;
    abstract decode(z: tf.Tensor2D, length: number, initialInput?: tf.Tensor2D, temperature?: number, controls?: tf.Tensor2D): tf.Tensor3D;
}
declare class Nade {
    encWeights: tf.Tensor2D;
    decWeightsT: tf.Tensor2D;
    numDims: number;
    numHidden: number;
    constructor(encWeights: tf.Tensor3D, decWeightsT: tf.Tensor3D);
    sample(encBias: tf.Tensor2D, decBias: tf.Tensor2D): tf.Tensor2D;
}
export interface MusicVAEControlSpec {
    name: string;
    depth: number;
}
export interface MusicVAESpec {
    type: 'MusicVAE';
    dataConverter: data.ConverterSpec;
    useBooleanDecoder: boolean;
    chordEncoder?: chords.ChordEncoderType;
    conditionOnKey: boolean;
    extraControls?: MusicVAEControlSpec[];
}
export interface MusicVAEControlArgs {
    chordProgression?: string[];
    key?: number;
    extraControls?: {
        [name: string]: tf.Tensor2D;
    };
}
declare class MusicVAE {
    private checkpointURL;
    private spec;
    dataConverter: data.DataConverter;
    private chordEncoder?;
    private encoder;
    private decoder;
    private rawVars;
    zDims: number;
    initialized: boolean;
    constructor(checkpointURL: string, spec?: MusicVAESpec);
    private instantiateFromSpec;
    dispose(): void;
    private getLstmLayers;
    initialize(): Promise<void>;
    isInitialized(): boolean;
    private checkControlArgs;
    private controlArgsToTensor;
    interpolateTensors(inputTensors: tf.Tensor3D, numInterps: number | number[], temperature?: number, controlArgs?: MusicVAEControlArgs): Promise<tf.Tensor3D>;
    interpolate(inputSequences: INoteSequence[], numInterps: number | number[], temperature?: number, controlArgs?: MusicVAEControlArgs): Promise<INoteSequence[]>;
    private getSegmentLengths;
    private encodeChordProgression;
    encodeTensors(inputTensors: tf.Tensor3D, controlArgs: MusicVAEControlArgs): Promise<tf.Tensor2D>;
    encode(inputSequences: INoteSequence[], controlArgs?: MusicVAEControlArgs): Promise<tf.Tensor2D>;
    decodeTensors(z: tf.Tensor2D, temperature?: number, controlArgs?: MusicVAEControlArgs): Promise<tf.Tensor3D>;
    decode(z: tf.Tensor2D, temperature?: number, controlArgs?: MusicVAEControlArgs, stepsPerQuarter?: number, qpm?: number): Promise<INoteSequence[]>;
    private getInterpolatedZs;
    sampleTensors(numSamples: number, temperature?: number, controlArgs?: MusicVAEControlArgs): Promise<tf.Tensor3D>;
    sample(numSamples: number, temperature?: number, controlArgs?: MusicVAEControlArgs, stepsPerQuarter?: number, qpm?: number): Promise<INoteSequence[]>;
    similarTensors(inputTensor: tf.Tensor2D, numSamples: number, similarity: number, temperature?: number, controlArgs?: MusicVAEControlArgs): Promise<tf.Tensor3D>;
    similar(inputSequence: INoteSequence, numSamples: number, similarity: number, temperature?: number, controlArgs?: MusicVAEControlArgs): Promise<INoteSequence[]>;
}
export { LayerVars, Encoder, Decoder, Nade, MusicVAE, };
