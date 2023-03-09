import { AudioFeatures } from '../ddsp/interfaces';
declare class SPICE {
    private initialized;
    private modelUrl;
    private spiceModel;
    constructor(modelUrl?: string);
    initialize(): Promise<void>;
    getAudioFeatures(inputAudioBuffer: AudioBuffer, confidenceThreshold?: number): Promise<AudioFeatures>;
    dispose(): void;
    isInitialized(): boolean;
}
export { SPICE };
