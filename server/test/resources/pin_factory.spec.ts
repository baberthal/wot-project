//===- pin_factory.spec.ts - Pin Factory Spec ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { PiGPIOMockFactory, PinFactory } from "src/resources/pins";

describe("PinFactory", () => {
  const factory: PinFactory = new PiGPIOMockFactory();

  describe(".toGPIO", () => {
    describe("when passed an integer", () => {
      it("returns the same if it is valid", () => {
        const pin = factory.toGPIO(2);
        expect(pin).toEqual(2);
      });

      it("throws if the pin number is out of range", () => {
        expect(() => {
          factory.toGPIO(67);
        }).toThrowError("Invalid GPIO port 67 specified");
        expect(() => {
          factory.toGPIO(-2);
        }).toThrowError("Invalid GPIO port -2 specified");
      });
    });

    describe("when passed a string", () => {
      it("returns the pin number of the spec if valid", () => {
        let pin = factory.toGPIO("GPIO42");
        expect(pin).toEqual(42);
        pin = factory.toGPIO("BCM41");
        expect(pin).toEqual(41);
        pin = factory.toGPIO("37");
        expect(pin).toEqual(37);
      });

      it("throws if the pin number is out of range", () => {
        expect(() => {
          factory.toGPIO("GPIO77");
        }).toThrowError("Invalid GPIO port 77 specified");
        expect(() => {
          factory.toGPIO("67");
        }).toThrowError("Invalid GPIO port 67 specified");
        expect(() => {
          factory.toGPIO("BCM87");
        }).toThrowError("Invalid GPIO port 87 specified");
      });
    });
  });
});
