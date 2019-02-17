//===- util/logger.ts - Logger Instance ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { isDevMode, isTestMode } from "@baberthal/wot-core";
import { join, resolve } from "path";
import * as pino from "pino";

export type DestinationStream = pino.DestinationStream;
export type Logger = pino.Logger;
export type LoggerOptions = pino.LoggerOptions;

export const DEFAULT_LOG_DIR = resolve(__dirname, "../../log");

const prettyPrint = isDevMode() && !isTestMode();

export function createLogger(
  options: LoggerOptions,
  destination?: DestinationStream
): Logger {
  const opts = Object.assign({}, { prettyPrint }, options);

  if (isTestMode()) {
    destination = pino.destination(join(DEFAULT_LOG_DIR, "test.log"));
  }

  if (destination) {
    return pino(opts, destination);
  }
  return pino(opts);
}

export default createLogger({
  prettyPrint
});
