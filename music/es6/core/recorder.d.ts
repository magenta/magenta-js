/// <reference types="webmidi" />
import { NoteSequence } from '../protobuf/index';
interface RecorderConfig {
    qpm?: number;
    playClick?: boolean;
    playCountIn?: boolean;
    startRecordingAtFirstNote?: boolean;
}
export declare abstract class BaseRecorderCallback {
    abstract run(seq: NoteSequence): void;
    abstract noteOn(pitch: number, velocity: number, device: EventTarget): void;
    abstract noteOff(pitch: number, velocity: number, device: EventTarget): void;
}
export declare class Recorder {
    callbackObject: BaseRecorderCallback;
    private config;
    private recording;
    private firstNoteTimestamp;
    private notes;
    private onNotes;
    private midiInputs;
    private startRecordingAtFirstNote;
    private loClick;
    private hiClick;
    private clickLoop;
    constructor(config?: RecorderConfig, callbackObject?: BaseRecorderCallback);
    initialize(): Promise<void>;
    private midiReady;
    isRecording(): boolean;
    setTempo(qpm: number): void;
    enablePlayClick(playClick: boolean): void;
    enablePlayCountIn(countIn: boolean): void;
    private initClickLoop;
    getMIDIInputs(): WebMidi.MIDIInput[];
    start(midiInputs?: WebMidi.MIDIInput[]): void;
    stop(): NoteSequence;
    getNoteSequence(): NoteSequence;
    reset(): NoteSequence;
    midiMessageReceived(event: WebMidi.MIDIMessageEvent): void;
    private noteOn;
    private noteOff;
}
export {};
