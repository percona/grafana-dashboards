
Feature('to verify MongoDB Dashboards');

Scenario('Open the MongoDB Dashboards', async (I, loginPage, adminPage, mongodbOverviewPage, mongoDbClusterSummaryPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
    I.amOnPage(mongodbOverviewPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    await adminPage.handleLazyLoading(10);
    mongodbOverviewPage.verifyMetricsExistence();
    I.amOnPage(mongoDbClusterSummaryPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    await adminPage.handleLazyLoading(10);
    mongoDbClusterSummaryPage.verifyMetricsExistence();
});