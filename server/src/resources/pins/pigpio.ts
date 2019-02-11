//===- resources/pins/pigpio.ts - PiGPIO Pins ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { PinFactory } from "./factory";
import { Pin } from "./pin";

type PigpioModule = typeof import("pigpio");

export class PiGPIOFactory extends PinFactory {
  readonly pins: Map<number, Pin>;

  /** @internal */
  _pigpio: PigpioModule;

  constructor(pigpio: PigpioModule) {
    super();
    this.pins = new Map();
    this._pigpio = pigpio;
    this.GPIO_FUNCTIONS = gpioFunctions(pigpio);
    this.GPIO_PULL_UPS = gpioPullUps(pigpio);
    this.GPIO_EDGES = gpioEdges(pigpio);
    this.GPIO_FUNCTION_NAMES = reverse(this.GPIO_FUNCTIONS);
  }

  close() {
    for (const pin of this.pins.values()) {
      pin.close();
    }
    this.pins.clear();
  }

  pin(spec: string | number): Pin {
    const n = this.toGPIO(spec);
    let pin = this.pins.get(n);

    if (pin === undefined) {
      pin = new PiGPIOPin(this, n);
      this.pins.set(n, pin);
    }

    return pin;
  }

  ticks() {
    return this._pigpio.getTick();
  }

  ticksDiff(later: number, earlier: number) {
    return this._pigpio.tickDiff(earlier, later);
  }

  readonly GPIO_FUNCTIONS: Record<string, number>;

  readonly GPIO_PULL_UPS: Record<string, number>;

  readonly GPIO_EDGES: Record<string, number>;

  readonly GPIO_FUNCTION_NAMES: Record<number, string>;
}

export class PiGPIOPin extends Pin {
  private _factory: PiGPIOFactory;
  private _number: number;
  private _conn: import("pigpio").Gpio;

  constructor(factory: PiGPIOFactory, num: number) {
    super();
    this._factory = factory;
    this._number = num;
    this._conn = new factory._pigpio.Gpio(this._number);
  }

  get connection(): import("pigpio").Gpio {
    return this._conn;
  }

  get number(): number {
    return this._number;
  }

  get mode(): string {
    return this._factory.GPIO_FUNCTION_NAMES[this.connection.getMode()];
  }

  set mode(value: string) {
    this.connection.mode(this._factory.GPIO_FUNCTIONS[value]);
  }

  get state(): number {
    return this.connection.digitalRead();
  }

  set state(value: number) {
    if (this.mode === "input") {
      throw new Error("Can't set state of an input pin!");
    }

    this.connection.digitalWrite(value);
  }

  [Symbol.toStringTag]() {
    return `GPIO${this.number}`;
  }
}

function gpioFunctions(pigpio: PigpioModule): Record<string, number> {
  return {
    input: pigpio.Gpio.INPUT,
    output: pigpio.Gpio.OUTPUT,
    alt0: pigpio.Gpio.ALT0,
    alt1: pigpio.Gpio.ALT1,
    alt2: pigpio.Gpio.ALT2,
    alt3: pigpio.Gpio.ALT3,
    alt4: pigpio.Gpio.ALT4,
    alt5: pigpio.Gpio.ALT5
  };
}

function gpioPullUps(pigpio: PigpioModule): Record<string, number> {
  return {
    up: pigpio.Gpio.PUD_UP,
    down: pigpio.Gpio.PUD_DOWN,
    floating: pigpio.Gpio.PUD_OFF
  };
}

function gpioEdges(pigpio: PigpioModule): Record<string, number> {
  return {
    both: pigpio.Gpio.EITHER_EDGE,
    rising: pigpio.Gpio.RISING_EDGE,
    falling: pigpio.Gpio.FALLING_EDGE
  };
}

function reverse(obj: Record<string, number>): Record<number, string> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[value] = key;
      return acc;
    },
    {} as Record<number, string>
  );
}
