const assert = require('assert');
const page = require('./pages/remoteInstancesPage');

const instances = new DataTable(['name']);

for (const i of Object.keys(page.services)) {
  instances.add([i]);
}

Feature('Remote DB Instances').retry(2);

Before(async ({ I }) => {
  await I.Authorize();
});

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
  'PMM-T590 - Verify parsing URL on adding External service page @not-pr-pipeline',
  async ({ I, remoteInstancesPage }) => {
    const metricsPath = '/metrics2';
    const credentials = 'something';
    const url = `https://something:something@${process.env.MONITORING_HOST}:${process.env.EXTERNAL_EXPORTER_PORT}/metrics2`;

    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
    remoteInstancesPage.openAddRemotePage('external');
    remoteInstancesPage.parseURL(url);
    await remoteInstancesPage.checkParsing(metricsPath, credentials);
  },
);

Scenario(
  'PMM-T630 - Verify adding External service with empty fields via UI @not-pr-pipeline',
  async ({ I, remoteInstancesPage }) => {
    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
    remoteInstancesPage.openAddRemotePage('external');
    I.waitForVisible(remoteInstancesPage.fields.addService, 30);
    I.click(remoteInstancesPage.fields.addService);
    remoteInstancesPage.checkRequiredField();
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
    adminPage.peformPageDown(1);
    I.waitForVisible(remoteInstancesPage.fields.tableStatsGroupTableLimit, 30);
    assert.strictEqual('-1', await remoteInstancesPage.getTableLimitFieldValue(), 'Count for Disabled Table Stats dont Match, was expecting -1');
    I.click(remoteInstancesPage.tableStatsLimitRadioButtonLocator('Default'));
    assert.strictEqual('1000', await remoteInstancesPage.getTableLimitFieldValue(), 'Count for Default Table Stats dont Match, was expecting 1000');
    I.click(remoteInstancesPage.tableStatsLimitRadioButtonLocator('Custom'));
    assert.strictEqual('1000', await remoteInstancesPage.getTableLimitFieldValue(), 'Count for Custom Table Stats dont Match, was expecting 1000');
  },
);

// Test is connected with T588
// It must be run after the creation of external exporter
Scenario(
  'PMM-T743 - Check metrics from external exporter on Advanced Data Exploration Dashboard @not-pr-pipeline',
  async ({ dashboardPage }) => {
    const metricName = 'redis_uptime_in_seconds';

    const response = await dashboardPage.checkMetricExist(metricName);
    const result = JSON.stringify(response.data.data.result);

    assert.ok(response.data.data.result.length !== 0, `Custom Metrics Should be available but got empty ${result}`);
  },
);
