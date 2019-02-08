//===- resources/pins/index.ts - Pins --------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { DefaultMap } from "../../util/default_map";
import { Lock } from "../../util/lock";

/**
 * Generates pins for devices.
 */
export abstract class Factory {
  private _reservations: DefaultMap<number, any[]>;
  private _resLock: Lock;

  constructor() {
    this._reservations = new DefaultMap(() => []);
    this._resLock = new Lock();
  }

  reservePins(requester: object, ...pins: number[]) {
    this._resLock.withLock(() => {
      for (const pin of pins) {
        for (const reserverRef in this._reservations.get(pin)!) {
        }
      }
    });
  }

  releasePins(requester: object, ...pins: number[]) {}

  releaseAll(requester: object) {}

  close() {}

  pin(spec: any) {}
}
