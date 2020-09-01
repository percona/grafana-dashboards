import {
  processPromiseResults,
  filterFulfilled,
  filterRejected,
  FulfilledPromiseResult,
  RejectedPromiseResult
} from './promises';

describe('processPromiseResults::', () => {
  it('should return array of fulfilled promise results', async () => {
    const requests = [
      Promise.resolve(),
      Promise.resolve()
    ];
    const results = await processPromiseResults(requests);

    expect(results.map(filterFulfilled).length).toBe(2);
  });
  it('should return one fulfilled promise and two rejected', async () => {
    const requests = [
      Promise.reject(),
      Promise.resolve(),
      Promise.reject()
    ];
    const results = await processPromiseResults(requests);

    expect(results.filter(filterFulfilled).length).toBe(1);
    expect(results.filter(filterRejected).length).toBe(2);
  });
  it('should return one fulfilled promise with value', async () => {
    const requests = [
      Promise.resolve('done')
    ];
    const results = await processPromiseResults(requests);
    const fulfilled = results.filter(filterFulfilled);

    expect((fulfilled[0] as FulfilledPromiseResult).value).toBe('done');
    expect(results.length).toBe(1);
  });
  it('should return two rejected promises with value', async () => {
    const requests = [
      Promise.reject('rejected 1'),
      Promise.reject('rejected 2'),
    ];
    const results = await processPromiseResults(requests);
    const rejected = results.filter(filterRejected) as RejectedPromiseResult[];

    expect(rejected[0].reason).toBe('rejected 1');
    expect(rejected[1].reason).toBe('rejected 2');
    expect(results.length).toBe(2);
  });
  it('should return array empty array', async () => {
    const requests = [];
    const results = await processPromiseResults(requests);

    expect(results.length).toBe(0);
  });
});
