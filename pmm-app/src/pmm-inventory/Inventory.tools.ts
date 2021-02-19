import { orderBy } from 'lodash';
import { CustomLabel, InventoryList, ServicesList } from './Inventory.types';
import { inventoryTypes } from './Inventory.constants';

interface Model {
  custom_labels: CustomLabel[];
  type: string;
  isDeleted: boolean;
  [key: string]: any;
}

const getParams = (params, type): Model => {
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

const getModel = (item: ServicesList) => {
  const addType = Object.keys(item).map((type) => ({ type, params: item[type] }));

  return addType.map((agent) => agent.params.map(
    (arrItem): Model => {
      const transformAgentType = (type) => type.replace(/^\w/, (c) => c.toUpperCase()).replace(/[_-]/g, ' ');
      const type = inventoryTypes[agent.type] || transformAgentType(agent.type);

      return getParams(arrItem, type);
    },
  ));
};

const getServiceModel = (item: InventoryList) => {
  const createParams = getModel(item);

  return orderBy(
    [].concat(...createParams),
    [(service: Model) => (service.service_name || '').toLowerCase()],
    ['asc'],
  );
};

const getNodeModel = (item: InventoryList) => {
  const createParams = getModel(item);

  return orderBy(
    [].concat(...createParams),
    [(node: Model) => (node.node_name || '').toLowerCase()],
    ['asc'],
  );
};

const getAgentModel = (item: InventoryList) => {
  const createParams = getModel(item);

  return orderBy([].concat(...createParams), [(agent: Model) => (agent.type || '').toLowerCase()], ['asc']);
};

export const InventoryDataService = {
  getServiceModel,
  getAgentModel,
  getNodeModel,
};
