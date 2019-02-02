//===- models/base.ts - Base model class -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface BaseAttributes {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModelBaseConfig {
  name: string;
}

export abstract class ModelBase {
  readonly id: string;
  readonly name: string;

  constructor(id: string, config: ModelBaseConfig) {
    this.id = id;
    this.name = config.name;
  }
}

export interface GpioBaseConfig extends ModelBaseConfig {
  gpio: number;
}

export class GpioBase extends ModelBase {
  readonly gpio: number;

  constructor(id: string, config: GpioBaseConfig) {
    super(id, config);
    this.gpio = config.gpio;
  }
}
