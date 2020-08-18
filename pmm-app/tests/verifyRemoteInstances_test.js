const page = require('./pages/remoteInstancesPage');

const instances = new DataTable(['name']);

for (const i of Object.keys(page.services)) {
  instances.add([i]);
}

Feature('Remote DB Instances');

Before(async (I) => {
  I.Authorize();
});

// TODO: unskip the mongodb tests after resolving a creds issue
Data(instances.filter((instance) => instance.name !== 'mongodb')).Scenario(
  'Verify Remote Instance Addition [critical] @not-pr-pipeline',
  async (I, remoteInstancesPage, current) => {
    const serviceName = remoteInstancesPage.services[current.name];

    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
    remoteInstancesPage.openAddRemotePage(current.name);
    remoteInstancesPage.fillRemoteFields(serviceName);
    remoteInstancesPage.createRemoteInstance(serviceName);
  },
);

Data(instances.filter((instance) => instance.name !== 'mongodb')).Scenario(
  'Verify Remote Instance has Status Running [critical] @not-pr-pipeline',
  async (I, remoteInstancesPage, pmmInventoryPage, current) => {
    const serviceName = remoteInstancesPage.services[current.name];

    I.amOnPage(pmmInventoryPage.url);
    pmmInventoryPage.verifyRemoteServiceIsDisplayed(serviceName);
    await pmmInventoryPage.verifyAgentHasStatusRunning(serviceName);
  },
);
