import React from 'react';
import PolygonChart from 'react-plugins-deps/components/PolygonChart/PolygonChart';
import LatencyChart from 'react-plugins-deps/components/LatencyChart/LatencyChart';
import { Humanize } from 'react-plugins-deps/components/helpers/Humanization';

import ManageColumns from '../ManageColumns/ManageColumns';
import './OverviewTable.scss';
import { METRIC_CATALOGUE } from '../../metric-catalogue';
import Tooltip from 'antd/es/tooltip';
import { Card, List } from 'antd';
import './Column.scss';

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
    title: () => <ManageColumns placeholder={metricName} currentMetric={metric} />,
    render: (text, item) => {
      const stats = item.metrics[metricName].stats;
      // @ts-ignore
      const tooltipData = [
        { header: 'Per sec', value: Humanize.transform(stats.qps || stats.sum_per_sec, 'number') },
        { header: 'Sum', value: stats.sum && Humanize.transform(stats.sum, metric.pipeTypes.sumPipe) },
        { header: 'From total', value: ((stats.sum_per_sec / totalValues.metrics[metricName].stats.sum_per_sec) * 100).toFixed(2) + '%' },
      ];

      // const { min = 0, max = 0, avg = 0, p99 = 0 } = stats;
      const minStr = `${Humanize.transform(stats.min)}`;
      const maxStr = `${Humanize.transform(stats.max)}`;
      const avgStr = `${Humanize.transform(stats.avg)}`;
      const p99Str = `${stats.p99 ? `${Humanize.transform(stats.p99)}` : ''}`;

      const latencyTooltipData = [
        { header: '⌜ Min', value: minStr },
        { header: '⌟ Max', value: maxStr },
        { header: '◦ Avg', value: avgStr },
        { header: '• 99%', value: p99Str },
      ].filter(element => element.value);

      // @ts-ignore
      const polygonChartProps = { width: 150, data: item.sparkline };
      return (
        <div className={'overview-content-column'}>
          {columnIndex === 0 && <PolygonChart {...polygonChartProps} />}
          <Tooltip
            getPopupContainer={() => document.querySelector('#antd') || document.body}
            placement="topLeft"
            overlayClassName={'overview-column-toolkit'}
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
