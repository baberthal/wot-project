//===- dashboard-content.component - Dashboard Content Component -----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { CurrentConditions, SensorData, getTemperatureStream } from "@/api";
import { Component, Prop, Vue } from "@app/core";
import { WebSocketSubject } from "rxjs/websocket";

import { TemperatureChart } from "../temperature-chart";
import { TemperatureTable } from "../temperature-table";

import template from "./dashboard-content.template.html";

@Component({
  template,
  components: {
    TemperatureChart,
    TemperatureTable
  }
})
export class DashboardContent extends Vue {
  @Prop() weatherData!: {
    temperature: SensorData;
    humidity: SensorData;
  };

  @Prop() currentConditions!: CurrentConditions;

  temperatureData: SensorData[] = [];

  humidityData: SensorData[] = [];

  temperatureStream!: WebSocketSubject<SensorData>;

  mounted() {
    this.temperatureStream = getTemperatureStream();
    this.temperatureStream.subscribe(t => this.temperatureData.push(t));
  }

  destroyed() {
    this.temperatureStream.unsubscribe();
  }
}

export default DashboardContent;
