//===- util/lock.ts - Simple Thread Lock -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";

//  MonitorMixin {{{ //
export class MonitorMixin {
  private _mon_locked!: boolean;
  private _mon_ee!: EventEmitter;

  constructor() {
    this.mon_initialize();
  }

  mon_enter() {}

  mon_exit() {}

  get mon_isLocked(): boolean {
    return true;
  }

  get mon_isOwned(): boolean {
    return true;
  }

  mon_synchronize() {}

  mon_tryEnter() {}

  newCond() {}

  synchronize() {}

  protected mon_initialize() {
    this._mon_locked = false;
    this._mon_ee = Object.create(EventEmitter);
  }
}
//  }}} MonitorMixin //

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

export type CondVariableValue = number | boolean | string;

export type CondVariableCondition<T extends CondVariableValue> =
  | ((value: T) => boolean)
  | number
  | boolean
  | string
  | RegExp;

export class CondVariable<T extends CondVariableValue> {
  private _value: T;

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get(): T {
    return this._value;
  }

  set(value: T) {
    this._value = value;
  }

  wait(cond: CondVariableCondition<T>) {
    const test = cvcond2func(cond);
  }
}

function cvcond2func<T extends CondVariableValue>(
  cond: CondVariableCondition<T>
): (value: T) => boolean {
  if (typeof cond === "function") {
    return cond;
  }

  if (
    typeof cond === "number" ||
    typeof cond === "boolean" ||
    typeof cond === "string"
  ) {
    return function(value) {
      return value === cond;
    };
  }

  if (cond && typeof cond === "object" && cond instanceof RegExp) {
    return function(value) {
      return cond.test(value as string);
    };
  }

  throw new TypeError(`Unkown condition type: ${typeof cond}`);
}

export class Event {
  private _lock: Lock = new Lock();
  private _flag: boolean = false;
}
