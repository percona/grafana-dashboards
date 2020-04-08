Feature('Test Dashboards inside the OS Folder');

Before( async (I) => {
  I.Authorize();

});

Scenario(
  'Open the Node Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, dashboardPage, adminPage) => {
    I.amOnPage(dashboardPage.nodeSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(1);
    dashboardPage.verifyMetricsExistence(dashboardPage.nodeSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(1);
  }
);

Scenario(
  'Open the Nodes Compare Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, dashboardPage) => {
    I.amOnPage(dashboardPage.nodesCompareDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyMetricsExistence(dashboardPage.nodesCompareDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA(1);
    await dashboardPage.verifyThereAreNoGraphsWithoutData(19);
  }
);
