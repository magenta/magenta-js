import '@tensorflow/tfjs-backend-webgl';
import { AudioFeatures, ModelValues } from './interfaces';
declare class DDSP {
    private initialized;
    private checkpointUrl;
    private model;
    private settings;
    constructor(checkpointUrl: string, settings?: ModelValues);
    initialize(): Promise<void>;
    dispose(): void;
    isInitialized(): boolean;
    memCheck(): Promise<boolean>;
    synthesize(audioFeatures: AudioFeatures, settings?: ModelValues): Promise<Float32Array>;
}
export { DDSP };
