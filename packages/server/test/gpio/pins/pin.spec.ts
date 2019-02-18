//===- pin.spec.ts - Pin Spec ----------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Pin } from "src/gpio/pins";
import { PiGPIOMockFactory as PiGPIOFactory } from "src/gpio/pins/pigpio_mock";

describe("Pin", () => {
  const factory = new PiGPIOFactory();
  let pin: Pin;

  beforeEach(() => {
    pin = factory.pin(2);
  });

  describe("#toString", () => {
    it("returns a representation of the pin", () => {
      expect(pin.toString()).toEqual("GPIO2");
    });
  });
});
