const assert = require('assert');

const { I, qanFilters } = inject();

module.exports = {
  root: '.query-analytics-data',
  fields: {
    columnSearchField: 'input.ant-select-search__field',
    searchBy: '//input[contains(@name, "search")]',
  },
  buttons: {
    addColumn: '//span[contains(text(), "Add column")]',
  },
  elements: {
    countOfItems: '$qan-total-items',
    groupBy: '$group-by',
    latencyChart: '.latency-chart-container',
    metricTooltip: '.ant-tooltip-content',
    newMetricDropdown: '.add-columns-selector-dropdown',
    noDataIcon: 'div.ant-empty-image',
    querySelector: 'div.tr-1',
    spinner: '$table-loading',
    tableRow: 'div.tr',
    tooltip: '.overview-column-tooltip',
    tooltipQPSValue: '$qps',
  },

  getRowLocator: (rowNumber) => `div.tr-${rowNumber}`,

  getColumnLocator: (columnName) => `//span[contains(text(), '${columnName}')]`,

  getMetricLocatorInDropdown: (name) => `//li[@label='${name}']`,

  getCellValueLocator: (rowNumber, columnNumber) => `div.tr-${rowNumber} > div:nth-child(${columnNumber + 2}) span > div > span`,

  getMetricSortingLocator: (columnNumber) => `(//a[@data-qa='sort-by-control'])[${columnNumber}]`,

  getGroupByOptionLocator: (option) => `//ul/li[@label='${option}']`,

  waitForOverviewLoaded() {
    I.waitForVisible(this.root, 60);
    I.waitForVisible(this.elements.querySelector, 60);
  },

  // Wait For Results count to be changed
  async waitForNewItemsCount(originalCount) {
    for (let i = 0; i < 5; i++) {
      I.wait(1);
      const count = this.getCountOfItems();

      if (count !== originalCount) {
        return count;
      }
    }

    return false;
  },

  async getCountOfItems() {
    I.waitForVisible(this.elements.querySelector, 30);
    const resultsCount = (await I.grabTextFrom(this.elements.countOfItems)).split(' ');

    return resultsCount[2];
  },

  changeMetric(columnName, metricName) {
    const newMetric = this.getColumnLocator(metricName);
    const metricInDropdown = this.getMetricLocatorInDropdown(metricName);
    const oldMetric = this.getColumnLocator(columnName);

    I.waitForElement(oldMetric, 30);
    I.waitForVisible(qanFilters.elements.filterName, 30);

    // Hardcoded wait because of random failings
    I.wait(3);
    I.click(oldMetric);
    I.waitForElement(this.fields.columnSearchField, 10);
    I.fillField(this.fields.columnSearchField, metricName);
    I.click(metricInDropdown);
    I.waitForElement(newMetric, 30);
    I.seeElement(newMetric);
    I.dontSeeElement(oldMetric);
  },

  addSpecificColumn(columnName) {
    const column = `//span[contains(text(), '${columnName}')]`;

    I.waitForVisible(column, 30);
    I.click(column);
  },

  showTooltip(rowNumber, dataColumnNumber) {
    const tooltipSelector = this.getCellValueLocator(rowNumber, dataColumnNumber);

    I.waitForElement(tooltipSelector, 30);
    I.scrollTo(tooltipSelector);
    I.moveCursorTo(tooltipSelector);
    I.waitForElement(this.elements.metricTooltip, 30);
  },

  changeSorting(columnNumber) {
    const sortingBlockSelector = this.getMetricSortingLocator(columnNumber);

    I.waitForElement(sortingBlockSelector, 30);
    I.click(sortingBlockSelector);
  },

  verifySorting(columnNumber, sortDirection) {
    const sortingBlockSelector = this.getMetricSortingLocator(columnNumber);

    if (!sortDirection) {
      I.waitForElement(`${sortingBlockSelector}/span`, 30);
      I.seeAttributesOnElements(`${sortingBlockSelector}/span`, { class: 'sort-by ' });

      return;
    }

    I.waitForElement(`${sortingBlockSelector}/span`, 30);
    I.seeAttributesOnElements(`${sortingBlockSelector}/span`, { class: `sort-by ${sortDirection}` });
  },

  async verifyMetricsSorted(metricName, columnNumber, sortOrder = 'down') {
    const rows = await I.grabNumberOfVisibleElements(this.elements.tableRow);

    for (let i = 1; i < rows; i++) {
      let [metricValue] = this.getCellValueLocator(columnNumber, i);
      let [nextMetricValue] = this.getCellValueLocator(columnNumber, i + 1);

      if (metricValue.indexOf('<') > -1) {
        [, metricValue] = metricValue.split('<');
      }

      if (nextMetricValue.indexOf('<') > -1) {
        [, nextMetricValue] = nextMetricValue.split('<');
      }

      if (sortOrder === 'down') {
        assert.ok(metricValue >= nextMetricValue, `Ascending Sort of ${metricName} is wrong`);
      } else {
        assert.ok(metricValue <= nextMetricValue, `Descending Sort of ${metricName} is wrong`);
      }
    }
  },

  async changeGroupBy(groupBy = 'Client Host') {
    const locator = this.getGroupByOptionLocator(groupBy);

    I.waitForElement(this.elements.groupBy, 30);
    I.click(this.elements.groupBy);
    // For some reason dropdown is not opened sometimes
    I.wait(1);
    const dropdownOpened = await I.grabNumberOfVisibleElements(locator);

    if (!dropdownOpened) I.click(this.elements.groupBy);

    I.waitForVisible(locator, 30);
    I.click(locator);
  },

  verifyGroupByIs(groupBy) {
    I.waitForText(groupBy, 30, this.elements.groupBy);
    I.seeElement(locate(this.elements.groupBy).find(`div[title="${groupBy}"]`));
  },

  selectRow(rowNumber) {
    const rowSelector = this.getRowLocator(rowNumber);

    I.waitForElement(rowSelector, 60);
    I.forceClick(rowSelector);
    this.waitForOverviewLoaded();
  },

  async verifyRowCount(rowCount) {
    I.waitForVisible(this.elements.querySelector, 30);
    const count = await I.grabNumberOfVisibleElements(this.elements.tableRow);

    assert.ok(count === rowCount, `Row count should be ${rowCount} instead of ${count}`);
  },

  async verifyTooltipValue(value) {
    I.waitForText(value, 5, this.elements.tooltipQPSValue);
    const tooltip = await I.grabTextFrom(this.elements.tooltipQPSValue);

    assert.ok(tooltip.includes(value), `The tooltip value is ${tooltip} while expected value was ${value}`);
  },
};
