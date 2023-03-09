export declare const enum Level {
    NONE = 0,
    WARN = 5,
    INFO = 10,
    DEBUG = 20
}
export declare let verbosity: Level;
export declare function setVerbosity(verbosity: Level): void;
export declare function log(msg: string, prefix?: string, level?: Level): void;
export declare function logWithDuration(msg: string, startTime: number, prefix?: string, level?: Level): void;
