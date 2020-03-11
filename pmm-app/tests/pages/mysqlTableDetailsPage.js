const I = actor();

module.exports = {

    url: "graph/d/mysql-table/mysql-table-details",
    urlWithRecent: "graph/d/mysql-table/mysql-table-details?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "MySQL Table Details",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        systemChartsToggle: "//a[contains(text(), 'Node Summary')]",
        noDataToShow: "//span[contains(text(), 'No data to show')]",
        serviceNameDropDown: "(//a[@class='variable-value-link']//ancestor::div//label[contains(text(),'Service Name')])[1]//parent::div//a[@ng-click]",
        clearSelection: "//a[@ng-click='vm.clearSelections()']",
        disabledServiceName: "//span[contains(text(), 'ps_dts')]",
        serviceName: "(//a[@class='variable-value-link']//ancestor::div//label[contains(text(),'Service Name')])[1]",
    },
    metrics: ["Largest Tables by Row Count", "Largest Tables by Size", "Most Fragmented Tables by Freeable Size"],

    graphsLocator (metricName){
        locator = "//span[text()='" + metricName + "']//ancestor::grafana-panel//span[contains(text(), 'No data to show')]";
        return locator;
    },

    verifyNoDataShow () {
        I.waitForElement(this.fields.serviceNameDropDown, 30);
        I.click(this.fields.serviceNameDropDown);
        I.waitForElement(this.fields.clearSelection, 30);
        I.click(this.fields.clearSelection);
        // TODO: figure out why it's not working
        // I.waitForElement(this.fields.disabledServiceName, 30);
        // I.click(this.fields.disabledServiceName);
        I.waitForElement(this.fields.serviceName, 30);
        I.click(this.fields.serviceName);
        I.waitForElement(this.graphsLocator(this.metrics[1]), 30);
        for (var i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
    }
}
