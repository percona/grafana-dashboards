// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { area, axisBottom, curveStepAfter, scaleLinear } from 'd3';
import * as moment from 'moment';
import { Humanize } from '../helpers/Humanization';
import './PolygonChart.scss';

interface PolygonChartInterface {
  data?: any;
  ykey?: any;
  width?: any;
  height?: any;
  metricName?: any;
}

const Chart = ({
  appLoadPolygonChart,
  margin,
  height,
  width,
  metricName,
  ykey,
  xkey,
  data,
}: PolygonChartInterface) => {
  xkey = 'timestamp';
  ykey = ykey || 'load';
  margin = 0;
  width = width || 300;
  height = height || 30;
  appLoadPolygonChart = [...data] || [];

  const getAdditionalPoint = (last, previous) =>
    new Date(
      (+moment.utc(last) || 0) - ((+moment.utc(previous) || 0) - (+moment.utc(last) || 0))
    ).toISOString();

  // Adding additional point for display purposes
  // TODO: replace it with something better
  appLoadPolygonChart.push({
    point: appLoadPolygonChart[appLoadPolygonChart.length - 1].point + 1,
    timestamp: getAdditionalPoint(
      appLoadPolygonChart[appLoadPolygonChart.length - 1].timestamp,
      appLoadPolygonChart[appLoadPolygonChart.length - 2].timestamp
    ),
  });

  const [tooltip, setTooltip] = useState('');
  const isMetricExists = metric => metric === 'NaN' || metric === undefined || metric === '';

  const findYRange = function(array) {
    const values = array.map(data => +data[ykey] || 0);
    return [Math.max(...values) || 1, Math.min(...values) || 0];
  };

  const findXRange = function(array) {
    const values = array.map(data => +moment.utc(data[xkey]) || 0);

    return [Math.max(...values), Math.min(...values)];
  };
  // eslint-disable-next-line react/no-string-refs
  const ref = useRef();

  useEffect(() => {
    drawGraph(ref);
  });
  const drawGraph = element => {
    d3.select(ref.current)
      .selectAll('*')
      .remove();
    const svg = d3
      // eslint-disable-next-line react/no-string-refs
      .select(ref.current)
      .append('svg')
      .attr('class', 'axis')
      .attr('width', width)
      .attr('height', height);

    const xAxisLength = width - 2 * margin;
    const yAxisLength = height - 2 * margin;

    const [maxX, minX] = findXRange(appLoadPolygonChart);
    const scaleX = scaleLinear()
      .domain([minX, maxX])
      .range([0, xAxisLength]);

    const [maxY, minY] = findYRange(appLoadPolygonChart);
    const scaleY = scaleLinear()
      .domain([maxY, minY])
      .range([0, yAxisLength]);

    data = appLoadPolygonChart.map(item => {
      return new Object({
        x: scaleX(moment.utc(item['timestamp'])),
        y: scaleY(isMetricExists(item[ykey]) ? 0 : Math.max(maxY / 15, item[ykey])) + margin || 0,
      });
    });

    const areaBar = area()
      .curve(curveStepAfter)
      .x(d => d.x)
      .y0(height - margin)
      .y1(d => d.y);

    const g = svg.append('g');
    const focusG = svg.append('g');
    // .style('display', 'none');

    g.append('path')
      .attr('d', areaBar(data))
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

    const bisectDate = d3.bisector((d, x) => +moment.utc(d[xkey]).isBefore(x)).right;

    svg.on('mousemove', (d, i) => {
      const coords = d3.mouse(d3.event.currentTarget);
      const mouseDate = moment.utc(scaleX.invert(coords[0]));

      const indexOfStartPoint = Math.min(
        Math.max(bisectDate(appLoadPolygonChart, mouseDate), 0),
        appLoadPolygonChart.length - 1
      );
      const hoveredPoint = appLoadPolygonChart[indexOfStartPoint];
      const endPoint = appLoadPolygonChart[indexOfStartPoint - 1];
      const focusPointsRange = [hoveredPoint, endPoint];
      const activeArea: any = focusPointsRange.map(
        item =>
          new Object({
            x: scaleX(moment.utc(item[xkey])) || 0,
            y:
              scaleY(isMetricExists(endPoint[ykey]) ? 0 : Math.max(maxY / 15, endPoint[ykey]) || 0) +
                margin || 0,
          })
      );
      const value = isMetricExists(endPoint[ykey]) ? 0 : endPoint[ykey];
      const dateToShow = moment(endPoint[xkey]).format('YYYY-MM-DD HH:mm:ss');

      const isTimeBased =
        metricName.endsWith('_time') || metricName.endsWith('_wait') || metricName === 'load';
      const load = Humanize.transform(value, isTimeBased ? 'time' : 'number');

      focusBar.attr('d', areaBar(activeArea));
      const dataTooltip = !value
        ? `NA at ${dateToShow}`
        : `${load} ${isTimeBased ? '' : '/ sec'} at ${dateToShow}`;
      setTooltip(dataTooltip);
    });
    svg.on('mouseover', () => focusG.style('display', null));
    svg.on('mouseout', () => focusG.style('display', 'none'));

    // Create X axis
    const xAxis = axisBottom(scaleX);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin},${height - margin - 1})`)
      .call(xAxis);
  };

  return (
    /* eslint-disable react/no-string-refs */
    <div ref={ref} className="d3-bar-chart-container app-tooltip" data-tooltip={tooltip}></div>
  );
};

export default Chart;
