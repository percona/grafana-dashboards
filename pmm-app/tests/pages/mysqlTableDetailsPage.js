const I = actor();

module.exports = {
  url: 'graph/d/mysql-table/mysql-table-details',
  urlWithRecent: 'graph/d/mysql-table/mysql-table-details?refresh=1m&orgId=1&from=now-1m&to=now',
  fields: {
    pageHeaderText: 'MySQL Table Details',
    notAvailableMetrics: '//span[contains(text(), "N/A")]',
    systemChartsToggle: '//a[contains(text(), "Node Summary")]',
    noDataToShow: '//span[contains(text(), "No data to show")]',
    serviceNameDropDown:
      '(//a[@class="variable-value-link"]//ancestor::div//label[contains(text(),"Service Name")])[1]//parent::div//a[@ng-click]',
    clearSelection: '//a[@ng-click="vm.clearSelections()"]',
    disabledServiceName: '//span[contains(text(), "ps_dts")]',
    serviceName:
      '(//a[@class="variable-value-link"]//ancestor::div//label[contains(text(),"Service Name")])[1]',
  },
  metrics: [
    'Largest Tables by Row Count',
    'Largest Tables by Size',
    'Most Fragmented Tables by Freeable Size - ps_dts_node_1',
  ],

  graphsLocator(metricName) {
    return `//span[text()='${metricName}']//ancestor::div[contains(@class, 'panel-container')]//span[contains(text(), 'No data to show')]`;
  },

  verifyNoDataShow() {
    I.waitForElement(this.fields.serviceNameDropDown, 30);
    I.click(this.fields.serviceNameDropDown);
    I.waitForElement(this.fields.clearSelection, 30);
    I.click(this.fields.clearSelection);
    I.waitForElement(this.fields.disabledServiceName, 30);
    I.click(this.fields.disabledServiceName);
    I.waitForElement(this.fields.serviceName, 30);
    I.click(this.fields.serviceName);
    I.waitForVisible(this.graphsLocator(this.metrics[0]), 30);
    I.waitForVisible(this.graphsLocator(this.metrics[1]), 30);
    I.waitForVisible(this.graphsLocator(this.metrics[2]), 30);
    for (const i in this.metrics) {
      I.seeElement(this.graphsLocator(this.metrics[i]));
    }
  },
};
