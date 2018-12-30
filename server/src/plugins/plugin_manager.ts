//===- plugins/plugin_manager.ts - Plugin manager class --------------------===//
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
import { BasePlugin } from "./base_plugin";

export class PluginManager {
  private _onCloseCallbacks: (() => void)[] = [];

  onClose(cb: () => void) {
    this._onCloseCallbacks.push(cb);
  }

  runCloseCallbacks() {
    this._onCloseCallbacks.forEach(cb => cb());
  }
}

const manager = new PluginManager();

function plugin(fastify: FastifyInstance, opts: RegisterOptions, next: Next) {
  fastify.decorate("wotPluginManager", manager);

  next();
}

export default fp(plugin);
