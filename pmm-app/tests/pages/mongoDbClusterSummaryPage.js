const I = actor();

module.exports = {

    /// insert your locators and methods here
    // setting locators
    url: "graph/d/mongodb-cluster-summary/mongodb-cluster-summary",
    urlWithRecent: "graph/d/n9z9QGNiz/mongodb-cluster-summary?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "MongoDB Cluster Summary",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data points')]"
    },
    metrics: ["Unsharded DBs", "Sharded DBs", "Sharded Collections", "Shards", "Chunks", "Balancer Enabled", "Chunks Balanced",
        "Mongos Operations Total", "Mongos  Connections", "Mongos  Cursors", "Chunk Split Events", "Change Log Events", "Operations Per Shard",
        "Chunks by Shard", "Connections Per Shard", "Cursors Per Shard", "Replication Lag by Set", "Oplog Range by Set", "Shard Elections", "Collection Lock Time"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '" + metricName + "')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (let i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        I.dontSeeElement(this.fields.notAvailableMetrics);
    }
}