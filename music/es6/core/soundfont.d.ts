export interface SampleInfo {
    pitch: number;
    velocity: number;
}
export interface InstrumentSpec {
    name: string;
    minPitch: number;
    maxPitch: number;
    durationSeconds: number;
    releaseSeconds: number;
    percussive: boolean;
    velocities?: number[];
}
export declare class Instrument {
    private FADE_SECONDS;
    private readonly baseURL;
    private readonly buffers;
    private initialized;
    name: string;
    minPitch: number;
    maxPitch: number;
    durationSeconds: number;
    releaseSeconds: number;
    percussive: boolean;
    velocities?: number[];
    sourceMap: Map<number, any>;
    constructor(baseURL: string);
    initialize(): Promise<void>;
    private sampleInfoToName;
    private sampleNameToURL;
    private nearestVelocity;
    loadSamples(samples: SampleInfo[]): Promise<void>;
    playNote(pitch: number, velocity: number, startTime: number, duration: number, output: any): void;
    playNoteDown(pitch: number, velocity: number, output: any): void;
    playNoteUp(pitch: number, velocity: number, output: any): void;
    getBuffer(pitch: number, velocity: number): any;
}
export interface InstrumentInfo {
    program: number;
    isDrum: boolean;
}
export interface InstrumentsSpec {
    [program: number]: string;
    drums?: string;
}
export interface SoundFontSpec {
    name: string;
    instruments: InstrumentsSpec;
}
export declare class SoundFont {
    private readonly baseURL;
    private readonly instruments;
    private initialized;
    name: string;
    constructor(baseURL: string);
    initialize(): Promise<void>;
    loadSamples(samples: Array<InstrumentInfo & SampleInfo>): Promise<void>;
    playNote(pitch: number, velocity: number, startTime: number, duration: number, program: number, isDrum: boolean, output: any): void;
    playNoteDown(pitch: number, velocity: number, program: number, isDrum: boolean, output: any): void;
    playNoteUp(pitch: number, velocity: number, program: number, isDrum: boolean, output: any): void;
}
