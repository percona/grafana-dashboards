import React, { Component } from 'react';
import * as d3 from 'd3';
import { scaleLog } from 'd3';
import { Humanize } from '../helpers/humanize';

interface LatencyChartInterface {
  data?: any[];
}
class LatencyChart extends Component {
  private readonly width: number;
  private readonly data: any[];
  private measurement: string | undefined;
  private dataTooltip: string | undefined;
  constructor(props: LatencyChartInterface) {
    super(props as any);
    this.width = 150;
    this.data = props.data || [];
    this.state = {};
  }

  componentDidMount() {
    this.drawChart(this.data);
    this.setState({ tooltip: this.dataTooltip });
  }
  drawChart(data) {
    const chart = d3.select(this.refs.graphContainer);
    chart.selectAll('*').remove();

    const svg = chart
      .append('svg')
      .attr('height', '20')
      .attr('width', this.width);

    const x = scaleLog()
      .domain([0.00001, 10000])
      .range([2, this.width - 2])
      .clamp(true)
      .nice();

    const { min = 0, max = 0, avg = 0, p99 = 0 } = data;
    console.log(data,'data')
    const minStr = `⌜ Min: ${Humanize.transform(min, this.measurement)}`;
    const maxStr = `⌟ Max: ${Humanize.transform(max, this.measurement)}`;
    const avgStr = `◦ Avg: ${Humanize.transform(avg, this.measurement)}`;
    const p99Str = `${p99 ? `• 99%: ${Humanize.transform(p99, this.measurement)}` : ''}`;

    this.dataTooltip = `${minStr}\n${maxStr}\n${avgStr}\n${p99Str}`.trim();

    const g = svg.append('g');

    // hrAxes
    g.append('line')
      .attr('class', 'latency-chart-x')
      .attr('x1', '0')
      .attr('stroke-dasharray', '1, 1')
      .attr('y1', '13px')
      .attr('x2', this.width)
      .attr('y2', '13px');

    // hrLine
    g.append('line')
      .attr('class', 'latency-chart-line')
      .attr('x1', x(min) + '')
      .attr('y1', '13px')
      .attr('x2', x(max) + '')
      .attr('y2', '13px');

    // minMark
    g.append('line')
      .attr('class', 'latency-chart-min')
      .attr('x1', x(min) + '')
      .attr('y1', '13px')
      .attr('x2', x(min) + '')
      .attr('y2', '19px');

    // maxMark
    g.append('line')
      .attr('class', 'latency-chart-max')
      .attr('x1', x(max) + '')
      .attr('y1', '8px')
      .attr('x2', x(max) + '')
      .attr('y2', '13px');

    // avgMark
    g.append('circle')
      .attr('class', 'latency-chart-avg')
      .attr('r', 3)
      .attr('cx', x(avg) + '')
      .attr('cy', '13px');

    // p99Mark
    if (p99 > 0) {
      g.append('circle')
        .attr('class', 'latency-chart-p95')
        .attr('r', 2)
        .attr('cx', x(p99) + '')
        .attr('cy', '13px');
    }
  }
  render() {
    return <div className={'d3-bar-chart-container app-tooltip'} ref={'graphContainer'} data-tooltip={this.state.tooltip}></div>;
  }
}

export default LatencyChart;
