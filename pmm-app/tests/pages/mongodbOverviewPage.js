const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/mongodb-instance-summary/mongodb-instance-summary",
    urlWithRecent: "graph/d/6Lk9wMHik/mongodb-overview?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "MongoDB Overview",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data points')]"
    },
    metrics: ["Command Operations", "Connections", "Cursors", "Document Operations", "Queued Operations",
        "Query Efficiency", "Scanned and Moved Objects", "getLastError Write Time", "getLastError Write Operations",
        "Assert Events", "Page Faults"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (var i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        I.dontSeeElement(this.fields.notAvailableMetrics);
        I.dontSeeElement(this.fields.notAvailableDataPoints);
    }
}