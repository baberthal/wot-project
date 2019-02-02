//===- page-content.component - Page Content Component ---------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Prop, Vue } from "@app/core";

import { DashboardContent } from "../dashboard-content";
import { DashboardSidebar } from "../dashboard-sidebar";

import template from "./page-content.template.html";
import "./page-content.style.scss";

import { TemperatureData } from "@/api";

@Component({
  template,
  components: {
    DashboardContent,
    DashboardSidebar
  }
})
export class PageContent extends Vue {
  @Prop() weatherData!: TemperatureData;
}

export default PageContent;
