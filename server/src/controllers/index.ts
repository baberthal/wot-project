//===- controllers/index.ts - Controllers export bucket --------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import manager from "./controller_manager";

import { LedController } from "./led_controller";

manager.registerController("leds", LedController);

export default manager;
