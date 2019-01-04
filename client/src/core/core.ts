//===- core/core.ts - Core Exports -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

Vue.use(Router);
Vue.use(Vuex);

export { Vue, Router, Vuex, createLogger };
