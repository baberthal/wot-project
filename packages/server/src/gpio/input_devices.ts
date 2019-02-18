//===- gpio/input_devices.ts - Input devices -------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { include } from "../util/mixins";

import { GPIODevice, GPIODeviceOptions } from "./device";
import { PinFactory } from "./pins";
import { GPIOPinPullUp } from "./types";

//  InputDevice {{{ //

export interface InputDeviceOptions extends GPIODeviceOptions {
  pullUp?: boolean;
  activeState?: boolean;
}

/**
 * Represents a generic GPIO input device.
 *
 * This class extends {@link GPIODevice} to add facilities common to GPIO input
 * devices.  The constructor adds the optional *pullUp* parameter to specify how
 * the pin should be pulled by the internal resistors. The
 * [[GPIODevice#isActive]] property is adjusted accordingly so that
 * `true` still means active regardless of the *pullUp* setting.
 *
 * @param pin
 *   The GPIO pin that the device is connected to. See :ref:`pin-numbering` for
 *   valid pin numbers. If this is `undefined` an Error will be thrown.
 *
 * @param pullUp:
 *   If `true`, the pin will be pulled high with an internal resistor.  If
 *   `false` (the default), the pin will be pulled low.  If `none`, the pin will
 *   be floating. As we cannot automatically guess the active state when not
 *   pulling the pin, the *activeState* parameter must be passed.
 *
 * @param activeState:
 *   If `True`, when the hardware pin state is ``HIGH``, the software pin is
 *   ``HIGH``. If `false`, the input polarity is reversed: when the hardware pin
 *   state is ``HIGH``, the software pin state is ``LOW``.  Use this parameter to
 *   set the active state of the underlying pin when configuring it as not pulled
 *   (when *pullUp* is `None`). When *pull_up* is `true` or `false`, the active
 *   state is automatically set to the proper value.
 *
 * @param pinFactory:
 *   See `api_pins` for more information (this is an advanced feature which
 *   most users can ignore).
 */
export class InputDevice extends GPIODevice {
  constructor(
    pin: number,
    { pullUp = false, activeState, ...rest }: InputDeviceOptions
  ) {
    super(pin, rest);

    try {
      this.pin.mode = "input";
      const pull = getPullDirection(pullUp);
      if (this.pin.pull !== pull) this.pin.pull = pull;
    } catch (e) {
      this.close();
      throw e;
    }

    if (pullUp === undefined) {
      if (activeState === undefined)
        throw invalidPinState(this.pin.number, activeState);
      this._activeState = Boolean(activeState);
    } else {
      if (activeState !== undefined)
        throw invalidPinState(this.pin.number, activeState);
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
      return `${this.constructor.name} object on pin ${this.pin}, pullUp=${
        this.pullUp
      }, isActive=${this.isActive}`;
    } catch {
      return super[Symbol.toStringTag];
    }
  }
}

//  }}} InputDevice //

//  DigitalInputDevice {{{ //

export interface DigitalInputDeviceOptions extends InputDeviceOptions {
  bounceTime?: number;
}

/**
 * Represents a generic input device with typical on/off behaviour.
 *
 * This class extends {@link InputDevice} with machinery to fire the active and
 * inactive events for devices that operate in a typical digital manner: straight
 * forward on / off states with (reasonably) clean transitions between the two.
 */
export class DigitalInputDevice extends InputDevice {
  constructor(
    pin: number,
    { bounceTime, ...options }: DigitalInputDeviceOptions
  ) {
    super(pin, options);
    try {
      this.pin.bounce = bounceTime;
      this.pin.edges = "both";
      this.pin.callback = (ticks, state) => {
        // this._emitEvents(this.pinFactory.ticks(), Number(this.isActive));
      };
      process.nextTick(() => {
        // this._emitEvents(this.pinFactory.ticks(), Number(this.isActive));
      });
    } catch (e) {
      this.close();
      throw e;
    }
  }

  _pinChanged(ticks: number, state: boolean) {
    // this._emitEvents(ticks, this._stateToValue(state));
  }
}

//  }}} DigitalInputDevice //

//  Helpers {{{ //

function getPullDirection(arg?: boolean | null): GPIOPinPullUp {
  switch (arg) {
    case null:
    case undefined:
      return "floating";
    case true:
      return "up";
    case false:
      return "down";
    default:
      throw new Error(`Invalid pull: ${arg}`);
  }
}

function invalidPinState(pin: number, activeState: boolean | undefined): Error {
  if (activeState === undefined) {
    return new Error(
      `Pin ${pin} is NOT defined as floating, but "activeState" is defined!`
    );
  } else {
    return new Error(
      `Pin ${pin} is defined as floating, but "activeState" is NOT defined!`
    );
  }
}

//  }}} Helpers //
