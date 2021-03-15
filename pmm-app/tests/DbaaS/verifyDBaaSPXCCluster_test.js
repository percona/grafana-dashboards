const clusterName = 'Kubernetes_Testing_Cluster_Minikube';
const assert = require('assert');

const pxc_cluster_name = 'pxc-dbcluster';
const pxc_cluster_name_single = 'pxc-singlenode';

Feature('Test the functionality for PXC Cluster Creation, Modifications, Actions, Verification tests');


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

// This test covers a lot of cases, will be refactored and changed in terms of flow, this is initial setup
Scenario('PMM-T455 PMM-T575 Verify that Advanced Options are optional for DB Cluster Creation, '
  + 'creating PXC cluster with default settings @dbaas @not-pr-pipeline',
async ({ I, dbaasPage }) => {
  I.amOnPage(dbaasPage.url);
  dbaasPage.checkCluster(clusterName, false);
  I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
  await dbaasPage.createClusterBasicOptions(clusterName, pxc_cluster_name, 'MySQL');
  I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
  I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
  await dbaasPage.postClusterCreationValidation(pxc_cluster_name, clusterName);
});

Scenario('PMM-T459, PMM-T473, PMM-T478 Verify DB Cluster Details are listed, shortcut link for DB Cluster, Show/Hide password button @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage }) => {
    const clusterDashboardRedirectionLink = '/graph/d/pxc-cluster-summary/pxc-galera-cluster-summary?var-cluster=pxc-dbcluster-pxc';

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 30);
    const dbClusterDetailHeaderCount = await I.grabNumberOfVisibleElements(
      dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader,
    );

    assert.ok(
      dbClusterDetailHeaderCount === 6,
      `Total DB Cluster Details should be 6, but some details missing found only ${dbClusterDetailHeaderCount}`,
    );
    const dbClusterDetailHeaders = await I.grabTextFromAll(
      dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader,
    );

    assert.deepEqual(dbClusterDetailHeaders, dbaasPage.tabs.dbClusterTab.fields.clusterDetailHeaders);
    const dbClusterName = await I.grabTextFrom(dbaasPage.tabs.dbClusterTab.fields.clusterName);

    assert.ok(
      dbClusterName === pxc_cluster_name,
      `The Name of the Cluster ${dbClusterName} is not same as expected ${pxc_cluster_name}`,
    );
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterSummaryDashboard);
    const dashboardLinkAttribute = await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.fields.clusterSummaryDashboard, 'href');

    assert.ok(
      dashboardLinkAttribute.includes(clusterDashboardRedirectionLink),
      `The Cluster Dashboard Redirection Link is wrong found ${dashboardLinkAttribute}`,
    );
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterDatabaseType);
    const clusterDBType = await I.grabTextFrom(dbaasPage.tabs.dbClusterTab.fields.clusterDatabaseType);

    assert.ok(
      clusterDBType === 'MySQL',
      `Expected DB Type was MySQL, but found ${clusterDBType}`,
    );
    dbaasPage.verifyElementInSection(dbaasPage.tabs.dbClusterTab.fields.clusterParameters);
    dbaasPage.verifyElementInSection(dbaasPage.tabs.dbClusterTab.fields.clusterConnection);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
    let passwordValue = await I.grabTextFrom(dbaasPage.tabs.dbClusterTab.fields.clusterDBPasswordValue);

    assert.ok(
      passwordValue === dbaasPage.tabs.dbClusterTab.defaultPassword,
      `Expected the Password to show default cluster password but found ${passwordValue}`,
    );
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
    passwordValue = await I.grabTextFrom(dbaasPage.tabs.dbClusterTab.fields.clusterDBPasswordValue);

    assert.ok(
      passwordValue !== dbaasPage.tabs.dbClusterTab.defaultPassword,
      `Expected the Show Password to show cluster password but found ${passwordValue}`,
    );
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
    passwordValue = await I.grabTextFrom(dbaasPage.tabs.dbClusterTab.fields.clusterDBPasswordValue);

    assert.ok(
      passwordValue === dbaasPage.tabs.dbClusterTab.defaultPassword,
      `Expected the Password to show default cluster password but found ${passwordValue}`,
    );
  });

Scenario('PMM-T582 Verify Adding Cluster with Same Name and Same DB Type @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage }) => {
    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    await dbaasPage.createClusterBasicOptions(clusterName, pxc_cluster_name, 'MySQL');
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    await dbaasPage.seeErrorForAddedDBCluster(pxc_cluster_name);
  });

Scenario('PMM-T452 Verify force unregistering Kubernetes cluster @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage }) => {
    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    dbaasPage.unregisterCluster(clusterName, true);
    dbaasPage.checkCluster(clusterName, true);
  });

Scenario('PMM-T524 Delete PXC Cluster and Unregister K8s Cluster @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage }) => {
    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
    await dbaasPage.deleteXtraDBCluster(pxc_cluster_name, clusterName);
  });

Scenario('Single Node PXC Cluster with Custom Resources @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage }) => {
    const configuration = {
      topology: 'Single',
      numberOfNodes: '1',
      resourcePerNode: 'Custom',
      memory: '2',
      cpu: '2',
      disk: '5',
    };

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    await dbaasPage.createClusterAdvancedOption(clusterName, pxc_cluster_name_single, 'MySQL', configuration);
    I.click(dbaasPage.tabs.dbClusterTab.createClusterButton);
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await dbaasPage.postClusterCreationValidation(pxc_cluster_name_single, clusterName);
    await dbaasPage.deleteXtraDBCluster(pxc_cluster_name_single, clusterName);
  });
