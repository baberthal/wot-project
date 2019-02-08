//===- plugins/base_plugin.ts - Base plugin class --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { FastifyInstance, Logger, RegisterOptions } from "../util/types";

export interface PluginParams {
  simulate: boolean;
  frequency: number;
}

export interface PluginOptions extends RegisterOptions {
  params?: PluginParams;
}

const DefaultPluginParams: PluginParams = {
  simulate: false,
  frequency: 5000
};

export abstract class BasePlugin {
  readonly params: PluginParams;

  protected log: Logger;
  protected interval!: NodeJS.Timeout;
  // protected conn!: import("onoff").Gpio;

  constructor(instance: FastifyInstance, init: PluginOptions) {
    this.params = init.params || DefaultPluginParams;
    this.log = instance.log;
    this.log.info("BasePlugin#constructor(): %s", init);
  }

  abstract get name(): string;

  /** Connects the hardware sensor of the associated model. */
  abstract async connectHardware(): Promise<void>;

  /**
   * Performs additional 'stop' routines, in addition to what the base class
   * provides.
   */
  abstract onStop(): void;

  /**
   * Performs a simulation of the hardware.
   */
  abstract performSimulation(): void;

  abstract createValue(data: any): object;

  /**
   * Starts the plugin, either as a simulation or by connecting hardware,
   * dependent on the values passed in the constructor.
   */
  start() {
    if (this.params.simulate) {
      this.simulate();
    } else {
      this.connectHardware();
    }

    this.log.info("[plugin started] %s", this.name);
  }

  /**
   * Stops the plugin. Any additional cleanup needed should be implemented in the
   * `onStop()` method.
   */
  stop() {
    if (this.params.simulate) {
      clearInterval(this.interval);
    } else {
      this.onStop();
    }

    this.log.info("[plugin stopped] %s", this.name);
  }

  /**
   * Performs a simulation of the controller, providing dummy data rather than
   * connecting actual hardware.
   */
  simulate() {
    this.interval = setInterval(() => {
      this.performSimulation();
    }, this.params.frequency);
    this.log.info("[simulation started] %s", this.name);
  }

  showValue() {
    this.log.info("[detected value change] %s", this.name);
  }
}
