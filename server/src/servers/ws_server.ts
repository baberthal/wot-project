//===- servers/ws_server.ts - WebSocket Server Implementation --------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Server as HttpServer } from "http";
import { Server as ws_Server, ServerOptions as ws_ServerOptions } from "ws";

import logger, { Logger } from "../util/logger";

import { BaseServer, BaseServerOptions } from "./base";

export interface ServerOptions extends BaseServerOptions, ws_ServerOptions {}

export class WebSocketServer extends BaseServer<ws_Server, ServerOptions> {
  private readonly wss: ws_Server;

  get handle(): ws_Server {
    return this.wss;
  }

  constructor(options: ServerOptions) {
    super(options);
    this.wss = new ws_Server(options);
    this.log.info("WebSocket server started...");
    this.wss.on("connection", (socket, req) => {
      this.log.info(`socket url: ${socket.url}`);
      this.log.info(`req url: ${req.url}`);
    });
  }

  static listen(server: HttpServer): WebSocketServer {
    return new WebSocketServer({ server, logger });
  }
}
