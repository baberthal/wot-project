//===- controllers/controller_manager.ts - Controller manager class --------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { ControllerBase, ControllerConstructor } from "./base_controller";

class ControllerManager {
  private _controllersByPropertyId: Map<
    string,
    ControllerConstructor
  > = new Map();

  /**
   * Registers a controller to be used for a given `propertyId`.
   *
   * Throws an error if the propertyId has already been registered, and the
   * controller subclass is a different class than the previously registered one.
   *
   * Returns true if the controller was added, false otherwise.
   */
  registerController(propertyId: string, ctrl: ControllerConstructor): boolean {
    const existing = this._controllersByPropertyId.get(propertyId);

    if (existing) {
      if (existing === ctrl) return false;
      throw new Error(
        `propertyId '${propertyId}' has already been registered! Was: ${existing}`
      );
    }

    this._controllersByPropertyId.set(propertyId, ctrl);
    return true;
  }

  /**
   * Returns the registered controller for the given `propertyId`.
   */
  controllerFor(propertyId: string): ControllerConstructor | undefined {
    return this._controllersByPropertyId.get(propertyId);
  }
}

export default new ControllerManager();
