//===- views/home/home.view.ts - Home View ---------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue, Component } from "@app/core";
import { DeviceList } from "@/components/device-list";
import { TempInfo } from "@/components/temp-info";

import template from "./home.template.html";

@Component({
  template,
  components: { DeviceList, TempInfo }
})
export class Home extends Vue {}

export default Home;
