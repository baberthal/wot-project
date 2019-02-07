//===- plugins/wot_manager.ts - WoT Manager Class --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { IResourcesConfig, ResourcesConfig } from "../resources";

export interface HardwarePluginParams {
  simulate: boolean;
  frequency: number;
}

export interface WotManagerInit {
  resources?: IResourcesConfig | ResourcesConfig;
  defaultParams?: HardwarePluginParams;
}

export class WotManager {
  readonly defaultParams: HardwarePluginParams;
  readonly resourcesConfig: ResourcesConfig;

  constructor(init: WotManagerInit = {}) {
    this.defaultParams = init.defaultParams || {
      simulate: true,
      frequency: 5000
    };
    if (init.resources) {
      this.resourcesConfig =
        init.resources instanceof ResourcesConfig
          ? init.resources
          : new ResourcesConfig(init.resources);
    } else {
      this.resourcesConfig = ResourcesConfig.Default;
    }
  }
}
