Feature('Test Dashboards inside the Insights Folder');

Before(async ({ I }) => {
  I.Authorize();
});

Scenario(
  // eslint-disable-next-line max-len
  'Open Advanced Exploration Dashboard and verify Metrics are present and graphs are displayed @nightly @not-ui-pipeline',
  async ({ I, dashboardPage }) => {
    I.amOnPage(dashboardPage.advancedDataExplorationDashboard.url);
    dashboardPage.waitForDashboardOpened();
    dashboardPage.verifyMetricsExistence(dashboardPage.advancedDataExplorationDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(1);
  },
);

Scenario(
  // eslint-disable-next-line max-len
  'Open the Prometheus Exporters Status Dashboard and verify Metrics are present and graphs are displayed @not-ui-pipeline @nightly @not-pr-pipeline',
  async ({ I, dashboardPage, adminPage }) => {
    I.amOnPage(dashboardPage.prometheusExporterStatusDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.applyFilter('Node Name', 'pmm-server');
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(5);
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyMetricsExistence(dashboardPage.prometheusExporterStatusDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA(4);
    await dashboardPage.verifyThereAreNoGraphsWithoutData(15);
  },
);

// Need to Skip to avoid false positive, investigate and fix
xScenario(
  // eslint-disable-next-line max-len
  'Open the Prometheus Exporters Overview Dashboard and verify Metrics are present and graphs are displayed @not-ui-pipeline @nightly @not-pr-pipeline',
  async ({ I, dashboardPage, adminPage }) => {
    I.amOnPage(dashboardPage.prometheusExporterOverviewDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.applyFilter('Node Name', 'pmm-server');
    I.click(adminPage.fields.metricTitle);
    adminPage.peformPageDown(5);
    dashboardPage.verifyMetricsExistence(dashboardPage.prometheusExporterOverviewDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA(6);
    await dashboardPage.verifyThereAreNoGraphsWithoutData();
  },
);
