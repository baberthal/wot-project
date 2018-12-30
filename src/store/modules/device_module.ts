//===- store/modules/device_module.ts - Device Store Module ----------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { BaseDeviceInfo, getDevices } from "@app/api";
import { Action, Module, Mutation, VuexModule } from "@app/core";
import store from "../store";

@Module({
  dynamic: true,
  store,
  name: "devices"
})
export class DeviceModule extends VuexModule {
  all: BaseDeviceInfo[] = [];

  @Mutation
  addDevice(device: BaseDeviceInfo) {
    this.all.push(device);
  }

  @Action
  fetchDevices() {
    getDevices().then(response => {
      for (const devkey in response) {
        this.context.commit("addDevice", response[devkey]);
      }
    });
  }
}

export default DeviceModule;
