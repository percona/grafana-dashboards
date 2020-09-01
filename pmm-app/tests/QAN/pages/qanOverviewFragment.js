const assert = require('assert');

const { I, qanActions } = inject();

module.exports = {
  root: '.query-analytics-data',
  fields: {
  },
  buttons: {
  },
  elements: {
    groupBy: '$group-by',
    latencyChart: '.latency-chart-container',
    metricTooltip: '.ant-tooltip-content',
    spinner: '$table-loading'
  },

  getRowLocator: rowNumber => `div.tr-${rowNumber}`,

  getCellValueLocator: (rowNumber, columnNumber) => `div.tr-${rowNumber} > div:nth-child(${columnNumber + 2})`,

  getMetricSortingLocator: columnNumber => `(//a[@data-qa='sort-by-control'])[${columnNumber}]`,

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
      I.waitForVisible(`${sortingBlockSelector}/span`, 30);
      I.seeAttributesOnElements(`${sortingBlockSelector}/span`, {class: `sort-by `});
      return
    }

    I.waitForVisible(`${sortingBlockSelector}/span`, 30);
    I.seeAttributesOnElements(`${sortingBlockSelector}/span`, {class: `sort-by ${sortDirection}`});
  },

  changeGroupBy(groupBy = 'Client Host') {
    const locator = `//ul/li[@label='${groupBy}']`;

    I.waitForElement(this.elements.groupBy, 30);
    I.click(this.elements.groupBy);
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
    qanActions.waitForNewQANPageLoaded();
  },
};
