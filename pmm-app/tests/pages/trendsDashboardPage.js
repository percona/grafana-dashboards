const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/wjZRrTiiz/trends-dashboard",
    fields: {
        pageHeaderText: "Trends Dashboard",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]"
    },
    metrics: ["CPU Usage", "I/O Read Activity", "I/O Write Activity", "MySQL Questions", "InnoDB Rows Read", "InnoDB Rows Changed"],

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
