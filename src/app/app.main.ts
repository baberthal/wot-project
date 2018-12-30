//===- app/app.main.ts - App Main File -------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue, Router } from "@app/core";

import App from "./app.component";
import routes from "./routes";
import "./app.styles.scss";

const router = new Router({ routes });

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
