//===- types.d.ts - Misc Type Definitions and References -------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

declare module "pigpio-mock" {
  import pigpio = require("pigpio");
  export = pigpio;
}

declare module "pino-caller" {
  /* tslint:disable-next-line */
  import pino = require("pino");
  function callsite(p: pino.Logger): pino.Logger;
  export = callsite;
}
