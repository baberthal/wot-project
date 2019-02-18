//===- routes/sensors.ts - Sensor Routes -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { FastifyInstance, NextCallback, RegisterOptions } from "../util/types";

export default function routes(
  fastify: FastifyInstance,
  opts: RegisterOptions,
  next: NextCallback
) {
  // const device = fastify.resources.device("pi");

  // fastify.get("/", (req, res) => {
  //   res.send(device.sensors);
  // });

  // fastify.get("/pir", (req, res) => {
  //   res.send(device.sensors.pir);
  // });

  // fastify.get("/temperature", (req, res) => {
  //   res.send(device.sensors.temperature);
  // });

  // fastify.get("/humidity", (req, res) => {
  //   res.send(device.sensors.humidity);
  // });

  next();
}
