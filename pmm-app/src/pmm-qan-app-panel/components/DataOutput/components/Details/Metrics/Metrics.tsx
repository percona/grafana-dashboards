import { Table } from 'antd';
import React from 'react';
import { Icon, Tooltip } from 'antd';
import {
  Latency,
  Sparkline,
  TimeDistribution,
} from '../../../../../../react-plugins-deps/components/Elements/Charts';
import { Humanize } from '../../../../../../react-plugins-deps/helpers/Humanization';
import { Styling } from './Metrics.styles';
import { useMetricsDetails } from './Metrics.hooks';

const mainColumn = (text, item) => {
  return (
    <span className={Styling.metricTooltip}>
      {item.name}
      <Tooltip title={item.tooltip} placement="leftTop">
        <Icon type="question-circle" className={Styling.metricTooltipIcon} />
      </Tooltip>
    </span>
  );
};

const rateColumn = (text, item) => {
  // @ts-ignore
  const polygonChartProps = {
    data: item.sparkline,
    ykey: 'metric',
    metricName: item.metricName,
  };
  return (
    <div className={Styling.metricColumn}>
      <span>
        {(item.isRate ? Humanize.transform(item.metric.rate, item.pipeTypes['ratePipe']) : '0') +
          ` ${item.units}`}
      </span>
      {item.sparkline && <Sparkline {...polygonChartProps} />}
    </div>
  );
};

const sumColumn = (text, item) => {
  return (
    <>
      <div>
        {item.isSum && (
          <span className={Styling.sum}>
            {Humanize.transform(item.metric.sum, item.pipeTypes['sumPipe']) || 0}
          </span>
        )}
        {item.percentOfTotal ? (
          <span className={Styling.percentOfTotal}>{`${item.percentOfTotal}% of total`}</span>
        ) : null}
      </div>
      {item.complexMetric ? (
        <div>
          <span className={Styling.complexMetric}>{item.complexMetric}</span>
        </div>
      ) : null}
    </>
  );
};

const perQueryStatsColumn = (text, item) => {
  const latencyChartProps = {
    data: item.metric,
  };

  return (
    <div className={Styling.metricColumn}>
      <span className={Styling.perQueryStats}>
        {item.metric.avg
          ? Humanize.transform(item.metric.avg, item.pipeTypes['perQueryStatsPipe'])
          : (+item.metric.sum / +item.queryCount).toFixed(2) || '0'}
      </span>
      {item.isLatencyChart && <Latency {...latencyChartProps} />}
    </div>
  );
};
const columns = [
  {
    title: 'Metric',
    width: '20%',
    render: mainColumn,
  },
  {
    title: 'Rate/Second',
    width: '35%',
    render: rateColumn,
  },
  {
    title: 'Sum',
    width: '20%',
    render: sumColumn,
  },
  {
    title: 'Per Query Stats',
    width: '25%',
    render: perQueryStatsColumn,
  },
];

const Metrics = ({ databaseType }) => {
  const [metrics, loading] = useMetricsDetails();

  return (
    <div className="metrics-wrapper">
      <TimeDistribution data={metrics} databaseType={databaseType} />
      <h4>Metrics</h4>
      <Table
        dataSource={metrics}
        columns={columns}
        pagination={false}
        size="small"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default Metrics;
