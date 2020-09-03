const assert = require('assert');

Feature('QAN common');

Before(async (I, qanPage) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'PMM-T122 - Verify QAN UI Elements are displayed @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    qanActions.applyFilterNewQAN('mysql');
    I.waitForVisible(qanPage.fields.filterBy, 30);
    I.waitForVisible(qanPage.fields.addColumnNewQAN, 30);
    await qanActions.verifyRowCount(27);
    await qanActions.verifyPagesAndCount(25);
    I.waitForVisible(qanPage.fields.environmentLabel, 30);
    I.click(qanPage.fields.querySelector);
    I.waitForVisible(qanPage.getColumn('Lock Time'), 30);
  },
);

Scenario(
  'PMM-T223 - Verify values in overview and in details match @qan @not-pr-pipeline',
  async (I, qanOverview, qanFilters, qanDetails) => {
    const cellValue = qanDetails.getMetricsCellLocator('Query Time', 3);

    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('ps-dev');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    I.waitForVisible(cellValue, 30);
    let overviewValue = await I.grabTextFrom(qanOverview.getCellValueLocator(1, 2));
    let detailsValue = await I.grabTextFrom(qanDetails.getMetricsCellLocator('Query Count', 2));

    assert.ok(overviewValue === detailsValue, 'Query Count value in Overview and Detail should match');

    overviewValue = await I.grabTextFrom(qanOverview.getCellValueLocator(1, 3));
    detailsValue = await I.grabTextFrom(qanDetails.getMetricsCellLocator('Query Time', 4));

    assert.ok(overviewValue === detailsValue, 'Query Time value in Overview and Detail should match');
  },
);

