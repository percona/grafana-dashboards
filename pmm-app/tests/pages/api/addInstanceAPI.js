const assert = require('assert');

const { I } = inject();

module.exports = {
  // methods for preparing state of an application before test
  clusterNames: {
    mysql: 'mysql_clstr',
    postgresql: 'pgsql_clstr',
    proxysql: 'proxy_clstr',
    mongodb: 'mongo_clstr',
    rds: 'rdsmsql_clstr',
  },

  instanceTypes: {
    mysql: 'MySQL',
    postgresql: 'PostgreSQL',
    mongodb: 'MongoDB',
    proxysql: 'ProxySQL',
    rds: 'RDS',
  },

  async apiAddInstance(type, serviceName) {
    switch (type) {
      case this.instanceTypes.mongodb:
        return this.addMongodb(serviceName);
      case this.instanceTypes.mysql:
        return this.addMysql(serviceName);
      case this.instanceTypes.proxysql:
        return this.addProxysql(serviceName);
      case this.instanceTypes.postgresql:
        return this.addPostgresql(serviceName);
      case this.instanceTypes.rds:
        return this.addRDS(serviceName);
      default:
        throw new Error('Unknown instance type');
    }
  },

  async addMysql(serviceName) {
    const body = {
      add_node: {
        node_name: serviceName,
        node_type: 'REMOTE_NODE',
      },
      port: 3307,
      qan_mysql_perfschema: true,
      address: process.env.REMOTE_MYSQL_HOST,
      service_name: serviceName,
      username: process.env.REMOTE_MYSQL_USER,
      password: process.env.REMOTE_MYSQL_PASSWORD,
      cluster: this.clusterNames.mysql,
      engine: 'DISCOVER_RDS_MYSQL',
      pmm_agent_id: 'pmm-server',
    };

    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('/v1/management/MySQL/Add', body, headers);

    assert.equal(resp.status, 200, `Instance ${serviceName} was not added for monitoring`);
  },

  async addPostgresql(serviceName) {
    const body = {
      add_node: {
        node_name: serviceName,
        node_type: 'REMOTE_NODE',
      },
      port: 5432,
      address: process.env.REMOTE_POSTGRESQL_HOST,
      service_name: serviceName,
      username: process.env.REMOTE_POSTGRESQL_USER,
      password: process.env.REMOTE_POSTGRESSQL_PASSWORD,
      cluster: this.clusterNames.postgresql,
      pmm_agent_id: 'pmm-server',
      qan_postgresql_pgstatements_agent: true,
      tls_skip_verify: true,
      tls: true,
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/PostgreSQL/Add', body, headers);

    assert.equal(resp.status, 200, `Instance ${serviceName} was not added for monitoring`);
  },

  async addProxysql(serviceName) {
    const body = {
      add_node: {
        node_name: serviceName,
        node_type: 'REMOTE_NODE',
      },
      port: 6032,
      address: process.env.REMOTE_PROXYSQL_HOST,
      service_name: serviceName,
      username: process.env.REMOTE_PROXYSQL_USER,
      password: process.env.REMOTE_PROXYSQL_PASSWORD,
      cluster: this.clusterNames.proxysql,
      pmm_agent_id: 'pmm-server',
      tls_skip_verify: true,
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ProxySQL/Add', body, headers);

    assert.equal(resp.status, 200, `Instance ${serviceName} was not added for monitoring`);
  },

  async addMongodb(serviceName) {
    const body = {
      add_node: {
        node_name: serviceName,
        node_type: 'REMOTE_NODE',
      },
      port: 27017,
      address: process.env.REMOTE_MONGODB_HOST,
      service_name: serviceName,
      username: process.env.REMOTE_MONGODB_USER,
      password: process.env.REMOTE_MONGODB_PASSWORD,
      cluster: this.clusterNames.mongodb,
      pmm_agent_id: 'pmm-server',
      qan_mongodb_profiler: true,
      tls: true,
      tls_skip_verify: true,
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/MongoDB/Add', body, headers);

    assert.equal(resp.status, 200, `Instance ${serviceName} was not added for monitoring`);
  },

  async addRDS(serviceName) {
    const body = {
      add_node: {
        node_name: serviceName,
        node_type: 'REMOTE_NODE',
      },
      address: process.env.REMOTE_AWS_MYSQL57_HOST,
      aws_access_key: process.env.AWS_ACCESS_KEY_ID,
      aws_secret_key: process.env.AWS_SECRET_ACCESS_KEY,
      service_name: serviceName,
      username: process.env.REMOTE_AWS_MYSQL_USER,
      password: process.env.REMOTE_AWS_MYSQL_PASSWORD,
      az: 'us-east-1c',
      cluster: this.clusterNames.rds,
      engine: 'DISCOVER_RDS_MYSQL',
      instance_id: 'rds-mysql57',
      isRDS: true,
      pmm_agent_id: 'pmm-server',
      port: 3306,
      qan_mysql_perfschema: true,
      rds_exporter: true,
      region: 'us-east-1',
      replication_set: 'rds_mysql_repl',
      tls_skip_verify: true,
      disable_basic_metrics: true,
      disable_enhanced_metrics: true,
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/RDS/Add', body, headers);

    assert.equal(resp.status, 200, `Instance ${serviceName} was not added for monitoring`);
  },
};
