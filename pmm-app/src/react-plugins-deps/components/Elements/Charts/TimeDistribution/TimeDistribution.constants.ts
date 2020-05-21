export const TIME_METRICS = [
  'lock_time',
  'query_time',
  'blk_read_time',
  'blk_write_time',
  'innodb_io_r_wait',
  'innodb_queue_wait',
  'innodb_rec_lock_wait',
];

export const METRICS_COLORS = {
  lock_time: '#BD4848',
  blk_read_time: '#4e378c',
  blk_write_time: '#fcc200',
  innodb_io_r_wait: '#3c3c3c',
  innodb_queue_wait: '#7e4291',
  innodb_rec_lock_wait: '#e97e03',
};

export const PERCENT_COUNT = 100;
