//===- base-panel.component.ts - Base Panel Component ----------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Prop, Vue } from "@app/core";
import template from "./base-panel.template.html";

import {
  BasePanelBlock,
  IPanelBlock
} from "../base-panel-block/base-panel-block.component";

@Component({ template, components: { BasePanelBlock } })
export class BasePanel extends Vue {
  @Prop({ default: "Panel" }) title!: string;

  blocks: IPanelBlock[] = [
    { icon: "developer-board", content: "My Raspberry Pi" }
  ];
}

export default BasePanel;
