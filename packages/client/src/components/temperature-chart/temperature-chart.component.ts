//===- temperature-chart.component - Temperature Chart Component -----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { CurrentConditions, SensorData, WeatherData } from "@/api";
import { Component, Filter, Prop, Vue } from "@app/core";

import styles from "./temperature-chart.style.scss";
import template from "./temperature-chart.template.html";

@Component({
  template
})
export class TemperatureChart extends Vue {
  @Prop() currentConditions!: CurrentConditions;
  @Prop() weatherData!: { temperature: SensorData; humidity: SensorData };

  @Prop() temperatureData!: SensorData[];
  @Prop() humidityData!: SensorData[];

  @Filter()
  prettyDate(value: string | Date): string {
    if (!value) return "";
    let date: Date;

    if (typeof value === "string") date = new Date(value);
    else date = value;

    // FIXME: this is bad and assumes so much about the user's locale
    const timeFmt = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    const dateFmt = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    return `${timeFmt}, ${dateFmt}`;
  }

  beforeCreate() {
    this.$_injectStyles(styles);
  }
}

export default TemperatureChart;
