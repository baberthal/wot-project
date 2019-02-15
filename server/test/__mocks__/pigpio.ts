//===- pigpio.ts - Mock PiGPIO Backend -------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";
import { Gpio as GpioInterface } from "pigpio";

export interface GpioOptions {
  mode?: number;
  pullUpDown?: number;
  edge?: number;
  timeout?: number;
  alert?: boolean;
}

export class Gpio extends EventEmitter implements GpioInterface {
  static readonly INPUT = 0; // PI_INPUT
  static readonly OUTPUT = 1; // PI_OUTPUT
  static readonly ALT0 = 4; // PI_ALT0;
  static readonly ALT1 = 5; // PI_ALT1;
  static readonly ALT2 = 6; // PI_ALT2;
  static readonly ALT3 = 7; // PI_ALT3;
  static readonly ALT4 = 3; // PI_ALT4;
  static readonly ALT5 = 2; // PI_ALT5;

  /* pud */
  static readonly PUD_OFF = 0; // PI_PUD_OFF;
  static readonly PUD_DOWN = 1; // PI_PUD_DOWN;
  static readonly PUD_UP = 2; // PI_PUD_UP;

  /* isr */
  static readonly RISING_EDGE = 0; // RISING_EDGE;
  static readonly FALLING_EDGE = 1; // FALLING_EDGE;
  static readonly EITHER_EDGE = 2; // EITHER_EDGE;

  /* timeout */
  static readonly TIMEOUT = 2; // PI_TIMEOUT;

  /* gpio numbers */
  static readonly MIN_GPIO = 0; // PI_MIN_GPIO;
  static readonly MAX_GPIO = 53; // PI_MAX_GPIO;
  static readonly MAX_USER_GPIO = 31; // PI_MAX_USER_GPIO;

  /* gpio servo pulseWidth */
  static readonly MIN_SERVO_PULSE_WIDTH = 500; // most anti-clockwise position
  static readonly MED_SERVO_PULSE_WIDTH = 1500; // center position
  static readonly MAX_SERVO_PULSE_WIDTH = 2500; // most clockwise position

  private _pin: number;
  private _digitalValue: number;
  private _pwmValue: number;
  private _frequency: number;
  private _pwmRange: number;
  private _servoPulseWidth: number;
  private _glitchFilter: number;

  private _mode: number = 0;
  private _pullUpDown: number = 0;
  private _edge: number = 0;
  private _alert: boolean = false;

  constructor(pin: number, options: GpioOptions = {}) {
    super();

    this._pin = pin;

    this._digitalValue = 0;
    this._pwmValue = 0;
    this._frequency = 31;
    this._pwmRange = 0;
    this._servoPulseWidth = Gpio.MED_SERVO_PULSE_WIDTH;
    this._glitchFilter = 0;

    if (typeof options.mode === "number") {
      this._mode = options.mode;
    }

    if (typeof options.pullUpDown === "number") {
      this._pullUpDown = options.pullUpDown;
    }

    if (typeof options.edge === "number") {
      this.enableInterrupt(
        options.edge,
        typeof options.timeout === "number" ? options.timeout : 0
      );
    }

    if (typeof options.alert === "boolean" && options.alert) {
      // this._alert = options.alert;
      this.enableAlert();
    }
  }

  mode(mode: number): Gpio {
    this._mode = mode;
    return this;
  }

  getMode(): number {
    return this._mode;
  }

  pullUpDown(pud: number): Gpio {
    this._pullUpDown = pud;
    return this;
  }

  digitalRead(): number {
    return this._digitalValue;
  }

  digitalWrite(level: number): Gpio {
    this._digitalValue = level;
    return this;
  }

  trigger(pulseLen: number, level: number): Gpio {
    return this;
  }

  pwmWrite(dutyCycle: number): Gpio {
    this._pwmValue = dutyCycle;
    return this;
  }

  analogWrite(dutyCycle: number): Gpio {
    return this.pwmWrite(dutyCycle);
  }

  hardwarePwmWrite(frequency: number, dutyCycle: number): Gpio {
    this._frequency = frequency;
    this._pwmValue = dutyCycle;
    return this;
  }

  getPwmDutyCycle(): number {
    return this._pwmValue;
  }

  pwmRange(range: number): Gpio {
    this._pwmRange = range;
    return this;
  }

  getPwmRange(): number {
    return this._pwmRange;
  }

  getPwmRealRange(): number {
    return this._pwmRange;
  }

  pwmFrequency(frequency: number): Gpio {
    this._frequency = frequency;
    return this;
  }

  getPwmFrequency(): number {
    return this._frequency;
  }

  servoWrite(pulseWidth: number): Gpio {
    this._servoPulseWidth = Math.min(
      Math.max(pulseWidth, Gpio.MAX_SERVO_PULSE_WIDTH),
      Gpio.MAX_SERVO_PULSE_WIDTH
    );
    return this;
  }

  getServoPulseWidth(): number {
    return this._servoPulseWidth;
  }

  enableInterrupt(edge: number, timeout?: number | undefined): Gpio {
    // this._interrupt = { edge, timeout };
    return this;
  }

  disableInterrupt(): Gpio {
    // this._interrupt = false;
    return this;
  }

  enableAlert(): Gpio {
    this._alert = true;
    return this;
  }

  disableAlert(): Gpio {
    this._alert = false;
    return this;
  }

  glitchFilter(steady: number): Gpio {
    this._glitchFilter = steady;
    return this;
  }
}
