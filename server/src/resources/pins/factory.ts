//===- resources/pins/factory.ts - Abstract Pin Factory --------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { isdigit } from "../../util/ctype";

import { Pin } from "./pin";

/**
 * Generates pins and SPI interfaces for devices. This is an abstract
 * base class for pin factories. Descendents *must* override the following
 * methods:
 *
 *   * `ticks`
 *   * `ticksDiff`
 */
export abstract class PinFactory {
  toGPIO(spec: string | number): number {
    if (typeof spec === "number") {
      if (spec < 0 || spec > 53) {
        throw new Error(`Invalid GPIO port ${spec} specified (range 0..53)`);
      }

      return spec;
    }

    spec = spec.toUpperCase();
    if (isdigit(spec)) return this.toGPIO(parseInt(spec, 10));

    if (spec.startsWith("GPIO") && isdigit(spec.slice(4))) {
      return this.toGPIO(parseInt(spec.slice(4), 10));
    } else if (spec.startsWith("BCM") && isdigit(spec.slice(3))) {
      return this.toGPIO(parseInt(spec.slice(3), 10));
    }

    throw new Error(`'${spec}' is not a valid pin spec`);
  }

  close() {}

  /** */
  abstract pin(spec: string | number): Pin;

  /** */
  abstract ticks(): number;

  /** */
  abstract ticksDiff(later: number, earlier: number): number;
}
