//===- models/base.ts - Base model class -----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface BaseConfig {
  name: string;
}

export abstract class Base<T extends BaseConfig> {
  readonly id: string;
  readonly name: string;

  constructor(id: string, config: T) {
    this.id = id;
    this.name = config.name;
  }
}
