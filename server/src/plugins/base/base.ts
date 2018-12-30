//===- plugins/base.ts - Base Plugin Class ---------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { inspect } from "util";

import { Base } from "../../models/base";
import logger from "../../util/logger";

export interface PluginParams {
  simulate: boolean;
  frequency: number;
}

export abstract class PluginBase {
  public params: PluginParams;

  // TODO: This should be injected in the constructor, so we can re-use
  // a different log object.
  protected readonly log = logger;
  protected interval!: NodeJS.Timeout;

  constructor(params?: PluginParams) {
    if (params) {
      this.params = params;
    } else {
      this.params = { simulate: false, frequency: 5000 };
    }
  }

  /** Abstract methods */

  /** The model object associated with this plugin. */
  abstract get model(): Base;

  /** Connects the hardware sensor of the associated model. */
  abstract connectHardware(): void;

  /**
   * Performs additional 'stop' routines, in addition to what the base class
   * provides.
   */
  abstract onStop(): void;

  /**
   * Performs a simulation of the hardware.
   */
  abstract performSimulation(): void;

  /** Function to create a value from data received by the sensor / actuator. */
  abstract createValue(data: any): object;

  /** Concrete getters */

  /** Returns true if the plugin was initialized with `{ simulate: true }`. */
  get isSimulation(): boolean {
    return this.params.simulate;
  }

  /** Returns the value of `params.frequency`. */
  get frequency(): number {
    return this.params.frequency;
  }

  /** Concrete methods */

  /**
   * Starts the plugin, either as a simulation or by connecting hardware,
   * dependent on the values passed in the constructor.
   */
  start() {
    if (this.isSimulation) {
      this.simulate();
    } else {
      this.connectHardware();
    }

    this.log.info("[plugin started] %s", this.model.name);
  }

  /**
   * Stops the plugin.
   */
  stop() {
    if (this.isSimulation) {
      clearInterval(this.interval);
    } else {
      this.onStop();
    }

    this.log.info("[plugin stopped] %s", this.model.name);
  }

  /**
   * Performs a simulation of the plugin, providing dummy data rather than
   * connecting actual hardware.
   */
  simulate() {
    this.interval = setInterval(() => {
      this.performSimulation();
      this.showValue();
    }, this.params.frequency);
    this.log.info("[simulation started] %s", this.model.name);
  }

  /**
   * Shows the current value of the associated model in the log.
   */
  showValue() {
    this.log.info("Current value for %s is %s", this.model.name);
  }
}
