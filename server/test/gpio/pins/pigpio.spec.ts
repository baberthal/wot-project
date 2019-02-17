//===- pigpio.spec.ts - pigpio pin / factory spec --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  PiGPIOMockFactory as PiGPIOFactory,
  PiGPIOMockPin as PiGPIOPin
} from "src/gpio/pins/pigpio_mock";

describe("PiGPIOPin", () => {
  let factory: PiGPIOFactory;
  beforeEach(() => {
    factory = new PiGPIOFactory();
  });

  describe("#pin", () => {
    it("returns a PiGPIOPin", () => {
      const pin = factory.pin(4);
      expect(pin).toBeInstanceOf(PiGPIOPin);
    });
  });
});
