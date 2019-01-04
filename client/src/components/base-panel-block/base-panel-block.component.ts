//===- base-panel-block.component.ts - Panel Block Component ---------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Prop, Vue } from "@app/core";
import { BaseIcon } from "../base-icon/base-icon.component";
import template from "./base-panel-block.template.html";

@Component({ template, components: { BaseIcon } })
export class BasePanelBlock extends Vue {
  @Prop() icon?: string;
  content: string = "";
}

export interface IPanelBlock {
  icon?: string;
  content: string;
}
