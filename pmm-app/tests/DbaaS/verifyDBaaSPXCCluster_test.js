const assert = require('assert');

const clusterName = 'Kubernetes_Testing_Cluster_Minikube';
const pxc_cluster_name = 'pxc-dbcluster';
const pxc_cluster_name_single = 'pxc-singlenode';
const psmdb_cluster = 'psmdb-cluster';
const pxc_cluster_small = 'pxc-smalldbcluster';

const psmdb_configuration = {
  topology: 'Cluster',
  numberOfNodes: '1',
  resourcePerNode: 'Custom',
  memory: '2 GB',
  cpu: '1',
  disk: '5 GB',
  dbType: 'MongoDB',
  clusterDashboardRedirectionLink: `/graph/d/mongodb-cluster-summary/mongodb-cluster-summary?var-cluster=${psmdb_cluster}`,
};

Feature('Test the functionality for PXC/MongoDB Cluster Creation, Modifications, Actions, Verification tests');


BeforeSuite(async ({ dbaasAPI }) => {
  if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
    await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
  }
});

AfterSuite(async ({ dbaasAPI }) => {
  await dbaasAPI.apiUnregisterCluster(clusterName, true);
});

Before(async ({ I, dbaasAPI }) => {
  I.Authorize();
  if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
    await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
  }
});

// These test covers a lot of cases, will be refactored and changed in terms of flow, this is initial setup

Scenario('PMM-T642 PMM-T484  PSMDB Cluster with Custom Resources, Verify MongoDB Cluster can be restarted @dbaas @not-pr-pipeline',
  async ({
    I, dbaasPage, dbaasAPI, dbaasActionsPage,
  }) => {
    if (await dbaasAPI.apiCheckDbClusterExist(psmdb_cluster, clusterName, 'MongoDB')) {
      await dbaasAPI.apiDeletePSMDBCluster(psmdb_cluster, clusterName);
      await dbaasAPI.waitForDbClusterDeleted(psmdb_cluster, clusterName, 'MongoDB');
    }

    await dbaasPage.waitForDbClusterTab(clusterName);
    await dbaasActionsPage.createClusterAdvancedOption(clusterName, psmdb_cluster, 'MongoDB', psmdb_configuration);
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasPage.postClusterCreationValidation(psmdb_cluster, clusterName, 'MongoDB');
    await dbaasPage.validateClusterDetail(psmdb_cluster, clusterName, psmdb_configuration);
  });

Scenario('PMM-T477 PMM-T461 Verify MongoDB Cluster can be restarted, unregister k8s Cluster when Db Cluster Exist @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    await dbaasPage.waitForKubernetesClusterTab(clusterName);
    dbaasPage.unregisterCluster(clusterName);
    I.waitForText(dbaasPage.failedUnregisterCluster(clusterName, 'PSMDB'));
    await dbaasPage.waitForDbClusterTab(clusterName);
    await dbaasActionsPage.restartCluster(psmdb_cluster, clusterName, 'MongoDB');
    await dbaasPage.validateClusterDetail(psmdb_cluster, clusterName, psmdb_configuration);
    await dbaasActionsPage.deletePSMDBCluster(psmdb_cluster, clusterName);
  });

Scenario('PMM-T455 PMM-T575 Verify that Advanced Options are optional for DB Cluster Creation, '
  + 'creating PXC cluster with default settings @dbaas @not-pr-pipeline',
async ({
  I, dbaasPage, dbaasAPI, dbaasActionsPage,
}) => {
  if (await dbaasAPI.apiCheckDbClusterExist(psmdb_cluster, clusterName, 'MongoDB')) {
    await dbaasAPI.apiDeletePSMDBCluster(psmdb_cluster, clusterName);
    await dbaasAPI.waitForDbClusterDeleted(psmdb_cluster, clusterName, 'MongoDB');
  }

  await dbaasPage.waitForDbClusterTab(clusterName);
  await dbaasActionsPage.createClusterBasicOptions(clusterName, pxc_cluster_name, 'MySQL');
  I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
  I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
  await dbaasPage.postClusterCreationValidation(pxc_cluster_name, clusterName);
});

Scenario('PMM-T459, PMM-T473, PMM-T478, PMM-T524 Verify DB Cluster Details are listed, shortcut link for DB Cluster, Show/Hide password button @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    const clusterDetails = {
      clusterDashboardRedirectionLink: `/graph/d/pxc-cluster-summary/pxc-galera-cluster-summary?var-cluster=${pxc_cluster_name}-pxc`,
      dbType: 'MySQL',
      memory: '2 GB',
      cpu: '1',
      disk: '25 GB',
    };

    await dbaasPage.waitForDbClusterTab(clusterName);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 30);
    await dbaasPage.validateClusterDetail(pxc_cluster_name, clusterName, clusterDetails);
    await dbaasActionsPage.restartCluster(pxc_cluster_name, clusterName, 'MySQL');
    await dbaasPage.validateClusterDetail(pxc_cluster_name, clusterName, clusterDetails);
  });

Scenario('PMM-T582 Verify Adding Cluster with Same Name and Same DB Type @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    await dbaasPage.waitForDbClusterTab(clusterName);
    await dbaasActionsPage.createClusterBasicOptions(clusterName, pxc_cluster_name, 'MySQL');
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    await dbaasPage.seeErrorForAddedDBCluster(pxc_cluster_name);
  });

Scenario('PMM-T460, PMM-T452 Verify force unregistering Kubernetes cluster @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage }) => {
    await dbaasPage.waitForKubernetesClusterTab(clusterName);
    dbaasPage.unregisterCluster(clusterName);
    I.waitForText(dbaasPage.failedUnregisterCluster(clusterName, 'XtraDB'));
    dbaasPage.unregisterCluster(clusterName, true);
    I.waitForText(dbaasPage.deletedAlertMessage, 20);
    dbaasPage.checkCluster(clusterName, true);
  });

Scenario('PMM-T524 Delete PXC Cluster and Unregister K8s Cluster @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    await dbaasPage.waitForDbClusterTab(clusterName);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.dbClusterAddButtonTop, 30);
    await dbaasActionsPage.deleteXtraDBCluster(pxc_cluster_name, clusterName);
  });

Scenario('PMM-T640 PMM-T479 Single Node PXC Cluster with Custom Resources @dbaas @not-pr-pipeline',
  async ({
    I, dbaasPage, dbaasActionsPage, dbaasAPI,
  }) => {
    if (await dbaasAPI.apiCheckDbClusterExist(psmdb_cluster, clusterName, 'MongoDB')) {
      await dbaasAPI.apiDeletePSMDBCluster(psmdb_cluster, clusterName);
      await dbaasAPI.waitForDbClusterDeleted(psmdb_cluster, clusterName, 'MongoDB');
    }

    const configuration = {
      topology: 'Single',
      numberOfNodes: '1',
      resourcePerNode: 'Custom',
      memory: '2 GB',
      cpu: '2',
      disk: '5 GB',
      dbType: 'MySQL',
      clusterDashboardRedirectionLink: `/graph/d/pxc-cluster-summary/pxc-galera-cluster-summary?var-cluster=${pxc_cluster_name_single}-pxc`,
    };

    await dbaasPage.waitForDbClusterTab(clusterName);
    await dbaasActionsPage.createClusterAdvancedOption(clusterName, pxc_cluster_name_single, 'MySQL', configuration);
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasPage.postClusterCreationValidation(pxc_cluster_name_single, clusterName);
    await dbaasPage.validateClusterDetail(pxc_cluster_name_single, clusterName, configuration);
    await dbaasActionsPage.deleteXtraDBCluster(pxc_cluster_name_single, clusterName);
  });

Scenario('PMM-T522 Verify Editing a Cluster with Custom Setting and float values is possible @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    await dbaasPage.waitForDbClusterTab(clusterName);
    await dbaasActionsPage.createClusterBasicOptions(clusterName, pxc_cluster_small, 'MySQL');
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasPage.postClusterCreationValidation(pxc_cluster_small, clusterName);
    const configuration = {
      topology: 'Single',
      numberOfNodes: '1',
      resourcePerNode: 'Custom',
      memory: '1.2 GB',
      cpu: '0.2',
      disk: '25 GB',
      dbType: 'MySQL',
      clusterDashboardRedirectionLink: `/graph/d/pxc-cluster-summary/pxc-galera-cluster-summary?var-cluster=${pxc_cluster_small}-pxc`,
    };

    await dbaasActionsPage.editCluster(pxc_cluster_small, clusterName, configuration);
    I.click(dbaasPage.tabs.dbClusterTab.updateClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasPage.postClusterCreationValidation(pxc_cluster_small, clusterName);
    await dbaasPage.validateClusterDetail(pxc_cluster_small, clusterName, configuration);
    await dbaasActionsPage.deleteXtraDBCluster(pxc_cluster_small, clusterName);
  });

Scenario('PMM-T525 PMM-T528 Verify Suspend & Resume for DB Cluster Works as expected @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    const pxc_cluster_suspend_resume = 'pxc-suspend-resume7';
    const clusterDetails = {
      clusterDashboardRedirectionLink: `/graph/d/pxc-cluster-summary/pxc-galera-cluster-summary?var-cluster=${pxc_cluster_suspend_resume}-pxc`,
      dbType: 'MySQL',
      memory: '2 GB',
      cpu: '1',
      disk: '25 GB',
    };

    await dbaasPage.waitForDbClusterTab(clusterName);
    await dbaasActionsPage.createClusterBasicOptions(clusterName, pxc_cluster_suspend_resume, 'MySQL');
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasPage.postClusterCreationValidation(pxc_cluster_suspend_resume, clusterName);
    await dbaasActionsPage.suspendCluster(pxc_cluster_suspend_resume, clusterName);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusPaused, 60);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusPaused);
    await dbaasActionsPage.resumeCluster(pxc_cluster_suspend_resume, clusterName);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusActive, 60);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusActive);
    await dbaasPage.validateClusterDetail(pxc_cluster_suspend_resume, clusterName, clusterDetails);
    await dbaasActionsPage.deleteXtraDBCluster(pxc_cluster_suspend_resume, clusterName);
  });

Scenario('PMM-T509 Verify Deleting Db Cluster in Pending Status is possible @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    const pxc_cluster_pending_delete = 'pxc-pending-delete';

    await dbaasPage.waitForDbClusterTab(clusterName);
    await dbaasActionsPage.createClusterBasicOptions(clusterName, pxc_cluster_pending_delete, 'MySQL');
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasActionsPage.deleteXtraDBCluster(pxc_cluster_pending_delete, clusterName);
  });

Scenario('PMM-T489 Verify Increase Decrease @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    const pxc_cluster_pending_delete = 'pxc-pending-delete';

    await dbaasPage.waitForDbClusterTab(clusterName);
    await dbaasActionsPage.createClusterBasicOptions(clusterName, pxc_cluster_pending_delete, 'MySQL');
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasActionsPage.deleteXtraDBCluster(pxc_cluster_pending_delete, clusterName);
  });

Scenario('Verify Adding PMM-Server Public Address via Settings works @dbaas @not-pr-pipeline',
  async ({
    I, dbaasPage, dbaasAPI, pmmSettingsPage,
  }) => {
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

    if (await dbaasAPI.apiCheckDbClusterExist(psmdb_cluster, clusterName, 'MongoDB')) {
      await dbaasAPI.apiDeletePSMDBCluster(psmdb_cluster, clusterName);
      await dbaasAPI.waitForDbClusterDeleted(psmdb_cluster, clusterName, 'MongoDB');
    }

    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();

    I.waitForElement(pmmSettingsPage.fields.publicAddressInput, 30);
    I.seeElement(pmmSettingsPage.fields.publicAddressInput);
    I.seeElement(pmmSettingsPage.fields.publicAddressButton);
    I.click(pmmSettingsPage.fields.publicAddressButton);
    let publicAddress = await I.grabValueFrom(pmmSettingsPage.fields.publicAddressInput);

    assert.ok(
      publicAddress === process.env.SERVER_IP,
      `Expected the Public Address Input Field to Match ${process.env.SERVER_IP} but found ${publicAddress}`,
    );
    I.click(pmmSettingsPage.fields.advancedButton);
    I.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
    I.refreshPage();
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    publicAddress = await I.grabValueFrom(pmmSettingsPage.fields.publicAddressInput);

    assert.ok(
      publicAddress === process.env.SERVER_IP,
      `Expected the Public Address to be saved and Match ${process.env.SERVER_IP} but found ${publicAddress}`,
    );
    await dbaasPage.waitForDbClusterTab(clusterName);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
    I.click(dbaasPage.tabs.dbClusterTab.addDbClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.basicOptions.fields.clusterNameField, 30);
    I.dontSeeElement(dbaasPage.tabs.dbClusterTab.monitoringWarningLocator, 30);
    I.dontSee(dbaasPage.monitoringWarningMessage);
  });
