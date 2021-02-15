const clusterName = 'Kubernetes_Testing_Cluster_Minikube';


Feature('Test the functionality for PXC Cluster Creation, Modifications, Actions');

Before(async (I, dbaasAPI) => {
  I.Authorize();
  if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
    await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
  }
});

After(async (I, dbaasAPI) => {
  await dbaasAPI.apiUnregisterCluster(clusterName, true);
});

// This test covers a lot of cases, will be refactored and changed in terms of flow, this is initial setup
Scenario('PMM-T575 Verify that Advanced Options are optional for DB Cluster Creation @dbaas @not-pr-pipeline',
  async (I, dbaasPage, dbaasAPI) => {
    const pxc_cluster_name = 'pmm-t575-cluster-5';

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
    I.click(dbaasPage.tabs.dbClusterTab.addDbClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.basicOptions.fields.clusterNameField, 30);
    I.fillField(dbaasPage.tabs.dbClusterTab.basicOptions.fields.clusterNameField, pxc_cluster_name);
    I.click(dbaasPage.tabs.dbClusterTab.basicOptions.fields.kubernetesClusterDropDown);
    I.waitForElement(
      dbaasPage.tabs.dbClusterTab.basicOptions.fields.kubernetesClusterDropDownSelect(clusterName),
      30,
    );
    I.click(dbaasPage.tabs.dbClusterTab.basicOptions.fields.kubernetesClusterDropDownSelect(clusterName));
    I.click(dbaasPage.tabs.dbClusterTab.basicOptions.fields.dbClusterDatabaseTypeField);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.basicOptions.fields.dbClusterDatabaseTypeFieldSelect('MySQL'));
    I.click(dbaasPage.tabs.dbClusterTab.basicOptions.fields.dbClusterDatabaseTypeFieldSelect('MySQL'));
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusPending, 30);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterConnectionLoading);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await dbaasPage.checkActionPossible('Delete', true);
    await dbaasPage.checkActionPossible('Edit', false);
    await dbaasPage.checkActionPossible('Restart', false);
    await dbaasPage.checkActionPossible('Resume', false);
    await dbaasAPI.waitForXtraDbClusterReady(pxc_cluster_name, clusterName);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusActive, 60);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusActive);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton, 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await dbaasPage.checkActionPossible('Delete', true);
    await dbaasPage.checkActionPossible('Edit', true);
    await dbaasPage.checkActionPossible('Restart', true);
    await dbaasPage.checkActionPossible('Suspend', true);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Delete'), 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Delete'));
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.deleteDBClusterButton, 30);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.cancelDeleteDBCluster, 30);
    I.seeTextEquals(
      dbaasPage.tabs.dbClusterTab.deleteDbClusterConfirmationText(pxc_cluster_name, clusterName, 'MySQL'),
      dbaasPage.tabs.kubernetesClusterTab.modalContentText,
    );
    I.click(dbaasPage.tabs.dbClusterTab.fields.deleteDBClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusDeleting, 30);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterConnectionLoading);
    await dbaasAPI.waitForXtraDbClusterDeleted(pxc_cluster_name, clusterName);
  });
