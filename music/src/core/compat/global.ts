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
 * This file acts as a stand-in used during development to ensure type safety
 * and proper use of global functions/objects. We use webpack to swap it out
 * with the `global_browser` and `global_node` files that export proper code
 * for the various global functions/objects
 */
const isNode = typeof global !== 'undefined';

export interface Performance {
  now(): number;
  timing: {
    navigationStart: number;
  };
}

// tslint:disable:no-require-imports
export const fetch: typeof window.fetch = isNode ? require('node-fetch') : window.fetch.bind(window);
export const performance: Performance = isNode ? require('./performance_node') : window.performance;
export const navigator = isNode ? require('./navigator_node') : window.navigator;

export { isSafari, getOfflineAudioContext } from './global_browser';
