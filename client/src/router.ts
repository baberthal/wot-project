//===- router.ts - Router and Router Configs -------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Router } from "@/core";
import Home from "./views/home";

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/devices",
      component: () => import("@/views/master-detail/master-detail.view"),
      children: [
        {
          path: ":id",
          name: "device",
          components: {
            detail: () => import("@/components/device-info/device-info.view")
          },
          children: [
            {
              path: ":resourceID",
              name: "deviceResource",
              components: {
                detail: () =>
                  import("@/views/device-resource/device-resource.view")
              }
            }
          ]
        }
      ]
    }
  ]
});
