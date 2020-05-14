Feature('Database Failed Checks');

Before( async (I, pmmSettingsPage) => {
    I.Authorize();
    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.enableSTT();
});

Scenario(
    'PMM-T233 Verify user is able to access PMM Database Checks through UI and with URL @not-pr-pipeline',
    async (I,adminPage, databaseChecksPage) => {
        I.amOnPage(adminPage.url);
        I.waitForVisible(adminPage.fields.failedChecksPanelSelector);
        I.doubleClick(adminPage.fields.failedChecksPanelSelector);
        databaseChecksPage.verifyDatabaseChecksPageOpened();
        I.amOnPage(adminPage.url);
        adminPage.selectItemFromPMMDropdown('PMM Database Checks');
        databaseChecksPage.verifyDatabaseChecksPageOpened();
        I.amOnPage(databaseChecksPage.url);
        databaseChecksPage.verifyDatabaseChecksPageOpened();
    }
);

Scenario(
    'PMM-T236 Verify user is able to hover No of Failed Checks values and see tooltip @not-pr-pipeline',
    async (I, databaseChecksPage) => {
        const row = 1;
        I.amOnPage(databaseChecksPage.url);
        databaseChecksPage.verifyDatabaseChecksPageOpened();
        await databaseChecksPage.waitForCheckResultsToAppear();
        databaseChecksPage.mouseOverInfoIcon(row);
        await databaseChecksPage.compareTooltipValues(row);
    }
);

Scenario(
    'PMM-T241 Verify user can see correct service name for failed checks @not-pr-pipeline',
    async (I, databaseChecksPage) => {
        I.amOnPage(databaseChecksPage.url);
        databaseChecksPage.verifyDatabaseChecksPageOpened();
        await databaseChecksPage.waitForCheckResultsToAppear();
        await databaseChecksPage.verifyServiceNamesExistence();
    }
);
