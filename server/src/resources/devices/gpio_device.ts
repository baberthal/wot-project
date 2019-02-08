//===- resources/devices/gpio_device.ts - GPIO Device Base Class -----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Gpio } from "pigpio";

import { Device } from "./device";

export class GPIODevice<ValueType = boolean> extends Device<ValueType> {
  protected _pin: number;
  protected _conn!: Gpio;
  protected _activeState: boolean;
  protected _inactiveState: boolean;

  constructor(pin: number, options: {} = {}) {
    super(options);
    this._pin = pin;
    this._conn = new Gpio(pin);
    this._activeState = true;
    this._inactiveState = false;
  }

  close() {
    super.close();
    this._conn = null!;
  }

  get closed(): boolean {
    return this._conn == null;
  }

  protected _stateToValue(state: any) {
    return Boolean(state == this._activeState);
  }

  protected _read() {
    try {
      return this._stateToValue(this._conn.digitalRead());
    } catch (e) {
      this._checkOpen();
      throw e;
    }
  }
}
