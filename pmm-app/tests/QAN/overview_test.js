Feature('QAN overview');

Before(async ({ I, qanPage, qanOverview }) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
  qanOverview.waitForOverviewLoaded();
});

Scenario(
  'PMM-T146 Verify user is able to see  chart tooltip for time related metric  @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    const ROW_NUMBER = 1;
    const QUERY_TIME_COLUMN_NUMBER = 3;

    qanOverview.showTooltip(ROW_NUMBER, QUERY_TIME_COLUMN_NUMBER);
    I.seeElement(qanOverview.elements.latencyChart);
  },
);

Scenario(
  'PMM-T151 Verify that hovering over a non-time metric displays a tooltip without a graph @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    const ROW_NUMBER = 1;
    const QUERY_COUNT_COLUMN_NUMBER = 2;

    qanOverview.showTooltip(ROW_NUMBER, QUERY_COUNT_COLUMN_NUMBER);
    I.dontSeeElement(qanOverview.elements.latencyChart);
  },
);

Scenario(
  'Open the QAN Dashboard and check that sorting works correctly after sorting by another column. @not-pr-pipeline @qan',
  async ({ qanOverview }) => {
    qanOverview.changeSorting(2);
    qanOverview.verifySorting(2, 'asc');
    qanOverview.changeSorting(1);
    qanOverview.verifySorting(1, 'asc');
    qanOverview.changeSorting(1);
    qanOverview.verifySorting(1, 'desc');
    qanOverview.verifySorting(2);
  },
);

Scenario(
  'PMM-T156 Verify that by default, queries are sorted by Load, from max to min @not-pr-pipeline @qan',
  async ({ qanOverview }) => {
    qanOverview.waitForOverviewLoaded();
    qanOverview.verifySorting(1, 'asc');
  },
);

Scenario(
  'PMM-T183 Verify that "Group by" in the overview table can be changed @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    I.waitForText('Query', 30, qanOverview.elements.groupBy);
    await qanOverview.changeGroupBy('Database');
    qanOverview.verifyGroupByIs('Database');
  },
);

Scenario(
  'PMM-T187 Verify that the selected row in the overview table is highlighted @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    qanOverview.selectRow('2');
    I.seeCssPropertiesOnElements('.selected-overview-row > div', {
      'background-color': 'rgb(35, 70, 130)',
    });
  },
);

Scenario(
  'PMM-T133, PMM-T132, PMM-T100 Check Changing Main Metric, PMM-T203 Verify user is able to search for columns by typing @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';
    const newMetric = qanOverview.getColumnLocator(metricName);
    const oldMetric = qanOverview.getColumnLocator('Load');

    I.waitForElement(qanOverview.buttons.addColumn, 30);
    qanOverview.changeMetric('Load', metricName);
    I.seeInCurrentUrl(urlString);
    const url = await I.grabCurrentUrl();

    I.amOnPage(url);
    I.waitForElement(qanOverview.buttons.addColumn, 30);
    I.waitForElement(newMetric, 30);
    I.dontSeeElement(oldMetric);
  },
);

Scenario(
  'PMM-T99 Verify User is able to add new metric, PMM-T222 Verify `Add column` dropdown works @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';
    const newMetric = qanOverview.getColumnLocator(metricName);
    const metricInDropdown = qanOverview.getMetricLocatorInDropdown(metricName);
    const oldMetric = qanOverview.getColumnLocator('Load');

    I.waitForElement(qanOverview.buttons.addColumn, 30);
    I.waitForElement(oldMetric, 30);
    I.doubleClick(qanOverview.buttons.addColumn);
    I.waitForElement(qanOverview.elements.newMetricDropdown, 30);
    I.fillField(qanOverview.fields.columnSearchField, metricName);
    I.click(metricInDropdown);
    qanOverview.waitForOverviewLoaded();
    I.waitForElement(newMetric, 30);
    I.seeElement(newMetric);
    I.seeElement(oldMetric);
    I.seeInCurrentUrl(urlString);
    const url = await I.grabCurrentUrl();

    I.amOnPage(url);
    qanOverview.waitForOverviewLoaded();
    I.waitForElement(qanOverview.buttons.addColumn, 30);
    I.waitForElement(newMetric, 30);
    I.seeElement(oldMetric);
    I.seeElement(newMetric);
  },
);

Scenario(
  'PMM-T135 - Verify user is not able to add duplicate metric to the overview column @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    const columnName = 'Load';
    const column = qanOverview.getColumnLocator(columnName);

    I.waitForVisible(column, 30);
    I.seeElement(column);
    I.click(qanOverview.buttons.addColumn);
    I.fillField(qanOverview.fields.columnSearchField, columnName);
    I.waitForVisible(qanOverview.elements.noDataIcon, 30);
    I.seeElement(qanOverview.elements.noDataIcon);
  },
);

xScenario(
  'PMM-T219 - Verify that user is able to scroll up/down and resize the overview table @not-pr-pipeline @qan',
  async ({ I, qanOverview, qanDetails }) => {
    const columnsToAdd = [
      'Bytes Sent',
      'Reading Blocks Time',
      'Local Blocks Read',
      'Local Blocks Dirtied',
      'Temp Blocks Read',
      'Local Blocks Written',
      'Full Scan',
    ];

    for (const i in columnsToAdd) {
      I.click(qanOverview.buttons.addColumn);
      qanOverview.addSpecificColumn(columnsToAdd[i]);
    }

    I.waitForElement(qanOverview.getColumnLocator('Local Blocks Written'), 30);
    I.scrollTo(qanOverview.getColumnLocator('Local Blocks Written'), 30);
    I.moveCursorTo(qanOverview.elements.querySelector);
    I.waitForVisible(qanOverview.elements.querySelector);
    I.click(qanOverview.elements.querySelector);
    I.scrollTo(qanOverview.getRowLocator(10));
    I.waitForVisible(qanOverview.getColumnLocator('Query Time'), 30);
    I.waitForVisible(qanDetails.elements.resizer, 30);
    I.dragAndDrop(qanDetails.elements.resizer, qanOverview.getColumnLocator('Query Time'));
    I.scrollTo(qanOverview.getColumnLocator('Query Time'));
  },
);

Scenario(
  'PMM-T156 Verify Queries are sorted by Load by Default Sorting from Max to Min, verify Sorting for Metrics works @not-pr-pipeline @qan',
  async ({ qanOverview }) => {
    qanOverview.verifySorting(1, 'asc');
    await qanOverview.verifyMetricsSorted('Load', 3, 'down');
    qanOverview.changeSorting(1);
    qanOverview.verifySorting(1, 'desc');
    await qanOverview.verifyMetricsSorted('Load', 3, 'up');
    qanOverview.changeSorting(2);
    qanOverview.verifySorting(2, 'asc');
    await qanOverview.verifyMetricsSorted('Query Count', 4, 'down');
    qanOverview.changeSorting(2);
    qanOverview.verifySorting(2, 'desc');
    await qanOverview.verifyMetricsSorted('Query Count', 4, 'up');
    qanOverview.changeSorting(3);
    qanOverview.verifySorting(3, 'asc');
    await qanOverview.verifyMetricsSorted('Query Time', 5, 'down');
    qanOverview.changeSorting(3);
    qanOverview.verifySorting(3, 'desc');
    await qanOverview.verifyMetricsSorted('Query Time', 5, 'up');
  },
);

Scenario(
  'PMM-T179 - Verify user is able to hover sparkline buckets and see correct Query Count Value @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    const firstCell = qanOverview.getCellValueLocator(3, 2);

    const [queryCount] = (await I.grabTextFrom(firstCell)).split(' ');

    I.moveCursorTo(firstCell);
    I.waitForVisible(qanOverview.elements.tooltip, 20);
    await qanOverview.verifyTooltipValue(queryCount);
  },
);

Scenario(
  'PMM-T179 - Verify user is able to hover sparkline buckets and see correct Query Time Value @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    const secondCell = qanOverview.getCellValueLocator(3, 3);

    const queryTime = await I.grabTextFrom(secondCell);

    I.moveCursorTo(secondCell);
    I.waitForVisible(qanOverview.elements.latencyChart, 20);
    await qanOverview.verifyTooltipValue(`Per query : ${queryTime}`);
  },
);

Scenario(
  'PMM-T204 - Verify small and N/A values on sparkline @not-pr-pipeline @qan',
  async ({ I, qanOverview }) => {
    const firstCell = qanOverview.getCellValueLocator(0, 1);
    const secondCell = qanOverview.getCellValueLocator(3, 3);

    qanOverview.changeSorting(1);
    qanOverview.verifySorting(1, 'desc');
    I.moveCursorTo(firstCell);
    I.waitForVisible(qanOverview.elements.tooltipQPSValue, 10);
    qanOverview.changeMetric('Query Time', 'Innodb Queue Wait');
    qanOverview.waitForOverviewLoaded();
    I.moveCursorTo(secondCell);
    I.dontSeeElement(qanOverview.elements.tooltip);
    I.dontSeeElement(qanOverview.elements.tooltipQPSValue);
  },
);
