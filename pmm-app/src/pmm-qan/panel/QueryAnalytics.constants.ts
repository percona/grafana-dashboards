import { get } from 'lodash';
import { humanize } from 'shared/components/helpers/Humanization';

export const PAGE_SIZE_OPTIONS = ['10', '50', '100'];
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MIN_SPLIT_SIZE = 300;
// percent
export const SPACE_DISTRIBUTION_OVERVIEW = 40;
export const SPACE_DISTRIBUTION_DETAILS = 60;
export const DEFAULT_COLUMNS = ['load', 'num_queries', 'query_time'];
export const FILTERS_NAMES = [
  'environment',
  'cluster',
  'replication_set',
  'database',
  'schema',
  'node_name',
  'service_name',
  'client_host',
  'username',
  'service_type',
  'node_type',
  'city',
  'az',
  // we need to have interval to not lose it during pages transitions
  'interval',
];

const Units = {
  AVG_LOAD: '(avg load)',
  LOAD: 'load',
  PER_SEC: '(per sec)',
  BYTES_PER_SEC: 'Bytes (per sec)',
  QPS: 'QPS',
  AVG: 'avg',
  PERCENT: '%',
  NONE: '',
};

export const METRIC_CATALOGUE = {
  bytes_sent: {
    humanizeName: 'Bytes Sent',
    tooltipText: 'The number of bytes sent to all clients',
    simpleName: 'bytes_sent',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['bytes_sent', 'sum']);
      const divider = get(data, ['rows_sent', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'size')} per row sent`;
    },
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'size',
      sumPipe: 'size',
      subSumPipe: 'percent',
      sparklineType: 'size',
      perQueryStatsPipe: 'size',
    },
  },
  blk_read_time: {
    humanizeName: 'Reading Blocks Time',
    tooltipText: 'Total time the statement spent reading blocks (if track_io_timing is enabled, otherwise zero)',
    simpleName: 'blk_read_time',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
  },
  blk_write_time: {
    humanizeName: 'Writing Blocks Time',
    tooltipText: 'Total time the statement spent writing blocks (if track_io_timing is enabled, otherwise zero)',
    simpleName: 'blk_write_time',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
  },
  local_blks_dirtied: {
    humanizeName: 'Local Blocks Dirtied',
    tooltipText: 'Total number of local blocks dirtied by the statement',
    simpleName: 'local_blks_dirtied',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  local_blks_hit: {
    humanizeName: 'Local Block Cache Hits',
    tooltipText: 'Total number of local block cache hits by the statement',
    simpleName: 'local_blks_hit',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  local_blks_read: {
    humanizeName: 'Local Blocks Read',
    tooltipText: 'Total number of local blocks read by the statement',
    simpleName: 'local_blks_read',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  local_blks_written: {
    humanizeName: 'Local Blocks Written',
    tooltipText: 'Total number of local blocks written by the statement',
    simpleName: 'local_blks_written',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  shared_blks_dirtied: {
    humanizeName: 'Shared Blocks Dirtied',
    tooltipText: 'Total number of shared blocks dirtied by the statement',
    simpleName: 'shared_blks_dirtied',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  shared_blks_hit: {
    humanizeName: 'Shared Block Cache Hits',
    tooltipText: 'Total number of shared block cache hits by the statement',
    simpleName: 'shared_blks_hit',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  shared_blks_read: {
    humanizeName: 'Shared Blocks Read',
    tooltipText: 'Total number of shared blocks read by the statement',
    simpleName: 'shared_blks_read',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  shared_blks_written: {
    humanizeName: 'Shared Blocks Written',
    tooltipText: 'Total number of shared blocks written by the statement',
    simpleName: 'shared_blks_written',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  temp_blks_read: {
    humanizeName: 'Temp Blocks Read',
    tooltipText: 'Total number of temp blocks read by the statement',
    simpleName: 'temp_blks_read',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  temp_blks_written: {
    humanizeName: 'Temp Blocks Written',
    tooltipText: 'Total number of temp blocks written by the statement',
    simpleName: 'temp_blks_written',
    serviceTypes: ['postgresql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  num_queries: {
    humanizeName: 'Query Count',
    tooltipText: 'Total number of queries',
    simpleName: 'num_queries',
    serviceTypes: ['all'],
    units: Units.QPS,
    metricRelation: () => '',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  num_queries_with_errors: {
    humanizeName: 'Query Count with errors',
    tooltipText: 'Total number of queries with errors',
    simpleName: 'num_queries_with_errors',
    serviceTypes: ['all'],
    metricRelation: () => '',
    units: Units.QPS,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  num_queries_with_warnings: {
    humanizeName: 'Query Count with warnings',
    tooltipText: 'Total number of queries with warnings',
    simpleName: 'num_queries_with_warnings',
    serviceTypes: ['all'],
    metricRelation: () => '',
    units: Units.QPS,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  docs_scanned: {
    humanizeName: 'Docs scanned',
    tooltipText: 'Number of scanned documents',
    simpleName: 'docs_scanned',
    serviceTypes: ['mongodb'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['docs_scanned', 'sum']);
      const divider = get(data, ['docs_returned', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'number')} per row sent`;
    },
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  docs_returned: {
    humanizeName: 'Docs Returned',
    tooltipText: 'Number of returned documents',
    simpleName: 'docs_returned',
    serviceTypes: ['mongodb'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  filesort: {
    humanizeName: 'Filesort',
    tooltipText: 'The query used a filesort',
    simpleName: 'filesort',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['filesort', 'sum']);
      const divider = get(data, ['num_queries', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per query`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: '',
    },
  },
  filesort_on_disk: {
    humanizeName: 'Filesort on Disk',
    tooltipText: 'A filesort was performed on disk',
    simpleName: 'filesort_on_disk',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['filesort_on_disk', 'sum']);
      const divider = get(data, ['num_queries', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per query`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: '',
    },
  },
  full_join: {
    humanizeName: 'Full Join',
    tooltipText: 'The query performed a full join (a join without indexes)',
    simpleName: 'full_join',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['full_join', 'sum']);
      const divider = get(data, ['num_queries', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'number')} per query`;
    },
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: '',
    },
  },
  full_scan: {
    humanizeName: 'Full Scan',
    tooltipText: 'The query performed a full table scan',
    simpleName: 'full_scan',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['full_scan', 'sum']);
      const divider = get(data, ['num_queries', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'number')} per query`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: '',
    },
  },
  innodb_io_r_bytes: {
    humanizeName: 'Innodb Read Bytes',
    tooltipText: 'Total page read operations scheduled',
    simpleName: 'innodb_io_r_bytes',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['innodb_io_r_bytes', 'sum']);
      const divider = get(data, ['innodb_io_r_ops', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'size')} per Read Ops`;
    },
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'size',
      sumPipe: 'size',
      subSumPipe: 'percent',
      sparklineType: 'size',
      perQueryStatsPipe: 'size',
    },
  },
  innodb_io_r_ops: {
    humanizeName: 'Innodb IO Read Ops',
    tooltipText: 'Number of page read operations scheduled',
    simpleName: 'innodb_io_r_ops',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  innodb_io_r_wait: {
    humanizeName: 'Innodb IO Read Wait',
    tooltipText: 'Time for InnoDB to read the data from storage',
    simpleName: 'innodb_io_r_wait',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['innodb_io_r_wait', 'avg']);
      const divider = get(data, ['query_time', 'avg']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'percent')} of query time`;
    },
    units: Units.LOAD,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
  },
  innodb_pages_distinct: {
    humanizeName: 'Innodb Pages Distinct',
    tooltipText: 'Approximate number of unique pages the query accessed',
    simpleName: 'innodb_pages_distinct',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: '',
      sumPipe: '',
      subSumPipe: '',
      sparklineType: '',
      perQueryStatsPipe: 'number',
    },
  },
  innodb_queue_wait: {
    humanizeName: 'Innodb Queue Wait',
    tooltipText: 'Time the query spent either waiting to enter the InnoDB queue, or in it pending execution',
    simpleName: 'innodb_queue_wait',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['innodb_queue_wait', 'avg']);
      const divider = get(data, ['query_time', 'avg']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'percent')} of query time`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
  },
  innodb_rec_lock_wait: {
    humanizeName: 'Innodb Rec Lock Wait',
    tooltipText: 'Time the query waited for row locks',
    simpleName: 'innodb_rec_lock_wait',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['innodb_rec_lock_wait', 'avg']);
      const divider = get(data, ['query_time', 'avg']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'percent')} of query time`;
    },
    units: Units.AVG_LOAD,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
  },
  load: {
    humanizeName: 'Load',
    tooltipText: 'Percentage load on the system',
    simpleName: 'load',
    serviceTypes: ['all'],
    metricRelation: () => '',
    units: Units.LOAD,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  lock_time: {
    humanizeName: 'Lock Time',
    tooltipText: 'Time to acquire locks',
    simpleName: 'lock_time',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['lock_time', 'avg']);
      const divider = get(data, ['query_time', 'avg']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'percent')} of query time`;
    },
    units: Units.AVG_LOAD,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
  },
  merge_passes: {
    humanizeName: 'Merge Passes',
    tooltipText: 'Number of merge passes the sort algorithm performed',
    simpleName: 'merge_passes',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['merge_passes', 'sum']);
      const divider = get(data, ['filesort', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per external sort`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  no_good_index_used: {
    humanizeName: 'No Good Index Used',
    tooltipText: 'Number of queries without a good index',
    simpleName: 'no_good_index_used',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  no_index_used: {
    humanizeName: 'No index used',
    tooltipText: 'Number of queries without an index',
    simpleName: 'no_index_used',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  qc_hit: {
    humanizeName: 'Query Cache Hit',
    tooltipText: 'Query Cache hits',
    simpleName: 'qc_hit',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['qc_hit', 'sum']);
      const divider = get(data, ['num_queries', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per query`;
    },
    units: Units.PERCENT,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: '',
    },
  },
  query_length: {
    humanizeName: 'Query Length',
    tooltipText: 'Query duration',
    simpleName: 'query_length',
    serviceTypes: ['all'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  query_time: {
    humanizeName: 'Query Time',
    tooltipText: 'Statement execution time',
    simpleName: 'query_time',
    serviceTypes: ['all'],
    metricRelation: () => '',
    units: Units.LOAD,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
  },
  response_length: {
    humanizeName: 'Response Length',
    tooltipText: 'Response length of the query result',
    simpleName: 'response_length',
    serviceTypes: ['mongodb'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['response_length', 'sum']);
      const divider = get(data, ['docs_returned', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'size')} bytes/row`;
    },
    units: Units.BYTES_PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  rows_affected: {
    humanizeName: 'Rows Affected',
    tooltipText: 'Number of rows changed by UPDATE, DELETE, or INSERT',
    simpleName: 'rows_affected',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  rows_examined: {
    humanizeName: 'Rows Examined',
    tooltipText: 'Number of rows scanned by SELECT',
    simpleName: 'rows_examined',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['rows_examined', 'sum']);
      const divider = get(data, ['rows_sent', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider, 'number')} per row sent`;
    },
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  rows_read: {
    humanizeName: 'Rows Read',
    tooltipText: 'Number of rows read from tables',
    simpleName: 'rows_read',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  rows_sent: {
    humanizeName: 'Rows Sent',
    tooltipText: 'Number of rows sent to the client',
    simpleName: 'rows_sent',
    serviceTypes: ['mysql', 'postgresql'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  select_full_range_join: {
    humanizeName: 'Select Full Range Join',
    tooltipText: 'Number of joins using a range search on a reference table',
    simpleName: 'select_full_range_join',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  sort_range: {
    humanizeName: 'Sort Range',
    tooltipText: 'Number of sorts using ranges',
    simpleName: 'sort_range',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  select_range: {
    humanizeName: 'Select Range',
    tooltipText: 'Number of joins using ranges on the first table',
    simpleName: 'select_range',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  select_range_check: {
    humanizeName: 'Select Range Check',
    tooltipText: 'The number of joins without keys that check for key usage after each row',
    simpleName: 'select_range_check',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  sort_rows: {
    humanizeName: 'Sort Rows',
    tooltipText: 'The number of sorted rows',
    simpleName: 'sort_rows',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  sort_scan: {
    humanizeName: 'Sort Scan',
    tooltipText: 'The number of sorts performed when scanning the table',
    simpleName: 'sort_scan',
    serviceTypes: ['mysql'],
    metricRelation: () => '',
    units: Units.PER_SEC,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  tmp_disk_tables: {
    humanizeName: 'Tmp Disk Tables',
    tooltipText: 'The number of temporary tables created on disk for the query',
    simpleName: 'tmp_disk_tables',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['tmp_disk_tables', 'sum']);
      const divider = get(data, ['tmp_table_on_disk', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per query`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
  tmp_table: {
    humanizeName: 'Tmp Table',
    tooltipText: 'The query created an implicit internal temporary table',
    simpleName: 'tmp_table',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['tmp_table', 'sum']);
      const divider = get(data, ['num_queries', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per query`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: '',
    },
  },
  tmp_table_on_disk: {
    humanizeName: 'Tmp Table on Disk',
    tooltipText: 'The query\'s temporary table was stored on disk',
    simpleName: 'tmp_table_on_disk',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['tmp_table_on_disk', 'sum']);
      const divider = get(data, ['num_queries', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per query`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: '',
    },
  },
  tmp_table_sizes: {
    humanizeName: 'Tmp Table Sizes',
    tooltipText: 'Total size for all temporary tables used in the query',
    simpleName: 'tmp_table_sizes',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['tmp_table_sizes', 'sum']);
      const divider = get(data, ['tmp_table_on_disk', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per query`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'size',
      sumPipe: 'size',
      subSumPipe: 'percent',
      sparklineType: 'size',
      perQueryStatsPipe: 'size',
    },
  },
  tmp_tables: {
    humanizeName: 'Tmp Tables',
    tooltipText: 'Number of temporary tables created on memory for the query',
    simpleName: 'tmp_tables',
    serviceTypes: ['mysql'],
    metricRelation: (data) => {
      const mainMetric = get(data, ['tmp_tables', 'sum']);
      const divider = get(data, ['tmp_table', 'sum']);

      if (!mainMetric || !divider) {
        return '';
      }

      return `${humanize.transform(mainMetric / divider)} per query`;
    },
    units: Units.NONE,
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
  },
};
