
Feature('to verify PXC/Galera Cluster Oveview Dashboard');

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open the PXC/Galera Cluster Oveview Dashboard', async (I, adminPage, pxcGaleraClusterOverviewPage) => {
    I.amOnPage(pxcGaleraClusterOverviewPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    await adminPage.handleLazyLoading(4);
    pxcGaleraClusterOverviewPage.verifyMetricsExistence();
});
