//===- test-blink.ts - Test some blinks ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { LED } from "./output_devices";

const PIN = 4;

const led = new LED(PIN);

led.off();

setInterval(() => {
  led.toggle();
}, 3000);

led.off();
