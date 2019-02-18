//===- gpio/pins/pigpio.ts - Concrete PiGPIO Implementation ----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  Gpio,
  getTick,
  hardwareRevision,
  initialize as pigpio_init,
  tickDiff
} from "pigpio";

import log from "../logger";
import { GPIOPinEdge, GPIOPinMode, GPIOPinPullUp } from "../types";

import { PiGPIOPinBase } from "./pigpio_base";
import { PinFactory } from "./pin";

// Make sure we initialize the library before any signal handlers are started
log.debug(">>> pigpio.initialize()");
pigpio_init();
log.debug("<<< pigpio.initialize()");

interface pigpio_native {
  gpioSetISRFunc(
    gpio: number,
    edge: number,
    timeout: number,
    handler?: (gpio: number, edge: number, tick: number) => void
  ): void;
}

const bindings = require("bindings");
const pigpio_native: pigpio_native = bindings({
  module_root: bindings.getRoot(require.resolve("pigpio")),
  bindings: "pigpio.node"
});

export class PiGPIOFactory extends PinFactory {
  readonly pinConstructor = PiGPIOPin;

  constructor() {
    super();
  }

  ticks(): number {
    return getTick();
  }

  ticksDiff(later: number, earlier: number): number {
    return tickDiff(earlier, later);
  }

  /** @internal */
  _getRevision(): string | number {
    return hardwareRevision();
  }
}

export class PiGPIOPin extends PiGPIOPinBase {
  readonly connection: Gpio;
  protected _handler?: (gpio: number, ticks: number, level: number) => void;

  constructor(factory: PiGPIOFactory, num: number) {
    super(factory, num);
    log.debug("PiGPIOPin#constructor()");
    this.connection = new Gpio(this.number);
    this.connection.mode(Gpio.INPUT);
    this.connection.pullUpDown(GPIO_PULL_UPS[this._pull]);
    this.connection.glitchFilter(0);
  }

  _gpioModeName(value: number): GPIOPinMode {
    return GPIO_MODE_NAMES[value];
  }

  _gpioMode(name: GPIOPinMode): number {
    return GPIO_MODES[name];
  }

  _gpioEdgeName(value: number): GPIOPinEdge {
    return GPIO_EDGE_NAMES[value];
  }

  _gpioEdge(name: GPIOPinEdge): number {
    return GPIO_EDGES[name];
  }

  _gpioPullUp(name: GPIOPinPullUp): number {
    return GPIO_PULL_UPS[name];
  }

  enableEventDetect(): void {
    log.debug("PiGPIOPin#enableEventDetect()");
    const handler = (gpio: number, level: number, ticks: number) => {
      this._invokeCallback(gpio, level, ticks);
    };
    this._handler = handler;
    pigpio_native.gpioSetISRFunc(this.number, this._edges, 0, handler);
  }

  disableEventDetect(): void {
    log.debug("PiGPIOPin#disableEventDetect()");
    if (this._handler != null) {
      pigpio_native.gpioSetISRFunc(this._number, this._edges, 0);
      this._handler = undefined;
    }
  }
}

interface PiGPIOPinPrivate extends PiGPIOPin {
  connection: Gpio;
}

// get mode(): GPIOPinMode {
//   return this.GPIO_MODE_NAMES[this.connection.getMode()];
// }

// set mode(value: GPIOPinMode) {
//   if (value !== "input") {
//     this._pull = "floating";
//   }
//   const mode = this.GPIO_MODES[value];
//   if (!mode) {
//     throw new Error(`Invalid function "${value}" for ${this}`);
//   }
//   this.connection.mode(mode);
// }

//  Constants and Helpers {{{ //

const GPIO_MODES: { [K in GPIOPinMode]: number } = {
  input: Gpio.INPUT,
  output: Gpio.OUTPUT,
  alt0: Gpio.ALT0,
  alt1: Gpio.ALT1,
  alt2: Gpio.ALT2,
  alt3: Gpio.ALT3,
  alt4: Gpio.ALT4,
  alt5: Gpio.ALT5
};

const GPIO_MODE_NAMES: { [k: number]: GPIOPinMode } = reverse(GPIO_MODES);

const GPIO_EDGES: { [K in GPIOPinEdge]: number } = {
  both: Gpio.EITHER_EDGE,
  rising: Gpio.RISING_EDGE,
  falling: Gpio.FALLING_EDGE
};

const GPIO_EDGE_NAMES: { [k: number]: GPIOPinEdge } = reverse(GPIO_EDGES);

const GPIO_PULL_UPS: { [K in GPIOPinPullUp]: number } = {
  up: Gpio.PUD_UP,
  down: Gpio.PUD_DOWN,
  floating: Gpio.PUD_OFF,
  off: Gpio.PUD_OFF
};

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

//  }}} Constants and Helpers //
