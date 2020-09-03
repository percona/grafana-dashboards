Feature('QAN details section');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'Verify Details section tabs @qan @not-pr-pipeline',
  async (I, qanDetails, qanOverview) => {
    qanOverview.selectRow(4);
    await within(qanDetails.root, () => {
      I.see('Details', qanDetails.getTabLocator('Details'));
      I.see('Example', qanDetails.getTabLocator('Example'));
      I.see('Explain', qanDetails.getTabLocator('Explain'));
      I.see('Tables', qanDetails.getTabLocator('Tables'));
      I.seeElement(qanDetails.buttons.close);
    });
  });

Scenario(
  'PMM-T223 - Verify time metrics are AVG per query (not per second) @qan @not-pr-pipeline',
  async (I, qanOverview, qanFilters, qanDetails) => {
    const cellValue = qanDetails.getMetricsCellLocator('Query Time', 3);

    qanOverview.waitForOverviewLoaded();
    qanFilters.applyFilter('mysql');
    I.waitForElement(qanOverview.elements.querySelector, 30);
    qanOverview.selectRow(1);
    I.waitForVisible(cellValue, 30);
    await qanDetails.verifyAvqQueryCount();
    await qanDetails.verifyAvgQueryTime();
  },
);
