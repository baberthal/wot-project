//===- device.spec.ts - Brief Description ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Device, GPIODevice } from "src/gpio/device";
import { Pin, PinFactory } from "src/gpio/pins";
import {
  PiGPIOMockFactory as PiGPIOFactory,
  PiGPIOMockPin as PiGPIOPin
} from "src/gpio/pins/pigpio_mock";

describe("Device", () => {
  const mockFactory = new PiGPIOFactory();
  // Device.pinFactory = mockFactory;

  let device: GPIODevice;
  const pin: PiGPIOPin = mockFactory.pin(2) as PiGPIOPin;

  describe(".pinFactory", () => {
    let oldFactory: PinFactory;

    beforeEach(() => {
      oldFactory = Device.pinFactory;
      device = new GPIODevice(2);
    });

    afterEach(() => {
      Device.pinFactory = oldFactory;
    });

    it("defaults to the mock factory when NODE_ENV=test", () => {
      const oldenv = process.env.NODE_ENV;
      process.env.NODE_ENV = "test";
      expect(Device.pinFactory).toBeInstanceOf(PiGPIOFactory);
      process.env.NODE_ENV = oldenv;
    });

    it("can set the factory", () => {
      Device.pinFactory = mockFactory;
      expect(Device.pinFactory).toBe(mockFactory);
    });
  });

  describe("with bad pin", () => {
    it("throws", () => {
      expect(() => {
        new GPIODevice(99);
      }).toThrowError("Invalid GPIO port 99 specified");
      expect(() => {
        new GPIODevice("BCM60");
      }).toThrowError("Invalid GPIO port 60 specified");
      expect(() => {
        new GPIODevice("GPIO60");
      }).toThrowError("Invalid GPIO port 60 specified");
    });
  });

  describe("#constructor", () => {
    beforeEach(() => {
      Device.pinFactory = mockFactory;
      device = new GPIODevice(2);
    });

    it("constructs an open device on the right pin", () => {
      expect(device.closed).toBe(false);
      expect(device.pin.number).toEqual(2);
      expect(Object.is(device.pin, pin)).toBeTruthy();
    });
  });

  describe("#close()", () => {
    beforeEach(() => {
      Device.pinFactory = mockFactory;
      device = new GPIODevice(2);
    });

    it("properly closes the device", () => {
      device.close();
      expect(device.closed).toEqual(true);
      expect(device.pin).toEqual(null);
    });
  });

  describe("#toString()", () => {
    beforeEach(() => {
      Device.pinFactory = mockFactory;
      device = new GPIODevice(2);
    });

    it("returns a string", () => {
      expect(device.toString()).toEqual(
        "[object gpio.GPIODevice on pin GPIO2, isActive=false]"
      );
    });
  });
});
