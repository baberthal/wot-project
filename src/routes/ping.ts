//===- routes/ping.ts - Ping Route -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router } from "express";

const router = Router();

router.route("/").get((req, res, next) => {
  res.send("pong");
});

export default router;
