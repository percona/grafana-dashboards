const dbsTable = new DataTable(['db']);
const dbs = ['mysql', 'md-dev', 'ps-dev', 'pdpgsql-dev', 'pgsql-dev', 'mongodb'];

dbs.forEach((db) => {
  dbsTable.add([db]);
});

Feature('QAN details');

Before(({ I, qanPage }) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'Verify Details section tabs @qan @not-pr-pipeline',
  async ({ I, qanDetails, qanOverview }) => {
    qanOverview.selectRow(2);
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
  async ({ I, qanOverview, qanFilters, qanDetails }) => {
    const cellValue = qanDetails.getMetricsCellLocator('Query Time', 3);

    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('mysql');
    I.waitForVisible(qanOverview.fields.searchBy, 30);
    I.fillField(qanOverview.fields.searchBy, 'insert');
    I.pressKey('Enter');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    I.waitForVisible(cellValue, 30);
    await qanDetails.verifyAvqQueryCount();
    await qanDetails.verifyAvgQueryTime();
  },
);

Data(dbsTable).Scenario(
  'PMM-T13 - Check Explain and Example for supported DBs @qan @not-pr-pipeline',
  async ({ I, qanOverview, qanFilters, qanDetails, current }) => {
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter(current.db);
    if (current.db === 'mysql') {
      I.waitForVisible(qanOverview.fields.searchBy, 30);
      I.fillField(qanOverview.fields.searchBy, 'insert');
      I.pressKey('Enter');
    }

    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    qanDetails.checkExamplesTab();
    if (!/pdpgsql-dev|pgsql-dev/gim.test(current.db)) {
      qanDetails.checkExplainTab();
    }
  },
);
