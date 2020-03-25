Feature('Test Dashboards inside the PostgreSQL Folder');

Before((I, loginPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});

Scenario(
  'Open the PostgreSQL Instance Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
  async (I, adminPage, dashboardPage) => {
    I.amOnPage(dashboardPage.postgresqlInstanceSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyMetricsExistence(dashboardPage.postgresqlInstanceSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(1);
  }
);
