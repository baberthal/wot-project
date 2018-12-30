//===- routes/sensors.ts - Sensor Routes -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router, Request as _Request } from "express";
import resources from "../resources";
import { Device } from "../models";

const router = Router();
const devicePromise = resources.devices.find("pi");

interface Request extends _Request {
  device: Device;
}

router.use((req, res, next) => {
  devicePromise.then(device => {
    (req as Request).device = device;
    next();
  });
});

router.route("/").get((req, res, next) => {
  res.send((req as Request).device.sensors);
});

router.route("/pir").get((req, res, next) => {
  res.send((req as Request).device.sensors.pir);
});

router.route("/temperature").get((req, res, next) => {
  res.send((req as Request).device.sensors.temperature);
});

router.route("/humidity").get((req, res, next) => {
  res.send((req as Request).device.sensors.humidity);
});

export default router;
