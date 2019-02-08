//===- resources/pins/pi.ts - Pi Pins --------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Lock } from "../../util/lock";

import { Factory } from ".";
import { Pin } from "./pin";

export abstract class PiPin extends Pin {
  protected _whenChangedLock: Lock = new Lock();
  protected _whenChanged?: () => void;

  constructor(protected _factory: Factory, protected _number: number) {
    super();
  }

  get number(): number {
    return this._number;
  }

  get factory(): Factory {
    return this._factory;
  }

  toString() {
    return `GPIO${this._number}`;
  }
}
