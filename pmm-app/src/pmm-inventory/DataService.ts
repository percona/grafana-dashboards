/* tslint:disable */
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
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    const { custom_labels, ...rest } = params;
    this.custom_labels =
      custom_labels && Object.keys(custom_labels).length ? Object.entries(custom_labels).map(item => new CustomLabelsModel(item)) : [];
    this.agentType = type;
    this.isDeleted = false;
    Object.keys(rest).forEach(param => {
      this[param] = rest[param];
    });
  }
}

export class InventoryDataService {
  constructor() {}

  static generateStructure(item) {
    const addAgentType = Object.keys(item).map(agentType => new Object({ agentType: agentType, params: item[agentType] }));
    const createParams = addAgentType.map(agent =>
      agent['params'].map(arrItem => new CommonModel(arrItem, InventoryDataService.getType(agent['agentType'])))
    );
    return [].concat(...createParams);
  }

  static getType(type) {
    switch (type) {
      case 'external_exporter':
        return 'External exporter';
      case 'mongodb_exporter':
        return 'MongoDB exporter';
      case 'mysqld_exporter':
        return 'MySQL exporter';
      case 'postgres_exporter':
        return 'Postgres exporter';
      case 'proxysql_exporter':
        return 'ProxySQL exporter';
      case 'node_exporter':
        return 'Node exporter';
      case 'pmm_agent':
        return 'PMM Agent';
      case 'qan_mongodb_profiler_agent':
        return 'Qan MongoDB Profiler Agent';
      case 'qan_mysql_perfschema_agent':
        return 'Qan MySQL Perfschema Agent';
      case 'qan_mysql_slowlog_agent':
        return 'Qan MySQL Slowlog Agent';
      case 'qan_postgresql_pgstatements_agent':
        return 'QAN PostgreSQL PgStatements Agent';
      case 'rds_exporter':
        return 'RDS exporter';
      case 'container':
        return 'Container';
      case 'generic':
        return 'Generic';
      case 'remote':
        return 'Remote';
      case 'remote_rds':
        return 'Remote Amazon RDS';
      case 'amazon_rds_mysql':
        return 'Amazon RDS MySQL';
      case 'mongodb':
        return 'MongoDB';
      case 'mysql':
        return 'MySQL';
      case 'postgresql':
        return 'PostgreSQL';
      case 'proxysql':
        return 'ProxySQL';
      default:
        return '';
    }
  }
}
