//===- resources/devices/device.ts - Device Class --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { ValuesMixin } from "../mixins";

import { GPIOBase } from "./gpio_base";

/**
 * Represents a single device of any type; GPIO-based, SPI-based, I2C-based, etc.
 *
 * This is the base class of the device hierarchy. It defines the basic services
 * applicable to all devices (specifically the `isActive` property, the
 * `value` property, and the `close()` method).
 */
class _Device<ValueT = number> extends GPIOBase<_Device> {
  constructor(options: {} = {}) {
    super(options);
  }

  get value(): ValueT {
    throw new Error("Method not implemented");
  }

  get isActive(): boolean {
    return Boolean(this.value);
  }
}

export const Device = ValuesMixin(_Device);
