const assert = require('assert');
const serviceNames = {
  mysql: 'mysql_upgrade_service',
  postgresql: 'postgres_upgrade_service',
  mongodb: 'mongodb_upgrade_service',
  proxysql: 'proxysql_upgrade_service',
  rds: 'mysql_rds_uprgade_service'
};

Feature('PMM server Upgrade');

Before(async (I) => {
  I.Authorize();
  I.setRequestTimeout(30000);
});

Scenario(
    'Verify user can create Remote Instances before upgrade and they are in RUNNNING status @pmm-upgrade @visual-test @not-pr-pipeline',
    async (I, homePage, inventoryAPI, addInstanceAPI) => {
      // Adding instances for monitoring
      for (const type of Object.values(addInstanceAPI.instanceTypes)) {
        await addInstanceAPI.apiAddInstance(type, serviceNames[type.toLowerCase()]);
      }
      // Checking that instances are RUNNING
      for (const service of Object.values(inventoryAPI.services)) {
        await inventoryAPI.verifyServiceExistsAndHasRunningStatus(service,
            serviceNames[service.service]);
      }
    }
);

Scenario(
    'Verify user is able to Upgrade PMM version @pmm-upgrade @visual-test @not-pr-pipeline',
    async (I, inventoryAPI, homePage) => {
      I.amOnPage(homePage.url);
      await homePage.upgradePMM();
    }
);

Scenario(
    'Verify Agents are RUNNING after Upgrade (API) @pmm-upgrade @visual-test @not-pr-pipeline',
    async (I, inventoryAPI) => {
      for (const service of Object.values(inventoryAPI.services)) {
        await inventoryAPI.verifyServiceExistsAndHasRunningStatus(service,
            serviceNames[service.service]);
      }
    }
);

Scenario(
    'Verify user can see Update widget @pmm-upgrade @visual-test @not-pr-pipeline',
    async (I, adminPage, homePage) => {
      I.amOnPage(homePage.url);
      homePage.verifyPostUpdateWidgetIsPresent();
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
    'Verify Agents are RUNNING after Upgrade (UI) @pmm-upgrade @visual-test @not-pr-pipeline',
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
        if (name === addInstanceAPI.clusterNames.proxysql || name === addInstanceAPI.clusterNames.mongodb) continue;
        const filter = qanPage.getFilterLocator(name);
        I.waitForVisible(filter, 30);
        I.seeElement(filter);
      }
    }
);
