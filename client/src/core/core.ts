//===- core/core.ts - Core Exports -----------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Vue from "vue";
import VueFusionCharts from "vue-fusioncharts";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

Charts(FusionCharts);
FusionTheme(FusionCharts);

Vue.use(VueFusionCharts, FusionCharts);
Vue.use(Vuex);

declare module "vue/types/vue" {
  interface Vue {
    $_injectStyles(styles?: InjectableCSS): void;
  }
}

Vue.use({
  install(vue) {
    vue.prototype.$_injectStyles = function(styles?: InjectableCSS) {
      if (styles && styles.__inject__) {
        styles.__inject__(this.$ssrContext);
      }
    };
  }
});

export { Vue, Vuex, createLogger };
