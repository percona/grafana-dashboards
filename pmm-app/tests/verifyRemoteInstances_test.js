Feature('to verify monitoried Remote Db instances');

Before((I, loginPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});

xScenario(
  'Open Remote Instance Page and Add mysql instances @pmm-pre-update',
  async (I, remoteInstancesPage, pmmInventoryPage) => {
    let mysql_service_name = 'mysql_remote_test';
    let version = 'old';
    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilOldRemoteInstancesPageLoaded();
    remoteInstancesPage.openAddRemoteMySQLPage();
    remoteInstancesPage.fillRemoteMySQLFields(mysql_service_name);
    remoteInstancesPage.createRemoteMySQL(mysql_service_name, version);
    pmmInventoryPage.verifyOldMySQLRemoteServiceIsDisplayed(mysql_service_name);
    await pmmInventoryPage.verifyAgentHasStatusRunning(mysql_service_name, version);
  }
);

xScenario(
  'Verify is the remote instances are in Running Status @pmm-post-update',
  async (I, adminPage, remoteInstancesPage, pmmInventoryPage) => {
    let mysql_service_name = 'mysql_remote_test';
    let version = 'new';
    I.amOnPage(pmmInventoryPage.url);
    pmmInventoryPage.verifyMySQLRemoteServiceIsDisplayed(mysql_service_name);
    await pmmInventoryPage.verifyAgentHasStatusRunning(mysql_service_name, version);
  }
);

xScenario(
  'Open Remote Instance Page and Add mysql instances PMM Latest',
  async (I, adminPage, remoteInstancesPage, pmmInventoryPage) => {
    let mysql_service_name = 'mysql_remote_new';
    let version = 'new';
    I.amOnPage(remoteInstancesPage.url);
    remoteInstancesPage.waitUntilNewRemoteInstancesPageLoaded();
    remoteInstancesPage.openAddRemoteMySQLPage();
    remoteInstancesPage.fillRemoteMySQLFields(mysql_service_name);
    remoteInstancesPage.createRemoteMySQL(mysql_service_name, version);
    pmmInventoryPage.verifyMySQLRemoteServiceIsDisplayed(mysql_service_name);
    await pmmInventoryPage.verifyAgentHasStatusRunning(mysql_service_name, version);
  }
);
