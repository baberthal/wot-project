//===- models/mixins/util.ts - Mixin Utilities -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { __extends } from "tslib";

export const Constructor = Function;

export interface Constructor<T = {}> extends Function {
  new (...args: any[]): T;
}

export function mixin<T>(args: Constructor<T>): Constructor<T>;
export function mixin<T, U>(
  arg1: Constructor<T>,
  arg2: Constructor<U>
): Constructor<T & U>;
export function mixin(arg1: Constructor<any>, arg2?: Constructor<any>) {
  const klass = class extends arg1 {};

  if (typeof arg2 === "undefined") {
    return klass;
  }

  Object.getOwnPropertyNames(arg2.prototype).forEach(name => {
    klass.prototype[name] = arg2.prototype[name];
  });

  return klass;
}

// export function mixin<T>(mixinCls: Constructor<T>): Constructor<T>;
// export function mixin<T extends Constructor, U extends Constructor[]>(
//   base: T,
//   ...others: U
// ) {
//   const superCtors = others;
//   const klass = class extends base {
//     constructor(...args: any[]) {
//       super(...args);
//       superCtors.forEach(ctor => {
//         ctor.call(this, ...args);
//       });
//     }
//   };

//   superCtors.forEach(ctor => {
//     Object.getOwnPropertyNames(ctor.prototype).forEach(name => {
//       klass.prototype[name] = ctor.prototype[name];
//     });
//   });

//   return klass;
// }
