import { Divider } from 'antd';
import Tooltip from 'antd/es/tooltip';
import React from 'react';
import { cx } from 'emotion';
import { METRIC_CATALOGUE } from 'pmm-qan-app-panel/panel/panel.constants';
import { Humanize } from 'react-plugins-deps/components/helpers/Humanization';
import { Latency, Sparkline, TotalPercentage } from 'react-plugins-deps/components/Elements/Charts';
import { COLUMN_WIDTH, FIXED_COLUMN_WIDTH } from '../../Overview.constants';
import ManageColumns from '../ManageColumns/ManageColumns';
import { styles } from './MetricColumn.styles';
import './MetricColumns.scss';

const TimeMetric = ({ value, percentage, cnt }) => (
  <div className={styles.metricStyle}>
    <span className={cx('summarize', styles.summarize(value))}>
      {value === undefined && cnt > 0 ? `${Humanize.transform(0, 'time')}` : null}
      {(value === undefined && cnt === undefined) || value === null || value === 'NaN' ? 'N/A' : null}
      {value && value !== 'NaN' ? `${Humanize.transform(value, 'time')}` : null}
    </span>
    {value === undefined || value === null || value === 'NaN' ? null : <TotalPercentage width={percentage} />}
  </div>
);
const NonTimeMetric = ({
  value, units, percentage, cnt
}) => (
  <div className={styles.metricStyle}>
    <span className={cx('summarize', styles.summarize(value))}>
      {value === undefined && cnt > 0 ? `0 ${units}` : null}
      {(value === undefined && cnt === undefined) || value === null || value === 'NaN' ? 'N/A' : null}
      {value && value !== 'NaN' ? `${Humanize.transform(value, 'number')} ${units}` : null}
    </span>
    {value === undefined || value === null || value === 'NaN' ? null : <TotalPercentage width={percentage} />}
  </div>
);

const getSorting = (orderBy, metricName) => {
  if (orderBy === metricName) {
    return 'ascend';
  }
  if (orderBy === `-${metricName}`) {
    return 'descend';
  }

  return false;
};

export const getOverviewColumn = (metricName, columnIndex, totalValues, orderBy, mainMetric) => {
  const metric = METRIC_CATALOGUE[metricName];
  const isTimeMetric = metricName.endsWith('_time');

  return {
    sorter: true,
    key: metricName,
    sortOrder: getSorting(orderBy, metricName),
    sortDirections: ['descend', 'ascend'],
    width: columnIndex === 0 ? COLUMN_WIDTH * 1.8 : FIXED_COLUMN_WIDTH,
    // eslint-disable-next-line max-len
    title: () => (
      <ManageColumns placeholder={metricName} currentMetric={metric} mainMetric={mainMetric} width="100%" />
    ),
    render: (text, item, index) => {
      const { stats } = item.metrics[metricName];
      const statPerSec = stats.qps || stats.sum_per_sec;
      const percentFromTotal = (
        (stats.sum_per_sec / totalValues.metrics[metricName].stats.sum_per_sec)
        * 100
      ).toFixed(2);
      const tooltipData = [
        {
          header: isTimeMetric ? 'Per query' : 'Per sec',
          value: isTimeMetric
            ? Humanize.transform(stats.avg, 'time')
            : Humanize.transform(statPerSec, 'number'),
          key: 'qps',
        },
        {
          header: 'Sum',
          value: stats.sum && Humanize.transform(stats.sum, metric.pipeTypes.sumPipe),
          key: 'sum',
        },
        {
          header: 'From total',
          value: `${percentFromTotal} %`,
          key: 'from-total',
        },
      ].filter((tooltip) => tooltip.value);

      const latencyTooltipData = [
        { header: '⌜ Min', value: stats.min },
        { header: '⌟ Max', value: stats.max },
        { header: '◦ Avg', value: stats.avg },
        { header: '• 99%', value: stats.p99 },
      ]
        .filter((element) => element.value)
        .map(({ header, value }) => ({ header, value: Humanize.transform(value) }));

      const polygonChartProps = {
        data: item.sparkline,
        metricName,
        color: index === 0 ? 'rgba(223, 159, 85, 0.8)' : undefined,
      };
      const MetricsList = ({ data }) => (
        <div className={styles.metricsWrapper} data-qa="metrics-list">
          {data.map((metricItem, metricIndex, list) => (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.singleMetricWrapper} data-qa={metricItem.key || ''}>
              <span className={styles.metricName}>{`${metricItem.header} : ${metricItem.value}`}</span>
              {list.length === metricIndex + 1 ? null : <Divider className={styles.metricsListDivider} />}
            </div>
          ))}
        </div>
      );

      const MetricTooltip = () => (
        <div>
          <div className={styles.tooltipHeader}>{metric.humanizeName}</div>
          <Divider className={styles.tooltipDivider}/>
          <MetricsList data={tooltipData} />
          {latencyTooltipData.length ? (
            <>
              <Divider className={styles.tooltipLatencyDivider}/>
              {metricName === 'query_time' && (
                <Latency {...{ data: stats }} className="latency-chart-container" />
              )}
              <MetricsList data={latencyTooltipData} />
            </>
          ) : null}
        </div>
      );
      return (
        <div className="overview-content-column">
          <div className="overview-column-sparkline">
            {columnIndex === 0 && <Sparkline {...polygonChartProps} />}
          </div>
          <Tooltip
            getPopupContainer={() => document.querySelector('#antd') || document.body}
            placement="left"
            overlayClassName="overview-column-tooltip"
            title={
              (stats.avg && stats.avg !== 'NaN') || (statPerSec && statPerSec !== 'NaN') ? (
                <MetricTooltip />
              ) : null
            }
          >
            {isTimeMetric ? (
              <TimeMetric value={stats.avg} cnt={stats.cnt} percentage={percentFromTotal} />
            ) : null}
            {!isTimeMetric ? (
              <NonTimeMetric
                value={statPerSec}
                cnt={stats.cnt}
                units={metric.units}
                percentage={percentFromTotal}
              />
            ) : null}
          </Tooltip>
        </div>
      );
    },
  };
};
