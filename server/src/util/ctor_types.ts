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

export type Mixin<T> = Constructor<T> | object;

export type Concrete<T> = { [P in keyof T]: T[P] };

export type ConcreteTypeOf<T, U> = { new (...args: any[]): T } & Concrete<U>;
