//===- routes/v1.ts - V1 Routes --------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { FastifyInstance, RegisterOptions } from "fastify";
import * as fp from "fastify-plugin";

import { Device } from "../models";
import resources from "../resources";

import actuatorRoutes from "./v1/actuators";
import pingRoutes from "./v1/ping";
import sensorRoutes from "./v1/sensors";

function plugin(fastify: FastifyInstance, opts: any, next: any) {
  resources.devices.find("pi").then(device => {
    fastify.decorateRequest("device", device);

    fastify.register(actuatorRoutes, { prefix: "/pi/actuators" });
    fastify.register(pingRoutes, { prefix: "/ping" });
    fastify.register(sensorRoutes, { prefix: "/pi/sensors" });

    next();
  });
}

export default plugin;
