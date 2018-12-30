//===- controllers/led_controller.ts - LED Controller ----------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Actuator } from "../actuator";

import { ControllerBase, ControllerBaseInit } from "./base_controller";

export class LedController extends ControllerBase {
  static readonly propertyId: string = "leds";

  async connectHardware() {
    if (this.conn != null) {
      throw new Error("Hardware already connected!");
    }

    return import("onoff").then(onoff => {
      this.conn = new onoff.Gpio(this.model.gpio, "out");
      this.log.info("Hardware %s actuator started!", this.name);
    });
  }

  onStop(): void {
    this.conn.unexport();
  }

  performSimulation(): void {
    throw new Error("LedController#performSimulation(): Not implemented.");
  }
}
