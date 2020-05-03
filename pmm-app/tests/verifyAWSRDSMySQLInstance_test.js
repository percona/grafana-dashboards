Feature('Monitoring AWS RDS MySQL DB');

Before(async I => {
  I.Authorize();
});

Scenario(
  'Verify Discovery and adding AWS RDS MySQL 5.6 instance for monitoring @not-pr-pipeline',
  async (I, remoteInstancesPage, pmmInventoryPage) => {
    const instanceIdToMonitor = 'rds-mysql56';
    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilRemoteInstancesPageLoaded().openAddAWSRDSMySQLPage();
    remoteInstancesPage.discoverRDS();
    remoteInstancesPage.verifyInstanceIsDiscovered(instanceIdToMonitor);
    remoteInstancesPage.startMonitoringOfInstance(instanceIdToMonitor);
    remoteInstancesPage.verifyAddInstancePageOpened();
    remoteInstancesPage.fillRemoteRDSMySQLFields();
    remoteInstancesPage.createRemoteInstance();
    pmmInventoryPage.verifyRemoteServiceIsDisplayed(instanceIdToMonitor);
    await pmmInventoryPage.verifyAgentHasStatusRunning(instanceIdToMonitor);
  }
);

Scenario(
  'Verify AWS RDS MySQL 5.6 instance has status running @pmm-post-update @not-pr-pipeline',
  async (I, remoteInstancesPage, pmmInventoryPage) => {
    const serviceName = 'rds-mysql56';
    I.amOnPage(pmmInventoryPage.url);
    pmmInventoryPage.verifyRemoteServiceIsDisplayed(serviceName);
    await pmmInventoryPage.verifyAgentHasStatusRunning(serviceName);
  }
);

xScenario(
  'Verify QAN Filters contain AWS RDS MySQL 5.6 after it was added for monitoring @not-pr-pipeline',
  async (I, qanPage, adminPage) => {
    const environment = 'RDS MySQL 5.6';
    const filter = qanPage.getFilterLocator(environment);
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    adminPage.applyTimer('5m');
    await I.switchTo(qanPage.fields.iframe);
    qanPage.waitForQANPageLoaded();
    await qanPage.expandAllFilter();
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
