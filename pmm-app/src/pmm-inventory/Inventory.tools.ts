import { CustomLabel, ServicesList } from './Inventory.types';
import { inventoryTypes } from './Inventory.constants';

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

interface Model {
  custom_labels: CustomLabel[];
  type: string;
  isDeleted: boolean;
}

const getModel = (params, type): Model => {
  const { custom_labels, ...rest } = params;
  const labels = custom_labels && Object.keys(custom_labels).length
    ? Object.entries<string>(custom_labels).map<CustomLabel>(([key, value]) => ({ key, value }))
    : [];

  return {
    custom_labels: labels,
    type,
    isDeleted: false,
    ...rest,
  };
};

const generateStructure = (item: ServicesList) => {
  const addType = Object.keys(item).map((type) => ({ type, params: item[type] }));
  const createParams = addType.map((agent) => agent.params.map((arrItem) => {
    const type = inventoryTypes[agent.type] || '';

    return getModel(arrItem, type);
  }));

  return [].concat(...createParams);
};

export const InventoryDataService = { generateStructure };
