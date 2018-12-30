//===- routes/actuators.ts - Actuator Route --------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router } from "express";
import resources from "../resources";

const device = resources.device("pi")!;

const router = Router();

router.route("/").get((req, res, next) => {
  res.send(device.actuators);
});

router.route("/leds").get((req, res, next) => {
  res.send(device.actuators.leds);
});

router
  .route("/leds/:id")
  .get((req, res, next) => {
    res.send(device.actuators.leds.find(req.params.id));
  })
  .put((req, res, next) => {
    const selectedLED = device.actuators.leds.find(req.params.id);
    selectedLED.value = req.body.value;
    res.send(selectedLED);
  });

export default router;
