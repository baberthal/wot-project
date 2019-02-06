//===- core/decorators.ts - Vue Decorator Exports --------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { isEmptyObject } from "@wot/core";
import Component, { createDecorator, mixins } from "vue-class-component";
import {
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
} from "vue-property-decorator";

export {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
  mixins as Mixins
};

/* tslint:disable:no-console */

export const TestDecorator = createDecorator((options, key, idx) => {
  console.log("Options:", options, "Key:", key, "Idx:", idx);
});

export function Filter(name?: string) {
  return createDecorator((opts, key) => {
    // First, make sure the subobjects we will access are not undefined
    if (!opts.methods) opts.methods = {};
    if (!opts.filters) opts.filters = {};

    // Grab the method implementation from opts.methods
    const methodImpl = opts.methods[key];
    // If a name was passed, use that as the key for opts.filters. Otherwise, use
    // the same name.
    const filterName = name || key;
    opts.filters[filterName] = methodImpl;

    // Remove the method from opts.methods, and delete opts.methods if its empty
    delete opts.methods[key];
    if (isEmptyObject(opts.methods)) delete opts.methods;
  });
}
