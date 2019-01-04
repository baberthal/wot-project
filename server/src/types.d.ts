//===- types.d.ts - Misc Type Definitions and References -------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/// <reference types="node" />

import * as express from "express";
import { Logger } from "pino";

declare module "express" {
  interface Request {
    log: Logger;
  }

  interface Express {
    log: Logger;
  }
}
