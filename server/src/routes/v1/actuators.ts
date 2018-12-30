//===- routes/actuators.ts - Actuator Route --------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router, Request as eRequest } from "express";
import { Device } from "../../models";
import resources from "../../resources";

interface Request extends eRequest {
  device: Device;
}

const devicePromise = resources.devices.find("pi");

const router = Router();

router.route("/").get((req, res, next) => {
  devicePromise.then(device => {
    res.send(device.actuators);
    next();
  });
});

router.route("/leds").get((req, res, next) => {
  devicePromise.then(device => {
    res.send(device.actuators.leds);
    next();
  });
});

router
  .route("/leds/:id")
  .get((req, res, next) => {
    devicePromise.then(device => {
      res.send(device.actuators.leds.find(req.params.id));
      next();
    });
  })
  .put((req, res, next) => {
    devicePromise.then(device => {
      const selectedLED = device.actuators.leds.find(req.params.id);
      selectedLED.value = req.body.value;
      res.send(selectedLED);
      next();
    });
  });

export default router;
