const assert = require('assert');
const page = require('./pages/remoteInstancesPage');

const instances = new DataTable(['name']);

for (const i of Object.keys(page.services)) {
  instances.add([i]);
}

Feature('Remote DB Instances').retry(2);

Before(async ({ I }) => {
  I.Authorize();
});

// TODO: unskip the mongodb tests after resolving a creds issue
Data(instances.filter((instance) => instance.name !== 'mongodb')).Scenario(
  'Verify Remote Instance Addition [critical] @not-pr-pipeline',
  async ({ I, remoteInstancesPage, current }) => {
    const serviceName = remoteInstancesPage.services[current.name];

    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
    remoteInstancesPage.openAddRemotePage(current.name);
    remoteInstancesPage.fillRemoteFields(serviceName);
    remoteInstancesPage.createRemoteInstance(serviceName);
  },
);

Scenario(
  'PMM-T588 - Verify adding external exporter service via UI @not-pr-pipeline',
  async ({ I, remoteInstancesPage, pmmInventoryPage }) => {
    const serviceName = 'external_service_new';

    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
    remoteInstancesPage.openAddRemotePage('external');
    remoteInstancesPage.fillRemoteFields(serviceName);
    I.waitForVisible(remoteInstancesPage.fields.addService, 30);
    I.click(remoteInstancesPage.fields.addService);
    pmmInventoryPage.verifyRemoteServiceIsDisplayed(serviceName);
    I.click(pmmInventoryPage.fields.agentsLink);
    I.waitForVisible(pmmInventoryPage.fields.externalExporter, 30);
  },
);

Data(instances.filter((instance) => instance.name !== 'mongodb')).Scenario(
  'Verify Remote Instance has Status Running [critical] @not-pr-pipeline',
  async ({
    I, remoteInstancesPage, pmmInventoryPage, current,
  }) => {
    const serviceName = remoteInstancesPage.services[current.name];

    I.amOnPage(pmmInventoryPage.url);
    pmmInventoryPage.verifyRemoteServiceIsDisplayed(serviceName);
    await pmmInventoryPage.verifyAgentHasStatusRunning(serviceName);
  },
);

Scenario(
  'TableStats UI Default table Options for Remote MySQL & AWS-RDS Instance',
  async ({ I, remoteInstancesPage, adminPage }) => {
    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
    remoteInstancesPage.openAddRemotePage('mysql');
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(1);
    I.waitForVisible(remoteInstancesPage.fields.tableStatsGroupTableLimit, 30);
    assert.strictEqual('-1', await remoteInstancesPage.getTableLimitFieldValue(), 'Count for Disabled Table Stats dont Match, was expecting -1');
    I.click(remoteInstancesPage.tableStatsLimitRadioButtonLocator('default'));
    assert.strictEqual('1000', await remoteInstancesPage.getTableLimitFieldValue(), 'Count for Default Table Stats dont Match, was expecting 1000');
    I.click(remoteInstancesPage.tableStatsLimitRadioButtonLocator('custom'));
    assert.strictEqual('1000', await remoteInstancesPage.getTableLimitFieldValue(), 'Count for Custom Table Stats dont Match, was expecting 1000');
  },
);
