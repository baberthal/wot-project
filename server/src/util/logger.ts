//===- util/logger.ts - Logger Instance ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { isDevMode } from "@wot/core";
import * as pino from "pino";

export type LoggerOptions = pino.LoggerOptions;
export type Logger = pino.Logger;

const prettyPrint = isDevMode();

export function createLogger(options: LoggerOptions): Logger {
  return pino(options);
}

export default createLogger({
  prettyPrint
});
