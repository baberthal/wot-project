//===- routes/v1.ts - V1 Routes --------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router } from "express";

import actuatorRoutes from "./v1/actuators";
import pingRoutes from "./v1/ping";
import sensorRoutes from "./v1/sensors";

const router = Router();

router.use("/pi/actuators", actuatorRoutes);
router.use("/pi/sensors", sensorRoutes);
router.use("/ping", pingRoutes);

export default router;
