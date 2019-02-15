//===- resources/pins/pin.ts - Pin Abstraction -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";
import { use } from "typescript-mix";

import { GPIOPinEdge, GPIOPinMode, GPIOPinPullDirection } from "../types";

import { PiInfo, piInfo } from "./info";

/**
 * Generates pins and SPI interfaces for devices. This is an abstract
 * base class for pin factories. Descendents *must* override the following
 * methods:
 *
 *   * `ticks`
 *   * `ticksDiff`
 */
export abstract class PinFactory<T extends Pin<any>> {
  protected pins: Map<number, T>;
  protected _info: PiInfo;

  get piInfo(): PiInfo {
    if (this._info === null) {
      this._info = piInfo(this._getRevision());
    }
    return this._info;
  }

  constructor() {
    this._info = null!;
    this.pins = new Map();
  }

  close() {
    for (const pin of this.pins.values()) {
      pin.close();
    }
    this.pins.clear();
  }

  /** */
  pin(spec: string | number): T {
    const n = this.piInfo.toGPIO(spec);
    let pin = this.pins.get(n);
    if (!pin) {
      pin = new this.pinClass(this, n);
      this.pins.set(n, pin);
    }
    return pin;
  }

  abstract get pinClass(): {
    new (factory: PinFactory<T>, num: number): T;
  };

  /** */
  abstract ticks(): number;

  /** */
  abstract ticksDiff(later: number, earlier: number): number;

  abstract _getRevision(): string | number;
}

export interface Pin<F extends PinFactory<any>> extends EventEmitter {
  on(event: "change", cb: (tick: number, state: number) => void): this;
}
export abstract class Pin<F extends PinFactory<any>> {
  @use(EventEmitter) this: any;

  protected _factory: F;
  protected _number: number;

  get factory(): F {
    return this._factory;
  }

  get number(): number {
    return this._number;
  }

  constructor(factory: F, num: number) {
    EventEmitter.call(this);
    this._factory = factory;
    this._number = num;
  }

  outputWithState(state: number) {
    this.mode = "output";
    this.state = state;
  }

  inputWithPull(pull: GPIOPinPullDirection) {
    this.mode = "input";
    this.pull = pull;
  }

  abstract get mode(): GPIOPinMode;

  abstract set mode(value: GPIOPinMode);

  abstract get state(): number;

  abstract set state(value: number);

  get pull(): GPIOPinPullDirection {
    return "floating";
  }

  set pull(value: GPIOPinPullDirection) {
    throw new Error(`Cannot change pull-up on pin ${this}`);
  }

  get frequency(): number | null {
    return null;
  }

  set frequency(value: number | null) {
    if (value !== null) {
      throw new Error("PinPWMUnsupported");
    }
  }

  get bounce(): number | undefined {
    return undefined;
  }

  set bounce(value: number | undefined) {
    if (value !== undefined) {
      throw new Error(`Edge detection is not supported on pin ${this}`);
    }
  }

  get edges(): GPIOPinEdge {
    return "none";
  }

  set edges(value: GPIOPinEdge) {
    throw new Error(`Edge detection is not supported on pin ${this}`);
  }

  protected abstract enableEventDetect(): void;

  protected abstract disableEventDetect(): void;

  close() {}

  get [Symbol.toStringTag]() {
    return `GPIO${this._number}`;
  }

  get __repr__(): string {
    return this[Symbol.toStringTag];
  }
}
