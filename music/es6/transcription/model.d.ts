import { INoteSequence } from '../protobuf/index';
declare class OnsetsAndFrames {
    private checkpointURL;
    chunkLength: number;
    private initialized;
    private onsetsCnn;
    private onsetsRnn;
    private activationCnn;
    private frameRnn;
    private velocityCnn;
    constructor(checkpointURL: string, chunkLength?: number);
    initialize(): Promise<void>;
    dispose(): void;
    isInitialized(): boolean;
    transcribeFromMelSpec(melSpec: number[][], parallelBatches?: number): Promise<INoteSequence>;
    transcribeFromAudioBuffer(audioBuffer: AudioBuffer, batchSize?: number): Promise<INoteSequence>;
    transcribeFromAudioFile(blob: Blob): Promise<INoteSequence>;
    transcribeFromAudioURL(url: string): Promise<INoteSequence>;
    private processBatches;
    private build;
}
export { OnsetsAndFrames };
