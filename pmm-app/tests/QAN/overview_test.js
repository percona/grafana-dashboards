Feature('Test QAN overview');

Before(async (I, qanPage) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'PMM-T146 Verify user is able to see  chart tooltip for time related metric  @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const ROW_NUMBER = 1;
    const QUERY_TIME_COLUMN_NUMBER = 3;

    qanActions.showTooltip(ROW_NUMBER, QUERY_TIME_COLUMN_NUMBER);
    I.seeElement(qanPage.elements.latencyChart);
  },
);

Scenario(
  'PMM-T151 Verify that hovering over a non-time metric displays a tooltip without a graph @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const ROW_NUMBER = 1;
    const QUERY_COUNT_COLUMN_NUMBER = 2;

    qanActions.showTooltip(ROW_NUMBER, QUERY_COUNT_COLUMN_NUMBER);
    I.dontSeeElement(qanPage.elements.latencyChart);
  },
);

// Need to be removed from Skipped when better locator for Sorting buttons implemented
xScenario(
  'Open the QAN Dashboard and check that sorting works correctly after sorting by another column. @qan',
  async (qanPage, qanActions) => {
    qanActions.changeSorting(3, 'up');
    qanActions.verifySortingIs(3, 'up');
    qanActions.changeSorting(1, 'down');
    qanActions.verifySortingIs(1, 'down');
    qanActions.verifySortingIs(3, '');
  },
);

// Need to be removed from Skipped when better locator for Sorting buttons implemented
xScenario(
  'PMM-T156 Verify that by default, queries are sorted by Load, from max to min @qan',
  async (qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    qanActions.verifySortingIs(1, 'down');
  },
);
// Skipping because of a random failing at PR tests execution
xScenario(
  'PMM-T183 Verify that "Group by" in the overview table can be changed @qan',
  async (qanPage, qanActions) => {
    qanActions.changeGroupBy('Database');
    qanActions.verifyGroupByIs('Database');
  },
);

// Need to be skipped for change in locator
xScenario(
  'PMM-T187 Verify that the selected row in the overview table is highlighted @qan',
  async (qanPage, qanActions) => {
    qanActions.selectRow('2');
    qanActions.verifyRowIsSelected('2');
  },
);

Scenario(
  'PMM-T133, PMM-T132, PMM-T100 Check Changing Main Metric, PMM-T203 Verify user is able to search for columns by typing @not-pr-pipeline @qan',
  async (I, qanPage, dashboardPage, qanActions) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';

    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.getColumn('Load'), 30);
    I.click(qanPage.getColumn('Load'));
    I.waitForElement(qanPage.fields.newQANMetricDropDown, 30);
    I.fillField(qanPage.fields.searchFieldForColumn, metricName);
    I.click(dashboardPage.fields.metricTitle);
    I.waitForElement(qanPage.getColumn(metricName), 30);
    I.seeElement(qanPage.getColumn(metricName));
    I.dontSeeElement(qanPage.getColumn('Load'));
    I.seeInCurrentUrl(urlString);
    const url = await I.grabCurrentUrl();

    I.amOnPage(url);
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.getColumn(metricName), 30);
    I.dontSeeElement(qanPage.getColumn('Load'));
  },
);

Scenario(
  'PMM-T99 Verify User is able to add new metric, PMM-T222 Verify `Add column` dropdown works @not-pr-pipeline @qan',
  async (I, qanPage, dashboardPage, qanActions) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';

    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.getColumn('Load'), 30);
    I.click(qanPage.fields.newQANAddColumn);
    I.waitForElement(qanPage.fields.newQANMetricDropDown, 30);
    I.fillField(qanPage.fields.searchFieldForColumn, metricName);
    I.click(dashboardPage.fields.metricTitle);
    I.waitForElement(qanPage.getColumn(metricName), 30);
    I.seeElement(qanPage.getColumn(metricName));
    I.seeElement(qanPage.getColumn('Load'));
    I.seeInCurrentUrl(urlString);
    const url = await I.grabCurrentUrl();

    I.amOnPage(url);
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.getColumn(metricName), 30);
    I.seeElement(qanPage.getColumn('Load'));
    I.seeElement(qanPage.getColumn(metricName));
  },
);

Scenario(
  'PMM-T13 - Verify QAN has MongoDB, MySQL, PostgreSQl all three Service Types @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const filters = ['mongodb', 'mysql', 'postgres'];

    qanActions.waitForNewQANPageLoaded();
    I.waitForElement(qanPage.fields.filterBy, 30);
    const countBefore = await qanActions.getCountOfItems();

    for (let i = 0; i < filters.length; i++) {
      await I.fillField(qanPage.fields.filterBy, filters[i]);
      qanActions.applyFilterNewQAN(filters[i]);
      const countAfter = await qanActions.getCountOfItems();

      await qanActions.verifyChangedCount(countBefore, countAfter);
      qanActions.applyFilterNewQAN(filters[i]);
      await I.clearField(qanPage.fields.filterBy);
    }
  },
);

Scenario(
  'PMM-T135 - Verify user is not able to add duplicate metric to the overview column @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const column = 'Load';

    qanActions.waitForNewQANPageLoaded();
    qanActions.verifyAddedColumn(column);
    I.click(qanPage.fields.addColumnNewQAN);
    I.fillField(qanPage.fields.searchFieldForColumn, column);
    I.waitForVisible(qanPage.fields.noDataIcon, 30);
    I.seeElement(qanPage.fields.noDataIcon);
  },
);

Scenario(
  'PMM-T219 - Verify that user is able to scroll up/down and resize the overview table @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    const columnsToAdd = [
      'Bytes Sent',
      'Reading Blocks Time',
      'Local Blocks Read',
      'Local Blocks Dirtied',
      'Temp Blocks Read',
      'Local Blocks Written',
      'Full Scan',
    ];

    for (let i = 0; i < columnsToAdd.length; i++) {
      I.click(qanPage.fields.addColumnNewQAN);
      qanActions.addSpecificColumn(columnsToAdd[i]);
    }

    I.waitForElement(qanPage.getColumn('Local Blocks Written'), 30);
    I.scrollTo(qanPage.getColumn('Local Blocks Written'), 30);
    I.moveCursorTo(qanPage.fields.querySelector);
    I.waitForVisible(qanPage.fields.querySelector);
    I.click(qanPage.fields.querySelector);
    I.scrollTo(qanPage.getRow('10'));
    I.waitForVisible(qanPage.getColumn('Query Time'), 30);
    I.dragAndDrop(qanPage.fields.resizer, qanPage.getColumn('Query Time'));
    I.scrollTo(qanPage.getColumn('Query Time'));
  },
);

Scenario(
  'PMM-T215 - Verify that buttons in QAN are disabled and visible on the screen @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
    I.seeAttributesOnElements(qanPage.fields.nextPage, { 'aria-disabled': 'false' });
    I.seeElement(qanPage.fields.disabledResetAll);
    const countOfItems = await qanActions.getCountOfItems();

    if (countOfItems > 100) {
      I.seeElement(qanPage.fields.ellipsisButton);
    }

    I.seeElement(qanPage.fields.showSelectedDisabled);
  },
);

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

// Need to be fixed as soon as better locators for Sorting are implemented
xScenario(
  'PMM-T156 Verify Queries are sorted by Load by Default Sorting from Max to Min, verify Sorting for Metrics works @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewqanActionsStepLoaded();
    qanActions.applyFilterNewQAN('mysql');
    I.waitForElement(qanPage.fields.querySelector, 30);
    await qanActions.verifyMetricsSorted('Load', 3, 'down');
    qanActions.sortMetric('Load', 'up');
    await qanActions.verifyMetricsSorted('Load', 3, 'up');
    qanActions.sortMetric('Query Count', 'down');
    await qanActions.verifyMetricsSorted('Query Count', 4, 'down');
    qanActions.sortMetric('Query Count', 'up');
    await qanActions.verifyMetricsSorted('Query Count', 4, 'up');
    qanActions.sortMetric('Query Time', 'down');
    await qanPage.verifyMetricsSorted('Query Time', 5, 'down');
    qanPage.sortMetric('Query Time', 'up');
    await qanPage.verifyMetricsSorted('Query Time', 5, 'up');
  },
);

Scenario(
  'PMM-T179 - Verify user is able to hover sparkline buckets and see correct tooltip @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    const [queryCount] = (await I.grabTextFrom(qanPage.fields.overviewRowQueryCount)).split(' ');

    I.moveCursorTo(qanPage.fields.overviewRowQueryCount);
    I.waitForVisible(qanPage.fields.overviewRowQueryCountTooltip, 20);
    await qanActions.verifyCountTooltip(queryCount);
    const queryTime = await I.grabTextFrom(qanPage.fields.overviewRowQueryTime);

    I.moveCursorTo(qanPage.fields.overviewRowQueryTime);
    I.waitForVisible(qanPage.fields.overviewRowQueryTimeTooltip, 20);
    await qanActions.verifyTimeTooltip(`Per query : ${queryTime}`);
    I.click(qanPage.fields.querySelector);
  },
);

// Need to Skip this until Sort can be interacted with
xScenario(
  'PMM-T204 - Verify small and N/A values on sparkline @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    qanActions.sortMetric('Load', 'up');
    I.moveCursorTo(qanPage.fields.loadValue);
    I.waitForVisible(qanPage.fields.loadValueTooltip, 10);
    qanActions.applyFilterNewQAN('mongodb_cluster');
    I.click(qanPage.fields.addColumnNewQAN);
    qanActions.addSpecificColumn('Innodb');
    qanActions.verifyAddedColumn('Innodb');
    I.moveCursorTo(qanPage.fields.innodbColumn);
    I.dontSeeElement(qanPage.fields.innodbColumnTooltip);
  },
);
