Feature('Monitoring AWS RDS MySQL DB');

Before(async ({ I }) => {
  I.Authorize();
});

Scenario(
  'PMM-T138 Verify disabling enhanced metrics for RDS, PMM-T139 Verify disabling basic metrics for RDS, PMM-T9 Verify adding RDS instances [critical] @not-pr-pipeline',
  async ({ I, remoteInstancesPage, pmmInventoryPage }) => {
    const instanceIdToMonitor = remoteInstancesPage.rds['Service Name'];

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
  },
);

Scenario(
  'Verify AWS RDS MySQL 5.6 instance has status running [critical] @not-pr-pipeline',
  async ({ I, remoteInstancesPage, pmmInventoryPage }) => {
    const serviceName = remoteInstancesPage.rds['Service Name'];

    I.amOnPage(pmmInventoryPage.url);
    pmmInventoryPage.verifyRemoteServiceIsDisplayed(serviceName);
    await pmmInventoryPage.verifyAgentHasStatusRunning(serviceName);
  },
);
// Skipping the tests because QAN does not get any data right after instance was added for monitoring
xScenario(
  'Verify QAN Filters contain AWS RDS MySQL 5.6 after it was added for monitoring @not-pr-pipeline',
  async ({
    I, qanPage, remoteInstancesPage, qanFilters,
  }) => {
    const filters = remoteInstancesPage.rds;

    I.amOnPage(qanPage.url);
    qanFilters.waitForFiltersLoad();
    await qanFilters.expandAllFilter();
    for (const filter of Object.values(filters)) {
      const name = qanFilters.getFilterLocator(filter);

      I.waitForVisible(name, 30);
      I.seeElement(name);
    }
  },
);

Scenario(
  'Verify MySQL Instances Overview Dashboard for AWS RDS MySQL 5.6 data after it was added for monitoring @not-pr-pipeline',
  async ({ I, dashboardPage }) => {
    I.amOnPage(dashboardPage.mySQLInstanceOverview.urlWithRDSFilter);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    await dashboardPage.verifyThereAreNoGraphsWithNA(1);
    await dashboardPage.verifyThereAreNoGraphsWithoutData(6);
  },
);

Scenario(
  'Verify MySQL Instances Overview Dashboard contains AWS RDS MySQL 5.6 filters @not-pr-pipeline',
  async ({ I, dashboardPage, remoteInstancesPage }) => {
    const filters = remoteInstancesPage.rds;

    I.amOnPage(dashboardPage.mySQLInstanceOverview.url);
    dashboardPage.waitForDashboardOpened();
    for (const key of Object.keys(filters)) {
      const locator = dashboardPage.expandFilters(key);

      await within(locator, () => {
        I.seeElement(locate('span').withText(filters[key]));
      });
    }
  },
);
