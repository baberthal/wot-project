//===- gpio/logger.ts - GPIO Shared logger Instance ------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/// <reference path="../types.d.ts" />

import callsite = require("pino-caller");

import { createLogger } from "../util/logger";

export default callsite(
  createLogger({
    name: "gpio",
    level: "debug"
  })
);
