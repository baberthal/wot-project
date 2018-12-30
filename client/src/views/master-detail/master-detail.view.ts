//===- views/master-detail/master-detail.view.ts - M-D view ----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
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

import template from "./master-detail.template.html";

@Component({
  template,
  components: { DeviceMenu, DeviceList, TempInfo, DeviceInfo }
})
export class MasterDetail extends Vue {
  get currentDevice() {
    if (this.$route.params.id) {
      this.setCurrentDevice(this.$route.params.id);
    }

    return devices.currentDevice;
  }

  get allDevices(): { [slug: string]: BaseDeviceInfo } {
    return devices.all;
  }

  async created() {
    await devices.fetchDevices();

    if (this.$route.params.id) {
      this.setCurrentDevice(this.$route.params.id);
    }
  }

  setCurrentDevice(slug: string) {
    devices.setCurrentDevice(slug);
  }
}

export default MasterDetail;
