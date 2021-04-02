const assert = require('assert');

const serviceNames = {
  mysql: 'mysql_upgrade_service',
  postgresql: 'postgres_upgrade_service',
  proxysql: 'proxysql_upgrade_service',
  rds: 'mysql_rds_uprgade_service',
};
let customDashboardUrl;

// For running on local env set PMM_SERVER_LATEST and DOCKER_VERSION variables
function getVersions() {
  const [, pmmMinor, pmmPatch] = process.env.PMM_SERVER_LATEST.split('.');
  const [, dockerMinor, dockerPatch] = process.env.DOCKER_VERSION.split('.');
  const majorVersionDiff = pmmMinor - dockerMinor;
  const patchVersionDiff = pmmPatch - dockerPatch;
  const current = `2.${dockerMinor}`;

  return {
    majorVersionDiff,
    patchVersionDiff,
    current,
    dockerMinor,
  };
}

Feature('PMM server Upgrade Tests and Executing test cases related to Upgrade Testing Cycle').retry(2);

Before(async ({ I }) => {
  await I.Authorize();
  I.setRequestTimeout(30000);
});

Scenario(
  'PMM-T289 Verify Whats New link is presented on Update Widget @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, homePage }) => {
    const versions = getVersions();
    const locators = homePage.getLocators(versions.dockerMinor);

    I.amOnPage(homePage.url);
    // Whats New Link is added for the latest version hours before the release,
    // hence we need to skip checking on that, rest it should be available and checked.
    if (versions.majorVersionDiff >= 1 && versions.patchVersionDiff >= 0) {
      I.waitForElement(locators.whatsNewLink, 30);
      I.seeElement(locators.whatsNewLink);
      const link = await I.grabAttributeFrom(locators.whatsNewLink, 'href');

      assert.equal(link.indexOf('https://per.co.na/pmm/') > -1, true, 'Whats New Link has an unexpected URL');
    }
  },
);

Scenario(
  'PMM-T288 Verify user can see Update widget before upgrade [critical]  @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, homePage }) => {
    const versions = getVersions();

    I.amOnPage(homePage.url);
    await homePage.verifyPreUpdateWidgetIsPresent(versions.dockerMinor);
  },
);

Scenario(
  'PMM-T391 Verify user is able to create and set custom home dashboard @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, grafanaAPI, dashboardPage }) => {
    const resp = await grafanaAPI.createCustomDashboard();

    customDashboardUrl = resp.url;

    await grafanaAPI.starDashboard(resp.id);
    await grafanaAPI.setHomeDashboard(resp.id);

    I.amOnPage('');
    dashboardPage.waitForDashboardOpened();
    dashboardPage.verifyMetricsExistence(['Custom Panel']);
    I.seeInCurrentUrl(resp.url);
  },
);

Scenario(
  'Verify user can create Remote Instances before upgrade and they are in RUNNNING status @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({
    inventoryAPI, addInstanceAPI,
  }) => {
    // Adding instances for monitoring
    for (const type of Object.values(addInstanceAPI.instanceTypes)) {
      if (type !== 'MongoDB') await addInstanceAPI.apiAddInstance(type, serviceNames[type.toLowerCase()]);
    }

    // Checking that instances are RUNNING
    for (const service of Object.values(inventoryAPI.services)) {
      if (service.service !== 'mongodb') await inventoryAPI.verifyServiceExistsAndHasRunningStatus(service, serviceNames[service.service]);
    }
  },
);

Scenario(
  'Verify user is able to Upgrade PMM version [blocker] @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, homePage }) => {
    const versions = getVersions();

    I.amOnPage(homePage.url);
    await homePage.upgradePMM(versions.dockerMinor);
  },
);

Scenario(
  'PMM-T391 Verify that custom home dashboard stays as home dashboard after upgrade @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, dashboardPage }) => {
    I.amOnPage('');
    dashboardPage.waitForDashboardOpened();
    dashboardPage.verifyMetricsExistence(['Custom Panel']);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData();
    I.seeInCurrentUrl(customDashboardUrl);
  },
);

Scenario(
  'Verify Agents are RUNNING after Upgrade (API) [critical] @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ inventoryAPI }) => {
    for (const service of Object.values(inventoryAPI.services)) {
      if (service.service !== 'mongodb') await inventoryAPI.verifyServiceExistsAndHasRunningStatus(service, serviceNames[service.service]);
    }
  },
);

Scenario(
  'Verify user can see Update widget [critical] @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, homePage }) => {
    I.amOnPage(homePage.url);
    await homePage.verifyPostUpdateWidgetIsPresent();
  },
);

Scenario(
  'PMM-T262 Open PMM Settings page and verify DATA_RETENTION value is set to 2 days after upgrade @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, pmmSettingsPage }) => {
    const dataRetention = '2';
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    const dataRetentionActualValue = await I.grabValueFrom(pmmSettingsPage.fields.dataRetentionInput);

    assert.equal(
      dataRetention,
      dataRetentionActualValue,
      'The Value for Data Retention is not the same as passed via Docker Environment Variable',
    );
  },
);

Scenario(
  'Verify user can see News Panel @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, homePage }) => {
    I.amOnPage(homePage.url);
    I.waitForVisible(homePage.fields.newsPanelTitleSelector, 30);
    I.waitForVisible(homePage.fields.newsPanelContentSelector, 30);
    const newsItems = await I.grabNumberOfVisibleElements(`${homePage.fields.newsPanelContentSelector}/div`);

    assert.ok(newsItems > 1, 'News Panel is empty');
  },
);

Scenario(
  'PMM-T424 Verify PT Summary Panel is available after Upgrade @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, dashboardPage }) => {
    const filter = 'Node Name';

    I.amOnPage(`${dashboardPage.nodeSummaryDashboard.url}&var-node_name=pmm-server`);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    await dashboardPage.applyFilter(filter, 'pmm-server');

    I.waitForElement(dashboardPage.nodeSummaryDashboard.ptSummaryDetail.reportContainer, 60);
    I.seeElement(dashboardPage.nodeSummaryDashboard.ptSummaryDetail.reportContainer);
  },
);

Scenario(
  'Verify Agents are RUNNING after Upgrade (UI) [critical] @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I, pmmInventoryPage }) => {
    for (const service of Object.values(serviceNames)) {
      I.amOnPage(pmmInventoryPage.url);
      await pmmInventoryPage.verifyAgentHasStatusRunning(service);
    }
  },
);

Scenario(
  'Verify QAN has specific filters for Remote Instances after Upgrade (UI) @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, qanPage, qanFilters, addInstanceAPI,
  }) => {
    I.amOnPage(qanPage.url);
    qanFilters.waitForFiltersToLoad();
    await qanFilters.expandAllFilters();

    // Checking that Cluster filters are still in QAN after Upgrade
    for (const name of Object.values(addInstanceAPI.clusterNames)) {
      // For now we can't see the cluster names in QAN for ProxySQL and MongoDB
      if (name !== addInstanceAPI.clusterNames.proxysql && name !== addInstanceAPI.clusterNames.mongodb) {
        const filter = qanFilters.getFilterLocator(name);

        I.waitForVisible(filter, 30);
        I.seeElement(filter);
      }
    }
  },
);

Scenario(
  'Verify Metrics from custom queries for mysqld_exporter after upgrade (UI) @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ dashboardPage }) => {
    const metricName = 'mysql_performance_schema_memory_summary_current_bytes';

    const response = await dashboardPage.checkMetricExist(metricName);
    const result = JSON.stringify(response.data.data.result);

    assert.ok(response.data.data.result.length !== 0, `Custom Metrics Should be available but got empty ${result}`);
  },
);

Scenario(
  'PMM-T102 Verify Custom Prometheus Configuration File is still available at targets after Upgrade @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async ({ I }) => {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const response = await I.sendGetRequest('prometheus/api/v1/targets', headers);

    const targets = response.data.data.activeTargets.find(
      (o) => o.labels.job === 'blackbox80',
    );

    assert.ok(targets.labels.job === 'blackbox80', 'Active Target from Custom Prometheus Config After Upgrade is not Available');
  },
);
