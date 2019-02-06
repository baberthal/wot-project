//===- device-info.component - Device Info View ----------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { BaseDeviceInfo } from "@/store/models";
import devices from "@/store/modules/devices";
import { Component, Vue } from "@app/core";

import template from "./device-info.template.html";

@Component({
  template
})
export class DeviceInfo extends Vue {
  get currentDevice(): BaseDeviceInfo {
    return devices.all["pi"];
  }

  created() {
    return devices.fetchDevices();
  }
}

export default DeviceInfo;
