//===- resources/devices/gpio_device.ts - GPIO Device Base Class -----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Pin } from "../pins/pin";

import { Device } from "./device";

export class GPIODevice<ValueType = boolean> extends Device<ValueType> {
  protected _pin: Pin;
  protected _activeState: boolean;
  protected _inactiveState: boolean;

  constructor(pin: string | number, options: {} = {}) {
    super(options);
    this._pin = this._pinFactory.pin(pin);
    this._activeState = true;
    this._inactiveState = false;
  }

  close() {
    super.close();
    this._pin = null!;
  }

  get closed(): boolean {
    return this._pin == null;
  }

  get pin(): Pin {
    return this._pin;
  }

  [Symbol.toStringTag]() {
    return "";
  }

  protected _stateToValue(state: any) {
    return Boolean(state == this._activeState);
  }

  protected _read() {
    try {
      return this._stateToValue(this._pin.state);
    } catch (e) {
      this._checkOpen();
      throw e;
    }
  }
}
