//===- index.ts - Main entry point -----------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

interface pclock_native {
  REALTIME: number;
  MONOTONIC: number;

  clock_gettime(clockid: number): Timespec;
  clock_gettime_bigint(clockid: number): bigint;
  clock_getres(clockid: number): Timespec;
  clock_getres_bigint(clockid: number): bigint;
}

export interface Timespec {
  sec: number;
  nsec: number;
}

import bindings = require("bindings");

const native: pclock_native = bindings("pclock");

export const REALTIME = native.REALTIME;
export const MONOTONIC = native.MONOTONIC;

export function gettime(clockid: number = REALTIME): Timespec {
  return native.clock_gettime(clockid);
}

gettime.bigint = function(clockid: number = REALTIME): bigint {
  return native.clock_gettime_bigint(clockid);
};

export function getres(clockid: number = REALTIME): Timespec {
  return native.clock_getres(clockid);
}

getres.bigint = function(clockid: number = REALTIME): bigint {
  return native.clock_getres_bigint(clockid);
};

export function monotonic(): Timespec {
  return gettime(MONOTONIC);
}

monotonic.bigint = function(): bigint {
  return gettime.bigint(MONOTONIC);
};
