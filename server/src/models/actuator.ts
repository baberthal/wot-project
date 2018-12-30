//===- models/actuator.ts - Represents an actuator on a device -------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { GpioBase, GpioBaseConfig } from "./base";

export interface ActuatorConfig extends GpioBaseConfig {
  name: string;
  description?: string;
  value?: number | string | boolean | undefined;

  gpio: number;
}

export class Actuator extends GpioBase {
  readonly description: string;
  public value: number | string | boolean | undefined;

  constructor(id: string, config: ActuatorConfig) {
    super(id, config);

    this.description = config.description || "";
    this.value = config.value;
  }
}

export class ActuatorGroup {
  readonly name: string;
  private _actuators: Map<string, Actuator> = new Map();

  constructor(name: string, config: { [id: string]: ActuatorConfig } = {}) {
    this.name = name;
    Object.keys(config).forEach(key => {
      this.addActuator(key, config[key]);
    });
  }

  addActuator(id: string, config: ActuatorConfig) {
    this._actuators.set(id, new Actuator(id, config));
  }

  find(id: string): Actuator {
    const actuator = this._actuators.get(id);
    if (!actuator) {
      throw new Error(`Unable to find actuator with id: '${id}'`);
    }
    return actuator;
  }
}
