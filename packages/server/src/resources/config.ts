//===- resources/config.ts - Resources Configuration -----------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fs from "fs";

import logger from "../util/logger";

const log = logger.child({ name: "config" });

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
   * Interface the server is listening on.
   */
  host: string;

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
   * ID of the device. If not provided, will be randomly generated.
   */
  id: string;

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

/**
 * Loads a config from a file.
 */
export function loadConfig(path: string): Promise<WoTHostConfig> {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.R_OK, err => {
      if (err) return reject(err);
      fs.readFile(path, "utf8", (err, data) => {
        if (err) return reject(err);

        try {
          const json = JSON.parse(data);
          if (isHostConfig(json)) {
            return json;
          } else {
            return reject(
              new Error("loaded object is not a properly-formatted host config")
            );
          }
        } catch (e) {
          log.error(e);
          return reject(e);
        }
      });
    });
  });
}

/**
 * Resolves the argument `filename` if file exists and is readable, otherwise
 * rejects with the error.
 */
function checkReadable(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.constants.R_OK, err => {
      if (err) reject(err);
      resolve(filename);
    });
  });
}

/**
 * Reads and returns the contents of `filename`. Rejects with the error if there
 * was one.
 */
function readFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function isHostConfig(obj: any): obj is WoTHostConfig {
  return (
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    typeof obj.host === "string" &&
    typeof obj.port === "number" &&
    Array.isArray(obj.devices)
  );
}
