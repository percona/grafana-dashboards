import { METRIC_CATALOGUE } from './QueryAnalytics.constants';

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

describe('Query analytics metrics::', () => {
  it('bytes_sent', () => {
    const metric = METRIC_CATALOGUE.bytes_sent;

    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('2.00 Bytes per row sent');
  });

  it('blk_read_time', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.blk_read_time;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('blk_write_time', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.blk_write_time;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('local_blks_dirtied', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.local_blks_dirtied;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('local_blks_hit', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.local_blks_hit;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('local_blks_read', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.local_blks_read;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('local_blks_written', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.local_blks_written;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('shared_blks_dirtied', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.shared_blks_dirtied;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('shared_blks_hit', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.shared_blks_hit;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('shared_blks_read', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.shared_blks_read;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('shared_blks_written', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.shared_blks_written;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('temp_blks_read', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.temp_blks_read;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('temp_blks_written', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.temp_blks_written;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('num_queries', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.num_queries;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('num_queries_with_errors', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.num_queries_with_errors;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('num_queries_with_warnings', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.num_queries_with_warnings;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('docs_scanned', () => {
    const metric = METRIC_CATALOGUE.docs_scanned;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(absentMetric).toBe('');
    expect(processedMetric).toBe('2.00 per row sent');
  });

  it('docs_returned', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.docs_returned;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
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

  it('innodb_io_r_ops', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.innodb_io_r_ops;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('innodb_io_r_wait', () => {
    const metric = METRIC_CATALOGUE.innodb_io_r_wait;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('100% of query time');
    expect(absentMetric).toBe('');
  });

  it('innodb_pages_distinct', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.innodb_pages_distinct;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
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

  it('load', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.load;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
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

  it('no_good_index_used', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.no_good_index_used;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('no_index_used', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.no_index_used;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('qc_hit', () => {
    const metric = METRIC_CATALOGUE.qc_hit;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1000.00 ms per query');
    expect(absentMetric).toBe('');
  });

  it('query_length', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.query_length;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('query_time', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.query_time;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('response_length', () => {
    const metric = METRIC_CATALOGUE.response_length;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1.00 Bytes bytes/row');
    expect(absentMetric).toBe('');
  });

  it('rows_affected', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.rows_affected;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('rows_examined', () => {
    const metric = METRIC_CATALOGUE.rows_examined;
    const processedMetric = metric.metricRelation(metrics);
    const absentMetric = metric.metricRelation({});

    expect(processedMetric).toBe('1.00 per row sent');
    expect(absentMetric).toBe('');
  });

  it('rows_read', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.rows_read;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('rows_sent', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.rows_sent;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('select_full_range_join', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.select_full_range_join;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('sort_range', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.sort_range;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('select_range', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.select_range;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('select_range_check', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.select_range_check;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('sort_rows', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.sort_rows;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('sort_scan', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.sort_scan;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
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

  it('cpu_user_time', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.cpu_user_time;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });

  it('cpu_sys_time', () => {
    // Metric with empty relation
    const metric = METRIC_CATALOGUE.cpu_sys_time;
    const processedMetric = metric.metricRelation();

    expect(processedMetric).toBe('');
  });
});
