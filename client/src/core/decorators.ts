//===- core/decorators.ts - Vue Decorator Exports --------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

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

export const TestDecorator = createDecorator((options, key, idx) => {
  /* tslint:disable-next-line:no-console */
  console.log("Options:", options, "Key:", key, "Idx:", idx);
});
