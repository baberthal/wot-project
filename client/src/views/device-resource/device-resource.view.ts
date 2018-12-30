//===- views/device-resource/device-resource.view.ts - Brief Description ---===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue, Component } from "@app/core";
import { getResource } from "@/api/devices";
import template from "./device-resource.template.html";

@Component({
  template
})
export class DeviceResourceView extends Vue {
  resource!: any;

  get deviceID(): string {
    return this.$route.params.id;
  }

  get resouceID(): string {
    return this.$route.params.resouceID;
  }

  created() {
    return getResource(
      this.$route.params.id,
      this.$route.params.resourceID
    ).then(r => {
      this.resource = r;
    });
  }
}

export default DeviceResourceView;
