import { ServicesList, CustomLabel } from './Inventory.types';

export class CommonModel {
  custom_labels: CustomLabel[];
  type: string;
  isDeleted: boolean;

  constructor(params, type) {
    const { custom_labels, ...rest } = params;
    this.custom_labels =
      custom_labels && Object.keys(custom_labels).length
        ? Object.entries<string>(custom_labels).map<CustomLabel>(([key, value]) => ({ key, value }))
        : [];
    this.type = type;
    this.isDeleted = false;
    Object.keys(rest).forEach(param => {
      this[param] = rest[param];
    });
  }
}

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
  qan_mongodb_profiler_agent: 'Qan MongoDB Profiler Agent',
  qan_mysql_perfschema_agent: 'Qan MySQL Perfschema Agent',
  qan_mysql_slowlog_agent: 'Qan MySQL Slowlog Agent',
  qan_postgresql_pgstatements_agent: 'QAN PostgreSQL PgStatements Agent',
  rds_exporter: 'RDS exporter',
  remote_rds: 'Remote Amazon RDS',
  remote: 'Remote',
};

export const InventoryDataService = {
  generateStructure(item: ServicesList) {
    const createParams = Object.keys(item)
      .map(type => ({ type, params: item[type] }))
      .map(agent =>
        agent.params.map(arrItem => {
          const type = inventoryTypes[agent.type] || '';
          return new CommonModel(arrItem, type);
        })
      );
    return [].concat(...createParams);
  },
};
