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
  value?: number | string | boolean;

  gpio: number;
}

export class Actuator extends GpioBase {
  /** Human-readable description of the actuator. */
  readonly description: string;

  private _value?: number | string | boolean;

  private _onValueChange: ((val: number | string | boolean) => void)[] = [];

  // public onValueChange?: (value: number | string | boolean | undefined) => void;

  /** The value of the actuator. */
  get value(): number | string | boolean {
    return this._value!;
  }

  set value(newValue: number | string | boolean) {
    this._value = newValue;
    this._onValueChange.forEach(cb => {
      cb(newValue);
    });
  }

  constructor(id: string, config: ActuatorConfig) {
    super(id, config);

    this.description = config.description || "";
    this._value = config.value;
  }

  toJSON() {
    const { id, name, description, value, gpio } = this;
    return { id, name, description, value, gpio };
  }

  onValueChange(cb: (val: number | string | boolean) => void): void {
    this._onValueChange.push(cb);
  }
}

export class ActuatorGroup {
  readonly name: string;
  private _actuators: Map<string, Actuator> = new Map();

  constructor(name: string, config: { [id: string]: ActuatorConfig } = {}) {
    this.name = name;
    Object.keys(config).forEach(key => {
      const actuator = new Actuator(key, config[key]);
      this._actuators.set(key, actuator);
    });
  }

  find(id: string): Actuator {
    const actuator = this._actuators.get(id);
    if (!actuator) {
      throw new Error(`Unable to find actuator with id: '${id}'`);
    }
    return actuator;
  }

  forEach(cb: (actuator: Actuator, id: string, group: ActuatorGroup) => void) {
    this._actuators.forEach((value, key) => {
      cb(value, key, this);
    });
  }

  toJSON() {
    let res = Object.create(null);
    for (const [k, v] of this._actuators) {
      res[k] = v;
    }
    return res;
  }
}
