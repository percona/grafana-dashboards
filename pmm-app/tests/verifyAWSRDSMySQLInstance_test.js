Feature('Monitoring AWS RDS MySQL DB');

Before(async (I) => {
  I.Authorize();
});

Scenario(
    'PMM-T138 Verify disabling enhanced metrics for RDS, PMM-T139 Verify disabling basic metrics for RDS, PMM-T9 Verify adding RDS instances [critical] @not-pr-pipeline',
    async (I, remoteInstancesPage, pmmInventoryPage, homePage, qanPage, dashboardPage) => {
      const instanceIdToMonitor = 'rds-mysql56';
      const environment = 'RDS MySQL 5.6';
      I.amOnPage(remoteInstancesPage.url);
      remoteInstancesPage.waitUntilRemoteInstancesPageLoaded().openAddAWSRDSMySQLPage();
      remoteInstancesPage.discoverRDS();
      remoteInstancesPage.verifyInstanceIsDiscovered(instanceIdToMonitor);
      remoteInstancesPage.startMonitoringOfInstance(instanceIdToMonitor);
      remoteInstancesPage.verifyAddInstancePageOpened();
      remoteInstancesPage.fillRemoteRDSMySQLFields();
      remoteInstancesPage.createRemoteInstance(instanceIdToMonitor);
      pmmInventoryPage.verifyRemoteServiceIsDisplayed(instanceIdToMonitor);
      await pmmInventoryPage.verifyAgentHasStatusRunning(instanceIdToMonitor);
      await pmmInventoryPage.verifyMetricsFlags(instanceIdToMonitor);
      //skipping verification of the filter in MySQL Instance Overview for now
      //skipping verification of the filter in QAN. Will be fixed with new QAN tests
      /*
      I.amOnPage(dashboardPage.mySQLInstanceOverview.url);
      await dashboardPage.verifyExisitngServiceName(instanceIdToMonitor);
      I.amOnPage(qanPage.url + '?orgId=1&from=now-5m&to=now');
      await I.switchTo(qanPage.fields.iframe);
      await qanPage.verifyFilterExists(environment);
      */
    }
);

Scenario(
    'Verify AWS RDS MySQL 5.6 instance has status running [critical] @pmm-post-update @not-pr-pipeline',
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
