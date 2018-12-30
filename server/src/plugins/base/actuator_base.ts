//===- plugins/base/actuator_base.ts - Base actuator plugin ----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Gpio } from "onoff";

import { Actuator } from "../../models/actuator";
import { PluginBase, PluginParams } from "./base";

export abstract class ActuatorPluginBase extends PluginBase {
  /** The actuator object being controlled by this plugin. */
  protected actuator!: Gpio;

  /** An array of 'actions' to observe. */
  abstract get actions(): string[];

  /**
   * Function to be invoked when an action is performed.
   * @param action the id of the action to be invoked.
   */
  abstract onAction(action: string): void;
}
