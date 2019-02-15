//===- Device.spec.ts - Device spec ----------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Device } from "src/models";

describe(Device, () => {
  let device: Device;

  describe("with valid attributes", () => {
    const deviceAttributes = {
      id: "dht22-outdoor",
      name: "Outdoor DHT22 Sensor",
      description: "A temperature and humidity sensor, located outdoors",
      pin: 4
    };

    beforeEach(() => (device = Device.build(deviceAttributes)));

    it("is valid", () => {
      return expect(device.validate()).resolves.toBe(device);
    });
  });

  describe("with invalid attributes", () => {
    const deviceAttributes = {
      id: "dht22-indoor",
      name: "Indoor DHT22 Sensor",
      description: "A temperature and humidity sensor, located outdoors",
      pin: 60
    };

    beforeEach(() => (device = Device.build(deviceAttributes)));

    it("is invalid", async () => {
      return expect(device.validate()).rejects.toThrow("Validation error");
    });
  });
});
