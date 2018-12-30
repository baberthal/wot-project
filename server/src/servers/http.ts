//===- servers/http.ts - HTTP Server ---------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fastify from "fastify";
import * as cors from "fastify-cors";

import ledPlugin from "../plugins/led-plugin";
import linksPlugin from "../plugins/links-plugin";
import resourcesPlugin from "../plugins/resources-plugin";

import routes from "../routes";
import logger from "../util/logger";

export function createApp() {
  const app = fastify({ logger });

  app.register(cors);
  app.register(resourcesPlugin);
  app.register(linksPlugin);
  app.register(ledPlugin, { params: { simulate: true, frequency: 2000 } });

  app.register(routes);

  return app;
}

export default createApp;
