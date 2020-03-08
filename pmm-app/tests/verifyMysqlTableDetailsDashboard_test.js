
Feature('to verify MySQL Table Details Dashboard');

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open the MySQL Table Details Dashboard, verify Disable Tablestats Report show no Data', async (I, adminPage, mysqlTableDetailsPage) => {
    I.amOnPage(mysqlTableDetailsPage.url);
    I.waitForElement(adminPage.fields.metricTitle, 30);
    adminPage.applyTimer("1m");
    mysqlTableDetailsPage.verifyNoDataShow();
});
