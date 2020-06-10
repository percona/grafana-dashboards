Feature('PMM Permission restrictions');
const viewerUser = 'test_viewer';
const viewerPassword = 'password';
let user;

BeforeSuite(async (I) => {
      I.say('Creating users for the test suite');
      const userId = await I.createUser(viewerUser, viewerPassword);
      await I.setRole(userId);
      user = userId;
});

AfterSuite(async(I) => {
      I.say('Removing users');
      await I.deleteUser(user);
});

Scenario(
    'Verify Failed checks panel at Home page for a viewer role (STT is enabled)',
    async (I, homePage, settingsAPI) => {
      await settingsAPI.apiEnableSTT();
      await I.Authorize(viewerUser, viewerPassword);
      I.amOnPage(homePage.url);
      I.waitForVisible(homePage.fields.noAccessRightsSelector, 30);
      I.see('Insufficient access rights.', homePage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'Verify Database Failed checks page for a viewer role (STT is enabled)',
    async (I, databaseChecksPage, settingsAPI) => {
          await settingsAPI.apiEnableSTT();
          await I.Authorize(viewerUser, viewerPassword);
          I.amOnPage(databaseChecksPage.url);
          I.waitForVisible(databaseChecksPage.fields.noAccessRightsSelector, 30);
          I.see('Insufficient access rights.', databaseChecksPage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'Verify Failed checks panel at Home page for a viewer role (STT is disabled)',
    async (I, homePage, settingsAPI) => {
      await settingsAPI.apiDisableSTT();
      await I.Authorize(viewerUser, viewerPassword);
      I.amOnPage(homePage.url);
      I.waitForVisible(homePage.fields.noAccessRightsSelector, 30);
      I.see('Insufficient access rights.', homePage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'Verify Database Failed checks page for a viewer role (STT is disabled)',
    async (I, databaseChecksPage, settingsAPI) => {
      await settingsAPI.apiDisableSTT();
      await I.Authorize(viewerUser, viewerPassword);
      I.amOnPage(databaseChecksPage.url);
      I.waitForVisible(databaseChecksPage.fields.noAccessRightsSelector, 30);
      I.see('Insufficient access rights.', databaseChecksPage.fields.noAccessRightsSelector);
    }
);
