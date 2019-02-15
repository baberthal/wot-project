//===- gpio/device.ts - Base Device Class ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";

import { ValuesMixin } from "./mixins";
import { Pin, PinFactory } from "./pins";

/**
 * Represents a single device of any type; GPIO-based, SPI-based, I2C-based, etc.
 *
 * This is the base class of the device hierarchy. It defines the basic services
 * applicable to all devices (specifically the `isActive` property, the
 * `value` property, and the `close()` method).
 */
export abstract class Device<T> extends ValuesMixin<T> {
  static pinFactory: PinFactory;

  static _defaultPinFactory(): PinFactory {
    if (process.platform === "linux") {
      if (process.env.NODE_ENV !== "test") {
        const mod = require("./pins/pigpio");
        return new mod.PiGPIOFactory();
      }
    }

    const mod = require("./pins/pigpio_mock");
    return new mod.PiGPIOMockFactory();
  }

  protected _pinFactory: PinFactory;

  constructor(options: { pinFactory?: PinFactory } = {}) {
    super();

    const pinFactory = options.pinFactory;
    delete options.pinFactory;

    if (pinFactory === undefined) {
      if (Device.pinFactory === undefined) {
        Device.pinFactory = Device._defaultPinFactory();
      }
      this._pinFactory = Device.pinFactory;
    } else {
      this._pinFactory = pinFactory;
    }
  }

  abstract get value(): T;

  abstract get closed(): boolean;

  get isActive(): boolean {
    return Boolean(this.value);
  }

  close() {}

  _checkOpen() {
    if (this.closed) {
      throw new Error(
        `DeviceClosed: ${this.constructor.name} is closed or uninitialized`
      );
    }
  }

  toString(): string {
    return this[Symbol.toStringTag];
  }

  get [Symbol.toStringTag]() {
    return `<gpio.${this.constructor.name} object>`;
  }
}

export class GPIODevice extends Device<number> {
  protected _pin: Pin;
  protected _activeState: boolean;
  protected _inactiveState: boolean;

  constructor(pin: string | number, options: {} = {}) {
    super(options);
    this._pin = null!;
    this._pin = this._pinFactory.pin(pin);
    this._activeState = true;
    this._inactiveState = false;
  }

  close() {
    super.close();
    if (this._pin != null) {
      this._pin.close();
    }
    this._pin = null!;
  }

  get closed(): boolean {
    return this._pin == null;
  }

  get pin(): Pin {
    return this._pin;
  }

  get value(): number {
    return this._read();
  }

  get [Symbol.toStringTag]() {
    return `<${this.constructor.name} object on pin ${this.pin}, isActive=${
      this.isActive
    }>`;
  }

  protected _stateToValue(state: number): number {
    return Number(state == this.pin.state);
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

function shutdown() {
  if (Device.pinFactory != null) {
    Device.pinFactory.close();
    Device.pinFactory = undefined!;
  }
}

process.on("exit", () => {
  shutdown();
});
