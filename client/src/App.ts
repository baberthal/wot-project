//===- App.ts - Main App Component -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue, Component } from "@/core";
import { AppNavbar, DashboardContent, DashboardSidebar } from "@/components";
import { getTemperatureData, TemperatureData } from "@/api/weather";

import template from "./App.template.html";

@Component({
  template,

  components: {
    AppNavbar,
    DashboardContent,
    DashboardSidebar
  }
})
export default class App extends Vue {
  weatherData: TemperatureData = null!;

  async beforeCreate() {
    this.weatherData = await getTemperatureData();
  }
}
