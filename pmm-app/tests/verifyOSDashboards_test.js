Feature("Test Dashboards inside the OS Folder");

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open the Node Summary Dashboard and verify Metrics are present and graphs are displayed',
        async (I, dashboardPage, adminPage) => {
    I.amOnPage(dashboardPage.nodeSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(1);
    dashboardPage.verifyMetricsExistence(dashboardPage.nodeSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(1);
});

Scenario('Open the Nodes Compare Dashboard and verify Metrics are present and graphs are displayed',
        async (I, adminPage, dashboardPage) => {
    I.amOnPage(dashboardPage.nodesCompareDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyMetricsExistence(dashboardPage.nodesCompareDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(2);
});
