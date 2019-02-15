//===- db/index.ts - Database Entry Point ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as glob from "glob";
import * as path from "path";
import { Sequelize } from "sequelize-typescript";

const configPath = path.resolve(__dirname, "../../config");
const modelsPath = path.resolve(__dirname, "../models");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(configPath, "database.js"))[env];

const sequelize = new Sequelize({
  ...config,
  modelPaths: [path.join(modelsPath, "!(index.*)")]
});

export { sequelize, Sequelize };
export default sequelize;
