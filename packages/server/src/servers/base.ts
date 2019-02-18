//===- servers/base.ts - Base Server Class ---------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Logger } from "../util/logger";

export interface BaseServerOptions {
  logger: Logger;
}

export abstract class BaseServer<
  ServerHandleT,
  OptionsT extends BaseServerOptions = BaseServerOptions
> {
  readonly log: Logger;
  abstract get handle(): ServerHandleT;

  constructor(options: OptionsT) {
    this.log = options.logger;
  }
}
