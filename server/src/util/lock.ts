//===- util/lock.ts - Simple Thread Lock -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";

export class Lock {
  private _locked: boolean;
  private _ee: EventEmitter;

  constructor() {
    this._locked = false;
    this._ee = new EventEmitter();
  }

  acquire() {
    return new Promise((resolve, reject) => {
      // If nobody has the lock, take it and resolve immediately
      if (!this._locked) {
        // Safe because ES doesn't interrupt synchronous operations, so we don't
        // need to do a compare-and-swap or anything.
        this._locked = true;
        return resolve();
      }

      // Otherwise, wait until somebody releases the lock and try again.
      const tryAcquire = () => {
        if (!this._locked) {
          this._locked = true;
          this._ee.removeListener("release", tryAcquire);
          return resolve();
        }
      };

      this._ee.on("release", tryAcquire);
    });
  }

  release() {
    // Release the lock immediately.
    this._locked = false;
    setImmediate(() => this._ee.emit("release"));
  }

  withLock<T>(body: () => T): Promise<T> {
    return this.acquire()
      .then(body)
      .finally(() => this.release());
  }
}
