const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/node-instance-summary/node-summary",
    fields: {
        pageHeaderText: "Summary Dashboard",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]"
    },
    metrics: ["CPU Usage", "Processes", "Network Traffic", "I/O Activity", "Disk IO Latency"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (var i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        I.dontSeeElement(this.fields.notAvailableMetrics);
    }
}
