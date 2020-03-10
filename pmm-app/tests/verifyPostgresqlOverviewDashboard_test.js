
// Feature('to verify PostgreSQL Overview Dashboards');
//
// Before((I, loginPage) => {
//     I.amOnPage(loginPage.url);
//     loginPage.login("admin", "admin");
// });

// TODO: Unstable work, should be rewritten completely
xScenario('Open the PostgreSQL Overview Dashboard', async (I, adminPage, postgresqlOverviewPage) => {
    I.amOnPage(postgresqlOverviewPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    await adminPage.handleLazyLoading(10);
    postgresqlOverviewPage.verifyMetricsExistence();
});
