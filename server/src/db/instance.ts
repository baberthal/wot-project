//===- db/instance.ts - The DB Instance ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "wot",
  dialect: "sqlite",
  storage: __dirname + "/wot.sqlite",
  modelPaths: [__dirname + "/models"]
});

export { sequelize };
