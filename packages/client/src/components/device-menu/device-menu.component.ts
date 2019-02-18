//===- device-menu.component - DeviceMenu Component ------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Vue, Prop } from "@app/core";
import { BaseDeviceInfo } from "@/store/models";
import devices from "@/store/modules/devices";

import template from "./device-menu.template.html";

@Component({
  template
})
export class DeviceMenu extends Vue {
  @Prop() allDevices!: { [slug: string]: BaseDeviceInfo };

  @Prop() currentDevice!: BaseDeviceInfo;

  setCurrentDevice(slug: string) {
    devices.setCurrentDevice(slug);
  }

  get currentSlug(): string {
    return (this.currentDevice && this.currentDevice.id) || "";
  }
}

export default DeviceMenu;
