const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/pxc-cluster-summary/pxc-galera-cluster-summary",
    urlWithRecent: "graph/d/s_k9wGNiz/pxc-galera-cluster-overview?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "PXC/Galera Cluster Overview",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data points')]"
    },
    metrics: ["Percona XtraDB / Galera Cluster Size", "Flow Control Paused Time", "Flow Control Messages Sent", "Writeset Inbound Traffic", "Writeset Outbound Traffic",
        "Receive Queue", "Send Queue", "Transactions Received", "Transactions Replicated", "Average Incoming Transaction Size", "Average Replicated Transaction Size",
        "FC Trigger Low Limit", "FC Trigger High Limit", "IST Progress", "Average Galera Replication Latency", "Maximum  Galera Replication Latency",],

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
