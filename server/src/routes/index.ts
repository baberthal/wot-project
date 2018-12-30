//===- routes/index.ts - Main routes file ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/// <reference path="../plugins/types.d.ts" />

import {
  FastifyInstance,
  RegisterOptions,
  NextCallback as Next
} from "../util/types";

import actuatorRoutes from "./actuators";
import sensorRoutes from "./sensors";
import pingRoutes from "./ping";

function plugin(fastify: FastifyInstance, opts: RegisterOptions, next: Next) {
  fastify.register(pingRoutes, { prefix: "/ping" });
  fastify.register(actuatorRoutes, { prefix: "/pi/actuators" });
  fastify.register(sensorRoutes, { prefix: "/pi/sensors" });

  next();
}

export default plugin;
