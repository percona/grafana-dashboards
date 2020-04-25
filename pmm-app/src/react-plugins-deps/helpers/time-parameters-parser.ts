import moment from 'moment';

type TimeEdge = 'from' | 'to';

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

  transform(value: any, format = 'YYYY-MM-DD HH:mm:ss'): string | null {
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

      if (!parts) {
        const isnum = /^\d+$/.test(date);
        if (isnum) {
          return nowFunc(parseInt(date, 10));
        } else {
          return nowFunc(date);
        }
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
