//===- test-blink.ts - Test some blinks ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import log from "./logger";
import { LED } from "./output_devices";

const PIN = 4;

const led = new LED(PIN);
let i: NodeJS.Timer;

log.debug(">>> Adding signal handler");
process.on("SIGINT", () => {
  led.off();
  clearInterval(i);
  log.info("Terminating...");
});

led.off();

i = setInterval(() => {
  led.toggle();
}, 3000);

led.off();
