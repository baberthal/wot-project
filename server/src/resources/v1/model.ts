//===- resources/v1/model.ts - V1 Model ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Device, DeviceConfig } from "../../models";

export class Model {
  private _devices: Map<string, Device> = new Map();

  constructor(config: { [id: string]: DeviceConfig }) {
    Object.keys(config).forEach(key => {
      this._devices.set(key, new Device(key, config[key]));
    });
  }

  device(id: string): Device | undefined {
    return this._devices.get(id);
  }
}
