//===- util/ctor_types.ts - Constructor Types ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface Constructor<T> {
  new (...args: any[]): T;
  prototype: T;
}
