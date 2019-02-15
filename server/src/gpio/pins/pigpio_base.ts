//===- gpio/pins/pigpio.ts - PiGPIO Pin and Factory ------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { GPIOPinEdge, GPIOPinMode, GPIOPinPullUp } from "../types";

import { Pin, PinCallback, PinFactory } from "./pin";

type GpioClass = typeof import("pigpio").Gpio;
type GpioConnection = InstanceType<GpioClass>;

//  PiGPIOPin {{{ //

export abstract class PiGPIOPinBase extends Pin {
  protected _pull: GPIOPinPullUp;
  protected _pwm: boolean;
  protected _bounce?: number;
  protected _edges: number;

  abstract get connection(): GpioConnection;

  constructor(factory: PinFactory, num: number) {
    super(factory, num);

    this._pull = factory.piInfo.isPulledUp(this) ? "up" : "floating";
    this._pwm = false;
    this._bounce = null!;
    this._callback = null;
    this._edges = this._gpioEdge("both");
  }

  close() {
    if (this.connection) {
      this.frequency = null;
      // this.whenChanged = null;
      this.mode = "input";
      this.pull = this.factory.piInfo.isPulledUp(this) ? "up" : "floating";
    }
  }

  get mode(): GPIOPinMode {
    return this._gpioModeName(this.connection.getMode());
  }

  set mode(value: GPIOPinMode) {
    if (value !== "input") {
      this._pull = "floating";
    }
    const mode = this._gpioMode(value);
    if (!mode) {
      throw new Error(`Invalid function "${value}" for ${this}`);
    }
    this.connection.mode(mode);
  }

  get state(): number {
    if (this._pwm) {
      return this.connection.getPwmDutyCycle() / this.connection.getPwmRange();
    }

    return this.connection.digitalRead();
  }

  set state(value: number) {
    if (this._pwm) {
      try {
        value = value * this.connection.getPwmRange();
        if (value != this.connection.getPwmDutyCycle()) {
          this.connection.pwmWrite(value);
        }
      } catch (e) {
        throw new Error(`Invalid state: ${e}`);
      }
    } else if (this.mode === "input") {
      throw new Error("Can't set state of an input pin!");
    } else {
      this.connection.digitalWrite(value == 0 ? 0 : 1);
    }
  }

  get pull(): GPIOPinPullUp {
    return this._pull;
  }

  set pull(value: GPIOPinPullUp) {
    if (this.mode !== "input") {
      throw new Error("Can't set pull on non-input pin");
    }

    if (value !== "up" && this.factory.piInfo.isPulledUp(this)) {
      throw new Error(`${this} has a physical pull-up resistor`);
    }

    const pull = this._gpioPullUp(value);
    if (!pull) throw new Error(`invalid pull "${value}" for ${this}`);
    this.connection.pullUpDown(pull);
    this._pull = value;
  }

  get frequency(): number | null {
    if (this._pwm) return this.connection.getPwmFrequency();
    return null;
  }

  set frequency(value: number | null) {
    if (!this._pwm && value != null) {
      if (this.mode !== "output") {
        throw new Error(`cannot start PWM on pin ${this}`);
      }
      // NOTE: the pin's state *must* be set to zero; if it's currently
      // high, starting PWM and setting a 0 duty-cycle *doesn't* bring
      // the pin low; it stays high!
      this.connection.digitalWrite(0);
      this.connection.pwmFrequency(value);
      this.connection.pwmRange(10_000);
      this.connection.pwmWrite(0);
      this._pwm = true;
    } else if (this._pwm && value != null) {
      if (value != this.connection.getPwmFrequency()) {
        this.connection.pwmFrequency(value);
        this.connection.pwmRange(10_000);
      }
    } else if (this._pwm && value == null) {
      this.connection.digitalWrite(0);
      this._pwm = false;
    }
  }

  get bounce(): number | undefined {
    if (!this._bounce) return undefined;
    return this._bounce / 1_000_000;
  }

  set bounce(value: number | undefined) {
    const bounceValue: number = value == null ? 0 : value;
    if (bounceValue < 0) {
      throw new Error("Bounce value must be positive!");
    }
    this.connection.glitchFilter && this.connection.glitchFilter(bounceValue);
  }

  get edges(): GPIOPinEdge {
    return this._gpioEdgeName(this._edges);
  }

  set edges(value: GPIOPinEdge) {
    const f = this.callback;
    this.callback = null;
    try {
      this._edges = this._gpioEdge(value);
    } finally {
      this._callback = f;
    }
  }

  protected _invokeCallback(gpio: number, level: number, ticks: number) {
    super._invokeCallback(ticks, level);
  }

  abstract _gpioModeName(value: number): GPIOPinMode;

  abstract _gpioMode(name: GPIOPinMode): number;

  abstract _gpioEdgeName(value: number): GPIOPinEdge;

  abstract _gpioEdge(name: GPIOPinEdge): number;

  abstract _gpioPullUp(name: GPIOPinPullUp): number;
}

//  }}} PiGPIOPin //
