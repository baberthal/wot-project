//===- temperature-table.component - Temperature Table ---------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { SensorData } from "@/api";
import { Component, Filter, Prop, Vue } from "@app/core";

import template from "./temperature-table.template.html";

@Component({
  template
})
export class TemperatureTable extends Vue {
  @Prop() temperatureData!: SensorData[];
  @Prop() humidityData!: SensorData[];

  @Filter()
  extractDate(arg: Date | string) {
    const date = asDate(arg);
    return date.toLocaleDateString();
  }

  @Filter()
  extractTime(arg: Date | string) {
    const date = asDate(arg);
    return date.toLocaleTimeString();
  }
}

export default TemperatureTable;

function asDate(arg: Date | string): Date {
  if (typeof arg === "string") return new Date(arg);
  else return arg;
}
