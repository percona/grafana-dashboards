const { quantile } = require('d3');

Feature('Test the functionality inside DBaas page');

Before(async (I) => {
  I.Authorize();
});

Scenario('PMM-T426 - Verify adding new Kubernetes cluster@not-pr-pipeline', async (I, dbaasPage) => {
  const clusterName = 'Kubernetes_Testing_Cluster';
  I.amOnPage(dbaasPage.url);
  I.waitForVisible(dbaasPage.fields.addKubernetesClusterButton, 30);
  I.click(dbaasPage.fields.addKubernetesClusterButton);
  I.seeElement(dbaasPage.fields.modalWindow);
  I.click(dbaasPage.fields.closeButton);
  I.dontSeeElement(dbaasPage.fields.modalWindow);
  I.click(dbaasPage.fields.addKubernetesClusterButton);
  I.seeElement(dbaasPage.fields.modalWindow);
  I.pressKey('Escape');
  I.dontSeeElement(dbaasPage.fields.modalWindow);
  //need add close by clicking out of the modal window
  I.click(dbaasPage.fields.addKubernetesClusterButton);
  I.fillField(dbaasPage.fields.kubernetesClusterNameInput, clusterName);
  I.fillField(dbaasPage.fields.kubeconfigFileInput, 'Kubernetes_Config_Test');
  I.click(dbaasPage.fields.kubernetesAddButton);
  I.see(dbaasPage.positiveAlertText);
  dbaasPage.checkAddedCluster(clusterName);
});

Scenario('PMM-T427 - Verify submitting blank Add kubernetes cluster form', async (I, dbaasPage) => {
  I.amOnPage(dbaasPage.url);
  I.waitForVisible(dbaasPage.fields.addKubernetesClusterButton, 30);
  I.click(dbaasPage.fields.addKubernetesClusterButton);
  I.seeElement(dbaasPage.fields.disabledAddButton);
});
