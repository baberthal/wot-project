//===- db/index.ts - Database Entry Point ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Sequelize } from "sequelize-typescript";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/database.js")[env];
const db = {};

const sequelize = new Sequelize({
  ...config,
  modelPaths: [__dirname + "/models"]
});

export { sequelize, Sequelize };
export default sequelize;
