//===- models/mixins/util.ts - Mixin Utilities -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export const Constructor = Function;

export interface Constructor<T = {}> extends Function {
  new (...args: any[]): T;
}

export function mixin(baseCtor: Constructor, ...addedCtors: Constructor[]) {}
