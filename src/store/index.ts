//===- store/index.ts - Main Store Exports ---------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vuex, createLogger, isDevMode } from "@app/core";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  strict: isDevMode(),
  plugins: isDevMode() ? [createLogger({})] : []
});
