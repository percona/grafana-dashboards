const assert = require('assert');

Feature('QAN common');

Before(async ({ I, qanPage }) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'PMM-T122 - Verify QAN UI Elements are displayed @not-pr-pipeline @qan',
  async ({
    I, qanFilters, qanOverview, qanPagination,
  }) => {
    qanOverview.waitForOverviewLoaded();
    I.waitForVisible(qanOverview.buttons.addColumn, 30);
    await qanPagination.verifyPagesAndCount(25);
    I.waitForVisible(qanFilters.elements.environmentLabel, 30);
    await qanOverview.verifyRowCount(27);
    qanFilters.applyFilter('ps-dev');
    I.waitForVisible(qanFilters.fields.filterBy, 30);
    I.waitForVisible(qanOverview.fields.searchBy, 30);
    I.fillField(qanOverview.fields.searchBy, 'insert');
    I.pressKey('Enter');
    I.waitForVisible(qanOverview.elements.querySelector, 30);
    I.click(qanOverview.elements.querySelector);
    I.waitForVisible(qanOverview.getColumnLocator('Lock Time'), 30);
  },
);

Scenario(
  'PMM-T223 - Verify values in overview and in details match @qan @not-pr-pipeline',
  async ({
    I, qanOverview, qanFilters, qanDetails, adminPage,
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
    I.waitForVisible(cellValue, 30);
    let overviewValue = await I.grabTextFrom(qanOverview.getCellValueLocator(1, 2));
    let detailsValue = await I.grabTextFrom(qanDetails.getMetricsCellLocator('Query Count', 2));

    assert.ok(overviewValue === detailsValue, `Query Count value in Overview and Detail should match. Overview:'${overviewValue}'!=Detail:'${detailsValue}'`);

    overviewValue = await I.grabTextFrom(qanOverview.getCellValueLocator(1, 3));
    detailsValue = await I.grabTextFrom(qanDetails.getMetricsCellLocator('Query Time', 4));

    assert.ok(overviewValue === detailsValue, `Query Time value in Overview and Detail should match. Overview:'${overviewValue}'!=Detail:'${detailsValue}'`);
  },
);

Scenario(
  'PMM-T215 - Verify that buttons in QAN are disabled and visible on the screen @not-pr-pipeline @qan',
  async ({
    I, qanPagination, qanFilters, qanOverview,
  }) => {
    qanFilters.waitForFiltersToLoad();
    qanOverview.waitForOverviewLoaded();
    I.seeAttributesOnElements(qanPagination.buttons.previousPage, { 'aria-disabled': 'true' });
    I.seeAttributesOnElements(qanPagination.buttons.nextPage, { 'aria-disabled': 'false' });
    I.seeAttributesOnElements(qanFilters.buttons.resetAll, { disabled: true });
    I.seeAttributesOnElements(qanFilters.buttons.showSelected, { disabled: true });
    const count = await qanOverview.getCountOfItems();

    if (count > 100) {
      I.seeElement(qanPagination.buttons.ellipsis);
    }
  },
);
