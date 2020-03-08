Feature("Test Dashboards inside the Insights Folder");

Scenario('Open the Prometheus Exporters, Summary Dashboard, Prometheus Exporters Overview', async (I, loginPage, adminPage, summaryDashboardPage, trendsDashboardPage, prometheusExporterStatusPage, prometheusExporterOverviewPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");

    I.amOnPage(prometheusExporterStatusPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    for (let i in prometheusExporterStatusPage.panels) {
        adminPage.openPanel(prometheusExporterStatusPage.panels[i]);
    }
    await adminPage.handleLazyLoading(10);
    prometheusExporterStatusPage.verifyMetricsExistence();
    I.amOnPage(summaryDashboardPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    await adminPage.handleLazyLoading(10);
    summaryDashboardPage.verifyMetricsExistence();
    I.amOnPage(prometheusExporterOverviewPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    await adminPage.handleLazyLoading(10);
    await prometheusExporterOverviewPage.verifyMetricsExistence();
});