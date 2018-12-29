//===- core/core.ts - Core Exports -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

Vue.use(VueRouter);
Vue.use(Vuex);

export { Vue, VueRouter as Router, Vuex };
export {
  Location,
  NavigationGuard,
  RawLocation,
  RedirectOption,
  Route,
  RouteConfig,
  RouteRecord,
  RouterMode,
  RouterOptions
} from "vue-router";
