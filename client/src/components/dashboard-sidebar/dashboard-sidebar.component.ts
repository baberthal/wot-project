//===- dashboard-sidebar.component - Dashboard Sidebar Component -----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { CurrentConditions, SensorData } from "@/api/weather";
import { Component, Filter, Prop, Vue } from "@/core";

import SearchBox from "../search-box";

import template from "./dashboard-sidebar.template.html";

@Component({
  template,
  components: {
    SearchBox
  }
})
export class DashboardSidebar extends Vue {
  @Prop() currentConditions!: CurrentConditions;

  @Filter()
  formatUnit(unit: string): string {
    switch (unit) {
      case "celsius":
        return "C";
      case "fahrenheit":
        return "F";
      case "percent":
        return "%";
      default:
        return unit;
    }
  }
}

export default DashboardSidebar;
