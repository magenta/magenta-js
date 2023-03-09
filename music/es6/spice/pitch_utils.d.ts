import * as tf from '@tensorflow/tfjs';
import { AudioData } from '../ddsp/interfaces';
declare function shiftF0(f0Hz: number[], f0OctaveShift?: number): tf.Tensor<tf.Rank>;
declare function upsample_linear(buffer: number[], newSampleRateLength: number): number[];
declare function upsample_f0(buffer: number[], newSampleRateLength: number, modelMaxFrameLength: number): number[];
declare function getPitches(spiceModel: tf.GraphModel, inputData: AudioData, confidenceThreshold?: number): Promise<{
    pitches: number[];
    confidences: number[];
}>;
export { getPitches, shiftF0, upsample_f0, upsample_linear };
