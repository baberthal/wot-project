//===- plugins/led_plugin.ts - LED Plugin ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Gpio } from "onoff";

import { Actuator, Device } from "../models";
import { ActuatorPluginBase, PluginParams } from "./base";

export class LedPlugin extends ActuatorPluginBase {
  readonly actions = ["ledState"];
  readonly model: Actuator;

  constructor(device: Device, params?: PluginParams) {
    super(params);
    this.model = device.actuators.leds.find("1");
  }

  connectHardware() {
    this.actuator = new Gpio(this.model.gpio, "out");
    this.log.info("Hardware %s actuator started!", this.model.name);
  }

  onStop() {
    this.actuator.unexport();
  }

  performSimulation() {
    this.model.value = !this.model.value;
  }

  onAction() {
    this.toggleState();
  }

  toggleState() {
    if (!this.isSimulation) {
    }
  }

  createValue(data: boolean) {
    return {
      "1": data,
      "2": false,
      timestamp: ""
    };
  }
}
