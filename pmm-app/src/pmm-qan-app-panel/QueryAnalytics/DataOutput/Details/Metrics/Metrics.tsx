import { Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { METRIC_CATALOGUE } from '../../MetricCatalogue';
import Icon from 'antd/es/icon';
import Tooltip from 'antd/es/tooltip';
import MetricsService from './Metrics.service';
import PolygonChart from '../../../../../react-plugins-deps/components/PolygonChart/PolygonChart';
// eslint-disable-next-line max-len
import TimeDistributionChart from '../../../../../react-plugins-deps/components/TimeDistributionChart/TimeDistributionChart';
import { Humanize } from '../../../../../react-plugins-deps/components/helpers/Humanization';
import LatencyChart from '../../../../../react-plugins-deps/components/LatencyChart/LatencyChart';
import { processMetrics } from '../../../../../react-plugins-deps/components/helpers/processMetrics';
import { css } from 'emotion';
import { StateContext } from '../../../StateContext';

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
          <Tooltip title={item.tooltip} placement="leftTop">
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
        width: 210,
        ykey: 'metric',
        metricName: item.metricName,
      };
      return (
        <div className={Styling.metricColumn}>
          <span>
            {(item.isRate ? Humanize.transform(item.metric.rate, item.pipeTypes['ratePipe']) : '0') +
              ` ${item.units}`}
          </span>
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
            {Humanize.transform(item.metric.avg, item.pipeTypes['perQueryStatsPipe']) ||
              (+item.metric.sum / +item.queryCount).toFixed(2) ||
              '0'}
          </span>
          {item.isLatencyChart && <LatencyChart {...latencyChartProps} />}
        </div>
      );
    },
  },
];

const Metrics = props => {
  const { contextActions } = useContext(StateContext);
  const { queryId, groupBy, from, to, labels, tables } = props;
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        setLoading(true);
        // const result = await MetricsService.getMetrics({
        //   filterBy: queryId,
        //   groupBy,
        //   from,
        //   to,
        //   labels,
        //   tables,
        // });
        const result = {
          metrics: {
            blk_read_time: {},
            blk_write_time: {},
            bytes_sent: {
              rate: 704.1698,
              cnt: 152865,
              sum: 30420136,
              min: 199,
              max: 199,
              avg: 199,
              p99: 199,
            },
            docs_returned: {},
            docs_scanned: {},
            filesort: {},
            filesort_on_disk: {},
            full_join: {},
            full_scan: {},
            innodb_io_r_bytes: { cnt: 31969 },
            innodb_io_r_ops: { cnt: 31969 },
            innodb_io_r_wait: { cnt: 31969 },
            innodb_pages_distinct: {
              rate: 0.47372684,
              cnt: 31969,
              sum: 20465,
              max: 4,
              avg: 0.6401514,
              p99: 2,
            },
            innodb_queue_wait: {
              rate: 0.00006786361,
              cnt: 31969,
              sum: 2.931708,
              max: 0.020559,
              avg: 0.000091704715,
              p99: 0.0018231875,
            },
            innodb_rec_lock_wait: { cnt: 31969 },
            local_blks_dirtied: {},
            local_blks_hit: {},
            local_blks_read: {},
            local_blks_written: {},
            lock_time: {
              rate: 0.0003304839,
              cnt: 152865,
              sum: 14.276904,
              min: 0.000005,
              max: 0.052759,
              avg: 0.00009339551,
              p99: 0.0014761875,
            },
            merge_passes: { cnt: 152865 },
            no_good_index_used: {},
            no_index_used: {},
            num_queries: { rate: 3.5385416, sum: 152865 },
            num_queries_with_errors: {},
            num_queries_with_warnings: {},
            qc_hit: {},
            query_length: {},
            query_time: {
              rate: 0.0024780908,
              cnt: 152865,
              sum: 107.05352,
              min: 0.000031,
              max: 0.063321,
              avg: 0.0007003141,
              p99: 0.008527813,
            },
            response_length: {},
            rows_affected: { cnt: 152865 },
            rows_examined: { rate: 3.5385416, cnt: 152865, sum: 152865, min: 1, max: 1, avg: 1, p99: 1 },
            rows_read: {},
            rows_sent: { rate: 3.5385416, cnt: 152865, sum: 152865, min: 1, max: 1, avg: 1, p99: 1 },
            select_full_range_join: {},
            select_range: {},
            select_range_check: {},
            shared_blks_dirtied: {},
            shared_blks_hit: {},
            shared_blks_read: {},
            shared_blks_written: {},
            sort_range: {},
            sort_rows: {},
            sort_scan: {},
            temp_blks_read: {},
            temp_blks_written: {},
            tmp_disk_tables: { cnt: 152865 },
            tmp_table: {},
            tmp_table_on_disk: {},
            tmp_table_sizes: { cnt: 152865 },
            tmp_tables: { cnt: 152865 },
          },
          sparkline: [
            { time_frame: 360, timestamp: '2020-04-20T14:28:00Z' },
            { point: 1, time_frame: 360, timestamp: '2020-04-20T14:22:00Z' },
            { point: 2, time_frame: 360, timestamp: '2020-04-20T14:16:00Z' },
            { point: 3, time_frame: 360, timestamp: '2020-04-20T14:10:00Z' },
            { point: 4, time_frame: 360, timestamp: '2020-04-20T14:04:00Z' },
            { point: 5, time_frame: 360, timestamp: '2020-04-20T13:58:00Z' },
            { point: 6, time_frame: 360, timestamp: '2020-04-20T13:52:00Z' },
            { point: 7, time_frame: 360, timestamp: '2020-04-20T13:46:00Z' },
            { point: 8, time_frame: 360, timestamp: '2020-04-20T13:40:00Z' },
            { point: 9, time_frame: 360, timestamp: '2020-04-20T13:34:00Z' },
            { point: 10, time_frame: 360, timestamp: '2020-04-20T13:28:00Z' },
            {
              point: 11,
              time_frame: 360,
              timestamp: '2020-04-20T13:22:00Z',
              load: 0.019314008,
              num_queries_per_sec: 27.333334,
              m_query_time_sum_per_sec: 0.019314008,
              m_lock_time_sum_per_sec: 0.0027264527,
              m_rows_sent_sum_per_sec: 27.333334,
              m_rows_examined_sum_per_sec: 27.333334,
              m_rows_read_sum_per_sec: 'NaN',
              m_innodb_queue_wait_sum_per_sec: 0.0005654111,
              m_innodb_pages_distinct_sum_per_sec: 3.586111,
              m_query_length_sum_per_sec: 'NaN',
              m_bytes_sent_sum_per_sec: 5439.3335,
              m_select_full_range_join_sum_per_sec: 'NaN',
              m_select_range_sum_per_sec: 'NaN',
              m_select_range_check_sum_per_sec: 'NaN',
              m_sort_range_sum_per_sec: 'NaN',
              m_sort_rows_sum_per_sec: 'NaN',
              m_sort_scan_sum_per_sec: 'NaN',
              m_no_index_used_sum_per_sec: 'NaN',
              m_no_good_index_used_sum_per_sec: 'NaN',
              m_docs_returned_sum_per_sec: 'NaN',
              m_response_length_sum_per_sec: 'NaN',
              m_docs_scanned_sum_per_sec: 'NaN',
              m_shared_blks_hit_sum_per_sec: 'NaN',
              m_shared_blks_read_sum_per_sec: 'NaN',
              m_shared_blks_dirtied_sum_per_sec: 'NaN',
              m_shared_blks_written_sum_per_sec: 'NaN',
              m_local_blks_hit_sum_per_sec: 'NaN',
              m_local_blks_read_sum_per_sec: 'NaN',
              m_local_blks_dirtied_sum_per_sec: 'NaN',
              m_local_blks_written_sum_per_sec: 'NaN',
              m_temp_blks_read_sum_per_sec: 'NaN',
              m_temp_blks_written_sum_per_sec: 'NaN',
              m_blk_read_time_sum_per_sec: 'NaN',
              m_blk_write_time_sum_per_sec: 'NaN',
            },
            {
              point: 12,
              time_frame: 360,
              timestamp: '2020-04-20T13:16:00Z',
              load: 0.09009899,
              num_queries_per_sec: 131.86111,
              m_query_time_sum_per_sec: 0.09009899,
              m_lock_time_sum_per_sec: 0.011977181,
              m_rows_sent_sum_per_sec: 131.86111,
              m_rows_examined_sum_per_sec: 131.86111,
              m_rows_read_sum_per_sec: 'NaN',
              m_innodb_queue_wait_sum_per_sec: 0.0025270667,
              m_innodb_pages_distinct_sum_per_sec: 17.375,
              m_query_length_sum_per_sec: 'NaN',
              m_bytes_sent_sum_per_sec: 26240.361,
              m_select_full_range_join_sum_per_sec: 'NaN',
              m_select_range_sum_per_sec: 'NaN',
              m_select_range_check_sum_per_sec: 'NaN',
              m_sort_range_sum_per_sec: 'NaN',
              m_sort_rows_sum_per_sec: 'NaN',
              m_sort_scan_sum_per_sec: 'NaN',
              m_no_index_used_sum_per_sec: 'NaN',
              m_no_good_index_used_sum_per_sec: 'NaN',
              m_docs_returned_sum_per_sec: 'NaN',
              m_response_length_sum_per_sec: 'NaN',
              m_docs_scanned_sum_per_sec: 'NaN',
              m_shared_blks_hit_sum_per_sec: 'NaN',
              m_shared_blks_read_sum_per_sec: 'NaN',
              m_shared_blks_dirtied_sum_per_sec: 'NaN',
              m_shared_blks_written_sum_per_sec: 'NaN',
              m_local_blks_hit_sum_per_sec: 'NaN',
              m_local_blks_read_sum_per_sec: 'NaN',
              m_local_blks_dirtied_sum_per_sec: 'NaN',
              m_local_blks_written_sum_per_sec: 'NaN',
              m_temp_blks_read_sum_per_sec: 'NaN',
              m_temp_blks_written_sum_per_sec: 'NaN',
              m_blk_read_time_sum_per_sec: 'NaN',
              m_blk_write_time_sum_per_sec: 'NaN',
            },
            {
              point: 13,
              time_frame: 360,
              timestamp: '2020-04-20T13:10:00Z',
              load: 0.08972196,
              num_queries_per_sec: 127.736115,
              m_query_time_sum_per_sec: 0.08972196,
              m_lock_time_sum_per_sec: 0.012168634,
              m_rows_sent_sum_per_sec: 127.736115,
              m_rows_examined_sum_per_sec: 127.736115,
              m_rows_read_sum_per_sec: 'NaN',
              m_innodb_queue_wait_sum_per_sec: 0.0023614499,
              m_innodb_pages_distinct_sum_per_sec: 16.725,
              m_query_length_sum_per_sec: 'NaN',
              m_bytes_sent_sum_per_sec: 25419.486,
              m_select_full_range_join_sum_per_sec: 'NaN',
              m_select_range_sum_per_sec: 'NaN',
              m_select_range_check_sum_per_sec: 'NaN',
              m_sort_range_sum_per_sec: 'NaN',
              m_sort_rows_sum_per_sec: 'NaN',
              m_sort_scan_sum_per_sec: 'NaN',
              m_no_index_used_sum_per_sec: 'NaN',
              m_no_good_index_used_sum_per_sec: 'NaN',
              m_docs_returned_sum_per_sec: 'NaN',
              m_response_length_sum_per_sec: 'NaN',
              m_docs_scanned_sum_per_sec: 'NaN',
              m_shared_blks_hit_sum_per_sec: 'NaN',
              m_shared_blks_read_sum_per_sec: 'NaN',
              m_shared_blks_dirtied_sum_per_sec: 'NaN',
              m_shared_blks_written_sum_per_sec: 'NaN',
              m_local_blks_hit_sum_per_sec: 'NaN',
              m_local_blks_read_sum_per_sec: 'NaN',
              m_local_blks_dirtied_sum_per_sec: 'NaN',
              m_local_blks_written_sum_per_sec: 'NaN',
              m_temp_blks_read_sum_per_sec: 'NaN',
              m_temp_blks_written_sum_per_sec: 'NaN',
              m_blk_read_time_sum_per_sec: 'NaN',
              m_blk_write_time_sum_per_sec: 'NaN',
            },
            { point: 14, time_frame: 360, timestamp: '2020-04-20T13:04:00Z' },
            { point: 15, time_frame: 360, timestamp: '2020-04-20T12:58:00Z' },
            { point: 16, time_frame: 360, timestamp: '2020-04-20T12:52:00Z' },
            { point: 17, time_frame: 360, timestamp: '2020-04-20T12:46:00Z' },
            {
              point: 18,
              time_frame: 360,
              timestamp: '2020-04-20T12:40:00Z',
              load: 0.06139476,
              num_queries_per_sec: 84.94444,
              m_query_time_sum_per_sec: 0.06139476,
              m_lock_time_sum_per_sec: 0.00808992,
              m_rows_sent_sum_per_sec: 84.94444,
              m_rows_examined_sum_per_sec: 84.94444,
              m_rows_read_sum_per_sec: 'NaN',
              m_innodb_queue_wait_sum_per_sec: 0.001669175,
              m_innodb_pages_distinct_sum_per_sec: 10.908334,
              m_query_length_sum_per_sec: 'NaN',
              m_bytes_sent_sum_per_sec: 16903.945,
              m_select_full_range_join_sum_per_sec: 'NaN',
              m_select_range_sum_per_sec: 'NaN',
              m_select_range_check_sum_per_sec: 'NaN',
              m_sort_range_sum_per_sec: 'NaN',
              m_sort_rows_sum_per_sec: 'NaN',
              m_sort_scan_sum_per_sec: 'NaN',
              m_no_index_used_sum_per_sec: 'NaN',
              m_no_good_index_used_sum_per_sec: 'NaN',
              m_docs_returned_sum_per_sec: 'NaN',
              m_response_length_sum_per_sec: 'NaN',
              m_docs_scanned_sum_per_sec: 'NaN',
              m_shared_blks_hit_sum_per_sec: 'NaN',
              m_shared_blks_read_sum_per_sec: 'NaN',
              m_shared_blks_dirtied_sum_per_sec: 'NaN',
              m_shared_blks_written_sum_per_sec: 'NaN',
              m_local_blks_hit_sum_per_sec: 'NaN',
              m_local_blks_read_sum_per_sec: 'NaN',
              m_local_blks_dirtied_sum_per_sec: 'NaN',
              m_local_blks_written_sum_per_sec: 'NaN',
              m_temp_blks_read_sum_per_sec: 'NaN',
              m_temp_blks_written_sum_per_sec: 'NaN',
              m_blk_read_time_sum_per_sec: 'NaN',
              m_blk_write_time_sum_per_sec: 'NaN',
            },
            {
              point: 19,
              time_frame: 360,
              timestamp: '2020-04-20T12:34:00Z',
              load: 0.036841165,
              num_queries_per_sec: 52.75,
              m_query_time_sum_per_sec: 0.036841165,
              m_lock_time_sum_per_sec: 0.0046958807,
              m_rows_sent_sum_per_sec: 52.75,
              m_rows_examined_sum_per_sec: 52.75,
              m_rows_read_sum_per_sec: 'NaN',
              m_innodb_queue_wait_sum_per_sec: 0.0010205306,
              m_innodb_pages_distinct_sum_per_sec: 8.252778,
              m_query_length_sum_per_sec: 'NaN',
              m_bytes_sent_sum_per_sec: 10497.25,
              m_select_full_range_join_sum_per_sec: 'NaN',
              m_select_range_sum_per_sec: 'NaN',
              m_select_range_check_sum_per_sec: 'NaN',
              m_sort_range_sum_per_sec: 'NaN',
              m_sort_rows_sum_per_sec: 'NaN',
              m_sort_scan_sum_per_sec: 'NaN',
              m_no_index_used_sum_per_sec: 'NaN',
              m_no_good_index_used_sum_per_sec: 'NaN',
              m_docs_returned_sum_per_sec: 'NaN',
              m_response_length_sum_per_sec: 'NaN',
              m_docs_scanned_sum_per_sec: 'NaN',
              m_shared_blks_hit_sum_per_sec: 'NaN',
              m_shared_blks_read_sum_per_sec: 'NaN',
              m_shared_blks_dirtied_sum_per_sec: 'NaN',
              m_shared_blks_written_sum_per_sec: 'NaN',
              m_local_blks_hit_sum_per_sec: 'NaN',
              m_local_blks_read_sum_per_sec: 'NaN',
              m_local_blks_dirtied_sum_per_sec: 'NaN',
              m_local_blks_written_sum_per_sec: 'NaN',
              m_temp_blks_read_sum_per_sec: 'NaN',
              m_temp_blks_written_sum_per_sec: 'NaN',
              m_blk_read_time_sum_per_sec: 'NaN',
              m_blk_write_time_sum_per_sec: 'NaN',
            },
            { point: 20, time_frame: 360, timestamp: '2020-04-20T12:28:00Z' },
            { point: 21, time_frame: 360, timestamp: '2020-04-20T12:22:00Z' },
            { point: 22, time_frame: 360, timestamp: '2020-04-20T12:16:00Z' },
            { point: 23, time_frame: 360, timestamp: '2020-04-20T12:10:00Z' },
            { point: 24, time_frame: 360, timestamp: '2020-04-20T12:04:00Z' },
            { point: 25, time_frame: 360, timestamp: '2020-04-20T11:58:00Z' },
            { point: 26, time_frame: 360, timestamp: '2020-04-20T11:52:00Z' },
            { point: 27, time_frame: 360, timestamp: '2020-04-20T11:46:00Z' },
            { point: 28, time_frame: 360, timestamp: '2020-04-20T11:40:00Z' },
            { point: 29, time_frame: 360, timestamp: '2020-04-20T11:34:00Z' },
            { point: 30, time_frame: 360, timestamp: '2020-04-20T11:28:00Z' },
            { point: 31, time_frame: 360, timestamp: '2020-04-20T11:22:00Z' },
            { point: 32, time_frame: 360, timestamp: '2020-04-20T11:16:00Z' },
            { point: 33, time_frame: 360, timestamp: '2020-04-20T11:10:00Z' },
            { point: 34, time_frame: 360, timestamp: '2020-04-20T11:04:00Z' },
            { point: 35, time_frame: 360, timestamp: '2020-04-20T10:58:00Z' },
            { point: 36, time_frame: 360, timestamp: '2020-04-20T10:52:00Z' },
            { point: 37, time_frame: 360, timestamp: '2020-04-20T10:46:00Z' },
            { point: 38, time_frame: 360, timestamp: '2020-04-20T10:40:00Z' },
            { point: 39, time_frame: 360, timestamp: '2020-04-20T10:34:00Z' },
            { point: 40, time_frame: 360, timestamp: '2020-04-20T10:28:00Z' },
            { point: 41, time_frame: 360, timestamp: '2020-04-20T10:22:00Z' },
            { point: 42, time_frame: 360, timestamp: '2020-04-20T10:16:00Z' },
            { point: 43, time_frame: 360, timestamp: '2020-04-20T10:10:00Z' },
            { point: 44, time_frame: 360, timestamp: '2020-04-20T10:04:00Z' },
            { point: 45, time_frame: 360, timestamp: '2020-04-20T09:58:00Z' },
            { point: 46, time_frame: 360, timestamp: '2020-04-20T09:52:00Z' },
            { point: 47, time_frame: 360, timestamp: '2020-04-20T09:46:00Z' },
            { point: 48, time_frame: 360, timestamp: '2020-04-20T09:40:00Z' },
            { point: 49, time_frame: 360, timestamp: '2020-04-20T09:34:00Z' },
            { point: 50, time_frame: 360, timestamp: '2020-04-20T09:28:00Z' },
            { point: 51, time_frame: 360, timestamp: '2020-04-20T09:22:00Z' },
            { point: 52, time_frame: 360, timestamp: '2020-04-20T09:16:00Z' },
            { point: 53, time_frame: 360, timestamp: '2020-04-20T09:10:00Z' },
            { point: 54, time_frame: 360, timestamp: '2020-04-20T09:04:00Z' },
            { point: 55, time_frame: 360, timestamp: '2020-04-20T08:58:00Z' },
            { point: 56, time_frame: 360, timestamp: '2020-04-20T08:52:00Z' },
            { point: 57, time_frame: 360, timestamp: '2020-04-20T08:46:00Z' },
            { point: 58, time_frame: 360, timestamp: '2020-04-20T08:40:00Z' },
            { point: 59, time_frame: 360, timestamp: '2020-04-20T08:34:00Z' },
            { point: 60, time_frame: 360, timestamp: '2020-04-20T08:28:00Z' },
            { point: 61, time_frame: 360, timestamp: '2020-04-20T08:22:00Z' },
            { point: 62, time_frame: 360, timestamp: '2020-04-20T08:16:00Z' },
            { point: 63, time_frame: 360, timestamp: '2020-04-20T08:10:00Z' },
            { point: 64, time_frame: 360, timestamp: '2020-04-20T08:04:00Z' },
            { point: 65, time_frame: 360, timestamp: '2020-04-20T07:58:00Z' },
            { point: 66, time_frame: 360, timestamp: '2020-04-20T07:52:00Z' },
            { point: 67, time_frame: 360, timestamp: '2020-04-20T07:46:00Z' },
            { point: 68, time_frame: 360, timestamp: '2020-04-20T07:40:00Z' },
            { point: 69, time_frame: 360, timestamp: '2020-04-20T07:34:00Z' },
            { point: 70, time_frame: 360, timestamp: '2020-04-20T07:28:00Z' },
            { point: 71, time_frame: 360, timestamp: '2020-04-20T07:22:00Z' },
            { point: 72, time_frame: 360, timestamp: '2020-04-20T07:16:00Z' },
            { point: 73, time_frame: 360, timestamp: '2020-04-20T07:10:00Z' },
            { point: 74, time_frame: 360, timestamp: '2020-04-20T07:04:00Z' },
            { point: 75, time_frame: 360, timestamp: '2020-04-20T06:58:00Z' },
            { point: 76, time_frame: 360, timestamp: '2020-04-20T06:52:00Z' },
            { point: 77, time_frame: 360, timestamp: '2020-04-20T06:46:00Z' },
            { point: 78, time_frame: 360, timestamp: '2020-04-20T06:40:00Z' },
            { point: 79, time_frame: 360, timestamp: '2020-04-20T06:34:00Z' },
            { point: 80, time_frame: 360, timestamp: '2020-04-20T06:28:00Z' },
            { point: 81, time_frame: 360, timestamp: '2020-04-20T06:22:00Z' },
            { point: 82, time_frame: 360, timestamp: '2020-04-20T06:16:00Z' },
            { point: 83, time_frame: 360, timestamp: '2020-04-20T06:10:00Z' },
            { point: 84, time_frame: 360, timestamp: '2020-04-20T06:04:00Z' },
            { point: 85, time_frame: 360, timestamp: '2020-04-20T05:58:00Z' },
            { point: 86, time_frame: 360, timestamp: '2020-04-20T05:52:00Z' },
            { point: 87, time_frame: 360, timestamp: '2020-04-20T05:46:00Z' },
            { point: 88, time_frame: 360, timestamp: '2020-04-20T05:40:00Z' },
            { point: 89, time_frame: 360, timestamp: '2020-04-20T05:34:00Z' },
            { point: 90, time_frame: 360, timestamp: '2020-04-20T05:28:00Z' },
            { point: 91, time_frame: 360, timestamp: '2020-04-20T05:22:00Z' },
            { point: 92, time_frame: 360, timestamp: '2020-04-20T05:16:00Z' },
            { point: 93, time_frame: 360, timestamp: '2020-04-20T05:10:00Z' },
            { point: 94, time_frame: 360, timestamp: '2020-04-20T05:04:00Z' },
            { point: 95, time_frame: 360, timestamp: '2020-04-20T04:58:00Z' },
            { point: 96, time_frame: 360, timestamp: '2020-04-20T04:52:00Z' },
            { point: 97, time_frame: 360, timestamp: '2020-04-20T04:46:00Z' },
            { point: 98, time_frame: 360, timestamp: '2020-04-20T04:40:00Z' },
            { point: 99, time_frame: 360, timestamp: '2020-04-20T04:34:00Z' },
            { point: 100, time_frame: 360, timestamp: '2020-04-20T04:28:00Z' },
            { point: 101, time_frame: 360, timestamp: '2020-04-20T04:22:00Z' },
            { point: 102, time_frame: 360, timestamp: '2020-04-20T04:16:00Z' },
            { point: 103, time_frame: 360, timestamp: '2020-04-20T04:10:00Z' },
            { point: 104, time_frame: 360, timestamp: '2020-04-20T04:04:00Z' },
            { point: 105, time_frame: 360, timestamp: '2020-04-20T03:58:00Z' },
            { point: 106, time_frame: 360, timestamp: '2020-04-20T03:52:00Z' },
            { point: 107, time_frame: 360, timestamp: '2020-04-20T03:46:00Z' },
            { point: 108, time_frame: 360, timestamp: '2020-04-20T03:40:00Z' },
            { point: 109, time_frame: 360, timestamp: '2020-04-20T03:34:00Z' },
            { point: 110, time_frame: 360, timestamp: '2020-04-20T03:28:00Z' },
            { point: 111, time_frame: 360, timestamp: '2020-04-20T03:22:00Z' },
            { point: 112, time_frame: 360, timestamp: '2020-04-20T03:16:00Z' },
            { point: 113, time_frame: 360, timestamp: '2020-04-20T03:10:00Z' },
            { point: 114, time_frame: 360, timestamp: '2020-04-20T03:04:00Z' },
            { point: 115, time_frame: 360, timestamp: '2020-04-20T02:58:00Z' },
            { point: 116, time_frame: 360, timestamp: '2020-04-20T02:52:00Z' },
            { point: 117, time_frame: 360, timestamp: '2020-04-20T02:46:00Z' },
            { point: 118, time_frame: 360, timestamp: '2020-04-20T02:40:00Z' },
            { point: 119, time_frame: 360, timestamp: '2020-04-20T02:34:00Z' },
          ],
          totals: {
            blk_read_time: {},
            blk_write_time: {},
            bytes_sent: {
              rate: 229068.19,
              cnt: 4914553,
              sum: 9895746000,
              max: 55801,
              avg: 2013.5597,
              p99: 251.32106,
            },
            docs_returned: {},
            docs_scanned: {},
            filesort: { rate: 11.355486, sum: 490557 },
            filesort_on_disk: { rate: 0.0009259259, sum: 40 },
            full_join: { rate: 0.008912037, sum: 385 },
            full_scan: { rate: 2.8596528, sum: 123537 },
            innodb_io_r_bytes: { cnt: 2713998 },
            innodb_io_r_ops: { cnt: 2713998 },
            innodb_io_r_wait: { cnt: 2713998 },
            innodb_pages_distinct: {
              rate: 190.31003,
              cnt: 2713998,
              sum: 8221393,
              max: 96,
              avg: 3.0292554,
              p99: 0.29493573,
            },
            innodb_queue_wait: {
              rate: 0.0022658654,
              cnt: 2713998,
              sum: 97.88538,
              max: 0.020628,
              avg: 0.00003606686,
              p99: 0.000026229278,
            },
            innodb_rec_lock_wait: {
              rate: 0.00044384264,
              cnt: 2713998,
              sum: 19.174002,
              max: 0.115936,
              avg: 0.000007064855,
            },
            local_blks_dirtied: {},
            local_blks_hit: {},
            local_blks_read: {},
            local_blks_written: {},
            lock_time: {
              rate: 0.016244687,
              cnt: 5029393,
              sum: 701.7705,
              max: 0.769603,
              avg: 0.00013953383,
              p99: 0.00036554743,
            },
            merge_passes: {
              rate: 0.035532407,
              cnt: 4914898,
              sum: 1535,
              max: 4,
              avg: 0.00031231574,
              p99: 0.0013855693,
            },
            no_good_index_used: {},
            no_index_used: { rate: 2.6584492, sum: 114845 },
            num_queries: { rate: 119.32542, sum: 5154858 },
            num_queries_with_errors: { rate: 0.03576389, sum: 1545 },
            num_queries_with_warnings: {},
            qc_hit: {},
            query_length: {},
            query_time: {
              rate: 0.16783683,
              cnt: 5154851,
              sum: 7250.551,
              max: 2.145789,
              avg: 0.001406549,
              p99: 0.0017839335,
            },
            response_length: {},
            rows_affected: {
              rate: 22.709352,
              cnt: 4914573,
              sum: 981044,
              max: 1,
              avg: 0.19961938,
              p99: 0.017735288,
            },
            rows_examined: {
              rate: 4398.383,
              cnt: 5029398,
              sum: 190010140,
              max: 10214,
              avg: 37.7799,
              p99: 9.797638,
            },
            rows_read: {},
            rows_sent: {
              rate: 1939.5332,
              cnt: 5135710,
              sum: 83787830,
              max: 574,
              avg: 16.31475,
              p99: 2.4393988,
            },
            select_full_range_join: {},
            select_range: {},
            select_range_check: {},
            shared_blks_dirtied: { rate: 0.00094907405, sum: 41 },
            shared_blks_hit: { rate: 3.0781713, sum: 132977 },
            shared_blks_read: { rate: 0.00027777778, sum: 12 },
            shared_blks_written: {},
            sort_range: {},
            sort_rows: { rate: 1.9965278, sum: 86250 },
            sort_scan: { rate: 0.007986112, sum: 345 },
            temp_blks_read: {},
            temp_blks_written: {},
            tmp_disk_tables: {
              rate: 0.6345139,
              cnt: 4917654,
              sum: 27411,
              max: 167,
              avg: 0.005573999,
              p99: 0.08348055,
            },
            tmp_table: { rate: 5.7324076, sum: 247640 },
            tmp_table_on_disk: { rate: 0.0078703705, sum: 340 },
            tmp_table_sizes: {
              rate: 722375.56,
              cnt: 4914553,
              sum: 31206623000,
              max: 606208,
              avg: 6349.8394,
              p99: 824.61993,
            },
            tmp_tables: {
              rate: 12.086226,
              cnt: 4936117,
              sum: 522125,
              max: 486,
              avg: 0.10577647,
              p99: 0.23445565,
            },
          },
          fingerprint: 'select c from sbtest10 where id=?',
        };
        setMetrics(processMetrics(METRIC_CATALOGUE, result));
        contextActions.setFingerprint(groupBy === 'queryid' ? result.fingerprint : queryId);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        //TODO: add error handling
      }
    };
    getMetrics();
  }, [queryId]);

  return (
    <div>
      <TimeDistributionChart data={metrics} />
      <h4>Metrics</h4>
      <Table
        dataSource={metrics}
        columns={columns}
        pagination={false}
        size="small"
        bordered={true}
        loading={loading}
      />
    </div>
  );
};

export default Metrics;
