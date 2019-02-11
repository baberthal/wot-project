//===- pin.spec.ts - Pin Spec ----------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { PiGPIOMockFactory, Pin } from "src/resources/pins";

describe("Pin", () => {
  const factory = new PiGPIOMockFactory();
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
