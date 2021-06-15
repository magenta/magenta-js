export const fetch = require('node-fetch');
export const performance = require('./performance_node');
export const navigator = require('./navigator_node');
export function isSafari() {
    throw new Error('Cannot check if Safari in Node.js');
}
export function getOfflineAudioContext(sampleRate) {
    throw new Error('Cannot use offline audio context in Node.js');
}
//# sourceMappingURL=global_node.js.map