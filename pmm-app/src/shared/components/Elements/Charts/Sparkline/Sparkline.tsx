// @ts-nocheck

import React, {
  useEffect, useMemo, useRef, useState
} from 'react';
import * as d3 from 'd3';
import {
  area, axisBottom, curveStepAfter, scaleLinear
} from 'd3';
import * as moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { humanize } from '../../../helpers/Humanization';
import './Sparkline.scss';
import { PolygonChartInterface } from './Sparkline.types';

const getMetricSparklineKey = (metricName) => {
  switch (metricName) {
    case 'load':
      return 'load';
    case 'num_queries':
      return 'num_queries_per_sec';
    case 'num_queries_with_warnings':
      return 'num_queries_with_warnings_per_sec';
    case 'num_queries_with_errors':
      return 'num_queries_with_errors_per_sec';
    default:
      return `m_${metricName}_sum_per_sec`;
  }
};

export const Sparkline = ({
  margin = 0,
  width = 300,
  height = 30,
  metricName,
  data,
  color = 'rgba(255, 239, 168, 0.8)',
}: PolygonChartInterface) => {
  const xkey = 'timestamp';
  const ykey = getMetricSparklineKey(metricName);
  const appLoadPolygonChart = [...data] || [];

  const getAdditionalPoint = (last, previous) => new Date(
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
  const isMetricExists = (metric) => metric === 'NaN' || metric === undefined || metric === '';

  const findYRange = (array) => {
    const values = array.map((arrayItem) => +arrayItem[ykey] || 0);

    return [Math.max(...values) || 1, Math.min(...values) || 0];
  };

  const findXRange = (array) => {
    const values = array.map((arrayItem) => +moment.utc(arrayItem[xkey]) || 0);

    return [Math.max(...values), Math.min(...values)];
  };
  // eslint-disable-next-line react/no-string-refs
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    drawGraph(ref);
  });
  const drawGraph = () => {
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

    const drawData = appLoadPolygonChart.map((item) => ({
      x: scaleX(moment.utc(item.timestamp)),
      y: scaleY(isMetricExists(item[ykey]) ? 0 : Math.max(maxY / 15, item[ykey])) + margin || 0,
    }));

    const areaBar = area()
      .curve(curveStepAfter)
      .x((d) => d.x)
      .y0(height - margin)
      .y1((d) => d.y);

    const g = svg.append('g');
    const focusG = svg.append('g');
    // .style('display', 'none');

    g.append('path')
      .attr('d', areaBar(drawData))
      .style('fill', color);

    const focusBar = focusG
      .append('path')
      .attr('class', 'active-rect')
      .style('fill', 'white');

    focusBar
      .append('text')
      .attr('id', 'focusText')
      .attr('font-size', '10')
      .attr('x', 1)
      .attr('y', 8);

    const bisectDate = d3.bisector((d, x) => +moment.utc(d[xkey]).isBefore(x)).right;

    svg.on('mousemove', () => {
      const coords = d3.mouse(d3.event.currentTarget);
      const mouseDate = moment.utc(scaleX.invert(coords[0]));

      const indexOfStartPoint = Math.min(
        Math.max(bisectDate(appLoadPolygonChart, mouseDate), 0),
        appLoadPolygonChart.length - 1
      );
      const hoveredPoint = appLoadPolygonChart[indexOfStartPoint];
      const endPoint = appLoadPolygonChart[indexOfStartPoint - 1];
      const focusPointsRange = [hoveredPoint, endPoint];
      const activeArea: any = focusPointsRange.map((item) => ({
        x: scaleX(moment.utc(item[xkey])) || 0,
        y:
          scaleY(isMetricExists(endPoint[ykey]) ? 0 : Math.max(maxY / 15, endPoint[ykey]) || 0) + margin || 0,
      }));
      const value = isMetricExists(endPoint[ykey]) ? 0 : endPoint[ykey];
      const dateToShow = moment(endPoint[xkey]).format('YYYY-MM-DD HH:mm:ss');

      // eslint-disable-next-line max-len
      const isTimeBased = metricName.endsWith('_time') || metricName.endsWith('_wait') || metricName === 'load';
      const load = humanize.transform(value, 'number');

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

  return useMemo(
    () => (
      <>
        <div ref={ref} className="d3-bar-chart-container" data-tip={tooltip} />
        {console.log('rerender graph')}
        {/* <div>231</div> */}
        <ReactTooltip
          className="sparkline-tooltip"
          place="bottom"
          backgroundColor="#3274d9"
          arrowColor="#3274d9"
        />
      </>
    ),
    []
  );
};
