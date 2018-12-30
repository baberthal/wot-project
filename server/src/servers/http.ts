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

import v1Routes from "../routes/v1";
import defaultRoutes from "../routes/default";

const app = express();

app.use(cors());
app.use(pino({ logger }));

app.use("/", defaultRoutes);
app.use("/v1", v1Routes);

export default app;
