const assert = require('assert');

Feature('To verify and test the QAN Dashboard');

Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});

xScenario('Open the QAN Dashboard and change groupBy', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.changeGroupBy('Database');
  qanPage.verifyGroupByIs('Database');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and verify Filter and Table exist', async (I, adminPage, qanPage) => {
  I.wait(5);
  I.see('Queries overview');
});

Feature('To verify and test the QAN Dashboard Group by');

Feature('To verify and test the QAN Dashboard columns');
Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});
xScenario('Open the QAN Dashboard and add column', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  // TODO: check if there is no duplicates in columns selects
  qanPage.addColumn('Bytes Sent');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and remove column', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.removeColumn('Load');
  // TODO: check if there is no duplicates in columns selects
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and change column', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.changeColumn('Load', 'Tmp Tables');
  // TODO: check if there is no duplicates in columns selects
  // TODO: check changes in url
});

Feature('To verify and test the QAN Dashboard pagination');
Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});
xScenario('Open the QAN Dashboard and change page', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.paginationGoNext();
  // qanPage.paginationGoPrevious();
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard if total number > page size next page is enable', async (I, adminPage, qanPage) => {
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard check if last page number is incorrect', async (I, adminPage, qanPage) => {
  // TODO: check changes in url
});

Feature('To verify and test the QAN Dashboard filters');

Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});
xScenario('Open the QAN Dashboard and select one filter from each group', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  // getGroupsList, for each group select first element
  qanPage.getSelectedFilters();
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard switch between show all/selected correct', async (I, adminPage, qanPage) => {
  // select some random filters, get list of this filters, switch to "show selected", see that you can see only selected,
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard reset filters work correct', async (I, adminPage, qanPage) => {
  // select some random filters, push "reset filters button", make sure that there is no selected filters
  // TODO: check changes in url
});
xScenario('Open the QAN Dashboard filters search works correct', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.searchFilters('postg');
  qanPage.checkFiltersMatchSearch('postg');
  // TODO: check changes in url
});

Feature('To verify and test the QAN Dashboard details');

Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});

xScenario('Open the QAN Dashboard and select row', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  I.see('Query');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check Details -> Metrics', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  I.see('dasdadasd');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check Details -> Examples', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  qanPage.selectDetailsTab('Examples');
  I.see('dasdadasd');

  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check Details -> Explain', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  qanPage.selectDetailsTab('Explain');
  I.see('dasdadasd');

  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check Details -> Tables', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  qanPage.selectDetailsTab('Tables');
  I.see('test');
  // TODO: check changes in url
});

Feature('To verify and test the QAN Dashboard query details tooltip');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

xScenario('Open the QAN Dashboard and show tooltip @new-qan', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.showTooltip(4, 1);
  I.wait(5);
  I.see('dasdadadad');
  // TODO: check changes in url
});

Scenario('Open the QAN Dashboard and check existence of filters @new-qan', async (I, qanPage) => {
  await qanPage.verifyFiltersSectionIsPresent();
});

Scenario('Open the QAN Dashboard and check work of button "reset all" @new-qan', async (I, qanPage) => {
  qanPage.selectFilter(qanPage.fields.filterCheckboxSelector);
  qanPage.resetAllFilters();
  I.dontSeeCheckboxIsChecked(qanPage.fields.filterCheckboxSelector);
});

Scenario('Open the QAN Dashboard, add a column and make sure that this option not available anymore @new-qan', async (I, qanPage) => {
  const COLUMN_NAME = 'Bytes Sent';

  qanPage.addColumn(COLUMN_NAME);
  await qanPage.verifyColumnIsNotAvailable(COLUMN_NAME);
});

Scenario('Open the QAN Dashboard and verify that hovering over a time metric displays a tooltip with a graph @new-qan', async (I, qanPage) => {
  const ROW_NUMBER = 1;
  const QUERY_TIME_COLUMN_NUMBER = 3;

  qanPage.showTooltip(ROW_NUMBER, QUERY_TIME_COLUMN_NUMBER);
  I.seeElement(qanPage.elements.latencyChart);
});

Scenario('Open the QAN Dashboard and verify that hovering over a non-time metric displays a tooltip without a graph @new-qan', async (I, qanPage) => {
  const ROW_NUMBER = 1;
  const QUERY_COUNT_COLUMN_NUMBER = 2;

  qanPage.showTooltip(ROW_NUMBER, QUERY_COUNT_COLUMN_NUMBER);
  I.dontSeeElement(qanPage.elements.latencyChart);
});

Scenario('Open the QAN Dashboard and verify that the metric value matches the "Per sec" value in the tooltip. @new-qan', async (I, qanPage) => {
  const ROW_NUMBER = 1;
  const QUERY_COUNT_COLUMN_NUMBER = 2;

  qanPage.verifyMetricsMatch(ROW_NUMBER, QUERY_COUNT_COLUMN_NUMBER);
});

Scenario('Open the QAN Dashboard and check that changing the time range clears the selected row. @new-qan', async (I, qanPage, adminPage) => {
  I.waitForElement(qanPage.elements.tableRowSelector, 30);
  I.forceClick(qanPage.elements.tableRowSelector);
  adminPage.applyTimeRange('Last 3 hours');
  I.dontSeeElement(qanPage.elements.selectedOverviewRow);
  I.dontSeeElement(qanPage.elements.detailsSection);
});

Scenario('Open the QAN Dashboard and check that changing the time range resets current page to the first. @new-qan', async (I, qanPage, adminPage) => {
  qanPage.paginationGoTo(2);
  adminPage.applyTimeRange('Last 3 hours');
  qanPage.waitForResponsePath(qanPage.requests.getReportPath);
  await qanPage.verifySelectedPageIs(1);
});

Scenario('Open the QAN Dashboard and check that changing the time range updates the overview table and URL. @new-qan', async (I, qanPage, adminPage) => {
  const TIME_RANGE_QUERY_PARAMS_BEFORE = 'from=now-12h&to=now';
  const TIME_RANGE_QUERY_PARAMS_AFTER = 'from=now-3h&to=now';

  I.amOnPage(`${qanPage.url}?${TIME_RANGE_QUERY_PARAMS_BEFORE}`);
  qanPage.waitForQANPageLoaded();
  I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_BEFORE);
  adminPage.applyTimeRange('Last 3 hours');
  qanPage.waitForResponsePath(qanPage.requests.getReportPath);
  qanPage.waitForQANPageLoaded();
  I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_AFTER);
});

Scenario('Open the QAN Dashboard and check that changing the time range doesn\'t clear "Group by". @new-qan', async (I, qanPage, adminPage) => {
  qanPage.changeGroupBy('Client Host');
  adminPage.applyTimeRange('Last 24 hours');
  qanPage.verifyGroupByIs('Client Host');
});

Scenario('Open the QAN Dashboard and check that changing the time range doesn\'t reset sorting. @new-qan', async (I, qanPage, adminPage) => {
  qanPage.changeSorting(3, 'up');
  adminPage.applyTimeRange('Last 24 hours');
  qanPage.verifySortingIs(3, 'up');
});

Scenario('Open the QAN Dashboard and check that sorting works correctly after sorting by another column. @new-qan', async (I, qanPage, adminPage) => {
  qanPage.changeSorting(3, 'up');
  qanPage.verifySortingIs(3, 'up');
  qanPage.changeSorting(1, 'down');
  qanPage.verifySortingIs(1, 'down');
  qanPage.verifySortingIs(3, '');
});

Scenario('Open the QAN Dashboard and check that the data in the graph of the main metric is in chronological order. @new-qan', async (I, qanPage, adminPage) => {
  const graphSelector = qanPage.mainMetricGraphLocator(1);
  const dateValueBefore = await qanPage.getMainMetricGraphValue(graphSelector, 0);
  const dateValueAfter = await qanPage.getMainMetricGraphValue(graphSelector, 100);
  await qanPage.verifyChronologicalOrderDateTime(dateValueBefore, dateValueAfter);
});
