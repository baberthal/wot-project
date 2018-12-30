//===- device-list.component.ts - Device List Component --------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Vue, getModule } from "@app/core";
import { getDevices, BaseDeviceInfo } from "@app/api/devices";
import { DeviceModule } from "@app/store/modules";

import { BaseIcon, BasePanel } from "../base";
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
  devices: BaseDeviceInfo[] | null = null;

  mounted() {
    const mod = getModule(DeviceModule);
    console.log(mod);
    console.log(this.$store.state);
    // getDevices().then(response => {
    //   console.log("response:", response);

    //   const infoArray = [];
    //   for (const key in response) {
    //     infoArray.push(response[key]);
    //   }

    //   console.log("infoArray:", infoArray);
    //   this.devices = infoArray;
    // });
  }
}

export default DeviceList;
