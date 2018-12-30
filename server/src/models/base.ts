//===- models/base.ts - Base model class -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface BaseConfig {
  name: string;
}

export abstract class Base {
  readonly id: string;
  readonly name: string;

  constructor(id: string, config: BaseConfig) {
    this.id = id;
    this.name = config.name;
  }
}

export interface GpioBaseConfig extends BaseConfig {
  gpio: number;
}

export class GpioBase extends Base {
  readonly gpio: number;

  constructor(id: string, config: GpioBaseConfig) {
    super(id, config);
    this.gpio = config.gpio;
  }
}
