import { getAudioFeatures, startSpice } from './spice';
const TFHUB_SPICE_MODEL_URL = 'https://tfhub.dev/google/tfjs-model/spice/2/default/1';
class SPICE {
    constructor(modelUrl) {
        if (modelUrl) {
            this.modelUrl = modelUrl;
        }
        else {
            this.modelUrl = TFHUB_SPICE_MODEL_URL;
        }
    }
    async initialize() {
        this.spiceModel = await startSpice(this.modelUrl);
        this.initialized = true;
    }
    async getAudioFeatures(inputAudioBuffer, confidenceThreshold) {
        return await getAudioFeatures(inputAudioBuffer, this.spiceModel, confidenceThreshold);
    }
    dispose() {
        if (!this.initialized) {
            return;
        }
        this.spiceModel.dispose();
        this.initialized = false;
    }
    isInitialized() {
        return this.initialized;
    }
}
export { SPICE };
//# sourceMappingURL=model.js.map