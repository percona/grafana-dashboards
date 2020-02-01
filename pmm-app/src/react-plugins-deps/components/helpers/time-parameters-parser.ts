import * as moment from 'moment';

type TimeEdge = 'from' | 'to';

/**
 *
 * var spans = {
 *       's': {display: 'second'},
 *       'm': {display: 'minute'},
 *       'h': {display: 'hour'},
 *       'd': {display: 'day'},
 *       'w': {display: 'week'},
 *       'M': {display: 'month'},
 *       'y': {display: 'year'},
 * };
 *
 * var rangeOptions = [
 *   { from: 'now/d',    to: 'now/d',    display: 'Today',                 section: 2 },
 *   { from: 'now/d',    to: 'now',      display: 'Today so far',          section: 2 },
 *   { from: 'now/w',    to: 'now/w',    display: 'This week',             section: 2 },
 *   { from: 'now/w',    to: 'now',      display: 'This week so far',           section: 2 },
 *   { from: 'now/M',    to: 'now/M',    display: 'This month',            section: 2 },
 *   { from: 'now/y',    to: 'now/y',    display: 'This year',             section: 2 },
 *
 *   { from: 'now-1d/d', to: 'now-1d/d', display: 'Yesterday',             section: 1 },
 *   { from: 'now-2d/d', to: 'now-2d/d', display: 'Day before yesterday',  section: 1 },
 *   { from: 'now-7d/d', to: 'now-7d/d', display: 'This day last week',    section: 1 },
 *   { from: 'now-1w/w', to: 'now-1w/w', display: 'Previous week',         section: 1 },
 *   { from: 'now-1M/M', to: 'now-1M/M', display: 'Previous month',        section: 1 },
 *   { from: 'now-1y/y', to: 'now-1y/y', display: 'Previous year',         section: 1 },
 *
 *   { from: 'now-5m',   to: 'now',      display: 'Last 5 minutes',        section: 3 },
 *   { from: 'now-15m',  to: 'now',      display: 'Last 15 minutes',       section: 3 },
 *   { from: 'now-30m',  to: 'now',      display: 'Last 30 minutes',       section: 3 },
 *   { from: 'now-1h',   to: 'now',      display: 'Last 1 hour',           section: 3 },
 *   { from: 'now-3h',   to: 'now',      display: 'Last 3 hours',          section: 3 },
 *   { from: 'now-6h',   to: 'now',      display: 'Last 6 hours',          section: 3 },
 *   { from: 'now-12h',  to: 'now',      display: 'Last 12 hours',         section: 3 },
 *   { from: 'now-24h',  to: 'now',      display: 'Last 24 hours',         section: 3 },
 *
 *   { from: 'now-2d',   to: 'now',      display: 'Last 2 days',           section: 0 },
 *   { from: 'now-7d',   to: 'now',      display: 'Last 7 days',           section: 0 },
 *   { from: 'now-30d',  to: 'now',      display: 'Last 30 days',          section: 0 },
 *   { from: 'now-90d',  to: 'now',      display: 'Last 90 days',          section: 0 },
 *   { from: 'now-6M',   to: 'now',      display: 'Last 6 months',         section: 0 },
 *   { from: 'now-1y',   to: 'now',      display: 'Last 1 year',           section: 0 },
 *   { from: 'now-2y',   to: 'now',      display: 'Last 2 years',          section: 0 },
 *   { from: 'now-5y',   to: 'now',      display: 'Last 5 years',          section: 0 },
 * ];from=now-7d%2Fd&to=now-7d%2Fd
 */

export class MomentFormatPipe {
  timezone = 'browser';
  constructor() {
    this.timezone = this.getCookie('timezone') || 'browser';
  }

  getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  transform(value: any, format = 'YYYY-MM-DD HH:mm:ss'): string {
    if (value === null) {
      return null;
    }

    if (this.timezone === 'browser') {
      return moment(value)
        .local()
        .format(format);
    } else {
      return moment(value).format(format);
    }
  }
}

export class ParseQueryParamDate {
  static transform(date: string, edge: TimeEdge) {
    const momentFormatPipe = new MomentFormatPipe();
    const nowFunc = momentFormatPipe.timezone === 'utc' ? moment.utc : moment;
    let parsedDate;
    // from=now

    if (date === undefined && edge === 'from') {
      return nowFunc().subtract(1, 'h');
    }
    if (date === undefined && edge === 'to') {
      return nowFunc();
    }

    if (date === 'now') {
      return nowFunc();
    }
    // from=now-5d&to=now-6M ... from=now/w&to=now/w
    if (date.length > 4 && date.startsWith('now')) {
      // let subtrahend = date.substr(4);
      // ex: ["now-7d/d", "now", "-", "7", "d", "/", "d"]
      const parts = date.match('(now)(-|/)?([0-9]*)([yMwdhms])(/)?([yMwdhms])?');

      if (parts[1] === 'now') {
        parsedDate = nowFunc();
      }
      if (parts[2] === '-') {
        parsedDate.subtract(parts[3], parts[4]);
      }
      if (parts[2] === '/') {
        if (edge === 'from') {
          return parsedDate.startOf(parts[4]);
        } else {
          return parsedDate.endOf(parts[4]);
        }
      }
      if (parts.length > 4 && parts[5] === '/') {
        if (edge === 'from') {
          return parsedDate.startOf(parts[6]);
        } else {
          return parsedDate.endOf(parts[6]);
        }
      }
    } else {
      // expect unix timestamp in milliseconds
      const isnum = /^\d+$/.test(date);
      if (isnum) {
        return nowFunc(parseInt(date, 10));
      } else {
        return nowFunc(date);
      }
    }
    return parsedDate;
  }
}
