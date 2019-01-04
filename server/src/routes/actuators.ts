//===- routes/actuators.ts - Actuator Route --------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router } from "express";
import resources from "../resources";

const router = Router();

router.route("/").get((req, res, next) => {
  res.send(resources.pi.actuators);
});

router.route("/leds").get((req, res, next) => {
  res.send(resources.pi.actuators.leds);
});

router
  .route("/leds/:id")
  .get((req, res, next) => {
    res.send(resources.pi.actuators.leds[req.params.id]);
  })
  .put((req, res, next) => {
    const selectedLED = resources.pi.actuators.leds[req.params.id];
    selectedLED.value = req.body.value;
    res.send(selectedLED);
  });

export default router;
