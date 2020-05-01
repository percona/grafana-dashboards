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
  tableHeader: [
    'Query', 'Load', 'Query Count', 'Query Time'
  ],
  tabs:{
    tablesTab:["//div[@class='card-body']//pre", "//button[@id='copyQueryExample']"],
    explainTab:["//div[@id='classicPanel']//span"]
  },
  urlParts:{
    queryCountWithoutErrors: 'num_queries_with_errors',
    lockTime: 'lock_time',
    pmmManaged: 'var-database=local'
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
    spinnerLocator: "//i[@class='fa fa-spinner fa-spin spinner']"
  },

  filterGroupLocator(filterName) {
    return "//div[@class='filter-group__title']//span[contains(text(), '" + filterName + "')]";
  },

  tableHeaderLocator(tableHeader) {
    return (
        "//ng-select//span[contains(@class, 'ng-value-label') and contains(text(), '" + tableHeader + "')]"
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
    for (let i = 0; i< this.tableHeader.length; i++){
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

  getFilterLocator(filterValue) {
    let filterLocator =
     "//section[@class='aside__filter-group']//span[contains(text(), '" +
     filterValue +
     "')]/../span[@class='checkbox-container__checkmark']";
    return filterLocator;
  },

  applyFilter(filterValue){
    let filterLocator = this.getFilterLocator(filterValue);
    I.waitForElement(filterLocator, 30);
    I.click(filterLocator);
    I.waitForVisible(this.fields.table, 30);
  },

  async expandAllFilter() {
    for (let i = 0; i < 4; i++) {
      // eslint-disable-next-line max-len
      let numOfElements = await I.grabNumberOfVisibleElements("//section[@class='aside__filter-group']//span[contains(text(), '" + this.filterGroups[i] + "')]/../button[contains(text(), 'See all')]");
      if (numOfElements === 1) {
        // eslint-disable-next-line max-len
        I.click("//section[@class='aside__filter-group']//span[contains(text(), '" + this.filterGroups[i] + "')]/../button[contains(text(), 'See all')]");
        // eslint-disable-next-line max-len
        I.waitForVisible("//section[@class='aside__filter-group']//span[contains(text(), '" + this.filterGroups[i] + "')]/../button[contains(text(), 'Show top 5')]");
      }
    }
  },

  async _getData(row, column) {
    let percentage = await I.grabTextFrom("//table//tr[@ng-reflect-router-link='details/," + (row - 1) + "']//app-qan-table-cell[" + column +"]//div[1]//div[3]");
    let value = await I.grabTextFrom("//table//tr[@ng-reflect-router-link='details/," + (row - 1) + "']//app-qan-table-cell[" + column +"]//div[1]//div[2]");

    return { percentage: percentage, val: value };
  },

  async getDetailsData(row) {
    let percentage = await I.grabTextFrom("//app-details-table//app-details-row[" + row +"]//div[3]//span[2]");
    let value = await I.grabTextFrom("//app-details-table//app-details-row[" + row +"]//div[3]//span[1]");
    return { percentage: percentage, val: value };
  },

  waitForQANPageLoaded() {
    I.waitForVisible(this.fields.table, 30);
    I.waitForInvisible(this.fields.spinnerLocator, 30);
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

  waitForDetailsSection(){
    I.waitForVisible(this.fields.detailsTable, 30);
  },

  async verifyDetailsSectionDataExists(tabElements) {
    this.waitForTabContentsLoaded(tabElements);
    let detailsText = await I.grabTextFrom(tabElements[0]);
    assert.equal(detailsText.length > 0, true, `Empty Section in Details`);
  },

  async verifyDataSet(row){
    var queryCountData = await this._getData(row, 2);
    console.log("Query Count Data values " + queryCountData.percentage + " & " + queryCountData.val);
    var queryTimeData = await this._getData(row, 3);
    console.log("Query Time Data values " + queryTimeData.percentage + " & " + queryTimeData.val);
    this._selectDetails(row);
    var detailsQueryCountData = await this.getDetailsData(1);
    console.log("Query Count Details Values " + detailsQueryCountData.percentage  + " & " +  detailsQueryCountData.val);
    if (row === 1) {
      var detailsQueryTimeData = await this.getDetailsData(3);
      console.log("Query Count Details Values " + detailsQueryCountData.percentage  + " & " +  detailsQueryCountData.val);
    }
    else
    {
      var detailsQueryTimeData = await this.getDetailsData(2);
      console.log(
        'Query Count Details Values ' + detailsQueryCountData.percentage + ' & ' + detailsQueryCountData.val
      );
    }
    assert.equal(detailsQueryCountData.percentage.indexOf(queryCountData.percentage) > -1, true, "Details Query Count Percentage Doesn't Match expected "  + detailsQueryCountData.percentage + " to contain " + queryCountData.percentage);
    assert.equal(detailsQueryCountData.val.indexOf(queryCountData.val) > -1, true, "Details Query Count Value Doesn't Match expected " + detailsQueryCountData.val + " to contain " + queryCountData.val);
    assert.equal(detailsQueryTimeData.percentage.indexOf(queryTimeData.percentage) > -1, true, "Details Query Time Percentage Doesn't Match expected " + detailsQueryTimeData.percentage + " to contain " + queryTimeData.percentage);
    assert.equal(detailsQueryTimeData.val.indexOf(queryTimeData.val) > -1, true, "Details Query Time value Doesn't Match expected "  + detailsQueryTimeData.val + " to contain " + queryTimeData.val);
  },

  async clearFilters(){
    let numOfElements = await I.grabNumberOfVisibleElements(this.fields.filterSelection);
    for (let i = 1; i <= numOfElements; i++) {
      I.click(this.fields.filterSelection + "[" + i + "]");
      I.waitForInvisible(this.fields.detailsTable, 30);
    }
  },

  addColumnToQAN(columnName) {
    let columnNameLocator = this.fields.searchResult + columnName + "']";
    I.click(this.fields.addColumn);
    I.waitForVisible(this.fields.searchForColumn, 30);
    I.fillField(this.fields.searchForColumn, columnName);
    I.waitForVisible(columnNameLocator, 30);
    I.click(columnNameLocator);
    this.waitForQANPageLoaded();
  },

  changeMetricTo(metricToReplace, newMetric) {
    let currentMetric = this.fields.qanMainMetric + metricToReplace + "']]";
    let metricToSelect = this.fields.searchResult + newMetric + "']";
    I.click(currentMetric);
    I.waitForVisible(this.fields.searchForColumn, 30);
    I.fillField(this.fields.searchForColumn, newMetric);
    I.click(metricToSelect);
    this.waitForQANPageLoaded();
  },

  verifyURLContains(urlPart) {
    I.waitInUrl('tz=browser&theme=dark', 30);
    I.seeInCurrentUrl(urlPart);
  },
};
