//===- resources/pins/pin.ts - Pin Abstraction -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { PinFixedPull, PinInvalidFunction, PinSetInput } from "../exceptions";

export abstract class Pin {
  abstract get function(): string;

  abstract set function(value: string);

  get state(): number {
    return 0;
  }

  set state(value: number) {
    throw new PinSetInput(`Cannot set the value of pin ${this}`);
  }

  get pull(): string {
    return "floating";
  }

  set pull(value: string) {
    throw new PinFixedPull(`Cannot change pull-up on pin ${this}`);
  }

  get frequency(): number | null {
    return null;
  }

  set frequency(value: number | null) {
    if (value !== null) {
      throw new Error("PinPWMUnsupported");
    }
  }

  get bounce(): number | null {
    return null;
  }

  set bounce(value: number | null) {
    if (value !== null) {
      throw new Error("Cannot set bounce");
    }
  }

  get edges(): string {
    return "none";
  }

  set edges(value: string) {
    throw new Error("Cannot set edges");
  }

  get whenChanged(): (() => void) | null {
    return null;
  }

  set whenChanged(value: (() => void) | null) {
    throw new Error("Cannot set whenChanged");
  }

  close() {}

  outputWithState(state: number) {
    this.function = "output";
    this.state = state;
  }

  inputWithPull(pull: string) {
    this.function = "input";
    this.pull = pull;
  }
}
