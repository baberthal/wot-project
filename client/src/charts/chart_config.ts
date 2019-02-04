//===- charts/chart_config.ts - Chart Config -------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface IChartConfig {
  chartType: string;
  selector?: string;

  title?: string;
  subtitle?: string;

  metric?: string | string[];

  height?: number;
  width?: number;
  textHeight?: number;

  dim?: string;
  data?: object[];

  label?: string;
  legends?: {
    enabled: boolean;
    height: number;
    width: number;
  };
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export class ChartConfig {
  /** Default value for `width`. */
  static readonly DEFAULT_WIDTH = 500;

  /** Default value for `height`. */
  static readonly DEFAULT_HEIGHT = 500;

  /**
   * If the passed argument is an instance of `ChartConfig`, simply returns it.
   * Otherwise, creates a new instance using the passed argument.
   */
  static create(init: IChartConfig | ChartConfig): ChartConfig {
    if (init instanceof ChartConfig) {
      return init;
    }

    return new ChartConfig(init);
  }

  /** Type of the chart. */
  readonly chartType: string;

  /**
   * CSS Selector used to select the chart host element. Defaults to
   * `this.chartType`.
   */
  readonly selector: string;

  /** Title of the chart. */
  title?: string;
  subtitle?: string;

  /** Chart dimensions. */
  height: number;
  width: number;
  textHeight?: number;

  /**
   * Metric for the chart.
   * TODO: Document this some more.
   */
  readonly metric: string | string[];

  dim?: string;

  data: object[];

  label?: string;

  legends?: {
    enabled: boolean;
    height: number;
    width: number;
  };

  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  constructor(init: IChartConfig | ChartConfig) {
    this.chartType = init.chartType;
    this.selector = init.selector || init.chartType;

    this.title = init.title;
    this.subtitle = init.subtitle;

    this.metric = init.metric || [];

    this.height = init.height || ChartConfig.DEFAULT_HEIGHT;
    this.width = init.width || ChartConfig.DEFAULT_WIDTH;
    this.textHeight = init.textHeight;

    this.dim = init.dim;
    this.data = init.data || [];

    this.label = init.label;

    this.legends = init.legends;
    this.margin = init.margin || {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
  }
}
