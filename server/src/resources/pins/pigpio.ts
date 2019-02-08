//===- resources/pins/pigpio.ts - PiGPIO Pins ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as pigpio from "pigpio-mock";

import { Factory } from ".";
import { PiPin } from "./pi";

export class PiGPIOPin extends PiPin {
  function!: string;

  static readonly GPIO_FUNCTIONS = {
    input: pigpio.Gpio.INPUT,
    output: pigpio.Gpio.OUTPUT,
    alt0: pigpio.Gpio.ALT0,
    alt1: pigpio.Gpio.ALT1,
    alt2: pigpio.Gpio.ALT2,
    alt3: pigpio.Gpio.ALT3,
    alt4: pigpio.Gpio.ALT4,
    alt5: pigpio.Gpio.ALT5
  };

  static readonly GPIO_PULL_UPS = {
    up: pigpio.Gpio.PUD_UP,
    down: pigpio.Gpio.PUD_DOWN,
    off: pigpio.Gpio.PUD_OFF
  };

  static readonly GPIO_EDGES = {
    both: pigpio.Gpio.EITHER_EDGE,
    rising: pigpio.Gpio.RISING_EDGE,
    falling: pigpio.Gpio.FALLING_EDGE
  };

  protected _pull: string;
  protected _pwm: boolean;
  protected _bounce: number | null;
  protected _callback: any;
  protected _edges: number;

  constructor(factory: Factory, _number: number) {
    super(factory, _number);
    this._pull = "floating";
    this._pwm = false;
    this._bounce = null;
    this._callback = null;
    this._edges = pigpio.Gpio.EITHER_EDGE;
  }
}
