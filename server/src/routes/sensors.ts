//===- routes/sensors.ts - Sensor Routes -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router } from "express";
import resources from "../resources";

const router = Router();

router.route("/").get((req, res, next) => {
  res.send(resources.pi.sensors);
});

router.route("/pir").get((req, res, next) => {
  res.send(resources.pi.sensors.pir);
});

router.route("/temperature").get((req, res, next) => {
  res.send(resources.pi.sensors.temperature);
});

router.route("/humidity").get((req, res, next) => {
  res.send(resources.pi.sensors.humidity);
});

export default router;
