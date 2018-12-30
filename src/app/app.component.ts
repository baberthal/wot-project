//===- app/app.component.ts - Main App Component ---------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue, Component } from "@app/core";

import components from "@app/components";
import template from "./app.template.html";

@Component({
  template,
  components
})
export default class App extends Vue {}
