import { Collapse, Table, Tooltip } from 'antd';
import React from 'react';
import { Latency, Sparkline, TimeDistribution } from 'shared/components/Elements/Charts';
import { Humanize } from 'shared/components/helpers/Humanization';
import { Info } from 'shared/components/Elements/Icons/Info';
import { styles } from './Metrics.styles';
import { useMetricsDetails } from './Metrics.hooks';
import { DATABASE } from '../Details.constants';
import { MetricsTabs } from './Metrics.constants';

const { Panel } = Collapse;

const mainColumn = (text, item) => (
  <span className={styles.metricColumn}>
    <span>{item.name}</span>
    <Tooltip title={item.tooltip} placement="leftTop">
      <Info className={styles.metricTooltipIcon} />
    </Tooltip>
  </span>
);

const rateColumn = (totals) => (text, item) => {
  // @ts-ignore
  const polygonChartProps = {
    data: item.sparkline,
    ykey: 'metric',
    metricName: item.metricName,
    color: totals ? 'rgba(223, 159, 85, 0.8)' : undefined,
  };

  return (
    <div className={styles.metricColumn}>
      <span className={styles.metricData}>
        {`${item.isRate ? Humanize.transform(item.metric.rate, item.pipeTypes.ratePipe) : '0'} ${item.units}`}
      </span>
      <span className={styles.sparkline}>{item.sparkline && <Sparkline {...polygonChartProps} />}</span>
    </div>
  );
};

const sumColumn = (text, item) => (
  <>
    <div>
      {item.isSum && (
        <span className={styles.sum}>{Humanize.transform(item.metric.sum, item.pipeTypes.sumPipe) || 0}</span>
      )}
      {item.percentOfTotal ? (
        <span className={styles.percentOfTotal}>{`${item.percentOfTotal}% of total`}</span>
      ) : null}
    </div>
    {item.complexMetric ? (
      <div>
        <span className={styles.complexMetric}>{item.complexMetric}</span>
      </div>
    ) : null}
  </>
);

const perQueryStatsColumn = (text, item) => {
  const latencyChartProps = {
    data: item.metric,
  };

  return (
    <div className={styles.metricColumn}>
      <span className={styles.perQueryStats}>
        {item.metric.avg
          ? Humanize.transform(item.metric.avg, item.pipeTypes.perQueryStatsPipe)
          : (+item.metric.sum / +item.queryCount).toFixed(2) || '0'}
      </span>
      {item.isLatencyChart && <Latency {...latencyChartProps} />}
    </div>
  );
};

const Metrics = ({ databaseType, totals }) => {
  const [metrics, loading] = useMetricsDetails();

  const columns = [
    {
      title: 'Metric',
      width: '20%',
      render: mainColumn,
    },
    {
      title: 'Rate/Second',
      width: '35%',
      render: rateColumn(totals),
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

  return (
    <div className="metrics-wrapper">
      <Collapse
        bordered={false}
        defaultActiveKey={[MetricsTabs.distribution, MetricsTabs.metrics]}
        className={styles.collapse}
      >
        {databaseType === DATABASE.mysql ? (
          <Panel header={MetricsTabs.distribution} key={MetricsTabs.distribution} className={styles.panel}>
            <TimeDistribution data={metrics} />
          </Panel>
        ) : null}
        <Panel header={MetricsTabs.metrics} key={MetricsTabs.metrics} className={styles.panel}>
          <Table
            dataSource={metrics}
            columns={columns}
            pagination={false}
            size="small"
            bordered
            loading={loading}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Metrics;
