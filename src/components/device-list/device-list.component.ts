//===- device-list.component.ts - Device List Component --------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Vue } from "@app/core";
import { BaseDeviceInfo } from "@/store/models";
import devices from "@/store/modules/devices";

import BaseIcon from "../base-icon";
import BasePanel from "../base-panel";
import template from "./device-list.template.html";

export interface DeviceConfig {
  icon?: string;
  name: string;
}

@Component({
  components: {
    BaseIcon,
    BasePanel
  },
  template
})
export class DeviceList extends Vue {
  get devices(): { [key: string]: BaseDeviceInfo } {
    return devices.all;
  }

  created() {
    return devices.fetchDevices();
  }
}

export default DeviceList;
