//===- resources/pins/pin.ts - Pin Abstraction -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";
import { use } from "typescript-mix";

import log from "../logger";
import { GPIOPinEdge, GPIOPinMode, GPIOPinPullUp } from "../types";

import { PiInfo, piInfo } from "./info";

interface Constructor<T> extends Function {
  new (...args: any[]): T;
}

export type FactoryFn<T> = {
  <U extends T>(t: Constructor<U>): U;
};

/**
 * Generates pins and SPI interfaces for devices. This is an abstract
 * base class for pin factories. Descendents *must* override the following
 * methods:
 *
 *   * `ticks`
 *   * `ticksDiff`
 */
export abstract class PinFactory {
  protected pins: Map<number, Pin>;
  protected _info: PiInfo;

  get piInfo(): PiInfo {
    log.debug("---> PinFactory#piInfo()");
    if (this._info === null) {
      this._info = piInfo(this._getRevision());
    }
    log.debug("<--- PinFactory#piInfo()");
    return this._info;
  }

  constructor() {
    log.debug("---> PinFactory#constructor()");
    this._info = null!;
    this.pins = new Map();
    log.debug("<--- PinFactory#constructor()");
  }

  close() {
    log.debug("---> PinFactory#close()");
    for (const pin of this.pins.values()) {
      pin.close();
    }
    this.pins.clear();
    log.debug("<--- PinFactory#close()");
  }

  /** */
  pin(spec: string | number): Pin {
    log.debug(`---> PinFactory#pin(${spec})`);
    const n = this.piInfo.toGPIO(spec);
    let pin = this.pins.get(n);
    if (!pin) {
      pin = new this.pinConstructor(this, n);
      this.pins.set(n, pin);
    }
    log.debug(`<--- PinFactory#pin(${spec})`);
    return pin;
  }

  abstract get pinConstructor(): Constructor<Pin>;

  /** */
  abstract ticks(): number;

  /** */
  abstract ticksDiff(later: number, earlier: number): number;

  abstract _getRevision(): string | number;
}

// export interface Pin extends EventEmitter {
//   on(event: "change", cb: (tick: number, state: number) => void): this;
//   on(event: "newListener", cb: (evt: string, listener: Function) => void): this;
//   on(
//     event: "removeListener",
//     cb: (evt: string, listener: Function) => void
//   ): this;
//   on(event: string, cb: (...args: any[]) => void): this;
// }

export type PinCallback = (ticks: number, state: number) => void;

export abstract class Pin {
  protected _factory: PinFactory;
  protected _number: number;
  protected _callback: PinCallback | null;

  get factory(): PinFactory {
    return this._factory;
  }

  get number(): number {
    return this._number;
  }

  constructor(factory: PinFactory, num: number) {
    this._factory = factory;
    this._callback = null;
    this._number = num;
  }

  outputWithState(state: number) {
    log.debug(`---> Pin#outputWithState(${state})`);
    this.mode = "output";
    this.state = state;
    log.debug(`<--- Pin#outputWithState(${state})`);
  }

  inputWithPull(pull: GPIOPinPullUp) {
    log.debug(`---> Pin#inputWithPull(${pull})`);
    this.mode = "input";
    this.pull = pull;
    log.debug(`<--- Pin#inputWithPull(${pull})`);
  }

  abstract get mode(): GPIOPinMode;

  abstract set mode(value: GPIOPinMode);

  abstract get state(): number;

  abstract set state(value: number);

  get callback(): PinCallback | null {
    log.debug("Pin#callback{ get }");
    if (this._callback == null) {
      return null;
    }

    return this._callback;
  }

  set callback(value: PinCallback | null) {
    log.debug("Pin#callback{ set }");
    if (value == null) {
      if (this._callback != null) {
        this.disableEventDetect();
      }

      this._callback = null;
    } else {
      const enabled = this._callback == null;
      this._callback = value;
      if (!enabled) {
        this.enableEventDetect();
      }
    }
  }

  get pull(): GPIOPinPullUp {
    return "floating";
  }

  set pull(value: GPIOPinPullUp) {
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
    return "both";
  }

  set edges(value: GPIOPinEdge) {
    throw new Error(`Edge detection is not supported on pin ${this}`);
  }

  abstract enableEventDetect(): void;

  abstract disableEventDetect(): void;

  close() {}

  toString() {
    return this[Symbol.toStringTag];
  }

  get [Symbol.toStringTag]() {
    return `GPIO${this._number}`;
  }

  get __repr__(): string {
    return this[Symbol.toStringTag];
  }

  protected _invokeCallback(...args: any[]): void;
  protected _invokeCallback(ticks: number, state: number) {
    log.debug(`Pin#_invokeCallback(${ticks}, ${state})`);
    const cb = this._callback;
    if (cb == null) {
      this.callback = null;
    } else {
      cb(ticks, state);
    }
  }
}
