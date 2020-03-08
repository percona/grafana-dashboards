
Feature('to verify System Overview Dashboards');

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open the System Overview Dashboard', async (I, adminPage, systemOverviewPage) => {
    I.amOnPage(systemOverviewPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    await adminPage.handleLazyLoading(10);
    systemOverviewPage.verifyMetricsExistence();
});
