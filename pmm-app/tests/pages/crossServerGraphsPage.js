const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/Swz9QGNmz/cross-server-graphs",
    urlWithRecent: "graph/d/Swz9QGNmz/cross-server-graphs?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "Advanced Data Exploration",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data points')]"
    },
    metrics: ["Load Average", "Memory Usage", "MySQL Connections", "MySQL Queries", "MySQL Traffic",
        "Network Traffic", "System Info", "MySQL Info"],

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
