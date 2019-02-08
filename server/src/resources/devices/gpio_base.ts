//===- resources/devices/devices.ts - Device base classes ------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export class GPIOBase<T extends GPIOBase<T>> {
  constructor(options: {} = {}) {}

  get closed(): boolean {
    throw new Error("Method not implemented");
  }

  close() {}

  _checkOpen() {
    if (this.closed) {
      throw new Error(
        `DeviceClosed: ${this.constructor.name} is closed or uninitialized`
      );
    }
  }
}
