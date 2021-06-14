import { melSpectrogram, powerToDb, resampleAndMakeMono } from '../core/audio_utils';
import { MEL_SPEC_BINS, SAMPLE_RATE, SPEC_HOP_LENGTH } from './constants';
export async function preprocessAudio(audioBuffer) {
    const resampledMonoAudio = await resampleAndMakeMono(audioBuffer);
    return powerToDb(melSpectrogram(resampledMonoAudio, {
        sampleRate: SAMPLE_RATE,
        hopLength: SPEC_HOP_LENGTH,
        nMels: MEL_SPEC_BINS,
        nFft: 2048,
        fMin: 30,
    }));
}
//# sourceMappingURL=audio_utils.js.map