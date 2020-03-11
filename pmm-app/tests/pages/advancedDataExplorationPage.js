const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/1oz9QMHmk/advanced-data-exploration",
    urlWithRecent: "graph/d/1oz9QMHmk/advanced-data-exploration?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "Advanced Data Exploration",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data')]"
    },
    metrics: ["View Actual Metric Values (Gauge)", "View Metric Rate of Change (Counter)", "Metric Rates", "Metric Data Table",],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (let i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        // TODO: This element may exist, so this part should be reconsidered or test is unstable
        // I.dontSeeElement(this.fields.notAvailableMetrics);
    }
};
