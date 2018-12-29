//===- core/decorators.ts - Vue Decorator Exports --------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import Component, { mixins as Mixins } from "vue-class-component";
import {
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
} from "vue-property-decorator";
import { Action, Getter, Mutation, State, namespace as ns } from "vuex-class";

export { Component, Emit, Inject, Mixins, Model, Prop, Provide, Watch };
export { Action, Getter, Mutation, State, ns };
