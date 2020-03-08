Feature("To verify and test the QAN Dashboard");

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open the QAN Dashboard and verify Filter groups exist', async (I, adminPage, qanPage) => {
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    await I.switchTo(qanPage.fields.iframe); // switch to first iframe
    qanPage.waitForQANPageLoaded();
    await qanPage.changeResultsPerPage(50);
    qanPage.checkFilterGroups();
});

Scenario('Open the QAN Dashboard and verify Query Details section opened when user selects Query', async (I, adminPage, qanPage) => {
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    adminPage.applyTimer("5m");
    await I.switchTo(qanPage.fields.iframe); // switch to first iframe
    qanPage.waitForQANPageLoaded();
    qanPage._selectDetails(2);
});

xScenario('Open the QAN Dashboard and verify Data in Table and Query Details', async (I, adminPage, qanPage) => {
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    adminPage.applyTimer("5m");
    await I.switchTo(qanPage.fields.iframe); // switch to first iframe
    I.wait(10);
    qanPage.applyFilter("ps");
    await qanPage.verifyDataSet(1);
    await qanPage.verifyDataSet(2);
    await qanPage.clearFilters();
});

Scenario('Open the QAN Dashboard and verify pagination', async (I, adminPage, qanPage) => {
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    adminPage.applyTimer("5m");
    await I.switchTo(qanPage.fields.iframe); // switch to first iframe
    qanPage.waitForQANPageLoaded();
    qanPage.checkPagination();
    await qanPage.checkSparkLines();
    qanPage.checkTableHeaders();
    //qanPage.checkServerList();
    // I.switchTo();
});