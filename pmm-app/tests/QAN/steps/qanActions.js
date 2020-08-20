const { I, pmmSettingsPage, qanPage } = inject();
const assert = require('assert');

module.exports = {
  async expandAllFilter() {
    for (let i = 0; i < 4; i++) {
      const numOfElementsFilterCount = await I.grabNumberOfVisibleElements(
        qanPage.filterGroupCountSelector(qanPage.filterGroups[i]),
      );

      if (numOfElementsFilterCount === 1) {
        I.click(qanPage.filterGroupCountSelector(qanPage.filterGroups[i]));
        I.waitForVisible(
          `//section[@class='aside__filter-group']//span[contains(text(), '${qanPage.filterGroups[i]}')]/../button[contains(text(), 'Show top 5')]`,
        );
      }
    }
  },

  waitForQANPageLoaded() {
    I.waitForVisible(qanPage.fields.table, 30);
    I.waitForClickable(qanPage.fields.nextPageNavigation, 30);
  },

  changeGroupBy(groupBy = 'Client Host') {
    I.waitForElement(qanPage.fields.groupBySelector, 30);
    I.forceClick(qanPage.fields.groupBySelector);
    I.click(`//ul/li[@label='${groupBy}']`);
  },

  verifyGroupByIs(groupBy) {
    I.waitForElement(`[data-qa="group-by"] [title="${groupBy}"]`, 30);
    I.seeElement(`[data-qa="group-by"] [title="${groupBy}"]`);
  },

  async changeSorting(columnNumber, sortDirection = 'down') {
    const sortingBlockSelector = qanPage.overviewMetricSortingLocator(columnNumber);

    I.waitForElement(sortingBlockSelector, 30);
    if (sortDirection === 'up') {
      I.wait(5);
      await I.forceClick(`${sortingBlockSelector}`);
    }

    I.wait(5);
  },

  verifySortingIs(columnNumber, sortDirection) {
    const sortingBlockSelector = qanPage.overviewMetricSortingLocator(columnNumber);

    switch (sortDirection) {
      case 'up':
        I.seeElement(`${sortingBlockSelector}.asc`);
        break;
      case 'down':
        I.seeElement(`${sortingBlockSelector}.desc`);
        break;
      default:
        I.dontSeeElement(`${sortingBlockSelector}.asc`);
        I.dontSeeElement(`${sortingBlockSelector}.desc`);
        break;
    }
  },

  addColumn(columnName) {
    I.waitForElement(qanPage.fields.addColumnSelector, 30);
    I.click(qanPage.fields.addColumnSelector);
    I.click(`//ul/li[@label='${columnName}']`);
    this.waitForNewQANPageLoaded();
  },

  changeColumn(oldColumnName, columnName) {
    const oldColumnSelector = `//span[text()='${oldColumnName}']`;
    const newColumnSelector = `//li[text()='${columnName}']`;

    I.waitForElement(oldColumnSelector, 30);
    I.click(oldColumnSelector);
    I.waitForElement(newColumnSelector, 30);
    I.click(newColumnSelector);
    this.waitForNewQANPageLoaded();
  },

  removeColumn(columnName) {
    this.openMetricsSelect(columnName);
    I.waitForElement(qanPage.fields.removeColumnButton, 30);
    I.click(qanPage.fields.removeColumnButton);
    this.waitForNewQANPageLoaded();
  },

  openMetricsSelect(columnName) {
    const columnSelector = qanPage.manageColumnLocator(columnName);

    I.waitForElement(columnSelector, 30);
    I.click(columnSelector);
  },

  selectRow(rowNumber) {
    const rowSelector = qanPage.overviewRowLocator(rowNumber);

    I.waitForElement(rowSelector, 60);
    I.forceClick(rowSelector);
    this.waitForNewQANPageLoaded();
  },

  selectTableRow(rowNumber) {
    const rowSelector = `div.tr.tr-${rowNumber}`;

    I.waitForElement(rowSelector, 30);
    I.click(rowSelector);
  },

  paginationGoTo(pageNumber) {
    const pageSelector = `.ant-pagination-item[title = '${pageNumber}']`;

    I.waitForElement(pageSelector, 30);
    I.click(pageSelector);
  },

  showTooltip(rowNumber, dataColumnNumber) {
    const tooltipSelector = qanPage.overviewMetricCellValueLocator(rowNumber, dataColumnNumber);

    I.waitForElement(tooltipSelector, 30);
    I.scrollTo(tooltipSelector);
    I.moveCursorTo(tooltipSelector);
    I.waitForElement(qanPage.elements.metricTooltip, 5);
    I.seeElement(qanPage.elements.metricTooltip);
  },

  selectDetailsTab(tabName) {
    const tabSelector = `//div[@role='tab']/span[text()='${tabName}']`;

    I.waitForElement(tabSelector, 30);
    I.click(tabSelector);
  },

  waitForNewQANPageLoaded() {
    I.waitForElement(qanPage.fields.newQANPanelContent, 30);
    I.waitForElement(qanPage.fields.querySelector, 30);
  },

  applyFilterNewQAN(filterName) {
    const oldResultsCount = this.getCountOfItems();

    I.fillField(qanPage.fields.filterBy, filterName);
    const filterToAplly = `//span[contains(@class, 'checkbox-container__label-text') and contains(text(), '${filterName}')]`;

    I.waitForVisible(filterToAplly, 20);
    I.click(filterToAplly);
    pmmSettingsPage.customClearField(qanPage.fields.filterBy);
    // Wait For Results count to be changed so we are sure filter was applied.
    for (let i = 0; i < 5; i++) {
      I.wait(1);
      const newResultsCount = this.getCountOfItems();

      if (newResultsCount !== oldResultsCount) {
        return;
      }
    }
  },

  applyFilterInSection(section, filter) {
    const filterLocator = `//span[contains(text(), '${section}')]/parent::p/following-sibling::div//span[contains(@class, 'checkbox-container__label-text') and contains(text(), '${filter}')]`;

    I.waitForVisible(filterLocator, 20);
    I.click(filterLocator);
  },

  checkDisabledFilter(section, filter) {
    const filterLocator = `//span[contains(text(), '${section}')]/parent::p/following-sibling::div//input[contains(@name, '${filter}') and @disabled]`;

    I.waitForVisible(filterLocator, 20);
  },

  async getPercentage(filterType, filter) {
    return await I.grabTextFrom(
      `//span[contains(text(), '${filterType}')]/../../descendant::span[contains(text(), '${filter}')]/../../following-sibling::span/span`,
    );
  },

  verifyChangedCount(countBefore, countAfter) {
    assert.notEqual(countAfter, countBefore, 'Data should be changed');
  },

  async verifyFiltersSection(filterSection, expectedCount) {
    const seeFiltersFor = `//span[contains(text(), '${filterSection}')]/parent::p/following-sibling::div/span/label[contains(@class, 'checkbox-container checkbox-container--main')]`;

    I.fillField(qanPage.fields.filterBy, filterSection);
    I.waitForVisible(`//span[contains(text(), '${filterSection}')]`, 30);
    const countOfFiltersInSection = await I.grabNumberOfVisibleElements(seeFiltersFor);

    assert.equal(countOfFiltersInSection, expectedCount, `There should be '${expectedCount}' visible links`);
  },

  async getCountOfFilters(filterSection) {
    const showAllLink = `//span[contains(text(), '${filterSection}')]/following-sibling::span[contains(text(), 'Show all')]`;
    const showAllCount = await I.grabTextFrom(showAllLink);
    const count = showAllCount.slice(10, 12);

    return count;
  },

  applyShowAllLink(filterSection) {
    const showAllLink = `//span[contains(text(), '${filterSection}')]/following-sibling::span[contains(text(), 'Show all')]`;

    I.waitForVisible(showAllLink, 30);
    I.click(showAllLink);
  },

  async applyShowTop5Link(filterSection) {
    const showTop5Link = `//span[contains(text(), '${filterSection}')]/following-sibling::span[contains(text(), 'Show top 5')]`;

    I.waitForVisible(showTop5Link, 30);
    const top5Link = await I.grabTextFrom(showTop5Link);

    assert.equal(top5Link, 'Show top 5', 'Link is not correct');
    I.click(showTop5Link);
  },

  async verifyCountOfFilterLinks(expectedCount, before) {
    const count = await I.grabNumberOfVisibleElements(qanPage.fields.filterCheckboxes);

    if (!before) {
      assert.equal(count, expectedCount);
    }

    if (before) {
      assert.notEqual(count, expectedCount);
    }
  },

  verifySelectedCountPerPage(expectedResults) {
    I.waitForElement(qanPage.fields.resultsPerPageValue, 30);
    const selectedResults = `//div[contains(@class, 'ant-select-selection-selected-value') and contains(text(), '${expectedResults}' )]`;

    I.seeElement(selectedResults);
  },

  verifyActiveItem(page) {
    const item = `//li[@class='ant-pagination-item ant-pagination-item-${page} ant-pagination-item-active']`;

    I.waitForElement(item, 30);
  },

  async verifyCount(expectedCount) {
    const count = await I.grabTextFrom(qanPage.fields.countOfItems);

    assert.equal(count.includes(expectedCount), true, 'The count is incorrect!');
  },

  selectPage(page) {
    const item = `//li[@class='ant-pagination-item ant-pagination-item-${page}']`;

    I.click(item);
  },

  async selectPagination(option) {
    I.click(qanPage.fields.resultPerPageCombobox);
    const optionToSelect = `//li[contains(@class, 'ant-select-dropdown-menu-item') and contains(text(), '${option}' )]`;

    I.click(optionToSelect);
    // This proces is too fast and can cause false positives.
    I.wait(5);
    // Wait For Number of Rows to be changed, we wait for results in rows count change
    for (let i = 0; i < 5; i++) {
      const loadingProcess = await I.grabNumberOfVisibleElements(qanPage.fields.newQANSpinnerLocator);

      if (loadingProcess === 0) {
        return;
      }
    }
  },

  async verifyRowCount(rowCount) {
    const count = await I.grabNumberOfVisibleElements(qanPage.fields.tableRow);

    assert.equal(count, rowCount, 'Row count is incorrect!');
  },

  async verifyPagesAndCount(itemsPerPage) {
    const count = await this.getCountOfItems();
    const lastpage = await this.getPagesCount();
    const result = count / lastpage;

    assert.equal(Math.ceil(result / 25) * 25, itemsPerPage, 'Pages do not match with total count');
  },

  async getPagesCount() {
    const pagesCount = '//ul[@data-qa="qan-pagination"]//li[contains(@class,"ant-pagination-item")][last()]//a';
    const pages = await I.grabTextFrom(pagesCount);

    return pages;
  },

  addSpecificColumn(columnName) {
    const column = `//span[contains(text(), '${columnName}')]`;

    I.waitForVisible(column, 30);
    I.click(column);
  },

  verifyAddedColumn(columnName) {
    const columnHeader = qanPage.getColumn(columnName);

    I.waitForVisible(columnHeader, 30);
    I.seeElement(columnHeader);
  },

  async verifyAvqQueryCount() {
    const [qpsvalue] = (await I.grabTextFrom(qanPage.fields.qps)).split(' ');
    const queryCountDetail = await I.grabTextFrom(qanPage.fields.queryCountDetail);

    // We divide by 300 because we are using last 5 mins filter.
    const result = (parseFloat(queryCountDetail) / 300).toFixed(2);

    if (result < 0.01) {
      assert.equal('<0.01', qpsvalue, 'Query Per Second doesnt match the expected value');
    } else {
      assert.equal(result, qpsvalue, 'Query Per Second doesnt match the expected value');
    }
  },

  async verifyAvgQueryTime() {
    assert.equal(
      await I.grabTextFrom(qanPage.fields.overviewRowQueryCount),
      await I.grabTextFrom(qanPage.fields.qps),
      'Query Count value in Overview and Detail should match',
    );
    assert.equal(
      await I.grabTextFrom(qanPage.fields.overviewRowQueryTime),
      await I.grabTextFrom(qanPage.fields.queryTimeDetail),
      'Query Time value in Overview and Detail should match',
    );
    // eslint-disable-next-line prefer-const
    let [perQueryStats, perQueryUnit] = (await I.grabTextFrom(qanPage.fields.queryTimeDetail)).split(' ');

    if (perQueryUnit === 'ms') {
      perQueryStats /= 1000;
    }

    if (perQueryUnit === 'µs') {
      perQueryStats /= 1000000;
    }

    const queryCountDetail = await I.grabTextFrom(qanPage.fields.queryCountDetail);
    const [load] = (await I.grabTextFrom(qanPage.fields.load)).split(' ');
    const result = ((parseFloat(queryCountDetail) * parseFloat(perQueryStats)) / 300).toFixed(2);

    if (result < 0.01) {
      assert.equal('<0.01', load, 'Load should be same!');
    } else {
      assert.equal(result, load, 'Load should be same!');
    }
  },

  sortMetric(metricName) {
    const sortLocator = `//span[contains(text(),'${metricName}')]/ancestor::div[@role="columnheader"]//div//span[@title='Toggle SortBy']`;

    I.waitForVisible(sortLocator, 30);
    I.click(sortLocator);
    I.waitForVisible(sortLocator, 30);
  },

  async verifyMetricsSorted(metricName, metricColumnOrder, sortOrder = 'down') {
    const resultRowCounts = await I.grabNumberOfVisibleElements(qanPage.fields.tableRow);

    for (let i = 2; i < resultRowCounts; i++) {
      let [metricValue] = this.metricValueLocatorOverviewTable(metricColumnOrder, i);
      let [metricValueSecond] = this.metricValueLocatorOverviewTable(metricColumnOrder, i + 1);

      if (metricValue.indexOf('<') > -1) {
        [, metricValue] = metricValue.split('<');
      }

      if (metricValueSecond.indexOf('<') > -1) {
        [, metricValueSecond] = metricValueSecond.split('<');
      }

      if (sortOrder === 'down') {
        assert.equal(
          metricValue >= metricValueSecond,
          true,
          `Descending Sort of ${metricName} is Wrong Please check`,
        );
      } else {
        assert.equal(
          metricValue <= metricValueSecond,
          true,
          `Ascending Sort of ${metricName} is Wrong Please check`,
        );
      }
    }
  },

  async verifyCountTooltip(value) {
    // need to filter out value for per query
    const [, , , tooltip] = (await I.grabTextFrom(qanPage.fields.overviewRowQueryCountTooltipText)).split(
      ' ',
    );

    assert.equal(tooltip, value, 'The tooltip has wrong value');
  },

  async verifyTimeTooltip(value) {
    I.moveCursorTo(qanPage.fields.overviewRowQueryTime);
    const tooltip = await I.grabTextFrom(qanPage.fields.overviewRowQueryTimeTooltipText);

    assert.equal(tooltip, value, 'The tooltip has wrong value');
  },

  async verifySelectedPageIs(pageNumber) {
    I.seeElement(`.ant-pagination-item-active[title="${pageNumber}"]`);
  },

  async verifyRowIsSelected(rowNumber) {
    const rowSelector = qanPage.overviewRowLocator(rowNumber);

    I.seeCssPropertiesOnElements(`${rowSelector}.selected-overview-row`, {
      'background-color': 'rgb(35, 70, 130)',
    });
  },

  async getCountOfItems() {
    I.waitForInvisible(qanPage.elements.spinner, 30);
    const resultsCount = (await I.grabTextFrom(qanPage.fields.countOfItems)).split(' ');

    return resultsCount[2];
  },
};
