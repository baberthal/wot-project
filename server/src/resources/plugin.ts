//===- resources/plugin.ts - Fastify Plugin for Resources Module -----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";

import { Resources, ResourcesConfig } from "../resources";
import {
  FastifyInstance,
  NextCallback as Next,
  RegisterOptions
} from "../util/types";

export interface PluginOptions extends RegisterOptions {
  resources?: Resources;
  resourcesConfig?: ResourcesConfig;
}

function plugin(fastify: FastifyInstance, opts: PluginOptions, next: Next) {
  const resourcesConfig = opts.resourcesConfig || ResourcesConfig.Default;
  const resources = opts.resources || new Resources(resourcesConfig);

  delete opts.resourcesConfig;
  delete opts.resources;

  fastify.decorate("resources", resources);
  next();
}

export default fp(plugin);
