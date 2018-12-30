//===- resources/resources.ts - Resources class ----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Device, DeviceConfig } from "../models";

export class Resources {
  private _devices: Map<string, Device> = new Map();

  constructor(config?: { [id: string]: DeviceConfig }) {
    if (config) {
      this.load(config);
    }
  }

  load(config: { [id: string]: DeviceConfig }): this {
    Object.keys(config).forEach(key => {
      this._devices.set(key, new Device(key, config[key]));
    });
    return this;
  }

  device(id: string): Device {
    const dev = this._devices.get(id);
    if (!dev) throw new Error(`Unable to find device with id: '${id}'`);
    return dev;
  }

  toJSON() {
    let res = Object.create(null);
    for (const [k, v] of this._devices) {
      res[k] = v;
    }
    return res;
  }
}
