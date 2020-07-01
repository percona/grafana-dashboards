Feature('to verify monitoried Remote Db instances');

Before(async I => {
  I.Authorize();
});

Scenario(
    'Verify Remote MySQL Instance Addition [critical] @not-pr-pipeline',
    async (I, adminPage, remoteInstancesPage, pmmInventoryPage) => {
      const mysql_service_name = 'mysql_remote_new';
      I.amOnPage(remoteInstancesPage.url);
      remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
      remoteInstancesPage.openAddRemotePage('mysql');
      remoteInstancesPage.fillRemoteFields(mysql_service_name);
      remoteInstancesPage.createRemoteInstance(mysql_service_name);
      pmmInventoryPage.verifyRemoteServiceIsDisplayed(mysql_service_name);
      await pmmInventoryPage.verifyAgentHasStatusRunning(mysql_service_name);
    }
);

Scenario(
    'Verify is the remote instances are in Running Status [critical] @pmm-post-update @not-pr-pipeline',
    async (I, adminPage, remoteInstancesPage, pmmInventoryPage) => {
      const mysql_service_name = 'mysql_remote_new';
      I.amOnPage(pmmInventoryPage.url);
      pmmInventoryPage.verifyRemoteServiceIsDisplayed(mysql_service_name);
      await pmmInventoryPage.verifyAgentHasStatusRunning(mysql_service_name);
    }
);

xScenario(
    'Verify Remote MongoDB Instance Addition [critical]',
    async (I, adminPage, remoteInstancesPage, pmmInventoryPage) => {
      const mongodb_service_name = 'mongodb_remote_new';
      I.amOnPage(remoteInstancesPage.url);
      remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
      remoteInstancesPage.openAddRemotePage('mongodb');
      remoteInstancesPage.fillRemoteFields(mongodb_service_name);
      remoteInstancesPage.createRemoteInstance(mongodb_service_name);
      pmmInventoryPage.verifyRemoteServiceIsDisplayed(mongodb_service_name);
      await pmmInventoryPage.verifyAgentHasStatusRunning(mongodb_service_name);
    }
);

Scenario(
    'Verify Remote PostgreSQL Instance Addition [critical] @not-pr-pipeline',
    async (I, adminPage, remoteInstancesPage, pmmInventoryPage) => {
      const postgresql_service_name = 'postgresql_remote_new';
      I.amOnPage(remoteInstancesPage.url);
      remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
      remoteInstancesPage.openAddRemotePage('postgresql');
      remoteInstancesPage.fillRemoteFields(postgresql_service_name);
      remoteInstancesPage.createRemoteInstance(postgresql_service_name);
      pmmInventoryPage.verifyRemoteServiceIsDisplayed(postgresql_service_name);
      await pmmInventoryPage.verifyAgentHasStatusRunning(postgresql_service_name);
    }
);

Scenario(
    'Verify Remote ProxySQL Instance Addition [critical] @not-pr-pipeline',
    async (I, adminPage, remoteInstancesPage, pmmInventoryPage) => {
      const proxysql_service_name = 'proxysql_remote_new';
      I.amOnPage(remoteInstancesPage.url);
      remoteInstancesPage.waitUntilRemoteInstancesPageLoaded();
      remoteInstancesPage.openAddRemotePage('proxysql');
      remoteInstancesPage.fillRemoteFields(proxysql_service_name);
      remoteInstancesPage.createRemoteInstance(proxysql_service_name);
      pmmInventoryPage.verifyRemoteServiceIsDisplayed(proxysql_service_name);
      await pmmInventoryPage.verifyAgentHasStatusRunning(proxysql_service_name);
    }
);
