/* eslint-disable */
// Will be refactored in PMM-544
export class CustomLabelsModel {
  key: string;

  value: string;

  constructor(customLabel) {
    this.key = customLabel[0];
    this.value = customLabel[1];
  }
}

export class CommonModel {
  custom_labels: CustomLabelsModel[];

  type: string;

  isDeleted: boolean;

  constructor(params, type) {
    const { custom_labels, ...rest } = params;
    this.custom_labels = custom_labels && Object.keys(custom_labels).length
      ? Object.entries(custom_labels).map((item) => new CustomLabelsModel(item))
      : [];
    this.type = type;
    this.isDeleted = false;
    Object.keys(rest).forEach((param) => {
      this[param] = rest[param];
    });
  }
}

const inventoryTypes = {
  external_exporter: 'External exporter',
  mongodb_exporter: 'MongoDB exporter',
  mysqld_exporter: 'MySQL exporter',
  postgres_exporter: 'Postgres exporter',
  proxysql_exporter: 'ProxySQL exporter',
  node_exporter: 'Node exporter',
  pmm_agent: 'PMM Agent',
  qan_mongodb_profiler_agent: 'Qan MongoDB Profiler Agent',
  qan_mysql_perfschema_agent: 'Qan MySQL Perfschema Agent',
  qan_mysql_slowlog_agent: 'Qan MySQL Slowlog Agent',
  qan_postgresql_pgstatements_agent: 'QAN PostgreSQL PgStatements Agent',
  rds_exporter: 'RDS exporter',
  container: 'Container',
  generic: 'Generic',
  remote: 'Remote',
  remote_rds: 'Remote Amazon RDS',
  amazon_rds_mysql: 'Amazon RDS MySQL',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  proxysql: 'ProxySQL',
};
export class InventoryDataService {
  constructor() {}

  static generateStructure(item) {
    const addType = Object.keys(item).map((type) => new Object({ type, params: item[type] }));
    const createParams = addType.map((agent) => agent.params.map((arrItem) => {
      const type = inventoryTypes[agent.type] || '';
      return new CommonModel(arrItem, type);
    }));
    return [].concat(...createParams);
  }
}
