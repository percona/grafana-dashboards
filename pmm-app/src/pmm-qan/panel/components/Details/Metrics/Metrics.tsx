import React, { FC, useState } from 'react';
import { Latency, Sparkline, TimeDistribution } from 'shared/components/Elements/Charts';
import { humanize } from 'shared/components/helpers/Humanization';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Collapse, useTheme } from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table';
import { Databases } from 'shared/core';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { MetricsTabs } from './Metrics.constants';
import { MetricsProps } from './Metrics.types';
import { getStyles } from './Metrics.styles';

const Metrics: FC<MetricsProps> = ({
  databaseType, totals, metrics, loading,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [isDistributionPanelOpen, setDistributionPanelVisibility] = useState(true);
  const [isMetricsPanelOpen, setMetricsPanelVisibility] = useState(true);

  const mainColumn = (item) => (
    <span className={styles.metricColumn}>
      <span>{item.name}</span>
      <LinkTooltip className={styles.metricTooltipIcon} tooltipText={item.tooltip} icon="info-circle" />
    </span>
  );

  const rateColumn = (totals) => (item) => {
    const {
      sparkline, metricName, isRate, units, metric, pipeTypes,
    } = item;
    const polygonChartProps = {
      data: sparkline,
      ykey: 'metric',
      metricName,
      color: totals ? 'rgba(223, 159, 85, 0.8)' : undefined,
    };

    return (
      <div className={styles.metricColumn}>
        <span className={styles.metricData}>
          {`${isRate ? humanize.transform(metric.rate, pipeTypes.ratePipe) : '0'} ${
            units
          }`}
        </span>
        <span className={styles.sparkline}>{sparkline && <Sparkline {...polygonChartProps} />}</span>
      </div>
    );
  };

  const sumColumn = (item) => (
    <>
      <div>
        {item.isSum && (
          <span className={styles.sum}>
            {humanize.transform(item.metric.sum, item.pipeTypes.sumPipe) || 0}
          </span>
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

  const perQueryStatsColumn = (item) => {
    const latencyChartProps = {
      data: item.metric,
    };

    return (
      <div className={styles.metricColumn}>
        <span className={styles.perQueryStats}>
          {item.metric.avg
            ? humanize.transform(item.metric.avg, item.pipeTypes.perQueryStatsPipe)
            : (+item.metric.sum / +item.queryCount).toFixed(2) || '0'}
        </span>
        {item.isLatencyChart && <Latency {...latencyChartProps} />}
      </div>
    );
  };

  const columns = [
    {
      Header: 'Metric',
      accessor: mainColumn,
    },
    {
      Header: 'Rate/Second',
      accessor: rateColumn(totals),
    },
    {
      Header: 'Sum',
      accessor: sumColumn,
    },
    {
      Header: 'Per Query Stats',
      accessor: perQueryStatsColumn,
    },
  ];

  return (
    <Overlay isPending={loading} className="metrics-wrapper" size={35}>
      {databaseType !== Databases.mongodb ? (
        <Collapse
          collapsible
          label={MetricsTabs.distribution}
          isOpen={isDistributionPanelOpen}
          onToggle={() => setDistributionPanelVisibility(!isDistributionPanelOpen)}
        >
          <TimeDistribution data={metrics} />
        </Collapse>
      ) : null}
      <Collapse
        collapsible
        label={MetricsTabs.metrics}
        isOpen={isMetricsPanelOpen}
        onToggle={() => setMetricsPanelVisibility(!isMetricsPanelOpen)}
      >
        <Table columns={columns} data={metrics} loading={loading} noData={null} />
      </Collapse>
    </Overlay>
  );
};

export default Metrics;
