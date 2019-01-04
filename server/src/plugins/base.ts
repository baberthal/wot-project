//===- plugins/base.ts - Base Plugin Class ---------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface BasePluginOptions {
  simulate: boolean;
  frequency: number;
}

export abstract class BasePlugin {
  static readonly defaultOptions: BasePluginOptions = {
    simulate: false,
    frequency: 5000
  };

  public options: BasePluginOptions;
  public readonly name: string;
  public readonly actions: string[];

  constructor(
    options: Partial<BasePluginOptions>,
    name: string,
    actions: string[] = []
  ) {
    this.options = mergeOptions(BasePlugin.defaultOptions, options);
    this.name = name;
    this.actions = actions;
  }

  abstract start(options?: Partial<BasePluginOptions>): void;

  abstract stop(options?: Partial<BasePluginOptions>): void;

  simulate() {}
}

function mergeOptions(
  defaults: BasePluginOptions,
  options: Partial<BasePluginOptions>
): BasePluginOptions {
  return Object.assign({}, defaults, options);
}
