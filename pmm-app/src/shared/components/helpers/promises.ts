interface FulfilledPromiseResult {
  status: 'fulfilled';
  value: any;
}

interface RejectedPromiseResult {
  status: 'rejected';
  reason: any;
}

type PromiseResult = FulfilledPromiseResult | RejectedPromiseResult;

export const processPromiseResults = (requests: Array<Promise<any>>): Promise<PromiseResult[]> => Promise.all(
  requests.map((promise) => promise
    .then(
      (value): FulfilledPromiseResult => ({
        status: 'fulfilled',
        value,
      })
    )
    .catch(
      (reason): RejectedPromiseResult => ({
        status: 'rejected',
        reason,
      })
    ))
);

export const filterFulfilled = ({ status }: { status: PromiseResult['status'] }) => status === 'fulfilled';
