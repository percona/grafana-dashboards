// eslint-disable-next-line no-undef
const { I, adminPage, pmmInventoryPage } = inject();

module.exports = {
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  usernameRDSMySQL: process.env.REMOTE_AWS_MYSQL_USER,
  passwordRDSMySQL: process.env.REMOTE_AWS_MYSQL_PASSWORD,

  // insert your locators and methods here
  // setting locators
  services: {
    mongodb: 'mongodb_remote_new',
    mysql: 'mysql_remote_new',
    postgresql: 'postgresql_remote_new',
    proxysql: 'proxysql_remote_new',
  },
  url: 'graph/d/pmm-add-instance/pmm-add-instance?orgId=1',
  addMySQLRemoteURL: 'graph/d/pmm-add-instance/pmm-add-instance?instance_type=mysql',
  rds: {
    'Service Name': 'rds-mysql56',
    Environment: 'RDS MySQL 5.6',
    'Replication Set': 'rds56-replication',
    Cluster: 'rds56-cluster',
  },
  fields: {
    accessKeyInput: '//input[@name="aws_access_key"]',
    addAWSRDSMySQLbtn: '$rds-instance',
    addInstanceDiv: '//div[@class="view"]',
    addInstancesList: '//nav[@class="navigation"]',
    addMongoDBRemote: '$mongodb-instance',
    addMySqlRemote: '$mysql-instance',
    addPostgreSQLRemote: '$postgresql-instance',
    addProxySQLRemote: '$proxysql-instance',
    addService: '#addInstance',
    availabilityZone: '//input[@placeholder="*Availability Zone"]',
    cluster: '#input-cluster-id',
    disableBasicMetrics: '//input[@name="disable_basic_metrics"]/following-sibling::span[2]',
    disableEnhancedMetrics: '//input[@name="disable_enhanced_metrics"]/following-sibling::span[2]',
    discoverBtn: '#addInstance',
    discoveryResults: 'tbody[role="rowgroup"]',
    discoveryRowWithId: '//tr/td[text()="',
    environment: '#input-environment-id',
    hostName: '#input-address-id',
    iframe: '//div[@class="panel-content"]//iframe',
    pageHeaderText: 'PMM Add Instance',
    password: '#input-password-id',
    portNumber: '#input-port-id',
    remoteInstanceTitle: 'Add instance',
    remoteInstanceTitleLocator: '//section/h3',
    replicationSet: '//input[contains(@placeholder, "Replication set")]',
    secretKeyInput: '//input[@name="aws_secret_key"]',
    serviceName: '#input-service_name-id',
    skipConnectionCheck: '//input[@name="skip_connection_check"]/following-sibling::span[2]',
    skipTLS: '//input[@name="tls_skip_verify"]',
    skipTLSL: '//input[@name="tls_skip_verify"]/following-sibling::span[2]',
    startMonitoring: '/following-sibling::td/a',
    usePerformanceSchema2: '//input[@name="qan_mysql_perfschema"]/following-sibling::span[2]',
    usePgStatMonitor: '//label[@for="qan_postgresql_pgstatmonitor_agent"]',
    usePgStatStatements: '//label[@for="qan_postgresql_pgstatements_agent"]',
    useQANMongoDBProfiler: '//input[@name="qan_mongodb_profiler"]',
    useTLS: '//input[@name="tls"]',
    userName: '#input-username-id',
  },

  waitUntilRemoteInstancesPageLoaded() {
    I.waitForElement(this.fields.addMySqlRemote, 30);
    I.seeElement(this.fields.addMySqlRemote);

    return this;
  },

  openAddRemotePage(instanceType) {
    // eslint-disable-next-line default-case
    switch (instanceType) {
      case 'mysql':
        I.click(this.fields.addMySqlRemote);
        break;
      case 'mongodb':
        I.click(this.fields.addMongoDBRemote);
        break;
      case 'postgresql':
        I.click(this.fields.addPostgreSQLRemote);
        break;
      case 'proxysql':
        I.click(this.fields.addProxySQLRemote);
        break;
    }
    I.waitForElement(this.fields.serviceName, 60);

    return this;
  },

  fillRemoteFields(serviceName) {
    // eslint-disable-next-line default-case
    switch (serviceName) {
      case this.services.mysql:
        I.fillField(this.fields.hostName, process.env.REMOTE_MYSQL_HOST);
        I.fillField(this.fields.userName, process.env.REMOTE_MYSQL_USER);
        I.fillField(this.fields.password, process.env.REMOTE_MYSQL_PASSWORD);
        I.appendField(this.fields.portNumber, '');
        I.pressKey(['Shift', 'Home']);
        I.pressKey('Backspace');
        I.fillField(this.fields.portNumber, '3307');
        I.fillField(this.fields.serviceName, serviceName);
        I.fillField(this.fields.environment, 'remote-mysql');
        I.fillField(this.fields.cluster, 'remote-mysql-cluster');
        break;
      case this.services.mongodb:
        I.fillField(this.fields.hostName, process.env.REMOTE_MONGODB_HOST);
        I.fillField(this.fields.userName, process.env.REMOTE_MONGODB_USER);
        I.fillField(this.fields.password, process.env.REMOTE_MONGODB_PASSWORD);
        I.fillField(this.fields.serviceName, serviceName);
        I.fillField(this.fields.environment, 'remote-mongodb');
        I.fillField(this.fields.cluster, 'remote-mongodb-cluster');
        break;
      case this.services.postgresql:
        I.fillField(this.fields.hostName, process.env.REMOTE_POSTGRESQL_HOST);
        I.fillField(this.fields.userName, process.env.REMOTE_POSTGRESQL_USER);
        I.fillField(this.fields.password, process.env.REMOTE_POSTGRESSQL_PASSWORD);
        I.fillField(this.fields.serviceName, serviceName);
        I.fillField(this.fields.environment, 'remote-postgres');
        I.fillField(this.fields.cluster, 'remote-postgres-cluster');
        break;
      case this.services.proxysql:
        I.fillField(this.fields.hostName, process.env.REMOTE_PROXYSQL_HOST);
        I.fillField(this.fields.userName, process.env.REMOTE_PROXYSQL_USER);
        I.fillField(this.fields.password, process.env.REMOTE_PROXYSQL_PASSWORD);
        I.fillField(this.fields.serviceName, serviceName);
        I.fillField(this.fields.environment, 'remote-proxysql');
        I.fillField(this.fields.cluster, 'remote-proxysql-cluster');
        break;
    }
    adminPage.peformPageDown(1);
  },

  createRemoteInstance(serviceName) {
    I.waitForVisible(this.fields.skipTLSL, 30);
    I.waitForVisible(this.fields.addService, 30);
    I.click(this.fields.skipTLSL);
    // eslint-disable-next-line default-case
    switch (serviceName) {
      case this.services.mongodb:
        I.click(this.fields.useTLS);
        I.click(this.fields.useQANMongoDBProfiler);
        break;
      case this.services.postgresql:
        I.click(this.fields.useTLS);
        I.click(this.fields.usePgStatStatements);
        break;
      case 'rds-mysql56':
        I.click(this.fields.disableEnhancedMetrics);
        I.click(this.fields.disableBasicMetrics);
        break;
    }
    I.click(this.fields.addService);
    I.waitForVisible(pmmInventoryPage.fields.agentsLink, 30);

    return pmmInventoryPage;
  },

  openAddAWSRDSMySQLPage() {
    I.click(this.fields.addAWSRDSMySQLbtn);
    I.waitForVisible(this.fields.accessKeyInput, 30);
    I.waitForVisible(this.fields.secretKeyInput, 30);
  },

  discoverRDS() {
    I.fillField(this.fields.accessKeyInput, this.accessKey);
    I.fillField(this.fields.secretKeyInput, this.secretKey);
    I.click(this.fields.discoverBtn);
    this.waitForDiscovery();
  },

  waitForDiscovery() {
    I.waitForVisible(this.fields.discoveryResults, 30);
  },

  verifyInstanceIsDiscovered(instanceIdToMonitor) {
    const instanceIdLocator = `${this.fields.discoveryRowWithId}${instanceIdToMonitor}"]`;

    I.seeElement(instanceIdLocator);
  },

  startMonitoringOfInstance(instanceIdToMonitor) {
    const instanceIdLocator = `${this.fields.discoveryRowWithId}${instanceIdToMonitor}"]`;
    const startMonitoringInstanceBtn = `${instanceIdLocator}${this.fields.startMonitoring}`;

    I.waitForVisible(instanceIdLocator, 30);
    I.click(startMonitoringInstanceBtn);
  },

  verifyAddInstancePageOpened() {
    I.waitForVisible(this.fields.userName, 30);
    I.seeElement(this.fields.userName);
  },

  fillRemoteRDSMySQLFields() {
    I.fillField(this.fields.userName, this.usernameRDSMySQL);
    I.fillField(this.fields.password, this.passwordRDSMySQL);
    I.fillField(this.fields.environment, 'RDS MySQL 5.6');
    I.fillField(this.fields.cluster, 'rds56-cluster');
    I.fillField(this.fields.replicationSet, 'rds56-replication');
    I.scrollPageToBottom();
  },
};
