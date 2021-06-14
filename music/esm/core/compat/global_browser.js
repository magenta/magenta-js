function getGlobalObject() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('cannot find the global object');
}
const globalObject = getGlobalObject();
export const fetch = globalObject.fetch.bind(globalObject);
export const performance = globalObject.performance;
export const navigator = globalObject.navigator;
export const isSafari = !!globalObject.webkitOfflineAudioContext;
const isWorker = typeof globalObject.WorkerGlobalScope !== 'undefined';
export function getOfflineAudioContext(sampleRate) {
    const WEBKIT_SAMPLE_RATE = 44100;
    sampleRate = isSafari ? WEBKIT_SAMPLE_RATE : sampleRate;
    if (isWorker) {
        throw new Error('Cannot use offline audio context in a web worker.');
    }
    const SafariOfflineCtx = globalObject.webkitOfflineAudioContext;
    return isSafari ? new SafariOfflineCtx(1, sampleRate, sampleRate) :
        new globalObject.OfflineAudioContext(1, sampleRate, sampleRate);
}
//# sourceMappingURL=global_browser.js.map