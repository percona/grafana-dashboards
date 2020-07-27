const { I } = inject();
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
  fields: {
    table: '//table//tr[2]',
    nextPageNavigation: '//ul[@role="navigation"]//li[last()]',
    newQANPanelContent: '.panel-content',
    disabledResetAll: '//button[@data-qa="qan-filters-reset-all" and @disabled ]',
    newQANSpinnerLocator: '//i[@data-qa="loading-spinner"]',
    showSelected: '//button[@data-qa="qan-filters-show-selected"]',
    countOfItems: '//span[@data-qa="qan-total-items"]',
    filterBy: '//input[@data-qa="filters-search-field"]',
    filterCheckboxes: '.checkbox-container__checkmark',
    newQANAddColumn: '//span[contains(text(), "Add column")]',
    searchFieldForColumn: 'input.ant-select-search__field',
    newQANMetricDropDown: '.ant-select-dropdown-menu-item',
    groupBySelector: '.group-by-selector',
    addColumnSelector: '.add-columns-selector',
    removeColumnButton: '//div[text()="Remove column"]',
    resultsPerPageValue: '.ant-select-selection-selected-value',
    nextPage: '.ant-pagination-next',
    previousPage: '.ant-pagination-prev',
    ellipsisButton: '.ant-pagination-item-ellipsis',
    tableRow: 'div.tr',
    resultPerPageCombobox: '.ant-pagination-options',
    addColumnNewQAN: '//span[contains(text(), "Add column")]',
    noDataIcon: 'div.ant-empty-image',
    querySelector: 'div.tr-3',
    resizer: 'span.Resizer.horizontal',
    queryTime: 'div.tr-3 > div:nth-child(5)',
    queryTimeDetail: '//tr[@data-row-key="query_time"]//td[4]//span[1]',
    queryCountDetail: '//tr[@data-row-key="num_queries"]//td[3]//span[1]',
    qps: '//tr[@data-row-key="num_queries"]//td[2]//span[1]',
    load: '//tr[@data-row-key="query_time"]//td[2]//div[1]//span[1]',
    overviewRowQueryCount: 'div.tr-3 > div:nth-child(4)',
    overviewRowQueryCountTooltip: '//div[@class="ant-tooltip overview-column-tooltip ant-tooltip-placement-left"]',
    overviewRowQueryCountTooltipText: '//div[@class="ant-tooltip overview-column-tooltip ant-tooltip-placement-left"]//div[@data-qa="qps"]',
    overviewRowQueryTime: 'div.tr-3 > div:nth-child(5)',
    overviewRowQueryTimeTooltip: '//div[@class="ant-tooltip overview-column-tooltip ant-tooltip-placement-left"]',
    overviewRowQueryTimeTooltipText: '//div[@class="ant-tooltip overview-column-tooltip ant-tooltip-placement-left"]//div[@data-qa="qps"]',
    showSelectedDisabled: '//button[@data-qa="qan-filters-show-selected" and @disabled ]',
    environmentLabel: '//span[contains(text(), "Environment")]',
    innodbColumn: '//tr[2]//td[6]//span[contains(@class,"summarize")]',
    innodbColumnTooltip:
      '//tr[2]//td[6]//span[contains(@class,"ant-tooltip-open")]//span[contains(@class,"summarize")]',
    loadValue: '//td[3]//span[contains(text(),"<0.01 load")]',
    loadValueTooltip:
      '//td[3]//span[contains(@class,"ant-tooltip-open")]//span[contains(text(),"<0.01 load")]',
    detailsSectionTab: '//div[@role="tab"]',
  },

  metricValueLocatorOverviewTable(column, row) {
    return `(//div[@class="tr tr-${row}"]//div[@role="cell"])[${column}]//span[contains(@class,'summarize')]`;
  },

  filterSectionLocator(filterSectionName) {
    return `//span[contains(text(), '${filterSectionName}')]`;
  },
  elements: {
    metricTooltip: '.ant-tooltip-content',
    latencyChart: '.latency-chart-container',
    resetAllButton: '//button[@data-qa="qan-filters-reset-all"]',
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
    return `//div[@class='filter-group__title']//span[contains(text(), '${filterName}')]`;
  },

  filterGroupCountSelector(groupName) {
    return (
      `//section[@class='aside__filter-group']//span[contains(text(), '${
        groupName
      }')]/../button[contains(text(), 'See all')]`
    );
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
    const filterLocator = `//section[@class='aside__filter-group']//span[contains(text(), '${
      filterValue
    }')]/../span[@class='checkbox-container__checkmark']`;

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
