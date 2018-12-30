//===- plugins/resources-plugin.ts - Resources fastify plugin --------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";

import {
  FastifyInstance,
  RegisterOptions,
  NextCallback as Next
} from "../util/types";
import resources from "../resources";

export interface PluginOptions extends RegisterOptions {}

function plugin(fastify: FastifyInstance, opts: PluginOptions, next: Next) {
  fastify.decorate("resources", resources);
  next();
}

export default fp(plugin);
