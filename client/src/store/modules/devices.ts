//===- store/modules/device_module.ts - Device Store Module ----------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Module, VuexModule, getModule, MutationAction } from "@app/core";
import { getDevices, getDevice } from "@app/api";
import { DeviceInfo, DeviceInfoDict } from "@/store/models";
import store from "@/store";

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: "devices"
})
export class DeviceModule extends VuexModule {
  all: DeviceInfoDict = {};
  currentDevice: DeviceInfo | null = null;

  @MutationAction
  async fetchDevices() {
    const all = await getDevices();
    return { all };
  }

  @MutationAction
  async setCurrentDevice(slug: string) {
    const currentDevice = await getDevice(slug);
    return { currentDevice };
  }
}

export default getModule(DeviceModule);
