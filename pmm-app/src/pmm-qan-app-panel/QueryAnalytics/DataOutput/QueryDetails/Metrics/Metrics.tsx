import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
// import PolygonChart from '../../../../react-plugins-deps/components/PolygonChart/PolygonChart';
// import LatencyChart from '../../../../react-plugins-deps/components/LatencyChart/LatencyChart';
import { METRIC_CATALOGUE } from '../../metric-catalogue';
import Icon from 'antd/es/icon';
import Tooltip from 'antd/es/tooltip';
import MetricsService from './Metrics.service';
import PolygonChart from '../../../../../react-plugins-deps/components/PolygonChart/PolygonChart';
import { Humanize } from '../../../../../react-plugins-deps/components/helpers/Humanization';
import LatencyChart from '../../../../../react-plugins-deps/components/LatencyChart/LatencyChart';

const getPercentOfTotal = (current, total) => {
  const key = current.sum ? 'sum' : 'sum_per_sec';
  return +((+current[key] / +total[key]) * 100).toFixed(2);
};

const getSparkline = (sparklines, metricName) => {
  return sparklines.map(sparkline => {
    const key = Object.keys(sparkline).find(sparklineKey => sparklineKey.includes(metricName));
    return {
      point: sparkline.point,
      time_frame: sparkline.time_frame,
      timestamp: sparkline.timestamp,
      metric: key ? sparkline[key] : '',
    };
  });
};

const metricColumnsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
};
const processMetrics = metrics => {
  if (!metrics.metrics) {
    return [];
  }
  const metricsList = Object.keys(metrics.metrics);
  return metricsList
    .filter(metric => Object.keys(metrics.metrics[metric]).length !== 0 && metrics.totals[metric])
    .map(metricName => {
      const metric = metrics.metrics[metricName];
      const sparkline = getSparkline(metrics.sparkline, metricName);
      const total = metrics.totals[metricName];

      return {
        name: METRIC_CATALOGUE[metricName].humanizeName,
        tooltip: METRIC_CATALOGUE[metricName].tooltipText,
        pipeTypes: METRIC_CATALOGUE[metricName].pipeTypes,
        units: METRIC_CATALOGUE[metricName].units,
        sparkline: sparkline,
        metric: metric,
        total: total,
        queryCount: metrics.metrics['num_queries'].sum,
        percentOfTotal: getPercentOfTotal(metric, total),
        isRate: metric.rate >= 0,
        isSum: metric.sum >= 0,
        isStats: metric.avg >= 0,
        isLatencyChart: metric.min && metric.max,
      };
    })
    .filter(item => item.percentOfTotal);
};

const columns = [
  {
    title: 'Metric',
    width: '25%',
    render: (text, item) => {
      return (
        <span style={{ textAlign: 'center' }}>
          {item.name}
          <Tooltip title={item.tooltipText}>
            <Icon type="question-circle" style={{ marginLeft: '5px' }} />
          </Tooltip>
        </span>
      );
    },
  },
  {
    title: 'Rate/Second',
    width: '25%',
    render: (text, item) => {
      // {{ isRate ? (currentMetric?.stats?.rate | humanize: pipeInfo?.ratePipe) : '0' }}
      // @ts-ignore
      const polygonChartProps = {
        data: item.sparkline,
        width: 150,
        ykey: 'metric',
      };
      return (
        <div style={metricColumnsStyle}>
          {<span>{item.isRate ? Humanize.transform(item.metric.rate, item.pipeTypes['ratePipe']) : '0' + ` ${item.units}`}</span>}
          {item.sparkline && <PolygonChart {...polygonChartProps} />}
        </div>
      );
    },
  },
  {
    title: 'Sum',
    width: '25%',
    render: (text, item) => {
      return (
        <>
          {item.isSum && (
            <span style={{ marginRight: '10px', minWidth: '65px', display: 'inline-block' }}>
              {Humanize.transform(item.metric.sum, item.pipeTypes['sumPipe']) || 0}
            </span>
          )}
          {
            <span
              style={{ marginLeft: '5px', color: '#26afe1', minWidth: '90px', display: 'inline-block' }}
            >{`${item.percentOfTotal}% of total`}</span>
          }
          {<span style={{ marginLeft: '5px', color: '#268b40', minWidth: '90px', display: 'inline-block' }}>{`complex`}</span>}
        </>
      );
    },
  },
  {
    title: 'Per Query Stats',
    width: '25%',
    render: (text, item) => {
      const latencyChartProps = {
        data: item.metric,
      };
      return (
        <div style={metricColumnsStyle}>
          <span style={{ marginRight: '10px' }}>
            {Humanize.transform(item.metric.avg, item.pipeTypes['perQueryStatsPipe']) || (+item.metric.sum / +item.queryCount).toFixed(2) || '0'}
          </span>
          {item.isLatencyChart && <LatencyChart {...latencyChartProps} />}
        </div>
      );
    },
  },
];

const Metrics = props => {
  const { queryId, groupBy, periodStartFrom, periodStartTo, labels, tables } = props;

  const [metrics, setMetrics] = useState({});
  useEffect(() => {
    const getMetrics = async () => {
      try {
        const result = await MetricsService.getMetrics({
          filterBy: queryId,
          groupBy: groupBy,
          from: periodStartFrom,
          to: periodStartTo,
          labels: labels,
          tables: tables,
        });
        setMetrics(result);
      } catch (e) {
        //TODO: add error handling
      }
    };
    getMetrics();
  }, [queryId]);

  return <Table dataSource={processMetrics(metrics)} columns={columns} pagination={false} size={'small'} bordered={true} />;
};

export default Metrics;
