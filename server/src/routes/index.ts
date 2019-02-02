//===- routes/index.ts - Main routes file ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/// <reference path="../plugins/types.d.ts" />

import {
  FastifyInstance,
  NextCallback as Next,
  RegisterOptions
} from "../util/types";

import actuatorRoutes from "./actuators";
import pingRoutes from "./ping";
import rootRoutes from "./root";
import sensorRoutes from "./sensors";

function plugin(fastify: FastifyInstance, opts: RegisterOptions, next: Next) {
  fastify.register(rootRoutes);
  fastify.register(pingRoutes, { prefix: "/ping" });
  fastify.register(actuatorRoutes, { prefix: "/pi/actuators" });
  fastify.register(sensorRoutes, { prefix: "/pi/sensors" });

  next();
}

export default plugin;
