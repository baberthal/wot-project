//===- resources/device_controller.ts - Device controller wrapper ----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { monotonic } from "@wot/clock";
import { isDevMode } from "@wot/core";

import { GPIODevice } from "../gpio/device";
import { Value } from "../models";
import { Logger } from "../util/logger";

/**
 * Params for the device controller.
 */
export interface DeviceControllerSettings {
  simulate?: boolean;
  frequency?: number;
}

/**
 * A small wrapper to provide timers and simulations for attached devices.
 */
export class DeviceController<D extends GPIODevice, V extends typeof Value> {
  static readonly log: Logger;

  readonly device: D;
  readonly valueType: V;
  readonly isSimulation: boolean;
  readonly frequency: number;

  private _interval!: NodeJS.Timer;

  get name(): string {
    return this.device.toString();
  }

  protected get log(): Logger {
    return DeviceController.log;
  }

  constructor(device: D, valueType: V, settings: DeviceControllerSettings) {
    this.device = device;
    this.valueType = valueType;
    this.isSimulation = settings.simulate || !isDevMode();
    this.frequency = settings.frequency || 5000;
  }

  start() {
    if (this.isSimulation) {
      this.simulate();
    } else {
      // TODO: Connect to the device and begin reading values
    }
  }

  stop() {
    if (this.isSimulation) {
      clearInterval(this._interval);
    } else {
      // TODO: Disconnect the device
    }
  }

  simulate() {
    this._interval = setInterval(() => {
      this.logValue();
    }, this.frequency);
    this.log.info("[simulator started] %s", this.name);
  }

  logValue() {}

  async addValue(data: { temperature: number; humidity: number }) {
    return this.valueType.create({

    });
  }

  createValue(data: unknown) {}
}
