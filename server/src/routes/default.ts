//===- routes/default.ts - 'default' routes - those without a version ------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router, Request, Response } from "express";

const defaultVersion = "v1";

const redirectToDefault = (req: Request, res: Response, next: () => void) => {
  res.redirect(`/${defaultVersion}${req.baseUrl}/`);
  next();
};

const router = Router();

router.use("/pi/actuators", redirectToDefault);
router.use("/pi/sensors", redirectToDefault);
router.use("/ping", redirectToDefault);

export default router;
