const I = actor();
const assert = require('assert');
module.exports = {
  url: 'graph/d/pmm-qan/pmm-query-analytics',
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
  urlParts: {
    queryCountWithoutErrors: 'num_queries_with_errors',
    lockTime: 'lock_time',
    pmmManaged: 'var-database=local',
  },
  serverList: ['PMM Server PostgreSQL', 'PGSQL_', 'PXC_NODE', 'mysql'],
  fields: {
    table: '//table/tr[2]',
    detailsTable: '//app-details-table//app-details-row[1]',
    filter: "//app-qan-filter//div[@class='ps-content']",
    search: '//app-qan-search//input',
    pagination: "//ul[@role='navigation']",
    nextPageNavigation: "//ul[@role='navigation']//li[last()]",
    previousPageNavigation: "//ul[@role='navigation']//li[1]",
    pmmImage: '//footer/img',
    pmmVersion: '//footer/small',
    paginationArrow: "(//ul[@class='ngx-pagination']/li)[last()]",
    addColumn: "//button[@class='add-column-btn']",
    qanMainMetric: "//div[@class='ng-value-container'][div//span[text() = '",
    searchForColumn: "//input[@placeholder='Type to search']",
    searchResult: "//span[@class='pmm-select__option' and text()='",
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
    spinnerLocator: "//i[@class='fa fa-spinner fa-spin spinner']",
    newQANPanelContent: '.panel-content',
    countOfItems: "//div[@id='query-analytics-data']/div/div[2]/div/div[1]/div/div[2]/div/span",
    resetAll: 'button#reset-all-filters',
    newQANSpinnerLocator: "//i[@class='fa fa-spinner fa-spin spinner ant-spin-dot']",
    showSelected: "//div[@id='query-analytics-filters']/div/div/form/div/div[1]/button[1]",
    filterBy: "//input[@class='ant-input']",
    filterCheckboxes: '.checkbox-container__checkmark',
    newQANAddColumn: "//span[contains(text(), 'Add column')]",
    newQANMetricDropDown: '.ant-select-dropdown-menu-item',
    newQANColumnSearchField: "div[style*='display: block;'] input",
    resultsPerPageValue: '.ant-select-selection-selected-value',
    nextPage: '.ant-pagination-next',
    previousPage: '.ant-pagination-prev',
    ellipsisButton: '.ant-pagination-item-ellipsis',
    tableRow: 'td.ant-table-row-cell-break-word',
    resultPerPageCombobox: '.ant-pagination-options',
    addColumnNewQAN: '.add-columns',
    noDataIcon: 'div.ant-empty-image',
    querySelector: '//tr[@data-row-key][4]//td[2]//div',
    resizer: 'span.Resizer.horizontal',
    queryTime: '//tr[@data-row-key][4]//td[5]',
    lockTimeDetail: "//tr[@data-row-key='lock_time']//td[4]",
    queryTimeDetail: "//tr[@data-row-key='query_time']//td[4]",
    queryCountDetail: "//tr[@data-row-key='num_queries']//td[4]",
    load: "//tr[@data-row-key='query_time']//td[2]//div[1]//span[1]",
    avgLoad: "//tr[@data-row-key='lock_time']//td[2]//div[1]//span[1]",
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

  checkPagination() {
    I.waitForElement(this.fields.nextPageNavigation, 30);
    I.click(this.fields.nextPageNavigation);
    this.waitForQANPageLoaded();
    I.waitForVisible(this.fields.nextPageNavigation, 30);
    this._selectDetails(2);
    I.seeElement(this.fields.nextPageNavigation);
    I.click(this.fields.previousPageNavigation);
    I.waitForVisible(this.fields.previousPageNavigation, 30);
  },

  checkServerList() {
    I.click('//table//tr//th[2]//ng-select/div');
    I.waitForElement("//table//tr//th[2]//ng-dropdown-panel//div//span[contains(text(), 'Server')]");
    I.click("//table//tr//th[2]//ng-dropdown-panel//div//span[contains(text(), 'Server')]");
    I.wait(5);
    for (let i = 0; i < this.serverList.length; i++) {
      I.seeElement("//table/tr/td[2]//span[contains(text(), '" + this.serverList[i] + "')]");
    }
  },

  checkTableHeaders() {
    for (let i = 0; i < this.tableHeader.length; i++) {
      I.seeElement(this.tableHeaderLocator(this.tableHeader[i]));
    }
  },

  async checkSparkLines() {
    I.seeNumberOfVisibleElements('//table//tr//app-qan-table-cell[1]//div[1]//div[1]', 11);
    // await I.screenshotElement("(//table//tr//app-qan-table-cell[1]//div[1]//div[1])[1]", "sparkline_qan");
    // I.seeVisualDiff("sparkline_qan.png", {tolerance: 50, prepareBaseImage: true});
    // for (let i = 0; i < 11; i++) {
    //     await I.screenshotElement("(//table//tr//app-qan-table-cell[1]//div[1]//div[1])[" + (i+1) +"]", "sparkline_qan");
    //     I.seeVisualDiff("sparkline_qan.png", {tolerance: 50, prepareBaseImage: false});
    // }
  },

  waitForFiltersLoad() {
    I.waitForVisible(this.filterGroupLocator(this.filterGroups[8]), 30);
  },

  checkFilterGroups() {
    this.waitForFiltersLoad();
    for (let i = 0; i < this.filterGroups.length; i++) {
      I.seeElement(this.filterGroupLocator(this.filterGroups[i]));
    }
  },

  async changeResultsPerPage(count) {
    const numOfElementsResults = await I.grabNumberOfVisibleElements(this.fields.resultsPerPageDropDown);
    if (numOfElementsResults === 0) {
      for (let i = 0; i < 5; i++) {
        I.pressKey('PageDown');
        I.wait(2);
      }
    }
    I.waitForVisible(this.fields.resultsPerPageDropDown, 30);
    I.click(this.fields.resultsPerPageDropDown);
    I.waitForVisible("//ng-select//span[contains(text(), '" + count + "')]", 30);
    I.click("//ng-select//span[contains(text(), '" + count + "')]");
    this.waitForQANPageLoaded();
  },

  getFilterLocator(filterValue) {
    const filterLocator =
      "//section[@class='aside__filter-group']//span[contains(text(), '" +
      filterValue +
      "')]/../span[@class='checkbox-container__checkmark']";
    return filterLocator;
  },

  async verifyFilterExists(filterValue) {
    const locator = this.getFilterLocator(filterValue);
    I.waitForVisible(locator, 30);
  },

  applyFilter(filterValue) {
    const filterLocator = this.getFilterLocator(filterValue);
    I.waitForElement(filterLocator, 30);
    I.click(filterLocator);
    I.waitForVisible(this.fields.table, 30);
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
    return { percentage: percentage, val: value };
  },

  waitForQANPageLoaded() {
    I.waitForVisible(this.fields.table, 30);
    I.waitForInvisible(this.fields.spinnerLocator, 30);
  },

  async _selectDetails(row) {
    const rowSelector = '//table/tr[' + (row + 1) + ']//td[2]';
    I.click(rowSelector);
    this.waitForQANPageLoaded();
    const numb = await I.grabNumberOfVisibleElements(this.fields.detailsTable);
    if (numb == 0) {
      I.waitForElement(rowSelector, 30);
      I.click(rowSelector);
      this.waitForQANPageLoaded();
    }
    this.waitForDetailsSection();
  },

  selectSectionInDetails(section) {
    I.waitForElement(section, 30);
    I.click(section);
  },

  waitForTabContentsLoaded(tabElements) {
    for (let i in tabElements) {
      I.waitForVisible(tabElements[i], 30);
    }
  },

  waitForDetailsSection() {
    I.waitForVisible(this.fields.detailsTable, 30);
  },

  async verifyDetailsSectionDataExists(tabElements) {
    this.waitForTabContentsLoaded(tabElements);
    const detailsText = await I.grabTextFrom(tabElements[0]);
    assert.equal(detailsText.length > 0, true, `Empty Section in Details`);
  },

  async verifyDataSet(row) {
    const queryCountData = await this._getData(row, 2);
    console.log('Query Count Data values ' + queryCountData.percentage + ' & ' + queryCountData.val);
    const queryTimeData = await this._getData(row, 3);
    console.log('Query Time Data values ' + queryTimeData.percentage + ' & ' + queryTimeData.val);
    this._selectDetails(row);
    const detailsQueryCountData = await this.getDetailsData(1);
    console.log(
      'Query Count Details Values ' + detailsQueryCountData.percentage + ' & ' + detailsQueryCountData.val
    );
    let detailsQueryTimeData;
    if (row === 1) {
      detailsQueryTimeData = await this.getDetailsData(3);
      console.log(
        'Query Count Details Values ' + detailsQueryCountData.percentage + ' & ' + detailsQueryCountData.val
      );
    } else {
      detailsQueryTimeData = await this.getDetailsData(2);
      console.log(
        'Query Count Details Values ' + detailsQueryCountData.percentage + ' & ' + detailsQueryCountData.val
      );
    }
    assert.equal(
      detailsQueryCountData.percentage.indexOf(queryCountData.percentage) > -1,
      true,
      "Details Query Count Percentage Doesn't Match expected " +
        detailsQueryCountData.percentage +
        ' to contain ' +
        queryCountData.percentage
    );
    assert.equal(
      detailsQueryCountData.val.indexOf(queryCountData.val) > -1,
      true,
      "Details Query Count Value Doesn't Match expected " +
        detailsQueryCountData.val +
        ' to contain ' +
        queryCountData.val
    );
    assert.equal(
      detailsQueryTimeData.percentage.indexOf(queryTimeData.percentage) > -1,
      true,
      "Details Query Time Percentage Doesn't Match expected " +
        detailsQueryTimeData.percentage +
        ' to contain ' +
        queryTimeData.percentage
    );
    assert.equal(
      detailsQueryTimeData.val.indexOf(queryTimeData.val) > -1,
      true,
      "Details Query Time value Doesn't Match expected " +
        detailsQueryTimeData.val +
        ' to contain ' +
        queryTimeData.val
    );
  },

  addColumnToQAN(columnName) {
    const columnNameLocator = this.fields.searchResult + columnName + "']";
    I.click(this.fields.addColumn);
    I.waitForVisible(this.fields.searchForColumn, 30);
    I.fillField(this.fields.searchForColumn, columnName);
    I.waitForVisible(columnNameLocator, 30);
    I.click(columnNameLocator);
    this.waitForQANPageLoaded();
  },

  changeMetricTo(metricToReplace, newMetric) {
    const currentMetric = this.fields.qanMainMetric + metricToReplace + "']]";
    const metricToSelect = this.fields.searchResult + newMetric + "']";
    I.click(currentMetric);
    I.waitForVisible(this.fields.searchForColumn, 30);
    I.fillField(this.fields.searchForColumn, newMetric);
    I.click(metricToSelect);
    this.waitForQANPageLoaded();
  },

  async clearFilters() {
    const numOfElementsFilters = await I.grabNumberOfVisibleElements(this.fields.filterSelection);
    for (let i = 1; i <= numOfElementsFilters; i++) {
      I.click(this.fields.filterSelection + '[' + i + ']');
      I.waitForInvisible(this.fields.detailsTable, 30);
    }
  },

  verifyURLContains(urlPart) {
    I.waitInUrl('tz=browser&theme=dark', 30);
    I.seeInCurrentUrl(urlPart);
  },

  waitForNewQANPageLoaded() {
    I.waitForElement(this.fields.newQANPanelContent, 30);
    I.waitForElement(this.fields.querySelector, 30);
  },

  applyFilterNewQAN(filterName) {
    const filterToAplly = `//span[contains(@class, 'checkbox-container__label-text') and contains(text(), '${filterName}')]`;
    I.waitForVisible(filterToAplly, 20);
    I.click(filterToAplly);
  },

  async getCountOfItems() {
    return await I.grabTextFrom(this.fields.countOfItems);
  },

  verifyChangedCount(countBefore, countAfter) {
    assert.notEqual(countAfter, countBefore, 'Data should be changed');
  },

  async verifyFiltersSection(filterSection, expectedCount) {
    const countOfFiltersInSection = await I.grabNumberOfVisibleElements(
      `//span[contains(text(), '${filterSection}')]/parent::p/following-sibling::div/span/label[contains(@class, 'checkbox-container checkbox-container--main')]`
    );
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

  selectPagination(option) {
    I.waitForInvisible(this.fields.newQANSpinnerLocator, 30);
    I.click(this.fields.resultPerPageCombobox);
    const optionToSelect = `//li[contains(@class, 'ant-select-dropdown-menu-item') and contains(text(), '${option}' )]`;
    I.click(optionToSelect);
  },

  async verifyRowCount(rowCount) {
    const count = await I.grabNumberOfVisibleElements(this.fields.tableRow);
    assert.equal(count, rowCount, 'Row count is incorrect!');
  },

  async verifyPagesAndCount(itemsPerPage) {
    const count = await this.getCountOfItems();
    let items = '';
    if (itemsPerPage < 100) {
      items = count.slice(8, count.length - 6);
    } else {
      items = count.slice(9, count.length - 6);
    }
    const lastpage = await this.getPagesCount();
    const result = parseInt(items) / parseInt(lastpage);
    assert.equal(Math.ceil(result / 10) * 10, itemsPerPage, 'Pages do not match with total count');
  },

  async getPagesCount() {
    const pagesCount = locate('li').before(this.fields.nextPage);
    const pages = await I.grabTextFrom(pagesCount);
    return pages[pages.length - 1];
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

  changeMetricInTable(columnName) {
    const columnHeader = this.getColumn(columnName);
    I.waitForVisible(columnHeader, 30);
    I.click(columnHeader);
  },

  verifyChangedColumn(columnName) {
    const columnHeader = this.getColumn(columnName);
    I.waitForInvisible(columnHeader, 30);
  },

  getColumn(column) {
    return `//span[contains(text(), '${column}')]`;
  },

  getRow(row) {
    return `//td[@class='ant-table-row-cell-break-word']//div[contains(text(), '${row}')]`;
  },

  async verifyQueryTime(queryTime) {
    const queryTimeDetial = await I.grabTextFrom(this.fields.queryTimeDetail);
    assert.equal(queryTimeDetial, queryTime, 'Query times are not same!');
  },

  //These calculations and verifications needs to be improved https://jira.percona.com/browse/PMM-6140
  async verifyAvqQueryCount() {
    const queryTimeDetial = await I.grabTextFrom(this.fields.queryTimeDetail);
    const queryCountDetail = await I.grabTextFrom(this.fields.queryCountDetail);
    const result = parseFloat(queryCountDetail) / 300;
    const roundedResult = Math.round(parseFloat(result) * 10) / 10;
    //TBD
  },

  //These calculations and verifications needs to be improved https://jira.percona.com/browse/PMM-6140
  async verifyAvgQueryTime() {
    const queryTimeDetail = await I.grabTextFrom(this.fields.queryTimeDetail);
    const queryCountDetail = await I.grabTextFrom(this.fields.queryCountDetail);
    const load = await I.grabTextFrom(this.fields.load);
    const result = (parseFloat(queryCountDetail) * (parseFloat(queryTimeDetail) / 1000)) / 300;
    const roundedResult = Math.round(parseFloat(result) * 100) / 100;
    assert.equal(roundedResult, parseFloat(load), 'Load should be same!');
  },

  //These calculations and verifications needs to be improved https://jira.percona.com/browse/PMM-6140
  async verifyAvgLockTime() {
    const avgLoad = await I.grabTextFrom(this.fields.avgLoad);
    const lockTimeDetail = await I.grabTextFrom(this.fields.lockTimeDetail);
    const queryCountDetail = await I.grabTextFrom(this.fields.queryCountDetail);
    const result = (parseFloat(queryCountDetail) * (parseFloat(lockTimeDetail) / 1000000)) / 300;
    if (result > parseFloat(avgLoad.slice(2, avgLoad.length))) {
      assert.fail(result + ' should be smaller than ' + parseFloat(avgLoad.slice(2, avgLoad.length)));
    }
  },
};
