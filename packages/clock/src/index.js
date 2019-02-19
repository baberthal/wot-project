"use strict";
//===- index.ts - Main entry point -----------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//
Object.defineProperty(exports, "__esModule", { value: true });
const bindings = require("bindings");
const native = bindings("pclock");
exports.REALTIME = native.REALTIME;
exports.MONOTONIC = native.MONOTONIC;
function gettime(clockid = exports.REALTIME) {
    return native.clock_gettime(clockid);
}
exports.gettime = gettime;
gettime.bigint = function (clockid = exports.REALTIME) {
    return native.clock_gettime_bigint(clockid);
};
function getres(clockid = exports.REALTIME) {
    return native.clock_getres(clockid);
}
exports.getres = getres;
getres.bigint = function (clockid = exports.REALTIME) {
    return native.clock_getres_bigint(clockid);
};
function monotonic() {
    return gettime(exports.MONOTONIC);
}
exports.monotonic = monotonic;
monotonic.bigint = function () {
    return gettime.bigint(exports.MONOTONIC);
};
//# sourceMappingURL=index.js.map