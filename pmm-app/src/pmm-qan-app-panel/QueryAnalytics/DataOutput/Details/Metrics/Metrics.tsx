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
import { css } from 'emotion';

const Styling = {
  metricColumn: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  metricTooltip: css`
    text-align: center;
  `,
  metricTooltipIcon: css`
    margin-left: 5px;
  `,
  sum: css`
    margin-right: 10px;
    min-width: 65px;
    display: inline-block;
  `,
  percentOfTotal: css`
    color: #26afe1;
    margin-left: 5px;
    min-width: 90px;
    display: inline-block;
  `,
  complexMetric: css`
    color: #268b40;
    min-width: 90px;
    display: inline-block;
  `,
  perQueryStats: css`
    margin-right: 10px;
  `,
};

const columns = [
  {
    title: 'Metric',
    width: '20%',
    render: (text, item) => {
      return (
        <span className={Styling.metricTooltip}>
          {item.name}
          <Tooltip title={item.tooltip} placement={'leftTop'}>
            <Icon type="question-circle" className={Styling.metricTooltipIcon} />
          </Tooltip>
        </span>
      );
    },
  },
  {
    title: 'Rate/Second',
    width: '35%',
    render: (text, item) => {
      // @ts-ignore
      const polygonChartProps = {
        data: item.sparkline,
        width: 285,
        ykey: 'metric',
      };
      return (
        <div className={Styling.metricColumn}>
          {<span>{(item.isRate ? Humanize.transform(item.metric.rate, item.pipeTypes['ratePipe']) : '0') + ` ${item.units}`}</span>}
          {item.sparkline && <PolygonChart {...polygonChartProps} />}
        </div>
      );
    },
  },
  {
    title: 'Sum',
    width: '20%',
    render: (text, item) => {
      return (
        <>
          <div>
            {item.isSum && <span className={Styling.sum}>{Humanize.transform(item.metric.sum, item.pipeTypes['sumPipe']) || 0}</span>}
            {<span className={Styling.percentOfTotal}>{`${item.percentOfTotal}% of total`}</span>}
          </div>
          {item.complexMetric ? <div>{<span className={Styling.complexMetric}>{item.complexMetric}</span>}</div> : null}
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
        <div className={Styling.metricColumn}>
          <span className={Styling.perQueryStats}>
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
