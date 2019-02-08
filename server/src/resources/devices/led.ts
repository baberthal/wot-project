//===- resources/devices/led.ts - LED Device -------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Gpio } from "pigpio-mock";

import { Lock } from "../../util/lock";

export class LED {
  /** GPIO pin the sensor is attached to. */
  readonly pin: number;

  private gpio!: Gpio;

  private _lock: Lock;

  protected _activeState: number = 1;

  protected _inactiveState: number = 0;

  constructor(pin: number) {
    this.pin = pin;
    this._lock = new Lock();
    this.gpio = new Gpio(pin, {
      mode: Gpio.OUTPUT
    });
  }

  on() {
    this._write(true);
  }

  off() {
    this._write(false);
  }

  async toggle() {
    await this._lock.withLock(() => {
      if (this.isActive) {
        this.off();
      } else {
        this.on();
      }
    });
  }

  get isActive(): boolean {
    return Boolean(this.value);
  }

  get isLit(): boolean {
    return this.isActive;
  }

  get value(): boolean {
    return this._read();
  }

  set value(val: boolean) {
    this._write(val);
  }

  get values() {
    return this._values();
  }

  get closed(): boolean {
    return this.gpio == null;
  }

  protected _stateToValue(state: number): boolean {
    return Boolean(state == this._activeState);
  }

  protected _valueToState(value: boolean): boolean {
    return Boolean(value ? this._activeState : this._inactiveState);
  }

  private *_values() {
    while (true) {
      try {
        yield this.value;
      } catch (e) {
        break;
      }
    }
  }

  private _read() {
    try {
      return this._stateToValue(this.gpio.digitalRead());
    } catch (e) {
      this._checkOpen();
      throw e;
    }
  }

  private _write(value: number | boolean) {
    this.gpio.digitalWrite(value ? 1 : 0);
  }

  private _checkOpen() {
    if (this.closed) {
      throw new Error(
        `DeviceClosed: ${this.constructor.name} is closed or uninitialized`
      );
    }
  }
}
