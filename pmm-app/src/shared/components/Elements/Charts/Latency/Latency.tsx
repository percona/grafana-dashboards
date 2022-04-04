import React, {
  useEffect, useRef, useState,
} from 'react';
import * as d3 from 'd3';
import Tooltip from 'antd/es/tooltip';
import { humanize } from '../../../helpers/Humanization';
import { getStyles } from './Latency.styles';

export const Latency = (props) => {
  const styles = getStyles();
  let measurement;
  const width = 200;
  const { className, data = [] } = props;
  const [tooltip, setTooltip] = useState('');
  const graphContainer = useRef(null);

  useEffect(() => {
    if (!graphContainer.current) {
      return;
    }

    drawChart(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawChart = (data) => {
    // eslint-disable-next-line react/no-string-refs
    const chart = d3.select(graphContainer.current);

    chart.selectAll('*').remove();
    const svg = chart
      .append('svg')
      .attr('height', '20')
      .attr('width', width);

    const x = d3.scaleLog()
      .domain([0.00001, 10000])
      .range([2, width - 2])
      .clamp(true)
      .nice();

    const {
      min = 0, max = 0, avg = 0, p99 = 0,
    } = data;
    const minStr = `⌜ Min: ${humanize.transform(min, measurement)}`;
    const maxStr = `⌟ Max: ${humanize.transform(max, measurement)}`;
    const avgStr = `◦ Avg: ${humanize.transform(avg, measurement)}`;
    const p99Str = `${p99 ? `• 99%: ${humanize.transform(p99, measurement)}` : ''}`;

    setTooltip(`${minStr}\n${maxStr}\n${avgStr}\n${p99Str}`.trim());

    const g = svg.append('g');

    // hrAxes
    g.append('line')
      .attr('class', 'latency-chart-x')
      .attr('x1', '0')
      .attr('stroke-dasharray', '1, 1')
      .attr('y1', '13px')
      .attr('x2', width)
      .attr('y2', '13px');

    // hrLine
    g.append('line')
      .attr('class', 'latency-chart-line')
      .attr('x1', `${x(min)}`)
      .attr('y1', '13px')
      .attr('x2', `${x(max)}`)
      .attr('y2', '13px');

    // minMark
    g.append('line')
      .attr('class', 'latency-chart-min')
      .attr('x1', `${x(min)}`)
      .attr('y1', '13px')
      .attr('x2', `${x(min)}`)
      .attr('y2', '19px');

    // maxMark
    g.append('line')
      .attr('class', 'latency-chart-max')
      .attr('x1', `${x(max)}`)
      .attr('y1', '8px')
      .attr('x2', `${x(max)}`)
      .attr('y2', '13px');

    // avgMark
    g.append('circle')
      .attr('class', 'latency-chart-avg')
      .attr('r', 3)
      .attr('cx', `${x(avg)}`)
      .attr('cy', '13px');

    // p99Mark
    if (p99 > 0) {
      g.append('circle')
        .attr('class', 'latency-chart-p95')
        .attr('r', 2)
        .attr('cx', `${x(p99)}`)
        .attr('cy', '13px');
    }
  };

  return (
    <>
      <Tooltip
        getPopupContainer={() => document.querySelector('#antd') || document.body}
        placement="left"
        overlayClassName={styles.latencyTooltip}
        title={(
          <pre style={{ backgroundColor: 'transparent', border: 'none' }}>
            <span>{tooltip}</span>
          </pre>
        )}
      >
        <div className={`${className || ''} d3-bar-chart-container`} ref={graphContainer} data-tip="" />
      </Tooltip>
    </>
  );
};
