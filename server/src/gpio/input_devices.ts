//===- gpio/input_devices.ts - Input devices -------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { GPIODevice } from "./device";
import { PinFactory } from "./pins";
import { GPIOPinPullUp } from "./types";

export class InputDevice extends GPIODevice {
  constructor(
    pin: number,
    {
      pullUp,
      activeState,
      pinFactory
    }: {
      pullUp?: boolean;
      activeState?: boolean;
      pinFactory?: PinFactory;
    }
  ) {
    super(pin, { pinFactory });
    try {
      this.pin.mode = "input";
      let pull: GPIOPinPullUp;
      switch (pullUp) {
        case undefined:
          pull = "floating";
          break;
        case true:
          pull = "up";
          break;
        case false:
          pull = "down";
          break;
        default:
          throw new Error(`Invalid pull: ${pull!}`);
      }

      if (this.pin.pull !== pull) {
        this.pin.pull = pull;
      }
    } catch (e) {
      this.close();
      throw e;
    }

    if (pullUp === undefined) {
      if (activeState === undefined) {
        throw new Error(
          `Pin ${
            this.pin.number
          } is defined as floating, but "activeState" is not defined!`
        );
      }
      this._activeState = Boolean(activeState);
    } else {
      if (activeState !== undefined) {
        throw new Error(
          `Pin ${
            this.pin.number
          } is NOT defined as floating, but "activeState" is defined!`
        );
      }
      this._activeState = pullUp ? false : true;
    }
    this._inactiveState = !this._activeState;
  }

  get pullUp() {
    const pull = this.pin.pull;
    if (pull === "floating") {
      return null;
    }
    return pull === "up";
  }

  get [Symbol.toStringTag]() {
    try {
      return `<resources.${this.constructor.name} object on pin ${
        this.pin
      }, pullUp=${this.pullUp}, isActive=${this.isActive}`;
    } catch {
      return super[Symbol.toStringTag];
    }
  }
}
