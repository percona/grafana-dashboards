Feature('Verify PMMDemo side');

Scenario('PMM-T363 - Verify Copyrights & Legal section elements', async (I, pmmDemoPage) => {
  I.amOnPage(pmmDemoPage.url);
  I.waitForVisible(pmmDemoPage.fields.title, 30);
  pmmDemoPage.verifyCopyrightsAndLegal();
  I.amOnPage(pmmDemoPage.url + pmmDemoPage.mongoDBDashbordUrl);
  pmmDemoPage.verifyCopyrightsAndLegal();
});

Scenario(
  'PMM-T364 - Verify PMM settings returns Access denied error',
  async (I, pmmDemoPage, pmmSettingsPage) => {
    I.amOnPage(pmmDemoPage.url + pmmSettingsPage.url);
    I.waitForVisible(pmmDemoPage.fields.accessDenied, 30);
  }
);

Scenario(
  'PMM-T364 - Verify PMM settings returns Access denied error',
  async (I, pmmDemoPage, pmmInventoryPage) => {
    I.amOnPage(pmmDemoPage.url + pmmInventoryPage.url);
    I.waitForVisible(pmmDemoPage.fields.accessDenied, 30);
    
  }
);
