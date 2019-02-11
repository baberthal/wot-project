//===- util/default_map.ts - A map object with a factory for defaults ------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/**
 * Compare with Python's `defaultdict`.
 */
export class DefaultMap<K, V> {
  private _internal: Map<K, V> = new Map();

  private defaultFactory?: () => V;

  constructor(defaultFactory?: () => V) {
    this.defaultFactory = defaultFactory;
  }

  get size(): number {
    return this._internal.size;
  }

  clear(): void {
    this._internal.clear();
  }

  delete(key: K): boolean {
    return this._internal.delete(key);
  }

  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    this._internal.forEach(callbackfn, thisArg);
  }

  get(key: K): V {
    let v = this._internal.get(key);
    if (!v && this.defaultFactory) {
      v = this.defaultFactory();
      this._internal.set(key, v);
    }

    return v!;
  }

  has(key: K): boolean {
    return this._internal.has(key);
  }

  set(key: K, value: V): this {
    this._internal.set(key, value);
    return this;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this._internal[Symbol.iterator]();
  }

  entries(): IterableIterator<[K, V]> {
    return this._internal.entries();
  }

  keys(): IterableIterator<K> {
    return this._internal.keys();
  }

  values(): IterableIterator<V> {
    return this._internal.values();
  }

  [Symbol.toStringTag]: string = "DefaultMap";
}
