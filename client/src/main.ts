//===- main.ts - Main File -------------------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import "@/assets/scss/app.scss";
import { Vue } from "@/core";

import App from "./App";
import store from "./store";

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
