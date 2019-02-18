//===- resources/interfaces.ts - Resources Interface Defs ------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface StringMap<T> {
  [key: string]: T;
}

export interface GroupedStringMap<T> {
  [groupName: string]: StringMap<T>;
}

export interface IResourcesConfig {
  [id: string]: IDeviceConfig;
}

export interface IDeviceConfig {
  /** Name of the device (human-readable). */
  name: string;

  /** Human-readable description for this device. */
  description: string;

  /** Port on which this device is listening. */
  port: number;

  /** Configurations for attached sensors, by id. */
  sensors: StringMap<ISensorConfig> | GroupedStringMap<ISensorConfig>;

  /** Configurations for attached actuators, by group by id. */
  actuators: StringMap<IActuatorConfig> | GroupedStringMap<IActuatorConfig>;
}

export interface ISensorConfig {
  /** Name of this sensor (human-readable). */
  name: string;

  /** Description of this sensor. */
  description: string;

  /** Unit of the value returned by this sensor. */
  unit?: string;

  /** A value for the sensor. Optional. */
  value?: number | boolean | string;

  /** The GPIO pin to which this sensor is attached. */
  gpio: number;
}

export interface IActuatorConfig {
  /** Name of this actuator (human-readable). */
  name: string;

  /** Description of this actuator. */
  description?: string;

  /** The current value of this actuator. Optional. */
  value?: number | string | boolean;

  /** The GPIO pin to which this actuator is attached. */
  gpio: number;
}

export function isSensorConfig(arg: object): arg is ISensorConfig {
  return typeof (arg as ISensorConfig).gpio !== "undefined";
}

export const isActuatorConfig: (
  arg: object
) => arg is IActuatorConfig = isSensorConfig;
