const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/proxysql-instance-summary/proxysql-instance-summary",
    urlWithRecent: "graph/d/fwWR9oiiz/proxysql-overview?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "ProxySQL Overview",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data points')]"
    },
    metrics: ["Client Connections", "Client Questions", "Active Backend Connections", "Failed Backend Connections",
        "Queries Routed", "Query processor time efficecy", "Connection Free", "Latency", "Query Cache memory", "Query Cache efficiency",
        "Network Traffic", "Mirroring efficiency", "Memory Utilization"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (let i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        I.dontSeeElement(this.fields.notAvailableMetrics);
    }
};
