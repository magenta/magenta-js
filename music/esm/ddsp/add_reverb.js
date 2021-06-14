import * as Tone from 'tone';
import { arrayBufferToAudioBuffer } from './buffer_utils';
export async function addReverb({ audioCtx, arrayBuffer, sampleRate, }) {
    Tone.setContext(audioCtx);
    let bufferWithReverb;
    let resampledAudioBuffer = arrayBufferToAudioBuffer(audioCtx, arrayBuffer, sampleRate);
    const renderingPromise = Tone.Offline(() => {
        const limiter = new Tone
            .Compressor({
            attack: 0.001,
            release: 0.001,
            threshold: -6,
        })
            .toDestination();
        const reverb = new Tone
            .Reverb({
            wet: 0.3,
            decay: 3,
        })
            .connect(limiter);
        const filter = new Tone.Filter(8000, 'lowpass', -24).connect(reverb);
        const player = new Tone
            .Player({
            url: resampledAudioBuffer,
        })
            .connect(filter);
        player.start();
        return reverb.ready;
    }, arrayBuffer.length / sampleRate);
    bufferWithReverb = await renderingPromise;
    const bufferWithReverbData = bufferWithReverb.getChannelData(0);
    resampledAudioBuffer = null;
    bufferWithReverb.dispose();
    bufferWithReverb = null;
    return bufferWithReverbData;
}
//# sourceMappingURL=add_reverb.js.map