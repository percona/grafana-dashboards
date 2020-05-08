Feature('Test Dashboards inside the MySQL Folder');

Before(async (I) => {
  I.Authorize();
});

Scenario(
  // eslint-disable-next-line max-len
  'Open the MySQL Overview Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, adminPage, dashboardPage) => {
    I.amOnPage(dashboardPage.mysqlInstanceSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(5);
    dashboardPage.verifyMetricsExistence(dashboardPage.mysqlInstanceSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(3);
  }
);

xScenario(
  // eslint-disable-next-line max-len
  'Open the ProxySQL Instance Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, adminPage, dashboardPage) => {
    I.amOnPage(dashboardPage.proxysqlInstanceSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.applyTimer('5m');
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(5);
    await dashboardPage.verifyMetricsExistence(dashboardPage.proxysqlInstanceSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(8);
  }
).retry(2);

Scenario(
  // eslint-disable-next-line max-len
  'Open the PXCGalera Cluster Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, adminPage, dashboardPage) => {
    I.amOnPage(dashboardPage.pxcGaleraClusterSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(5);
    dashboardPage.verifyMetricsExistence(dashboardPage.pxcGaleraClusterSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData();
  }
);

Scenario(
  // eslint-disable-next-line max-len
  'Open the MySQL Table Details Dashboard and verify Disable Tablestats Report shows no Data @not-pr-pipeline',
  async (I, adminPage, mysqlTableDetailsPage) => {
    I.amOnPage(mysqlTableDetailsPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer('1m');
    mysqlTableDetailsPage.verifyNoDataShow();
  }
);
