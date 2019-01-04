//===- plugins/pir_plugin.ts - PIR Plugin ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

// import { Gpio } from "onoff";
// import { BasePlugin, PluginOptions } from "./base";

// import { resources } from "../resources";
// const model = resources.pi.sensors.pir;

// export interface PirPluginOptions extends PluginOptions {
//   frequency?: number;
// }

// const DefaultOptions = {
//   simulate: true,
//   frequency: 2000
// };

// export class PirPlugin extends BasePlugin<PirPluginOptions> {
//   readonly name = model.name;

//   private _interval: NodeJS.Timeout | null = null;
//   private _sensor: Gpio | null = null;

//   // setInterval(() => {
//   // }, this.options.frequency || DefaultOptions.frequency);

//   constructor(options: PirPluginOptions = {}) {
//     super(Object.assign({}, DefaultOptions, options));
//   }

//   start(options?: PirPluginOptions) {
//     if (options) this.options = Object.assign(this.options, options);

//     if (this.options.simulate) {
//       this.simulate();
//     } else {
//       this.connectHardware();
//     }
//   }

//   stop(options?: PirPluginOptions) {
//     if (options) this.options = Object.assign(this.options, options);

//     if (this.options.simulate) {
//       clearInterval(this._interval!);
//     } else {
//       this.sensor.unexport();
//     }

//     this.info(`${this.name} plugin stopped!`);
//   }

//   get isSimulation(): boolean {
//     return !!this.options.simulate;
//   }

//   get frequency(): number {
//     return this.options.frequency || DefaultOptions.frequency;
//   }

//   private get sensor(): Gpio {
//     if (this.isSimulation) {
//       throw new Error(`ERROR: Called #sensor() in a simulation!`);
//     }

//     return this._sensor!;
//   }

//   private set sensor(gpio: Gpio) {
//     if (this.isSimulation) {
//       throw new Error(`ERROR: Called #sensor=(value) in a simulation!`);
//     }

//     this._sensor = gpio;
//   }

//   private simulate() {
//     this._interval = setInterval(() => {
//       model.value = !model.value;
//       this.showValue();
//     }, this.frequency);
//   }

//   private connectHardware() {
//     this.sensor = new Gpio(model.gpio, "in", "both");
//     this.sensor.watch((err, value) => {
//       if (err) throw err;
//       model.value = !!value;
//       this.showValue();
//     });
//     this.info(`Hardware ${this.name} sensor started!`);
//   }

//   private info(message: string) {
//     /* tslint:disable-next-line:no-console */
//     console.info(message);
//   }

//   private showValue() {
//     this.info(model.value ? "there is someone!" : "not anymore!");
//   }
// }
