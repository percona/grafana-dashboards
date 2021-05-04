import { ISOTimestamp } from 'pmm-update/types';
import { formatDateWithYear, formatDateWithTime } from './UpdatePanel.utils';

describe('UpdatePanel utils', () => {
  const timestamp1 = '2020-06-08T19:16:57Z';
  const timestamp2 = '2020-06-08T03:06:57+03:00';
  const timestamp3 = '2020-06-08T03:06:57+03:30';
  const timestamp4 = '2021-04-06T00:00:00Z';

  it('should format an ISO 8601 timestamp correctly as date without time', () => {
    expect(formatDateWithYear(timestamp1 as ISOTimestamp)).toBe('June 08, 2020');
    expect(formatDateWithYear(timestamp2 as ISOTimestamp)).toBe('June 08, 2020');
    expect(formatDateWithYear(timestamp3 as ISOTimestamp)).toBe('June 07, 2020');
    expect(formatDateWithYear(timestamp4 as ISOTimestamp)).toBe('April 06, 2021');
  });
  it('should format an ISO 8601 timestamp correctly as date with time', () => {
    expect(formatDateWithTime(timestamp1 as ISOTimestamp)).toBe('June 08, 19:16');
    expect(formatDateWithTime(timestamp2 as ISOTimestamp)).toBe('June 08, 0:06');
    expect(formatDateWithTime(timestamp3 as ISOTimestamp)).toBe('June 07, 23:36');
    expect(formatDateWithTime(timestamp4 as ISOTimestamp)).toBe('April 06, 0:00');
  });
});
