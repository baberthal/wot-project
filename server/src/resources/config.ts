//===- resources/config.ts - Resources Configuration -----------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fs from "fs";

import * as defaultConfig from "./default_config.json";
import {
  IActuatorConfig,
  IDeviceConfig,
  IResourcesConfig,
  ISensorConfig
} from "./interfaces";

export class ResourcesConfig {
  static Default: ResourcesConfig = new ResourcesConfig(defaultConfig);

  readonly devices: { [id: string]: DeviceConfig } = {};

  /**
   * Load a ResourcesConfig from a given path or file descriptor.
   *
   * @param path The path of the file, or an open file descriptor
   */
  static load(path: string | number): Promise<ResourcesConfig> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) reject(err);

        try {
          const json = JSON.parse(data);
          const config = new ResourcesConfig(json);
          resolve(config);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  constructor(config?: IResourcesConfig) {
    if (config) {
      for (let i = 0, keys = Object.keys(config); i < keys.length; i++) {
        const key = keys[i];
        this.devices[key] = new DeviceConfig(key, config[key]);
      }
    } else {
      this.devices = Object.assign({}, ResourcesConfig.Default.devices);
    }
  }
}

export class DeviceConfig {
  /** Unique ID of this device (machine-readable). */
  readonly id: string;

  /** Name of the device (human-readable). */
  readonly name: string;

  /** Human-readable description for this device. */
  readonly description: string;

  /** Port on which this device is listening. */
  readonly port: number;

  /** Configurations for attached sensors, by id. */
  readonly sensors: { [id: string]: SensorConfig } = {};

  /** Configurations for attached actuators, by group by id. */
  readonly actuators: {
    [group: string]: {
      [id: string]: ActuatorConfig;
    };
  } = {};

  constructor(id: string, config: IDeviceConfig) {
    this.id = id;
    this.name = config.name;
    this.description = config.description;
    this.port = config.port;

    const sensors = config.sensors;
    for (let i = 0, keys = Object.keys(sensors); i < keys.length; i++) {
      const key = keys[i];
      this.sensors[key] = new SensorConfig(key, config.sensors[key]);
    }

    const actuators = config.actuators;
    for (let i = 0, keys = Object.keys(actuators); i < keys.length; i++) {
      const key = keys[i];
    }
  }
}

export class SensorConfig {
  /** Unique ID of this device (machine-readable). */
  readonly id: string;

  /** Name of the device (human-readable). */
  readonly name: string;

  /** Human-readable description for this device. */
  readonly description: string;

  /** Unit of the value returned by this sensor. */
  readonly unit?: string;

  /** A value for the sensor. Optional. */
  value?: number | boolean | string;

  /** The GPIO pin to which this sensor is attached. */
  readonly gpio: number;

  constructor(id: string, config: ISensorConfig) {
    this.id = id;
    this.name = config.name;
    this.description = config.description;
    this.unit = config.unit;
    this.value = config.value;
    this.gpio = config.gpio;
  }
}

export class ActuatorConfig {
  /** Unique ID of this device (machine-readable). */
  readonly id: string;

  /** Name of the device (human-readable). */
  readonly name: string;

  /** Human-readable description for this device. */
  readonly description?: string;

  /** The current value of this actuator. Optional. */
  value?: number | string | boolean;

  /** The GPIO pin to which this sensor is attached. */
  readonly gpio: number;

  constructor(id: string, config: IActuatorConfig) {
    this.id = id;
    this.name = config.name;
    this.description = config.description;
    this.value = config.value;
    this.gpio = config.gpio;
  }
}