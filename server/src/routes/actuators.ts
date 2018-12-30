//===- routes/actuators.ts - Actuator Route --------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Device } from "../models";
import { FastifyInstance, RegisterOptions, NextCallback } from "../util/types";

export default function routes(
  fastify: FastifyInstance,
  opts: RegisterOptions,
  next: NextCallback
) {
  const device = fastify.resources.device("pi");
  const leds = device.actuators.leds;

  fastify.get("/", (req, res) => {
    res.send(device.actuators);
  });

  fastify.get("/leds", (req, res) => {
    res.send(leds);
  });

  fastify.get("/leds/:id", (req, res) => {
    const led = leds.find(req.params.id);
    res.send(led);
  });

  fastify.put("/leds/:id", (req, res) => {
    const selectedLED = leds.find(req.params.id);
    selectedLED.onValueChange = value => {
      console.log("Value changed: %s", value);
    };
    selectedLED.value = req.body.value;
    res.send(selectedLED);
  });

  next();
}
