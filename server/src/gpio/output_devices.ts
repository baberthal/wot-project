//===- gpio/output_devices.ts - Output Devices -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Lock } from "../util/lock";

import { GPIODevice } from "./device";

export class LED extends GPIODevice {
  private _lock: Lock;

  constructor(pin: number) {
    super(pin);
    this._lock = new Lock();
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

  get value(): number {
    return this._read();
  }

  set value(val: number) {
    this._write(val);
  }

  get closed(): boolean {
    return this._pin == null;
  }

  protected _valueToState(value: boolean): boolean {
    return Boolean(value ? this._activeState : this._inactiveState);
  }

  private _write(value: number | boolean) {
    this._pin.state = value ? 1 : 0;
  }
}
