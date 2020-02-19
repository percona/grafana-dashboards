import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { METRIC_CATALOGUE } from '../../MetricCatalogue';
import Icon from 'antd/es/icon';
import Tooltip from 'antd/es/tooltip';
import MetricsService from './Metrics.service';
import PolygonChart from '../../../../../react-plugins-deps/components/PolygonChart/PolygonChart';
import { Humanize } from '../../../../../react-plugins-deps/components/helpers/Humanization';
import LatencyChart from '../../../../../react-plugins-deps/components/LatencyChart/LatencyChart';
import { processMetrics } from '../../../../../react-plugins-deps/components/helpers/processMetrics';

const metricColumnsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
};

const columns = [
  {
    title: 'Metric',
    width: '20%',
    render: (text, item) => {
      return (
        <span style={{ textAlign: 'center' }}>
          {item.name}
          <Tooltip title={item.tooltip} placement={'leftTop'}>
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
          {<span>{(item.isRate ? Humanize.transform(item.metric.rate, item.pipeTypes['ratePipe']) : '0') + ` ${item.units}`}</span>}
          {item.sparkline && <PolygonChart {...polygonChartProps} />}
        </div>
      );
    },
  },
  {
    title: 'Sum',
    width: '30%',
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
          {<span style={{ marginLeft: '5px', color: '#268b40', minWidth: '90px', display: 'inline-block' }}>{item.complexMetric}</span>}
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
  const { queryId, groupBy, from, to, labels, tables } = props;

  const [metrics, setMetrics] = useState<any[]>([]);
  useEffect(() => {
    const getMetrics = async () => {
      try {
        const result = await MetricsService.getMetrics({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          tables,
        });
        setMetrics(processMetrics(METRIC_CATALOGUE, result));
      } catch (e) {
        //TODO: add error handling
      }
    };
    getMetrics();
  }, [queryId]);

  return <Table dataSource={metrics} columns={columns} pagination={false} size={'small'} bordered={true} />;
};

export default Metrics;
