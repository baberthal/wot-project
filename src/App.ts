//===- App.ts - Main App Component -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue, Component } from "@/core";
import { AppNavbar } from "@/components/navbar";

@Component({
  template: `
    <div id="app-main">
      <AppNavbar></AppNavbar>

      <div class="columns">
        <div class="column is-10 is-offset-1"><router-view></router-view></div>
      </div>
    </div>
  `,

  components: {
    AppNavbar
  }
})
export default class App extends Vue {}
