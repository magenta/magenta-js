import * as tf from '@tensorflow/tfjs';
import { AudioFeatures, ModelValues } from './interfaces';
declare function memCheck(): Promise<boolean>;
export declare function getModel(url: string): Promise<tf.GraphModel>;
declare function resizeAudioFeatures(audioFeatures: AudioFeatures, startingFrame: number, endingFrame: number, isLastChunks: boolean, resizedLength: number): Promise<AudioFeatures>;
declare function normalizeAudioFeatures(af: AudioFeatures, model: ModelValues): Promise<{
    f0_hz: number[];
    loudness_db: number[];
}>;
declare function convertSecsToFrame(secs: number): number;
declare function convertFrameToSecs(frameLength: number): number;
export { memCheck, convertSecsToFrame, convertFrameToSecs, normalizeAudioFeatures, resizeAudioFeatures, };
