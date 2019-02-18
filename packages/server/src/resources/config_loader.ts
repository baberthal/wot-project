//===- resources/config_loader.ts - Loads configuration into database ------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Sequelize } from "sequelize-typescript";

import { Device } from "../models/Device";
import { Sensor } from "../models/Sensor";

import {
  IActuatorConfig,
  IDeviceConfig,
  IResourcesConfig,
  ISensorConfig
} from "./interfaces";

// export class ConfigLoader {
//   constructor(protected sequelize: Sequelize) {}

//   async loadConfig(config: IResourcesConfig) {
//     const all: PromiseLike<Device>[] = [];

//     for (let i = 0, keys = Object.keys(config); i < keys.length; i++) {
//       const id = keys[i];
//       all.push(this.loadDevice(id, config[id]));
//     }

//     return Promise.all(all);
//   }

//   loadDevice(id: string, config: IDeviceConfig): PromiseLike<Device> {
//     return Device.create<Device>(
//       {
//         id,
//         name: config.name,
//         description: config.description,
//         port: config.port
//       },
//       {
//         include: [Sensor]
//       }
//     );
//   }
// }

// function arrayFromSensorConfigs(sensorConfigs: {
//   [key: string]: ISensorConfig;
// }): Array<ISensorConfig & { id: string }> {
//   const result: Array<ISensorConfig & { id: string }> = [];

//   for (let i = 0, keys = Object.keys(sensorConfigs); i < keys.length; i++) {
//     const key = keys[i];
//     const attributes = sensorConfigs[key];
//     result.push({ id: key, ...attributes });
//   }

//   return result;
// }
