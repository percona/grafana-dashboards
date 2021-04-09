Feature('QAN details');

const { adminPage } = inject();

Before(async ({ I, qanPage }) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'Verify Details section tabs @qan @not-pr-pipeline',
  async ({
    I, qanDetails, qanOverview, qanFilters,
  }) => {
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('ps-dev');
    qanOverview.selectRow(2);
    qanFilters.waitForFiltersToLoad();
    await within(qanDetails.root, () => {
      I.waitForVisible(qanDetails.buttons.close, 30);
      I.see('Details', qanDetails.getTabLocator('Details'));
      I.see('Example', qanDetails.getTabLocator('Example'));
      I.see('Explain', qanDetails.getTabLocator('Explain'));
      I.see('Tables', qanDetails.getTabLocator('Tables'));
    });
  },
);

Scenario(
  'PMM-T223 - Verify time metrics are AVG per query (not per second) @qan @not-pr-pipeline',
  async ({
    I, qanOverview, qanFilters, qanDetails,
  }) => {
    const cellValue = qanDetails.getMetricsCellLocator('Query Time', 3);

    qanOverview.waitForOverviewLoaded();
    adminPage.applyTimeRange('Last 1 hour');
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('ps-dev');
    I.waitForVisible(qanOverview.fields.searchBy, 30);
    I.fillField(qanOverview.fields.searchBy, 'insert');
    I.pressKey('Enter');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    qanFilters.waitForFiltersToLoad();
    I.waitForVisible(cellValue, 30);
    await qanDetails.verifyAvqQueryCount(3600);
    await qanDetails.verifyAvgQueryTime(3600);
  },
);

Scenario(
  'PMM-T13 - Check Explain and Example for supported DBs @qan @not-pr-pipeline',
  async ({
    I, qanOverview, qanFilters, qanDetails,
  }) => {
    qanOverview.waitForOverviewLoaded();
    adminPage.applyTimeRange('Last 1 hour');
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('ps-dev');
    I.waitForVisible(qanOverview.fields.searchBy, 30);
    I.fillField(qanOverview.fields.searchBy, 'insert');
    I.pressKey('Enter');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    qanFilters.waitForFiltersToLoad();
    qanDetails.checkExamplesTab();
    qanDetails.checkExplainTab();
  },
);

Scenario(
  'PMM-T13 - Check Explain and Example for supported DBs - md @qan @not-pr-pipeline',
  async ({
    I, qanOverview, qanFilters, qanDetails,
  }) => {
    qanOverview.waitForOverviewLoaded();
    adminPage.applyTimeRange('Last 1 hour');
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('md-dev');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    qanFilters.waitForFiltersToLoad();
    qanDetails.checkExamplesTab();
    qanDetails.checkExplainTab();
  },
);

Scenario(
  'PMM-T13 - Check Explain and Example for supported DBs - ps @qan @not-pr-pipeline',
  async ({
    I, qanOverview, qanFilters, qanDetails,
  }) => {
    qanOverview.waitForOverviewLoaded();
    adminPage.applyTimeRange('Last 1 hour');
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('ps-dev');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    qanFilters.waitForFiltersToLoad();
    qanDetails.checkExamplesTab();
    qanDetails.checkExplainTab();
  },
);

Scenario(
  'PMM-T13 - Check Explain and Example for supported DBs - pdpqsql @qan @not-pr-pipeline',
  async ({
    I, qanOverview, qanFilters, qanDetails,
  }) => {
    qanOverview.waitForOverviewLoaded();
    adminPage.applyTimeRange('Last 1 hour');
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('pdpgsql-dev');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    qanFilters.waitForFiltersToLoad();
    qanDetails.checkExamplesTab();
  },
);

Scenario(
  'PMM-T13 - Check Explain and Example for supported DBs - pgsql @qan @not-pr-pipeline',
  async ({
    I, qanOverview, qanFilters, qanDetails,
  }) => {
    qanOverview.waitForOverviewLoaded();
    adminPage.applyTimeRange('Last 1 hour');
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('pgsql-dev');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    qanFilters.waitForFiltersToLoad();
    qanDetails.checkExamplesTab();
  },
);

Scenario(
  'PMM-T13 - Check Explain and Example for supported DBs - mongodb @qan @not-pr-pipeline',
  async ({
    I, qanOverview, qanFilters, qanDetails,
  }) => {
    qanOverview.waitForOverviewLoaded();
    adminPage.applyTimeRange('Last 1 hour');
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('mongodb');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    qanFilters.waitForFiltersToLoad();
    qanDetails.checkExamplesTab();
    qanDetails.checkExplainTab();
  },
);
