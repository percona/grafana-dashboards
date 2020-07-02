const assert = require('assert');
const serviceNames = {
  mysql: 'mysql_upgrade_service',
  postgresql: 'postgres_upgrade_service',
  mongodb: 'mongodb_upgrade_service',
  proxysql: 'proxysql_upgrade_service',
  rds: 'mysql_rds_uprgade_service',
};

Feature('PMM server Upgrade Tests and Executing test cases related to Upgrade Testing Cycle');

Before(async I => {
  I.Authorize();
  I.setRequestTimeout(30000);
});

Scenario(
  'PMM-T289 Verify Whats New link is presented on Update Widget @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, homePage) => {
    I.amOnPage(homePage.url);
    //Whats New Link is added for the latest version hours before the release hence we need to skip checking on that, rest it should be available and checked.
    const [, pmmMinor, pmmPatch] = process.env.PMM_SERVER_LATEST.split('.');
    const [, dockerMinor, dockerPatch] = process.env.DOCKER_VERSION.split('.');
    const majorVersionDiff = pmmMinor - dockerMinor;
    const patchVersionDiff = pmmPatch - dockerPatch;
    if (majorVersionDiff >= 1 && patchVersionDiff >= 0) {
      I.waitForElement(homePage.fields.whatsNewLink, 30);
      I.seeElement(homePage.fields.whatsNewLink);
      const link = await I.grabAttributeFrom(homePage.fields.whatsNewLink, 'href');
      assert.equal(link.indexOf('https://per.co.na/pmm/') > -1, true, 'Whats New Link has an unexpected URL');
    }
  }
);

Scenario(
  'PMM-T288 Verify user can see Update widget before upgrade [critical] @visual-test @not-pr-pipeline',
  async (I, adminPage, homePage) => {
    I.amOnPage(homePage.url);
    await homePage.verifyPreUpdateWidgetIsPresent();
  }
);

Scenario(
  'Verify user can create Remote Instances before upgrade and they are in RUNNNING status @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, homePage, inventoryAPI, addInstanceAPI) => {
    // Adding instances for monitoring
    for (const type of Object.values(addInstanceAPI.instanceTypes)) {
      await addInstanceAPI.apiAddInstance(type, serviceNames[type.toLowerCase()]);
    }
    // Checking that instances are RUNNING
    for (const service of Object.values(inventoryAPI.services)) {
      await inventoryAPI.verifyServiceExistsAndHasRunningStatus(service, serviceNames[service.service]);
    }
  }
);

Scenario(
  'Verify user is able to Upgrade PMM version [blocker] @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, inventoryAPI, homePage) => {
    I.amOnPage(homePage.url);
    await homePage.upgradePMM();
  }
);

Scenario(
  'Verify Agents are RUNNING after Upgrade (API) [critical] @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, inventoryAPI) => {
    for (const service of Object.values(inventoryAPI.services)) {
      await inventoryAPI.verifyServiceExistsAndHasRunningStatus(service, serviceNames[service.service]);
    }
  }
);

Scenario(
  'Verify user can see Update widget [critical] @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, adminPage, homePage) => {
    I.amOnPage(homePage.url);
    homePage.verifyPostUpdateWidgetIsPresent();
  }
);

Scenario(
  'PMM-T262 Open PMM Settings page and verify DATA_RETENTION value is set to 2 days after upgrade @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, pmmSettingsPage) => {
    const dataRetention = '2';
    I.amOnPage(pmmSettingsPage.url);
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    const dataRetentionActualValue = await I.grabValueFrom(pmmSettingsPage.fields.dataRetentionCount);
    assert(
      dataRetention,
      dataRetentionActualValue,
      'The Value for Data Retention is not the same as passed via Docker Environment Variable'
    );
  }
);

Scenario(
  'Verify user can see News Panel @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, adminPage, homePage) => {
    I.amOnPage(homePage.url);
    I.waitForVisible(homePage.fields.newsPanelTitleSelector, 30);
    I.waitForVisible(homePage.fields.newsPanelContentSelector, 30);
    const newsItems = await I.grabNumberOfVisibleElements(`${homePage.fields.newsPanelContentSelector}/div`);
    assert.ok(newsItems > 1, 'News Panel is empty');
  }
);

Scenario(
  'Verify Agents are RUNNING after Upgrade (UI) [critical] @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, adminPage, pmmInventoryPage) => {
    I.amOnPage(pmmInventoryPage.url);
    for (const service of Object.values(serviceNames)) {
      await pmmInventoryPage.verifyAgentHasStatusRunning(service);
    }
  }
);

Scenario(
  'Verify QAN has specific filters for Remote Instances after Upgrade (UI) @pmm-upgrade @visual-test @not-pr-pipeline',
  async (I, qanPage, addInstanceAPI) => {
    I.amOnPage(qanPage.url);
    I.waitForVisible(qanPage.fields.iframe, 30);
    I.switchTo(qanPage.fields.iframe);
    await qanPage.expandAllFilter();
    // Checking that Cluster filters are still in QAN after Upgrade
    for (const name of Object.values(addInstanceAPI.clusterNames)) {
      // For now we can't see the cluster names in QAN for ProxySQL and MongoDB
      if (name === addInstanceAPI.clusterNames.proxysql || name === addInstanceAPI.clusterNames.mongodb) {
        continue;
      }
      const filter = qanPage.getFilterLocator(name);
      I.waitForVisible(filter, 30);
      I.seeElement(filter);
    }
  }
);
