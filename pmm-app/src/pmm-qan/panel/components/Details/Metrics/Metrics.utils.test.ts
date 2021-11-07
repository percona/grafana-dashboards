import { formatMilliseconds, formatRange } from './Metrics.utils';

describe('Metrics.utils::', () => {
  it('formatRange', () => {
    expect(formatRange('(0 - 30)')).toBe('0ms - 30ms');
    expect(formatRange('(300 - 1000)')).toBe('300ms - 1s');
    expect(formatRange('(300 - 1000)')).toBe('300ms - 1s');
    expect(formatRange('(10000 - 43700)')).toBe('10s - 44s');
  });

  it('formatMilliseconds', () => {
    expect(formatMilliseconds('300')).toBe('300ms');
    expect(formatMilliseconds('312')).toBe('312ms');
    expect(formatMilliseconds('1000')).toBe('1s');
    expect(formatMilliseconds('1200')).toBe('1s');
    expect(formatMilliseconds('1600')).toBe('2s');
    expect(formatMilliseconds('31622')).toBe('32s');
  });
});
