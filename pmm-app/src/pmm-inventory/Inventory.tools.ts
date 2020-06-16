import { CustomLabel, ServicesList } from './Inventory.types';

interface FulfilledPromiseResult {
  status: 'fulfilled';
  value: any;
}

interface RejectedPromiseResult {
  status: 'rejected';
  reason: any;
}

type PromiseResult = FulfilledPromiseResult | RejectedPromiseResult;

export const processPromiseResults = (requests: Array<Promise<any>>): Promise<PromiseResult[]> =>
  Promise.all(
    requests.map(promise =>
      promise
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
        )
    )
  );

export const filterFulfilled = ({ status }: { status: PromiseResult['status'] }) => status === 'fulfilled';

interface Model {
  custom_labels: CustomLabel[];
  type: string;
  isDeleted: boolean;
}

const getModel = (params, type): Model => {
  const { custom_labels, ...rest } = params;
  const labels =
    custom_labels && Object.keys(custom_labels).length
      ? Object.entries<string>(custom_labels).map<CustomLabel>(([key, value]) => ({ key, value }))
      : [];
  return {
    custom_labels: labels,
    type,
    isDeleted: false,
    ...rest,
  };
};

const inventoryTypes = {
  amazon_rds_mysql: 'Amazon RDS MySQL',
  container: 'Container',
  external_exporter: 'External exporter',
  generic: 'Generic',
  mongodb_exporter: 'MongoDB exporter',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  mysqld_exporter: 'MySQL exporter',
  node_exporter: 'Node exporter',
  pmm_agent: 'PMM Agent',
  postgres_exporter: 'Postgres exporter',
  postgresql: 'PostgreSQL',
  proxysql_exporter: 'ProxySQL exporter',
  proxysql: 'ProxySQL',
  qan_mongodb_profiler_agent: 'QAN MongoDB Profiler Agent',
  qan_mysql_perfschema_agent: 'QAN MySQL Perfschema Agent',
  qan_mysql_slowlog_agent: 'QAN MySQL Slowlog Agent',
  qan_postgresql_pgstatements_agent: 'QAN PostgreSQL PgStatements Agent',
  rds_exporter: 'RDS exporter',
  remote_rds: 'Remote Amazon RDS',
  remote: 'Remote',
};

const generateStructure = (item: ServicesList) => {
  const addType = Object.keys(item).map(type => new Object({ type, params: item[type] }));
  const createParams = addType.map(agent =>
    agent['params'].map(arrItem => {
      const type = inventoryTypes[agent['type']] || '';
      return getModel(arrItem, type);
    })
  );
  return [].concat(...createParams);
};

export const InventoryDataService = { generateStructure };
