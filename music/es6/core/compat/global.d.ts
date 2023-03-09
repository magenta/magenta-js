export interface Performance {
    now(): number;
    timing: {
        navigationStart: number;
    };
}
export declare const fetch: typeof window.fetch;
export declare const performance: Performance;
export declare const navigator: any;
export { isSafari, getOfflineAudioContext } from './global_browser';
