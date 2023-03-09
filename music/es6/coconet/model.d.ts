import { INoteSequence } from '../protobuf/index';
interface InfillMask {
    step: number;
    voice: number;
}
interface CoconetConfig {
    temperature?: number;
    numIterations?: number;
    infillMask?: InfillMask[];
}
declare class Coconet {
    private checkpointURL;
    private spec;
    private convnet;
    private initialized;
    constructor(checkpointURL: string);
    initialize(): Promise<void>;
    dispose(): void;
    isInitialized(): boolean;
    instantiateFromSpec(): void;
    infill(sequence: INoteSequence, config?: CoconetConfig): Promise<import("../protobuf/proto").tensorflow.magenta.NoteSequence>;
    private run;
    private getCompletionMaskFromInput;
    private getCompletionMask;
    private gibbs;
    private yaoSchedule;
    private bernoulliMask;
    private samplePredictions;
}
export { Coconet };
