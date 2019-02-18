//===- resources/mixins.ts - Misc. Mixins ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

// import { Observable, from } from "rxjs";
import { EventEmitter } from "events";
// import { use } from "typescript-mix";

import { Concrete, Constructor } from "../util/ctor_types";
import { include } from "../util/mixins";

import { Device } from "./device";
import { PinFactory } from "./pins";

export type ConcreteDeviceType<T> = Constructor<T> & Concrete<typeof Device>;

export abstract class ValuesMixin<ValueType> {
  abstract get value(): ValueType;

  get values(): IterableIterator<ValueType> {
    return this._values();
  }

  private *_values(): IterableIterator<ValueType> {
    while (true) {
      try {
        yield this.value;
      } catch (e) {
        break;
      }
    }
  }
}

/**
 * Adds a `source` property to the class which, given an iterable or
 * a `ValuesMixin` descendent, sets `value` to each member of that iterable until
 * it is exhausted. This mixin is generally included in novel output devices to
 * allow their state to be driven from another device.
 *
 * NOTE: Use this mixin *first* in the parent class list.
 */
export abstract class SourceMixin<ValueType> {
  protected _source: IterableIterator<ValueType>;
  protected _sourceDelay: number;

  constructor() {
    this._source = null!;
    this._sourceDelay = 0.01;
  }

  close() {
    this._source = null!;
  }

  /**
   * The iterable to use as a source of values for `value`.
   */
  get source(): IterableIterator<ValueType> {
    return this._source;
  }

  set source(value: IterableIterator<ValueType>) {
    this.setSource(value);
  }

  setSource(value: IterableIterator<ValueType> | ValuesMixin<ValueType>) {
    if (value instanceof ValuesMixin) {
      value = value.values;
    }

    this._source = value;
  }

  /**
   * The delay (measured in seconds) in the loop used to read values from
   * `source`. Defaults to 0.01 seconds, which is generally sufficient to keep
   * CPU usage to a minimum while providing adequate responsiveness.
   */
  get sourceDelay(): number {
    return this._sourceDelay;
  }

  set sourceDelay(value: number) {
    if (value < 0) {
      throw new Error("sourceDelay must be positive!");
    }

    this._sourceDelay = value;
  }
}

/**
 * This mixin marks a class as "shared". In this case, the meta-class (GPIOMeta)
 * will use `_sharedKey` to convert the constructor arguments to an immutable
 * key, and will check whether any existing instances match that key.  If they
 * do, they will be returned by the constructor instead of a new instance. An
 * internal reference counter is used to determine how many times an instance has
 * been "constructed" in this way.
 *
 * When `close` is called, an internal reference counter will be decremented and
 * the instance will only close when it reaches zero.
 */
// export function SharedMixin<TBase extends Constructor>(Base: TBase) {
//   return class extends Base {
//     static _sharedKey(cls: Constructor, ...args: any[]) {
//       return args;
//     }
//   };
// }
