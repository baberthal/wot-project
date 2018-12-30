//===- store/index.ts - Main Store Exports ---------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vuex, createLogger, isDevMode } from "@app/core";

import devices from "./modules/device_module";

export default new Vuex.Store({
  modules: {
    devices
  },
  strict: isDevMode(),
  plugins: isDevMode() ? [createLogger({})] : []
});
