//===- index.ts - Main App Entry Point -------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { RouteShorthandOptions } from "fastify";
import server from "../servers/instance";

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string"
          }
        }
      }
    }
  }
};

server.get("/ping", opts, async (_request, reply) => {
  console.log(reply.res); // this is the http.ServerResponse with correct typings!
  reply.code(200).send({ pong: "it worked!" });
});

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
