//===- views/home/home.view.ts - Home View ---------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue, Component } from "@app/core";
import { DeviceList } from "@/components/device-list";
import { DeviceMenu } from "@/components/device-menu";
import { DeviceInfo } from "@/components/device-info";
import { TempInfo } from "@/components/temp-info";
import { BaseDeviceInfo } from "@/store/models";
import devices from "@/store/modules/devices";

import template from "./home.template.html";

@Component({
  template,
  components: { DeviceMenu, DeviceList, TempInfo, DeviceInfo }
})
export class Home extends Vue {
  get currentDevice() {
    return devices.currentDevice;
  }

  get allDevices(): { [slug: string]: BaseDeviceInfo } {
    return devices.all;
  }

  created() {
    return devices.fetchDevices();
  }

  setCurrentDevice(slug: string) {
    devices.setCurrentDevice(slug);
  }
}

export default Home;
