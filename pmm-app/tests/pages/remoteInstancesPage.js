let {I, adminPage, pmmInventoryPage} = inject();

module.exports = {

    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    usernameRDSMySQL: process.env.pmm-dev-mysql-remote-user,
    passwordRDSMySQL: process.env.pmm-dev-remote-password,

    // insert your locators and methods here
    // setting locators
    url: "graph/d/pmm-add-instance/pmm-add-instance?orgId=1",
    addMySQLRemoteURL: "graph/d/pmm-add-instance/pmm-add-instance?instance_type=mysql",
    dashboardMySQLOverviewWithFilters: 'graph/d/mysql-instance-overview/mysql-instances-overview?orgId=1&' +
        'from=now-5m&to=now&refresh=1m&var-interval=$__auto_interval_interval&var-region=us-east-1&var-environment=' +
        'RDS%20MySQL%205.6&var-cluster=rds56-cluster&var-replication_set=rds56-replication&var-node_name=rds-mysql56' +
        '&var-service_name=rds-mysql56&&var-az=us-east-1c&var-node_type=remote_rds&var-node_model=&var-database=All' +
        '&var-service_type=&var-schema=',
    fields: {
        pageHeaderText: "PMM Add Instance",
        iframe: "//div[@class='panel-content']//iframe",
        remoteInstanceTitleLocator: "//section[@class='content-wrapper']/h3",
        remoteInstanceTitle: "How to Add an Instance",
        addInstancesList: "//nav[@class='navigation']",
        addMongoDBRemote: "//a[contains(text(), 'Add a Remote MongoDB Instance')]",
        addMySqlRemote: "//a[contains(text(), 'Add a Remote MySQL Instance')]",
        hostName: "//input[contains(@placeholder,'*Hostname')]",
        serviceName: "//input[@placeholder='Service name (default: Hostname)']",
        portNumber: "//input[contains(@placeholder, 'Port')]",
        userName: "//input[contains(@placeholder, 'Username')]",
        password: "//input[contains(@placeholder, 'Password')]",
        environment: "//input[contains(@placeholder, 'Environment')]",
        cluster: "//input[contains(@placeholder, 'Cluster')]",
        replicationSet: "//input[contains(@placeholder, 'Replication set')]",
        addService: "#addInstance",
        skipTLS: "//input[@name='tls_skip_verify']",
        usePerformanceSchema: "//input[@name='qan_mysql_perfschema']",
        usePerformanceSchema2: "//input[@name='qan_mysql_perfschema']/following-sibling::span[2]",
        skipTLSL: "//input[@name='tls_skip_verify']/following-sibling::span[2]",
        availabilityZone: '//input[@placeholder="*Availability Zone"]',
        addInstanceDiv: "//div[@class='view']",
        addAWSRDSMySQLbtn: "//a[contains(text(), ' Add an AWS RDS MySQL or Aurora MySQL Instance')]",
        accessKeyInput: "//input[@name='aws_access_key']",
        secretKeyInput: "//input[@name='aws_secret_key']",
        discoverBtn: "#addInstance",
        discoveryResults: "//tbody[@class='ant-table-tbody']",
        discoveryRowWithId: "//tr/td[text()='",
        startMonitoring: "/following-sibling::td/a"

    },

    waitUntilOldRemoteInstancesPageLoaded() {
        I.waitForElement(this.fields.iframe, 60);
        I.switchTo(this.fields.iframe); // switch to first iframe
        I.waitForText(this.fields.remoteInstanceTitle, 60, this.fields.remoteInstanceTitleLocator);
        I.seeInTitle(this.fields.pageHeaderText);
        I.see(this.fields.remoteInstanceTitle, this.fields.remoteInstanceTitleLocator);
        return this;
    },

    waitUntilNewRemoteInstancesPageLoaded() {
        I.waitForText(this.fields.remoteInstanceTitle, 60, this.fields.remoteInstanceTitleLocator);
        I.seeInTitle(this.fields.pageHeaderText);
        I.see(this.fields.remoteInstanceTitle, this.fields.remoteInstanceTitleLocator);
        return this;
    },

    openAddRemoteMySQLPage() {
        I.click(this.fields.addMySqlRemote);
        I.waitForElement(this.fields.serviceName, 60);
        return this;
    },

    fillRemoteMySQLFields(serviceName) {
        I.waitForElement(this.fields.serviceName, 60);
        I.fillField(this.fields.hostName, process.env.REMOTE_MYSQL_HOST);
        I.fillField(this.fields.serviceName, serviceName);
        I.fillField(this.fields.userName, process.env.REMOTE_MYSQL_USER);
        I.fillField(this.fields.password, process.env.REMOTE_MYSQL_PASSWORD);
        I.fillField(this.fields.environment, "Remote Node MySQL");
        I.scrollPageToBottom();
        adminPage.peformPageDown(1);
    },

    createOldRemoteMySQL(serviceName) {
        this.fillRemoteMySQLFields(serviceName);
        I.click(this.fields.skipTLS);
        I.click(this.fields.usePerformanceSchema);
        I.click(this.fields.addService);
        I.waitForVisible(pmmInventoryPage.fields.iframe, 30);
        return pmmInventoryPage;
    },

    createNewRemoteMySQL() {
        I.waitForVisible(this.fields.skipTLSL, 30);
        I.waitForVisible(this.fields.addService, 30);
        I.click(this.fields.skipTLSL);
        I.click(this.fields.addService);
        I.waitForVisible(pmmInventoryPage.fields.agentsLink, 30);
        I.waitForClickable(pmmInventoryPage.fields.agentsLink, 30);
        return pmmInventoryPage;
    },

    createRemoteMySQL(serviceName, version) {
        if (version == "old") {
            this.createOldRemoteMySQL(serviceName);
        } else if (version == "new") {
            this.createNewRemoteMySQL(serviceName);
        }
        return pmmInventoryPage;

    },

    openAddAWSRDSMySQLPage () {
        I.click(this.fields.addAWSRDSMySQLbtn);
        I.waitForVisible(this.fields.accessKeyInput, 30);
        I.waitForVisible(this.fields.secretKeyInput, 30);
        I.waitForClickable(this.fields.discoverBtn, 30);
    },

    discoverRDS () {
        I.fillField(this.fields.accessKeyInput, this.accessKey);
        I.fillField(this.fields.secretKeyInput, this.secretKey);
        I.click(this.fields.discoverBtn);
        this.waitForDiscovery();
    },

    waitForDiscovery () {
        I.waitForVisible(this.fields.discoveryResults, 30);
    },

    verifyInstanceIsDiscovered (instanceIdToMonitor) {
        let instanceIdLocator = `${this.fields.discoveryRowWithId}${instanceIdToMonitor}']`;
        I.seeElement(instanceIdLocator);
    },

    startMonitoringOfInstance(instanceIdToMonitor) {
        let instanceIdLocator = `${this.fields.discoveryRowWithId}${instanceIdToMonitor}']`;
        let startMonitoringInstanceBtn = `${instanceIdLocator}${this.fields.startMonitoring}`;
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
    }
}
