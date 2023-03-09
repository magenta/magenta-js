/// <reference types="webmidi" />
import { INoteSequence, NoteSequence } from '../protobuf/index';
export declare abstract class BasePlayerCallback {
    abstract run(n: NoteSequence.INote, t?: number): void;
    abstract stop(): void;
}
export declare abstract class BasePlayer {
    protected currentPart: any;
    protected scheduledStop: number;
    protected playClick: boolean;
    protected callbackObject: BasePlayerCallback;
    protected desiredQPM: number;
    protected abstract playNote(time: number, note: NoteSequence.INote): void;
    constructor(playClick?: boolean, callbackObject?: BasePlayerCallback);
    setTempo(qpm: number): void;
    private makeClickSequence;
    resumeContext(): void;
    start(seq: INoteSequence, qpm?: number, offset?: number): Promise<void>;
    stop(): void;
    pause(): void;
    resume(): void;
    seekTo(seconds: number): void;
    isPlaying(): boolean;
    getPlayState(): any;
}
export declare class Player extends BasePlayer {
    private drumKit;
    private bassSynth;
    private polySynth;
    static readonly tone: any;
    protected playNote(time: number, note: NoteSequence.INote): void;
    private getSynth;
}
export declare class SoundFontPlayer extends BasePlayer {
    private soundFont;
    private output;
    private programOutputs;
    private drumOutputs;
    constructor(soundFontURL: string, output?: any, programOutputs?: Map<number, any>, drumOutputs?: Map<number, any>, callbackObject?: BasePlayerCallback);
    loadSamples(seq: INoteSequence): Promise<void>;
    loadAllSamples(program?: number, isDrum?: boolean): Promise<void>;
    resumeContext(): void;
    start(seq: INoteSequence, qpm?: number, offset?: number): Promise<void>;
    protected playNote(time: number, note: NoteSequence.INote): void;
    playNoteDown(note: NoteSequence.INote): void;
    playNoteUp(note: NoteSequence.INote): void;
    getAudioNodeOutput(note: NoteSequence.INote): any;
}
export declare class PlayerWithClick extends Player {
    constructor(callbackObject?: BasePlayerCallback);
}
export declare class MIDIPlayer extends BasePlayer {
    outputs: WebMidi.MIDIOutput[];
    outputChannel: number;
    readonly availableOutputs: WebMidi.MIDIOutput[];
    private NOTE_ON;
    private NOTE_OFF;
    constructor(callbackObject?: BasePlayerCallback);
    requestMIDIAccess(): Promise<unknown>;
    private initOutputs;
    protected playNote(time: number, note: NoteSequence.INote): void;
    private sendMessageToOutput;
    playNoteDown(note: NoteSequence.INote): void;
    playNoteUp(note: NoteSequence.INote): void;
}
