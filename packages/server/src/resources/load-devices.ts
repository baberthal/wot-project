//===- db/load-devices.ts - Load Devices into the database -----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import db from "../db";
import { Device } from "../models";

import { DeviceConfig, WoTHostConfig } from "./config";

export async function configureHost(config: WoTHostConfig) {
  return db.sync().then(() => {
    loadDevices(config.devices);
  });
}

export async function loadDevices(config: DeviceConfig[]) {
  await Promise.all(config.map(c => Device.create(c)));
}
