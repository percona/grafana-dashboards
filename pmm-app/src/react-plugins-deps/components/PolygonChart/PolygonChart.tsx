// @ts-nocheck

import React, { Component } from 'react';
import * as d3 from 'd3';
import { area, axisBottom, curveStepAfter, scaleLinear } from 'd3';
import * as moment from 'moment';
import { Humanize } from '../helpers/Humanization';

interface PolygonChartInterface {
  data?: any;
  ykey?: any;
  width?: any;
  height?: any;
  metricName?: any;
}

class PolygonChart extends Component {
  private xkey: string;
  private ykey: string;
  private margin: number;
  private width: number;
  private height: number;
  private appLoadPolygonChart: any[];
  private data: any[];
  constructor(props: PolygonChartInterface) {
    super(props);
    this.xkey = 'timestamp';
    this.data = props.data;
    this.ykey = props.ykey || 'load';
    this.margin = 0;
    this.width = props.width || 300;
    this.height = props.height || 30;
    this.appLoadPolygonChart = props.data || [];
    this.metricName = props.metricName;
    this.state = {
      tooltip: '',
    };
  }

  componentDidMount() {
    this.drawPolygonChart();
    this.setState({ tooltip: this.dataTooltip });
  }

  findYRange(array) {
    const values = array.map(data => +data[this.ykey] || 0);
    return [Math.max(...values) || 1, Math.min(...values) || 0];
  }

  findXRange(array) {
    const values = array.map(data => +moment.utc(data[this.xkey]) || 0);

    return [Math.max(...values), Math.min(...values)];
  }

  drawPolygonChart() {
    // eslint-disable-next-line react/no-string-refs
    d3.select(this.refs.graphContainer)
      .selectAll('*')
      .remove();
    const svg = d3
      // eslint-disable-next-line react/no-string-refs
      .select(this.refs.graphContainer)
      .append('svg')
      .attr('class', 'axis')
      .attr('width', this.width)
      .attr('height', this.height);

    const xAxisLength = this.width - 2 * this.margin;
    const yAxisLength = this.height - 2 * this.margin;

    const [maxX, minX] = this.findXRange(this.appLoadPolygonChart);
    const scaleX = scaleLinear()
      .domain([maxX, minX])
      .range([0, xAxisLength]);

    const [maxY, minY] = this.findYRange(this.appLoadPolygonChart);
    const scaleY = scaleLinear()
      .domain([maxY, minY])
      .range([0, yAxisLength]);

    this.data = this.appLoadPolygonChart.map(item => {
      return new Object({
        x: scaleX(moment.utc(item['timestamp'])),
        y:
          scaleY(item[this.ykey] === 'NaN' ? 0 : Math.max(maxY / 30, item[this.ykey]) || 0) + this.margin ||
          0,
      });
    });

    const areaBar = area()
      .curve(curveStepAfter)
      .x(d => d.x)
      .y0(this.height - this.margin)
      .y1(d => d.y);

    const g = svg.append('g');
    const focusG = svg.append('g');
    // .style('display', 'none');

    g.append('path')
      .attr('d', areaBar(this.data))
      .style('fill', 'rgba(215, 114, 44, 0.6)');

    const focusBar = focusG
      .append('path')
      .attr('class', 'active-rect')
      .style('fill', 'white');
    // .on('mouseout', () => focusG.style('display', 'none'));

    focusBar
      .append('text')
      .attr('id', 'focusText')
      .attr('font-size', '10')
      .attr('x', 1)
      .attr('y', 8);

    const bisectDate = d3.bisector((d, x) => +moment.utc(d[this.xkey]).isBefore(x)).right;

    svg.on('mousemove', (d, i) => {
      const coords = d3.mouse(d3.event.currentTarget);
      const mouseDate = moment.utc(scaleX.invert(coords[0]));

      const indexOfStartPoint = Math.min(
        Math.max(bisectDate(this.appLoadPolygonChart, mouseDate), 0),
        this.appLoadPolygonChart.length - 1
      );
      const hoveredPoint = this.appLoadPolygonChart[indexOfStartPoint];
      const endPoint = this.appLoadPolygonChart[indexOfStartPoint - 1];
      const focusPointsRange = [hoveredPoint, endPoint];
      const activeArea: any = focusPointsRange.map(
        item =>
          new Object({
            x: scaleX(moment.utc(item[this.xkey])) || 0,
            y:
              scaleY(item[this.ykey] === 'NaN' ? 0 : Math.max(maxY / 30, item[this.ykey]) || 0) +
                this.margin || 0,
          })
      );
      const value = endPoint[this.ykey] === undefined ? 0 : endPoint[this.ykey];
      const load = Humanize.transform(value);
      const dateToShow = moment(endPoint[this.xkey]).format('YYYY-MM-DD HH:mm:ss');

      const isTimeBased =
        this.metricName.endsWith('_time') || this.metricName.endsWith('_wait') || this.metricName === 'load';

      focusBar.attr('d', areaBar(activeArea));
      this.dataTooltip = !value
        ? `NA at ${dateToShow}`
        : `${load} ${isTimeBased ? '' : '/ sec'} at ${dateToShow}`;
      this.setState({ tooltip: this.dataTooltip });
    });
    svg.on('mouseover', () => focusG.style('display', null));
    svg.on('mouseout', () => focusG.style('display', 'none'));

    // Create X axis
    const xAxis = axisBottom(scaleX);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${this.margin},${this.height - this.margin - 1})`)
      .call(xAxis);
  }
  render() {
    return (
      /* eslint-disable react/no-string-refs */
      <div
        ref="graphContainer"
        className="d3-bar-chart-container app-tooltip"
        data-tooltip={this.state.tooltip}
      ></div>
    );
  }
}

export default PolygonChart;
