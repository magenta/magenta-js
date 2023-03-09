import * as tf from '@tensorflow/tfjs';
import { NoteSequence } from '../protobuf/index';
export declare function batchInput(input: number[][], batchLength: number): tf.Tensor3D;
export declare function unbatchOutput(batches: tf.Tensor3D, batchLength: number, totalLength: number): tf.Tensor3D;
export declare function pianorollToNoteSequence(frameProbs: tf.Tensor2D, onsetProbs: tf.Tensor2D, velocityValues: tf.Tensor2D, onsetThreshold?: number, frameThreshold?: number): Promise<NoteSequence>;
