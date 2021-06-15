import { performance } from '../core/compat/global';
export var Level;
(function (Level) {
    Level[Level["NONE"] = 0] = "NONE";
    Level[Level["WARN"] = 5] = "WARN";
    Level[Level["INFO"] = 10] = "INFO";
    Level[Level["DEBUG"] = 20] = "DEBUG";
})(Level || (Level = {}));
export let verbosity = 10;
export function setVerbosity(verbosity) {
    verbosity = verbosity;
}
export function log(msg, prefix = 'Magenta.js', level = 10) {
    if (level === 0) {
        throw Error('Logging level cannot be NONE.');
    }
    if (verbosity >= level) {
        const logMethod = level === 5 ? console.warn : console.log;
        logMethod(`%c ${prefix} `, 'background:magenta; color:white', msg);
    }
}
export function logWithDuration(msg, startTime, prefix = 'Magenta.js', level = 10) {
    const durationSeconds = (performance.now() - startTime) / 1000;
    log(`${msg} in ${durationSeconds.toPrecision(3)}s`, prefix, level);
}
//# sourceMappingURL=logging.js.map