//===- routes/sensors.ts - Sensor Routes -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router } from "express";
import resources from "../resources";

const router = Router();
const device = resources.device("pi")!;

router.route("/").get((req, res, next) => {
  res.send(device.sensors);
});

router.route("/pir").get((req, res, next) => {
  res.send(device.sensors.pir);
});

router.route("/temperature").get((req, res, next) => {
  res.send(device.sensors.temperature);
});

router.route("/humidity").get((req, res, next) => {
  res.send(device.sensors.humidity);
});

export default router;
