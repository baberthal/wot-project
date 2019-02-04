//===- charts/builders/line_chart_builder.ts - Line Charts -----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Dataset } from "../dataset";

import { BuilderResult, ChartBuilder } from "./chart_builder";
import d3 from "./d3";

type LineChartBuilderResult = BuilderResult & {
  lineFunction: Array<(ds: Dataset) => void>;
  x: { scale: any };
  y: { scale: any };
};

export class LineChartBuilder extends ChartBuilder {
  init(): BuilderResult {
    const cs: LineChartBuilderResult = this.createResult();
    return null!;
  }

  refresh() {
    this.init();
  }

  readonly svgContainer = d3.select(`#${this.host.selector}`);

  private createResult(): LineChartBuilderResult {
    const base = this.baseResult as LineChartBuilderResult;
    base.lineFunction = [];
    return base as LineChartBuilderResult;
  }

  private get baseResult(): BuilderResult {
    return {
      palette: {
        lineFill: ["#ffcdcd", "#005792"],
        pointFill: "#005792",
        pointStroke: "#d1f4fa"
      },
      x: {
        label: this.host.dim,
        domain: [],
        range: [],
        axisHeight: 20
      },
      y: {
        label: this.host.metric[0],
        axisWidth: 40,
        ticks: 5
      }
    };
  }
}

ChartBuilder.register("line-chart", LineChartBuilder);
