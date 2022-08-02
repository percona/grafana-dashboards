import moment from 'moment';

type TimeEdge = 'from' | 'to';

const getTimezone = () => {
  const getCookie = (name) => document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');

    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');

  return getCookie('timezone') || 'browser';
};

const getComplexTimeValue = (date, nowFunc, edge) => {
  // ex: ["now-7d/d", "now", "-", "7", "d", "/", "d"]
  const parts = date.match('(now)(-|/)?([0-9]*)([yMwdhms])(/)?([yMwdhms])?');
  let parsedDate;

  if (!parts) {
    const isnum = /^\d+$/.test(date);

    if (isnum) {
      return nowFunc(parseInt(date, 10));
    }

    return nowFunc(date);
  }

  if (parts[1] === 'now') {
    parsedDate = nowFunc();
  }

  if (parts[2] === '-') {
    parsedDate.subtract(parts[3], parts[4]);
  }

  if (parts[2] === '/') {
    if (edge === 'from') {
      return parsedDate.startOf(parts[4]);
    }

    return parsedDate.endOf(parts[4]);
  }

  if (parts.length > 4 && parts[5] === '/') {
    if (edge === 'from') {
      return parsedDate.startOf(parts[6]);
    }

    return parsedDate.endOf(parts[6]);
  }

  return parsedDate;
};

export class ParseQueryParamDate {
  static transform(date: string, edge?: TimeEdge) {
    const nowFunc = getTimezone() === 'utc' ? moment.utc : moment;
    let parsedDate;

    if (date === undefined && edge === 'from') {
      return nowFunc().subtract(1, 'h');
    }

    if (date === undefined && edge === 'to') {
      return nowFunc();
    }

    if (date === 'now') {
      return nowFunc().subtract(1, 'minute');
    }

    if (date.length > 4 && date.startsWith('now')) {
      // Calculate complex time range, for example 'Week to date'
      // from=now-5d&to=now-6M ... from=now/w&to=now/w
      // https://grafana.com/docs/grafana/latest/dashboards/time-range-controls/
      parsedDate = getComplexTimeValue(date, nowFunc, edge).subtract(1, 'minute');
    } else {
      // expect unix timestamp in milliseconds
      const isNum = /^\d+$/.test(date);

      if (isNum) {
        return nowFunc(parseInt(date, 10));
      }

      if (!Number.isFinite(date)) {
        if (edge === 'from') {
          return nowFunc().subtract(1, 'h');
        }

        if (edge === 'to') {
          return nowFunc();
        }
      }

      return nowFunc(date);
    }

    return parsedDate;
  }
}
