const assert = require('assert');

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
  async (I, dashboardPage, qanActions, adminPage) => {
    const filters = ['ps_5.7', 'root'];
    const timeRange = 'Last 12 hours';

    I.amOnPage(dashboardPage.mysqlUserDetailsDashboard.url);
    dashboardPage.waitForDashboardOpened();
    I.waitForVisible(dashboardPage.fields.timeRangePickerButton, 20);
    adminPage.applyTimeRange(timeRange);
    await dashboardPage.applyFilter('Service Name', 'ps_5.7');
    I.waitForVisible(dashboardPage.fields.rootUser, 20);
    I.click(dashboardPage.fields.rootUser);
    I.waitForVisible(dashboardPage.fields.dataLinkForRoot);
    I.click(dashboardPage.fields.dataLinkForRoot);
    I.wait(5);
    I.switchToNextTab(1);
    qanActions.waitForNewQANPageLoaded();
    I.waitInUrl('/graph/d/pmm-qan/pmm-query-analytics?var-service_name=ps_5.7__1&var-username=root', 30);
    I.waitInUrl('from=now-12h&to=now', 30);
    await qanActions.verifySelectedFilters(filters);
    const timeRangeGrabbed = await dashboardPage.getTimeRange();
    assert.equal(
      timeRangeGrabbed.slice(0, timeRangeGrabbed.length - 1),
      timeRange,
      `Grabbed time range: ${timeRangeGrabbed.slice(
        0,
        timeRangeGrabbed.length - 1,
      )} is not equal to expected time Range: ${timeRange}`,
    );
  },
);
