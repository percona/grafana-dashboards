Feature('Tests for PMM Demo Sanity Tests Cycle Dashboard Checks').retry(2);

Scenario(
  // eslint-disable-next-line max-len
  'PMM-T319 Open the MySQL Instance Overview Dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, adminPage, dashboardPage, pmmDemoPage,
  }) => {
    const serviceName = ['ps8-mysql', 'pxc57-3-mysql', 'ps8-slave-mysql'];

    I.amOnPage(pmmDemoPage.url + dashboardPage.mySQLInstanceOverview.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(5);
    await dashboardPage.expandEachDashboardRow();
    for (let i = 0; i < serviceName.length; i++) {
      await dashboardPage.applyFilter('Service Name', serviceName[i]);
      I.click(adminPage.fields.metricTitle);
      adminPage.peformPageDown(5);
      dashboardPage.verifyMetricsExistence(dashboardPage.mySQLInstanceOverview.metrics);
      await dashboardPage.verifyThereAreNoGraphsWithNA();
      await dashboardPage.verifyThereAreNoGraphsWithoutData(1);
    }
  },
);

Scenario(
  // eslint-disable-next-line max-len
  'PMM-T319 Open the MySQL Summary Dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, adminPage, dashboardPage, pmmDemoPage,
  }) => {
    const serviceName = ['ps8-mysql', 'pxc57-3-mysql', 'ps8-slave-mysql'];

    I.amOnPage(pmmDemoPage.url + dashboardPage.mysqlInstanceSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(5);
    await dashboardPage.expandEachDashboardRow();
    for (let i = 0; i < serviceName.length; i++) {
      await dashboardPage.applyFilter('Service Name', serviceName[i]);
      I.click(adminPage.fields.metricTitle);
      adminPage.peformPageDown(5);
      dashboardPage.verifyMetricsExistence(dashboardPage.mysqlInstanceSummaryDashboard.metrics);
      await dashboardPage.verifyThereAreNoGraphsWithNA();
      await dashboardPage.verifyThereAreNoGraphsWithoutData(2);
    }
  },
);

Scenario(
  'PMM-T69 Open the PostgreSQL Instance Summary Dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, dashboardPage, adminPage, pmmDemoPage,
  }) => {
    const serviceName = ['pg11-postgresql', 'pmm-server-postgresql'];

    I.amOnPage(pmmDemoPage.url + dashboardPage.postgresqlInstanceSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(5);
    await dashboardPage.expandEachDashboardRow();
    // Need to fix the scroll better, wait for ScrollTo() fix in playwright.
    for (let i = 0; i < serviceName.length; i++) {
      await dashboardPage.applyFilter('Service Name', serviceName[i]);
      I.click(adminPage.fields.metricTitle);
      adminPage.peformPageDown(5);
      adminPage.performPageUp(5);
      dashboardPage.verifyMetricsExistence(dashboardPage.postgresqlInstanceSummaryDashboard.metrics);
      await dashboardPage.verifyThereAreNoGraphsWithNA();
      await dashboardPage.verifyThereAreNoGraphsWithoutData(0);
    }
  },
);

Scenario(
  'PMM-T70 Open the MongoDB Instance Summary Dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, adminPage, dashboardPage, pmmDemoPage,
  }) => {
    const serviceName = ['mongo-config-1-mongodb', 'mongo-rs1-1-mongodb', 'mongo-rs2-1-mongodb'];

    I.amOnPage(pmmDemoPage.url + dashboardPage.mongodbOverviewDashboard.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(10);
    await dashboardPage.expandEachDashboardRow();
    for (let i = 0; i < serviceName.length; i++) {
      await dashboardPage.applyFilter('Service Name', serviceName[i]);
      I.click(adminPage.fields.metricTitle);
      adminPage.peformPageDown(5);
      await dashboardPage.verifyMetricsExistence(dashboardPage.mongodbOverviewDashboard.metrics);
      await dashboardPage.verifyThereAreNoGraphsWithNA();
      await dashboardPage.verifyThereAreNoGraphsWithoutData();
    }
  },
);

// Need to skip due to rework on MongoDB Cluster Summary Dashboard
xScenario(
  'PMM-T70 Open the MongoDB Cluster Summary Dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, adminPage, dashboardPage, pmmDemoPage,
  }) => {
    I.amOnPage(pmmDemoPage.url + dashboardPage.mongoDbClusterSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(2);
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyMetricsExistence(dashboardPage.mongoDbClusterSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(0);
  },
);

Scenario(
  'PMM-T307 MongoDB Instances Overview dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, adminPage, dashboardPage, pmmDemoPage,
  }) => {
    const serviceName = ['mongo-config-1-mongodb', 'mongo-rs1-1-mongodb', 'mongo-rs2-1-mongodb'];

    I.amOnPage(pmmDemoPage.url + dashboardPage.mongoDbInstanceOverview.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(1);
    await dashboardPage.expandEachDashboardRow();
    for (let i = 0; i < serviceName.length; i++) {
      await dashboardPage.applyFilter('Service Name', serviceName[i]);
      I.click(adminPage.fields.metricTitle);
      adminPage.peformPageDown(5);
      await dashboardPage.verifyThereAreNoGraphsWithNA();
      await dashboardPage.verifyThereAreNoGraphsWithoutData(3);
    }
  },
);

Scenario(
  // eslint-disable-next-line max-len
  'PMM-T73 Open Advanced Exploration Dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({ I, dashboardPage, pmmDemoPage }) => {
    I.amOnPage(pmmDemoPage.url + pmmDemoPage.advancedDataExplorationDashboardUrl);
    dashboardPage.waitForDashboardOpened();
    dashboardPage.verifyMetricsExistence(dashboardPage.advancedDataExplorationDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(0);
  },
);

Scenario(
  // eslint-disable-next-line max-len
  'PMM-T72 Open the Prometheus Exporters Status Dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, dashboardPage, adminPage, pmmDemoPage,
  }) => {
    const nodeName = ['mongo-config-1', 'pg11', 'ps8'];

    I.amOnPage(pmmDemoPage.url + dashboardPage.prometheusExporterStatusDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    for (let i = 0; i < nodeName.length; i++) {
      await dashboardPage.applyFilter('Node Name', nodeName[i]);
      I.click(adminPage.fields.metricTitle);
      dashboardPage.verifyMetricsExistence(dashboardPage.prometheusExporterStatusDashboard.metrics);
      await dashboardPage.verifyThereAreNoGraphsWithNA(3);
      await dashboardPage.verifyThereAreNoGraphsWithoutData(24);
    }
  },
);

Scenario(
  // eslint-disable-next-line max-len
  'PMM-T72 Open the Prometheus Exporters Overview Dashboard and verify Metrics are present and graphs are displayed [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, dashboardPage, adminPage, pmmDemoPage,
  }) => {
    const nodeName = ['mongo-config-1', 'pg11', 'ps8', 'pxc57-1', 'pxc80-1', 'mongo-rs1-1'];

    I.amOnPage(pmmDemoPage.url + dashboardPage.prometheusExporterOverviewDashboard.url);
    dashboardPage.waitForDashboardOpened();
    adminPage.peformPageDown(2);
    for (let i = 0; i < nodeName.length; i++) {
      await dashboardPage.applyFilter('Node Name', nodeName[i]);
      I.click(adminPage.fields.metricTitle);
      adminPage.peformPageDown(2);
      dashboardPage.verifyMetricsExistence(dashboardPage.prometheusExporterOverviewDashboard.metrics);
      await dashboardPage.verifyThereAreNoGraphsWithNA(0);
      await dashboardPage.verifyThereAreNoGraphsWithoutData();
    }
  },
);

Scenario(
  'PMM-T301 Open PMM Demo Home Dashboard and Verify if all Monitored services are visible [critical] @pmm-demo @not-ui-pipeline @not-pr-pipeline',
  async ({
    I, dashboardPage, adminPage, pmmDemoPage,
  }) => {
    I.amOnPage(pmmDemoPage.url);
    dashboardPage.waitForDashboardOpened();
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(10);
    for (let i = 0; i < pmmDemoPage.monitoredDB.length; i += 2) {
      I.waitForElement(pmmDemoPage.getHostLocator(pmmDemoPage.monitoredDB[i]), 30);
      I.seeElement(pmmDemoPage.getHostLocator(pmmDemoPage.monitoredDB[i]));
      I.seeNumberOfVisibleElements(
        pmmDemoPage.getHostLocator(pmmDemoPage.monitoredDB[i]),
        pmmDemoPage.monitoredDB[i + 1],
      );
    }

    dashboardPage.verifyMetricsExistence(dashboardPage.homeDashboard.metrics);
  },
);
