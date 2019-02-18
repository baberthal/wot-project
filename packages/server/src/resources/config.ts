//===- resources/config.ts - Resources Configuration -----------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface WoTHostConfig {
  /**
   * Name of the host.
   */
  name: string;

  /**
   * Human-readable description for this host.
   */
  description: string;

  /**
   * Port on which this host is listening.
   */
  port: number;

  /**
   * Configuration for attached devices.
   */
  devices: DeviceConfig[];
}

export interface DeviceConfig {
  /**
   * Human-readable name of this device.
   */
  name: string;

  /**
   * Human-readable description for this device.
   */
  description: string;

  /**
   * The GPIO pin the device is attached to.
   *
   * @minimum 0
   * @maximum 54
   * @TJS-type integer
   */
  pin: number;

  /**
   * Configuration for values produced by this device.
   */
  values: { [valueName: string]: ValueConfig };
}

export interface ValueConfig {
  /**
   * A human-readable caption for this value.
   */
  name?: string;

  /**
   * A human-readable description of this value.
   */
  description?: string;

  /**
   * Type of this value.
   *
   * @default "boolean"
   */
  type?: "integer" | "float" | "boolean" | "string";

  /**
   * Unit for the value.
   */
  unit?: string;

  /**
   * Specifies whether this value is required or optional. If omitted, the
   * default is `true`.
   *
   * @default true
   */
  required?: boolean;

  /**
   * Optional minimum valid value.
   */
  minValue?: number;

  /**
   * Optional maximum valid value.
   */
  maxValue?: number;
}
