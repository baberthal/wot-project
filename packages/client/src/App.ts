//===- App.ts - Main App Component -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  CurrentConditions,
  SensorData,
  getCurrentConditions,
  getSensorData
} from "@/api/weather";
import { AppNavbar, DashboardContent, DashboardSidebar } from "@/components";
import { Component, Vue } from "@/core";
import { WebSocketSubject, webSocket } from "rxjs/websocket";

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
  currentConditions: CurrentConditions = null!;
  weatherData: {
    temperature: SensorData;
    humidity: SensorData;
  } = null!;

  async beforeCreate() {
    this.currentConditions = await getCurrentConditions();
    this.weatherData = (await getSensorData()) as {
      temperature: SensorData;
      humidity: SensorData;
    };
  }
}
