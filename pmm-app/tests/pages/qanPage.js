const I = actor();
const assert = require('assert');
module.exports = {
  url: 'graph/d/pmm-qan/pmm-query-analytics',
  filterGroups: ['Environment', 'Cluster', 'Replication Set', 'Database', 'Node Name', 'Service Name', 'User Name', 'Node Type', 'Service Type'],
  tableHeader: ['Query', 'Load', 'Query Count', 'Query Time'],
  tabs: {
    tablesTab: ["//div[@class='card-body']//pre", "//button[@id='copyQueryExample']"],
    explainTab: ["//div[@id='classicPanel']//span"],
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
    groupBySelector: '.group-by-selector',
    addColumnsSelector: '.add-columns-selector',
    manageColumnsSelector: '.manage-columns-selector',
    removeColumnButton: "//div[text()='Remove column']",
  },

  filterGroupLocator(filterName) {
    return "//div[@class='filter-group__title']//span[contains(text(), '" + filterName + "')]";
  },

  tableHeaderLocator(tableHeader) {
    return "//ng-select//span[contains(@class, 'ng-value-label') and contains(text(), '" + tableHeader + "')]";
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

  checkFilterGroups() {
    I.waitForVisible(this.filterGroupLocator(this.filterGroups[8]), 30);
    for (let i = 0; i < this.filterGroups.length; i++) {
      I.seeElement(this.filterGroupLocator(this.filterGroups[i]));
    }
  },

  async changeResultsPerPage(count) {
    let numOfElements = await I.grabNumberOfVisibleElements(this.fields.resultsPerPageDropDown);
    if ((numOfElements = 0)) {
      for (var i = 0; i < 5; i++) {
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

  applyFilter(filterValue) {
    let filterLocator =
      "//section[@class='aside__filter-group']//span[contains(text(), '" + filterValue + "')]/../span[@class='checkbox-container__checkmark']";
    I.waitForElement(filterLocator, 30);
    I.click(filterLocator);
    I.waitForVisible(this.fields.table, 30);
  },

  async _getData(row, column) {
    let percentage = await I.grabTextFrom(
      "//table//tr[@ng-reflect-router-link='details/," + (row - 1) + "']//app-qan-table-cell[" + column + ']//div[1]//div[3]'
    );
    let value = await I.grabTextFrom(
      "//table//tr[@ng-reflect-router-link='details/," + (row - 1) + "']//app-qan-table-cell[" + column + ']//div[1]//div[2]'
    );

    return { percentage: percentage, val: value };
  },

  async getDetailsData(row) {
    let percentage = await I.grabTextFrom('//app-details-table//app-details-row[' + row + ']//div[3]//span[2]');
    let value = await I.grabTextFrom('//app-details-table//app-details-row[' + row + ']//div[3]//span[1]');
    return { percentage: percentage, val: value };
  },

  waitForQANPageLoaded() {
    I.waitForVisible(this.fields.table, 30);
    I.waitForClickable(this.fields.nextPageNavigation, 30);
  },

  _selectDetails(row) {
    I.click('//table/tr[' + (row + 1) + ']//td[2]');
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
    let detailsText = await I.grabTextFrom(tabElements[0]);
    assert.equal(detailsText.length > 0, true, `Empty Section in Details`);
  },

  async verifyDataSet(row) {
    var queryCountData = await this._getData(row, 2);
    console.log('Query Count Data values ' + queryCountData.percentage + ' & ' + queryCountData.val);
    var queryTimeData = await this._getData(row, 3);
    console.log('Query Time Data values ' + queryTimeData.percentage + ' & ' + queryTimeData.val);
    this._selectDetails(row);
    var detailsQueryCountData = await this.getDetailsData(1);
    console.log('Query Count Details Values ' + detailsQueryCountData.percentage + ' & ' + detailsQueryCountData.val);
    if (row === 1) {
      var detailsQueryTimeData = await this.getDetailsData(3);
      console.log('Query Count Details Values ' + detailsQueryCountData.percentage + ' & ' + detailsQueryCountData.val);
    } else {
      var detailsQueryTimeData = await this.getDetailsData(2);
      console.log('Query Count Details Values ' + detailsQueryCountData.percentage + ' & ' + detailsQueryCountData.val);
    }
    assert.equal(
      detailsQueryCountData.percentage.indexOf(queryCountData.percentage) > -1,
      true,
      "Details Query Count Percentage Doesn't Match expected " + detailsQueryCountData.percentage + ' to contain ' + queryCountData.percentage
    );
    assert.equal(
      detailsQueryCountData.val.indexOf(queryCountData.val) > -1,
      true,
      "Details Query Count Value Doesn't Match expected " + detailsQueryCountData.val + ' to contain ' + queryCountData.val
    );
    assert.equal(
      detailsQueryTimeData.percentage.indexOf(queryTimeData.percentage) > -1,
      true,
      "Details Query Time Percentage Doesn't Match expected " + detailsQueryTimeData.percentage + ' to contain ' + queryTimeData.percentage
    );
    assert.equal(
      detailsQueryTimeData.val.indexOf(queryTimeData.val) > -1,
      true,
      "Details Query Time value Doesn't Match expected " + detailsQueryTimeData.val + ' to contain ' + queryTimeData.val
    );
  },

  async clearFilters() {
    let numOfElements = await I.grabNumberOfVisibleElements(this.fields.filterSelection);
    for (let i = 1; i <= numOfElements; i++) {
      I.click(this.fields.filterSelection + '[' + i + ']');
      I.waitForInvisible(this.fields.detailsTable, 30);
    }
  },
  changeGroupBy(groupBy) {
    I.waitForElement(this.fields.groupBySelector, 30);
    I.click(this.fields.groupBySelector);
    I.click(`//ul/li[@label='${groupBy}']`);
  },
  groupByIs(groupBy) {
    I.waitForElement(`//span[text()='Group by ${groupBy}']`, 30);
    I.seeElement(`//span[text()='Group by ${groupBy}']`);
  },
  addColumn(columnName) {
    I.waitForElement(this.fields.addColumnsSelector, 30);
    I.click(this.fields.addColumnsSelector);
    I.click(`//ul/li[@label='${columnName}']`);
  },
  changeColumn(oldColumnName, columnName) {
    const oldColumnSelector = `//div[text()='${oldColumnName}']`;
    const newColumnSelector = `//li[text()='${columnName}']`;
    I.waitForElement(oldColumnSelector, 30);
    I.click(oldColumnSelector);
    I.waitForElement(newColumnSelector, 30);
    I.click(newColumnSelector);
  },
  removeColumn(columnName) {
    const addColumnSelector = `//div[text()='${columnName}']`;
    I.waitForElement(addColumnSelector, 30);
    I.click(addColumnSelector);
    I.waitForElement(this.fields.removeColumnButton, 30);
    I.click(this.fields.removeColumnButton);
  },
  async searchFilters(searchString) {
    I.waitForElement(`//input[@placeholder='Filters search...']`, 30);
    I.fillField(`//input[@placeholder='Filters search...']`, searchString);
  },
  async checkFiltersMatchSearch(searchString) {
    const remainingFilters = await I.grabTextFrom('.checkbox-container__label-text');
    assert.equal(remainingFilters.every(filter => filter.includes(searchString)), true, `Remain only correct filters`);
  },

  async getSelectedFilters() {
    const selectedFilters = `//div[@class='overview-filters']//input[@type='checkbox'][@value='']/following-sibling::span`;
    I.waitForElement(`//div[@class='overview-filters']//input[@type='checkbox']`, 30);
    const remainingFilters = await I.grabTextFrom(selectedFilters);
    console.log(remainingFilters);
  },
  resetFilters() {
    const resetFiltersButtonLocator = '#reset-all-filters';
    I.waitForElement(resetFiltersButtonLocator, 30);
    I.click(resetFiltersButtonLocator);
  },
  selectFilter() {},
  paginationGoNext() {
    I.waitForElement(`//li[@title='Next Page']`, 30);
    I.click(`//li[@title='Next Page']`);
  },
  paginationGoPrevious() {
    I.waitForElement(`//li[@title='Previous Page']`, 30);
    I.click(`//li[@title='Previous Page']`);
  },
  paginationGoLast() {},
  paginationGoFirst() {},
  selectTableRow(rowNumber) {
    const rowSelector = `//tr[@data-row-key='${rowNumber}']`;
    I.waitForElement(rowSelector, 30);
    I.click(rowSelector);
  },
  showTooltip(rowNumber, dataColumnNumber) {
    const tooltipSelector = `//tr[@data-row-key='${rowNumber}']/td[${dataColumnNumber + 2}]//span[@class='summarize']`;
    I.waitForElement(tooltipSelector, 30);
    I.moveCursorTo(tooltipSelector);
  },
  selectDetailsTab(tabName) {
    const tabSelector = `//div[@role='tab']/span[text()='${tabName}']`
    I.waitForElement(tabSelector, 30);
    I.click(tabSelector);
  }
};
