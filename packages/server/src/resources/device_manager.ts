//===- resources/device_manager.ts - Device Manager ------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as Bluebird from "bluebird";

import { Device } from "../models";

import { DeviceConfig, WoTHostConfig } from "./config";

export class DeviceManager {
  readonly config: WoTHostConfig;

  constructor(config: WoTHostConfig) {
    // no modification after the server is running!
    this.config = Object.freeze(config);
  }

  syncDevices(): Promise<Device[]> {
    return Promise.all(
      this.config.devices.map(attrs =>
        Device.create<Device>({
          id: attrs.id,
          name: attrs.name,
          description: attrs.description,
          pin: attrs.pin
        })
      )
    );
  }
}
