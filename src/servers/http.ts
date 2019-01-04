//===- servers/http.ts - HTTP Server ---------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as cors from "cors";
import * as express from "express";
import * as pino from "pino-http";

import logger from "../util/logger";

import actuatorRoutes from "../routes/actuators";
import pingRoutes from "../routes/ping";
import sensorRoutes from "../routes/sensors";

const app = express();

app.use(cors());
app.use(pino({ logger }));

app.use("/ping", pingRoutes);
app.use("/pi/sensors", sensorRoutes);
app.use("/pi/actuators", actuatorRoutes);

export default app;
