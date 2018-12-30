//===- plugins/led_controller.ts - LED Controller --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Gpio } from "onoff";

import { Actuator } from "../models";
import logger from "../util/logger";

export interface LedControllerInit {
  simulate: boolean;
  frequency: number;
}

export class LedController {
  private interval!: NodeJS.Timeout;
  private actuator!: Gpio;
  private log = logger;

  get name(): string {
    return this.model.name;
  }

  constructor(private model: Actuator, public params: LedControllerInit) {}

  start() {
    if (this.params.simulate) {
      this.simulate();
    } else {
      this.connectHardware();
    }

    this.log.info("%s plugin started!", this.name);
  }

  stop() {
    if (this.params.simulate) {
      clearInterval(this.interval);
    } else {
      this.actuator.unexport();
    }

    this.log.info("%s plugin stopped!", this.name);
  }

  simulate() {
    this.interval = setInterval(() => {
      if (this.model.value) {
        this.model.value = false;
      } else {
        this.model.value = true;
      }
    }, this.params.frequency);
  }

  connectHardware() {
    if (this.actuator != null) {
      throw new Error("Hardware already connected!");
    }

    this.actuator = new Gpio(this.model.gpio, "out");
    this.log.info("Hardware %s actuator started!");
  }

  toggleLED(state: boolean) {
    if (!this.params.simulate) {
      this.actuator.write(state === true ? 1 : 0, () => {
        this.log.info("changed value of %s to %s", this.name, state);
      });
    }
  }
}
