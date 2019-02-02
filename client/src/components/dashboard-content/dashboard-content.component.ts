//===- dashboard-content.component - Dashboard Content Component -----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Prop, Vue } from "@app/core";
import { TempInfo } from "../temp-info/temp-info.component";

import template from "./dashboard-content.template.html";
import "./dashboard-content.style.scss";

import { TemperatureData } from "@/api";

@Component({
  template,
  components: {
    TempInfo
  }
})
export class DashboardContent extends Vue {
  @Prop() weatherData: TemperatureData = null!;
}

export default DashboardContent;
