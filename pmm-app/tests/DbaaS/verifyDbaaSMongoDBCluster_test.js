const { dbaasAPI } = inject();
const clusterName = 'Kubernetes_Testing_Cluster_Minikube';
const psmdb_cluster = 'psmdb-cluster';

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

Feature('DBaaS: MongoDB Cluster Creation, Modifications, Actions, Verification tests');


BeforeSuite(async ({ dbaasAPI }) => {
  if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
    await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
  }
});

AfterSuite(async ({ dbaasAPI }) => {
  await dbaasAPI.apiUnregisterCluster(clusterName, true);
});

Before(async ({ I, dbaasAPI }) => {
  await I.Authorize();
  if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
    await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
  }
});

// These test covers a lot of cases, will be refactored and changed in terms of flow, this is initial setup

Scenario('PMM-T642 PMM-T484  PSMDB Cluster with Custom Resources, Verify MongoDB Cluster can be restarted @dbaas @not-pr-pipeline',
  async ({
    I, dbaasPage, dbaasAPI, dbaasActionsPage,
  }) => {
    await dbaasAPI.deleteAllDBCluster(clusterName);
    await dbaasPage.waitForDbClusterTab(clusterName);
    I.waitForInvisible(dbaasPage.tabs.kubernetesClusterTab.disabledAddButton, 30);
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
    I.waitForInvisible(dbaasPage.tabs.kubernetesClusterTab.disabledAddButton, 30);
    await dbaasActionsPage.restartCluster(psmdb_cluster, clusterName, 'MongoDB');
    await dbaasPage.validateClusterDetail(psmdb_cluster, clusterName, psmdb_configuration);
    await dbaasActionsPage.deletePSMDBCluster(psmdb_cluster, clusterName);
  });

Scenario('PMM-T525 PMM-T528 Verify Suspend & Resume for Mongo DB Cluster Works as expected @nightly @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    const psmdb_cluster_suspend_resume = 'psmdb-suspend-resume';
    const clusterDetails = {
      topology: 'Cluster',
      numberOfNodes: '1',
      resourcePerNode: 'Custom',
      memory: '2 GB',
      cpu: '1',
      disk: '2 GB',
      dbType: 'MongoDB',
      clusterDashboardRedirectionLink: `/graph/d/mongodb-cluster-summary/mongodb-cluster-summary?var-cluster=${psmdb_cluster_suspend_resume}`,
    };

    await dbaasAPI.deleteAllDBCluster(clusterName);
    await dbaasPage.waitForDbClusterTab(clusterName);
    I.waitForInvisible(dbaasPage.tabs.kubernetesClusterTab.disabledAddButton, 30);
    await dbaasActionsPage.createClusterAdvancedOption(clusterName, psmdb_cluster_suspend_resume, 'MongoDB', clusterDetails);
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasPage.postClusterCreationValidation(psmdb_cluster_suspend_resume, clusterName, 'MongoDB');
    await dbaasPage.validateClusterDetail(psmdb_cluster_suspend_resume, clusterName, clusterDetails);
    await dbaasActionsPage.suspendCluster(psmdb_cluster_suspend_resume, clusterName, 'MongoDB');
    I.waitForVisible(dbaasPage.tabs.dbClusterTab.fields.clusterStatusPaused, 60);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusPaused);
    await dbaasActionsPage.resumeCluster(psmdb_cluster_suspend_resume, clusterName, 'MongoDB');
    I.waitForVisible(dbaasPage.tabs.dbClusterTab.fields.clusterStatusActive, 60);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusActive);
    await dbaasPage.validateClusterDetail(psmdb_cluster_suspend_resume, clusterName, clusterDetails);
    await dbaasActionsPage.deletePSMDBCluster(psmdb_cluster_suspend_resume, clusterName);
  });

Scenario('PMM-T509 Verify Deleting Mongo Db Cluster in Pending Status is possible @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasActionsPage }) => {
    const psmdb_cluster_pending_delete = 'psmdb-pending-delete';

    await dbaasAPI.deleteAllDBCluster(clusterName);
    await dbaasPage.waitForDbClusterTab(clusterName);
    I.waitForInvisible(dbaasPage.tabs.kubernetesClusterTab.disabledAddButton, 30);
    await dbaasActionsPage.createClusterBasicOptions(clusterName, psmdb_cluster_pending_delete, 'MongoDB');
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasActionsPage.deletePSMDBCluster(psmdb_cluster_pending_delete, clusterName);
  });
