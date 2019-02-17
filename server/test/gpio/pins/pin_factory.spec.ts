//===- pin_factory.spec.ts - Pin Factory Spec ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { PinFactory } from "src/gpio/pins";
import { PiGPIOMockFactory as PiGPIOFactory } from "src/gpio/pins/pigpio_mock";

describe("PinFactory", () => {
  const factory: PinFactory = new PiGPIOFactory();

  describe(".toGPIO", () => {});
});
