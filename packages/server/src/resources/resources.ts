//===- resources/resources.ts - Resources class ----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

// import { DeviceConfig, ResourcesConfig } from "./config";

// export class Resources {
//   private _devicesById: Map<string, DeviceConfig> = new Map();

//   constructor({ devices }: ResourcesConfig) {
//     for (let i = 0, keys = Object.keys(devices); i < keys.length; i++) {
//       const key = keys[i];
//       this._devicesById.set(key, devices[key]);
//     }
//   }

//   device(id: string): DeviceConfig {
//     const dev = this._devicesById.get(id);
//     if (!dev) throw new Error(`Unable to find device with id: '${id}'`);
//     return dev;
//   }

//   toJSON() {
//     const res = Object.create(null);
//     for (const [k, v] of this._devicesById) {
//       res[k] = v;
//     }
//     return res;
//   }
// }
