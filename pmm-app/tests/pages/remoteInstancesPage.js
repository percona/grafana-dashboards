let {I, adminPage, pmmInventoryPage} = inject();

let suffix;
module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/pmm-add-instance/pmm-add-instance?orgId=1",
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
        addService: "#addInstance",
        skipTLS: "//input[@name='tls_skip_verify']",
        usePerformanceSchema: "//input[@name='qan_mysql_perfschema']",
        usePerformanceSchema2: "//input[@name='qan_mysql_perfschema']/following-sibling::span[2]",
        skipTLSL: "//input[@name='tls_skip_verify']/following-sibling::span[2]",
        availabilityZone: '//input[@placeholder="*Availability Zone"]',
        addInstanceDiv: "//div[@class='view']"
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

    async createOldRemoteMySQL(serviceName) {
        this.fillRemoteMySQLFields(serviceName);
        I.click(this.fields.skipTLS);
        I.click(this.fields.usePerformanceSchema);
        I.click(this.fields.addService);
        I.waitForVisible(pmmInventoryPage.fields.iframe, 30);
        return pmmInventoryPage;
    },

    createNewRemoteMySQL(serviceName) {
        this.fillRemoteMySQLFields(serviceName);
        I.waitForVisible(this.fields.skipTLSL, 30);
        I.waitForVisible(this.fields.addService, 30);
        I.click(this.fields.skipTLSL);
        I.click(this.fields.addService);
        I.waitForVisible(pmmInventoryPage.fields.agentsLink, 30);
        I.waitForClickable(pmmInventoryPage.fields.agentsLink, 30);
        return pmmInventoryPage;
    },

    async createRemoteMySQL(serviceName, version) {
        if (version == "old") {
            await this.createOldRemoteMySQL(serviceName);
        } else if (version == "new") {
            this.createNewRemoteMySQL(serviceName);
        }
        return pmmInventoryPage;

    }
}
