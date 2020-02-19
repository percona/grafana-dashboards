import React from 'react';
import PolygonChart from 'react-plugins-deps/components/PolygonChart/PolygonChart';
import LatencyChart from 'react-plugins-deps/components/LatencyChart/LatencyChart';
import { Humanize } from 'react-plugins-deps/components/helpers/Humanization';
import ManageColumns from '../ManageColumns/ManageColumns';
import './OverviewTable.scss';
import { METRIC_CATALOGUE } from '../MetricCatalogue';
import Tooltip from 'antd/es/tooltip';
import { List, Select } from 'antd';

const { Option } = Select;

const GROUP_BY_OPTIONS = [
  { value: 'queryid', label: 'Query' },
  { value: 'service_name', label: 'Service Name' },
  { value: 'database', label: 'Database' },
  { value: 'schema', label: 'Schema' },
  { value: 'username', label: 'User Name' },
  { value: 'client_host', label: 'Client Host' },
];

const MAIN_METRIC_MIN_WIDTH = 470;
const MAIN_METRIC_VALUE_WIDTH = 90;
export const TABLE_X_SCROLL = 1250;
export const TABLE_Y_SCROLL = 450;
const COLUMN_WIDTH = 250;
const ROW_NUMBER_COLUMN_WIDTH = 30;

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
    width: columnIndex === 0 ? COLUMN_WIDTH * 1.5 : COLUMN_WIDTH,
    title: () => <ManageColumns placeholder={metricName} currentMetric={metric} width={'100%'} />,
    render: (text, item) => {
      const stats = item.metrics[metricName].stats;
      // @ts-ignore
      const tooltipData = [
        { header: 'Per sec', value: Humanize.transform(stats.qps || stats.sum_per_sec, 'number') },
        { header: 'Sum', value: stats.sum && Humanize.transform(stats.sum, metric.pipeTypes.sumPipe) },
        { header: 'From total', value: ((stats.sum_per_sec / totalValues.metrics[metricName].stats.sum_per_sec) * 100).toFixed(2) + '%' },
      ].filter(tooltip => tooltip.value);

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
      const polygonChartProps = { width: COLUMN_WIDTH * 1.5 - MAIN_METRIC_VALUE_WIDTH, data: item.sparkline };
      return (
        <div className={'overview-content-column'}>
          {columnIndex === 0 && <PolygonChart {...polygonChartProps} />}
          <Tooltip
            getPopupContainer={() => document.querySelector('#antd') || document.body}
            placement="left"
            overlayClassName={'overview-column-toolkit'}
            title={
              <>
                <List size="small" dataSource={tooltipData} renderItem={item => <List.Item>{`${item.header} : ${item.value}`}</List.Item>} />
                {metricName === 'query_time' && <LatencyChart {...{ data: stats }} />}
                <List size="small" dataSource={latencyTooltipData} renderItem={item => <List.Item>{`${item.header} : ${item.value}`}</List.Item>} />
              </>
            }
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

export const getDefaultColumns = (groupBy, setGroupBy, pageNumber, pageSize, columns) => {
  const mainMetricColumnWidth = Math.max(TABLE_X_SCROLL - columns * COLUMN_WIDTH - ROW_NUMBER_COLUMN_WIDTH, MAIN_METRIC_MIN_WIDTH);
  return [
    {
      title: '#',
      dataIndex: 'rowNumber',
      key: 'rowNumber',
      fixed: 'left',
      width: ROW_NUMBER_COLUMN_WIDTH,
      render: (text, record, index) => (
        <div style={{ wordWrap: 'normal', wordBreak: 'normal' }}>{index === 0 ? '' : (pageNumber - 1) * pageSize + index}</div>
      ),
    },
    {
      dataIndex: 'mainMetric',
      fixed: 'left',
      width: mainMetricColumnWidth,
      title: () => {
        return (
          <Select optionLabelProp="label" defaultValue={groupBy} style={{ width: '120px' }} onChange={setGroupBy}>
            {GROUP_BY_OPTIONS.map(option => (
              <Option value={option.value} label={option.label}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      },
      ellipsis: true,
      className: 'overview-main-column',
      render: (text, record) => {
        return (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: mainMetricColumnWidth,
            }}
          >
            {record.fingerprint || record.dimension || 'TOTAL'}
          </div>
        );
      },
    },
  ];
};
