const { I } = inject();

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
  fields: {
    addColumnNewQAN: '//span[contains(text(), "Add column")]',
    addColumnSelector: '.add-columns-selector',
    countOfItems: '//span[@data-qa="qan-total-items"]',
    detailsSectionTab: '//div[@role="tab"]',
    disabledResetAll: '//button[@data-qa="qan-filters-reset-all" and @disabled ]',
    resetAllButton: '//button[@data-qa="qan-filters-reset-all"]',
    ellipsisButton: '.ant-pagination-item-ellipsis',
    environmentLabel: '//span[contains(text(), "Environment")]',
    filterBy: '//input[@data-qa="filters-search-field"]',
    filterCheckboxes: '.checkbox-container__checkmark',
    groupBySelector: '.group-by-selector',
    innodbColumn: '//tr[2]//td[6]//span[contains(@class,"summarize")]',
    innodbColumnTooltip:
      '//tr[2]//td[6]//span[contains(@class,"ant-tooltip-open")]//span[contains(@class,"summarize")]',
    load: '//tr[@data-row-key="query_time"]//td[2]//div[1]//span[1]',
    loadValue: '//td[3]//span[contains(text(),"<0.01 load")]',
    loadValueTooltip:
      '//td[3]//span[contains(@class,"ant-tooltip-open")]//span[contains(text(),"<0.01 load")]',
    newQANAddColumn: '//span[contains(text(), "Add column")]',
    newQANMetricDropDown: '.ant-select-dropdown-menu-item',
    newQANPanelContent: '.panel-content',
    newQANSpinnerLocator: '//i[@data-qa="loading-spinner"]',
    nextPage: '.ant-pagination-next',
    nextPageNavigation: '//ul[@role="navigation"]//li[last()]',
    noDataIcon: 'div.ant-empty-image',
    overviewRowQueryCount: 'div.tr-3 > div:nth-child(4)',
    overviewRowQueryCountTooltip:
      '//div[@class="ant-tooltip overview-column-tooltip ant-tooltip-placement-left"]',
    overviewRowQueryCountTooltipText:
      '//div[@class="ant-tooltip overview-column-tooltip ant-tooltip-placement-left"]//div[@data-qa="qps"]',
    overviewRowQueryTime: 'div.tr-3 > div:nth-child(5)',
    overviewRowQueryTimeTooltip:
      '//div[@class="ant-tooltip overview-column-tooltip ant-tooltip-placement-left"]',
    overviewRowQueryTimeTooltipText:
      '//div[@class="ant-tooltip overview-column-tooltip ant-tooltip-placement-left"]//div[@data-qa="qps"]',
    previousPage: '.ant-pagination-prev',
    qps: '//tr[@data-row-key="num_queries"]//td[2]//span[1]',
    queryCountDetail: '//tr[@data-row-key="num_queries"]//td[3]//span[1]',
    querySelector: 'div.tr-3',
    queryTime: 'div.tr-3 > div:nth-child(5)',
    queryTimeDetail: '//tr[@data-row-key="query_time"]//td[4]//span[1]',
    removeColumnButton: '//div[text()="Remove column"]',
    resizer: 'span.Resizer.horizontal',
    resultPerPageCombobox: '.ant-pagination-options',
    resultsPerPageValue: '.ant-select-selection-selected-value',
    searchFieldForColumn: 'input.ant-select-search__field',
    showSelected: '//button[@data-qa="qan-filters-show-selected"]',
    showSelectedDisabled: '//button[@data-qa="qan-filters-show-selected" and @disabled ]',
    table: '//table//tr[2]',
    tableRow: 'div.tr',
    noQueries: '//h1[contains(text(), \'No queries available for this combination of filters\')]',
  },

  metricValueLocatorOverviewTable(column, row) {
    return `(//div[@class="tr tr-${row}"]//div[@role="cell"])[${column}]//span[contains(@class,'summarize')]`;
  },

  filterSectionLocator(filterSectionName) {
    return `//span[contains(text(), '${filterSectionName}')]`;
  },
  elements: {
    detailsSection: '#query-analytics-details',
    latencyChart: '.latency-chart-container',
    metricTooltip: '.ant-tooltip-content',
    qpsTooltipValueSelector: '[data-qa="metrics-list"] [data-qa="qps"] span',
    resetAllButton: '//button[@data-qa="qan-filters-reset-all"]',
    selectedOverviewRow: 'tr.selected-overview-row',
    spinBlur: 'div.ant-spin-blur',
    spinner: 'i.fa-spinner',
    tableRowSelector: '.ant-table-scroll .ant-table-tbody tr:first-of-type .overview-main-column div',
    timeRangePickerButton: '.time-picker-button-select',
  },
  requests: {
    getReportPath: '/v0/qan/GetReport',
    getFiltersPath: '/v0/qan/Filters/Get',
  },
  filterGroupLocator(filterName) {
    return `//div[@class='filter-group__title']//span[contains(text(), '${filterName}')]`;
  },

  filterGroupCountSelector(groupName) {
    return `//section[@class='aside__filter-group']//span[contains(text(), '${groupName}')]/../button[contains(text(), 'See all')]`;
  },

  waitForFiltersLoad() {
    I.waitForVisible(this.filterGroupLocator(this.filterGroups[8]), 30);
  },

  overviewMetricCellValueLocator(rowNumber, dataColumnNumber) {
    return `div.tr-${rowNumber} > div:nth-child(${dataColumnNumber + 2})`;
  },

  overviewMetricSortingLocator(сolumnNumber) {
    return `div.tr:first-child > div:nth-child(${сolumnNumber}) span > span.sort-by`;
  },

  manageColumnLocator(columnName) {
    return `//span[text()='${columnName}']`;
  },

  getFilterLocator(filterValue) {
    const filterLocator = `//section[@class='aside__filter-group']//span[contains(text(), '${filterValue}')]/../span[@class='checkbox-container__checkmark']`;

    return filterLocator;
  },

  overviewRowLocator(rowNumber) {
    return `div.tr-${rowNumber}`;
  },

  getColumn(column) {
    return `//span[contains(text(), '${column}')]`;
  },

  getRow(row) {
    return `//div[contains(text(), '${row}')]`;
  },
};
