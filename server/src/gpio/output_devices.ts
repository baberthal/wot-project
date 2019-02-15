//===- gpio/output_devices.ts - Output Devices -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Lock } from "../util/lock";

import { DeviceOptions, GPIODevice } from "./device";

export interface OutputDeviceOptions extends DeviceOptions {
  activeHigh?: boolean;
  initialValue?: boolean;
}

export class OutputDevice extends GPIODevice {
  private _lock: Lock;

  constructor(pin: string | number, options: OutputDeviceOptions = {}) {
    super(pin, options);
    this._lock = new Lock();
    this.activeHigh = options.activeHigh == null ? true : options.activeHigh;
    if (options.initialValue == null) {
      this.pin.mode = "output";
    } else {
      this.pin.outputWithState(this._valueToState(options.initialValue));
    }
  }

  protected _valueToState(value: boolean): number {
    return Boolean(value ? this._activeState : this._inactiveState) ? 1 : 0;
  }

  protected _write(value: boolean) {
    try {
      this.pin.state = this._valueToState(value);
    } catch (e) {
      this._checkOpen();
      throw e;
    }
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

  set value(value: 0 | 1) {
    this._write(Boolean(value));
  }

  get value(): 0 | 1 {
    return super.value as 0 | 1;
  }

  get activeHigh(): boolean | 0 | 1 {
    return this._activeState;
  }

  set activeHigh(value: boolean | 0 | 1) {
    this._activeState = value ? true : false;
    this._inactiveState = value ? false : true;
  }
}

export class LED extends OutputDevice {
  get isActive(): boolean {
    return Boolean(this.value);
  }

  get isLit(): boolean {
    return this.isActive;
  }
}
