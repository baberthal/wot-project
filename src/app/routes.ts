//===- app/routes.ts - App Routes ------------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { RouteConfig } from "@app/core";

import components from "@app/components";

export const routes: RouteConfig[] = [
  { path: "/home", component: components.HomeComponent }
];

export default routes;
