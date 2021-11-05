import moment from 'moment';

const MINUTE = 'MINUTE';
const QUARTER = 'QUARTER';
const HOUR = 'HOUR';

const fragments = {
  [MINUTE]: {
    count: 1440,
    getBucketIndex: (time) => time.hour() * 60 + time.minute(),
    getTime: (time, bucketIndex) => moment(time).startOf('day').add(bucketIndex, 'minute'),
    getBucket: (timestamp) => moment(timestamp).startOf('minute').unix(),
    nextTime: (time) => moment.utc(time).add(1, 'minute')
  },
  [QUARTER]: {
    count: 96,
    getBucketIndex: (time) => time.hour() * 4 + Math.floor(time.minute() / 15),
    getTime: (time, bucketIndex) => moment(time).startOf('day').add(15 * bucketIndex, 'minute'),
    getBucket: (timestamp) => {
      const timeUtc = moment(timestamp);
      const minutes = Math.floor(timeUtc.minute() / 15) * 15;
      return timeUtc.startOf('hour').add(minutes, 'minute').unix();
    },
    nextTime: (time) => moment.utc(time).add(15, 'minute')
  },
  [HOUR]: {
    count: 24,
    getBucketIndex: (time) => time.hour(),
    getTime: (time, bucketIndex) => moment(time).startOf('day').add(bucketIndex, 'hour'),
    getBucket: (timestamp) => moment(timestamp).startOf('hour').unix(),
    nextTime: (time) => moment.utc(time).add(1, 'hour')
  }
};

export const fragmentsMap = [
  { name: 'Minute', value: MINUTE },
  { name: '15 minutes', value: QUARTER },
  { name: 'Hour', value: HOUR }
];

export const getFragment = (fragmentType) => fragments[fragmentType];

export default {
  HOUR,
  QUARTER,
  MINUTE
};