import * as tf from '@tensorflow/tfjs';
declare class PianoGenieBase {
    private checkpointURL;
    private initialized;
    private modelVars;
    private decLSTMCells;
    private decForgetBias;
    private lastState;
    private button;
    constructor(checkpointURL: string);
    isInitialized(): boolean;
    initialize(staticVars?: tf.NamedTensorMap): Promise<void>;
    protected getRnnInputFeats(): tf.Tensor1D;
    next(button: number, temperature?: number, seed?: number): number;
    nextFromKeyList(button: number, keyList: number[], temperature?: number, seed?: number): number;
    nextFromKeyWhitelist(button: number, keyList: number[], temperature?: number, seed?: number): number;
    nextWithCustomSamplingFunction(button: number, sampleFunc: (logits: tf.Tensor1D) => tf.Scalar): number;
    private evaluateModelAndSample;
    resetState(): void;
    dispose(): void;
}
declare class PianoGenieAutoregressiveDeltaTime extends PianoGenieBase {
    private lastOutput;
    private lastTime;
    private time;
    private deltaTimeOverride;
    protected getRnnInputFeats(): tf.Tensor1D;
    nextWithCustomSamplingFunction(button: number, sampleFunc: (logits: tf.Tensor1D) => tf.Scalar): number;
    overrideLastOutput(lastOutput: number): void;
    overrideDeltaTime(deltaTime: number): void;
    resetState(): void;
}
declare enum PitchClass {
    None = 0,
    C = 1,
    Cs = 2,
    D = 3,
    Eb = 4,
    E = 5,
    F = 6,
    Fs = 7,
    G = 8,
    Ab = 9,
    A = 10,
    Bb = 11,
    B = 12
}
declare enum ChordFamily {
    None = 0,
    Maj = 1,
    Min = 2,
    Aug = 3,
    Dim = 4,
    Seven = 5,
    Maj7 = 6,
    Min7 = 7,
    Min7b5 = 8
}
declare class PianoGenieAutoregressiveDeltaTimeChord extends PianoGenieAutoregressiveDeltaTime {
    private chordRoot;
    private chordFamily;
    protected getRnnInputFeats(): tf.Tensor1D;
    setChordRoot(chordRoot: PitchClass): void;
    setChordFamily(chordFamily: ChordFamily): void;
    resetState(): void;
}
declare class PianoGenieAutoregressiveDeltaTimeKeysig extends PianoGenieAutoregressiveDeltaTime {
    private keySignature;
    protected getRnnInputFeats(): tf.Tensor1D;
    setKeySignature(keySignature: PitchClass): void;
    resetState(): void;
}
declare class PianoGenieAutoregressiveDeltaTimeKeysigChord extends PianoGenieAutoregressiveDeltaTimeKeysig {
    private chordRoot;
    private chordFamily;
    protected getRnnInputFeats(): tf.Tensor1D;
    setChordRoot(chordRoot: PitchClass): void;
    setChordFamily(chordFamily: ChordFamily): void;
    resetState(): void;
}
declare class PianoGenieAutoregressiveDeltaTimeKeysigChordFamily extends PianoGenieAutoregressiveDeltaTimeKeysig {
    private chordFamily;
    protected getRnnInputFeats(): tf.Tensor1D;
    setChordFamily(chordFamily: ChordFamily): void;
    resetState(): void;
}
declare class PianoGenie extends PianoGenieAutoregressiveDeltaTime {
}
declare class PianoGenieChord extends PianoGenieAutoregressiveDeltaTimeChord {
}
declare class PianoGenieKeysig extends PianoGenieAutoregressiveDeltaTimeKeysig {
}
declare class PianoGenieKeysigChord extends PianoGenieAutoregressiveDeltaTimeKeysigChord {
}
declare class PianoGenieKeysigChordFamily extends PianoGenieAutoregressiveDeltaTimeKeysigChordFamily {
}
export { PianoGenie, PianoGenieChord, PianoGenieKeysig, PianoGenieKeysigChord, PianoGenieKeysigChordFamily, PitchClass, ChordFamily };
