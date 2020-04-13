Feature('Monitoring AWS RDS MySQL DB');

Before( async (I) => {
  I.Authorize();
});

xScenario(
  'Verify Discovery and adding AWS RDS MySQL 5.6 instance for monitoring',
  async (I, remoteInstancesPage, pmmInventoryPage) => {
    const instanceIdToMonitor = 'rds-mysql56';
    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilNewRemoteInstancesPageLoaded().openAddAWSRDSMySQLPage();
    remoteInstancesPage.discoverRDS();
    remoteInstancesPage.verifyInstanceIsDiscovered(instanceIdToMonitor);
    remoteInstancesPage.startMonitoringOfInstance(instanceIdToMonitor);
    remoteInstancesPage.verifyAddInstancePageOpened();
    remoteInstancesPage.fillRemoteRDSMySQLFields();
    remoteInstancesPage.createNewRemoteMySQL();
    pmmInventoryPage.verifyMySQLRemoteServiceIsDisplayed(instanceIdToMonitor);
    await pmmInventoryPage.verifyAgentHasStatusRunning(instanceIdToMonitor);
  }
);

xScenario(
  'Verify AWS RDS MySQL 5.6 instance has status running @pmm-post-update',
  async (I, remoteInstancesPage, pmmInventoryPage) => {
    const serviceName = 'rds-mysql56';
    I.amOnPage(pmmInventoryPage.url);
    pmmInventoryPage.verifyMySQLRemoteServiceIsDisplayed(serviceName);
    await pmmInventoryPage.verifyAgentHasStatusRunning(serviceName);
  }
);

xScenario(
  'Verify QAN Filters contain AWS RDS MySQL 5.6 after it was added for monitoring',
  async (I, qanPage, adminPage) => {
    const environment = 'RDS MySQL 5.6';
    const filter = qanPage.getFilterLocator(environment);
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    adminPage.applyTimeRange('Last 5 minutes');
    await I.switchTo(qanPage.fields.iframe);
    qanPage.waitForQANPageLoaded();
    I.seeElement(filter);
  }
);

xScenario(
  'Verify MySQL Instances Overview Dashboard for AWS RDS MySQL 5.6 data after it was added for monitoring',
  async (I, remoteInstancesPage, dashboardPage) => {
    I.amOnPage(remoteInstancesPage.dashboardMySQLOverviewWithFilters);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyThereIsNoGraphsWithNA();
  }
);
