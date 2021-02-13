module.exports = {
  pageObjects: {
    addInstanceAPI: './tests/pages/api/addInstanceAPI.js',
    adminPage: './tests/pages/adminPage.js',
    alertRulesPage: './tests/ia/pages/alertRulesPage.js',
    amiInstanceSetupPage: './tests/pages/amiInstanceSetupPage.js',
    channelsAPI: './tests/ia/pages/api/channelsAPI.js',
    dashboardPage: './tests/pages/dashboardPage.js',
    databaseChecksPage: './tests/pages/databaseChecksPage.js',
    dbaasAPI: './tests/pages/api/dbaasAPI.js',
    dbaasPage: './tests/pages/dbaasPage.js',
    homePage: './tests/pages/homePage.js',
    inventoryAPI: './tests/pages/api/inventoryAPI.js',
    mysqlTableDetailsPage: './tests/pages/mysqlTableDetailsPage.js',
    ncPage: './tests/ia/pages/notificationChannelsPage.js',
    pmmDemoPage: './tests/pages/pmmDemoPage.js',
    pmmInventoryPage: './tests/pages/pmmInventoryPage.js',
    pmmSettingsPage: './tests/pages/pmmSettingsPage.js',
    qanDetails: './tests/QAN/pages/qanDetailsFragment.js',
    qanFilters: './tests/QAN/pages/qanFiltersFragment.js',
    qanOverview: './tests/QAN/pages/qanOverviewFragment.js',
    qanPage: './tests/QAN/pages/qanPage.js',
    qanPagination: './tests/QAN/pages/qanPaginationFragment.js',
    remoteInstancesPage: './tests/pages/remoteInstancesPage.js',
    rulesAPI: './tests/ia/pages/api/rulesAPI.js',
    ruleTemplatesPage: './tests/ia/pages/ruleTemplatesPage.js',
    securityChecksAPI: './tests/pages/api/securityChecksAPI.js',
    settingsAPI: './tests/pages/api/settingsAPI.js',
    templatesAPI: './tests/ia/pages/api/templatesAPI.js',

  },
  getChunks: (files) => {
    const dependentTests = files.filter((value) => /PMMSettings|database|ia|permissions/.test(value));
    const otherTests = files.filter((val) => !dependentTests.includes(val));

    return [
      dependentTests,
      otherTests,
    ];
  },
};
