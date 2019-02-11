//===- resources/pins/index.ts - Pins --------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { inspect } from "util";

import { PiGPIOFactory as PiGPIOFactory_ } from "./pigpio";

export class PiGPIOFactory extends PiGPIOFactory_ {
  constructor() {
    super(require("pigpio"));
  }
}

export class PiGPIOMockFactory extends PiGPIOFactory_ {
  constructor() {
    super(require("pigpio-mock"));
  }
}

export { PinFactory } from "./factory";
export { Pin } from "./pin";
