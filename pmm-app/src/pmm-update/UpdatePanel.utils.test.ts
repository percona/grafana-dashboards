import { formatDate, formatDateWithTime } from './UpdatePanel.utils';
import { ISOTimestamp } from 'pmm-update/types';

describe('UpdatePanel utils', () => {
  const timestamp = '2020-06-08T19:16:57Z';

  it('should format an ISO 8601 timestamp correctly as date without time', () => {
    expect(formatDate(timestamp as ISOTimestamp)).toBe('June 08');
  });
  it('should format an ISO 8601 timestamp correctly as date with time', () => {
    expect(formatDateWithTime(timestamp as ISOTimestamp)).toBe('June 08, 19:16');
  });
});
