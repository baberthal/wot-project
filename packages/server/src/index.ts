//===- index.ts - Main Entry Point -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { isDevMode } from "@baberthal/wot-core";

import { loadConfig } from "./resources/config";
import createApp from "./servers/http";
// import logger from "./util/logger";
// import { WebSocketServer } from "./servers/ws_server";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function main() {
  const config = await loadConfig("host-config.json");
  const app = createApp(config);

  app.listen(port, "0.0.0.0", (err, address) => {
    if (err) {
      app.log.error(err);
    }
    app.log.info(`app is up and running on ${address}`);

    if (isDevMode()) {
      app.log.info("### Routes:", app.printRoutes(), "###");
    }
  });
}

main();
