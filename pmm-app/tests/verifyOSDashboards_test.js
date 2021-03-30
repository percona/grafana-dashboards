const nodes = new DataTable(['node-type', 'name']);

nodes.add(['pmm-client', 'ip']);

Feature('Test Dashboards inside the OS Folder');

Before(async ({ I }) => {
  I.Authorize();
});

Scenario(
  'Open the Node Summary Dashboard and verify Metrics are present and graphs are displayed @not-ui-pipeline @nightly @not-pr-pipeline',
  async ({ I, dashboardPage, adminPage }) => {
    I.amOnPage(dashboardPage.nodeSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    await dashboardPage.applyFilter('Node Name', 'pmm-server');
    I.click(adminPage.fields.metricTitle);
    await dashboardPage.expandEachDashboardRow();
    adminPage.peformPageDown(5);
    dashboardPage.verifyMetricsExistence(dashboardPage.nodeSummaryDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData(1);
  },
);

Scenario(
  'Open the Nodes Compare Dashboard and verify Metrics are present and graphs are displayed @not-ui-pipeline @nightly @not-pr-pipeline',
  async ({ I, dashboardPage }) => {
    I.amOnPage(dashboardPage.nodesCompareDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyMetricsExistence(dashboardPage.nodesCompareDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA(1);
    await dashboardPage.verifyThereAreNoGraphsWithoutData(19);
  },
);

Scenario(
  'PMM-T165: Verify Annotation with Default Options @not-ui-pipeline @nightly @not-pr-pipeline',
  async ({ I, dashboardPage }) => {
    const annotationTitle = 'pmm-annotate-without-tags';

    I.amOnPage(`${dashboardPage.processDetailsDashboard.url}`);
    dashboardPage.waitForDashboardOpened();
    dashboardPage.verifyAnnotationsLoaded('pmm-annotate-without-tags', 1);
    I.seeElement(dashboardPage.annotationText(annotationTitle));
  },
);

Scenario(
  'PMM-T166: Verify adding annotation with specified tags @not-ui-pipeline @nightly @not-pr-pipeline',
  async ({ I, dashboardPage }) => {
    const annotationTitle2 = 'pmm-annotate-tags';
    const annotationTag1 = 'pmm-testing-tag1';
    const annotationTag2 = 'pmm-testing-tag2';
    const defaultAnnotation = 'pmm_annotation';

    I.amOnPage(`${dashboardPage.processDetailsDashboard.url}`);
    dashboardPage.waitForDashboardOpened();
    dashboardPage.verifyAnnotationsLoaded('pmm-annotate-tags', 2);
    I.seeElement(dashboardPage.annotationText(annotationTitle2));
    I.seeElement(dashboardPage.annotationTagText(annotationTag1));
    I.seeElement(dashboardPage.annotationTagText(annotationTag2));
    I.seeElement(dashboardPage.annotationTagText(defaultAnnotation));
  },
);

Data(nodes).Scenario(
  'PMM-T418 PMM-T419 Verify the pt-summary on Node Summary dashboard @not-ui-pipeline @nightly @not-pr-pipeline',
  async ({ I, dashboardPage, adminPage }) => {
    I.amOnPage(dashboardPage.nodeSummaryDashboard.url);
    dashboardPage.waitForDashboardOpened();
    I.click(adminPage.fields.metricTitle);
    await dashboardPage.expandEachDashboardRow();
    adminPage.performPageUp(5);
    I.waitForElement(dashboardPage.nodeSummaryDashboard.ptSummaryDetail.reportContainer, 60);
    I.seeElement(dashboardPage.nodeSummaryDashboard.ptSummaryDetail.reportContainer);
  },
);
