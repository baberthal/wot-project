//===- util/logger.ts - Logger Instance ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as pino from "pino";

import isDevMode from "./dev-mode";

export type LoggerOptions = pino.LoggerOptions;
export type Logger = pino.Logger;

const prettyPrint = isDevMode();

export function createLogger(options: LoggerOptions): Logger {
  return pino(options);
}

export default createLogger({
  prettyPrint
});
