/**
 * A module containing a metronome based on Tone.js. The timing is done
 * using the underlying WebAudio clock, so it is accurate, and the metronome
 * fires callbacks for every audible click, quarter and bar marks.
 *
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Attempts to determine which global object to use, depending on whether or
 * note the script is being used in a browser, web worker, or other context.
 */
function getGlobalObject() {
  // tslint:disable-next-line:max-line-length
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
  if (typeof globalThis !== 'undefined') { return globalThis; }
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('cannot find the global object');
}

const globalObject = getGlobalObject();

export const fetch = globalObject.fetch.bind(globalObject);
export const performance = globalObject.performance;
export const navigator = globalObject.navigator;

// tslint:disable:no-any
export const isSafari = !!(globalObject as any).webkitOfflineAudioContext;
// tslint:disable-next-line:no-any variable-name
const isWorker = typeof (globalObject as any).WorkerGlobalScope !== 'undefined';

export function getOfflineAudioContext(sampleRate: number): OfflineAudioContext {
  // Safari Webkit only supports 44.1kHz audio.
  const WEBKIT_SAMPLE_RATE = 44100;
  sampleRate = isSafari ? WEBKIT_SAMPLE_RATE : sampleRate;

  if (isWorker) {
    throw new Error('Cannot use offline audio context in a web worker.');
  }

  // tslint:disable-next-line:no-any variable-name
  const SafariOfflineCtx = (globalObject as any).webkitOfflineAudioContext;
  return isSafari ? new SafariOfflineCtx(1, sampleRate, sampleRate) :
    new globalObject.OfflineAudioContext(1, sampleRate, sampleRate);
}
