//===- index.d.ts - Vue-FusionCharts Type Definitions ----------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

declare module "vue-fusioncharts" {
  import Vue, { VueConstructor } from "vue";
  const install: (vue: VueConstructor<Vue>, FC: any, ...options: any[]) => void;
  export = install;
}
