//===- temp-info.component - TempInfo Component ----------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { SensorData, getSensorData } from "@/api";
import { Component, Vue, fetchJson } from "@/core";

import template from "./temp-info.template.html";

@Component({
  template
})
export class TempInfo extends Vue {
  socket!: WebSocket;

  data: SensorData[] = [];

  mounted() {
    if (this.socket === undefined) {
      this.socket = new WebSocket(
        "ws://devices.webofthings.io/pi/sensors/temperature"
      );
      this.socket.onmessage = event => {
        const result = JSON.parse(event.data);
        this.data.push(result);
      };
    }
  }

  async beforeCreate() {
    const first = await getSensorData("temperature");
    this.data.push(first);
  }
}

interface TempInfoConfig {
  value: number;
  unit: string;
}

export default TempInfo;
