//===- gpio/types.ts - Misc. GPIO Types ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export type GPIOPinMode =
  | "input"
  | "output"
  | "alt0"
  | "alt1"
  | "alt2"
  | "alt3"
  | "alt4"
  | "alt5";

export type GPIOPinEdge = "both" | "rising" | "falling";

export type GPIOPinPullUp = "up" | "down" | "floating" | "off";
