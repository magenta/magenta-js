export declare abstract class MetronomeCallbackObject {
    abstract click(time: number, index: number): void;
    abstract quarter(time: number, index: number): void;
    abstract bar(time: number, index: number): void;
}
export declare class Metronome {
    clicksPerQuarter: number;
    muted: boolean;
    protected loClick: any;
    protected hiClick: any;
    protected loClickNote: string;
    protected hiClickNote: string;
    private ticking;
    private startedAt;
    private step;
    private callbackObject;
    constructor(callbackObject: MetronomeCallbackObject, clicksPerQuarter?: number);
    isTicking(): boolean;
    getStartedAt(): number;
    getOffsetTime(): number;
    start(bpm?: number): void;
    stop(): void;
    private reset;
}
