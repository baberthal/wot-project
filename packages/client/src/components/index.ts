//===- components/index.ts - Component Export Bucket -----------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { AppNavbar } from "./navbar/navbar.component";
import { BaseIcon } from "./base-icon/base-icon.component";
import { BaseList } from "./base-list/base-list.component";
import { BasePanel } from "./base-panel/base-panel.component";
import { BasePanelBlock } from "./base-panel-block/base-panel-block.component";
import { DeviceList } from "./device-list/device-list.component";
import { TempInfo } from "./temp-info/temp-info.component";

import { DashboardContent } from "./dashboard-content";
import { DashboardSidebar } from "./dashboard-sidebar";

export { AppNavbar, DashboardContent, DashboardSidebar };

export default {
  AppNavbar,
  BaseIcon,
  BaseList,
  BasePanel,
  BasePanelBlock,
  DeviceList,
  TempInfo
};
