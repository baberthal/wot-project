//===- temp-info.component - TempInfo Component ----------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Vue, fetchJson } from "@app/core";
import template from "./temp-info.template.html";

@Component({
  template
})
export class TempInfo extends Vue {
  socket!: WebSocket;

  info: TempInfoConfig | null = null;

  mounted() {
    if (this.socket !== undefined) {
      this.socket = new WebSocket(
        "ws://devices.webofthings.io/pi/sensors/temperature"
      );
      this.socket.onmessage = event => {
        const result = JSON.parse(event.data);
        console.log(result);
      };
    }
    fetchJson<TempInfoConfig>(
      "http://devices.webofthings.io/pi/sensors/temperature"
    )
      .then(data => (this.info = data))
      .catch(error => console.error(error));
  }
}

interface TempInfoConfig {
  value: number;
  unit: string;
}

export default TempInfo;
