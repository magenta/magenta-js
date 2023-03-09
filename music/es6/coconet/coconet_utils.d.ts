import * as tf from '@tensorflow/tfjs-core';
import { INoteSequence, NoteSequence } from '../protobuf/index';
export declare const IS_IOS: boolean;
export declare const NUM_PITCHES = 46;
export declare const MIN_PITCH = 36;
export declare const NUM_VOICES = 4;
export declare function pianorollToSequence(pianoroll: tf.Tensor4D, numberOfSteps: number): NoteSequence;
export declare function sequenceToPianoroll(ns: INoteSequence, numberOfSteps: number): tf.Tensor4D;
