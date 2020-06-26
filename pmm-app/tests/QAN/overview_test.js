Feature('Test QAN overview');

Before(async (I, qanPage) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'PMM-T146 Verify user is able to see  chart tooltip for time related metric @new-qan',
  async (I, qanPage) => {
    const ROW_NUMBER = 1;
    const QUERY_TIME_COLUMN_NUMBER = 3;

    qanPage.showTooltip(ROW_NUMBER, QUERY_TIME_COLUMN_NUMBER);
    I.seeElement(qanPage.elements.latencyChart);
  }
);

Scenario(
  'PMM-T151 Verify that hovering over a non-time metric displays a tooltip without a graph @new-qan',
  async (I, qanPage) => {
    const ROW_NUMBER = 1;
    const QUERY_COUNT_COLUMN_NUMBER = 2;

    qanPage.showTooltip(ROW_NUMBER, QUERY_COUNT_COLUMN_NUMBER);
    I.dontSeeElement(qanPage.elements.latencyChart);
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
  'PMM-T135 Verify that a duplicate of the metric cannot be added to the overview table @new-qan',
  async (I, qanPage) => {
    const COLUMN_NAME = 'Bytes Sent';

    qanPage.addColumn(COLUMN_NAME);
    await qanPage.verifyColumnIsNotAvailable(COLUMN_NAME);
  }
);

Scenario(
  'PMM-T156 Verify that by default, queries are sorted by Load, from max to min @new-qan',
  async (I, adminPage, qanPage) => {
    qanPage.waitForNewQANPageLoaded();
    qanPage.verifySortingIs(1, 'down');
  }
);

Scenario(
  'PMM-T183 Verify that "Group by" in the overview table can be changed @new-qan',
  async (I, adminPage, qanPage) => {
    qanPage.changeGroupBy('Database');
    qanPage.verifyGroupByIs('Database');
  }
);

Scenario(
  'PMM-T187 Verify that the selected row in the overview table is highlighted @new-qan',
  async (I, adminPage, qanPage) => {
    qanPage.selectRow('2');
    qanPage.verifyRowIsSelected('2');
  }
);

Scenario(
  'PMM-T133, PMM-T132, PMM-T100 Check Changing Main Metric, PMM-T203 Verify user is able to search for columns by typing @not-pr-pipeline',
  async (I, qanPage, dashboardPage) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';

    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator('Load'), 30);
    I.click(qanPage.tableHeaderColumnLocator('Load'));
    I.waitForElement(qanPage.fields.newQANMetricDropDown, 30);
    I.fillField(qanPage.fields.newQANColumnSearchField, metricName);
    I.click(dashboardPage.fields.metricTitle);
    I.waitForElement(qanPage.tableHeaderColumnLocator(metricName), 30);
    I.seeElement(qanPage.tableHeaderColumnLocator(metricName));
    I.dontSeeElement(qanPage.tableHeaderColumnLocator('Load'));
    I.seeInCurrentUrl(urlString);
    const url = await I.grabCurrentUrl();

    I.amOnPage(url);
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator(metricName), 30);
    I.dontSeeElement(qanPage.tableHeaderColumnLocator('Load'));
  }
);

Scenario(
  'PMM-T99 Verify User is able to add new metric, PMM-T222 Verify `Add column` dropdown works @not-pr-pipeline',
  async (I, qanPage, dashboardPage) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';

    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator('Load'), 30);
    I.click(qanPage.fields.newQANAddColumn);
    I.waitForElement(qanPage.fields.newQANMetricDropDown, 30);
    I.fillField(qanPage.fields.newQANColumnSearchField, metricName);
    I.click(dashboardPage.fields.metricTitle);
    I.waitForElement(qanPage.tableHeaderColumnLocator(metricName), 30);
    I.seeElement(qanPage.tableHeaderColumnLocator(metricName));
    I.seeElement(qanPage.tableHeaderColumnLocator('Load'));
    I.seeInCurrentUrl(urlString);
    const url = await I.grabCurrentUrl();

    I.amOnPage(url);
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator(metricName), 30);
    I.seeElement(qanPage.tableHeaderColumnLocator('Load'));
    I.seeElement(qanPage.tableHeaderColumnLocator(metricName));
  }
);

Scenario(
  'PMM-T13 - Verify QAN has MongoDB, MySQL, PostgreSQl all three Service Types @not-pr-pipeline',
  async (I, qanPage) => {
    const filters = ['mongodb', 'mysql', 'postgres'];

    qanPage.waitForNewQANPageLoaded();
    I.waitForElement(qanPage.fields.filterBy, 30);
    const countBefore = await qanPage.getCountOfItems();

    for (i = 0; i < filters.length; i++) {
      await I.fillField(qanPage.fields.filterBy, filters[i]);
      qanPage.applyFilterNewQAN(filters[i]);
      const countAfter = await qanPage.getCountOfItems();

      await qanPage.verifyChangedCount(countBefore, countAfter);
      qanPage.applyFilterNewQAN(filters[i]);
      await I.clearField(qanPage.fields.filterBy);
    }
  }
);

Scenario('PMM-T128 - Verify pagination works correctly @not-pr-pipeline', async (I, qanPage) => {
  qanPage.waitForNewQANPageLoaded();
  qanPage.verifySelectedCountPerPage('10 / page');
  I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
  I.click(qanPage.fields.nextPage);
  qanPage.verifyActiveItem(2);
  await qanPage.verifyCount('11-20');
  I.click(qanPage.fields.previousPage);
  qanPage.verifyActiveItem(1);
  await qanPage.verifyCount('1-10');
  I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
  I.click(qanPage.fields.ellipsisButton);
  qanPage.verifyActiveItem(6);
  await qanPage.verifyCount('51-60');
  I.click(qanPage.fields.ellipsisButton);
  qanPage.verifyActiveItem(1);
  await qanPage.verifyCount('1-10');
  qanPage.selectPage(3);
  qanPage.verifyActiveItem(3);
  await qanPage.verifyCount('21-30');
});

Scenario(
  'PMM-T193 - Verify user is able to change per page elements display and pagination is updated according to this value, PMM-T256 - Verify that switching view from 10 to 50/100 pages works correctly @not-pr-pipeline',
  async (I, qanPage) => {
    qanPage.waitForNewQANPageLoaded();
    await qanPage.verifyRowCount(11);
    await qanPage.verifyCount('1-10');
    await qanPage.verifyPagesAndCount(10);
    qanPage.selectPagination('50 / page');
    await qanPage.verifyRowCount(51);
    await qanPage.verifyPagesAndCount(50);
    await qanPage.verifyCount('1-50');
    qanPage.selectPagination('100 / page');
    await qanPage.verifyRowCount(101);
    await qanPage.verifyPagesAndCount(100);
    await qanPage.verifyCount('1-100');
    qanPage.selectPagination('10 / page');
    await qanPage.verifyRowCount(11);
    await qanPage.verifyCount('1-10');
    await qanPage.verifyPagesAndCount(10);
  }
);

Scenario(
  'PMM-T135 - Verify user is not able to add duplicate metric to the overview column @not-pr-pipeline',
  async (I, qanPage) => {
    const column = 'Load';

    qanPage.waitForNewQANPageLoaded();
    qanPage.verifyAddedColumn(column);
    I.click(qanPage.fields.addColumnNewQAN);
    I.fillField(qanPage.fields.addColumnNewQAN, column);
    I.waitForVisible(qanPage.fields.noDataIcon, 30);
    I.seeElement(qanPage.fields.noDataIcon);
  }
);

Scenario(
  'PMM-T219 - Verify that user is able to scroll up/down and resize the overview table @not-pr-pipeline',
  async (I, qanPage) => {
    qanPage.waitForNewQANPageLoaded();
    const columnsToAdd = [
      'Bytes Sent',
      'Reading Blocks Time',
      'Local Blocks Read',
      'Local Blocks Dirtied',
      'Temp Blocks Read',
      'Local Blocks Written',
      'Full Scan',
    ];

    for (i = 0; i < columnsToAdd.length; i++) {
      I.click(qanPage.fields.addColumnNewQAN);
      qanPage.addSpecificColumn(columnsToAdd[i]);
    }

    I.waitForElement(qanPage.getColumn('Local Blocks Written'), 30);
    I.scrollTo(qanPage.getColumn('Local Blocks Written'), 30);
    I.moveCursorTo(qanPage.fields.querySelector);
    I.waitForVisible(qanPage.fields.querySelector);
    I.click(qanPage.fields.querySelector);
    I.scrollTo(qanPage.getRow('10'));
    I.waitForVisible(qanPage.getColumn('Full Scan'), 30);
    I.dragAndDrop(qanPage.fields.resizer, qanPage.getColumn('Full Scan'));
    I.scrollTo(qanPage.getColumn('No index used'));
  }
);

Scenario(
  'PMM-T223 - Verify time metrics are AVG per query (not per second) @not-pr-pipeline',
  async (I, qanPage) => {
    qanPage.waitForNewQANPageLoaded();
    qanPage.applyFilterNewQAN('mysql');
    I.waitForElement(qanPage.fields.querySelector, 30);
    const queryTime = await I.grabTextFrom(qanPage.fields.queryTime);

    I.moveCursorTo(qanPage.fields.querySelector);
    I.click(qanPage.fields.querySelector);
    I.waitForVisible(qanPage.getColumn('Lock Time'), 30);
    await qanPage.verifyAvqQueryCount();
    await qanPage.verifyAvgQueryTime();
  }
);

Scenario(
  'PMM-T215 - Verify that buttons in QAN are disabled and visible on the screen',
  async (I, qanPage) => {
    qanPage.waitForNewQANPageLoaded();
    I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
    I.seeAttributesOnElements(qanPage.fields.nextPage, { 'aria-disabled': 'false' });
    I.seeElement(qanPage.fields.disabledResetAll);
    I.seeElement(qanPage.fields.ellipsisButton);
    I.seeElement(qanPage.fields.showSelectedDisabled);
  }
);

Scenario('PMM-T122 - Verify QAN UI Elements are displayed', async (I, qanPage) => {
  qanPage.waitForNewQANPageLoaded();
  I.waitForVisible(qanPage.fields.filterBy, 30);
  I.waitForVisible(qanPage.fields.addColumnNewQAN, 30);
  await qanPage.verifyRowCount(11);
  await qanPage.verifyPagesAndCount(10);
  I.seeElement(qanPage.fields.environmentLabel);
  I.click(qanPage.fields.querySelector);
  I.waitForVisible(qanPage.getColumn('Lock Time'), 30);
});

Scenario(
  'PMM-T156 Verify Queries are sorted by Load by Default Sorting from Max to Min, verify Sorting for Metrics works @not-pr-pipeline',
  async (I, qanPage) => {
    qanPage.waitForNewQANPageLoaded();
    qanPage.applyFilterNewQAN('mysql');
    I.waitForElement(qanPage.fields.querySelector, 30);
    qanPage.verifyMetricsSorted('Load', 3, 'down');
    qanPage.sortMetric('Load', 'up');
    qanPage.verifyMetricsSorted('Load', 3, 'up');
    qanPage.sortMetric('Query Count', 'down');
    qanPage.verifyMetricsSorted('Query Count', 4, 'down');
    qanPage.sortMetric('Query Count', 'up');
    qanPage.verifyMetricsSorted('Query Count', 4, 'up');
    qanPage.sortMetric('Query Time', 'down');
    qanPage.verifyMetricsSorted('Query Time', 5, 'down');
    qanPage.sortMetric('Query Time', 'up');
    qanPage.verifyMetricsSorted('Query Time', 5, 'up');
  }
);

Scenario(
  'PMM-T179 - Verify user is able to hover sparkline buckets and see correct tooltip',
  async (I, qanPage) => {
    qanPage.waitForNewQANPageLoaded();
    const queryCount = await I.grabTextFrom(qanPage.fields.overviewRowQueryCount);

    I.moveCursorTo(qanPage.fields.overviewRowQueryCount);
    I.waitForVisible(qanPage.fields.overviewRowQueryCountTooltip, 20);
    await qanPage.verifyCountTooltip(queryCount);
    const queryTime = await I.grabTextFrom(qanPage.fields.overviewRowQueryTime);

    I.moveCursorTo(qanPage.fields.overviewRowQueryTime);
    I.waitForVisible(qanPage.fields.overviewRowQueryTimeTooltip, 20);
    await qanPage.verifyTimeTooltip(queryTime);
    I.click(qanPage.fields.querySelector);
    // Didn't find way how to check tooltip in detail.
  }
);

Scenario('PMM-T204 - Verify small and N/A values on sparkline', async (I, qanPage) => {
  qanPage.waitForNewQANPageLoaded();
  qanPage.sortMetric('Load', 'up');
  I.moveCursorTo(qanPage.fields.loadValue);
  I.waitForVisible(qanPage.fields.loadValueTooltip, 10);
  qanPage.applyFilterNewQAN('mongodb_cluster');
  I.click(qanPage.fields.addColumnNewQAN);
  qanPage.addSpecificColumn('Innodb');
  qanPage.verifyAddedColumn('Innodb');
  I.moveCursorTo(qanPage.fields.innodbColumn);
  I.dontSeeElement(qanPage.fields.innodbColumnTooltip);
});
