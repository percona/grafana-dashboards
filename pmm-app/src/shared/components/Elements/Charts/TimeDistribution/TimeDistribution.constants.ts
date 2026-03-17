export const TIME_METRICS = [
  'lock_time',
  'query_time',
  'innodb_io_r_wait',
  'innodb_queue_wait',
  'innodb_rec_lock_wait',
  // PG metrics
  'cpu_user_time',
  'cpu_sys_time',
  'local_blk_read_time',
  'local_blk_write_time',
  'shared_blk_read_time',
  'shared_blk_write_time',
];

export const METRICS_COLORS = {
  lock_time: '#BD4848',
  innodb_io_r_wait: '#3c3c3c',
  innodb_queue_wait: '#7e4291',
  innodb_rec_lock_wait: '#e97e03',
  // PG metrics
  cpu_user_time: '#a87067',
  cpu_sys_time: '#23b899',
  local_blk_read_time: '#4e378c',
  local_blk_write_time: '#fcc200',
  shared_blk_read_time: '#4e378c',
  shared_blk_write_time: '#fcc200',
};

export const PERCENT_COUNT = 100;
