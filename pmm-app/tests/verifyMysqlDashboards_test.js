Feature('Test Dashboards inside the MySQL Folder');

Before(async (I) => {
  I.Authorize();
});

Scenario(
  // eslint-disable-next-line max-len
  'Open the MySQL Overview Dashboard and verify Metrics are present and graphs are displayed @not-ui-pipeline @nightly @not-pr-pipeline',
  async (I, adminPage, dashboardPage) => {
    I.amOnPage(dashboardPage.mysqlInstanceSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.applyFilter('Service Name', 'ps_5.7');
    await dashboardPage.expandEachDashboardRow();
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(5);
    dashboardPage.verifyMetricsExistence(dashboardPage.mysqlInstanceSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(3);
  },
);

Scenario(
  // eslint-disable-next-line max-len
  'Open the ProxySQL Instance Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, adminPage, dashboardPage) => {
    I.amOnPage(`${dashboardPage.proxysqlInstanceSummaryDashboard.url}?from=now-5m&to=now`);
    dashboardPage.waitForDashboardOpened();
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(5);
    await dashboardPage.verifyMetricsExistence(dashboardPage.proxysqlInstanceSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(8);
  },
);

Scenario(
  // eslint-disable-next-line max-len
  'Open the PXCGalera Cluster Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, adminPage, dashboardPage) => {
    I.amOnPage(`${dashboardPage.pxcGaleraClusterSummaryDashboard.url}?from=now-5m&to=now`);
    dashboardPage.waitForDashboardOpened();
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(5);
    dashboardPage.verifyMetricsExistence(dashboardPage.pxcGaleraClusterSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(2);
  },
);

Scenario(
  'PMM-T324 - Verify MySQL - MySQL User Details dashboard @not-pr-pipeline',
  async (I, dashboardPage, adminPage) => {
    I.amOnPage(dashboardPage.mysqlUserDetailsDashboard.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(5);
    await dashboardPage.expandEachDashboardRow();
    adminPage.performPageUp(5);
    dashboardPage.verifyMetricsExistence(dashboardPage.mysqlUserDetailsDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(1);
  },
);

Scenario(
  'PMM-T396 - Verify that parameters are passed from MySQL User Details dashboard to QAN @not-pr-pipeline',
  async (I, dashboardPage) => {
    I.amOnPage(dashboardPage.mysqlUserDetailsDashboard.url);
    dashboardPage.waitForDashboardOpened();
    I.click(dashboardPage.fields.timeRangePickerButton);
    I.click(dashboardPage.fields.last12hours);
    dashboardPage.applyFilter('Service Name', 'ps_5.7');
  },
);
