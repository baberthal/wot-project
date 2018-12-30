//===- resources/v1/model.ts - V1 Model ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Device, DeviceConfig, ResourceCollection } from "../../models";

export class Model {
  readonly devices: ResourceCollection<Device>;

  constructor(config: { [id: string]: DeviceConfig }) {
    const devMap = new Map<string, Device>();

    Object.keys(config).forEach(key => {
      devMap.set(key, new Device(key, config[key]));
    });

    this.devices = new ResourceCollection(devMap);
  }
}
