Feature('To verify monitoried AWS RDS Db instance');

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open Remote Instances Page and verify Discovery and Adding AWS RDS MySQL 5.6 instance', async (I, remoteInstancesPage, pmmInventoryPage) => {
    let instanceIdToMonitor = "rds-mysql56";
    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilNewRemoteInstancesPageLoaded()
        .openAddAWSRDSMySQLPage();
    remoteInstancesPage.discoverRDS();
    remoteInstancesPage.verifyInstanceIsDiscovered(instanceIdToMonitor);
    remoteInstancesPage.startMonitoringOfInstance(instanceIdToMonitor);
    remoteInstancesPage.verifyAddInstancePageOpened();
    remoteInstancesPage.fillRemoteRDSMySQLFields();
    remoteInstancesPage.createNewRemoteMySQL();
    pmmInventoryPage.verifyMySQLRemoteServiceIsDisplayed(instanceIdToMonitor);
    await pmmInventoryPage.verifyAgentHasStatusRunning(instanceIdToMonitor);
});

Scenario('Open Inventory Page and verify AWS RDS MySQL 5.6 instance has status running @pmm-post-update', async (I, remoteInstancesPage, pmmInventoryPage) => {
    let serviceName = 'rds-mysql56';
    I.amOnPage(pmmInventoryPage.url);
    pmmInventoryPage.verifyMySQLRemoteServiceIsDisplayed(serviceName);
    await pmmInventoryPage.verifyAgentHasStatusRunning(serviceName);
});

Scenario('Verify QAN Filters contain AWS RDS MySQL 5.6 after it was added for monitoring', async (I, qanPage, adminPage) => {
    let environment = 'RDS MySQL 5.6';
    let filter = qanPage.getFilterLocator(environment);
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    adminPage.applyTimer("5m");
    await I.switchTo(qanPage.fields.iframe);
    qanPage.waitForQANPageLoaded();
    I.seeElement(filter);
});

xScenario('Verify MySQL Instances Overview Dashboard for AWS RDS MySQL 5.6 data after it was added for monitoring', async (I, remoteInstancesPage, dashboardPage) => {
    I.amOnPage(remoteInstancesPage.dashboardMySQLOverviewWithFilters);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyThereIsNoGraphsWithNA();
});
