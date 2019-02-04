//===- v-chart.component - V-Chart Component -------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Prop, Watch } from "@/core/decorators";
import * as d3 from "d3-selection";
import Vue from "vue";

import { BuilderResult, ChartBuilder } from "../builders/chart_builder";
import { ChartConfig } from "../chart_config";
import { Dataset } from "../dataset";

import template from "./v-chart.template.html";

@Component({
  template
})
export class VChart extends Vue {
  @Prop() config!: ChartConfig;

  get selector(): string {
    return `${this.config.selector}--${this.config.chartType}`;
  }

  // Chart Drawing Methods

  initializeChart() {
    const cs = this.builder.init();
    this.drawTitle();
    this.generateAxisLabels(cs);
    this.generateLegend(cs);
  }

  @Watch("config", { deep: true })
  refreshChart() {
    this.clearAxes();
    this.builder.refresh();
  }

  drawChart() {
    this.drawTitle();
  }

  // Implementation Details

  /**
   * Override the values returned from the chart builder.
   *
   * @param cs the BuilderResult
   * @param overrides extra values to add / override in `cs`.
   * @return updated BuilderResult
   */
  setOverrides(
    cs: BuilderResult,
    overrides?: Partial<BuilderResult>
  ): BuilderResult {
    overrides = overrides || {};
    const keys = Object.keys(cs);
    for (const key of keys) {
      Object.assign(cs[key], overrides[key]);
    }
    return cs;
  }

  generateLegend(cs: BuilderResult) {
    if (!this.config.legends) return;
    if (this.config.legends.enabled !== true) return;

    cs.palette.lineFill = arrayify(cs.palette.lineFill);
    cs.palette.fill = arrayify(cs.palette.fill);

    this.metric.forEach((elem, idx) => {
      this.chartEl
        .append("text")
        .attr("font-size", 10)
        .attr("x", this.width - 60)
        .attr("y", this.height * 0.95 - idx * 15)
        .style("text-anchor", "middle")
        .text(this.metric[idx]);

      this.chartEl
        .append("g")
        .attr("class", "legends")
        .append("rect")
        .attr("x", this.width - 30)
        .attr("y", this.height * 0.95 - idx * 15 - 10)
        .attr("width", 30)
        .attr("height", 10)
        .style("fill", () => {
          const fill = cs.palette.lineFill![idx] || cs.palette.fill![idx];
          return fill;
        });
    });
  }

  generateAxisLabels(cs: BuilderResult) {
    if (!this.config.label) return;

    const footer = this.config.legends ? 0.85 : 0.95;
    this.chartEl.selectAll("text.axisLabel").remove();

    if (cs.x && cs.x.label) {
      this.chartEl
        .append("text")
        .attr("font-size", 10)
        .attr("x", this.width / 2)
        .attr("y", this.height * footer)
        .attr("id", "xAxisLabel")
        .attr("class", "axisLabel")
        .style("text-anchor", "middle")
        .text(cs.x.label);
    }

    if (cs.y && cs.y.label) {
      this.chartEl
        .append("text")
        .attr("font-size", 10)
        .attr("x", 10)
        .attr("y", this.height / 2)
        .attr("id", "yAxisLabel")
        .attr("class", "axisLabel")
        .style("text-anchor", "middle")
        .text(cs.y.label)
        .attr("transform", `rotate(-90, 10, ${this.height / 2})`);
    }
  }

  /**
   * Remove the x and y axes of the chart.
   */
  clearAxes() {
    this.chartEl.selectAll(".axis").remove();
  }

  /**
   * Remove all content from the chart host svg element.
   */
  clearCanvas() {
    this.chartEl.selectAll("*").remove();
  }

  /**
   * Adds title and subtitle to the chart, if applicable.
   */
  drawTitle() {
    this.chartEl
      .append("text")
      .attr("font-size", 20)
      .attr("x", this.width / 2)
      .attr("y", this.titleHeight * 0.9)
      .style("text-anchor", "middle")
      .text(this.config.title!);

    this.chartEl
      .append("text")
      .attr("font-size", 12)
      .attr("x", this.width / 2)
      .attr("y", this.titleHeight * 0.9 + this.subtitleHeight)
      .style("text-anchor", "middle")
      .text(this.config.subtitle!);
  }

  // Getters

  get dataset() {
    const ds: Dataset = {
      metric: arrayify(this.config.metric),
      dim: this.dim,
      data: this.config.data
    };

    return ds.data.map(d => {
      const result: {
        metric: (object | number)[];
        dim?: string | null;
      } = { metric: [] };

      if (!ds.metric) {
        result.metric[0] = d || 0;
      } else {
        ds.metric.forEach((e, i) => {
          result.metric[i] = (d as any)[e] || 0;
        });
      }

      result.dim = this.config.dim ? (d as any)[this.config.dim] : null;
      return result;
    });
  }

  get dim(): string {
    return this.config.dim || "undefined";
  }

  get metric(): string[] {
    return arrayify(this.config.metric);
  }

  get height() {
    return this.config.height - this.config.margin.top;
  }

  get width() {
    return this.config.width - this.config.margin.left;
  }

  get displayHeight(): number {
    if (this.config.legends && this.config.legends.enabled) {
      return this.height * 0.8;
    }

    return this.height * 0.9;
  }

  get titleHeight(): number {
    if (this.config.title) return this.config.textHeight || 25;
    return 0;
  }

  get subtitleHeight(): number {
    if (this.config.subtitle) return (this.config.textHeight || 25) * 0.66;
    return 0;
  }

  get headerHeight(): number {
    return this.titleHeight + this.subtitleHeight;
  }

  get chartEl() {
    return d3.select(`#${this.selector}`);
  }

  private _builder!: ChartBuilder;

  private get builder(): ChartBuilder {
    if (this._builder === undefined) {
      const cls = ChartBuilder.for(this.config.chartType);
      this._builder = new cls(this);
    }

    return this._builder;
  }

  // Lifecycle Hooks

  mounted() {
    this.initializeChart();
  }
}

export default VChart;

function arrayify<T>(arg?: T | T[]): T[] {
  if (!arg) return [];
  return Array.isArray(arg) ? arg : new Array(arg);
}
