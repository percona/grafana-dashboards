export const processPromiseResults = (requests: Array<Promise<any>>) =>
  Promise.all(
    requests.map(promise =>
      promise
        .then(value => ({
          status: 'fulfilled',
          value,
        }))
        .catch(reason => ({
          status: 'rejected',
          reason,
        }))
    )
  );

export const filterFulfilled = ({ status }: { status: string }) => status === 'fulfilled';
