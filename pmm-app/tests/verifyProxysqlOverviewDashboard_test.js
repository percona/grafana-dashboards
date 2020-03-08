
Feature('to verify ProxySQL Overview Dashboards');

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open the ProxySQL Overview Dashboard', async (I, adminPage, proxysqlOverviewPage) => {
    I.amOnPage(proxysqlOverviewPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    await adminPage.handleLazyLoading(5);
    proxysqlOverviewPage.verifyMetricsExistence();
});
