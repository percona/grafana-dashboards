Feature('PMM Permission restrictions');
let viewer;
let admin;
const users = {
  viewer: {
    username: 'test_viewer',
    password: 'password',
  },
  admin: {
    username: 'test_admin',
    password: 'password',
  },
};

BeforeSuite(async (I) => {
  I.say('Creating users for the permissions test suite');
  const viewerId = await I.createUser(users.viewer.username, users.viewer.password);
  const adminId = await I.createUser(users.admin.username, users.admin.password);
  await I.setRole(viewerId);
  await I.setRole(adminId, 'Admin');
  viewer = viewerId;
  admin = adminId;
});

AfterSuite(async (I) => {
  I.say('Removing users');
  await I.deleteUser(viewer);
  await I.deleteUser(admin);
});

Scenario(
    'PMM-T358 Verify Failed checks panel at Home page for the viewer role (STT is enabled) @not-pr-pipeline',
    async (I, homePage, settingsAPI) => {
      await settingsAPI.apiEnableSTT();
      await I.Authorize(users.viewer.username, users.viewer.password);
      I.amOnPage(homePage.url);
      I.waitForVisible(homePage.fields.checksPanelSelector, 30);
      I.waitForVisible(homePage.fields.noAccessRightsSelector, 30);
      I.see('Insufficient access rights.', homePage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'PMM-T360 Verify Failed checks panel at Home page for the admin role (STT is enabled) @not-pr-pipeline',
    async (I, homePage, settingsAPI) => {
      await settingsAPI.apiEnableSTT();
      await I.Authorize(users.admin.username, users.admin.password);
      I.amOnPage(homePage.url);
      I.waitForVisible(homePage.fields.checksPanelSelector, 30);
      I.dontSeeElement(homePage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'PMM-T358 Verify Database Failed checks page for the viewer role (STT is enabled) [critical] @not-pr-pipeline',
    async (I, databaseChecksPage, settingsAPI) => {
      await settingsAPI.apiEnableSTT();
      await I.Authorize(users.viewer.username, users.viewer.password);
      I.amOnPage(databaseChecksPage.url);
      I.waitForVisible(databaseChecksPage.fields.dbCheckPanelSelector, 30);
      I.waitForVisible(databaseChecksPage.fields.noAccessRightsSelector, 30);
      I.see('Insufficient access rights.', databaseChecksPage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'PMM-T360 Verify Database Failed checks page for the admin role (STT is enabled) [critical] @not-pr-pipeline',
    async (I, databaseChecksPage, settingsAPI) => {
      await settingsAPI.apiEnableSTT();
      await I.Authorize(users.admin.username, users.admin.password);
      I.amOnPage(databaseChecksPage.url);
      I.waitForVisible(databaseChecksPage.fields.dbCheckPanelSelector, 30);
      I.dontSeeElement(databaseChecksPage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'PMM-T358 Verify Failed checks panel at Home page for the viewer role (STT is disabled) @not-pr-pipeline',
    async (I, homePage, settingsAPI) => {
      await settingsAPI.apiDisableSTT();
      await I.Authorize(users.viewer.username, users.viewer.password);
      I.amOnPage(homePage.url);
      I.waitForVisible(homePage.fields.checksPanelSelector, 30);
      I.waitForVisible(homePage.fields.noAccessRightsSelector, 30);
      I.see('Insufficient access rights.', homePage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'PMM-T360 Verify Failed checks panel at Home page for the admin role (STT is disabled) @not-pr-pipeline',
    async (I, homePage, settingsAPI) => {
      await settingsAPI.apiDisableSTT();
      await I.Authorize(users.admin.username, users.admin.password);
      I.amOnPage(homePage.url);
      I.waitForVisible(homePage.fields.checksPanelSelector, 30);
      I.dontSeeElement(homePage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'PMM-T358 Verify Database Failed checks page for the viewer role (STT is disabled) [critical] @not-pr-pipeline',
    async (I, databaseChecksPage, settingsAPI) => {
      await settingsAPI.apiDisableSTT();
      await I.Authorize(users.viewer.username, users.viewer.password);
      I.amOnPage(databaseChecksPage.url);
      I.waitForVisible(databaseChecksPage.fields.dbCheckPanelSelector, 30);
      I.waitForVisible(databaseChecksPage.fields.noAccessRightsSelector, 30);
      I.see('Insufficient access rights.', databaseChecksPage.fields.noAccessRightsSelector);
    }
);

Scenario(
    'PMM-T360 Verify Database Failed checks page for the admin role (STT is disabled) [critical] @not-pr-pipeline',
    async (I, databaseChecksPage, settingsAPI) => {
      await settingsAPI.apiDisableSTT();
      await I.Authorize(users.admin.username, users.admin.password);
      I.amOnPage(databaseChecksPage.url);
      I.waitForVisible(databaseChecksPage.fields.dbCheckPanelSelector, 30);
      I.dontSeeElement(databaseChecksPage.fields.noAccessRightsSelector);
    }
);
