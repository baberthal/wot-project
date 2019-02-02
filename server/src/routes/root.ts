//===- routes/root.ts - Root routes ----------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  FastifyInstance,
  NextCallback as Next,
  RegisterOptions
} from "../util/types";

function plugin(fastify: FastifyInstance, opts: RegisterOptions, next: Next) {
  fastify.get("/", (req, res) => {
    res.send(fastify.resources);
  });

  fastify.get("/pi", (req, res) => {
    res.send(fastify.resources.device("pi"));
  });

  next();
}

export default plugin;
