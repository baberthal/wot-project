//===- temp-info.component - TempInfo Component ----------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Vue, fetchJson } from "@app/core";
import template from "./temp-info.template.html";

import { TemperatureData, getTemperatureData } from "@/api";

@Component({
  template
})
export class TempInfo extends Vue {
  socket!: WebSocket;

  data: TemperatureData[] = [];

  mounted() {
    if (this.socket === undefined) {
      this.socket = new WebSocket(
        "ws://devices.webofthings.io/pi/sensors/temperature"
      );
      this.socket.onmessage = event => {
        const result = JSON.parse(event.data);
        console.log(result);
        this.data.push(result);
      };
    }
  }

  async beforeCreate() {
    const first = await getTemperatureData();
    this.data.push(first);
  }
}

interface TempInfoConfig {
  value: number;
  unit: string;
}

export default TempInfo;
