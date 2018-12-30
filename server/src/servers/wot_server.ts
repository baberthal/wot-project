//===- servers/wot_server.ts - WoT Server Class ----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Express } from "express";
import { Server as HttpServer } from "http";

import { BaseServer, BaseServerOptions } from "./base";
import { Logger } from "../util/logger";

export interface ServerOptions extends BaseServerOptions {
  app: Express;
  port?: number;
}

export class WotServer extends BaseServer<HttpServer, ServerOptions> {
  readonly app: Express;
  private _httpServer!: HttpServer;
  private _defaultPort?: number;

  get handle(): HttpServer {
    return this._httpServer;
  }

  constructor(options: ServerOptions) {
    super(options);
    this.app = options.app;
    this._defaultPort = options.port;
  }

  listen(port?: number, callback?: () => void) {
    port = port || this._defaultPort;

    if (!port) {
      throw new Error("ERROR: You must specify a port or provide a default!");
    }
    if (this._httpServer) {
      throw new Error("ERROR: Calling #listen, but already listening!");
    }

    this._httpServer = this.app.listen(port, () => {
      this.log.info(`WoT HTTP Server listening on port ${port}`);
      callback && callback();
    });
  }
}
