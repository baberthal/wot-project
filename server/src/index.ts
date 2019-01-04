//===- index.ts - Main Entry Point -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import app from "./servers/http";
import logger from "./util/logger";

const port = 3000;

const server = app.listen(port, () => {
  logger.info(`Listening on ${port}`);
});
