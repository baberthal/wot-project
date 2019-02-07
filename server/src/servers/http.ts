//===- servers/http.ts - HTTP Server ---------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { isDevMode } from "@wot/core";
import * as fastify from "fastify";
import * as cors from "fastify-cors";

import db from "../db";
import dbPlugin from "../db/plugin";
import pirPlugin from "../plugins/pir-plugin";
import pluginManager from "../plugins/plugin_manager";
import resourcesPlugin from "../resources/plugin";
import routes from "../routes";
import logger from "../util/logger";

export function createApp() {
  const app = fastify({ logger });

  const simulate = isDevMode();

  app.register(cors);
  app.register(dbPlugin, { instance: db });
  app.register(resourcesPlugin);

  app.register(pluginManager);
  // app.register(pirPlugin, { params: { simulate, frequency: 2000 } });

  app.register(routes);

  app.ready(err => {
    if (err) {
      app.log.error(err);
    } else {
      app.log.info("Ready to go!");
    }
  });

  return app;
}

export default createApp;
