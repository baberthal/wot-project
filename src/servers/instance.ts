//===- servers/instance.ts - Server Main Instance --------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fastify from "fastify";
import { Server } from "../types";

export const server: Server = fastify({ logger: true });

export default server;
