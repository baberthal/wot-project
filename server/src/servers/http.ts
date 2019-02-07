//===- servers/http.ts - HTTP Server ---------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { isDevMode } from "@wot/core";
import * as fastify from "fastify";
import * as cors from "fastify-cors";

import ledPlugin from "../plugins/led-plugin";
import linksPlugin from "../plugins/links-plugin";
import pirPlugin from "../plugins/pir-plugin";
import pluginManager from "../plugins/plugin_manager";
import resourcesPlugin from "../resources/plugin";
import routes from "../routes";
import logger from "../util/logger";

export function createApp() {
  const app = fastify({ logger });

  const simulate = isDevMode();

  app.register(cors);
  app.register(resourcesPlugin);
  app.register(linksPlugin);

  app.register(pluginManager);
  app.register(ledPlugin, { params: { simulate, frequency: 2000 } });
  app.register(pirPlugin, { params: { simulate, frequency: 2000 } });

  app.register(routes);

  return app;
}

export default createApp;
