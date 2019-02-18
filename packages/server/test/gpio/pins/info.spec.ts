//===- info.spec.ts - test pi info -----------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { PiInfo } from "src/gpio/pins/info";
import { PiGPIOMockFactory } from "src/gpio/pins/pigpio_mock";

describe("PiInfo", () => {
  let factory: PiGPIOMockFactory;
  let info: PiInfo;

  beforeEach(() => {
    factory = new PiGPIOMockFactory();
    info = factory.piInfo;
  });

  describe("#toGPIO", () => {
    describe("when passed an integer", () => {
      it("returns the same if it is valid", () => {
        const pin = info.toGPIO(2);
        expect(pin).toEqual(2);
      });

      it("throws if the pin number is out of range", () => {
        expect(() => {
          info.toGPIO(67);
        }).toThrowError("Invalid GPIO port 67 specified");
        expect(() => {
          info.toGPIO(-2);
        }).toThrowError("Invalid GPIO port -2 specified");
      });
    });

    describe("when passed a string", () => {
      it("returns the pin number of the spec if valid", () => {
        let pin = info.toGPIO("GPIO42");
        expect(pin).toEqual(42);
        pin = info.toGPIO("BCM41");
        expect(pin).toEqual(41);
        pin = info.toGPIO("37");
        expect(pin).toEqual(37);
      });

      it("throws if the pin number is out of range", () => {
        expect(() => {
          info.toGPIO("GPIO77");
        }).toThrowError("Invalid GPIO port 77 specified");
        expect(() => {
          info.toGPIO("67");
        }).toThrowError("Invalid GPIO port 67 specified");
        expect(() => {
          info.toGPIO("BCM87");
        }).toThrowError("Invalid GPIO port 87 specified");
      });
    });
  });
});
