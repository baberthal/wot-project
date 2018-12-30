//===- plugins/base/sensor_base.ts - Base sensor plugin --------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Gpio } from "onoff";

import { Sensor } from "../../models/sensor";
import { PluginBase, PluginParams } from "./base";

export abstract class SensorPluginBase extends PluginBase {
  protected sensor!: Gpio;
}
