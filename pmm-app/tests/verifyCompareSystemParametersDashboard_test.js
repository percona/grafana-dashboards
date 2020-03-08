
Feature('to verify Compare System Parameters Dashboards');

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open the Compare System Parameters Dashboard', async (I, adminPage, compareSystemParametersPage) => {
    I.amOnPage(compareSystemParametersPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    for (let i in compareSystemParametersPage.panels) {
        adminPage.openPanel(compareSystemParametersPage.panels[i]);
    }
    await adminPage.handleLazyLoading(11);
    compareSystemParametersPage.verifyMetricsExistence();
});
