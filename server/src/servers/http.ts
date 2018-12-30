//===- servers/http.ts - HTTP Server ---------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fastify from "fastify";
import * as cors from "fastify-cors";

import v1Routes from "../routes/v1";
import logger from "../util/logger";

const app = fastify({ logger });

app.register(cors);
app.register(v1Routes, { prefix: "v1" });

export default app;
