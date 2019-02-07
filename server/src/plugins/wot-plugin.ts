//===- plugins/wot-plugin.ts - WoT Plugin (Hardware, etc.) -----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";

import { FastifyInstance, NextCallback, RegisterOptions } from "../util/types";

import { WotManager, WotManagerInit } from "./wot_manager";

export interface PluginOptions extends RegisterOptions {
  wot?: WotManagerInit;
}

function wotPlugin(
  fastify: FastifyInstance,
  options: PluginOptions,
  next: NextCallback
) {
  const manager = new WotManager(options.wot);
  fastify.decorate("wotManager", manager);
}
