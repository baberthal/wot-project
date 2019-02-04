//===- charts/builders/chart_builder.ts - Builds a chart -------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { VChart } from "../v-chart";

export interface BuilderResult {
  palette: {
    lineFill?: string | string[];
    fill?: string | string[];
    pointFill?: string;
    pointStroke?: string | string[];
  };

  x?: {
    label?: string;
    domain?: string[];
    range?: string[];
    axisHeight: number;
  };

  y?: {
    label?: string;
    axisWidth: number;
    ticks: number;
  };

  [key: string]: any;
}

export interface ChartBuilderConstructor {
  chartType?: string;
  new (parent: VChart): ChartBuilder;
}

export abstract class ChartBuilder {
  private static _registry: Map<string, ChartBuilderConstructor> = new Map();

  static for(chartType: string): ChartBuilderConstructor {
    const builderCls = this._registry.get(chartType);
    if (!builderCls) {
      throw new Error(`No builder class registered for '${chartType}'!`);
    }

    return builderCls;
  }

  static register(builder: ChartBuilderConstructor): void;
  static register(type: string, builder: ChartBuilderConstructor): void;
  static register(
    first: string | ChartBuilderConstructor,
    second?: ChartBuilderConstructor
  ): void {
    let chartType: string;
    let builder: ChartBuilderConstructor;

    if (typeof first === "string") {
      chartType = first;
      builder = second!;
    } else if (second && second.chartType != null) {
      chartType = second.chartType;
      builder = second;
    } else {
      throw new Error(
        `Must provide either a 'type' argument, or a 'chartType' property on the constructor`
      );
    }

    if (this._registry.has(chartType)) {
      throw new Error(`Already registered chart type '${chartType}'!`);
    }

    this._registry.set(chartType, builder);
  }

  constructor(protected host: VChart) {}

  abstract init(): BuilderResult;

  abstract refresh(): void;
}
