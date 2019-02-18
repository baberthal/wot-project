//===- models/index.ts - DB Models Entry Point -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Sequelize, sequelize } from "../db";

export * from "./Actuator";
export * from "./Device";
export * from "./Sensor";
export * from "./Value";

export { Sequelize, sequelize };
