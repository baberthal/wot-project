//===- routes/actuators.ts - Actuator Route --------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { FastifyInstance } from "fastify";
import { Device } from "../../models";

export default function routes(fastify: FastifyInstance, opts: any, next: any) {
  fastify.get("/", (req, res) => {
    res.send(req.device.actuators);
  });

  fastify.get("/leds", (req, res) => {
    res.send(req.device.actuators.leds);
  });

  fastify.get("/leds/:id", (req, res) => {
    res.send(req.device.actuators.leds.find(req.params.id));
  });

  fastify.put("/leds/:id", (req, res) => {
    const selectedLED = req.device.actuators.leds.find(req.params.id);
    selectedLED.value = req.body.value;
    res.send(selectedLED);
  });

  next();
}
