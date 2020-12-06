import { humanize } from './Humanization';

describe('Humanize', () => {
  it('should return 0 if input is zero', () => {
    const result = humanize.parseTime(0);

    expect(result).toBe('0');
  });

  it('should return 20.00 sec if input is more than 1 and less than 60', () => {
    const result = humanize.parseTime(20);

    expect(result).toBe('20.00 sec');
  });

  it('should return 0:01:00 if input is more or equal 60', () => {
    const result = humanize.parseTime(60);

    expect(result).toBe('0:01:00');
  });

  it('should return 1 days, 0:01:40 if input is more than 86400', () => {
    const result = humanize.parseTime(86500);

    expect(result).toBe('1 days, 0:01:40');
  });

  it('should return 20.00 ms if input is less than 1', () => {
    const result = humanize.parseTime(0.02);

    expect(result).toBe('20.00 ms');
  });

  it('should return -1000000.00 µs if input is negative value', () => {
    const result = humanize.parseTime(-1);

    expect(result).toBe('-1000000.00 µs');
  });

  it('should return 0 if input is null', () => {
    const result = humanize.transform(null, 'time');

    expect(result).toBe('0');
  });

  it('should return 2.00 sec  if input is 2 and name is undefined', () => {
    const result = humanize.transform(2, undefined);

    expect(result).toBe('2.00 sec');
  });

  it('should return -1000000.00 µs if input is negative value', () => {
    const result = humanize.transform(2, 'time');

    expect(result).toBe('2.00 sec');
  });

  it('should return <1.00 µs if input is less than 0.00001', () => {
    const result = humanize.transform(0.000001, 'time');

    expect(result).toBe('<1.00 µs');
  });

  it('should return 2.00 Bytes if input is 2 and name is size', () => {
    const result = humanize.transform(2, 'size');

    expect(result).toBe('2.00 Bytes');
  });

  it('should return <0.01 Bytes if input is 0.001 and name is size', () => {
    const result = humanize.transform(0.001, 'size');

    expect(result).toBe('<0.01 Bytes');
  });

  it('should return <0.01 if input is 0.001 and name is number', () => {
    const result = humanize.transform(0.001, 'number');

    expect(result).toBe('<0.01');
  });

  it('should return 2.00 if input is 2 and name is number', () => {
    const result = humanize.transform(2, 'number');

    expect(result).toBe('2.00');
  });

  it('should return 200% if input is 2 and name is percent', () => {
    const result = humanize.transform(2, 'percent');

    expect(result).toBe('200%');
  });

  it('should return 200.23% if input is 2.0023 and name is percent', () => {
    const result = humanize.transform(2.0023, 'percent');

    expect(result).toBe('200.23%');
  });

  it('should return 200.2% if input is 2.002 and name is percent', () => {
    const result = humanize.transform(2.002, 'percent');

    expect(result).toBe('200.20%');
  });

  it('should return <0.01% if input is 0.0000001 and name is percent', () => {
    const result = humanize.transform(0.0000001, 'percent');

    expect(result).toBe('<0.01%');
  });

  it('should return 76% if input is 0.7564 and name is percentRounded', () => {
    const result = humanize.transform(0.7564, 'percentRounded');

    expect(result).toBe('76%');
  });

  it('should return 75% if input is 0.753 and name is percentRounded', () => {
    const result = humanize.transform(0.753, 'percentRounded');

    expect(result).toBe('75%');
  });

  it('should return 1% if input is 0.01 and name is percentRounded', () => {
    const result = humanize.transform(0.01, 'percentRounded');

    expect(result).toBe('1%');
  });

  it('should return <0.01% if input is 0.0000001 and name is percentRounded', () => {
    const result = humanize.transform(0.0000001, 'percentRounded');

    expect(result).toBe('<0.01%');
  });

  it('should return <0.01 if input is 0.001', () => {
    const result = humanize.transform(0.001, '');

    expect(result).toBe('<0.01');
  });

  it('should return 2.00  if input is 2', () => {
    const result = humanize.transform(2, '');

    expect(result).toBe('2.00 ');
  });
});
