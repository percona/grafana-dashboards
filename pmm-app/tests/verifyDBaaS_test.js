const assert = require('assert');

Feature('Test the functionality inside DBaaS page');

Before(async (I) => {
  I.Authorize();
});

Scenario(
  'PMM-T426 - Verify adding new Kubernetes cluster, PMM-T428 - Verify adding new Kubernetes cluster with same name, PMM-T431 -Verify deleting Kubernetes cluster @not-pr-pipeline',
  async (I, dbaasPage) => {
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
    dbaasPage.addKubernetesCluster(clusterName, 'Kubernetes_Config_Test');
    I.waitForText(dbaasPage.addedAlertMessage, 10);
    dbaasPage.checkCluster(clusterName, false);
    //PMM-T428 - starting here
    dbaasPage.addKubernetesCluster(clusterName, 'Kubernetes_Config_Test');
    dbaasPage.seeErrorForAddedCluster(clusterName);
    //PMM-T431 - starting here
    dbaasPage.deleteCluster(clusterName);
    dbaasPage.checkCluster(clusterName, true);
  },
);

Scenario(
  'PMM-T427 - Verify submitting blank Add kubernetes cluster form @not-pr-pipeline',
  async (I, dbaasPage) => {
    const clusterName = 'Kubernetes_Testing_Cluster';

    I.amOnPage(dbaasPage.url);
    I.waitForVisible(dbaasPage.fields.addKubernetesClusterButton, 30);
    I.click(dbaasPage.fields.addKubernetesClusterButton);
    I.seeElement(dbaasPage.fields.disabledAddButton);
    I.click(dbaasPage.fields.kubernetesClusterNameInput);
    I.click(dbaasPage.fields.kubeconfigFileInput);
    I.click(dbaasPage.fields.kubernetesClusterNameInput);
    const count = await I.grabNumberOfVisibleElements(dbaasPage.fields.requiredField);
    assert.ok(count === 2, `Count of error messages is ${count} but should be 2`);
    I.fillField(dbaasPage.fields.kubernetesClusterNameInput, clusterName);
    I.fillField(dbaasPage.fields.kubeconfigFileInput, 'Kubernetes_Config_Test');
    I.dontSeeElement(dbaasPage.fields.disabledAddButton);
  },
);
