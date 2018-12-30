//===- routes/types.d.ts - Brief Description -------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//
///
///
///
//===-----------------------------------------------------------------------===//

/// <reference types="fastify" />

import { Device } from "../models";

declare module "fastify" {
  interface FastifyRequest<HttpRequest> {
    device: Device;
  }
}
