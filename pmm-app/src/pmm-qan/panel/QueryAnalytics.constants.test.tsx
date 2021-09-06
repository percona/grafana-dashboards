import { METRIC_CATALOGUE } from './QueryAnalytics.constants';

jest.mock('shared/components/helpers/notification-manager');

const metrics = {
  num_queries: {
    sum: 100,
    avg: 10,
  },
  query_time: {
    sum: 100,
    avg: 10,
  },
  bytes_sent: {
    sum: 200,
  },
  rows_sent: {
    sum: 100,
  },
  rows_examined: {
    sum: 100,
  },
  docs_scanned: {
    sum: 200,
  },
  docs_returned: {
    sum: 100,
  },
  filesort: {
    sum: 200,
  },
  filesort_on_disk: {
    sum: 200,
  },
  full_join: {
    sum: 100,
  },
  full_scan: {
    sum: 100,
  },
  tmp_disk_tables: {
    sum: 100,
  },
  tmp_table_on_disk: {
    sum: 100,
  },
  tmp_table: {
    sum: 100,
  },
  tmp_tables: {
    sum: 100,
  },
  tmp_table_sizes: {
    sum: 100,
  },
  innodb_io_r_bytes: {
    sum: 100,
  },
  innodb_io_r_ops: {
    sum: 100,
  },
  innodb_io_r_wait: {
    sum: 100,
    avg: 10,
  },
  innodb_queue_wait: {
    sum: 100,
    avg: 10,
  },
  innodb_rec_lock_wait: {
    sum: 100,
    avg: 10,
  },
  lock_time: {
    sum: 100,
    avg: 10,
  },
  merge_passes: {
    sum: 100,
    avg: 10,
  },
  qc_hit: {
    sum: 100,
    avg: 10,
  },
  response_length: {
    sum: 100,
    avg: 10,
  },
};

const EMPTY_RELATIONS_METRICS = [
  'blk_read_time',
  'blk_write_time',
  'local_blks_dirtied',
  'local_blks_hit',
  'local_blks_read',
  'local_blks_written',
  'shared_blks_dirtied',
  'shared_blks_hit',
  'shared_blks_read',
  'shared_blks_written',
  'temp_blks_read',
  'temp_blks_written',
  'num_queries',
  'num_queries_with_errors',
  'num_queries_with_warnings',
  'docs_returned',
  'innodb_io_r_ops',
  'innodb_pages_distinct',
  'load',
  'no_good_index_used',
  'no_index_used',
  'query_length',
  'query_time',
  'rows_affected',
  'rows_read',
  'rows_sent',
  'select_full_range_join',
  'sort_range',
  'select_range',
  'select_range_check',
  'sort_rows',
  'sort_scan',
  'cpu_user_time',
  'cpu_sys_time',
];

describe('Query analytics metrics::', () => {
  it('bytes_sent', () => {
    const metric = METRIC_CATALOGUE.bytes_sent;

    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('2.00 Bytes per row sent');
  });

  it('docs_scanned', () => {
    const metric = METRIC_CATALOGUE.docs_scanned;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('2.00 per row sent');
  });

  it('filesort', () => {
    const metric = METRIC_CATALOGUE.filesort;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('2.00 sec per query');
  });

  it('filesort_on_disk', () => {
    const metric = METRIC_CATALOGUE.filesort_on_disk;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('2.00 sec per query');
  });

  it('full_join', () => {
    const metric = METRIC_CATALOGUE.full_join;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('1.00 per query');
  });

  it('full_scan', () => {
    const metric = METRIC_CATALOGUE.full_scan;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('1.00 per query');
  });

  it('innodb_io_r_bytes', () => {
    const metric = METRIC_CATALOGUE.innodb_io_r_bytes;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('1.00 Bytes per Read Ops');
  });

  it('innodb_io_r_wait', () => {
    const metric = METRIC_CATALOGUE.innodb_io_r_wait;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('100% of query time');
    expect(absentMetric).toBe('');
  });

  it('innodb_queue_wait', () => {
    const metric = METRIC_CATALOGUE.innodb_queue_wait;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('100% of query time');
    expect(absentMetric).toBe('');
  });

  it('innodb_rec_lock_wait', () => {
    const metric = METRIC_CATALOGUE.innodb_rec_lock_wait;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('100% of query time');
    expect(absentMetric).toBe('');
  });

  it('lock_time', () => {
    const metric = METRIC_CATALOGUE.lock_time;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('100% of query time');
    expect(absentMetric).toBe('');
  });

  it('merge_passes', () => {
    const metric = METRIC_CATALOGUE.merge_passes;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('500.00 ms per external sort');
    expect(absentMetric).toBe('');
  });

  it('qc_hit', () => {
    const metric = METRIC_CATALOGUE.qc_hit;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1000.00 ms per query');
    expect(absentMetric).toBe('');
  });

  it('response_length', () => {
    const metric = METRIC_CATALOGUE.response_length;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1.00 Bytes bytes/row');
    expect(absentMetric).toBe('');
  });

  it('rows_examined', () => {
    const metric = METRIC_CATALOGUE.rows_examined;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1.00 per row sent');
    expect(absentMetric).toBe('');
  });

  it('tmp_disk_tables', () => {
    // TODO: check correct values, not sure about units
    const metric = METRIC_CATALOGUE.tmp_disk_tables;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1.00 per query');
    expect(absentMetric).toBe('');
  });

  it('tmp_table', () => {
    // TODO: check correct values, not sure about units

    const metric = METRIC_CATALOGUE.tmp_table;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1.00 per query');
    expect(absentMetric).toBe('');
  });

  it('tmp_table_on_disk', () => {
    // TODO: check correct values, not sure about units

    const metric = METRIC_CATALOGUE.tmp_table_on_disk;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1.00 per query');
    expect(absentMetric).toBe('');
  });

  it('tmp_table_sizes', () => {
    // TODO: check correct values, not sure about units

    const metric = METRIC_CATALOGUE.tmp_table_sizes;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('1.00 Bytes per query');
  });

  it('tmp_tables', () => {
    // TODO: check correct values, not sure about units

    const metric = METRIC_CATALOGUE.tmp_tables;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1.00 per query');
    expect(absentMetric).toBe('');
  });

  test.each(EMPTY_RELATIONS_METRICS)('%s', (metricName) => {
    const metric = METRIC_CATALOGUE[metricName];
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });
});
