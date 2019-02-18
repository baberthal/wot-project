//===- plugins/dht22-plugin.ts - DHT22 Plugin ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";

// import resources from "../resources";
import { FastifyInstance, NextCallback, RegisterOptions } from "../util/types";

interface PluginOptions extends RegisterOptions {
  params?: {
    simulate: boolean;
    frequency: number;
  };
}

function dht22Plugin(
  fastify: FastifyInstance,
  options: PluginOptions,
  next: NextCallback
) {
  const params = options.params || { simulate: false, frequency: 5000 };
  let interval: NodeJS.Timeout;
}
