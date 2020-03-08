const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/postgresql-instance-summary/postgresql-instance-summary",
    urlWithRecent: "graph/d/IvhES05ik/postgresql-overview?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "PostgreSQL Overview",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data')]"
    },
    metrics: ["Version", "Max Connections", "Shared Buffers", "Disk-Page Buffers", "Memory Size for each Sort",
        "Disk Cache Size", "Autovacuum", "PostgreSQL Connections", "Active Connections",
        "Tuples", "Read Tuple Activity", "Transactions", "Duration of Transactions", "Number of Temp Files", "Size of Temp Files",
        "Conflicts/Deadlocks", "Number of Locks", "Operations with Blocks", "Buffers", "Canceled Queries", "Cache Hit Ratio",
        "Checkpoint stats", "Number of Locks"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (var i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        I.dontSeeElement(this.fields.notAvailableMetrics);
        I.seeNumberOfVisibleElements(this.fields.notAvailableDataPoints, 1);
    }
}
