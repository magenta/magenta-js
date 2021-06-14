const isNode = typeof global !== 'undefined' && typeof global.process !== 'undefined';
export const fetch = isNode ? require('node-fetch') : window.fetch.bind(window);
export const performance = isNode ? require('./performance_node') : window.performance;
export const navigator = isNode ? require('./navigator_node') : window.navigator;
export { isSafari, getOfflineAudioContext } from './global_browser';
//# sourceMappingURL=global.js.map