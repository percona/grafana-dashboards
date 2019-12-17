import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
// import PolygonChart from '../../../../react-plugins-deps/components/PolygonChart/PolygonChart';
// import LatencyChart from '../../../../react-plugins-deps/components/LatencyChart/LatencyChart';
import { METRIC_CATALOGUE } from './metric-catalogue';
import Icon from 'antd/es/icon';
import Tooltip from 'antd/es/tooltip';
import MetricsService from './Metrics.service';
import LatencyChart from '../../../../../react-plugins-deps/components/LatencyChart/LatencyChart';
import PolygonChart from '../../../../../react-plugins-deps/components/PolygonChart/PolygonChart';

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

      // this.pipeInfo = this.currentMetricInfo.pipeTypes || this.defaultPipeInfo;

      return {
        name: METRIC_CATALOGUE[metricName].humanizeName,
        tooltip: METRIC_CATALOGUE[metricName].tooltipText,
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
    render: (text, item, index) => {
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
    render: (text, item, index) => {
      // {{ isRate ? (currentMetric?.stats?.rate | humanize: pipeInfo?.ratePipe) : '0' }}
      console.log(item.sparkline);

      // @ts-ignore
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {<span>{item.isRate ? item.metric.rate : '0'}</span>}
          {item.sparkline && <PolygonChart data={item.sparkline as object[]} width={150} ykey={'metric'} />}
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
          {/*isSum, percentOfTotal*/}
          {/*{{isSum ? (currentMetric?.stats?.sum | humanize: pipeInfo?.sumPipe) : '0' }}*/}

          {item.isSum && <span style={{ marginRight: '10px' }}>{item.metric.sum || 0}</span>}
          {<span>{`${item.percentOfTotal}% of total`}</span>}
        </>
      );
    },
  },
  {
    title: 'Per Query Stats',
    width: '25%',
    render: (text, item) => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {/*{{ isStats ? (currentMetric?.stats?.avg | humanize: pipeInfo?.perQueryStatsPipe) : isSum ? perQueryStat() : '0' }}*/}
          <span style={{ marginRight: '10px' }}>{item.metric.avg || (+item.metric.sum / +item.queryCount).toFixed(2) || '0'}</span>
          {/*{item.isLatencyChart && <LatencyChart data={item.metric} />}*/}
        </div>
      );
    },
  },
];

const Metrics = props => {
  const { filterBy, groupBy, periodStartFrom, periodStartTo, labels, tables } = props;

  const [metrics, setMetrics] = useState({});
  useEffect(() => {
    const getMetrics = async () => {
      const result = await MetricsService.getMetrics({
        filterBy: filterBy,
        groupBy: groupBy,
        periodStartFrom: periodStartFrom,
        periodStartTo: periodStartTo,
        labels: labels,
        tables: tables,
      });
      console.log('----', result, processMetrics(metrics));
      setMetrics(result);
    };
    getMetrics();
  }, []);

  return <Table dataSource={processMetrics(metrics)} columns={columns} pagination={false} size={'small'} bordered={true} />;
};

export default Metrics;
