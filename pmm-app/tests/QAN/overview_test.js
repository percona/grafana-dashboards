Feature('Test QAN overview');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'T-146 Verify user is able to see  chart tooltip for time related metric @new-qan',
  async (I, qanPage) => {
    const ROW_NUMBER = 1;
    const QUERY_TIME_COLUMN_NUMBER = 3;

    qanPage.showTooltip(ROW_NUMBER, QUERY_TIME_COLUMN_NUMBER);
    I.seeElement(qanPage.elements.latencyChart);
  }
);

Scenario(
  'T-151 Verify that hovering over a non-time metric displays a tooltip without a graph @new-qan',
  async (I, qanPage) => {
    const ROW_NUMBER = 1;
    const QUERY_COUNT_COLUMN_NUMBER = 2;

    qanPage.showTooltip(ROW_NUMBER, QUERY_COUNT_COLUMN_NUMBER);
    I.dontSeeElement(qanPage.elements.latencyChart);
  }
);

Scenario(
  'T-153 Verify the metric value matches the `per sec` value in the tooltip @new-qan',
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
  'T-173 Verify that the data in the graph of the main metric is in chronological order @new-qan',
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

xScenario(
  'T-132 Verify user is able to change metric in the overview table @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-133 Verify user is able to add metric to the overview table @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-134 Verify user is able to remove metric from the overview table @new-qan ',
  async (I, adminPage, qanPage) => {}
);
Scenario(
  'T-135 Verify user is not able to add duplicate metric to the overview column @new-qan',
  async (I, qanPage) => {
    const COLUMN_NAME = 'Bytes Sent';

    qanPage.addColumn(COLUMN_NAME);
    await qanPage.verifyColumnIsNotAvailable(COLUMN_NAME);
  }
);
xScenario(
  'T-156 Verify queries are sorted by Load by default sorting from max to min @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-177 Verify user do not see empty space on the page bottom if there was no query selected @visual @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-178 Verify user is able to scroll horizontally by dragging horizontal scroll @visual @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-183 Verify user is able change `group by` section in overview @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-187 Verify highlighting of selected element in overview @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario('T-194 Verify scrolling through the overview table @new-qan ', async (I, adminPage, qanPage) => {});
xScenario('T-198 Verify 4 types of values in overview table @new-qan ', async (I, adminPage, qanPage) => {});
xScenario(
  'T-201 Verify that small values are visible in sparkline @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-202 Verify user is able to see correct values on sparkline after sorting @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-203 Verify user is able to search for columns by typing @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario('T-207 Verify cursor of query name in query table @new-qan ', async (I, adminPage, qanPage) => {});
xScenario(
  'T-214 Verify Bytes Sent metric show metric without time units @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-219 Verify that user is able to scroll up/down clicking the scrollbar buttons @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  "T-220 Verify that last column can't be removed from Overview table @new-qan ",
  async (I, adminPage, qanPage) => {}
);
xScenario('T-222 Verify `Add column` dropdown @new-qan ', async (I, adminPage, qanPage) => {});
xScenario(
  'T-223 Verify time metrics are AVG per query (not per second) @new-qan ',
  async (I, adminPage, qanPage) => {}
);
