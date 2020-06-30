Feature('Verify PMMDemo side');

Scenario(
  'PMM-T363 - Verify Copyrights & Legal section elements @not-pr-pipeline @pmm-demo',
  async (I, pmmDemoPage) => {
    I.amOnPage(pmmDemoPage.url);
    I.waitForVisible(pmmDemoPage.fields.title, 30);
    pmmDemoPage.verifyCopyrightsAndLegal();
    I.amOnPage(pmmDemoPage.url + pmmDemoPage.mongoDBDashbordUrl);
    pmmDemoPage.verifyCopyrightsAndLegal();
  }
);

Scenario(
  'PMM-T364 - Verify PMM settings returns Access denied error @not-pr-pipeline @pmm-demo',
  async (I, pmmDemoPage, pmmSettingsPage) => {
    I.amOnPage(pmmDemoPage.url + pmmSettingsPage.url);
    I.waitForVisible(pmmDemoPage.fields.accessDenied, 30);
  }
);

Scenario(
  'PMM-T365 - Verify PMM settings returns Access denied error @not-pr-pipeline @pmm-demo',
  async (I, pmmDemoPage, pmmInventoryPage) => {
    I.amOnPage(pmmDemoPage.url + pmmInventoryPage.url);
    I.waitForVisible(pmmDemoPage.fields.accessDenied, 30);
  }
);

Scenario(
  'PMM-T366 - Verify Failed security checks doesnt display the result of check @not-pr-pipeline @pmm-demo',
  async (I, pmmDemoPage) => {
    const text = 'Insufficient access rights.';
    I.amOnPage(pmmDemoPage.url);
    I.waitForVisible(pmmDemoPage.fields.failedSecurityChecks, 30);
    I.waitForVisible(pmmDemoPage.fields.dbCheckPanelNoAccess, 30);
    await pmmDemoPage.checkDBPanelText(text);
  }
);

Scenario(
  'PMM-T367 - Verify PMM Database checks page doesnt display checks @not-pr-pipeline @pmm-demo',
  async (I, pmmDemoPage, databaseChecksPage) => {
    const text = 'Insufficient access rights.';
    I.amOnPage(pmmDemoPage.url + databaseChecksPage.url);
    I.waitForVisible(pmmDemoPage.fields.dbCheckPanelNoAccess, 30);
    await pmmDemoPage.checkDBPanelText(text);
  }
);
