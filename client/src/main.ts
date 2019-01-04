//===- main.ts - Main File -------------------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import "@/assets/main.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
