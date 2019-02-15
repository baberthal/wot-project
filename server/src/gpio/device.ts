//===- gpio/device.ts - Base Device Class ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";
import { use } from "typescript-mix";

export class GPIOBase {
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
