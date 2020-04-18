Feature('Test QAN overview');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'Open the QAN Dashboard, add a column and make sure that this option not available anymore @new-qan',
  async (I, qanPage) => {
    const COLUMN_NAME = 'Bytes Sent';

    qanPage.addColumn(COLUMN_NAME);
    await qanPage.verifyColumnIsNotAvailable(COLUMN_NAME);
  }
);

Scenario(
  'Open the QAN Dashboard and verify that hovering over a time metric displays a tooltip with a graph @new-qan',
  async (I, qanPage) => {
    const ROW_NUMBER = 1;
    const QUERY_TIME_COLUMN_NUMBER = 3;

    qanPage.showTooltip(ROW_NUMBER, QUERY_TIME_COLUMN_NUMBER);
    I.seeElement(qanPage.elements.latencyChart);
  }
);

Scenario(
  'Open the QAN Dashboard and verify that hovering over a non-time metric displays a tooltip without a graph @new-qan',
  async (I, qanPage) => {
    const ROW_NUMBER = 1;
    const QUERY_COUNT_COLUMN_NUMBER = 2;

    qanPage.showTooltip(ROW_NUMBER, QUERY_COUNT_COLUMN_NUMBER);
    I.dontSeeElement(qanPage.elements.latencyChart);
  }
);

Scenario(
  'Open the QAN Dashboard and verify that the metric value matches the "Per sec" value in the tooltip. @new-qan',
  async (I, qanPage) => {
    const ROW_NUMBER = 1;
    const QUERY_COUNT_COLUMN_NUMBER = 2;

    qanPage.verifyMetricsMatch(ROW_NUMBER, QUERY_COUNT_COLUMN_NUMBER);
  }
);

Scenario(
  'Open the QAN Dashboard and check that sorting works correctly after sorting by another column. @new-qan',
  async (I, qanPage, adminPage) => {
    qanPage.changeSorting(3, 'up');
    qanPage.verifySortingIs(3, 'up');
    qanPage.changeSorting(1, 'down');
    qanPage.verifySortingIs(1, 'down');
    qanPage.verifySortingIs(3, '');
  }
);

Scenario(
  'Open the QAN Dashboard and check that the data in the graph of the main metric is in chronological order. @new-qan',
  async (I, qanPage, adminPage) => {
    const graphSelector = qanPage.mainMetricGraphLocator(1);
    const dateValueBefore = await qanPage.getMainMetricGraphValue(graphSelector, 0);
    const dateValueAfter = await qanPage.getMainMetricGraphValue(graphSelector, 100);
    await qanPage.verifyChronologicalOrderDateTime(dateValueBefore, dateValueAfter);
  }
);

xScenario('Open the QAN Dashboard and remove column', async (I, adminPage, qanPage) => {});

xScenario('Open the QAN Dashboard and change column', async (I, adminPage, qanPage) => {});

xScenario('Verify that you cant remove last column from QAN', async (I, adminPage, qanPage) => {});
