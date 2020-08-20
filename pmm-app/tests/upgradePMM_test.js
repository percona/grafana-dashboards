const assert = require('assert');

const serviceNames = {
  mysql: 'mysql_upgrade_service',
  postgresql: 'postgres_upgrade_service',
  mongodb: 'mongodb_upgrade_service',
  proxysql: 'proxysql_upgrade_service',
  rds: 'mysql_rds_uprgade_service',
};

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
  };
}

Feature('PMM server Upgrade Tests and Executing test cases related to Upgrade Testing Cycle');

Before(async (I) => {
  I.Authorize();
  I.setRequestTimeout(30000);
});

Scenario(
  'PMM-T289 Verify Whats New link is presented on Update Widget @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, homePage) => {
    const versions = getVersions();

    I.amOnPage(homePage.url);
    // Whats New Link is added for the latest version hours before the release,
    // hence we need to skip checking on that, rest it should be available and checked.
    if (versions.majorVersionDiff >= 1 && versions.patchVersionDiff >= 0) {
      I.waitForElement(homePage.fields.whatsNewLink, 30);
      I.seeElement(homePage.fields.whatsNewLink);
      const link = await I.grabAttributeFrom(homePage.fields.whatsNewLink, 'href');

      assert.equal(link.indexOf('https://per.co.na/pmm/') > -1, true, 'Whats New Link has an unexpected URL');
    }
  },
);

Scenario(
  'PMM-T288 Verify user can see Update widget before upgrade [critical]  @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, adminPage, homePage) => {
    const versions = getVersions();

    I.amOnPage(homePage.url);
    await homePage.verifyPreUpdateWidgetIsPresent(versions.current);
  },
);

Scenario(
  'Verify user can create Remote Instances before upgrade and they are in RUNNNING status @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, homePage, inventoryAPI, addInstanceAPI) => {
    // Adding instances for monitoring
    for (const type of Object.values(addInstanceAPI.instanceTypes)) {
      await addInstanceAPI.apiAddInstance(type, serviceNames[type.toLowerCase()]);
    }

    // Checking that instances are RUNNING
    for (const service of Object.values(inventoryAPI.services)) {
      await inventoryAPI.verifyServiceExistsAndHasRunningStatus(service, serviceNames[service.service]);
    }
  },
);

Scenario(
  'Verify user is able to Upgrade PMM version [blocker] @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, inventoryAPI, homePage) => {
    const versions = getVersions();

    I.amOnPage(homePage.url);
    await homePage.upgradePMM(versions.current);
  },
);

Scenario(
  'Verify Agents are RUNNING after Upgrade (API) [critical] @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, inventoryAPI) => {
    for (const service of Object.values(inventoryAPI.services)) {
      await inventoryAPI.verifyServiceExistsAndHasRunningStatus(service, serviceNames[service.service]);
    }
  },
);

Scenario(
  'Verify user can see Update widget [critical] @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, adminPage, homePage) => {
    I.amOnPage(homePage.url);
    await homePage.verifyPostUpdateWidgetIsPresent();
  },
);

Scenario(
  'PMM-T262 Open PMM Settings page and verify DATA_RETENTION value is set to 2 days after upgrade @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, pmmSettingsPage) => {
    const dataRetention = '2';

    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection('Advanced settings', pmmSettingsPage.fields.advancedButton);
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
  async (I, adminPage, homePage) => {
    I.amOnPage(homePage.url);
    I.waitForVisible(homePage.fields.newsPanelTitleSelector, 30);
    I.waitForVisible(homePage.fields.newsPanelContentSelector, 30);
    const newsItems = await I.grabNumberOfVisibleElements(`${homePage.fields.newsPanelContentSelector}/div`);

    assert.ok(newsItems > 1, 'News Panel is empty');
  },
);

Scenario(
  'Verify Agents are RUNNING after Upgrade (UI) [critical] @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, adminPage, pmmInventoryPage) => {
    for (const service of Object.values(serviceNames)) {
      I.amOnPage(pmmInventoryPage.url);
      await pmmInventoryPage.verifyAgentHasStatusRunning(service);
    }
  },
);

Scenario(
  'Verify QAN has specific filters for Remote Instances after Upgrade (UI) @pmm-upgrade @not-ui-pipeline @not-pr-pipeline',
  async (I, qanPage, addInstanceAPI) => {
    I.amOnPage(qanPage.url);
    qanPage.waitForFiltersLoad();
    await qanPage.expandAllFilter();

    // Checking that Cluster filters are still in QAN after Upgrade
    for (const name of Object.values(addInstanceAPI.clusterNames)) {
      // For now we can't see the cluster names in QAN for ProxySQL and MongoDB
      if (name !== addInstanceAPI.clusterNames.proxysql && name !== addInstanceAPI.clusterNames.mongodb) {
        const filter = qanPage.getFilterLocator(name);

        I.waitForVisible(filter, 30);
        I.seeElement(filter);
      }
    }
  },
);
