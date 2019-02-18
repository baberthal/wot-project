//===- components/navbar/navbar.component.ts - Navbar Component ------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Vue, Component } from "@app/core";

import template from "./navbar.template.html";

@Component({ template })
export class AppNavbar extends Vue {
  title: string = "Home";
}

export default AppNavbar;
