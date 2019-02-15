//===- pigpio.spec.ts - pigpio pin / factory spec --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as pigpio from "pigpio-mock";
import { PiGPIOFactory, PiGPIOPin } from "src/resources/pins/pigpio";

describe("PiGPIOPin", () => {
  let factory: PiGPIOFactory;
  beforeEach(() => {
    factory = new PiGPIOFactory(pigpio);
  });

  describe("#pin", () => {
    it("returns a PiGPIOPin", () => {
      const pin = factory.pin(4);
      expect(pin).toBeInstanceOf(PiGPIOPin);
    });
  });
});
