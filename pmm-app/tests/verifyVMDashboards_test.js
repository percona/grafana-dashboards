Feature('Check ');

Before(async (I) => {
  I.Authorize();
});

Scenario(
    'Will be added later(name) @not-ui-pipeline @nightly @not-pr-pipeline',
    async (I, dashboardPage, adminPage) => {
        I.amOnPage(dashboardPage.victoriaMetricsDashboard.url);
        dashboardPage.waitForDashboardOpened();
        await dashboardPage.expandEachDashboardRow();
        I.click(adminPage.fields.metricTitle);
        adminPage.peformPageDown(5);
        dashboardPage.verifyMetricsExistence(dashboardPage.victoriaMetricsDashboard.metrics);
        await dashboardPage.verifyThereAreNoGraphsWithNA(0);
        await dashboardPage.verifyThereAreNoGraphsWithoutData(0);
    },
  );