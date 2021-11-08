import React, {
  FC, useState, useRef, useEffect,
} from 'react';
import { Latency, Sparkline, TimeDistribution } from 'shared/components/Elements/Charts';
import { humanize } from 'shared/components/helpers/Humanization';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { BarChart, Collapse, useTheme } from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table';
import { Databases } from 'shared/core';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import {
  HISTOGRAM_HEIGHT, HISTOGRAM_MARGIN, HISTOGRAM_OPTIONS, MetricsTabs,
} from './Metrics.constants';
import { MetricsProps } from './Metrics.types';
import { getStyles } from './Metrics.styles';
import { useHistogram } from './hooks/useHistogram';
import { TopQuery } from '../TopQuery/TopQuery';

const Metrics: FC<MetricsProps> = ({
  databaseType, totals, metrics, textMetrics = {}, loading,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const isHistogramAvailable = databaseType === Databases.postgresql && !totals;
  const [histogramData, histogramLoading] = useHistogram(theme, isHistogramAvailable);
  const [isDistributionPanelOpen, setDistributionPanelVisibility] = useState(true);
  const [isMetricsPanelOpen, setMetricsPanelVisibility] = useState(true);
  const [isHistogramOpen, setHistogramOpen] = useState(true);
  const [histogramWidth, setHistogramWidth] = useState(0);
  const [isTopQueryOpen, setTopQueryVisibility] = useState(true);
  const histogramRef = useRef<HTMLDivElement>(null);
  const { top_query: topQuery, top_queryid: topQueryId } = textMetrics;
  const showHistogram = isHistogramAvailable && histogramData.length > 0;

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

  useEffect(() => {
    if (histogramRef.current) {
      setHistogramWidth(histogramRef.current.offsetWidth - HISTOGRAM_MARGIN);
    }
  }, [histogramRef.current]);

  return (
    <Overlay isPending={loading || histogramLoading} className="metrics-wrapper" size={35}>
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
      {databaseType === Databases.postgresql && topQuery && topQueryId ? (
        <Collapse
          collapsible
          label={MetricsTabs.topQuery}
          isOpen={isTopQueryOpen}
          onToggle={() => setTopQueryVisibility(!isTopQueryOpen)}
        >
          <TopQuery
            databaseType={databaseType}
            query={topQuery}
            queryId={topQueryId}
          />
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
      {showHistogram && (
        <div ref={histogramRef} className={styles.histogramWrapper}>
          <Collapse
            collapsible
            label={MetricsTabs.histogram}
            isOpen={isHistogramOpen}
            onToggle={() => setHistogramOpen(!isHistogramOpen)}
          >
            <BarChart
              data={histogramData}
              width={histogramWidth}
              height={HISTOGRAM_HEIGHT}
              {...HISTOGRAM_OPTIONS}
            />
          </Collapse>
        </div>
      )}
    </Overlay>
  );
};

export default Metrics;
