const assert = require('assert');

Feature('To verify and test the QAN Dashboard');

Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});

xScenario('Open the QAN Dashboard and change groupBy', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.changeGroupBy('Database');
  qanPage.groupByIs('Database');
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

Before((I) => {
  I.Authorize()
});

xScenario('Open the QAN Dashboard and show tooltip @new-qan', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.showTooltip(4, 1);
  I.wait(5);
  I.see('dasdadadad');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check existence of filters @new-qan', async (I, adminPage, qanPage) => {
  const filterCheckboxSelector = '#query-analytics-filters input[type="checkbox"]';
  I.amOnPage(qanPage.url);
  I.waitForElement(filterCheckboxSelector, 30);
  I.seeElementInDOM(filterCheckboxSelector);

});

xScenario('Open the QAN Dashboard and check work of button "reset all" @new-qan', async (I, adminPage, qanPage) => {
  const filterCheckboxSelector = '#query-analytics-filters input[type="checkbox"]';
  I.amOnPage(qanPage.url);
  I.waitForElement(filterCheckboxSelector, 30);
  I.checkOption(filterCheckboxSelector);
  I.waitForResponse('http://localhost/v0/qan/Filters/Get', 10);
  I.click(qanPage.elements.resetAllButton);
  I.dontSeeCheckboxIsChecked(filterCheckboxSelector);
});

xScenario('Open the QAN Dashboard, add a column and make sure that this option not available anymore @new-qan', async (I, adminPage, qanPage) => {
  const addColumnDropdownFirstElement = 'ul.ant-select-dropdown-menu li:first-child';
  I.amOnPage(qanPage.url);
  I.waitForElement(qanPage.fields.addColumnsSelector, 30);
  I.click(qanPage.fields.addColumnsSelector);
  let labelName = await I.grabAttributeFrom(addColumnDropdownFirstElement, 'label');
  let selectedLabel = `ul.ant-select-dropdown-menu li[label='${labelName}']`;
  I.seeElement(selectedLabel);
  I.click(addColumnDropdownFirstElement);
  I.click(qanPage.fields.addColumnsSelector);
  I.dontSeeElement(selectedLabel);
});

xScenario('Open the QAN Dashboard and verify that hovering over a time metric displays a tooltip with a graph @new-qan', async (I, adminPage, qanPage) => {
  const queryTimeColumn = '.ant-table-tbody tr:first-child td:last-child';
  I.amOnPage(qanPage.url);
  I.waitForElement(`${queryTimeColumn} .summarize`, 30);
  I.scrollTo(queryTimeColumn);
  I.moveCursorTo(`${queryTimeColumn} .summarize`);
  I.seeElement(qanPage.elements.metricTooltip);
  I.seeElement(qanPage.elements.latencyChart);
});

xScenario('Open the QAN Dashboard and verify that hovering over a non-time metric displays a tooltip without a graph @new-qan', async (I, adminPage, qanPage) => {
  const queryCountColumn = '.ant-table-tbody tr:first-child td:nth-child(4)';
  I.amOnPage(qanPage.url);
  I.waitForElement(`${queryCountColumn} .summarize`, 30);
  I.scrollTo(queryCountColumn);
  I.moveCursorTo(`${queryCountColumn} .summarize`);
  I.seeElement(qanPage.elements.metricTooltip);
  I.dontSeeElement(qanPage.elements.latencyChart);
});

xScenario('Open the QAN Dashboard and verify that the metric value matches the "Per sec" value in the tooltip. @new-qan', async (I, adminPage, qanPage) => {
  const queryCountColumn = '.ant-table-tbody tr:first-child td:nth-child(4)';
  I.amOnPage(qanPage.url);
  I.waitForElement(`${queryCountColumn} .summarize`, 30);
  I.scrollTo(queryCountColumn);
  I.moveCursorTo(`${queryCountColumn} .summarize`);
  I.waitForElement(qanPage.elements.metricTooltip, 5);
  I.seeElement(qanPage.elements.metricTooltip);
  let qpsMetricValue = await I.grabTextFrom(`${queryCountColumn} .summarize`);
  let qpsTooltipValue = await I.grabTextFrom('[data-qa="metrics-list"] [data-qa="qps"] span');
  assert.equal(qpsMetricValue.replace(/[^0-9.]/g,""), qpsTooltipValue.replace(/[^0-9.]/g,""));
});

xScenario('Open the QAN Dashboard and check that changing the time range clears the selected row. @new-qan', async (I, adminPage, qanPage) => {
  const numOfRows = await I.grabNumberOfVisibleElements('ant-table-scroll .ant-table-tbody tr');
  const randomTableRow = qanPage.helpers.getRandomIntInclusive(1, numOfRows);
  const randomTableRowSelector = `.ant-table-scroll .ant-table-tbody tr:nth-child(${randomTableRow}) .overview-main-column div`;
  const numOfTimeRangeOptions = await I.grabNumberOfVisibleElements('.gf-form-select-box__option');
  const randomTimeRangeOption = qanPage.helpers.getRandomIntInclusive(1, numOfTimeRangeOptions);

  I.amOnPage(qanPage.url);
  I.waitForElement(randomTableRowSelector, 30);
  I.forceClick(randomTableRowSelector);
  I.click(qanPage.elements.timeRangePickerButton);
  I.click(`.gf-form-select-box__option:nth-child(${randomTimeRangeOption})`);
  I.dontSeeElement(qanPage.elements.selectedOverviewRow);
  I.dontSeeElement(qanPage.elements.detailsSection);
});

xScenario('Open the QAN Dashboard and check that changing the time range resets current page to the first. @new-qan', async (I, adminPage, qanPage) => {
  const numOfPages = await I.grabNumberOfVisibleElements('.ant-pagination-item');
  const randomPage = qanPage.helpers.getRandomIntInclusive(1, numOfPages);
  const randomPageSelector = `.ant-pagination-item[title = '${randomPage}']`;
  const numOfTimeRangeOptions = await I.grabNumberOfVisibleElements('.gf-form-select-box__option');
  const randomTimeRangeOption = qanPage.helpers.getRandomIntInclusive(1, numOfTimeRangeOptions);

  I.amOnPage(qanPage.url);
  I.waitForElement(randomPageSelector, 30);
  I.forceClick(randomPageSelector);
  I.click(qanPage.elements.timeRangePickerButton);
  I.click(`.gf-form-select-box__option:nth-child(${randomTimeRangeOption})`);
  I.waitForResponse('http://localhost/v0/qan/GetReport', 10);
  I.seeElement('.ant-pagination-item-active[title="1"]');
});
