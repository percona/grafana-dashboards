Feature('Database Failed Checks');
const config = require('../pr.codecept.js').config.helpers.Playwright;
const allure = codeceptjs.container.plugins('allure');
const assert = require('assert');

Before(async (I) => {
  I.Authorize();
});

Scenario(
    'PMM-T294 Verify user is able to see message about Disabled STT in Checks panel at Home Page @not-pr-pipeline',
    async (I, homePage, databaseChecksPage, settingsAPI) => {
      allure.severity('critical');
      await settingsAPI.apiDisableSTT();
      I.amOnPage(homePage.url);
      I.waitForVisible(homePage.fields.sttDisabledFailedChecksPanelSelector, 30);
      I.see(databaseChecksPage.messages.homePagePanelMessage, homePage.fields.sttDisabledFailedChecksPanelSelector);
    }
);

Scenario.only(
    'PMM-T295 PMM-T276 Verify user is able to see message about Disabled STT at Database Checks page @not-pr-pipeline',
    async (I, databaseChecksPage, pmmSettingsPage, settingsAPI) => {
      allure.severity('critical');
      await settingsAPI.apiEnableSTT();
      I.amOnPage(databaseChecksPage.url);
      I.waitForVisible(databaseChecksPage.fields.dbCheckPanelSelector, 30);
      I.waitForVisible(databaseChecksPage.fields.disabledSTTMessageSelector, 30);
      I.see(databaseChecksPage.messages.disabledSTTMessage, databaseChecksPage.fields.disabledSTTMessageSelector);
      I.seeElement(databaseChecksPage.fields.disabledSTTMessageLinkSelector);
      I.seeAttributesOnElements(databaseChecksPage.fields.disabledSTTMessageLinkSelector,
          {href: `${config.url}${pmmSettingsPage.url}`});
    }
);
//Skipping test because of random failings, needs investigation
xScenario(
    'PMM-T233 PMM-T234 Verify user is able to access PMM Database Checks through UI and with URL @not-pr-pipeline',
    async (I, adminPage, databaseChecksPage, pmmSettingsPage, settingsAPI) => {
      allure.severity('critical');
      await settingsAPI.apiEnableSTT();
      I.amOnPage(pmmSettingsPage.url);
      pmmSettingsPage.waitForPmmSettingsPageLoaded();
      adminPage.selectItemFromPMMDropdown('PMM Database Checks');
      I.waitForVisible(databaseChecksPage.fields.dbCheckPanelSelector, 30);
      I.amOnPage(databaseChecksPage.url);
      I.waitForVisible(databaseChecksPage.fields.dbCheckPanelSelector, 30);
    }
);

Scenario(
    'PMM-T233 Verify user can see Number of failed checks at Home Page and open PMM Database Checks page from it @not-pr-pipeline',
    async (I, homePage, databaseChecksPage, settingsAPI) => {
      allure.severity('critical');
      await settingsAPI.apiEnableSTT();
      I.amOnPage(homePage.url);
      I.waitForVisible(homePage.fields.checksPanelSelector, 30);
      await homePage.waitForCheckResultsToAppearInPanel();
      I.doubleClick(homePage.fields.sttFailedChecksPanelSelector);
      await databaseChecksPage.verifyDatabaseChecksPageOpened();
    }
);

Scenario(
    'PMM-T236 Verify user is able to hover Failed Checks values and see tooltip @not-pr-pipeline',
    async (I, databaseChecksPage, settingsAPI) => {
      allure.severity('minor');
      const row = 1;
      await settingsAPI.apiEnableSTT();
      I.amOnPage(databaseChecksPage.url);
      await databaseChecksPage.verifyDatabaseChecksPageOpened();
      databaseChecksPage.mouseOverInfoIcon(row);
      await databaseChecksPage.compareTooltipValues(row);
    }
);

Scenario(
    'PMM-T241 Verify user can see correct service name for failed checks @not-pr-pipeline',
    async (I, databaseChecksPage, settingsAPI) => {
      allure.severity('critical');
      await settingsAPI.apiEnableSTT();
      I.amOnPage(databaseChecksPage.url);
      await databaseChecksPage.verifyDatabaseChecksPageOpened();
      await databaseChecksPage.verifyServiceNamesExistence();
    }
);
