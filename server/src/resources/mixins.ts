//===- resources/mixins.ts - Misc. Mixins ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export type Constructor<InstanceT = {}> = new (...args: any[]) => InstanceT;

export interface HasValue<T> {
  value: T;
}

// export abstract class ValuesMixin<ValueType> {
//   abstract get value(): ValueType;

//   get values() {
//     return this._values();
//   }

//   private *_values() {
//     while (true) {
//       try {
//         yield this.value;
//       } catch (e) {
//         break;
//       }
//     }
//   }
// }

export function ValuesMixin<
  ValueType,
  TBase extends Constructor<HasValue<ValueType>>
>(Base: TBase) {
  return class extends Base {
    get values(): IterableIterator<ValueType> {
      return this._values();
    }

    *_values() {
      while (true) {
        try {
          yield this.value;
        } catch (e) {
          break;
        }
      }
    }
  };
}

/**
 * Adds a `source` property to the class which, given an iterable or
 * a `ValuesMixin` descendent, sets :attr:`value` to each member of that iterable
 * until it is exhausted. This mixin is generally included in novel output
 * devices to allow their state to be driven from another device.
 *
 * NOTE: Use this mixin *first* in the parent class list.
 */
export function SourceMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    _source: any = null;
    _source_delay: number = 0.01;
  };
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
export function SharedMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    static _sharedKey(cls: Constructor, ...args: any[]) {
      return args;
    }
  };
}
