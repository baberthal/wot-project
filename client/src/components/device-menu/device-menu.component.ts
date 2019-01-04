//===- device-menu.component - DeviceMenu Component ------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Vue } from "@app/core";
import devices from "@/store/modules/devices";
import { BaseDeviceInfo } from "@/store/models";

import template from "./device-menu.template.html";

@Component({
  template
})
export class DeviceMenu extends Vue {
  get allDevices(): { [slug: string]: BaseDeviceInfo } {
    return devices.all;
  }

  created() {
    return devices.fetchDevices();
  }
}

export default DeviceMenu;
