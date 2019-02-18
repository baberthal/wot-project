//===- util/mixins.ts - Utilities for mixins -------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Constructor, Mixin } from "./ctor_types";

const log = {
  _message(level: string, ...args: any[]) {
    /* tslint:disable:no-console */
    // console.group(level);
    // console.log(...args);
    // console.groupEnd();
    /* tslint:enable:no-console */
  },

  debug(...args: any[]) {
    this._message("DEBUG", ...args);
  },

  info(...args: any[]) {
    this._message("INFO", ...args);
  },

  error(...args: any[]) {
    /* tslint:disable-next-line:no-console */
    console.error(...args);
  }
};

/**
 * Applies `mixins` to `base`.
 */
function applyMixins(base: Constructor<any> | Function, mixins: Mixin<any>[]) {
  const baseKeys = Object.getOwnPropertyNames(base);

  for (const mixin of mixins) {
    log.info("getting mixable properties of %s", mixin);
    const mixables = getMixableProperties(baseKeys, mixin);
    Object.defineProperties(base.prototype, mixables);
  }
}

/**
 * Returns a map of property names that are able to be mixed in to a base class.
 */
function getMixableProperties(baseKeys: string[], mixin: Mixin<any>) {
  switch (typeof mixin) {
    case "object":
      return getMixablePropertyDescriptors(mixin);
    case "function":
      return getMixablePropertyDescriptors(
        (mixin as Constructor<any>).prototype
      );
    default:
      throw new Error(`Don't know how to get mixable properties of ${mixin}`);
  }

  function getMixablePropertyDescriptors(obj: object): PropertyDescriptorMap {
    const result: PropertyDescriptorMap = {};

    Object.getOwnPropertyNames(obj).map(key => {
      log.info("mixable property: %s", key);
      if (!baseKeys.includes(key)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        log.info("descriptor:", descriptor);
        if (descriptor === undefined) return;

        if (descriptor.get || descriptor.set) {
          result[key] = descriptor;
        } else if (typeof descriptor.value === "function") {
          result[key] = descriptor;
        }
      } else {
        log.debug("%s was already in %j!", key, obj);
      }
    });

    return result;
  }
}

export function include(...mixins: Mixin<any>[]) {
  log.info("include(...)");
  return function(ctor: Constructor<any>) {
    log.info("applyMixins(%s)", ctor);
    applyMixins(ctor, mixins.reverse());
  };
}

export interface DelegateOptions {
  to: Mixin<any>;
  as?: string | symbol;
}

export function delegate(options: DelegateOptions) {
  let mixin: any;
  if (typeof options.to === "object") {
    mixin = options.to;
  } else if (typeof options.to === "function") {
    mixin = options.to.prototype;
  }

  log.info("delegate(%j)", options);
  return function(target: any, propertyKey: string | symbol) {
    log.info("delegating %s to %s, as %s", propertyKey, mixin, options.as);
    target[propertyKey] = mixin[options.as || propertyKey];
  };
}
