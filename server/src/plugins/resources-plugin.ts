//===- plugins/resources-plugin.ts - Resources fastify plugin --------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";

import resources from "../resources";
import {
  FastifyInstance,
  NextCallback as Next,
  RegisterOptions
} from "../util/types";

export interface PluginOptions extends RegisterOptions {}

function plugin(fastify: FastifyInstance, opts: PluginOptions, next: Next) {
  fastify.decorate("resources", resources);
  next();
}

export default fp(plugin);
