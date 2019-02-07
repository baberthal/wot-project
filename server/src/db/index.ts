//===- db/index.ts - Database Entry Point ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { sequelize } from "./instance";
import dbPlugin from "./plugin";

export default sequelize;
export { dbPlugin };
