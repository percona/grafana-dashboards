Feature('Test Dashboards inside the MongoDB Folder');

Before(async (I) => {
  I.Authorize();

});

Scenario(
    'Open the MongoDB Instance Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
    async (I, dashboardPage) => {
      I.amOnPage(dashboardPage.mongodbOverviewDashboard.url);
      dashboardPage.waitForDashboardOpened();
      await dashboardPage.expandEachDashboardRow();
      await dashboardPage.verifyMetricsExistence(dashboardPage.mongodbOverviewDashboard.metrics);
      await dashboardPage.verifyThereAreNoGraphsWithNA();
      await dashboardPage.verifyThereAreNoGraphsWithoutData();
    }
);

Scenario(
    'Open the MongoDB Cluster Summary Dashboard and verify Metrics are present and graphs are displayed @not-pr-pipeline',
    async (I, adminPage, dashboardPage) => {
      I.amOnPage(dashboardPage.mongoDbClusterSummaryDashboard.url);
      dashboardPage.waitForDashboardOpened();
      I.click(adminPage.fields.metricTitle);
      adminPage.peformPageDown(1);
      await dashboardPage.expandEachDashboardRow();
      dashboardPage.verifyMetricsExistence(dashboardPage.mongoDbClusterSummaryDashboard.metrics);
      await dashboardPage.verifyThereAreNoGraphsWithNA();
      await dashboardPage.verifyThereAreNoGraphsWithoutData(12);
    }
);
