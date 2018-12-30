//===- models/sensor.ts - Sensor Class -------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { GpioBase, GpioBaseConfig } from "./base";

export interface SensorConfig extends GpioBaseConfig {
  name: string;
  description: string;
  unit?: string;
  value?: number | boolean | string;

  gpio: number;
}

export class Sensor extends GpioBase {
  readonly description: string;
  readonly unit: string;

  public value: number | boolean | string | undefined;

  constructor(id: string, config: SensorConfig) {
    super(id, config);

    this.description = config.description;
    this.unit = config.unit ? config.unit : "";
    this.value = config.value;
  }
}
