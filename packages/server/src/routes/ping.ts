//===- routes/ping.ts - Ping Route -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { FastifyInstance } from "fastify";

export default function routes(fastify: FastifyInstance, opts: any, next: any) {
  fastify.get("/", (req, res) => {
    res.send("pong");
  });
  next();
}
