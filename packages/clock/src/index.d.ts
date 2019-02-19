export interface Timespec {
    sec: number;
    nsec: number;
}
export declare const REALTIME: number;
export declare const MONOTONIC: number;
export declare function gettime(clockid?: number): Timespec;
export declare namespace gettime {
    var bigint: (clockid?: number) => bigint;
}
export declare function getres(clockid?: number): Timespec;
export declare namespace getres {
    var bigint: (clockid?: number) => bigint;
}
export declare function monotonic(): Timespec;
export declare namespace monotonic {
    var bigint: () => bigint;
}
//# sourceMappingURL=index.d.ts.map