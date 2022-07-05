import MockDate from 'mockdate';
import { ParseQueryParamDate } from './time-parameters-parser';

MockDate.set('2020-11-22');

describe('Time parameters parser::', () => {
  // it('date is undefined, from', () => {
  //   const result = ParseQueryParamDate.transform(undefined, 'from');
  //
  //   expect(result.toISOString()).toEqual('2020-11-21T23:00:00.000Z');
  // });
  //
  // it('date is undefined, to', () => {
  //   const result = ParseQueryParamDate.transform(undefined, 'to');
  //
  //   expect(result.toISOString()).toStrictEqual('2020-11-22T00:00:00.000Z');
  // });

  it('date is a unix timestamp', () => {
    const result = ParseQueryParamDate.transform('123456789000', 'to');

    expect(result.format('YYYY-MM-DDTHH:mm:ss.000')).toStrictEqual('1973-11-29T21:33:09.000');
  });

  it('Relative dates', () => {
    const result1 = ParseQueryParamDate.transform('now-7d/m', 'to');
    const result2 = ParseQueryParamDate.transform('now/d', 'to');
    const result3 = ParseQueryParamDate.transform('now/d', 'from');

    expect(result1.format('YYYY-MM-DDTHH:mm:ss.000')).toStrictEqual('2020-11-14T23:59:59.000');
    expect(result2.format('YYYY-MM-DDTHH:mm:ss.000')).toStrictEqual('2020-11-22T23:58:59.000');
    expect(result3.format('YYYY-MM-DDTHH:mm:ss.000')).toStrictEqual('2020-11-21T23:59:00.000');
  });

  it('date is now', () => {
    const result1 = ParseQueryParamDate.transform('now');

    expect(result1.toISOString()).toStrictEqual('2020-11-21T23:59:00.000Z');
  });

  it('date is incorrect', () => {
    const result1 = ParseQueryParamDate.transform('6h', 'from');
    const result2 = ParseQueryParamDate.transform('6h', 'to');

    expect(result1.toISOString()).toStrictEqual('2020-11-21T23:00:00.000Z');
    expect(result2.toISOString()).toStrictEqual('2020-11-22T00:00:00.000Z');
  });
});
