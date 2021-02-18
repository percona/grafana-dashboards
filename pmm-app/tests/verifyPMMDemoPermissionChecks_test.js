Feature('Tests for PMM Demo Sanity Tests Permissions Checks, QAN Checks Cycle').retry(2);

Scenario(
  'PMM-T363 - Verify Copyrights & Legal section elements [critical] @not-pr-pipeline @pmm-demo @not-ui-pipeline',
  async ({ I, pmmDemoPage }) => {
    I.amOnPage(pmmDemoPage.url);
    I.waitForVisible(pmmDemoPage.fields.title, 30);
    pmmDemoPage.verifyCopyrightsAndLegal();
    I.amOnPage(pmmDemoPage.url + pmmDemoPage.mongoDBDashbordUrl);
    pmmDemoPage.verifyCopyrightsAndLegal();
  },
);

Scenario(
  'PMM-T364 - Verify PMM settings returns Access denied error [critical] @not-pr-pipeline @pmm-demo @not-ui-pipeline',
  async ({ I, pmmDemoPage, pmmSettingsPage }) => {
    I.amOnPage(pmmDemoPage.url + pmmSettingsPage.url);
    I.waitForVisible(pmmDemoPage.fields.accessDenied, 30);
  },
);

Scenario(
  'PMM-T365 - Verify PMM settings returns Access denied error @not-pr-pipeline [critical] @pmm-demo @not-ui-pipeline',
  async ({ I, pmmDemoPage, pmmInventoryPage }) => {
    I.amOnPage(pmmDemoPage.url + pmmInventoryPage.url);
    I.waitForVisible(pmmDemoPage.fields.accessDenied, 30);
  },
);

Scenario(
  'PMM-T366 - Verify Failed security checks doesnt display the result of check @not-pr-pipeline [critical] @pmm-demo @not-ui-pipeline',
  async ({ I, pmmDemoPage }) => {
    const text = 'Insufficient access rights.';

    I.amOnPage(pmmDemoPage.url);
    I.waitForVisible(pmmDemoPage.fields.failedSecurityChecks, 30);
    I.waitForVisible(pmmDemoPage.fields.dbCheckPanelNoAccess, 30);
    await pmmDemoPage.checkDBPanelText(text);
  },
);

Scenario(
  'PMM-T367 - Verify PMM Database checks page doesnt display checks @not-pr-pipeline [critical] @pmm-demo @not-ui-pipeline',
  async ({ I, pmmDemoPage, databaseChecksPage }) => {
    const text = 'Insufficient access rights.';

    I.amOnPage(pmmDemoPage.url + databaseChecksPage.url);
    I.waitForVisible(pmmDemoPage.fields.dbCheckPanelNoAccess, 30);
    await pmmDemoPage.checkDBPanelText(text);
  },
);

// Need to skip for update to be available on pmmdemo
xScenario(
  'PMM-T288 Verify user can see Update widget before upgrade [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, homePage, pmmDemoPage,
  }) => {
    I.amOnPage(pmmDemoPage.url + homePage.url);
    await homePage.verifyPostUpdateWidgetIsPresent();
  },
);
