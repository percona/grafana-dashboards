import moment from 'moment';
import numeral from 'numeral';

// TODO: improve readability
export const humanize = {
  parseTime: (input: number) => {
    let duration = '';
    const durationSec = moment.duration(input, 's');
    const durationAsSec = durationSec.as('s');
    const durationAsMs = durationSec.as('ms');

    if (input === 0) {
      duration = '0';
    } else if (durationAsSec > 1 && durationAsSec < 60) {
      duration = `${durationAsSec.toFixed(2)} sec`;
    } else if (durationAsSec >= 60) {
      let secs = durationAsSec;
      const secondsInDay = 24 * 60 * 60;

      if (secs >= secondsInDay) {
        const days = Math.floor(secs / secondsInDay);

        duration = `${days} days, `;
        secs %= secondsInDay;
      }

      duration += numeral(secs).format('00:00:00');
    } else if (durationAsMs < 1) {
      duration = `${(durationAsMs * 1000).toFixed(2)} µs`;
    } else {
      duration = `${durationAsMs.toFixed(2)} ms`;
    }

    return duration;
  },
  transform: (metricValue: number | null, name?: string): string => {
    if (metricValue === null) {
      return '0';
    }

    let res = '0';

    switch (name) {
      // "top 10"/profile queries no name parameters
      case undefined:
        res = metricValue !== 0 && metricValue < 0.00001 ? '<' : '';
        res += humanize.parseTime(metricValue);
        break;
      // time
      case 'time':
        res = metricValue !== 0 && metricValue < 0.00001 ? '<' : '';
        res += humanize.parseTime(metricValue);
        break;
      // size
      case 'size':
        if (metricValue !== 0 && metricValue < 0.01) {
          res = '<0.01 B';
        } else {
          res = numeral(metricValue).format('0.00 b');
        }

        res = res.replace(/([\d]) B/, '$1 Bytes');
        break;
      // ops
      case 'number':
        if (metricValue !== 0 && metricValue < 0.01) {
          res = '<0.01';
        } else {
          res = numeral(metricValue).format('0.00a');
        }

        break;
      case 'percent':
        if (metricValue !== 0 && metricValue < 0.0001) {
          res = '<0.01%';
        } else if (Number.isInteger(metricValue)) {
          res = numeral(metricValue).format('0.[00]%');
        } else {
          res = numeral(metricValue).format('0.00%');
        }

        break;
      case 'percentRounded':
        if (metricValue !== 0 && metricValue < 0.0001) {
          res = '<0.01%';
        } else {
          res = numeral(metricValue).format('0%');
        }

        break;
      // ops
      default:
        if (metricValue !== 0 && metricValue < 0.01) {
          res = '<0.01';
        } else {
          res = numeral(metricValue).format('0.00 a');
        }

        break;
    }

    return String(res).replace('<0.00', '<0.01');
  },
};
