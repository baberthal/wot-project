//===- plugins/types.d.ts - Types for this plugin --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/// <reference types="fastify" />

import { Resources } from "../resources/resources";
import { LinksConfig } from "./links-plugin";
import { PluginManager } from "./plugin_manager";

declare module "fastify" {
  interface FastifyInstance {
    resources: Resources;
    wotPluginManager: PluginManager;
  }

  interface FastifyRequest<HttpRequest> {}

  interface FastifyReply<HttpResponse> {
    links(config: LinksConfig): this;
  }
}
