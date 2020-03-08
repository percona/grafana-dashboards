const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/prometheus-status/prometheus-exporter-status",
    urlWithRecent: "graph/d/o2zrwGNmz/prometheus-exporter-status?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "Prometheus Exporter Status",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data')]"
    },
    metrics: ["CPU Usage", "Memory Usage", "File Descriptors Used", "Exporter Uptime", "Collector Scrape Successful", "Collector Execution Time  (Log Scale)",
        "Collector Execution Time", "MySQL Exporter Errors", "Rate of  Scrapes", "MySQL up",
        "MongoDB Scrape Performance", "MongoDB Exporter Errors", "MongoDB up",
        "ProxySQL Scrape Performance", "ProxySQL Exporter Errors", "ProxySQL up",
        "Scrape Durations"],

    panels: ["PostgreSQL Exporter", "ProxySQL Exporter", "MongoDB Exporter", "MySQL Exporter"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (let i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
    }
};
