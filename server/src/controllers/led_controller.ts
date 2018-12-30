//===- controllers/led_controller.ts - LED Controller ----------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Gpio } from "onoff";

import { Actuator } from "../models";
import resources from "../resources";

import { ControllerBase, ControllerBaseInit } from "./base_controller";

export class LedController extends ControllerBase {
  static readonly propertyId: string = "leds";

  public get model(): Actuator {
    return this.device.actuators.leds.find("1");
  }

  connectHardware(): void {
    if (this.conn != null) {
      throw new Error("Hardware already connected!");
    }

    this.conn = new Gpio(this.model.gpio, "out");
    this.log.info("Hardware %s actuator started!", this.name);
  }

  onStop(): void {
    this.conn.unexport();
  }

  performSimulation(): void {
    throw new Error("LedController#performSimulation(): Not implemented.");
  }
}
