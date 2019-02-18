//===- db/types.d.ts -------------------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/// <reference types="fastify" />

import { Sequelize } from "sequelize-typescript";

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
  }
}
