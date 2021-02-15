const assert = require('assert');

Feature('Test the functionality inside DBaaS page');

Before(async ({ I }) => {
  I.Authorize();
});

Scenario(
  'PMM-T426 - Verify adding new Kubernetes cluster minikube, PMM-T428 - Verify adding new Kubernetes cluster with same name, PMM-T546, PMM-T431 -Verify unregistering Kubernetes cluster @not-pr-pipeline @dbaas',
  async ({ I, dbaasPage }) => {
    const clusterName = 'Kubernetes_Testing_Cluster_Minikube';

    I.amOnPage(dbaasPage.url);
    I.waitForVisible(dbaasPage.fields.addKubernetesClusterButtonInTable, 30);
    I.click(dbaasPage.fields.addKubernetesClusterButton);
    I.seeElement(dbaasPage.fields.modalWindow);
    I.click(dbaasPage.fields.closeButton);
    I.dontSeeElement(dbaasPage.fields.modalWindow);
    I.click(dbaasPage.fields.addKubernetesClusterButton);
    I.seeElement(dbaasPage.fields.modalWindow);
    I.pressKey('Escape');
    I.dontSeeElement(dbaasPage.fields.modalWindow);
    // cannot automate click outside the form
    dbaasPage.registerKubernetesCluster(clusterName, process.env.kubeconfig_minikube);
    I.waitForText(dbaasPage.addedAlertMessage, 10);
    dbaasPage.checkCluster(clusterName, false);
    // PMM-T428 - starting here
    dbaasPage.registerKubernetesCluster(clusterName, process.env.kubeconfig_minikube);
    dbaasPage.seeErrorForAddedCluster(clusterName);
    // PMM-T431, PMM-T546 - starting here, unregister cluster using unregister option
    dbaasPage.unregisterCluster(clusterName);
    dbaasPage.checkCluster(clusterName, true);
  },
);

Scenario(
  'PMM-T427 - Verify submitting blank Add kubernetes cluster form @not-pr-pipeline @dbaas',
  async ({ I, dbaasPage }) => {
    const clusterName = 'Kubernetes_Testing_Cluster';

    I.amOnPage(dbaasPage.url);
    I.waitForVisible(dbaasPage.fields.addKubernetesClusterButtonInTable, 30);
    I.click(dbaasPage.fields.addKubernetesClusterButton);
    I.seeElement(dbaasPage.fields.disabledAddButton);
    I.click(dbaasPage.fields.kubernetesClusterNameInput);
    I.click(dbaasPage.fields.kubeconfigFileInput);
    I.click(dbaasPage.fields.kubernetesClusterNameInput);
    const count = await I.grabNumberOfVisibleElements(dbaasPage.fields.requiredField);

    assert.ok(count === 2, `Count of error messages is: ${count} but should be 2`);
    I.fillField(dbaasPage.fields.kubernetesClusterNameInput, clusterName);
    I.fillField(dbaasPage.fields.kubeconfigFileInput, 'Kubernetes_Config_Test');
    I.dontSeeElement(dbaasPage.fields.disabledAddButton);
  },
);

Scenario('PMM-T427 - Verify elements on PMM DBaaS page @not-pr-pipeline @dbaas', async ({ I, dbaasPage }) => {
  I.amOnPage(dbaasPage.url);
  I.waitForVisible(dbaasPage.fields.addKubernetesClusterButton, 30);
  I.waitForVisible(dbaasPage.fields.addKubernetesClusterButtonInTable, 30);
});

Scenario('PMM-T547 Verify user is able to view config of registered Kubernetes cluster on Kubernetes Cluster Page @not-pr-pipeline @dbaas', async ({ I, dbaasPage, dbaasAPI }) => {
  const clusterName = 'Kubernetes_Testing_Cluster';

  await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
  I.amOnPage(dbaasPage.url);
  dbaasPage.checkCluster(clusterName, false);
  I.waitForElement(dbaasPage.fields.actionsLocator(clusterName), 30);
  I.click(dbaasPage.fields.actionsLocator(clusterName));
  I.waitForElement(dbaasPage.fields.viewClusterConfiguration, 30);
  I.click(dbaasPage.fields.viewClusterConfiguration);
  I.waitForElement(dbaasPage.fields.modalContent, 30);
  I.seeElement(dbaasPage.fields.copyToClipboardButton);
  I.click(dbaasPage.fields.copyToClipboardButton);
  I.waitForText(dbaasPage.configurationCopiedMessage, 30);
  const configuration = await I.grabTextFrom(dbaasPage.fields.clusterConfigurationText);

  assert.ok(configuration === process.env.kubeconfig_minikube, `The configuration shown is not equal to the expected Cluster configuration, ${configuration}`);
  await dbaasAPI.apiUnregisterCluster(clusterName);
});

Scenario('Verify user is able to add same cluster config with different Name @not-pr-pipeline @dbaas', async ({ I, dbaasPage, dbaasAPI }) => {
  const clusterName1 = 'Kubernetes_Testing_Cluster_1';
  const clusterName2 = 'Kubernetes_Testing_Cluster_2';

  await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName1);
  await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName2);
  I.amOnPage(dbaasPage.url);
  dbaasPage.checkCluster(clusterName1, false);
  dbaasPage.checkCluster(clusterName2, false);
  await dbaasAPI.apiUnregisterCluster(clusterName1);
  await dbaasAPI.apiUnregisterCluster(clusterName2);
  I.refreshPage();
  dbaasPage.checkCluster(clusterName2, true);
  dbaasPage.checkCluster(clusterName1, true);
});
