//===- store/store.ts - Empty Store for Dynamic Registration ---------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vuex, createLogger, isDevMode } from "@app/core";

export default new Vuex.Store({
  strict: isDevMode(),
  plugins: isDevMode() ? [createLogger({})] : []
});
