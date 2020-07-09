const { I, pmmSettingsPage } = inject();
const moment = require('moment');
const assert = require('assert');
module.exports = {
  url: 'graph/d/pmm-qan/pmm-query-analytics?from=now-5m&to=now',
  filterGroups: [
    'Environment',
    'Cluster',
    'Replication Set',
    'Database',
    'Node Name',
    'Service Name',
    'User Name',
    'Node Type',
    'Service Type',
  ],
  tableHeader: ['Query', 'Load', 'Query Count', 'Query Time'],
  tabs: {
    tablesTab: ["//div[@class='card-body']//pre", "//button[@id='copyQueryExample']"],
    explainTab: ["//div[@id='classicPanel']//span"],
  },
  serverList: ['PMM Server PostgreSQL', 'PGSQL_', 'PXC_NODE', 'mysql'],
  fields: {
    table: '//table//tr[2]',
    detailsTable: '//app-details-table//app-details-row[1]',
    filter: "//app-qan-filter//div[@class='ps-content']",
    filterCheckboxSelector: '.overview-filters input[type="checkbox"]',
    search: '//app-qan-search//input',
    pagination: "//ul[@role='navigation']",
    nextPageNavigation: "//ul[@role='navigation']//li[last()]",
    previousPageNavigation: "//ul[@role='navigation']//li[1]",
    pmmImage: '//footer/img',
    pmmVersion: '//footer/small',
    paginationArrow: "(//ul[@class='ngx-pagination']/li)[last()]",
    addColumn: "//button[@class='add-column-btn']",
    total: "//span[contains(text(), 'TOTAL')]",
    columns: '//tbody//app-qan-table-header-cell',
    fifty: "//div[@id='ad0800a556c8']/span",
    hundred: "//div[@id='a305c6a9fc9e']",
    iframe: "//div[@class='panel-content']//iframe",
    filterSelection: "(//div[@class='chips']//button)",
    resultsPerPageDropDown: "//div[@class='results-per-page']/ng-select",
    tablesTabInDetails: "//a[@id='tables']",
    explainTabInDetails: "//a[@id='explain']",
    classicSectionContents: "//div[@id='classicPanel']//span",
    tablesTabContents: "//div[@class='card-body']//pre",
    copyQueryButton: "//button[@id='copyQueryExample']",
    spinnerLocator: "//i[@data-qa='loading-spinner']",
    newQANPanelContent: '.panel-content',
    resetAll: '//button[@data-qa="qan-filters-reset-all"]',
    disabledResetAll: '//button[@data-qa="qan-filters-reset-all" and @disabled ]',
    newQANSpinnerLocator: "//i[@data-qa='loading-spinner']",
    showSelected: "//button[@data-qa='qan-filters-show-selected']",
    countOfItems: "//span[@data-qa='qan-total-items']",
    filterBy: "//input[@data-qa='filters-search-field']",
    filterCheckboxes: '.checkbox-container__checkmark',
    newQANAddColumn: "//span[contains(text(), 'Add column')]",
    newQANMetricDropDown: '.ant-select-dropdown-menu-item',
    groupBySelector: '.group-by-selector',
    addColumnSelector: '.add-columns-selector',
    manageColumnsSelector: '.manage-columns-selector',
    removeColumnButton: "//div[text()='Remove column']",
    newQANColumnSearchField: "div[style*='display: block;'] input",
    resultsPerPageValue: '.ant-select-selection-selected-value',
    nextPage: '.ant-pagination-next',
    previousPage: '.ant-pagination-prev',
    ellipsisButton: '.ant-pagination-item-ellipsis',
    tableRow: "(//table[@class='ant-table-fixed']//tbody[@class='ant-table-tbody'])[2]//tr",
    resultPerPageCombobox: '.ant-pagination-options',
    addColumnNewQAN: "//span[contains(text(), 'Add column')]",
    noDataIcon: 'div.ant-empty-image',
    querySelector:
      "//div[@class='tr tr-2']//div[@role='cell'][2]//div//div",
    resizer: 'span.Resizer.horizontal',
    queryTime: '//tr[@data-row-key][4]//td[5]//span[1]',
    lockTimeDetail: "//tr[@data-row-key='lock_time']//td[4]//span[1]",
    queryTimeDetail: "//tr[@data-row-key='query_time']//td[4]//span[1]",
    queryCountDetail: "//tr[@data-row-key='num_queries']//td[3]//span[1]",
    qps: "//tr[@data-row-key='num_queries']//td[2]//span[1]",
    load: "//tr[@data-row-key='query_time']//td[2]//div[1]//span[1]",
    avgLoad: "//tr[@data-row-key='lock_time']//td[2]//div[1]//span[1]",
    overviewRowLoad: "//tr[4]//td[3]//span[contains(@class,'summarize')]",
    overviewRowQueryCount: "//tr[4]//td[4]//span[contains(@class,'summarize')]",
    overviewRowQueryCountTooltip: "//tr[4]//td[4]//span[contains(@class, 'ant-tooltip-open')]",
    overviewRowQueryCountTooltipText: "//tr[4]//td[4]//span[contains(@class, 'ant-tooltip-open')]//div//span",
    overviewRowQueryTime: "//tr[4]//td[5]//span[contains(@class,'summarize')]",
    overviewRowQueryTimeTooltip: "//tr[4]//td[5]//span[contains(@class,'ant-tooltip-open')]",
    overviewRowQueryTimeTooltipText: "//tr[4]//td[5]//span[contains(@class,'ant-tooltip-open')]//div//span",
    showSelectedDisabled: '//button[@data-qa="qan-filters-show-selected" and @disabled ]',
    environmentLabel: "//span[contains(text(), 'Environment')]",
    innodbColumn: "//tr[2]//td[6]//span[contains(@class,'summarize')]",
    innodbColumnTooltip:
      "//tr[2]//td[6]//span[contains(@class,'ant-tooltip-open')]//span[contains(@class,'summarize')]",
    loadValue: "//td[3]//span[contains(text(),'<0.01 load')]",
    loadValueTooltip:
      "//td[3]//span[contains(@class,'ant-tooltip-open')]//span[contains(text(),'<0.01 load')]",
  },

  metricValueLocatorOverviewTable(column, row) {
    return `//tr[${row}]//td[${column}]//span[contains(@class,'summarize')]`;
  },

  filterSectionLocator(filterSectionName) {
    return `//span[contains(text(), '${filterSectionName}')]`;
  },
  elements: {
    addColumnFirstElementSelector: 'ul.ant-select-dropdown-menu li:first-child',
    metricTooltip: '.ant-tooltip-content',
    latencyChart: '.latency-chart-container',
    resetAllButton: '#reset-all-filters',
    timeRangePickerButton: '.time-picker-button-select',
    selectedOverviewRow: 'tr.selected-overview-row',
    detailsSection: '#query-analytics-details',
    tableRowSelector: '.ant-table-scroll .ant-table-tbody tr:first-of-type .overview-main-column div',
    qpsTooltipValueSelector: '[data-qa="metrics-list"] [data-qa="qps"] span',
    spinBlur: 'div.ant-spin-blur',
    spinner: 'i.fa-spinner',
  },
  requests: {
    getReportPath: '/v0/qan/GetReport',
    getFiltersPath: '/v0/qan/Filters/Get',
  },
  filterGroupLocator(filterName) {
    return "//div[@class='filter-group__title']//span[contains(text(), '" + filterName + "')]";
  },

  tableHeaderLocator(tableHeader) {
    return (
      "//ng-select//span[contains(@class, 'ng-value-label') and contains(text(), '" + tableHeader + "')]"
    );
  },

  tableHeaderColumnLocator(columnHeader) {
    return `(//span[@class='ant-table-header-column'])//span[contains(text(), '${columnHeader}')]`;
  },

  filterGroupCountSelector(groupName) {
    return (
      "//section[@class='aside__filter-group']//span[contains(text(), '" +
      groupName +
      "')]/../button[contains(text(), 'See all')]"
    );
  },

  waitForFiltersLoad() {
    I.waitForVisible(this.filterGroupLocator(this.filterGroups[8]), 30);
  },

  overviewMetricCellValueLocator(rowNumber, dataColumnNumber) {
    return `.ant-table-tbody tr:nth-child(${rowNumber}) td:nth-child(${dataColumnNumber + 2}) .summarize`;
  },

  overviewMetricSortingLocator(сolumnNumber) {
    return `th.ant-table-column-has-actions:nth-child(${сolumnNumber + 2}) div[title="Sort"]`;
  },

  mainMetricGraphLocator(rowNumber) {
    return `.ant-table-tbody tr:nth-child(${rowNumber}) .d3-bar-chart-container`;
  },

  manageColumnLocator(columnName) {
    return `//span[text()='${columnName}']`;
  },

  checkFilterGroups() {
    this.waitForFiltersLoad();
    for (let i = 0; i < this.filterGroups.length; i++) {
      I.seeElement(this.filterGroupLocator(this.filterGroups[i]));
    }
  },

  getFilterLocator(filterValue) {
    const filterLocator =
      "//section[@class='aside__filter-group']//span[contains(text(), '" +
      filterValue +
      "')]/../span[@class='checkbox-container__checkmark']";
    return filterLocator;
  },

  async expandAllFilter() {
    for (let i = 0; i < 4; i++) {
      // eslint-disable-next-line max-len
      let numOfElementsFilterCount = await I.grabNumberOfVisibleElements(
        this.filterGroupCountSelector(this.filterGroups[i])
      );
      if (numOfElementsFilterCount === 1) {
        // eslint-disable-next-line max-len
        I.click(this.filterGroupCountSelector(this.filterGroups[i]));
        // eslint-disable-next-line max-len
        I.waitForVisible(
          "//section[@class='aside__filter-group']//span[contains(text(), '" +
            this.filterGroups[i] +
            "')]/../button[contains(text(), 'Show top 5')]"
        );
      }
    }
  },

  async _getData(row, column) {
    const percentage = await I.grabTextFrom(
      "//table//tr[@ng-reflect-router-link='details/," +
        (row - 1) +
        "']//app-qan-table-cell[" +
        column +
        ']//div[1]//div[3]'
    );
    const value = await I.grabTextFrom(
      "//table//tr[@ng-reflect-router-link='details/," +
        (row - 1) +
        "']//app-qan-table-cell[" +
        column +
        ']//div[1]//div[2]'
    );

    return { percentage: percentage, val: value };
  },

  async getDetailsData(row) {
    const percentage = await I.grabTextFrom(
        '//app-details-table//app-details-row[' + row + ']//div[3]//span[2]'
    );
    const value = await I.grabTextFrom('//app-details-table//app-details-row[' + row + ']//div[3]//span[1]');
    return {percentage: percentage, val: value};
  },

  overviewRowLocator(rowNumber) {
    return `.table-wrapper .ant-table-content tr[data-row-key="${rowNumber}"]`;
  },

  waitForQANPageLoaded() {
    I.waitForVisible(this.fields.table, 30);
    I.waitForClickable(this.fields.nextPageNavigation, 30);
  },

  async waitForResponsePath(path) {
    await I.waitForResponse(request => {
      const url = require('url');
      const { pathname } = url.parse(request.url(), true);
      return path === pathname;
    }, 60);
  },

  async verifyFiltersSectionIsPresent() {
    I.waitForElement(this.fields.filterCheckboxSelector, 30);
    I.seeElement(this.fields.filterCheckboxSelector);
  },

  async verifyColumnIsNotAvailable(columnName) {
    I.click(this.fields.addColumnSelector);
    I.dontSeeElement(`//ul/li[@label='${columnName}']`);
  },

  async verifySelectedPageIs(pageNumber) {
    I.seeElement(`.ant-pagination-item-active[title="${pageNumber}"]`);
  },

  async verifyMetricsMatch(rowNumber, dataColumnNumber) {
    const cellSelector = this.overviewMetricCellValueLocator(rowNumber, dataColumnNumber);

    this.showTooltip(rowNumber, dataColumnNumber);
    let qpsMetricValue = await I.grabTextFrom(cellSelector);
    let qpsTooltipValue = await I.grabTextFrom(this.qpsTooltipValueSelector);
    assert.equal(qpsMetricValue.replace(/[^0-9.]/g, ''), qpsTooltipValue.replace(/[^0-9.]/g, ''));
  },

  async verifyColumnIsPresent(columnName) {
    const columnSelector = this.manageColumnLocator(columnName);
    I.seeElement(columnSelector);
  },

  async verifyColumnIsNotPresent(columnName) {
    const columnSelector = this.manageColumnLocator(columnName);
    I.dontSeeElement(columnSelector);
  },

  async verifyColumnIsNotRemovable(columnName) {
    this.openMetricsSelect(columnName);
    I.dontSeeElement(this.fields.removeColumnButton, 30);
  },

  async verifyRowIsSelected(rowNumber) {
    const rowSelector = this.overviewRowLocator(rowNumber);
    I.seeCssPropertiesOnElements(`${rowSelector}.selected-overview-row`, {
      'background-color': 'rgb(35, 70, 130)',
    });
  },

  async verifyDetailsSectionDataExists(tabElements) {
    this.waitForTabContentsLoaded(tabElements);
    const detailsText = await I.grabTextFrom(tabElements[0]);
    assert.equal(detailsText.length > 0, true, 'Empty Section in Details');
  },

  changeGroupBy(groupBy = 'Client Host') {
    I.waitForElement(this.fields.groupBySelector, 30);
    I.forceClick(this.fields.groupBySelector);
    I.click(`//ul/li[@label='${groupBy}']`);
  },

  verifyGroupByIs(groupBy) {
    I.waitForElement(`[data-qa="group-by"] [title="${groupBy}"]`, 30);
    I.seeElement(`[data-qa="group-by"] [title="${groupBy}"]`);
  },

  changeSorting(columnNumber, sortDirection = 'down') {
    const sortingBlockSelector = this.overviewMetricSortingLocator(columnNumber);
    I.waitForElement(sortingBlockSelector, 30);
    I.scrollTo(sortingBlockSelector);
    I.forceClick(sortingBlockSelector);
    if (sortDirection === 'up') {
      I.wait(5);
      I.forceClick(sortingBlockSelector);
    }
    I.wait(5);
  },

  verifySortingIs(columnNumber, sortDirection) {
    const sortingBlockSelector = this.overviewMetricSortingLocator(columnNumber);
    switch (sortDirection) {
      case 'up':
        I.seeElement(`${sortingBlockSelector} i[aria-label="icon: caret-up"].on`);
        break;
      case 'down':
        I.seeElement(`${sortingBlockSelector} i[aria-label="icon: caret-down"].on`);
        break;
      case '':
        I.dontSeeElement(`${sortingBlockSelector} i[aria-label="icon: caret-up"].on`);
        I.dontSeeElement(`${sortingBlockSelector} i[aria-label="icon: caret-down"].on`);
        break;
    }
  },

  addColumn(columnName) {
    I.waitForElement(this.fields.addColumnSelector, 30);
    I.click(this.fields.addColumnSelector);
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
    I.waitForElement(this.fields.removeColumnButton, 30);
    I.click(this.fields.removeColumnButton);
    this.waitForNewQANPageLoaded();
  },

  async searchFilters(searchString) {
    I.waitForElement(`//input[@placeholder='Filters search...']`, 30);
    I.fillField(`//input[@placeholder='Filters search...']`, searchString);
  },

  async checkFiltersMatchSearch(searchString) {
    const remainingFilters = await I.grabTextFrom('.checkbox-container__label-text');
    assert.equal(
      detailsQueryTimeData.percentage.indexOf(queryTimeData.percentage) > -1,
      true,
      "Details Query Time Percentage Doesn't Match expected " +
        detailsQueryTimeData.percentage +
        ' to contain ' +
        queryTimeData.percentage
    );
  },

  async searchMetrics(searchString) {
    I.waitForElement('.ant-select-open', 30);
    I.fillField('.ant-select-open input', searchString);
  },

  async checkMetricsListMatchesSearch(searchString) {
    const remainingMetrics = await I.grabTextFrom('.ant-select-dropdown-menu-item');
    assert.equal(
      detailsQueryTimeData.val.indexOf(queryTimeData.val) > -1,
      true,
      "Details Query Time value Doesn't Match expected " +
        detailsQueryTimeData.val +
        ' to contain ' +
        queryTimeData.val
    );
  },

  openMetricsSelect(columnName) {
    const columnSelector = this.manageColumnLocator(columnName);
    I.waitForElement(columnSelector, 30);
    I.click(columnSelector);
  },

  async getSelectedFilters() {
    const selectedFilters = `//div[@class='overview-filters']//input[@type='checkbox'][@value='']/following-sibling::span`;
    I.waitForElement(`//div[@class='overview-filters']//input[@type='checkbox']`, 30);
    const remainingFilters = await I.grabTextFrom(selectedFilters);
    console.log(remainingFilters);
  },

  async getMainMetricGraphValue(graphSelector, xInPercent) {
    const axisSelector = `${graphSelector} .axis`;
    I.waitForElement(axisSelector, 30);
    I.scrollTo(axisSelector, xInPercent, 0);
    I.moveCursorTo(axisSelector, xInPercent, 0);
    const tooltipStringValue = await I.grabAttributeFrom(graphSelector, 'data-tip');
    return tooltipStringValue.substr(-19, 19);
  },

  async verifyChronologicalOrderDateTime(dateTimeBefore, dateTimeAfter) {
    const timestampBefore = await this.getTimestamp(dateTimeBefore);
    const timestampAfter = await this.getTimestamp(dateTimeAfter);
    assert.equal(timestampAfter > timestampBefore, true);
  },

  async getTimestamp(dateTime) {
    return moment(dateTime).format('x');
  },

  resetAllFilters() {
    I.waitForElement(this.elements.resetAllButton, 30);
    I.click(this.elements.resetAllButton);
  },

  selectFilter(filterCheckboxSelector) {
    I.waitForElement(filterCheckboxSelector, 30);
    I.checkOption(filterCheckboxSelector);
    this.waitForResponsePath(this.requests.getFiltersPath);
  },

  selectRow(rowNumber) {
    const rowSelector = this.overviewRowLocator(rowNumber);
    I.waitForElement(rowSelector, 60);
    I.forceClick(rowSelector);
    this.waitForNewQANPageLoaded();
  },

  paginationGoNext() {
    I.waitForElement(`//li[@title='Next Page']`, 30);
    I.click(`//li[@title='Next Page']`);
  },

  paginationGoPrevious() {
    I.waitForElement(`//li[@title='Previous Page']`, 30);
    I.click(`//li[@title='Previous Page']`);
  },
  selectTableRow(rowNumber) {
    const rowSelector = `//tr[@data-row-key='${rowNumber}']`;
    I.waitForElement(rowSelector, 30);
    I.click(rowSelector);
  },

  paginationGoTo(pageNumber) {
    const pageSelector = `.ant-pagination-item[title = '${pageNumber}']`;
    I.waitForElement(pageSelector, 30);
    I.click(pageSelector);
  },

  showTooltip(rowNumber, dataColumnNumber) {
    const tooltipSelector = this.overviewMetricCellValueLocator(rowNumber, dataColumnNumber);
    I.waitForElement(tooltipSelector, 30);
    I.scrollTo(tooltipSelector);
    I.moveCursorTo(tooltipSelector);
    I.waitForElement(this.elements.metricTooltip, 5);
    I.seeElement(this.elements.metricTooltip);
  },

  selectDetailsTab(tabName) {
    const tabSelector = `//div[@role='tab']/span[text()='${tabName}']`;
    I.waitForElement(tabSelector, 30);
    I.click(tabSelector);
  },

  waitForNewQANPageLoaded() {
    I.waitForElement(this.fields.newQANPanelContent, 30);
    I.waitForElement(this.fields.querySelector, 30);
  },

  applyFilterNewQAN(filterName) {
    const oldResultsCount = this.getCountOfItems();
    I.fillField(this.fields.filterBy, filterName);
    const filterToAplly = `//span[contains(@class, 'checkbox-container__label-text') and contains(text(), '${filterName}')]`;
    I.waitForVisible(filterToAplly, 20);
    I.click(filterToAplly);
    pmmSettingsPage.customClearField(this.fields.filterBy);
    //Wait For Results count to be changed so we are sure filter was applied.
    for (let i = 0; i < 5; i++) {
      I.wait(1);
      let newResultsCount = this.getCountOfItems();
      if (newResultsCount != oldResultsCount) {
        return;
      }
    }
  },

  async getCountOfItems() {
    const resultsCount = (await I.grabTextFrom(this.fields.countOfItems)).split(' ');

    return resultsCount[2];
  },

  verifyChangedCount(countBefore, countAfter) {
    assert.notEqual(countAfter, countBefore, 'Data should be changed');
  },

  async verifyFiltersSection(filterSection, expectedCount) {
    const seeFiltersFor = `//span[contains(text(), '${filterSection}')]/parent::p/following-sibling::div/span/label[contains(@class, 'checkbox-container checkbox-container--main')]`;
    I.fillField(this.fields.filterBy, filterSection);
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
    const count = await I.grabNumberOfVisibleElements(this.fields.filterCheckboxes);
    if (!before) {
      assert.equal(count, expectedCount);
    }
    if (before) {
      assert.notEqual(count, expectedCount);
    }
  },

  verifySelectedCountPerPage(expectedResults) {
    I.waitForElement(this.fields.resultsPerPageValue, 30);
    const selectedResults = `//div[contains(@class, 'ant-select-selection-selected-value') and contains(text(), '${expectedResults}' )]`;
    I.seeElement(selectedResults);
  },

  verifyActiveItem(page) {
    const item = `//li[@class='ant-pagination-item ant-pagination-item-${page} ant-pagination-item-active']`;
    I.waitForElement(item, 30);
  },

  async verifyCount(expectedCount) {
    const count = await I.grabTextFrom(this.fields.countOfItems);
    assert.equal(count.includes(expectedCount), true, 'The count is incorrect!');
  },

  selectPage(page) {
    const item = `//li[@class='ant-pagination-item ant-pagination-item-${page}']`;
    I.click(item);
  },

  async selectPagination(option) {
    I.click(this.fields.resultPerPageCombobox);
    const optionToSelect = `//li[contains(@class, 'ant-select-dropdown-menu-item') and contains(text(), '${option}' )]`;
    I.click(optionToSelect);
    //This proces is too fast and can cause false positives.
    I.wait(5);
    //Wait For Number of Rows to be changed, we wait for results in rows count change
    for (let i = 0; i < 5; i++) {
      let loadingProcess = await I.grabNumberOfVisibleElements(this.fields.newQANSpinnerLocator);
      if (loadingProcess == 0) {
        return;
      }
    }
  },

  async verifyRowCount(rowCount) {
    const count = await I.grabNumberOfVisibleElements(this.fields.tableRow);
    assert.equal(count, rowCount, 'Row count is incorrect!');
  },

  async verifyPagesAndCount(itemsPerPage) {
    const count = await this.getCountOfItems();
    const lastpage = await this.getPagesCount();
    const result = count / lastpage;
    assert.equal(Math.ceil(result / 10) * 10, itemsPerPage, 'Pages do not match with total count');
  },

  async getPagesCount() {
    const pagesCount =
      "//ul[@data-qa='qan-pagination']//li[contains(@class,'ant-pagination-item')][last()]//a";
    const pages = await I.grabTextFrom(pagesCount);
    return pages;
  },

  addSpecificColumn(columnName) {
    const column = `//li[contains(text(), '${columnName}')]`;
    I.waitForVisible(column, 30);
    I.click(column);
  },

  verifyAddedColumn(columnName) {
    const columnHeader = this.getColumn(columnName);
    I.waitForVisible(columnHeader, 30);
    I.seeElement(columnHeader);
  },

  getColumn(column) {
    return `//span[contains(text(), '${column}')]`;
  },

  getRow(row) {
    return `//td[@class='ant-table-row-cell-break-word']//div[contains(text(), '${row}')]`;
  },

  async verifyAvqQueryCount() {
    const [qpsvalue] = (await I.grabTextFrom(this.fields.qps)).split(' ');
    const queryCountDetail = await I.grabTextFrom(this.fields.queryCountDetail);

    //We divide by 300 because we are using last 5 mins filter.
    const result = (parseFloat(queryCountDetail) / 300).toFixed(2);
    if (result < 0.01) {
      assert.equal('<0.01', qpsvalue, 'Query Per Second doesnt match the expected value');
    } else {
      assert.equal(result, qpsvalue, 'Query Per Second doesnt match the expected value');
    }
  },

  async verifyAvgQueryTime() {
    // eslint-disable-next-line max-len
    assert.equal(
      await I.grabTextFrom(this.fields.overviewRowQueryCount),
      await I.grabTextFrom(this.fields.qps),
      'Query Count value in Overview and Detail should match'
    );
    // eslint-disable-next-line max-len
    assert.equal(
      await I.grabTextFrom(this.fields.overviewRowQueryTime),
      await I.grabTextFrom(this.fields.queryTimeDetail),
      'Query Time value in Overview and Detail should match'
    );
    let [perQueryStats, perQueryUnit] = (await I.grabTextFrom(this.fields.queryTimeDetail)).split(' ');
    if (perQueryUnit == 'ms') {
      perQueryStats = perQueryStats / 1000;
    }
    if (perQueryUnit == 'µs') {
      perQueryStats = perQueryStats / 1000000;
    }
    const queryCountDetail = await I.grabTextFrom(this.fields.queryCountDetail);
    const [load] = (await I.grabTextFrom(this.fields.load)).split(' ');
    const result = ((parseFloat(queryCountDetail) * parseFloat(perQueryStats)) / 300).toFixed(2);
    if (result < 0.01) {
      assert.equal('<0.01', load, 'Load should be same!');
    } else {
      assert.equal(result, load, 'Load should be same!');
    }
  },

  sortMetric(metricName, sortOrder) {
    const sortLocator = `//th//span[contains(text(),'${metricName}')]/ancestor::span//div[@title='Sort']`;
    I.waitForVisible(sortLocator, 30);
    I.click(sortLocator);
    const sortIcon = `//div[@title='Sort']//i[@aria-label='icon: caret-${sortOrder}' and contains(@class, 'ant-table-column-sorter-${sortOrder} on')]`;
    I.waitForVisible(sortIcon, 30);
  },

  async verifyMetricsSorted(metricName, metricColumnOrder, sortOrder = 'down') {
    const resultRowCounts = await I.grabNumberOfVisibleElements(this.fields.tableRow);

    for (i = 2; i < resultRowCounts; i++) {
      let [metricValue] = this.metricValueLocatorOverviewTable(metricColumnOrder, i);
      let [metricValueSecond] = this.metricValueLocatorOverviewTable(metricColumnOrder, i + 1);
      if (metricValue.indexOf('<') > -1) {
        [, metricValue] = metricValue.split('<');
      }
      if (metricValueSecond.indexOf('<') > -1) {
        [, metricValueSecond] = metricValueSecond.split('<');
      }
      // eslint-disable-next-line max-len
      if (sortOrder === 'down') {
        assert.equal(
          metricValue >= metricValueSecond,
          true,
          `Descending Sort of ${metricName} is Wrong Please check`
        );
      } else {
        assert.equal(
          metricValue <= metricValueSecond,
          true,
          `Ascending Sort of ${metricName} is Wrong Please check`
        );
      }
    }
  },

  async verifyCountTooltip(value) {
    const tooltip = await I.grabTextFrom(this.fields.overviewRowQueryCountTooltipText);
    assert.equal(tooltip[0], value, 'The tooltip has wrong value');
  },

  async verifyTimeTooltip(value) {
    const tooltip = await I.grabTextFrom(this.fields.overviewRowQueryTimeTooltipText);
    assert.equal(tooltip[0], value, 'The tooltip has wrong value');
  },
};
