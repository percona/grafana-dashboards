const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/mysql-instance-summary/mysql-instance-summary",
    urlWithRecent: "graph/d/MQWgroiiz/mysql-overview?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "MySQL Overview",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        systemChartsToggle: "//a[contains(text(), 'Node Summary')]"
    },
    metrics: ["MySQL Uptime", "Current QPS", "InnoDB Buffer Pool Size", "Buffer Pool Size of Total RAM",
        "MySQL Connections", "MySQL Client Thread Activity", "MySQL Questions", "MySQL Thread Cache",
        "MySQL Temporary Objects", "MySQL Select Types", "MySQL Sorts", "MySQL Slow Queries", "MySQL Aborted Connections", "MySQL Table Locks",
        "Network Traffic", "MySQL Network Usage Hourly", "MySQL Internal Memory Overview", "Top Command Counters",
        "Top Command Counters Hourly", "MySQL Handlers", "MySQL Transaction Handlers", "Process States", "Top Process States Hourly",
        "MySQL Query Cache Memory", "MySQL Query Cache Activity", "MySQL File Openings", "MySQL Open Files", "MySQL Table Open Cache Status",
        "MySQL Open Tables", "MySQL Table Definition Cache"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (var i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        // TODO: This element may exist, so this part should be reconsidered or test is unstable
        // I.dontSeeElement(this.fields.notAvailableMetrics);
    }
}
