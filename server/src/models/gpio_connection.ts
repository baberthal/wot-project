//===- models/gpio_connection.ts - Represents a GPIO Connection ------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { GpioBase } from "./base";

export interface GpioConnectionOptions {}

export class GpioConnection<T extends GpioBase> {
  public model: T;
  readonly options: GpioConnectionOptions;

  constructor(model: T, options: GpioConnectionOptions) {
    this.model = model;
    this.options = options;
  }

  get name(): string {
    return this.model.name;
  }
}
