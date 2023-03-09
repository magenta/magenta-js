import { INoteSequence, NoteSequence } from '../protobuf/index';
export interface VisualizerConfig {
    noteHeight?: number;
    noteSpacing?: number;
    pixelsPerTimeStep?: number;
    noteRGB?: string;
    activeNoteRGB?: string;
    minPitch?: number;
    maxPitch?: number;
}
export declare abstract class BaseVisualizer {
    noteSequence: INoteSequence;
    protected config: VisualizerConfig;
    protected height: number;
    protected width: number;
    protected parentElement: HTMLElement;
    abstract redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number;
    protected abstract clear(): void;
    abstract clearActiveNotes(): void;
    constructor(sequence: INoteSequence, config?: VisualizerConfig);
    protected updateMinMaxPitches(noExtraPadding?: boolean): void;
    protected getSize(): {
        width: number;
        height: number;
    };
    protected getNotePosition(note: NoteSequence.INote, noteIndex: number): {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    protected scrollIntoViewIfNeeded(scrollIntoView: boolean, activeNotePosition: number): void;
    protected getNoteStartTime(note: NoteSequence.INote): number;
    protected getNoteEndTime(note: NoteSequence.INote): number;
    protected isPaintingActiveNote(note: NoteSequence.INote, playedNote: NoteSequence.INote): boolean;
}
export declare class PianoRollCanvasVisualizer extends BaseVisualizer {
    protected ctx: CanvasRenderingContext2D;
    constructor(sequence: INoteSequence, canvas: HTMLCanvasElement, config?: VisualizerConfig);
    redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number;
    protected clear(): void;
    clearActiveNotes(): void;
    private redrawNote;
}
export declare class Visualizer extends PianoRollCanvasVisualizer {
    constructor(sequence: INoteSequence, canvas: HTMLCanvasElement, config?: VisualizerConfig);
}
export declare abstract class BaseSVGVisualizer extends BaseVisualizer {
    protected svg: SVGSVGElement;
    protected drawn: boolean;
    constructor(sequence: INoteSequence, config?: VisualizerConfig);
    redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number;
    protected fillActiveRect(el: Element, note: NoteSequence.INote): void;
    protected unfillActiveRect(svg: SVGSVGElement): void;
    protected draw(): void;
    private getNoteFillColor;
    private drawNote;
    protected clear(): void;
    clearActiveNotes(): void;
}
export declare class PianoRollSVGVisualizer extends BaseSVGVisualizer {
    constructor(sequence: INoteSequence, svg: SVGSVGElement, config?: VisualizerConfig);
}
export interface WaterfallVisualizerConfig extends VisualizerConfig {
    whiteNoteHeight?: number;
    whiteNoteWidth?: number;
    blackNoteHeight?: number;
    blackNoteWidth?: number;
    showOnlyOctavesUsed?: boolean;
}
export declare class WaterfallSVGVisualizer extends BaseSVGVisualizer {
    private NOTES_PER_OCTAVE;
    private WHITE_NOTES_PER_OCTAVE;
    private LOW_C;
    private firstDrawnOctave;
    private lastDrawnOctave;
    protected svgPiano: SVGSVGElement;
    protected config: WaterfallVisualizerConfig;
    constructor(sequence: INoteSequence, parentElement: HTMLDivElement, config?: WaterfallVisualizerConfig);
    private setupDOM;
    redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number;
    protected getSize(): {
        width: number;
        height: number;
    };
    protected getNotePosition(note: NoteSequence.INote, noteIndex: number): {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    private drawPiano;
    private drawWhiteKey;
    private drawBlackKey;
    clearActiveNotes(): void;
}
export declare enum ScrollType {
    PAGE = 0,
    NOTE = 1,
    BAR = 2
}
export interface StaffSVGVisualizerConfig extends VisualizerConfig {
    defaultKey?: number;
    instruments?: number[];
    scrollType?: ScrollType;
}
export declare class StaffSVGVisualizer extends BaseVisualizer {
    private render;
    private instruments;
    private drawnNotes;
    constructor(sequence: INoteSequence, div: HTMLDivElement, config?: StaffSVGVisualizerConfig);
    protected clear(): void;
    redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number;
    private isNoteInInstruments;
    private timeToQuarters;
    private getNoteInfo;
    private getScoreInfo;
    clearActiveNotes(): void;
}
