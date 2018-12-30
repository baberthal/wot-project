//===- controllers/base_controller.ts - Base controller class --------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Device, Sensor, Actuator, ActuatorGroup } from "../models";
import { Logger } from "../util/types";

export interface ControllerBaseInit {
  log: Logger;

  params: {
    simulate: boolean;
    frequency: number;
  };
}

export interface ControllerConstructor {
  new (model: Sensor | Actuator, init: ControllerBaseInit): ControllerBase;
}

export abstract class ControllerBase {
  /** The name of the WebThing model property covered by this controller. */
  static propertyId: string;

  /** True if no hardware is to be connected. */
  public readonly isSimulation: boolean;

  /** Frequency (in ms) of the simulation. */
  public readonly frequency: number;

  protected log: Logger;
  /** The model that the controller is controlling. */
  protected model: Sensor | Actuator;

  protected interval!: NodeJS.Timeout;
  protected conn!: import("onoff").Gpio;

  constructor(model: Sensor | Actuator, init: ControllerBaseInit) {
    this.model = model;

    this.log = init.log;

    const params = init.params || {
      simulate: false,
      frequency: 5000
    };
    this.isSimulation = params.simulate;
    this.frequency = params.frequency;
  }

  /** The name of the controller. */
  get name(): string {
    return this.constructor.name.replace(/Controller$/, "");
  }

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

    this.log.info("[controller started] %s", this.name);
  }

  /**
   * Stops the plugin. Any additional cleanup needed should be implemented in the
   * `onStop()` method.
   */
  stop() {
    if (this.isSimulation) {
      clearInterval(this.interval);
    } else {
      this.onStop();
    }

    this.log.info("[controller stopped] %s", this.name);
  }

  /**
   * Performs a simulation of the controller, providing dummy data rather than
   * connecting actual hardware.
   */
  simulate() {
    this.interval = setInterval(() => {
      this.performSimulation();
    }, this.frequency);
    this.log.info("[simulation started] %s", this.name);
  }

  showValue() {
    this.log.info("[detected value change] %s", this.name);
  }
}
