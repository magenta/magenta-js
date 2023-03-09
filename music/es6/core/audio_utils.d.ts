import * as tf from '@tensorflow/tfjs';
export interface SpecParams {
    sampleRate: number;
    hopLength?: number;
    winLength?: number;
    nFft?: number;
    nMels?: number;
    power?: number;
    fMin?: number;
    fMax?: number;
}
export declare function loadAudioFromUrl(url: string): Promise<AudioBuffer>;
export declare function loadAudioFromFile(blob: Blob): Promise<AudioBuffer>;
export declare function melSpectrogram(y: Float32Array, params: SpecParams): Float32Array[];
export declare function powerToDb(spec: Float32Array[], amin?: number, topDb?: number): Float32Array[];
export declare function resampleAndMakeMono(audioBuffer: AudioBuffer, targetSr?: number): Promise<Float32Array>;
export declare function applyWindow(buffer: Float32Array, win: Float32Array): Float32Array;
export declare function padCenterToLength(data: Float32Array, length: number): Float32Array;
export declare function padConstant(data: Float32Array, padding: number | number[]): Float32Array;
export declare function frame(data: Float32Array, frameLength: number, hopLength: number): Float32Array[];
export declare function hannWindow(length: number): Float32Array;
export declare function midiToHz(notes: number): tf.Tensor<tf.Rank>;
export declare function hzToMidi(frequencies: number[]): Promise<number[]>;
