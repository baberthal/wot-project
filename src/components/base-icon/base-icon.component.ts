//===- base-icon.component.ts - Base Icon Component ------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Prop, Vue } from "@app/core";
import template from "./base-icon.template.html";

@Component({ template })
export class BaseIcon extends Vue {
  @Prop([String, Object]) type!: string | object;
  @Prop(String) icon!: string;
  @Prop(String) size!: string;
  @Prop(String) customSize!: string;
  @Prop(String) customClass!: string;

  get iconClass(): string {
    return `${this.pack}-${this.icon}`;
  }

  get pack(): string {
    return "mdi";
  }

  get iconType(): string | undefined {
    if (!this.type) return;

    let splitType: string[] = [];

    if (typeof this.type === "string") {
      splitType = this.type.split("-");
    } else {
      for (let key in this.type) {
        if ((this.type as any)[key]) {
          splitType = key.split("-");
          break;
        }
      }
    }

    if (splitType.length <= 1) return;

    return `has-text-${splitType[1]}`;
  }

  get effectiveIconSize(): string | undefined {
    return this.customSize || this.customSizeByPack;
  }

  get customSizeByPack(): string | undefined {
    switch (this.size) {
      case "is-small":
        return;
      case "is-medium":
        return "mdi-36px";
      case "is-large":
        return "mdi-48px";
      default:
        return "mdi-24px";
    }
  }
}
