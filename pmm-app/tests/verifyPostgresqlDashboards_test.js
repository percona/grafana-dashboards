Feature('Test Dashboards inside the PostgreSQL Folder');

Before( async (I) => {
  I.Authorize();
});

Scenario(
  'Open the PostgreSQL Instance Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, dashboardPage, adminPage) => {
    I.amOnPage(dashboardPage.postgresqlInstanceSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(5);
    await dashboardPage.expandEachDashboardRow();
    // Need to fix the scroll better, wait for ScrollTo() fix in playwright.
    adminPage.performPageUp(5);
    dashboardPage.verifyMetricsExistence(dashboardPage.postgresqlInstanceSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(1);
  }
);
