//===- routes/sensors.ts - Sensor Routes -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { FastifyInstance } from "fastify";

import resources from "../../resources";
import { Device } from "../../models";

export default function routes(fastify: FastifyInstance, opts: any, next: any) {
  fastify.get("/", (req, res) => {
    res.send(req.device.sensors);
  });

  fastify.get("/pir", (req, res) => {
    res.send(req.device.sensors.pir);
  });

  fastify.get("/temperature", (req, res) => {
    res.send(req.device.sensors.temperature);
  });

  fastify.get("/humidity", (req, res) => {
    res.send(req.device.sensors.humidity);
  });

  next();
}
