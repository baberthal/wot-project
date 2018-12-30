//===- index.ts - Main Entry Point -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import app from "./servers/http";
import logger from "./util/logger";
import { WebSocketServer } from "./servers/ws_server";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const options = {
  app,
  logger,
  port
};

async function main() {
  const server = app.listen(port, () => {
    logger.info(`app is up and running on :${port}`);
    WebSocketServer.listen(server);
  });
}

main();
