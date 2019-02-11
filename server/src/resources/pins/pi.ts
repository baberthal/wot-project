//===- resources/pins/pi.ts - Pi Pins --------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Constructor } from "../../util/ctor_types";
import { Lock } from "../../util/lock";

import { PinFactory } from "./factory";
import { Pin } from "./pin";

export abstract class PiPinFactory extends PinFactory {
  readonly pins: Map<number, Pin>;

  abstract get pinClass(): Constructor<Pin>;

  constructor() {
    super();
    this.pins = new Map();
  }

  close() {
    for (const pin of this.pins.values()) {
      pin.close();
    }
    this.pins.clear();
  }

  pin(spec: string | number): Pin {
    const n = this.toGPIO(spec);
    let pin = this.pins.get(n);

    if (pin === undefined) {
      pin = new this.pinClass(this, n);
      this.pins.set(n, pin);
    }

    return pin;
  }
}

export abstract class PiPin extends Pin {
  protected _whenChangedLock: Lock = new Lock();
  protected _whenChanged?: () => void;

  constructor(protected _factory: PinFactory, protected _number: number) {
    super();
  }

  get number(): number {
    return this._number;
  }

  get factory(): PinFactory {
    return this._factory;
  }

  [Symbol.toStringTag]() {
    return `GPIO${this.number}`;
  }
}
