//===- routes/ping.ts - Ping Route -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Server } from "../types";

export const pingRoute = (instance: FastifyServer, opts, next) => {
  instance.get("/ping")
};
