import { Humanize } from './humanize';

describe('Humanize', () => {
    it('should return 0 if input is zero', () => {
        const result = Humanize.parceTime(0);
        expect(result).toBe('0');
    });

    it('should return 20.00 sec if input is more than 1 and less than 60', () => {
        const result = Humanize.parceTime(20);
        expect(result).toBe('20.00 sec');
    });

    it('should return 0:01:00 if input is more or equal 60', () => {
        const result = Humanize.parceTime(60);
        expect(result).toBe('0:01:00');
    });

    it('should return 1 days, 0:01:40 if input is more than 86400', () => {
        const result = Humanize.parceTime(86500);
        expect(result).toBe('1 days, 0:01:40');
    });

    it('should return 20.00 ms if input is less than 1', () => {
        const result = Humanize.parceTime(0.02);
        expect(result).toBe('20.00 ms');
    });

    it('should return -1000000.00 µs if input is negative value', () => {
        const result = Humanize.parceTime(-1);
        expect(result).toBe('-1000000.00 µs');
    });

    it('should return 0 if input is null', () => {
        const result = Humanize.transform(null, 'time');
        expect(result).toBe('0');
    });

    it('should return 2.00 sec  if input is 2 and name is undefined', () => {
        const result = Humanize.transform(2, undefined);
        expect(result).toBe('2.00 sec');
    });

    it('should return -1000000.00 µs if input is negative value', () => {
        const result = Humanize.transform(2, 'time');
        expect(result).toBe('2.00 sec');
    });

    it('should return <1.00 µs if input is less than 0.00001', () => {
        const result = Humanize.transform(0.000001, 'time');
        expect(result).toBe('<1.00 µs');
    });

    it('should return 2.00 Bytes if input is 2 and name is size', () => {
        const result = Humanize.transform(2, 'size');
        expect(result).toBe('2.00 Bytes');
    });

    it('should return <0.01 Bytes if input is 0.001 and name is size', () => {
        const result = Humanize.transform(0.001, 'size');
        expect(result).toBe('<0.01 Bytes');
    });

    it('should return <0.01 if input is 0.001 and name is number', () => {
        const result = Humanize.transform(0.001, 'number');
        expect(result).toBe('<0.01');
    });

    it('should return 2.00 if input is 2 and name is number', () => {
        const result = Humanize.transform(2, 'number');
        expect(result).toBe('2.00');
    });

    it('should return 200.00% if input is 2 and name is percent', () => {
        const result = Humanize.transform(2, 'percent');
        expect(result).toBe('200.00%');
    });

    it('should return <0.01 if input is 0.0000001 and name is percent', () => {
        const result = Humanize.transform(0.0000001, 'percent');
        expect(result).toBe('<0.01');
    });

    it('should return <0.01 if input is 0.001', () => {
        const result = Humanize.transform(0.001, '');
        expect(result).toBe('<0.01');
    });

    it('should return 2.00  if input is 2', () => {
        const result = Humanize.transform(2, '');
        expect(result).toBe('2.00 ');
    });
});
