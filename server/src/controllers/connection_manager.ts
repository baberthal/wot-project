//===- controllers/connection_manager.ts - Manages hardware connections ----===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { ControllerBase } from "./base_controller";

export class ConnectionManager {
  readonly connectedControllers: ControllerBase[] = [];

  /**
   * A map of `propertyId`s to the corresponding controller subclass.
   */
  readonly registeredControllers: Map<string, ControllerBase> = new Map();

  /**
   * Registers a controller to be used for a given `propertyId`.
   *
   * Throws an error if the propertyId has already been registered, and the
   * controller subclass is a different class than the previously registered one.
   *
   * Returns true if the controller was added, false otherwise.
   */
  registerController(propertyId: string, ctrl: ControllerBase): boolean {
    const existing = this.registeredControllers.get(propertyId);
    if (existing) {
      if (existing === ctrl) return false;
      throw new Error(
        `propertyId '${propertyId}' has already been registered! Was: ${existing}`
      );
    }

    this.registeredControllers.set(propertyId, ctrl);
    return true;
  }
}
