const {I, adminPage} = inject();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/prometheus-overview/prometheus-exporters-overview",
    urlWithRecent: "graph/d/gfz9QMHiz/prometheus-exporters-overview?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "Prometheus Exporter Overview",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data')]"
    },
    metrics: ["Avg CPU Usage per Node", "Avg Memory Usage per Node", "Monitored Nodes", "Exporters Running",
        "CPU Usage", "Memory Usage", "CPU Cores Used",
        "CPU  Used", "Mem Used", "Virtual CPUs", "RAM", "File Descriptors Used"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    async verifyMetricsExistence () {
        for (let i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        await adminPage.grabReportNameWithNA(2);
    }
};
