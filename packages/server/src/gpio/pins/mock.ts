//===- gpio/pins/mock.ts - Mock Pin ----------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { MONOTONIC, gettime } from "@wot/clock";

import { GPIOPinMode } from "../types";

import { Pin, PinFactory } from "./pin";

interface PinState {
  timestamp: number;
  state: number;
}

function PinState(timestamp: number, state: number): PinState {
  return { timestamp, state };
}

export class MockPinFactory extends PinFactory {
  static readonly pins = new Map<number, Pin>();

  readonly pinConstructor = MockPin;

  constructor() {
    super();
    this.pins = MockPinFactory.pins;
  }

  ticks(): number {
    return gettime(MONOTONIC).sec;
  }

  ticksDiff(later: number, earlier: number): number {
    return (later >> 0) - (earlier >> 0);
  }

  /** @internal */
  _getRevision(): string | number {
    return 0xa020d3;
  }
}

export class MockPin extends Pin {
  private _mode: GPIOPinMode;
  private _state: number;

  get mode(): GPIOPinMode {
    return this._mode;
  }

  get state(): number {
    return this._state;
  }

  set state(value: number) {
    if (this._mode === "input") {
      throw new Error(`Can't set state of pin ${this}`);
    }
  }

  constructor(factory: PinFactory, pinNumber: number) {
    super(factory, pinNumber);
    this._mode = "input";
    this._state = 1;
  }

  enableEventDetect(): void {
    throw new Error("Method not implemented.");
  }
  disableEventDetect(): void {
    throw new Error("Method not implemented.");
  }

  protected _invokeCallback(ticks?: number, state?: number) {
    super._invokeCallback(ticks || this._factory.ticks(), state || this.state);
  }
}
