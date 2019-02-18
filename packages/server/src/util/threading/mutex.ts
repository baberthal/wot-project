//===- util/threading/mutex.ts - Simple mutex ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";

export class Mutex {
  private _isLocked: boolean;
  private _ee: EventEmitter;

  get isLocked(): boolean {
    return this._isLocked;
  }

  constructor() {
    this._isLocked = false;
    this._ee = new EventEmitter();
  }

  lock(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!this._isLocked) {
        this._isLocked = true;
        return resolve();
      }

      const tryLock = () => {
        if (!this._isLocked) {
          this._isLocked = true;
          this._ee.removeListener("release", tryLock);
          return resolve();
        }
      };

      setImmediate(() => this._ee.on("release", tryLock));
    });
  }

  tryLock(): boolean {
    if (this._isLocked) {
      return false;
    }

    this._isLocked = true;
    return true;
  }

  timedLock(timeout: number) {
    const timeoutPromise = new Promise((resolve, reject) => {});
    return Promise.race([
      this.lock(),
      new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          reject(new Error("Timeout expired"));
        }, timeout);
      })
    ]);
  }

  unlock() {
    if (!this._isLocked) {
      throw new Error("Can't unlock an unlocked mutex!");
    }
    this._isLocked = false;
    process.nextTick(() => this._ee.emit("release"));
  }
}
