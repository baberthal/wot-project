//===- resources/devices/device.ts - Device Class --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { use } from "typescript-mix";

import { ValuesMixin } from "../mixins";
import { PiGPIOFactory, PiGPIOMockFactory } from "../pins";
import { PinFactory } from "../pins/factory";

import { GPIOBase } from "./gpio_base";

export interface Device<T = number> extends ValuesMixin<T>, GPIOBase {}
/**
 * Represents a single device of any type; GPIO-based, SPI-based, I2C-based, etc.
 *
 * This is the base class of the device hierarchy. It defines the basic services
 * applicable to all devices (specifically the `isActive` property, the
 * `value` property, and the `close()` method).
 */
export class Device<T = number> {
  @use(ValuesMixin, GPIOBase) this: any;

  static pinFactory: PinFactory;

  static _defaultPinFactory(): PinFactory {
    if (process.platform === "linux") {
      if (process.env.NODE_ENV !== "test") {
        return new PiGPIOFactory();
      }
    }

    return new PiGPIOMockFactory();
  }

  protected _pinFactory: PinFactory;

  constructor(options: { pinFactory?: PinFactory } = {}) {
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

  get value(): T {
    throw new Error("Method not implemented");
  }

  get isActive(): boolean {
    return Boolean(this.value);
  }
}
