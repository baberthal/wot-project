//===- actuator_controller.ts - Base class for actuator controllers --------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { ControllerBase } from "./base_controller";

export abstract class ActuatorControllerBase extends ControllerBase {
  /** An array of 'actions' to observe. */
  abstract get actions(): string[];

  /**
   * Function to be invoked when an action is performed.
   * @param action the id of the action to be invoked.
   */
  abstract onAction(action: string): void;
}
