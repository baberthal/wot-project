//===- models/device.ts - Represents a device ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { ActuatorConfig, Actuator, ActuatorGroup } from "./actuator";
import { Base } from "./base";
import { SensorConfig, Sensor } from "./sensor";

export interface DeviceConfig {
  name: string;
  description: string;
  port: number;
  sensors: {
    [id: string]: SensorConfig;
  };
  actuators: {
    [groupName: string]: {
      [id: string]: ActuatorConfig;
    };
  };
}

export class Device extends Base {
  public sensors: {
    [id: string]: Sensor;
  };

  public actuators: {
    [groupName: string]: ActuatorGroup;
  };

  constructor(id: string, config: DeviceConfig) {
    super(id, config);

    this.sensors = {};
    Object.keys(config.sensors).forEach(key => {
      this.sensors[key] = new Sensor(key, config.sensors[key]);
    });

    this.actuators = {};
    Object.keys(config.actuators).forEach(key => {
      this.actuators[key] = new ActuatorGroup(key, config.actuators[key]);
    });
  }
}