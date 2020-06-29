Feature('Verify PMMDemo side');

Scenario('PMM-T363 - Verify Copyrights & Legal section elements', async (I, pmmDemoPage) => {
  I.amOnPage(pmmDemoPage.url);
  I.wait(5);
  pmmDemoPage.verifyCopyrightsAndLegal();
  I.amOnPage(pmmDemoPage.url + pmmDemoPage.mongoDBDashbordUrl);
  pmmDemoPage.verifyCopyrightsAndLegal();
});
