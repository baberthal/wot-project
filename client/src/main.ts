//===- main.ts - Main File -------------------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue } from "@app/core";
import App from "./App";

// import router from "./router";
import store from "./store";

import "@/assets/main.scss";

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
