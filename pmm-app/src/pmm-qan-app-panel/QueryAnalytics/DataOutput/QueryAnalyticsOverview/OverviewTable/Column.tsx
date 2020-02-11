import React from 'react';
import PolygonChart from 'react-plugins-deps/components/PolygonChart/PolygonChart';
import LatencyChart from 'react-plugins-deps/components/LatencyChart/LatencyChart';
import { Humanize } from 'react-plugins-deps/components/helpers/Humanization';

import AddColumn from '../../AddColumn';
import './OverviewTable.scss';
import { METRIC_CATALOGUE } from '../../metric-catalogue';
import Tooltip from 'antd/es/tooltip';
import { Card, List } from 'antd';

export const getOverviewColumn = (metricName, columnIndex, totalValues, orderBy) => {
  const metric = METRIC_CATALOGUE[metricName];
  let sortOrder: boolean | string = false;
  if (orderBy === metricName) {
    sortOrder = 'ascend';
  } else if (orderBy === `-${metricName}`) {
    sortOrder = 'descend';
  }
  return {
    sorter: true,
    key: metricName,
    defaultSortOrder: sortOrder,
    // width: '200px',
    title: () => <AddColumn placeholder={metricName} currentMetric={metric} />,
    render: (text, item) => {
      const stats = item.metrics[metricName].stats;
      // @ts-ignore
      const tooltipData = [
        { header: 'Per sec', value: Humanize.transform(stats.qps || stats.sum_per_sec, 'number') },
        { header: 'Sum', value: stats.sum && Humanize.transform(stats.sum, metric.pipeTypes.sumPipe) },
        { header: 'From total', value: ((stats.sum_per_sec / totalValues.metrics[metricName].stats.sum_per_sec) * 100).toFixed(2) + '%' },
      ];

      const { min = 0, max = 0, avg = 0, p99 = 0 } = stats;
      const minStr = `⌜ Min: ${Humanize.transform(min, this.measurement)}`;
      const maxStr = `⌟ Max: ${Humanize.transform(max, this.measurement)}`;
      const avgStr = `◦ Avg: ${Humanize.transform(avg, this.measurement)}`;
      const p99Str = `${p99 ? `• 99%: ${Humanize.transform(p99, this.measurement)}` : ''}`;

      const latencyTooltipData = [
        { header: '⌜ Min: ', value: minStr },
        { header: '⌟ Max: ', value: maxStr },
        { header: '◦ Avg: ', value: avgStr },
        { header: '• 99%: ', value: p99Str },
      ];

      // @ts-ignore
      const polygonChartProps = { width: 150, data: item.sparkline };
      return (
        <div className={'overview-content-column'}>
          {columnIndex === 0 && <PolygonChart {...polygonChartProps} />}
          <Tooltip
            getPopupContainer={() => document.querySelector('#antd') || document.body}
            placement="topLeft"
            title={
              <Card title={`${metric.humanizeName} details`}>
                <List size="small" dataSource={tooltipData} renderItem={item => <List.Item>{`${item.header} : ${item.value}`}</List.Item>} />
                {metricName === 'query_time' && <LatencyChart {...{ data: stats }} />}
                <List size="small" dataSource={latencyTooltipData} renderItem={item => <List.Item>{`${item.header} : ${item.value}`}</List.Item>} />
              </Card>
            }
            overlayStyle={{ backgroundColor: 'transparent' }}
          >
            <span className="summarize" style={{ marginLeft: 'auto' }}>
              {Humanize.transform(stats.qps || stats.sum_per_sec, 'number')}
            </span>
          </Tooltip>
        </div>
      );
    },
  };
};
