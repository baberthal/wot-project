//===- gpio/pins/pigpio.ts - PiGPIO Pin and Factory ------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { GPIOPinEdge, GPIOPinMode, GPIOPinPullDirection } from "../types";

import { Pin, PinFactory } from "./pin";

type pigpio_t = typeof import("pigpio");
type GpioClass = pigpio_t["Gpio"];
type GpioConnection = InstanceType<GpioClass>;

//  PiGPIOFactory {{{ //
export class PiGPIOFactory extends PinFactory {
  constructor(readonly _m: pigpio_t) {
    super();
  }

  ticks(): number {
    return this._m.getTick();
  }

  ticksDiff(later: number, earlier: number): number {
    return this._m.tickDiff(earlier, later);
  }

  /** @internal */
  _getRevision(): string | number {
    return this._m.hardwareRevision();
  }

  get pinConstructor() {
    return PiGPIOPin;
  }

  /** @internal */
  get Gpio(): GpioClass {
    return this._m.Gpio;
  }
}

//  }}} PiGPIOFactory //

//  PiGPIOPin {{{ //

export class PiGPIOPin extends Pin {
  private _pull: GPIOPinPullDirection;
  private _pwm: boolean;
  private _bounce?: number;
  private _callback?: () => void;
  private _edges: number;

  private connection: GpioConnection;

  readonly GPIO_MODES: GPIOModeMap;
  readonly GPIO_EDGES: GPIOEdgeMap;
  readonly GPIO_PULL_UPS: GPIOPullDirectionMap;

  readonly GPIO_MODE_NAMES: NameMap<GPIOModeMap>;
  readonly GPIO_EDGE_NAMES: NameMap<GPIOEdgeMap>;
  readonly GPIO_PULL_UP_NAMES: NameMap<GPIOPullDirectionMap>;

  constructor(factory: PiGPIOFactory, num: number) {
    super(factory, num);

    this.GPIO_MODES = makeModeMap(factory.Gpio);
    this.GPIO_EDGES = makeEdgeMap(factory.Gpio);
    this.GPIO_PULL_UPS = makePullDirectionmap(factory.Gpio);

    this.GPIO_MODE_NAMES = reverse(this.GPIO_MODES);
    this.GPIO_EDGE_NAMES = reverse(this.GPIO_EDGES);
    this.GPIO_PULL_UP_NAMES = reverse(this.GPIO_PULL_UPS);

    this._pull = factory.piInfo.isPulledUp(this) ? "up" : "floating";
    this._pwm = false;
    this._bounce = null!;
    this._edges = factory.Gpio.EITHER_EDGE;

    this.connection = new factory.Gpio(num);
    this.connection.mode(factory.Gpio.INPUT);
    this.connection.pullUpDown(this.GPIO_PULL_UPS[this._pull]);
    this.connection.glitchFilter(0);
  }

  close() {
    if (this.connection) {
      this.frequency = null;
      // this.whenChanged = null;
      this.mode = "input";
      this.pull = this.factory.piInfo.isPulledUp(this) ? "up" : "floating";
    }
  }

  get mode(): GPIOPinMode {
    return this.GPIO_MODE_NAMES[this.connection.getMode()];
  }

  set mode(value: GPIOPinMode) {
    if (value !== "input") {
      this._pull = "floating";
    }
    const mode = this.GPIO_MODES[value];
    if (!mode) {
      throw new Error(`Invalid function "${value}" for ${this}`);
    }
    this.connection.mode(mode);
  }

  get state(): number {
    if (this._pwm) {
      return this.connection.getPwmDutyCycle() / this.connection.getPwmRange();
    }

    return this.connection.digitalRead();
  }

  set state(value: number) {
    if (this._pwm) {
      try {
        value = value * this.connection.getPwmRange();
        if (value != this.connection.getPwmDutyCycle()) {
          this.connection.pwmWrite(value);
        }
      } catch (e) {
        throw new Error(`Invalid state: ${e}`);
      }
    } else if (this.mode === "input") {
      throw new Error("Can't set state of an input pin!");
    } else {
      this.connection.digitalWrite(value == 0 ? 0 : 1);
    }
  }

  get pull(): GPIOPinPullDirection {
    return this._pull;
  }

  set pull(value: GPIOPinPullDirection) {
    if (this.mode !== "input") {
      throw new Error("Can't set pull on non-input pin");
    }

    if (value !== "up" && this.factory.piInfo.isPulledUp(this)) {
      throw new Error(`${this} has a physical pull-up resistor`);
    }

    const pull = this.GPIO_PULL_UPS[value];
    if (!pull) throw new Error(`invalid pull "${value}" for ${this}`);
    this.connection.pullUpDown(pull);
    this._pull = value;
  }

  get frequency(): number | null {
    if (this._pwm) return this.connection.getPwmFrequency();
    return null;
  }

  set frequency(value: number | null) {
    if (!this._pwm && value != null) {
      if (this.mode !== "output") {
        throw new Error(`cannot start PWM on pin ${this}`);
      }
      // NOTE: the pin's state *must* be set to zero; if it's currently
      // high, starting PWM and setting a 0 duty-cycle *doesn't* bring
      // the pin low; it stays high!
      this.connection.digitalWrite(0);
      this.connection.pwmFrequency(value);
      this.connection.pwmRange(10_000);
      this.connection.pwmWrite(0);
      this._pwm = true;
    } else if (this._pwm && value != null) {
      if (value != this.connection.getPwmFrequency()) {
        this.connection.pwmFrequency(value);
        this.connection.pwmRange(10_000);
      }
    } else if (this._pwm && value == null) {
      this.connection.digitalWrite(0);
      this._pwm = false;
    }
  }

  get bounce(): number | undefined {
    if (!this._bounce) return undefined;
    return this._bounce / 1_000_000;
  }

  set bounce(value: number | undefined) {
    const bounceValue: number = value == null ? 0 : value;
    if (bounceValue < 0) {
      throw new Error("Bounce value must be positive!");
    }
    this.connection.glitchFilter && this.connection.glitchFilter(bounceValue);
  }

  get edges(): GPIOPinEdge {
    return this.GPIO_EDGE_NAMES[this._edges];
  }

  set edges(value: GPIOPinEdge) {
    this._edges = this.GPIO_EDGES[value];
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
type NameMap<T> = { [k: number]: keyof T };

type GPIOModeMap = ConstantMap<GPIOPinMode>;
type GPIOEdgeMap = ConstantMap<GPIOPinEdge>;
type GPIOPullDirectionMap = ConstantMap<GPIOPinPullDirection>;

function makeModeMap(Gpio: GpioClass): GPIOModeMap {
  return {
    input: Gpio.INPUT,
    output: Gpio.OUTPUT,
    alt0: Gpio.ALT0,
    alt1: Gpio.ALT1,
    alt2: Gpio.ALT2,
    alt3: Gpio.ALT3,
    alt4: Gpio.ALT4,
    alt5: Gpio.ALT5
  };
}

function makeEdgeMap(Gpio: GpioClass): GPIOEdgeMap {
  return {
    both: Gpio.EITHER_EDGE,
    rising: Gpio.RISING_EDGE,
    falling: Gpio.FALLING_EDGE
  };
}

function makePullDirectionmap(Gpio: GpioClass): GPIOPullDirectionMap {
  return {
    up: Gpio.PUD_UP,
    down: Gpio.PUD_DOWN,
    floating: Gpio.PUD_OFF,
    off: Gpio.PUD_OFF
  };
}

function reverse<
  K extends string | number | symbol,
  V extends string | number | symbol
>(obj: Record<K, V>): Record<V, K> {
  const result: any = {};
  for (const key in obj) {
    const val = obj[key];
    result[val] = key;
  }
  return result;
}

type Reversed<T> = ReturnType<typeof reverse>;

//  }}} Misc. Helpers //
