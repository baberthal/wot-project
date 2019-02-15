//===- gpio/pins/pigpio.ts - PiGPIO Pin and Factory ------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { GPIOPinEdge, GPIOPinMode, GPIOPinPullDirection } from "../types";

import { Pin, PinFactory } from "./pin";
type pigpio_t = typeof import("pigpio");

//  PiGPIOFactory {{{ //
export class PiGPIOFactory extends PinFactory<PiGPIOPin> {
  get pinClass() {
    return PiGPIOPin;
  }

  ticks(): number {
    throw new Error("Method not implemented.");
  }

  ticksDiff(later: number, earlier: number): number {
    throw new Error("Method not implemented.");
  }

  /** @internal */
  _getRevision(): string | number {
    throw new Error("Method not implemented.");
  }

  /** @internal */
  _connect(pin: number, options?: {}): pigpio_t["Gpio"] {
    throw new Error("Method not implemented.");
  }
}

//  }}} PiGPIOFactory //

//  PiGPIOPin {{{ //

export class PiGPIOPin extends Pin<PiGPIOFactory> {
  private _pull: GPIOPinPullDirection;
  private _pwm: boolean;
  private _bounce?: number;
  private _callback?: () => void;
  private _edges: GPIOPinEdge;

  constructor(factory: PiGPIOFactory, num: number) {
    super(factory, num);
    this._pull = factory.piInfo.isPulledUp(this.__repr__) ? "up" : "floating";
    this._pwm = false;
    this._bounce = null!;
    this._edges = "both";
  }

  get mode(): GPIOPinMode {
    throw new Error("AAAAHHHHHHHH!!!!");
  }

  set mode(value: GPIOPinMode) {
    throw new Error("AAAAHHHHHHHH!!!!");
  }

  get state(): number {
    return 0;
  }

  set state(value: number) {
    throw new Error("Unable to set state");
  }

  protected enableEventDetect(): void {
    throw new Error("Method not implemented.");
  }

  protected disableEventDetect(): void {
    throw new Error("Method not implemented.");
  }
}

//  }}} PiGPIOPin //

//  Misc. Helpers {{{ //

type ConstantMap<T extends string> = { [K in T]: number };

type GPIOModeMap = ConstantMap<GPIOPinMode>;
type GPIOEdgeMap = ConstantMap<GPIOPinEdge>;
type GPIOPullDirectionMap = ConstantMap<GPIOPinPullDirection>;

//  }}} Misc. Helpers //
