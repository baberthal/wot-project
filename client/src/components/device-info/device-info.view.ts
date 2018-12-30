//===- device-info.component - Device Info View ----------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Vue } from "@app/core";
import devices from "@/store/modules/devices";
import template from "./device-info.template.html";
import { BaseDeviceInfo } from "@/store/models";

@Component({
  template
})
export class DeviceInfo extends Vue {
  get currentDevice(): BaseDeviceInfo {
    return devices.all[this.$route.params.id];
  }

  created() {
    return devices.fetchDevices();
  }
}

export default DeviceInfo;
