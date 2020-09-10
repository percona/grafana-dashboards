Feature('Test the functionality inside DBaas page');

Before(async (I) => {
  I.Authorize();
});

Scenario('PMM-T426 - Verify adding new Kubernetes cluster@not-pr-pipeline', async (I, dbaasPage) => {
  I.amOnPage(dbaasPage.url);
  I.waitForVisible(dbaasPage.fields.addKubernetesClusterButton, 30);
  I.click(dbaasPage.fields.addKubernetesClusterButton);
  I.seeElement(dbaasPage.fields.modalWindow);
  I.click(dbaasPage.fields.closeButton);
  I.dontSeeElement(dbaasPage.fields.modalWindow);
});
