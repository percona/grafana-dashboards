const { I, pmmSettingsPage } = inject();
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
    countOfItems: "//ul[@data-qa='qan-pagination']/../span",
    resetAll: '//button[@data-qa="qan-filters-reset-all"]',
    disabledResetAll: '//button[@data-qa="qan-filters-reset-all" and @disabled ]',
    newQANSpinnerLocator: "//i[@data-qa='loading-spinner']",
    showSelected: "//button[@data-qa='qan-filters-show-selected']",
    filterBy: "//input[@data-qa='filters-search-field']",
    filterCheckboxes: '.checkbox-container__checkmark',
    newQANAddColumn: "//span[contains(text(), 'Add column')]",
    newQANMetricDropDown: '.ant-select-dropdown-menu-item',
    newQANColumnSearchField: "div[style*='display: block;'] input",
    resultsPerPageValue: '.ant-select-selection-selected-value',
    nextPage: '.ant-pagination-next',
    previousPage: '.ant-pagination-prev',
    ellipsisButton: '.ant-pagination-item-ellipsis',
    tableRow: "(//table[@class='ant-table-fixed']//tbody[@class='ant-table-tbody'])[2]//tr",
    resultPerPageCombobox: '.ant-pagination-options',
    addColumnNewQAN: '.add-columns',
    noDataIcon: 'div.ant-empty-image',
    querySelector:
      "(//table[@class='ant-table-fixed']//tbody[@class='ant-table-tbody'])[2]//tr[4]//td[2]//div//div",
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
    overviewRowQueryTime: "//tr[4]//td[5]//span[contains(@class,'summarize')]",
  },

  metricValueLocatorOverviewTable(column, row) {
    return `//tr[${row}]//td[${column}]//span[contains(@class,'summarize')]`;
  },

  filterSectionLocator(filterSectionName) {
    return `//span[contains(text(), '${filterSectionName}')]`;
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
    assert.equal(detailsText.length > 0, true, 'Empty Section in Details');
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
      '//ul[@data-qa=\'qan-pagination\']//li[contains(@class,\'ant-pagination-item\')][last()]//a';
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

  sortMetric(metricName, sortOrder = 'down') {
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
};
